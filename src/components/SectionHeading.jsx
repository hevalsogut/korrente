import Reveal from './Reveal.jsx'
import './SectionHeading.css'

/**
 * Consistent section header: eyebrow + title + optional lead.
 * `align` = 'left' | 'center'
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  as: TitleTag = 'h2',
  className = ''
}) {
  return (
    <Reveal className={`section-heading section-heading--${align} ${className}`.trim()}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <TitleTag className="section-heading__title h2">{title}</TitleTag>
      {lead && <p className="section-heading__lead lead">{lead}</p>}
    </Reveal>
  )
}
