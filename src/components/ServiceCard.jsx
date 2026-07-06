import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useI18n } from '../i18n/index.jsx'
import './ServiceCard.css'

/**
 * Compact solution card for the Home overview grid.
 */
export default function ServiceCard({ service }) {
  const { t, pick } = useI18n()
  const name = pick(service.name)

  return (
    <Link to="/solutions" className="service-card" aria-label={name}>
      <span className="service-card__icon">
        <Icon name={service.icon} size={26} />
      </span>
      <h3 className="service-card__title">{name}</h3>
      <p className="service-card__summary">{pick(service.summary)}</p>
      <span className="service-card__more">
        {t('common.explore')}
        <Icon name="arrowUpRight" size={16} />
      </span>
    </Link>
  )
}
