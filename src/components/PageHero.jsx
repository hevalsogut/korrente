import Reveal from './Reveal.jsx'
import './PageHero.css'

/**
 * Interior-page hero band. Consistent header for About, Solutions, etc.
 */
export default function PageHero({ eyebrow, title, lead, children }) {
  return (
    <header className="page-hero surface-darker">
      <div className="page-hero__grid" aria-hidden="true" />
      <div className="container page-hero__inner">
        <Reveal>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </Reveal>
        <Reveal delay={80}>
          <h1 className="page-hero__title display-2">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal delay={160}>
            <p className="page-hero__lead lead">{lead}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={220} className="page-hero__extra">
            {children}
          </Reveal>
        )}
      </div>
    </header>
  )
}
