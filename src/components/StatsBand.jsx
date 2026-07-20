import Counter from './Counter.jsx'
import Reveal from './Reveal.jsx'
import './StatsBand.css'

// Stats arrive as a single display string (e.g. "2.5 GWh+"). Split off the
// leading number so Counter can still animate the count-up; anything after
// it (unit, "+", "%"...) is passed straight through as a suffix.
function parseStatValue(value) {
  const match = /^(\d+(?:\.\d+)?)/.exec(value || '')
  if (!match) return null
  const [numeric] = match
  const decimals = numeric.includes('.') ? numeric.split('.')[1].length : 0
  return { value: parseFloat(numeric), decimals, suffix: value.slice(numeric.length) }
}

/**
 * Impact stats with animated counters. Sourced from the Global single
 * type (see fetchGlobal/GLOBAL_FALLBACK) — Home and Projects both feed
 * this the same eyebrow/heading/stats so the two pages stay in sync.
 */
export default function StatsBand({ eyebrow, heading, lead, stats }) {
  return (
    <section className="stats-band surface-darker section" aria-label={eyebrow}>
      <div className="container">
        <Reveal className="stats-band__head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h3 stats-band__heading">{heading}</h2>
          {lead && <p className="lead">{lead}</p>}
        </Reveal>

        <dl className="stats-band__grid">
          {stats.map((stat, i) => {
            const parsed = parseStatValue(stat.value)
            return (
              <Reveal as="div" className="stat" key={i} delay={i * 90}>
                <dd className="stat__value">
                  {parsed ? (
                    <Counter value={parsed.value} decimals={parsed.decimals} suffix={parsed.suffix} />
                  ) : (
                    stat.value
                  )}
                </dd>
                <dt className="stat__label">{stat.label}</dt>
              </Reveal>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
