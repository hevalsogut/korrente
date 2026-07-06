import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import './Button.css'

/**
 * Polymorphic button/link.
 *  - `to`   → internal react-router Link
 *  - `href` → external anchor (opens safely in new tab)
 *  - else   → <button>
 *
 * variant: 'primary' | 'outline' | 'ghost'
 * size:    'md' | 'lg'
 * icon:    optional Icon name appended after the label
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon = 'arrow',
  className = '',
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()

  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {icon && <Icon name={icon} size={18} className="btn__icon" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {inner}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  )
}
