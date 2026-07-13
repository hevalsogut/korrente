import { Link } from 'react-router-dom'

/**
 * Korrente wordmark: green battery glyph with a white energy bolt.
 * `tone` controls the wordmark colour against dark/light backgrounds.
 */
export default function Logo({ tone = 'light', withText = true }) {
  const wordColor = tone === 'dark' ? 'var(--text-on-light)' : 'var(--text-on-dark)'

  return (
    <Link to="/" className="logo" aria-label="Korrente — home">
      <svg className="logo__mark" width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
        <rect x="0" y="0" width="3.11" height="40" fill="#5BB56A" />
        <rect x="6.22" y="0" width="33.78" height="40" fill="#5BB56A" />
        <path
          d="M10.59 38.34 35.33 24.89 34.96 23.37 29.08 19.4 28.05 17.5 36.23 4.13 36.52 1.73 34.27 2.24 10.84 15.11 11.26 16.69 17.34 20.82 18.2 22.5 9.81 36.34 9.45 37.94Z"
          fill="#fff"
        />
      </svg>
      {withText && (
        <span className="logo__word" style={{ color: wordColor }}>
          Korrente
        </span>
      )}
    </Link>
  )
}
