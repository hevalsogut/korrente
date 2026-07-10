import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import StatsBand from '../components/StatsBand.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import Icon from '../components/Icon.jsx'
import { team, values } from '../data/content.js'
import { useI18n } from '../i18n/index.jsx'
import './About.css'

const principleIcons = ['shield', 'leaf', 'spark']

export default function About() {
  const { t, pick, lang } = useI18n()

  const seo = {
    en: {
      title: 'About',
      description:
        'Korrente is a battery energy storage (BESS) company. Meet the team and the principles behind dependable, grid-ready energy storage.'
    },
    tr: {
      title: 'Hakkımızda',
      description:
        'Korrente, bir batarya enerji depolama (BESS) şirketidir. Güvenilir, şebekeye hazır enerji depolamanın arkasındaki ekiple ve ilkelerle tanışın.'
    }
  }[lang]

  const principles = t('about.principles')

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/about" />

      <PageHero
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        lead={t('about.lead')}
      />

      {/* Mission split */}
      <section className="surface-light section">
        <div className="container about-mission">
          <Reveal>
            <span className="eyebrow">{t('about.missionEyebrow')}</span>
            <p className="about-mission__lead h3">
              {t('about.missionPre')}
              <span className="accent-word">{t('about.missionAccent')}</span>
              {t('about.missionPost')}
            </p>
          </Reveal>
          <Reveal delay={120} className="about-mission__body">
            <p>{t('about.missionBody1')}</p>
            <p>{t('about.missionBody2')}</p>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="surface-light--plain section--tight">
        <div className="container">
          <div className="about-principles">
            {principles.map((p, i) => (
              <Reveal className="about-principle" key={i} delay={i * 90}>
                <span className="about-principle__icon">
                  <Icon name={principleIcons[i]} size={24} />
                </span>
                <h3 className="h4">{p.title}</h3>
                <p className="text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBand eyebrow={t('about.statsEyebrow')} heading={t('about.statsHeading')} />

      {/* Values recap */}
      <section className="surface-light section">
        <div className="container">
          <SectionHeading eyebrow={t('about.valuesEyebrow')} title={t('about.valuesTitle')} align="center" />
          <div className="about-values">
            {values.map((v, i) => (
              <Reveal className="about-value" key={v.id} delay={i * 70}>
                <span className="about-value__num">{v.number}</span>
                <h3 className="h4">{pick(v.title)}</h3>
                <p className="text-muted">{pick(v.body)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="surface-light--plain section">
        <div className="container">
          <SectionHeading eyebrow={t('about.leadershipEyebrow')} title={t('about.leadershipTitle')} />
          <div className="team">
            {team.map((member, i) => (
              <Reveal className="team-card" key={member.id} delay={i * 80}>
                <div className="team-card__avatar" aria-hidden="true">
                  <span>{member.initials}</span>
                </div>
                <h3 className="team-card__name h4">{member.displayName}</h3>
                <p className="team-card__role">{pick(member.role)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA eyebrow={t('about.ctaEyebrow')} title={t('about.ctaTitle')} body={t('about.ctaBody')} />
    </>
  )
}
