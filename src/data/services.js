/* ------------------------------------------------------------------
   SOLUTIONS / SERVICES
   Translatable fields are { en, tr }; select with pick() from useI18n().
   `icon` maps to a key in components/Icon.jsx.
   ------------------------------------------------------------------ */

export const services = [
  {
    id: 'solar',
    icon: 'sun',
    name: { en: 'Utility-Scale Solar', tr: 'Şebeke Ölçekli Güneş' },
    summary: {
      en: 'Ground-mount and tracker solar plants delivered from site control to commercial operation.',
      tr: 'Saha kontrolünden ticari işletmeye kadar teslim edilen sabit ve izleyici güneş santralleri.'
    },
    description: {
      en: 'We develop, finance, and operate utility-scale photovoltaic plants that feed clean power directly onto the grid. From land origination and interconnection to EPC oversight and long-term asset management, Korrente owns the full lifecycle so partners get predictable output and durable returns.',
      tr: 'Temiz enerjiyi doğrudan şebekeye veren şebeke ölçekli fotovoltaik santralleri geliştirir, finanse eder ve işletiriz. Arazi teminından şebeke bağlantısına, EPC gözetiminden uzun vadeli varlık yönetimine kadar Korrente tüm yaşam döngüsüne sahiptir; böylece ortaklar öngörülebilir üretim ve kalıcı getiri elde eder.'
    },
    features: {
      en: ['Single-axis tracking for higher yield', 'Bankable interconnection & permitting', 'Long-term O&M and performance guarantees'],
      tr: ['Daha yüksek verim için tek eksenli izleme', 'Finanse edilebilir bağlantı ve izinler', 'Uzun vadeli işletme-bakım ve performans garantileri']
    },
    metric: { value: '2.4', unit: 'GW', label: { en: 'solar in operation', tr: 'işletmedeki güneş' } }
  },
  {
    id: 'wind',
    icon: 'wind',
    name: { en: 'Wind Development', tr: 'Rüzgâr Geliştirme' },
    summary: {
      en: 'Onshore wind portfolios built on rigorous resource assessment and community partnership.',
      tr: 'Titiz kaynak değerlendirmesi ve topluluk ortaklığı üzerine kurulu karasal rüzgâr portföyleri.'
    },
    description: {
      en: 'Korrente develops onshore wind farms where the resource, the grid, and the community all align. Multi-year met-mast campaigns and high-resolution wake modelling let us site turbines for maximum lifetime yield while minimising land and visual impact.',
      tr: 'Korrente; kaynağın, şebekenin ve topluluğun bir araya geldiği karasal rüzgâr santralleri geliştirir. Çok yıllı ölçüm direği kampanyaları ve yüksek çözünürlüklü türbülans modellemesi, arazi ve görsel etkiyi en aza indirirken türbinleri en yüksek ömür boyu verim için konumlandırmamızı sağlar.'
    },
    features: {
      en: ['Bankable multi-year resource studies', 'Turbine-agnostic procurement', 'Local ownership & benefit-sharing models'],
      tr: ['Finanse edilebilir çok yıllı kaynak çalışmaları', 'Türbinden bağımsız tedarik', 'Yerel sahiplik ve fayda paylaşımı modelleri']
    },
    metric: { value: '1.1', unit: 'GW', label: { en: 'wind under development', tr: 'geliştirilen rüzgâr' } }
  },
  {
    id: 'storage',
    icon: 'battery',
    name: { en: 'Energy Storage', tr: 'Enerji Depolama' },
    summary: {
      en: 'Grid-scale battery systems that firm renewables and stabilise volatile markets.',
      tr: 'Yenilenebilir enerjiyi kesintisiz kılan ve dalgalı piyasaları dengeleyen şebeke ölçekli batarya sistemleri.'
    },
    description: {
      en: 'Our battery energy storage systems (BESS) shift clean power to when it is needed most and provide the fast-frequency response modern grids depend on. Korrente co-locates storage with generation and stands alone at constrained nodes, unlocking capacity without new transmission.',
      tr: 'Batarya enerji depolama sistemlerimiz (BESS), temiz enerjiyi en çok ihtiyaç duyulduğu ana kaydırır ve modern şebekelerin bağlı olduğu hızlı frekans yanıtını sağlar. Korrente depolamayı üretimle aynı sahaya konumlandırır ve kısıtlı düğümlerde tek başına durur; yeni iletim hattı olmadan kapasite açar.'
    },
    features: {
      en: ['Co-located & standalone BESS', 'Frequency response & capacity markets', 'Augmentation-ready 20-year design life'],
      tr: ['Ortak konumlu ve bağımsız BESS', 'Frekans yanıtı ve kapasite piyasaları', 'Kapasite artırımına hazır 20 yıllık tasarım ömrü']
    },
    metric: { value: '3.8', unit: 'GWh', label: { en: 'storage contracted', tr: 'sözleşmeli depolama' } }
  },
  {
    id: 'grid',
    icon: 'grid',
    name: { en: 'Grid Intelligence', tr: 'Şebeke Zekâsı' },
    summary: {
      en: 'A software platform that forecasts, dispatches, and optimises every asset in real time.',
      tr: 'Her varlığı gerçek zamanlı tahminleyen, sevk eden ve optimize eden bir yazılım platformu.'
    },
    description: {
      en: 'Korrente Grid is the control layer across our fleet — a real-time platform that forecasts generation, co-optimises storage against market prices, and dispatches assets automatically. Operators get a single pane of glass; the grid gets a more predictable, more flexible resource.',
      tr: 'Korrente Grid, filomuzun kontrol katmanıdır — üretimi tahminleyen, depolamayı piyasa fiyatlarına karşı birlikte optimize eden ve varlıkları otomatik olarak sevk eden gerçek zamanlı bir platform. Operatörler tek bir ekran elde eder; şebeke ise daha öngörülebilir ve daha esnek bir kaynak.'
    },
    features: {
      en: ['Sub-hourly generation forecasting', 'Automated market bidding & dispatch', 'Predictive maintenance from sensor telemetry'],
      tr: ['Saat altı üretim tahmini', 'Otomatik piyasa teklifi ve sevkiyat', 'Sensör verilerinden öngörücü bakım']
    },
    metric: { value: '99.95', unit: '%', label: { en: 'fleet availability', tr: 'filo erişilebilirliği' } }
  },
  {
    id: 'hydrogen',
    icon: 'molecule',
    name: { en: 'Green Hydrogen', tr: 'Yeşil Hidrojen' },
    summary: {
      en: 'Electrolysis powered by our own renewables, decarbonising industry and heavy transport.',
      tr: 'Kendi yenilenebilir enerjimizle çalışan elektroliz; sanayiyi ve ağır taşımacılığı karbondan arındırır.'
    },
    description: {
      en: 'Where electrons can’t reach, molecules can. Korrente pairs dedicated renewable generation with electrolysis to produce green hydrogen for industrial off-takers, displacing fossil feedstocks in sectors that are hardest to abate.',
      tr: 'Elektronların ulaşamadığı yere moleküller ulaşır. Korrente; sanayi alıcıları için yeşil hidrojen üretmek üzere ayrılmış yenilenebilir üretimi elektrolizle eşleştirir ve azaltılması en zor sektörlerde fosil hammaddelerin yerini alır.'
    },
    features: {
      en: ['Additional, dedicated renewable supply', 'Certified low-carbon intensity', 'Off-take structuring for industry'],
      tr: ['Ek, ayrılmış yenilenebilir arz', 'Sertifikalı düşük karbon yoğunluğu', 'Sanayi için alım yapılandırması']
    },
    metric: { value: '40', unit: 'MW', label: { en: 'electrolysis in pipeline', tr: 'hattaki elektroliz' } }
  },
  {
    id: 'advisory',
    icon: 'compass',
    name: { en: 'Transition Advisory', tr: 'Dönüşüm Danışmanlığı' },
    summary: {
      en: 'Corporate decarbonisation strategy backed by assets we actually build and operate.',
      tr: 'Gerçekten kurup işlettiğimiz varlıklarla desteklenen kurumsal karbonsuzlaşma stratejisi.'
    },
    description: {
      en: 'We help large energy buyers move from pledges to megawatts — structuring power purchase agreements, on-site generation, and 24/7 carbon-free energy matching. Because we own the assets, our advice is grounded in what genuinely gets built.',
      tr: 'Büyük enerji alıcılarının taahhütlerden megavatlara geçmesine yardımcı oluruz — elektrik satın alma anlaşmaları, saha içi üretim ve 7/24 karbonsuz enerji eşleştirmesi kurgularız. Varlıklara sahip olduğumuz için tavsiyemiz gerçekten inşa edilene dayanır.'
    },
    features: {
      en: ['PPA & 24/7 CFE strategy', 'On-site & behind-the-meter generation', 'Transparent, audited carbon accounting'],
      tr: ['PPA ve 7/24 CFE stratejisi', 'Saha içi ve sayaç arkası üretim', 'Şeffaf, denetlenmiş karbon muhasebesi']
    },
    metric: { value: '60+', unit: '', label: { en: 'corporate off-takers', tr: 'kurumsal alıcı' } }
  }
]
