/* ------------------------------------------------------------------
   REVENUE CALCULATOR — CONFIG
   Single source of truth for the battery storage revenue calculator.
   All figures are placeholder Netherlands market/engineering defaults
   pending confirmation — edit here, nothing else needs to change.

   All market values are periodically-refreshed manual constants, not
   live feeds. Refresh Bucket-A values (spread, CAPEX, FCR/aFRR) every
   6–12 months. Each value's source, URL, and set-date are in its
   inline comment.
   ------------------------------------------------------------------ */

/* Modes the calculator can run in. */
export const CALCULATOR_MODES = ['grid', 'solar']

export const DEFAULT_MODE = 'grid'

/* Duration options offered in Tier 1, in hours. */
export const DURATION_OPTIONS = [1, 2, 4]

export const DEFAULT_DURATION_H = 2

export const DEFAULT_POWER_MW = 100

/* System round-trip efficiency, auto-selected by duration. Read-only
   in the UI — never a user-typed input. */
// System round-trip efficiency by duration | source: Dutch BESS co-optimization study, ScienceDirect | https://www.sciencedirect.com/science/article/pii/S0301421525004100 | set: 2026-07 | Cites 300–400 cycles/yr, 85% RTE for a typical NL 10MW/20MWh system. Cell degradation from supplier datasheets (CATL/BYD/Samsung SDI).
export const RTE_BY_DURATION = {
  1: 0.82,
  2: 0.87,
  4: 0.9
}

/* Tier 2 "Advanced parameters" — pre-filled market/engineering
   defaults for the Netherlands. All are user-editable overrides. */
export const ADVANCED_DEFAULTS = {
  // NL day-ahead daily high–low spread, trailing-12mo avg | source: ENTSO-E Transparency Platform | https://transparency.entsoe.eu | set: 2026-07 | NL spreads high 2024–25, peaked May 2025; recompute yearly from ENTSO-E day-ahead prices (peak hours minus trough hours, averaged). Break-even for a 2h battery ≈ €114/MWh (BloombergNEF via Rabobank).
  price_spread_eur_mwh: 130,
  // Depth of discharge default | source: Dutch BESS co-optimization study, ScienceDirect | https://www.sciencedirect.com/science/article/pii/S0301421525004100 | set: 2026-07 | Cites 300–400 cycles/yr, 85% RTE for a typical NL 10MW/20MWh system. Cell degradation from supplier datasheets (CATL/BYD/Samsung SDI).
  dod_pct: 90,
  // Annual cycle count default | source: Dutch BESS co-optimization study, ScienceDirect | https://www.sciencedirect.com/science/article/pii/S0301421525004100 | set: 2026-07 | Cites 300–400 cycles/yr, 85% RTE for a typical NL 10MW/20MWh system. Cell degradation from supplier datasheets (CATL/BYD/Samsung SDI).
  cycles_per_year: 365,
  project_life_years: 15,
  // Power conversion system (PCS) cost per kW | source: IndexBox NL Advanced Battery Market 2026 | https://www.indexbox.io/store/netherlands-advanced-battery-market-analysis-forecast-size-trends-and-insights/ | set: 2026-07 | PCS range €40–70/kW.
  capex_power_eur_kw: 55,
  // Battery energy (cell+pack+BOS) cost per kWh, NL grid-scale | source: IndexBox NL Advanced Battery Market 2026 | https://www.indexbox.io/store/netherlands-advanced-battery-market-analysis-forecast-size-trends-and-insights/ | set: 2026-07 | NL projects run 15–25% above S. Europe (labor, safety, interconnection). Cell €90–130 + pack markup + BOS €80–120/kWh. Falling ~yearly; confirm against a real supplier quote before launch.
  // Calibration note: at this CAPEX, the default 2h/365-cycle case's
  // arbitrage break-even lands at ≈€121 captured spread (price_spread ×
  // RTE), vs BloombergNEF's ≈€114 benchmark cited above on
  // price_spread_eur_mwh — a ≈€7 gap driven by this NL CAPEX loading.
  // Since capex_energy_eur_kwh moves break-even directly, cross-check it
  // against a second source (e.g. a real NL BESS supplier quote) before
  // launch — the gap could mean this default is too high, or that the
  // BloombergNEF figure used a lower-CAPEX assumption than NL requires.
  capex_energy_eur_kwh: 250,
  opex_pct_of_capex: 1.5
}

/* ------------------------------------------------------------------
   STAGE 2 — FEATURE 1: throughput-based degradation
   Annual SoH (state-of-health) loss = cycles_per_year *
   degradation_per_full_cycle_pct + calendar_degradation_pct_yr.
   `degradation_per_full_cycle_pct` is calibrated so that, AT THE
   365-CYCLE DEFAULT, the total annual loss (per-cycle + calendar)
   comes out to ≈ 2.5%/yr — matching Stage 1's old flat rate, so the
   default case is unaffected. That means it's (2.5% - 0.5%) / 365 ≈
   0.00548%/cycle, slightly below the ~0.00685%/cycle a per-cycle-only
   split would suggest. Placeholder — confirm against real NL cell
   degradation data.
   ------------------------------------------------------------------ */
// Battery degradation assumptions (per-cycle + calendar) | source: Dutch BESS co-optimization study, ScienceDirect | https://www.sciencedirect.com/science/article/pii/S0301421525004100 | set: 2026-07 | Cites 300–400 cycles/yr, 85% RTE for a typical NL 10MW/20MWh system. Cell degradation from supplier datasheets (CATL/BYD/Samsung SDI).
export const DEGRADATION_DEFAULTS = {
  degradation_per_full_cycle_pct: 0.00548,
  calendar_degradation_pct_yr: 0.5
}

/* ------------------------------------------------------------------
   STAGE 2 — FEATURE 2: revenue stacking with zero-sum allocation
   Capacity given to FCR/balancing is capacity taken away from
   arbitrage — allocations always sum to 100%. `fcr_price_eur_mw_yr`
   and `balancing_price_eur_mw_yr` are placeholder NL capacity values
   (TenneT FCR/aFRR-mFRR); `*_min_duration_h` are simplified
   eligibility gates standing in for the market's real MWh/MW minimums.
   ------------------------------------------------------------------ */
export const STACKING_DEFAULTS = {
  alloc_fcr_pct: 0,
  alloc_balancing_pct: 0,
  // FCR capacity revenue per MW per year at full availability | source: Generation Green (aggregator, NL) | https://generationgreen.energy/nl/batterijen/fcr-afrr-mfrr/ | set: 2026-07 | ≈ €3,500–6,500/MW/month. DECLINING toward 2030 as battery supply grows — default conservatively. Official auction data: Regelleistung.net + TenneT transparency.
  fcr_price_eur_mw_yr: 78000,
  // aFRR capacity revenue per MW per year (capacity only, excl. activation energy) | source: Generation Green (aggregator, NL) | https://generationgreen.energy/nl/batterijen/fcr-afrr-mfrr/ | set: 2026-07 | ≈ €1,800–2,800/MW/month, midpoint €2,300 × 12. Declining. Official: https://www.tennet.eu/nl-en/markets/dutch-market/balancing-markets
  balancing_price_eur_mw_yr: 27600,
  // FCR minimum energy-to-power ratio | source: TenneT FCR Manual for BSPs | https://www.tennet.eu/electricity-market/dutch-ancillary-services/fcr-documents | set: 2026-07 | TenneT requires FCR providers to sustain full contracted power for a sufficient duration (commonly cited as a ≥1.25 MWh/MW ratio); a 1.0 MWh/MW (1h) battery does not meet this, a 2.0 MWh/MW (2h) battery does. Compared directly against duration_h since Tier 1 only offers discrete 1/2/4h options — confirm the exact ratio against TenneT's current FCR product spec before launch.
  fcr_min_duration_h: 1.25,
  balancing_min_duration_h: 2
}

/* ------------------------------------------------------------------
   STAGE 2 — FEATURE 3: solar-paired mode
   `summer_share_pct` is the only seasonal input — winter is always
   derived as (100 - summer_share_pct) so the split can't go out of
   sync. `net_metering_2027`: ON values exported solar at the retail
   import price (pre-2027 salderingsregeling); OFF values it at the
   low feed-in tariff (post-2027), making self-consumption the driver.
   ------------------------------------------------------------------ */
export const SOLAR_DEFAULTS = {
  // Defaulting PV to 100 MWp — matching the 100 MW battery default — is
  // what let solar revenue dominate the model with zero PV CAPEX (see
  // solar_capex_eur_per_kwp below, which now fixes the CAPEX side).
  // Sizing PV to the battery's own scale isn't necessarily wrong (some
  // co-located projects do pair 1:1), but a grid-connection-scale PV farm
  // paired with a much smaller battery is also common and would call for
  // a smaller default here. Left as-is (configurable) — flagging for
  // Heval to confirm which pairing ratio the tool should default to.
  pv_size_mwp: 100,
  annual_consumption_mwh: 0,
  specific_yield_kwh_per_kwp: 900,
  summer_share_pct: 60,
  self_consumption_rate_pct: 75,
  retail_import_eur_kwh: 0.22,
  feed_in_tariff_eur_kwh: 0.03,
  net_metering_2027: true,
  // PV system installed cost per kWp, utility-scale NL | source: Solar Data Atlas, Europe CAPEX 2026 | https://www.solardataatlas.com/en/data-solar-capex-europe | set: 2026-07 | NL utility-scale range €700–900/kWp (Q1 2026, compiled from IRENA Renewable Cost Database, Fraunhofer ISE, JRC PVGIS/EU PV Status Report); midpoint used. Placeholder — confirm against a real NL EPC quote before launch.
  solar_capex_eur_per_kwp: 800
}

/* ------------------------------------------------------------------
   STAGE 2 — FEATURE 4: lifetime economics (LCOS & NPV)
   `charging_price_eur_mwh` is a new placeholder this stage introduces:
   LCOS's "discounted charging cost" term needs an assumed price paid
   to recharge the battery (distinct from `price_spread_eur_mwh`,
   which is the net spread already captured by arbitrage revenue). A
   low off-peak NL day-ahead price is used as a stand-in — confirm
   against real data.
   ------------------------------------------------------------------ */
export const LIFETIME_DEFAULTS = {
  // WACC / discount rate for NPV & LCOS | source: corporate-finance assumption (not a market lookup) | set: 2026-07 | Not sourced from data — a modeling assumption users may override.
  discount_rate_pct: 7,
  charging_price_eur_mwh: 40
}

/* Sane input minimums/maximums, used to clamp inputs before they
   reach the calculator. */
export const INPUT_LIMITS = {
  power_mw: { min: 0.1 },
  price_spread_eur_mwh: { min: 0 },
  dod_pct: { min: 1, max: 100 },
  cycles_per_year: { min: 0 },
  project_life_years: { min: 1, max: 40 },
  capex_power_eur_kw: { min: 0 },
  capex_energy_eur_kwh: { min: 0 },
  opex_pct_of_capex: { min: 0, max: 100 },

  degradation_per_full_cycle_pct: { min: 0, max: 1 },
  calendar_degradation_pct_yr: { min: 0, max: 20 },

  alloc_fcr_pct: { min: 0, max: 100 },
  alloc_balancing_pct: { min: 0, max: 100 },
  fcr_price_eur_mw_yr: { min: 0 },
  balancing_price_eur_mw_yr: { min: 0 },

  pv_size_mwp: { min: 0 },
  annual_consumption_mwh: { min: 0 },
  specific_yield_kwh_per_kwp: { min: 0, max: 2000 },
  summer_share_pct: { min: 0, max: 100 },
  self_consumption_rate_pct: { min: 0, max: 100 },
  retail_import_eur_kwh: { min: 0 },
  feed_in_tariff_eur_kwh: { min: 0 },
  solar_capex_eur_per_kwp: { min: 0 },

  discount_rate_pct: { min: 0, max: 30 },
  charging_price_eur_mwh: { min: 0 }
}
