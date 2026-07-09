/* ------------------------------------------------------------------
   REVENUE CALCULATOR — PURE CALCULATION
   No React, no I18n, no side effects. Takes inputs + config and
   returns computed results. Independently testable.
   ------------------------------------------------------------------ */

import {
  RTE_BY_DURATION,
  INPUT_LIMITS,
  CALCULATOR_MODES,
  DEFAULT_MODE,
  DEGRADATION_DEFAULTS,
  STACKING_DEFAULTS,
  SOLAR_DEFAULTS,
  LIFETIME_DEFAULTS
} from '../data/calculatorConfig.js'

function toNumber(value, fallback = 0) {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function clamp(value, min = -Infinity, max = Infinity) {
  return Math.min(Math.max(value, min), max)
}

function clampField(key, value, fallback) {
  const limits = INPUT_LIMITS[key] || {}
  const n = toNumber(value, fallback)
  return clamp(n, limits.min ?? -Infinity, limits.max ?? Infinity)
}

/* Year-by-year SoH (state-of-health) retention curve. Year 1 runs at
   100% SoH; each following year compounds the previous year's
   throughput + calendar loss. Returns the per-year SoH series (0..1)
   and the nominal annual loss rate it was built from. */
function buildSoHSeries(cyclesPerYear, degradationPerCyclePct, calendarDegradationPctYr, years) {
  const annualLossPct = cyclesPerYear * degradationPerCyclePct + calendarDegradationPctYr
  const retention = clamp(1 - annualLossPct / 100, 0, 1)
  const series = []
  let soh = 1
  for (let year = 1; year <= years; year++) {
    series.push(soh)
    soh *= retention
  }
  return { series, annualLossPct }
}

/**
 * Computes battery storage revenue — grid arbitrage, optional FCR/
 * balancing stacking, optional solar pairing — plus lifetime
 * economics (LCOS/NPV) for a given set of inputs. `inputs` may come
 * straight from form state (strings included) — every field is
 * coerced and clamped to a sane minimum here.
 */
export function calculateRevenue(inputs) {
  const mode = CALCULATOR_MODES.includes(inputs.mode) ? inputs.mode : DEFAULT_MODE

  const power_mw = clampField('power_mw', inputs.power_mw, 0)
  const duration_h = [1, 2, 4].includes(Number(inputs.duration_h)) ? Number(inputs.duration_h) : 2
  const price_spread_eur_mwh = clampField('price_spread_eur_mwh', inputs.price_spread_eur_mwh, 0)
  const dod_pct = clampField('dod_pct', inputs.dod_pct, 0)
  const cycles_per_year = clampField('cycles_per_year', inputs.cycles_per_year, 0)
  const project_life_years = clampField('project_life_years', inputs.project_life_years, 0)
  const capex_power_eur_kw = clampField('capex_power_eur_kw', inputs.capex_power_eur_kw, 0)
  const capex_energy_eur_kwh = clampField('capex_energy_eur_kwh', inputs.capex_energy_eur_kwh, 0)
  const opex_pct_of_capex = clampField('opex_pct_of_capex', inputs.opex_pct_of_capex, 0)

  const rte = RTE_BY_DURATION[duration_h] ?? RTE_BY_DURATION[2]

  const E_nom_mwh = power_mw * duration_h
  const E_use_mwh = E_nom_mwh * (dod_pct / 100)

  // Battery-only CAPEX — kept separate from solar CAPEX (added after the
  // solar section below) so battery-denominated metrics (CAPEX/kWh,
  // LCOS) never mix scopes with solar's unrelated MWp/kWp basis. Mixing
  // a blended cost into a battery-only denominator is exactly the class
  // of bug the viability-check scope note (see LCOS below) exists to
  // avoid — CAPEX/kWh and LCOS both stay battery-only for the same reason.
  const battery_capex_eur = power_mw * 1000 * capex_power_eur_kw + E_nom_mwh * 1000 * capex_energy_eur_kwh
  const capex_per_kwh = E_nom_mwh > 0 ? battery_capex_eur / (E_nom_mwh * 1000) : 0

  // ---- Feature 1: throughput-based degradation ----
  const degradation_per_full_cycle_pct = clampField(
    'degradation_per_full_cycle_pct',
    inputs.degradation_per_full_cycle_pct,
    DEGRADATION_DEFAULTS.degradation_per_full_cycle_pct
  )
  const calendar_degradation_pct_yr = clampField(
    'calendar_degradation_pct_yr',
    inputs.calendar_degradation_pct_yr,
    DEGRADATION_DEFAULTS.calendar_degradation_pct_yr
  )
  const lifeYears = Math.max(1, Math.round(project_life_years))
  const { series: sohSeries, annualLossPct: degradation_annual_pct } = buildSoHSeries(
    cycles_per_year,
    degradation_per_full_cycle_pct,
    calendar_degradation_pct_yr,
    lifeYears
  )

  // ---- Feature 2: revenue stacking with zero-sum allocation ----
  const fcr_price_eur_mw_yr = clampField(
    'fcr_price_eur_mw_yr',
    inputs.fcr_price_eur_mw_yr,
    STACKING_DEFAULTS.fcr_price_eur_mw_yr
  )
  const balancing_price_eur_mw_yr = clampField(
    'balancing_price_eur_mw_yr',
    inputs.balancing_price_eur_mw_yr,
    STACKING_DEFAULTS.balancing_price_eur_mw_yr
  )

  const fcrEligible = duration_h >= STACKING_DEFAULTS.fcr_min_duration_h
  const balancingEligible = duration_h >= STACKING_DEFAULTS.balancing_min_duration_h

  let alloc_fcr_pct = fcrEligible ? clampField('alloc_fcr_pct', inputs.alloc_fcr_pct, 0) : 0
  let alloc_balancing_pct = balancingEligible ? clampField('alloc_balancing_pct', inputs.alloc_balancing_pct, 0) : 0

  let allocClamped = false
  const ancillaryTotal = alloc_fcr_pct + alloc_balancing_pct
  if (ancillaryTotal > 100) {
    const scale = 100 / ancillaryTotal
    alloc_fcr_pct *= scale
    alloc_balancing_pct *= scale
    allocClamped = true
  }
  const alloc_arbitrage_pct = clamp(100 - alloc_fcr_pct - alloc_balancing_pct, 0, 100)

  // Year-1 (nominal, 100% SoH) revenue — the headline "current year" figures.
  const arbitrage_full_eur = E_use_mwh * cycles_per_year * price_spread_eur_mwh * rte
  const R_arbitrage = arbitrage_full_eur * (alloc_arbitrage_pct / 100)
  const R_fcr = power_mw * (alloc_fcr_pct / 100) * fcr_price_eur_mw_yr
  const R_balancing = power_mw * (alloc_balancing_pct / 100) * balancing_price_eur_mw_yr

  // ---- Feature 3: solar-paired mode ----
  const pv_size_mwp = clampField('pv_size_mwp', inputs.pv_size_mwp, SOLAR_DEFAULTS.pv_size_mwp)
  const annual_consumption_mwh = clampField('annual_consumption_mwh', inputs.annual_consumption_mwh, 0)
  const specific_yield_kwh_per_kwp = clampField(
    'specific_yield_kwh_per_kwp',
    inputs.specific_yield_kwh_per_kwp,
    SOLAR_DEFAULTS.specific_yield_kwh_per_kwp
  )
  const summer_share_pct = clampField('summer_share_pct', inputs.summer_share_pct, SOLAR_DEFAULTS.summer_share_pct)
  const winter_share_pct = clamp(100 - summer_share_pct, 0, 100)
  const self_consumption_rate_pct = clampField(
    'self_consumption_rate_pct',
    inputs.self_consumption_rate_pct,
    SOLAR_DEFAULTS.self_consumption_rate_pct
  )
  const retail_import_eur_kwh = clampField(
    'retail_import_eur_kwh',
    inputs.retail_import_eur_kwh,
    SOLAR_DEFAULTS.retail_import_eur_kwh
  )
  const feed_in_tariff_eur_kwh = clampField(
    'feed_in_tariff_eur_kwh',
    inputs.feed_in_tariff_eur_kwh,
    SOLAR_DEFAULTS.feed_in_tariff_eur_kwh
  )
  const net_metering_2027 =
    inputs.net_metering_2027 === undefined ? SOLAR_DEFAULTS.net_metering_2027 : !!inputs.net_metering_2027

  // MWp * (kWh/kWp) = MWh/yr (the *1000/÷1000 unit conversion cancels out).
  const pv_generation_mwh_yr = pv_size_mwp * specific_yield_kwh_per_kwp
  const summer_generation_mwh = pv_generation_mwh_yr * (summer_share_pct / 100)
  const winter_generation_mwh = pv_generation_mwh_yr * (winter_share_pct / 100)

  let self_consumed_mwh = pv_generation_mwh_yr * (self_consumption_rate_pct / 100)
  if (annual_consumption_mwh > 0) {
    self_consumed_mwh = Math.min(self_consumed_mwh, annual_consumption_mwh)
  }
  const exported_mwh = Math.max(0, pv_generation_mwh_yr - self_consumed_mwh)
  const export_price_eur_kwh = net_metering_2027 ? retail_import_eur_kwh : feed_in_tariff_eur_kwh

  const self_consumed_value_eur = self_consumed_mwh * 1000 * retail_import_eur_kwh
  const exported_value_eur = exported_mwh * 1000 * export_price_eur_kwh
  const R_solar = mode === 'solar' ? self_consumed_value_eur + exported_value_eur : 0

  // Seasonal value split assumes a constant self-consumption/export
  // ratio across seasons — an MVP simplification (real self-consumption
  // typically skews higher in winter, lower in summer).
  const selfConsumeRatio = pv_generation_mwh_yr > 0 ? self_consumed_mwh / pv_generation_mwh_yr : 0
  const summer_value_eur =
    summer_generation_mwh * selfConsumeRatio * 1000 * retail_import_eur_kwh +
    summer_generation_mwh * (1 - selfConsumeRatio) * 1000 * export_price_eur_kwh
  const winter_value_eur =
    winter_generation_mwh * selfConsumeRatio * 1000 * retail_import_eur_kwh +
    winter_generation_mwh * (1 - selfConsumeRatio) * 1000 * export_price_eur_kwh

  // Solar CAPEX — only in solar mode, and only feeds into TOTAL project
  // CAPEX (NPV, payback, ROI, the "Total CAPEX" display). Previously
  // solar revenue was booked against zero PV investment, which is what
  // inflated NPV to several times CAPEX. Deliberately excluded from
  // `battery_capex_eur` above, so CAPEX/kWh and LCOS stay battery-only.
  const solar_capex_eur_per_kwp = clampField(
    'solar_capex_eur_per_kwp',
    inputs.solar_capex_eur_per_kwp,
    SOLAR_DEFAULTS.solar_capex_eur_per_kwp
  )
  const solar_capex_eur = mode === 'solar' ? pv_size_mwp * 1000 * solar_capex_eur_per_kwp : 0

  // Total project CAPEX = battery + (solar, if applicable). Grid mode is
  // unaffected: solar_capex_eur is 0 whenever mode !== 'solar'.
  const capex_eur = battery_capex_eur + solar_capex_eur
  const opex_eur = capex_eur * (opex_pct_of_capex / 100)
  // Battery-only share of OPEX, for the LCOS accumulator below — same
  // battery-only-scope reasoning as `battery_capex_eur` above. `opex_eur`
  // (total) still drives annual_net_eur/NPV/payback/ROI.
  const battery_opex_eur = battery_capex_eur * (opex_pct_of_capex / 100)

  const annual_gross_eur = R_arbitrage + R_fcr + R_balancing + R_solar
  const annual_net_eur = annual_gross_eur - opex_eur
  const payback_years = annual_net_eur > 0 ? capex_eur / annual_net_eur : null
  const roi_pct = capex_eur > 0 ? (annual_net_eur / capex_eur) * 100 : 0

  // ---- Feature 4: lifetime economics (LCOS & NPV) ----
  const discount_rate_pct = clampField('discount_rate_pct', inputs.discount_rate_pct, LIFETIME_DEFAULTS.discount_rate_pct)
  const charging_price_eur_mwh = clampField(
    'charging_price_eur_mwh',
    inputs.charging_price_eur_mwh,
    LIFETIME_DEFAULTS.charging_price_eur_mwh
  )
  const r = discount_rate_pct / 100

  const years = []
  let npv_eur = -capex_eur
  let sumDiscountedEnergyMwh = 0
  let sumDiscountedOpexEur = 0

  for (let t = 1; t <= sohSeries.length; t++) {
    const soh = sohSeries[t - 1]
    const E_use_year_mwh = E_nom_mwh * (dod_pct / 100) * soh
    const energy_discharged_mwh = E_use_year_mwh * cycles_per_year

    // FCR/balancing/solar are power- or asset-based, not throughput-based,
    // so they're held flat across the project life in this MVP (no
    // ancillary-price escalation or PV degradation modelled yet).
    const arbitrage_year_eur = energy_discharged_mwh * price_spread_eur_mwh * rte * (alloc_arbitrage_pct / 100)
    const gross_year_eur = arbitrage_year_eur + R_fcr + R_balancing + R_solar
    const net_year_eur = gross_year_eur - opex_eur
    // Arbitrage-only net (battery-only OPEX, no FCR/balancing/solar) — the
    // per-year figure that's actually comparable to `energy_discharged_mwh`
    // (also battery-only). Don't divide `net_year_eur` by this column's
    // energy figure; see the viability-check scope note near LCOS.
    const arbitrage_net_year_eur = arbitrage_year_eur - battery_opex_eur

    const discount_factor = 1 / Math.pow(1 + r, t)
    const discounted_net_eur = net_year_eur * discount_factor
    const discounted_energy_mwh = energy_discharged_mwh * discount_factor
    // Battery-only OPEX discounted for LCOS (see `battery_opex_eur` above)
    // — not the total `opex_eur`, so solar's OPEX share doesn't leak into
    // a battery-only-denominated metric.
    const discounted_battery_opex_eur = battery_opex_eur * discount_factor

    // Informational only (see LCOS note below) — the cost to recharge the
    // battery each year, shown per year but not folded into LCOS.
    const energy_purchased_mwh = rte > 0 ? energy_discharged_mwh / rte : 0
    const charging_cost_eur = energy_purchased_mwh * charging_price_eur_mwh

    npv_eur += discounted_net_eur
    sumDiscountedEnergyMwh += discounted_energy_mwh
    sumDiscountedOpexEur += discounted_battery_opex_eur

    years.push({
      year: t,
      soh_pct: soh * 100,
      energy_discharged_mwh,
      gross_eur: gross_year_eur,
      opex_eur,
      charging_cost_eur,
      arbitrage_net_eur: arbitrage_net_year_eur,
      net_eur: net_year_eur,
      discounted_net_eur
    })
  }

  // LCOS is deliberately CAPEX + discounted OPEX only (no charging cost
  // in the numerator). `price_spread_eur_mwh` is a net margin — Stage 1's
  // revenue/OPEX/NPV math never subtracts a separate energy-purchase
  // cost, because the cost of charging is already implicit in "spread".
  // Adding a second, independently-priced charging-cost deduction here
  // would double-count that cost and could flag a project NPV shows as
  // profitable as "not viable" — so charging cost is computed per year
  // (see `charging_cost_eur` above, for reference/transparency) but kept
  // out of the headline LCOS so it stays consistent with NPV/payback/ROI.
  // Validation note: NL utility-scale LCOS benchmark is €120–180/MWh in
  // 2026 (IndexBox) — computed LCOS should land in this band; outside it
  // signals a bad input (see calculatorConfig.js for sourced defaults).
  // Uses `battery_capex_eur` (not the total `capex_eur`) — LCOS is a
  // cost-of-storage metric and must stay scoped to the battery asset
  // alone, consistent with `sumDiscountedEnergyMwh` (battery-only
  // throughput) and with `captured_spread_eur_per_mwh` below.
  const lcos_eur_per_mwh =
    sumDiscountedEnergyMwh > 0 ? (battery_capex_eur + sumDiscountedOpexEur) / sumDiscountedEnergyMwh : null

  // €/MWh actually captured per MWh discharged via arbitrage (spread net
  // of round-trip losses) — the figure directly, consistently comparable
  // to LCOS above.
  const captured_spread_eur_per_mwh = price_spread_eur_mwh * rte
  const viableOnArbitrage = lcos_eur_per_mwh != null ? captured_spread_eur_per_mwh >= lcos_eur_per_mwh : false

  return {
    mode,
    E_nom_mwh,
    E_use_mwh,
    rte,
    capex_eur,
    capex_per_kwh,
    annual_gross_eur,
    opex_eur,
    annual_net_eur,
    payback_years,
    roi_pct,

    degradation: {
      annual_loss_pct: degradation_annual_pct,
      soh_end_of_life_pct: sohSeries[sohSeries.length - 1] * 100
    },

    allocation: {
      arbitrage_pct: alloc_arbitrage_pct,
      fcr_pct: alloc_fcr_pct,
      balancing_pct: alloc_balancing_pct,
      clamped: allocClamped,
      fcrEligible,
      balancingEligible
    },

    revenueSplit: {
      arbitrage_eur: R_arbitrage,
      fcr_eur: R_fcr,
      balancing_eur: R_balancing,
      solar_eur: R_solar
    },

    solar: {
      generation_mwh: pv_generation_mwh_yr,
      self_consumed_mwh,
      exported_mwh,
      self_consumed_value_eur,
      exported_value_eur,
      summer_generation_mwh,
      winter_generation_mwh,
      summer_value_eur,
      winter_value_eur,
      net_metering_2027,
      capex_eur: solar_capex_eur
    },

    lifecycle: {
      years,
      npv_eur,
      lcos_eur_per_mwh,
      captured_spread_eur_per_mwh,
      viableOnArbitrage,
      discount_rate_pct
    }
  }
}
