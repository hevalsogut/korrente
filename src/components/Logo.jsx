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
        <rect x="15" y="4" width="10" height="5" rx="1.5" fill="#47A257" />
        <rect x="8" y="8" width="24" height="29" rx="6" fill="#47A257" />
        <path
          d="M22 11 14 23h5l-2 11 9-14h-5.5z"
          fill="#fff"
          stroke="#fff"
          strokeWidth="0.5"
          strokeLinejoin="round"
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
