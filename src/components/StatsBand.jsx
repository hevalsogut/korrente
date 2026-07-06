import Counter from './Counter.jsx'
import Reveal from './Reveal.jsx'
import { stats } from '../data/content.js'
import { useI18n } from '../i18n/index.jsx'
import './StatsBand.css'

/**
 * Impact stats with animated counters.
 * `eyebrow`/`heading` override the defaults (already-translated strings).
 */
export default function StatsBand({ eyebrow, heading, lead }) {
  const { t, pick } = useI18n()

  return (
    <section className="stats-band surface-darker section" aria-label={t('stats.eyebrow')}>
      <div className="container">
        <Reveal className="stats-band__head">
          <span className="eyebrow">{eyebrow || t('stats.eyebrow')}</span>
          <h2 className="h3 stats-band__heading">{heading || t('stats.heading')}</h2>
          {lead && <p className="lead">{lead}</p>}
        </Reveal>

        <dl className="stats-band__grid">
          {stats.map((stat, i) => (
            <Reveal as="div" className="stat" key={stat.id} delay={i * 90}>
              <dd className="stat__value">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || ''}
                />
              </dd>
              <dt className="stat__label">{pick(stat.label)}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
