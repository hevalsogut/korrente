import { useEffect, useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import Icon from '../components/Icon.jsx'
import { fetchTechnologyPage, TECHNOLOGY_PAGE_FALLBACK } from '../lib/strapi.js'
import './Technology.css'

// Capability iconKeys are semantic (what the capability does), not Icon
// component names — map them to icons here, same as Home's featureCards.
const capabilityIcons = {
  forecasting: 'spark',
  dispatch: 'grid',
  maintenance: 'shield',
  integration: 'molecule'
}

export default function Technology() {
  const [page, setPage] = useState(TECHNOLOGY_PAGE_FALLBACK)

  useEffect(() => {
    fetchTechnologyPage()
      .then(setPage)
      .catch((err) => console.warn('Falling back to static technology page copy:', err))
  }, [])

  const seo = {
    title: 'Technology',
    description: 'Korrente Grid — the real-time platform that forecasts, dispatches, and optimises our clean-energy fleet.'
  }

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/technology" />
      <PageHero eyebrow={page.heroEyebrow} title={page.heroHeading} lead={page.heroSubhead} />

      <section className="surface-dark section">
        <div className="container">
          <SectionHeading
            eyebrow={page.platformEyebrow}
            title={page.platformHeading}
            lead={page.platformSubhead}
          />
          <div className="tech-grid">
            {page.capabilities.map((c, i) => (
              <Reveal className="tech-card" key={i} delay={i * 80}>
                <span className="tech-card__icon">
                  <Icon name={capabilityIcons[c.iconKey]} size={24} />
                </span>
                <h3 className="h4">{c.title}</h3>
                <p className="text-muted">{c.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
