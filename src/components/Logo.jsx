import { Link } from 'react-router-dom'

/**
 * Korrente wordmark: green rounded-square glyph with a white energy bolt.
 * `tone` controls the wordmark colour against dark/light backgrounds.
 */
export default function Logo({ tone = 'light', withText = true }) {
  const wordColor = tone === 'dark' ? 'var(--text-on-light)' : 'var(--text-on-dark)'

  return (
    <Link to="/" className="logo" aria-label="Korrente — home">
      <svg className="logo__mark" width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="10" fill="#47A257" />
        <path
          d="M22.5 8.5 13 22h6.2l-2 9.5L27 17.5h-6.3z"
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
