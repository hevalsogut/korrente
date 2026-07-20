/* ------------------------------------------------------------------
   SITE-WIDE CONTENT
   Company details, navigation, and contact info.
   Labels are bilingual: { en, tr }. Select with pick() from useI18n().
   ------------------------------------------------------------------ */

export const company = {
  name: 'Korrente',
  foundedYear: 2011,
  pressEmail: 'press@korrente.com'
}

/* Primary navigation — matches the reference header */
export const navLinks = [
  { to: '/solutions', label: 'Solutions' },
  { to: '/technology', label: 'Technology' },
  { to: '/projects', label: 'Projects' },
  { to: '/calculator', label: 'Revenue Calculator' },
  { to: '/news', label: 'News' }
]

export const footerNav = [
  {
    title: 'Explore',
    links: [
      { to: '/sustainability', label: 'Sustainability' },
      { to: '/news', label: 'Insights' }
    ]
  },
  {
    title: 'Solutions',
    links: [
      { to: '/solutions', label: 'Utility-Scale Solar' },
      { to: '/solutions', label: 'Wind Development' },
      { to: '/solutions', label: 'Energy Storage' },
      { to: '/solutions', label: 'Grid Intelligence' }
    ]
  },
  {
    title: 'Connect',
    links: [
      { to: '/contact', label: 'Contact' },
      { to: '/contact', label: 'Partner with us' },
      { to: '/contact', label: 'Press' }
    ]
  }
]

export const legalLinks = [
  { to: '/', label: 'Privacy' },
  { to: '/', label: 'Terms' },
  { to: '/', label: 'Cookies' }
]
