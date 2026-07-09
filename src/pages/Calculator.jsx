import { useMemo, useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import {
  CALCULATOR_MODES,
  DEFAULT_MODE,
  DURATION_OPTIONS,
  DEFAULT_DURATION_H,
  DEFAULT_POWER_MW,
  ADVANCED_DEFAULTS,
  DEGRADATION_DEFAULTS,
  STACKING_DEFAULTS,
  SOLAR_DEFAULTS,
  LIFETIME_DEFAULTS
} from '../data/calculatorConfig.js'
import { calculateRevenue } from '../lib/calculator.js'
import { useI18n } from '../i18n/index.jsx'
import './Calculator.css'

const initialInputs = {
  mode: DEFAULT_MODE,
  power_mw: DEFAULT_POWER_MW,
  duration_h: DEFAULT_DURATION_H,
  ...ADVANCED_DEFAULTS,
  ...DEGRADATION_DEFAULTS,
  fcr_enabled: false,
  balancing_enabled: false,
  ...STACKING_DEFAULTS,
  ...SOLAR_DEFAULTS,
  ...LIFETIME_DEFAULTS
}

/* Tier 2 field groups. `long` marks fields whose helper note is
   collapsible. Grouped so the single "Advanced parameters" panel
   stays scannable as it's grown across stages. */
const CORE_FIELDS = [
  { key: 'price_spread_eur_mwh', i18n: 'priceSpread', step: 1, long: true },
  { key: 'dod_pct', i18n: 'dod', step: 1 },
  { key: 'cycles_per_year', i18n: 'cycles', step: 1, long: true },
  { key: 'project_life_years', i18n: 'life', step: 1 },
  { key: 'capex_power_eur_kw', i18n: 'capexPower', step: 1 },
  { key: 'capex_energy_eur_kwh', i18n: 'capexEnergy', step: 1 },
  { key: 'opex_pct_of_capex', i18n: 'opex', step: 0.1 }
]

const DEGRADATION_FIELDS = [
  { key: 'degradation_per_full_cycle_pct', i18n: 'degradationPerCycle', step: 0.001 },
  { key: 'calendar_degradation_pct_yr', i18n: 'calendarDegradation', step: 0.1 }
]

const SOLAR_ADVANCED_FIELDS = [
  { key: 'specific_yield_kwh_per_kwp', i18n: 'specificYield', step: 10 },
  { key: 'summer_share_pct', i18n: 'summerShare', step: 1 },
  { key: 'self_consumption_rate_pct', i18n: 'selfConsumption', step: 1 },
  { key: 'retail_import_eur_kwh', i18n: 'retailImport', step: 0.01 },
  { key: 'feed_in_tariff_eur_kwh', i18n: 'feedInTariff', step: 0.01 }
]

const LIFECYCLE_FIELDS = [
  { key: 'discount_rate_pct', i18n: 'discountRate', step: 0.5 },
  { key: 'charging_price_eur_mwh', i18n: 'chargingPrice', step: 1 }
]

/* Helper note beneath a field. Long notes render clamped to one line
   with a "Show more/less" toggle; short notes render as plain text. */
function HelpNote({ text, expandable, open, onToggle, moreLabel, lessLabel }) {
  if (!expandable) {
    return <p className="calc-field__help">{text}</p>
  }
  return (
    <div className="calc-field__help-wrap">
      <p className={`calc-field__help ${open ? '' : 'calc-field__help--clamped'}`}>{text}</p>
      <button type="button" className="calc-field__help-toggle" onClick={onToggle} aria-expanded={open}>
        {open ? lessLabel : moreLabel}
      </button>
    </div>
  )
}

/* A single Tier 2 number field: label + unit, input, helper note. */
function AdvancedField({ field, value, onChange, openNotes, toggleNote, moreLabel, lessLabel, t }) {
  const { key, i18n, step, long } = field
  return (
    <div className="calc-field">
      <label htmlFor={`calc-${key}`}>
        {t(`calculator.fields.${i18n}.label`)}{' '}
        <span className="calc-field__unit">({t(`calculator.fields.${i18n}.unit`)})</span>
      </label>
      <input
        id={`calc-${key}`}
        type="number"
        min="0"
        step={step}
        inputMode="decimal"
        value={value}
        onChange={onChange}
      />
      <HelpNote
        text={t(`calculator.fields.${i18n}.help`)}
        expandable={!!long}
        open={!!openNotes[key]}
        onToggle={() => toggleNote(key)}
        moreLabel={moreLabel}
        lessLabel={lessLabel}
      />
    </div>
  )
}

/* A labelled percentage/value bar — used for capacity allocation and
   seasonal generation. No charting library; just a styled track+fill. */
function Bar({ label, valueLabel, pct }) {
  return (
    <div className="calc-alloc-bar">
      <div className="calc-alloc-bar__head">
        <span>{label}</span>
        <span>{valueLabel}</span>
      </div>
      <div className="calc-alloc-bar__track">
        <span className="calc-alloc-bar__fill" style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
      </div>
    </div>
  )
}

function locale(lang) {
  return lang === 'tr' ? 'tr-TR' : 'en-US'
}

function fmtNumber(lang, value, digits = 0) {
  return new Intl.NumberFormat(locale(lang), {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(value)
}

function fmtCurrency(lang, value, digits = 0) {
  return new Intl.NumberFormat(locale(lang), {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(value)
}

export default function Calculator() {
  const { t, lang } = useI18n()
  const [inputs, setInputs] = useState(initialInputs)
  const [openNotes, setOpenNotes] = useState({})

  // FCR/balancing toggles gate whether their % allocation actually
  // reaches the calculator — unchecking keeps the typed % in local
  // state (so re-checking restores it) but contributes 0 either way.
  const effectiveInputs = useMemo(
    () => ({
      ...inputs,
      alloc_fcr_pct: inputs.fcr_enabled ? inputs.alloc_fcr_pct : 0,
      alloc_balancing_pct: inputs.balancing_enabled ? inputs.alloc_balancing_pct : 0
    }),
    [inputs]
  )

  const results = useMemo(() => calculateRevenue(effectiveInputs), [effectiveInputs])
  const toggleNote = (key) => setOpenNotes((prev) => ({ ...prev, [key]: !prev[key] }))
  const moreLabel = t('common.showMore')
  const lessLabel = t('common.showLess')
  const isSolar = inputs.mode === 'solar'

  const seo = {
    en: {
      title: 'Revenue Calculator',
      description:
        'Estimate battery storage grid-arbitrage revenue for a Netherlands project — nameplate capacity, CAPEX, annual income, payback, and ROI, recalculated instantly.'
    },
    tr: {
      title: 'Gelir Hesaplayıcı',
      description:
        'Hollanda projesi için batarya depolama şebeke arbitrajı gelirini tahmin edin — anma kapasitesi, CAPEX, yıllık gelir, geri ödeme ve ROI anında yeniden hesaplanır.'
    }
  }[lang]

  const update = (key) => (e) => {
    setInputs((prev) => ({ ...prev, [key]: e.target.value }))
  }
  const updateChecked = (key) => (e) => {
    setInputs((prev) => ({ ...prev, [key]: e.target.checked }))
  }

  const resultCards = [
    { key: 'nameplate', value: `${fmtNumber(lang, results.E_nom_mwh, 1)} MWh` },
    { key: 'usable', value: `${fmtNumber(lang, results.E_use_mwh, 1)} MWh` },
    { key: 'rte', value: `${fmtNumber(lang, results.rte * 100, 0)}%`, badge: t('calculator.auto') },
    { key: 'capex', value: fmtCurrency(lang, results.capex_eur, 0) },
    { key: 'capexPerKwh', value: `${fmtCurrency(lang, results.capex_per_kwh, 0)}/kWh` },
    { key: 'grossRevenue', value: fmtCurrency(lang, results.annual_gross_eur, 0) },
    { key: 'netIncome', value: fmtCurrency(lang, results.annual_net_eur, 0) },
    {
      key: 'payback',
      value:
        results.payback_years == null
          ? t('calculator.notViable')
          : `${fmtNumber(lang, results.payback_years, 1)} ${t('calculator.years')}`,
      muted: results.payback_years == null
    },
    { key: 'roi', value: `${fmtNumber(lang, results.roi_pct, 1)}%` }
  ]

  const fcrIneligibleNote = t('calculator.stacking.ineligible')
    .replace('{h}', inputs.duration_h)
    .replace('{min}', STACKING_DEFAULTS.fcr_min_duration_h)
  const balancingIneligibleNote = t('calculator.stacking.ineligible')
    .replace('{h}', inputs.duration_h)
    .replace('{min}', STACKING_DEFAULTS.balancing_min_duration_h)

  const lcosLabel = results.lifecycle.lcos_eur_per_mwh != null ? `${fmtCurrency(lang, results.lifecycle.lcos_eur_per_mwh, 0)}/MWh` : '—'
  const spreadLabel = `${fmtCurrency(lang, results.lifecycle.captured_spread_eur_per_mwh, 0)}/MWh`

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/calculator" />

      <PageHero eyebrow={t('calculator.eyebrow')} title={t('calculator.title')} lead={t('calculator.lead')} />

      <section className="surface-light section">
        <div className="container calc-grid">
          {/* Inputs */}
          <Reveal className="calc-panel">
            <h2 className="h4">{t('calculator.inputsTitle')}</h2>

            <div className="calc-field">
              <label htmlFor="calc-mode">{t('calculator.modeLabel')}</label>
              <select id="calc-mode" value={inputs.mode} onChange={update('mode')}>
                {CALCULATOR_MODES.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode === 'grid' ? t('calculator.modeGrid') : t('calculator.modeSolar')}
                  </option>
                ))}
              </select>
            </div>

            <div className="calc-field-row">
              <div className="calc-field">
                <label htmlFor="calc-power">{t('calculator.powerLabel')} (MW)</label>
                <input
                  id="calc-power"
                  type="number"
                  min="0.1"
                  step="1"
                  inputMode="decimal"
                  value={inputs.power_mw}
                  onChange={update('power_mw')}
                />
                <p className="calc-field__help">{t('calculator.powerHelp')}</p>
              </div>

              <div className="calc-field">
                <label htmlFor="calc-duration">{t('calculator.durationLabel')} ({t('calculator.durationUnit')})</label>
                <select id="calc-duration" value={inputs.duration_h} onChange={update('duration_h')}>
                  {DURATION_OPTIONS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <HelpNote
                  text={t('calculator.durationHelp')}
                  expandable
                  open={!!openNotes.duration_h}
                  onToggle={() => toggleNote('duration_h')}
                  moreLabel={moreLabel}
                  lessLabel={lessLabel}
                />
              </div>
            </div>

            {isSolar && (
              <>
                <div className="calc-field-row">
                  <div className="calc-field">
                    <label htmlFor="calc-pv-size">{t('calculator.solar.pvSizeLabel')} (MWp)</label>
                    <input
                      id="calc-pv-size"
                      type="number"
                      min="0"
                      step="1"
                      inputMode="decimal"
                      value={inputs.pv_size_mwp}
                      onChange={update('pv_size_mwp')}
                    />
                    <p className="calc-field__help">{t('calculator.solar.pvSizeHelp')}</p>
                  </div>
                  <div className="calc-field">
                    <label htmlFor="calc-consumption">{t('calculator.solar.consumptionLabel')} (MWh)</label>
                    <input
                      id="calc-consumption"
                      type="number"
                      min="0"
                      step="1"
                      inputMode="decimal"
                      value={inputs.annual_consumption_mwh}
                      onChange={update('annual_consumption_mwh')}
                    />
                    <p className="calc-field__help">{t('calculator.solar.consumptionHelp')}</p>
                  </div>
                </div>
                <div className="calc-checkbox-field">
                  <input
                    type="checkbox"
                    id="calc-net-metering"
                    checked={inputs.net_metering_2027}
                    onChange={updateChecked('net_metering_2027')}
                  />
                  <label htmlFor="calc-net-metering">{t('calculator.solar.netMeteringLabel')}</label>
                </div>
                <p className="calc-field__help">{t('calculator.solar.netMeteringHelp')}</p>
              </>
            )}

            <details className="calc-advanced">
              <summary>
                {t('calculator.advancedToggle')}
                <Icon name="chevron" size={18} className="calc-advanced__chevron" />
              </summary>
              <p className="calc-advanced__note text-muted">{t('calculator.advancedNote')}</p>

              <p className="calc-advanced__group-title">{t('calculator.groupCore')}</p>
              <div className="calc-advanced__grid">
                {CORE_FIELDS.map((field) => (
                  <AdvancedField
                    key={field.key}
                    field={field}
                    value={inputs[field.key]}
                    onChange={update(field.key)}
                    openNotes={openNotes}
                    toggleNote={toggleNote}
                    moreLabel={moreLabel}
                    lessLabel={lessLabel}
                    t={t}
                  />
                ))}
              </div>

              <p className="calc-advanced__group-title">{t('calculator.groupDegradation')}</p>
              <div className="calc-advanced__grid">
                {DEGRADATION_FIELDS.map((field) => (
                  <AdvancedField
                    key={field.key}
                    field={field}
                    value={inputs[field.key]}
                    onChange={update(field.key)}
                    openNotes={openNotes}
                    toggleNote={toggleNote}
                    moreLabel={moreLabel}
                    lessLabel={lessLabel}
                    t={t}
                  />
                ))}
              </div>

              <p className="calc-advanced__group-title">{t('calculator.groupStacking')}</p>
              <p className="calc-field__help">{t('calculator.stacking.sectionNote')}</p>
              <div className="calc-stack-service">
                <div className="calc-checkbox-field">
                  <input
                    type="checkbox"
                    id="calc-fcr-enabled"
                    checked={inputs.fcr_enabled}
                    disabled={!results.allocation.fcrEligible}
                    onChange={updateChecked('fcr_enabled')}
                  />
                  <label htmlFor="calc-fcr-enabled">{t('calculator.stacking.fcrToggle')}</label>
                </div>
                {!results.allocation.fcrEligible && <p className="calc-ineligible-note">{fcrIneligibleNote}</p>}
                <div className="calc-field">
                  <label htmlFor="calc-alloc-fcr">{t('calculator.stacking.fcrAllocLabel')} (%)</label>
                  <input
                    id="calc-alloc-fcr"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    inputMode="decimal"
                    value={inputs.alloc_fcr_pct}
                    disabled={!inputs.fcr_enabled || !results.allocation.fcrEligible}
                    onChange={update('alloc_fcr_pct')}
                  />
                </div>
                <AdvancedField
                  field={{ key: 'fcr_price_eur_mw_yr', i18n: 'fcrPrice', step: 1000 }}
                  value={inputs.fcr_price_eur_mw_yr}
                  onChange={update('fcr_price_eur_mw_yr')}
                  openNotes={openNotes}
                  toggleNote={toggleNote}
                  moreLabel={moreLabel}
                  lessLabel={lessLabel}
                  t={t}
                />
              </div>
              <div className="calc-stack-service">
                <div className="calc-checkbox-field">
                  <input
                    type="checkbox"
                    id="calc-balancing-enabled"
                    checked={inputs.balancing_enabled}
                    disabled={!results.allocation.balancingEligible}
                    onChange={updateChecked('balancing_enabled')}
                  />
                  <label htmlFor="calc-balancing-enabled">{t('calculator.stacking.balancingToggle')}</label>
                </div>
                {!results.allocation.balancingEligible && (
                  <p className="calc-ineligible-note">{balancingIneligibleNote}</p>
                )}
                <div className="calc-field">
                  <label htmlFor="calc-alloc-balancing">{t('calculator.stacking.balancingAllocLabel')} (%)</label>
                  <input
                    id="calc-alloc-balancing"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    inputMode="decimal"
                    value={inputs.alloc_balancing_pct}
                    disabled={!inputs.balancing_enabled || !results.allocation.balancingEligible}
                    onChange={update('alloc_balancing_pct')}
                  />
                </div>
                <AdvancedField
                  field={{ key: 'balancing_price_eur_mw_yr', i18n: 'balancingPrice', step: 1000 }}
                  value={inputs.balancing_price_eur_mw_yr}
                  onChange={update('balancing_price_eur_mw_yr')}
                  openNotes={openNotes}
                  toggleNote={toggleNote}
                  moreLabel={moreLabel}
                  lessLabel={lessLabel}
                  t={t}
                />
              </div>

              {isSolar && (
                <>
                  <p className="calc-advanced__group-title">{t('calculator.groupSolar')}</p>
                  <div className="calc-advanced__grid">
                    {SOLAR_ADVANCED_FIELDS.map((field) => (
                      <AdvancedField
                        key={field.key}
                        field={field}
                        value={inputs[field.key]}
                        onChange={update(field.key)}
                        openNotes={openNotes}
                        toggleNote={toggleNote}
                        moreLabel={moreLabel}
                        lessLabel={lessLabel}
                        t={t}
                      />
                    ))}
                  </div>
                </>
              )}

              <p className="calc-advanced__group-title">{t('calculator.groupLifecycle')}</p>
              <div className="calc-advanced__grid">
                {LIFECYCLE_FIELDS.map((field) => (
                  <AdvancedField
                    key={field.key}
                    field={field}
                    value={inputs[field.key]}
                    onChange={update(field.key)}
                    openNotes={openNotes}
                    toggleNote={toggleNote}
                    moreLabel={moreLabel}
                    lessLabel={lessLabel}
                    t={t}
                  />
                ))}
              </div>
            </details>
          </Reveal>

          {/* Results */}
          <Reveal className="calc-results" delay={100}>
            <h2 className="h4">{t('calculator.resultsTitle')}</h2>
            <div className="calc-results__grid">
              {resultCards.map((card) => (
                <div className="calc-card" key={card.key}>
                  <span className="calc-card__label">
                    {t(`calculator.results.${card.key}`)}
                    {card.badge && <span className="calc-card__badge">{card.badge}</span>}
                  </span>
                  <span className={`calc-card__value ${card.muted ? 'calc-card__value--muted' : ''}`}>
                    {card.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Capacity allocation */}
            <div className="calc-subsection">
              <h3 className="h4">{t('calculator.stacking.allocationTitle')}</h3>
              {results.allocation.clamped && <p className="calc-warning">{t('calculator.stacking.clampedWarning')}</p>}
              <Bar
                label={t('calculator.stacking.allocArbitrage')}
                valueLabel={`${fmtNumber(lang, results.allocation.arbitrage_pct, 0)}%`}
                pct={results.allocation.arbitrage_pct}
              />
              <Bar
                label={t('calculator.stacking.allocFcr')}
                valueLabel={`${fmtNumber(lang, results.allocation.fcr_pct, 0)}%`}
                pct={results.allocation.fcr_pct}
              />
              <Bar
                label={t('calculator.stacking.allocBalancing')}
                valueLabel={`${fmtNumber(lang, results.allocation.balancing_pct, 0)}%`}
                pct={results.allocation.balancing_pct}
              />
            </div>

            {/* Lifetime economics */}
            <div className="calc-subsection">
              <h3 className="h4">{t('calculator.lifecycle.sectionTitle')}</h3>
              <div className="calc-results__grid">
                <div className="calc-card">
                  <span className="calc-card__label">{t('calculator.lifecycle.lcos')}</span>
                  <span className="calc-card__value">{lcosLabel}</span>
                </div>
                <div className="calc-card">
                  <span className="calc-card__label">{t('calculator.lifecycle.npv')}</span>
                  <span className="calc-card__value">{fmtCurrency(lang, results.lifecycle.npv_eur, 0)}</span>
                </div>
              </div>
              <p className={`calc-viability ${results.lifecycle.viableOnArbitrage ? 'calc-viability--ok' : 'calc-viability--warn'}`}>
                {results.lifecycle.viableOnArbitrage ? t('calculator.lifecycle.viable') : t('calculator.lifecycle.notViable')}
              </p>
              <p className="calc-field__help">{t('calculator.lifecycle.scopeNote')}</p>
              <p className="calc-field__help">
                {t('calculator.lifecycle.viabilityNote').replace('{spread}', spreadLabel).replace('{lcos}', lcosLabel)}
              </p>

              <h4 className="calc-subtitle">{t('calculator.lifecycle.tableTitle')}</h4>
              <p className="calc-field__help">{t('calculator.lifecycle.tableNote')}</p>
              <div className="calc-table-scroll">
                <table className="calc-table">
                  <thead>
                    <tr>
                      <th>{t('calculator.lifecycle.colYear')}</th>
                      <th>{t('calculator.lifecycle.colSoh')}</th>
                      <th>{t('calculator.lifecycle.colEnergy')}</th>
                      <th>{t('calculator.lifecycle.colArbitrageNet')}</th>
                      <th>{t('calculator.lifecycle.colNet')}</th>
                      <th>{t('calculator.lifecycle.colDiscounted')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.lifecycle.years.map((y) => (
                      <tr key={y.year}>
                        <td>{y.year}</td>
                        <td>{fmtNumber(lang, y.soh_pct, 0)}%</td>
                        <td>{fmtNumber(lang, y.energy_discharged_mwh, 0)}</td>
                        <td>{fmtCurrency(lang, y.arbitrage_net_eur, 0)}</td>
                        <td>{fmtCurrency(lang, y.net_eur, 0)}</td>
                        <td>{fmtCurrency(lang, y.discounted_net_eur, 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Solar economics */}
            {isSolar && (
              <div className="calc-subsection">
                <h3 className="h4">{t('calculator.solarResults.sectionTitle')}</h3>
                <div className="calc-results__grid">
                  <div className="calc-card">
                    <span className="calc-card__label">{t('calculator.solarResults.selfConsumedValue')}</span>
                    <span className="calc-card__value">{fmtCurrency(lang, results.solar.self_consumed_value_eur, 0)}</span>
                  </div>
                  <div className="calc-card">
                    <span className="calc-card__label">{t('calculator.solarResults.exportedValue')}</span>
                    <span className="calc-card__value">{fmtCurrency(lang, results.solar.exported_value_eur, 0)}</span>
                  </div>
                </div>
                <h4 className="calc-subtitle">{t('calculator.solarResults.seasonalTitle')}</h4>
                <Bar
                  label={t('calculator.solarResults.summer')}
                  valueLabel={`${fmtNumber(lang, results.solar.summer_generation_mwh, 0)} MWh`}
                  pct={results.solar.generation_mwh > 0 ? (results.solar.summer_generation_mwh / results.solar.generation_mwh) * 100 : 0}
                />
                <Bar
                  label={t('calculator.solarResults.winter')}
                  valueLabel={`${fmtNumber(lang, results.solar.winter_generation_mwh, 0)} MWh`}
                  pct={results.solar.generation_mwh > 0 ? (results.solar.winter_generation_mwh / results.solar.generation_mwh) * 100 : 0}
                />
              </div>
            )}

            <p className="calc-disclaimer text-muted">{t('calculator.disclaimer')}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
