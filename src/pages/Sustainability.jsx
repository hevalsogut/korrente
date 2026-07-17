import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import Icon from '../components/Icon.jsx'
import { commitments } from '../data/content.js'
import { useI18n } from '../i18n/index.jsx'
import './Sustainability.css'

const pillarIcons = ['leaf', 'shield', 'spark']
const barPercents = [92, 88, 71, 64]

export default function Sustainability() {
  const { t, pick, lang } = useI18n()

  const seo = {
    title: 'Sustainability & Impact',
    description:
      "Korrente's sustainability commitments: net-zero operations by 2035, circular materials, nature-positive land, and community reinvestment."
  }

  const pillars = t('sustainability.pillars')
  const barLabels = t('sustainability.bars')

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/sustainability" />

      <PageHero eyebrow={t('sustainability.eyebrow')} title={t('sustainability.title')} lead={t('sustainability.lead')} />

      {/* Pillars */}
      <section className="surface-light section">
        <div className="container">
          <SectionHeading eyebrow={t('sustainability.approachEyebrow')} title={t('sustainability.approachTitle')} />
          <div className="pillars">
            {pillars.map((p, i) => (
              <Reveal className="pillar" key={i} delay={i * 90}>
                <span className="pillar__icon">
                  <Icon name={pillarIcons[i]} size={26} />
                </span>
                <h3 className="h4">{p.title}</h3>
                <p className="text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="surface-dark section">
        <div className="container">
          <SectionHeading
            eyebrow={t('sustainability.commitmentsEyebrow')}
            title={t('sustainability.commitmentsTitle')}
            lead={t('sustainability.commitmentsLead')}
          />
          <div className="commitments">
            {commitments.map((c, i) => (
              <Reveal className="commitment" key={c.id} delay={i * 80}>
                <span className="commitment__metric">{c.metric}</span>
                <div className="commitment__text">
                  <h3 className="h4">{pick(c.title)}</h3>
                  <p className="text-muted">{pick(c.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Progress feature */}
      <section className="surface-light--plain section">
        <div className="container impact-feature">
          <Reveal className="impact-feature__text">
            <span className="eyebrow">{t('sustainability.impactEyebrow')}</span>
            <h2 className="h3 impact-feature__title">{t('sustainability.impactTitle')}</h2>
            <p className="text-muted">{t('sustainability.impactBody')}</p>
          </Reveal>
          <Reveal className="impact-feature__bars" delay={120}>
            {barLabels.map((label, i) => (
              <div className="impact-bar" key={i}>
                <div className="impact-bar__head">
                  <span>{label}</span>
                  <span className="impact-bar__pct">{barPercents[i]}%</span>
                </div>
                <div className="impact-bar__track">
                  <span className="impact-bar__fill" style={{ '--pct': `${barPercents[i]}%` }} />
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
