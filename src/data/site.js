/* ------------------------------------------------------------------
   SITE-WIDE CONTENT
   Company details, navigation, and contact info.
   Labels are bilingual: { en, tr }. Select with pick() from useI18n().
   ------------------------------------------------------------------ */

export const company = {
  name: 'Korrente',
  foundedYear: 2011,
  email: 'hello@korrente.com',
  pressEmail: 'press@korrente.com',
  phone: '+1 (415) 555-0147',
  address: {
    line1: '210 Foundry Street, Suite 400',
    line2: 'Oakland, CA 94607',
    country: 'United States'
  }
}

/* Primary navigation — matches the reference header */
export const navLinks = [
  { to: '/solutions', label: { en: 'Solutions', tr: 'Çözümler' } },
  { to: '/technology', label: { en: 'Technology', tr: 'Teknoloji' } },
  { to: '/projects', label: { en: 'Projects', tr: 'Projeler' } },
  { to: '/about', label: { en: 'Company', tr: 'Şirket' } },
  { to: '/news', label: { en: 'News', tr: 'Haberler' } },
  { to: '/careers', label: { en: 'Careers', tr: 'Kariyer' } }
]

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', short: 'in' },
  { label: 'X', href: 'https://x.com/', short: 'X' },
  { label: 'YouTube', href: 'https://www.youtube.com/', short: 'yt' },
  { label: 'GitHub', href: 'https://github.com/', short: 'gh' }
]

export const footerNav = [
  {
    title: { en: 'Company', tr: 'Şirket' },
    links: [
      { to: '/about', label: { en: 'About', tr: 'Hakkımızda' } },
      { to: '/sustainability', label: { en: 'Sustainability', tr: 'Sürdürülebilirlik' } },
      { to: '/news', label: { en: 'Insights', tr: 'İçgörüler' } },
      { to: '/about', label: { en: 'Careers', tr: 'Kariyer' } }
    ]
  },
  {
    title: { en: 'Solutions', tr: 'Çözümler' },
    links: [
      { to: '/solutions', label: { en: 'Utility-Scale Solar', tr: 'Şebeke Ölçekli Güneş' } },
      { to: '/solutions', label: { en: 'Wind Development', tr: 'Rüzgâr Geliştirme' } },
      { to: '/solutions', label: { en: 'Energy Storage', tr: 'Enerji Depolama' } },
      { to: '/solutions', label: { en: 'Grid Intelligence', tr: 'Şebeke Zekâsı' } }
    ]
  },
  {
    title: { en: 'Connect', tr: 'Bağlantı' },
    links: [
      { to: '/contact', label: { en: 'Contact', tr: 'İletişim' } },
      { to: '/contact', label: { en: 'Partner with us', tr: 'Bizimle ortak olun' } },
      { to: '/contact', label: { en: 'Press', tr: 'Basın' } }
    ]
  }
]

export const legalLinks = [
  { to: '/', label: { en: 'Privacy', tr: 'Gizlilik' } },
  { to: '/', label: { en: 'Terms', tr: 'Şartlar' } },
  { to: '/', label: { en: 'Cookies', tr: 'Çerezler' } }
]
