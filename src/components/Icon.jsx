/**
 * Inline SVG icon set. All icons inherit `currentColor` and use a
 * consistent 24×24 viewBox with 1.6 stroke for visual harmony.
 * Usage: <Icon name="sun" />
 */
const paths = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
    </>
  ),
  wind: (
    <>
      <path d="M3 8h11a3 3 0 1 0-3-3" />
      <path d="M3 16h15a3 3 0 1 1-3 3" />
      <path d="M3 12h8.5a2.5 2.5 0 1 0-2.5-2.5" opacity="0" />
    </>
  ),
  battery: (
    <>
      <rect x="2.5" y="7" width="16" height="10" rx="2.2" />
      <path d="M21.5 10.5v3" />
      <path d="M7 12l2.4-3v3.6L12 9" />
    </>
  ),
  grid: (
    <>
      <path d="M12 2v20M2 12h20" />
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" opacity="0.55" />
    </>
  ),
  molecule: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5.5" cy="17" r="2.2" />
      <circle cx="18.5" cy="17" r="2.2" />
      <path d="M11 6.9 6.6 15M13 6.9 17.4 15M7.7 17h8.6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M15.6 8.4 13.4 13.4 8.4 15.6 10.6 10.6z" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  check: <path d="M4 12.5 9 17.5 20 6.5" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.4" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5c.5 0 .9.3 1 .8l.8 3a1 1 0 0 1-.3 1L6.6 9.6a13 13 0 0 0 5.8 5.8l1.3-1.4a1 1 0 0 1 1-.3l3 .8c.5.1.8.5.8 1v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3.5 5.5a2 2 0 0 1 2-2z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  spark: <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6.3 6.3l3.2 3.2M14.5 14.5l3.2 3.2M17.7 6.3l-3.2 3.2M9.5 14.5l-3.2 3.2" />,
  leaf: (
    <>
      <path d="M4 20c0-8 6-14 16-14 0 10-6 14-14 14" />
      <path d="M4 20c3-5 7-8 12-9" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  )
}

export default function Icon({ name, size = 24, className = '', strokeWidth = 1.6, ...rest }) {
  const content = paths[name]
  if (!content) return null
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {content}
    </svg>
  )
}
