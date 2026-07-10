/* ------------------------------------------------------------------
   ASSORTED CONTENT — bilingual
   Translatable fields are { en, tr }; select with pick() from useI18n().
   ------------------------------------------------------------------ */

/* Projects page — status is a key into ui.projects.status* */
export const projects = [
  { id: 'p1', slug: 'solano-hub', name: 'Solano Hub', location: 'Andalusia, Spain', capacity: '900 MWh', status: 'operational', type: { en: 'Battery storage', tr: 'Batarya depolama' }, description: { en: 'Solano Hub is a 900 MWh battery storage facility in Andalusia, Spain, fully operational and dispatching flexible capacity to the regional grid.', tr: 'Solano Hub, İspanya’nın Endülüs bölgesinde 900 MWh kapasiteli, tam işletmede olan ve bölgesel şebekeye esnek kapasite sağlayan bir batarya depolama tesisidir.' } },
  { id: 'p2', slug: 'nordwind-park', name: 'Nordwind Park', location: 'Schleswig-Holstein, Germany', capacity: '320 MW', status: 'operational', type: { en: 'Onshore wind', tr: 'Karasal rüzgâr' }, description: { en: 'Nordwind Park is a 320 MW onshore wind farm in Schleswig-Holstein, Germany, operating at full capacity since commissioning.', tr: 'Nordwind Park, Almanya’nın Schleswig-Holstein eyaletinde 320 MW kapasiteli, devreye alındığından beri tam kapasiteyle işletilen bir karasal rüzgâr santralidir.' } },
  { id: 'p3', slug: 'rhone-valley', name: 'Rhône Valley', location: 'Auvergne-Rhône-Alpes, France', capacity: '450 MWh', status: 'construction', type: { en: 'Solar + storage', tr: 'Güneş + depolama' }, description: { en: 'Rhône Valley pairs 450 MWh of co-located solar and storage in Auvergne-Rhône-Alpes, France, and is currently under construction.', tr: 'Rhône Valley, Fransa’nın Auvergne-Rhône-Alpes bölgesinde 450 MWh’lik ortak konumlu güneş ve depolamayı bir araya getiriyor ve şu anda yapım aşamasında.' } },
  { id: 'p4', slug: 'maas-delta', name: 'Maas Delta', location: 'South Holland, Netherlands', capacity: '250 MW', status: 'construction', type: { en: 'Grid-scale storage', tr: 'Şebeke ölçekli depolama' }, description: { en: 'Maas Delta is a 250 MW grid-scale storage project in South Holland, the Netherlands, currently under construction.', tr: 'Maas Delta, Hollanda’nın Güney Hollanda eyaletinde 250 MW kapasiteli, şu anda yapım aşamasında olan bir şebeke ölçekli depolama projesidir.' } },
  { id: 'p5', slug: 'douro-flats', name: 'Douro Flats', location: 'Norte, Portugal', capacity: '600 MW', status: 'development', type: { en: 'Utility-scale solar', tr: 'Şebeke ölçekli güneş' }, description: { en: 'Douro Flats is a 600 MW utility-scale solar project in the Norte region of Portugal, currently in development.', tr: 'Douro Flats, Portekiz’in Norte bölgesinde 600 MW kapasiteli, şu anda geliştirme aşamasında olan şebeke ölçekli bir güneş projesidir.' } },
  { id: 'p6', slug: 'vistula-line', name: 'Vistula Line', location: 'Pomerania, Poland', capacity: '180 MW', status: 'development', type: { en: 'Green hydrogen', tr: 'Yeşil hidrojen' }, description: { en: 'Vistula Line is a 180 MW green hydrogen project in Pomerania, Poland, currently in development.', tr: 'Vistula Line, Polonya’nın Pomeranya bölgesinde 180 MW kapasiteli, şu anda geliştirme aşamasında olan bir yeşil hidrojen projesidir.' } }
]

/* Careers page — open roles */
export const roles = [
  { id: 'r1', slug: 'senior-power-systems-engineer', title: { en: 'Senior Power Systems Engineer', tr: 'Kıdemli Güç Sistemleri Mühendisi' }, team: { en: 'Engineering', tr: 'Mühendislik' }, location: 'Munich, DE', type: { en: 'Full-time', tr: 'Tam zamanlı' }, description: { en: 'Lead the electrical design and grid-integration studies for our storage and generation assets across Europe. You’ll work closely with our development and operations teams to make sure every project is engineered to run for decades.', tr: 'Avrupa genelindeki depolama ve üretim varlıklarımız için elektrik tasarımına ve şebeke entegrasyonu çalışmalarına liderlik edin. Her projenin onlarca yıl çalışacak şekilde mühendislik edildiğinden emin olmak için geliştirme ve operasyon ekiplerimizle yakın çalışacaksınız.' } },
  { id: 'r2', slug: 'energy-markets-analyst', title: { en: 'Energy Markets Analyst', tr: 'Enerji Piyasaları Analisti' }, team: { en: 'Trading & Optimisation', tr: 'Ticaret & Optimizasyon' }, location: 'Amsterdam, NL', type: { en: 'Full-time', tr: 'Tam zamanlı' }, description: { en: 'Analyse European power markets to optimise how our storage and generation fleet is dispatched, and help shape the trading strategies that turn flexibility into revenue.', tr: 'Depolama ve üretim filomuzun nasıl sevk edildiğini optimize etmek için Avrupa enerji piyasalarını analiz edin ve esnekliği gelire dönüştüren ticaret stratejilerinin şekillenmesine yardımcı olun.' } },
  { id: 'r3', slug: 'backend-engineer-grid-platform', title: { en: 'Backend Engineer — Grid Platform', tr: 'Backend Mühendisi — Şebeke Platformu' }, team: { en: 'Software', tr: 'Yazılım' }, location: 'Remote, EU', type: { en: 'Full-time', tr: 'Tam zamanlı' }, description: { en: 'Build and scale the backend services behind Korrente Grid, our fleet-wide forecasting and dispatch platform. Remote-first, with a small team that owns its systems end to end.', tr: 'Filo genelindeki tahmin ve sevkiyat platformumuz Korrente Grid’in arkasındaki backend servisleri kurun ve ölçeklendirin. Sistemlerini uçtan uca sahiplenen küçük bir ekiple, uzaktan çalışmaya öncelik veren bir pozisyon.' } },
  { id: 'r4', slug: 'project-development-manager', title: { en: 'Project Development Manager', tr: 'Proje Geliştirme Müdürü' }, team: { en: 'Development', tr: 'Geliştirme' }, location: 'Madrid, ES', type: { en: 'Full-time', tr: 'Tam zamanlı' }, description: { en: 'Manage projects from site origination through permitting and financial close, coordinating engineering, legal, and community stakeholders across Southern Europe.', tr: 'Güney Avrupa genelinde saha kaynağından izinlere ve finansal kapanışa kadar projeleri yönetin; mühendislik, hukuk ve topluluk paydaşlarını koordine edin.' } },
  { id: 'r5', slug: 'field-operations-technician', title: { en: 'Field Operations Technician', tr: 'Saha Operasyon Teknisyeni' }, team: { en: 'Operations', tr: 'Operasyon' }, location: 'Gdańsk, PL', type: { en: 'Full-time', tr: 'Tam zamanlı' }, description: { en: 'Keep our operating assets running at their best — routine maintenance, fault response, and performance monitoring across our Northern European fleet.', tr: 'İşletmedeki varlıklarımızı en iyi şekilde çalışır tutun — Kuzey Avrupa filomuz genelinde rutin bakım, arıza müdahalesi ve performans izleme.' } }
]

/* "Why Korrente" value propositions */
export const values = [
  {
    id: 'lifecycle',
    number: '01',
    title: { en: 'Owner-operators, end to end', tr: 'Uçtan uca sahip-işletmeci' },
    body: {
      en: 'We develop, build, and run our assets for decades. Owning the whole lifecycle means the decisions we make on day one are the ones we live with on year twenty.',
      tr: 'Varlıklarımızı onlarca yıl boyunca geliştirir, kurar ve işletiriz. Tüm yaşam döngüsüne sahip olmak, birinci günde verdiğimiz kararların yirminci yılda birlikte yaşadığımız kararlar olması demektir.'
    }
  },
  {
    id: 'engineering',
    number: '02',
    title: { en: 'Engineering-led, not hype-led', tr: 'Abartıya değil, mühendisliğe dayalı' },
    body: {
      en: 'Every project is underwritten by measured data, conservative modelling, and independent review. We build infrastructure that has to work — so we prove it will.',
      tr: 'Her proje; ölçülmüş veriyle, ihtiyatlı modellemeyle ve bağımsız incelemeyle taahhüt edilir. Çalışmak zorunda olan altyapı kurarız — bu yüzden çalışacağını kanıtlarız.'
    }
  },
  {
    id: 'grid',
    number: '03',
    title: { en: 'Built for a flexible grid', tr: 'Esnek bir şebeke için kurulmuş' },
    body: {
      en: 'Renewables plus storage plus intelligent dispatch. We deliver firm, dispatchable clean power, not just nameplate capacity that disappears when the weather turns.',
      tr: 'Yenilenebilir enerji artı depolama artı akıllı sevkiyat. Hava değişince kaybolan anma kapasitesini değil; kesintisiz, sevk edilebilir temiz güç sunarız.'
    }
  },
  {
    id: 'community',
    number: '04',
    title: { en: 'Rooted in community', tr: 'Toplulukta kök salmış' },
    body: {
      en: 'Projects succeed when the people around them benefit. We share ownership, invest locally, and stay long after commissioning day.',
      tr: 'Projeler, çevresindeki insanlar fayda gördüğünde başarılı olur. Sahipliği paylaşır, yerel yatırım yapar ve devreye alma gününden çok sonra da kalırız.'
    }
  }
]

/* Impact stats with animated counters. `value` is the numeric target. */
export const stats = [
  { id: 'operation', value: 2.5, decimals: 1, suffix: ' GWh+', label: { en: 'Projects in operation and under construction', tr: 'İşletmedeki ve yapımı süren projeler' } },
  { id: 'countries', value: 10, decimals: 0, suffix: '+', label: { en: 'Countries across Europe', tr: 'Avrupa genelinde ülke' } },
  { id: 'pipeline', value: 1.2, decimals: 1, suffix: ' GW+', label: { en: 'Pipeline capacity', tr: 'Proje hattı kapasitesi' } },
  { id: 'focus', value: 100, decimals: 0, suffix: '%', label: { en: 'Focused on energy storage', tr: 'Enerji depolamaya odaklı' } }
]

export const testimonials = [
  {
    id: 't1',
    quote: {
      en: 'Korrente delivered our storage project ahead of schedule and has run it flawlessly since. They behave like a long-term partner, because they are one.',
      tr: 'Korrente depolama projemizi planından önce teslim etti ve o zamandan beri kusursuz işletiyor. Uzun vadeli bir ortak gibi davranıyorlar, çünkü öyleler.'
    },
    name: 'Dana Whitfield',
    role: { en: 'VP, Grid Services · Cascade Public Power', tr: 'Başkan Yrd., Şebeke Hizmetleri · Cascade Public Power' }
  },
  {
    id: 't2',
    quote: {
      en: 'Their grid-intelligence platform gave us visibility we never had before. We can finally treat renewables as a firm, plannable resource.',
      tr: 'Şebeke zekâsı platformları bize daha önce hiç olmayan bir görünürlük sağladı. Sonunda yenilenebilir enerjiyi kesintisiz, planlanabilir bir kaynak olarak ele alabiliyoruz.'
    },
    name: 'Marco Reyes',
    role: { en: 'Chief Operating Officer · Meridian Utilities', tr: 'Operasyon Direktörü · Meridian Utilities' }
  },
  {
    id: 't3',
    quote: {
      en: 'From land to interconnection, the Korrente team was rigorous and transparent. The community benefit agreement they structured set a new bar for us.',
      tr: 'Araziden şebeke bağlantısına kadar Korrente ekibi titiz ve şeffaftı. Kurguladıkları topluluk fayda anlaşması bizim için yeni bir çıta belirledi.'
    },
    name: 'Priya Nair',
    role: { en: 'Director of Sustainability · Northwind Manufacturing', tr: 'Sürdürülebilirlik Direktörü · Northwind Manufacturing' }
  }
]

/* Leadership for the About page */
export const team = [
  { id: 'l1', displayName: 'Elena Marković', initials: 'EM', role: { en: 'Chief Executive Officer', tr: 'İcra Kurulu Başkanı' } },
  { id: 'l2', displayName: 'Samuel Okonkwo', initials: 'SO', role: { en: 'Chief Technology Officer', tr: 'Teknolojiden Sorumlu Başkan' } },
  { id: 'l3', displayName: 'Ana Beltrán', initials: 'AB', role: { en: 'Chief Operating Officer', tr: 'Operasyon Direktörü' } },
  { id: 'l4', displayName: 'Wei Chen', initials: 'WC', role: { en: 'Chief Financial Officer', tr: 'Finans Direktörü' } }
]

/* Sustainability commitments */
export const commitments = [
  { id: 'net-zero', metric: '2035', title: { en: 'Net-zero operations', tr: 'Net sıfır operasyonlar' }, body: { en: 'Every part of our business — construction, logistics, offices — reaches net-zero emissions a full decade ahead of the wider sector.', tr: 'İşimizin her parçası — inşaat, lojistik, ofisler — sektörün genelinden tam on yıl önce net sıfır emisyona ulaşır.' } },
  { id: 'circular', metric: '95%', title: { en: 'Circular by design', tr: 'Tasarımdan döngüsel' }, body: { en: 'Panels, turbine blades, and battery cells are designed for recovery. We target 95% material reuse across decommissioned assets.', tr: 'Paneller, türbin kanatları ve batarya hücreleri geri kazanım için tasarlanır. Hizmet dışı varlıklarda %95 malzeme yeniden kullanımı hedefliyoruz.' } },
  { id: 'nature', metric: '3×', title: { en: 'Nature-positive land', tr: 'Doğaya olumlu arazi' }, body: { en: 'On every site we manage, we commit to leaving biodiversity measurably richer — targeting three times the habitat value we started with.', tr: 'Yönettiğimiz her sahada biyoçeşitliliği ölçülebilir biçimde daha zengin bırakmayı taahhüt ederiz — başladığımız habitat değerinin üç katını hedefleriz.' } },
  { id: 'community', metric: '$120M', title: { en: 'Community reinvestment', tr: 'Topluluğa yeniden yatırım' }, body: { en: 'Direct local investment through benefit funds, apprenticeships, and shared-ownership schemes over the next five years.', tr: 'Önümüzdeki beş yılda fayda fonları, çıraklık programları ve ortak sahiplik düzenlemeleri yoluyla doğrudan yerel yatırım.' } }
]

/* Insights / news articles */
export const articles = [
  {
    id: 'a1',
    slug: 'why-firm-renewables-not-just-more-renewables-will-decide-the-transition',
    category: { en: 'Grid', tr: 'Şebeke' },
    date: '2026-06-18',
    readingTime: { en: '6 min', tr: '6 dk' },
    featured: true,
    title: { en: 'Why firm renewables — not just more renewables — will decide the transition', tr: 'Dönüşümü neden daha fazla yenilenebilir değil, kesintisiz yenilenebilir belirleyecek' },
    excerpt: { en: 'Nameplate capacity is the easy part. The real work is making clean power dependable at 6 p.m. in January. Here is how storage and intelligent dispatch change the equation.', tr: 'Anma kapasitesi kolay kısım. Asıl iş, temiz enerjiyi ocak ayında saat 18.00’de güvenilir kılmak. Depolama ve akıllı sevkiyatın denklemi nasıl değiştirdiğini anlatıyoruz.' },
    body: { en: 'Nameplate capacity is the easy part. The real work is making clean power dependable at 6 p.m. in January. Here is how storage and intelligent dispatch change the equation.', tr: 'Anma kapasitesi kolay kısım. Asıl iş, temiz enerjiyi ocak ayında saat 18.00’de güvenilir kılmak. Depolama ve akıllı sevkiyatın denklemi nasıl değiştirdiğini anlatıyoruz.' }
  },
  {
    id: 'a2',
    slug: 'inside-our-largest-battery-900-mwh-and-what-it-took-to-build',
    category: { en: 'Storage', tr: 'Depolama' },
    date: '2026-05-29',
    readingTime: { en: '4 min', tr: '4 dk' },
    title: { en: 'Inside our largest battery: 900 MWh and what it took to build', tr: 'En büyük bataryamızın içinde: 900 MWh ve inşası için gerekenler' },
    excerpt: { en: 'A field report from commissioning the Solano storage hub, from cell chemistry choices to the software that keeps it responsive to the grid.', tr: 'Solano depolama merkezinin devreye alınmasından bir saha raporu; hücre kimyası seçimlerinden onu şebekeye duyarlı tutan yazılıma kadar.' },
    body: { en: 'A field report from commissioning the Solano storage hub, from cell chemistry choices to the software that keeps it responsive to the grid.', tr: 'Solano depolama merkezinin devreye alınmasından bir saha raporu; hücre kimyası seçimlerinden onu şebekeye duyarlı tutan yazılıma kadar.' }
  },
  {
    id: 'a3',
    slug: 'interconnection-reform-is-the-unglamorous-fix-the-grid-needs-most',
    category: { en: 'Policy', tr: 'Politika' },
    date: '2026-05-11',
    readingTime: { en: '5 min', tr: '5 dk' },
    title: { en: 'Interconnection reform is the unglamorous fix the grid needs most', tr: 'Şebeke bağlantısı reformu, şebekenin en çok ihtiyaç duyduğu göz alıcı olmayan çözüm' },
    excerpt: { en: 'Thousands of clean projects are stuck in queues. We break down the process bottlenecks and the reforms that would actually move gigawatts.', tr: 'Binlerce temiz proje kuyruklarda takılı kalmış durumda. Süreçteki darboğazları ve gerçekten gigavatları harekete geçirecek reformları açıklıyoruz.' },
    body: { en: 'Thousands of clean projects are stuck in queues. We break down the process bottlenecks and the reforms that would actually move gigawatts.', tr: 'Binlerce temiz proje kuyruklarda takılı kalmış durumda. Süreçteki darboğazları ve gerçekten gigavatları harekete geçirecek reformları açıklıyoruz.' }
  },
  {
    id: 'a4',
    slug: 'what-a-good-community-benefit-agreement-actually-looks-like',
    category: { en: 'Community', tr: 'Topluluk' },
    date: '2026-04-22',
    readingTime: { en: '3 min', tr: '3 dk' },
    title: { en: 'What a good community benefit agreement actually looks like', tr: 'İyi bir topluluk fayda anlaşması gerçekte nasıl görünür' },
    excerpt: { en: 'Shared ownership, local hiring, and long-term funds — the ingredients that turn a project’s neighbours into its partners.', tr: 'Ortak sahiplik, yerel istihdam ve uzun vadeli fonlar — bir projenin komşularını ortaklarına dönüştüren bileşenler.' },
    body: { en: 'Shared ownership, local hiring, and long-term funds — the ingredients that turn a project’s neighbours into its partners.', tr: 'Ortak sahiplik, yerel istihdam ve uzun vadeli fonlar — bir projenin komşularını ortaklarına dönüştüren bileşenler.' }
  },
  {
    id: 'a5',
    slug: 'forecasting-the-sky-how-we-predict-generation-to-the-sub-hour',
    category: { en: 'Technology', tr: 'Teknoloji' },
    date: '2026-03-30',
    readingTime: { en: '7 min', tr: '7 dk' },
    title: { en: 'Forecasting the sky: how we predict generation to the sub-hour', tr: 'Gökyüzünü tahminlemek: üretimi saat altı düzeyde nasıl öngörüyoruz' },
    excerpt: { en: 'A look under the hood of Korrente Grid’s forecasting models and why small accuracy gains compound into large revenue and reliability wins.', tr: 'Korrente Grid’in tahmin modellerinin kaputunun altına bir bakış ve küçük doğruluk kazanımlarının neden büyük gelir ve güvenilirlik kazançlarına dönüştüğü.' },
    body: { en: 'A look under the hood of Korrente Grid’s forecasting models and why small accuracy gains compound into large revenue and reliability wins.', tr: 'Korrente Grid’in tahmin modellerinin kaputunun altına bir bakış ve küçük doğruluk kazanımlarının neden büyük gelir ve güvenilirlik kazançlarına dönüştüğü.' }
  },
  {
    id: 'a6',
    slug: 'green-hydrogens-honest-use-cases-and-the-hype-to-ignore',
    category: { en: 'Hydrogen', tr: 'Hidrojen' },
    date: '2026-03-04',
    readingTime: { en: '5 min', tr: '5 dk' },
    title: { en: 'Green hydrogen’s honest use cases — and the hype to ignore', tr: 'Yeşil hidrojenin dürüst kullanım alanları — ve göz ardı edilecek abartı' },
    excerpt: { en: 'Hydrogen is not a silver bullet, but for a handful of hard-to-abate sectors it is essential. We map where the molecule genuinely wins.', tr: 'Hidrojen sihirli bir değnek değil, ancak azaltılması zor birkaç sektör için vazgeçilmez. Molekülün gerçekten kazandığı yerleri haritalıyoruz.' },
    body: { en: 'Hydrogen is not a silver bullet, but for a handful of hard-to-abate sectors it is essential. We map where the molecule genuinely wins.', tr: 'Hidrojen sihirli bir değnek değil, ancak azaltılması zor birkaç sektör için vazgeçilmez. Molekülün gerçekten kazandığı yerleri haritalıyoruz.' }
  }
]
