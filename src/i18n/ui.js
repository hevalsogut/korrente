/* ------------------------------------------------------------------
   UI MICROCOPY — English + Turkish
   Big content (services, articles, testimonials…) lives in src/data/*
   as bilingual objects. This file holds interface strings.
   Look up with t('section.key'). {placeholders} are replaced in code.
   ------------------------------------------------------------------ */

export const ui = {
  en: {
    common: {
      startProject: 'Start a project',
      contact: 'Contact',
      discoverMore: 'Discover more',
      exploreSolutions: 'Explore our solutions',
      whoWeAre: 'Who we are',
      allSolutions: 'All solutions',
      explore: 'Explore',
      learnMore: 'Learn more',
      backHome: 'Back to home',
      viewSolutions: 'View solutions',
      sendMessage: 'Send message',
      sendAnother: 'Send another message',
      subscribe: 'Subscribe',
      readArticle: 'Read the article',
      readSuffix: 'read',
      skip: 'Skip to content',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      changeLanguage: 'Change language',
      optional: '(optional)',
      showMore: 'Show more',
      showLess: 'Show less'
    },
    footer: {
      pitch:
        'Powering what comes next. Korrente builds and operates clean energy infrastructure for a resilient, low-carbon grid.',
      socials: 'Social media',
      rights: '© {year} Korrente Energy, Inc. All rights reserved.'
    },
    home: {
      heroEyebrow: 'Energy storage · System integration',
      heroTitleStart: 'We manage ',
      heroTitleAccent: 'energy flow.',
      heroTitleEnd: ' You shape the future.',
      heroLead:
        'Advanced energy storage and system integration solutions for a resilient and flexible energy infrastructure.',
      features: [
        { title: 'Grid-scale storage', body: 'High-performance battery systems for utility and industry.' },
        { title: 'System integration', body: 'Seamless integration for complex energy systems.' },
        { title: 'European expertise', body: 'Engineered and operated across Europe.' },
        { title: 'Sustainable impact', body: 'Driving the transition to a clean energy future.' }
      ],
      partnersLabel: 'Trusted by utilities & industry leaders',
      introEyebrow: 'Who we are',
      introPre:
        'We are an energy company built on a simple conviction: clean power only changes the world if it’s ',
      introAccent: 'reliable',
      introPost: ', affordable, and built to last.',
      introBody1:
        'For over a decade, Korrente has developed and operated renewable generation across solar, wind, and storage — not as isolated projects, but as a coordinated fleet managed by our own grid intelligence platform.',
      introBody2:
        'That means we deliver firm, dispatchable clean energy: power that shows up when the grid needs it, backed by engineering rigour and a genuine commitment to the communities we operate in.',
      introLink: 'More about our story',
      solutionsEyebrow: 'What we do',
      solutionsTitle: 'A full-stack clean energy company.',
      solutionsLead:
        'From the first megawatt of a project to real-time dispatch on the grid, we own every layer that makes renewable power dependable.',
      whyEyebrow: 'Why Korrente',
      whyTitle: 'The advantages of an owner-operator.',
      whyLead:
        'We don’t hand projects off. We build them to run for decades — and we’re still there on year twenty.'
    },
    stats: {
      eyebrow: 'Impact',
      heading: 'Measured in gigawatts and greenhouse gas that never happened.'
    },
    testimonials: {
      eyebrow: 'Partners',
      title: 'Trusted by the utilities and industries we power.',
      prev: 'Previous testimonial',
      next: 'Next testimonial',
      choose: 'Choose testimonial'
    },
    cta: {
      eyebrow: 'Let’s build',
      title: 'Ready to power what comes next?',
      body:
        'Tell us about your site, your load, or your decarbonisation target. Our development team will come back within two business days.'
    },
    about: {
      eyebrow: 'About Korrente',
      title: 'A clean energy company built for the long term.',
      lead:
        'Since {year}, we’ve developed and operated renewable power with one goal: to make clean energy something the grid — and the communities it serves — can truly rely on.',
      missionEyebrow: 'Our mission',
      missionPre: 'To build the clean, dependable energy backbone of a',
      missionAccent: ' low-carbon economy',
      missionPost: ' — and to operate it with the care infrastructure deserves.',
      missionBody1:
        'Korrente began with a single solar project and a frustration: too much clean energy was being built to look good on a press release, not to run for thirty years. We set out to do the opposite.',
      missionBody2:
        'Today we develop, finance, build, and operate a diversified fleet of solar, wind, storage, and hydrogen assets — all coordinated by software we wrote ourselves. We are engineers, developers, and operators who happen to care a great deal about the planet.',
      principles: [
        { title: 'Reliability first', body: 'Clean power is only useful if it’s dependable. Everything we design is judged against whether it will still perform decades from now.' },
        { title: 'Genuinely sustainable', body: 'Not just low-carbon generation, but circular materials, restored land, and honest, audited accounting.' },
        { title: 'Engineering rigour', body: 'Measured data over marketing. We underwrite every project conservatively and prove our numbers.' }
      ],
      storyEyebrow: 'Our story',
      storyTitle: 'From one project to a global fleet.',
      storyLead: 'A decade and a half of building clean energy that has to work — and does.',
      statsEyebrow: 'By the numbers',
      statsHeading: 'Fifteen years of measurable impact.',
      valuesEyebrow: 'How we work',
      valuesTitle: 'Principles we don’t compromise on.',
      leadershipEyebrow: 'Leadership',
      leadershipTitle: 'The people accountable for every megawatt.',
      ctaEyebrow: 'Join us',
      ctaTitle: 'Want to build the energy transition with us?',
      ctaBody:
        'We’re always looking for engineers, developers, and operators who take clean energy as seriously as we do.'
    },
    solutions: {
      eyebrow: 'Solutions',
      title: 'Every layer of dependable clean energy.',
      lead:
        'We develop, build, and operate across the full clean energy stack — and tie it together with software that makes renewables behave like firm, plannable power.',
      processEyebrow: 'How we deliver',
      processTitle: 'From origination to decades of operation.',
      process: [
        { title: 'Originate', body: 'Site, resource, and interconnection analysis to find projects that genuinely pencil out.' },
        { title: 'Develop', body: 'Permitting, community engagement, and engineering to make a project buildable and bankable.' },
        { title: 'Build', body: 'Disciplined EPC oversight that delivers on schedule, on budget, and to spec.' },
        { title: 'Operate', body: 'Decades of asset management and optimisation through our grid-intelligence platform.' }
      ],
      ctaTitle: 'Have a site, a load, or a target in mind?',
      ctaBody:
        'Whether it’s bare land, an offtake need, or a corporate net-zero goal, our team can map the fastest credible path to clean power.'
    },
    sustainability: {
      eyebrow: 'Sustainability & Impact',
      title: 'Clean energy is the product. Sustainability is the whole company.',
      lead:
        'We hold our own operations to the standard we ask of the grid — measurable, audited, and improving every year.',
      approachEyebrow: 'Our approach',
      approachTitle: 'Three commitments, everywhere we operate.',
      pillars: [
        { title: 'Decarbonise', body: 'Displace fossil generation with clean power that’s dependable enough to actually retire coal and gas — not just supplement them.' },
        { title: 'Protect', body: 'Restore habitats, safeguard water, and design every site to leave the surrounding ecology measurably healthier.' },
        { title: 'Empower', body: 'Share ownership and value with the communities that host our projects, and build the clean-energy workforce of the future.' }
      ],
      commitmentsEyebrow: 'Targets we’re accountable to',
      commitmentsTitle: 'Public commitments, tracked in the open.',
      commitmentsLead:
        'Every figure here is reported annually in our impact review and independently verified.',
      impactEyebrow: 'This year’s progress',
      impactTitle: '9.6 million tonnes of CO₂ that never reached the atmosphere.',
      impactBody:
        'Across our operating fleet, clean generation displaced the equivalent annual emissions of more than two million cars. As we add storage and dispatch intelligence, each megawatt we build does more — cutting carbon precisely when the grid is dirtiest.',
      bars: [
        'Renewable generation',
        'Waste diverted from landfill',
        'Water intensity reduction',
        'Local hiring on projects'
      ],
      ctaEyebrow: 'Partner on impact',
      ctaTitle: 'Building toward a target of your own?',
      ctaBody:
        'From 24/7 carbon-free energy matching to community benefit design, we help partners turn sustainability goals into built, operating infrastructure.'
    },
    news: {
      eyebrow: 'Insights',
      title: 'Notes from the front line of the energy transition.',
      lead:
        'Field reports, technical deep-dives, and honest takes from the people building and operating clean energy every day.',
      featured: 'Featured',
      all: 'All',
      empty: 'No articles in this category yet — check back soon.',
      newsletterEyebrow: 'Stay in the loop',
      newsletterTitle: 'Get our monthly field notes.',
      newsletterBody:
        'One considered email a month on clean energy, the grid, and what we’re learning building it. No noise.',
      emailPlaceholder: 'you@company.com',
      backToNews: 'Back to Insights',
      loading: 'Loading article…',
      notFoundTitle: 'Article not found.',
      notFoundBody: 'This article may have moved or never existed.'
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let’s talk about your energy.',
      lead:
        'Whether you’re bringing a site, a load, or a target, our development team will point you to the fastest credible path to clean power.',
      infoTitle: 'Reach us directly',
      labelEmail: 'Email',
      labelPhone: 'Phone',
      labelHq: 'Headquarters',
      labelHours: 'Office hours',
      note: 'Typical response time is under two business days.',
      fieldName: 'Name',
      fieldEmail: 'Email',
      fieldCompany: 'Company',
      fieldTopic: 'Topic',
      fieldMessage: 'Message',
      topicPlaceholder: 'Choose a topic…',
      topics: [
        'Develop a project with us',
        'Power purchase / offtake',
        'Corporate decarbonisation',
        'Press & media',
        'Careers',
        'Something else'
      ],
      errName: 'Please enter your name.',
      errEmailRequired: 'Please enter your email.',
      errEmailInvalid: 'Please enter a valid email address.',
      errTopic: 'Please choose a topic.',
      errMessageRequired: 'Please tell us a little about your enquiry.',
      errMessageShort: 'A little more detail helps us route your message.',
      legal:
        'By submitting, you agree to our privacy policy. We’ll only use your details to respond to your enquiry.',
      successTitle: 'Message received.',
      successBody:
        'Thanks, {name} — your enquiry is with our team. We’ll be in touch at {email} within two business days.',
      hours: 'Mon–Fri · 8:00–18:00 PT'
    },
    technology: {
      eyebrow: 'Technology',
      title: 'The intelligence behind every megawatt.',
      lead:
        'Korrente Grid is the software layer across our fleet — forecasting, dispatching, and optimising storage and generation in real time.',
      platformEyebrow: 'The platform',
      platformTitle: 'One control layer for a flexible grid.',
      platformLead:
        'Purpose-built to make renewables and storage behave like firm, plannable power.',
      capabilities: [
        { title: 'Sub-hourly forecasting', body: 'High-resolution generation and demand forecasts that turn variable renewables into a plannable resource.' },
        { title: 'Automated dispatch', body: 'Storage is co-optimised against live market prices and dispatched automatically, second by second.' },
        { title: 'Predictive maintenance', body: 'Sensor telemetry flags degradation early, so assets are serviced before they ever fault.' },
        { title: 'Open integration', body: 'Standards-based APIs connect to SCADA, market operators, and third-party assets with no lock-in.' }
      ],
      ctaTitle: 'Want a closer look at the platform?',
      ctaBody: 'We’ll walk you through a live view of the fleet and how Korrente Grid could dispatch your assets.'
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Infrastructure we’ve built and run.',
      lead:
        'A selection of storage and generation projects Korrente has developed, built, and operates across Europe.',
      statusOperational: 'Operational',
      statusConstruction: 'Under construction',
      statusDevelopment: 'In development',
      ctaTitle: 'Have a site or a project in mind?',
      ctaBody: 'From bare land to grid connection, our team can map the fastest credible path to a built, operating asset.',
      backToProjects: 'Back to Projects',
      loading: 'Loading project…',
      notFoundTitle: 'Project not found.',
      notFoundBody: 'This project may have moved or never existed.'
    },
    careers: {
      eyebrow: 'Careers',
      title: 'Build the energy transition with us.',
      lead:
        'We’re a team of engineers, developers, and operators who take clean, dependable energy as seriously as the planet deserves.',
      cultureEyebrow: 'Life at Korrente',
      cultureTitle: 'Serious work, genuinely good people.',
      culture: [
        { title: 'Ownership that’s real', body: 'Small teams, big mandates. You’ll own outcomes end to end, not tickets in a queue.' },
        { title: 'Impact you can measure', body: 'Every project you touch displaces fossil generation and shows up in our public impact numbers.' },
        { title: 'Grow with the grid', body: 'Generous learning budgets, mentorship, and a clear path as our fleet scales across Europe.' }
      ],
      rolesEyebrow: 'Open roles',
      rolesTitle: 'Where you could come in.',
      apply: 'View role',
      ctaTitle: 'Don’t see your role?',
      ctaBody: 'We’re always glad to meet people who care about clean energy. Send us a note and tell us what you’d build.',
      backToCareers: 'Back to Careers',
      loading: 'Loading position…',
      notFoundTitle: 'Position not found.',
      notFoundBody: 'This position may have moved or never existed.',
      applyNow: 'Apply now',
      applySubject: 'Application: {title}'
    },
    notFound: {
      title: 'This page went off-grid.',
      lead:
        'The page you’re looking for may have moved or never existed. Let’s get you back to something powered up.'
    },
    calculator: {
      eyebrow: 'Revenue Calculator',
      title: 'Estimate battery storage revenue.',
      lead:
        'A quick model for Netherlands grid-arbitrage revenue from battery storage. Defaults are pre-filled — change only what you know.',
      inputsTitle: 'Project inputs',
      modeLabel: 'Mode',
      modeGrid: 'Grid Arbitrage',
      modeSolar: 'Solar-Paired',
      powerLabel: 'Power rating',
      powerHelp: 'The project’s power rating, in megawatts.',
      durationLabel: 'Duration',
      durationHelp: 'Storage duration at rated power. Longer duration cycles more gently, giving higher efficiency.',
      durationUnit: 'hours',
      advancedToggle: 'Advanced parameters',
      advancedNote: 'Pre-filled with Netherlands market and engineering defaults. Edit any value to override it.',
      groupCore: 'Core assumptions',
      groupDegradation: 'Degradation',
      groupStacking: 'Revenue stacking',
      groupSolar: 'Solar assumptions',
      groupLifecycle: 'Lifetime economics',
      fields: {
        priceSpread: { label: 'Price spread', help: 'Average daily gap between cheap and expensive hours on the Dutch day-ahead market. The biggest driver of revenue — edit only if you have your own market data.', unit: '€/MWh' },
        dod: { label: 'Depth of discharge', help: 'Usable share of nameplate capacity per cycle.', unit: '%' },
        cycles: { label: 'Cycles per year', help: 'Higher cycle counts increase battery wear. The degradation rate here assumes roughly one cycle per day — heavy multi-cycle use would wear the battery faster than shown.', unit: 'cycles/yr' },
        life: { label: 'Project life', help: 'Expected operating life of the asset.', unit: 'years' },
        capexPower: { label: 'CAPEX — power block', help: 'Power-conversion system cost per kW of rated power.', unit: '€/kW' },
        capexEnergy: { label: 'CAPEX — energy block', help: 'Battery cell/energy cost per kWh of nameplate capacity.', unit: '€/kWh' },
        opex: { label: 'OPEX', help: 'Annual operating cost as a share of total CAPEX.', unit: '% of CAPEX' },
        degradationPerCycle: { label: 'Degradation per cycle', help: 'Capacity lost per full charge/discharge cycle. Combined with cycles per year, this is what drives throughput-based wear.', unit: '%/cycle' },
        calendarDegradation: { label: 'Calendar degradation', help: 'Capacity lost per year regardless of cycling — ageing that happens even if the battery is never used.', unit: '%/yr' },
        fcrPrice: { label: 'FCR capacity price', help: 'Annual capacity payment per MW allocated to frequency containment reserve.', unit: '€/MW/yr' },
        balancingPrice: { label: 'Balancing capacity price', help: 'Annual capacity payment per MW allocated to balancing (aFRR/mFRR).', unit: '€/MW/yr' },
        specificYield: { label: 'Specific yield', help: 'Expected annual solar generation per kWp installed.', unit: 'kWh/kWp/yr' },
        summerShare: { label: 'Summer generation share', help: 'Share of annual solar generation produced in the summer half of the year. Winter is the remainder.', unit: '%' },
        selfConsumption: { label: 'Self-consumption rate', help: 'Share of solar generation consumed on-site (with battery support) rather than exported.', unit: '%' },
        retailImport: { label: 'Retail import price', help: 'What you’d otherwise pay to import this energy from the grid — the value of self-consumed solar.', unit: '€/kWh' },
        feedInTariff: { label: 'Feed-in tariff', help: 'Price paid for exported solar once net metering ends (post-2027).', unit: '€/kWh' },
        discountRate: { label: 'Discount rate', help: 'Used to discount future cashflows for NPV and LCOS.', unit: '%' },
        chargingPrice: { label: 'Charging price', help: 'Assumed average price paid to recharge the battery. Shown per year for reference; kept separate from LCOS so it isn’t counted twice against the net spread.', unit: '€/MWh' }
      },
      solar: {
        pvSizeLabel: 'PV size',
        pvSizeHelp: 'Installed solar capacity paired with this battery.',
        consumptionLabel: 'Annual site consumption',
        consumptionHelp: 'Optional — caps self-consumption at actual site demand. Leave at 0 to ignore.',
        netMeteringLabel: 'Net metering (pre-2027)',
        netMeteringHelp: 'On values exported solar at the retail import price, matching today’s salderingsregeling. Off applies the lower post-2027 feed-in tariff instead, making self-consumption the main value driver.'
      },
      stacking: {
        sectionNote: 'Capacity given to FCR or balancing is capacity taken away from arbitrage — allocations always split 100% of the battery, never stack additively.',
        fcrToggle: 'Allocate to FCR',
        fcrAllocLabel: 'FCR allocation',
        balancingToggle: 'Allocate to balancing',
        balancingAllocLabel: 'Balancing allocation',
        ineligible: 'Not eligible at {h}h duration — needs at least {min}h to qualify.',
        clampedWarning: 'FCR and balancing allocations added up to more than 100% and were scaled down proportionally.',
        allocationTitle: 'Capacity allocation',
        allocArbitrage: 'Arbitrage',
        allocFcr: 'FCR',
        allocBalancing: 'Balancing'
      },
      lifecycle: {
        sectionTitle: 'Lifetime economics',
        lcos: 'Levelised cost of storage (LCOS)',
        npv: 'Net present value (NPV)',
        viable: 'Viable on arbitrage alone at current assumptions.',
        notViable: 'Not viable on arbitrage alone — consider revenue stacking.',
        scopeNote: 'Arbitrage-only test — excludes FCR, balancing and solar. See NPV for the full revenue picture.',
        viabilityNote: 'Compares the net spread captured per MWh discharged ({spread}) against LCOS ({lcos}).',
        tableTitle: 'Per-year cashflow',
        tableNote: 'Read-only projection over the project life, using the degradation curve above.',
        colYear: 'Year',
        colSoh: 'SoH',
        colEnergy: 'Energy discharged (battery, MWh)',
        colArbitrageNet: 'Arbitrage-only net',
        colNet: 'Net cashflow (total)',
        colDiscounted: 'Discounted net (total)'
      },
      solarResults: {
        sectionTitle: 'Solar economics',
        selfConsumedValue: 'Self-consumed value',
        exportedValue: 'Exported value',
        seasonalTitle: 'Seasonal generation',
        summer: 'Summer',
        winter: 'Winter'
      },
      resultsTitle: 'Estimated results',
      auto: 'auto',
      notViable: 'Not viable on arbitrage alone',
      results: {
        nameplate: 'Nameplate capacity',
        usable: 'Usable capacity',
        rte: 'System RTE',
        capex: 'Total CAPEX',
        capexPerKwh: 'CAPEX per kWh',
        grossRevenue: 'Annual gross revenue',
        netIncome: 'Annual net income',
        payback: 'Simple payback',
        roi: 'ROI'
      },
      years: 'years',
      disclaimer:
        'Estimates only, based on the assumptions above. Not investment advice — actual project economics depend on site-specific market, engineering, and financing conditions.'
    }
  },

  tr: {
    common: {
      startProject: 'Projeye başla',
      contact: 'İletişim',
      discoverMore: 'Daha fazlasını keşfet',
      exploreSolutions: 'Çözümlerimizi keşfedin',
      whoWeAre: 'Biz kimiz',
      allSolutions: 'Tüm çözümler',
      explore: 'Keşfet',
      learnMore: 'Daha fazla',
      backHome: 'Ana sayfaya dön',
      viewSolutions: 'Çözümleri gör',
      sendMessage: 'Mesajı gönder',
      sendAnother: 'Yeni bir mesaj gönder',
      subscribe: 'Abone ol',
      readArticle: 'Yazıyı oku',
      readSuffix: 'okuma',
      skip: 'İçeriğe geç',
      openMenu: 'Menüyü aç',
      closeMenu: 'Menüyü kapat',
      changeLanguage: 'Dili değiştir',
      optional: '(isteğe bağlı)',
      showMore: 'Daha fazla göster',
      showLess: 'Daha az göster'
    },
    footer: {
      pitch:
        'Geleceğe güç veriyoruz. Korrente, dayanıklı ve düşük karbonlu bir şebeke için temiz enerji altyapısı kurar ve işletir.',
      socials: 'Sosyal medya',
      rights: '© {year} Korrente Energy, Inc. Tüm hakları saklıdır.'
    },
    home: {
      heroEyebrow: 'Enerji depolama · Sistem entegrasyonu',
      heroTitleStart: 'Enerji ',
      heroTitleAccent: 'akışını yönetiriz.',
      heroTitleEnd: ' Geleceği siz şekillendirirsiniz.',
      heroLead:
        'Dayanıklı ve esnek bir enerji altyapısı için gelişmiş enerji depolama ve sistem entegrasyonu çözümleri.',
      features: [
        { title: 'Şebeke ölçekli depolama', body: 'Kamu ve sanayi için yüksek performanslı batarya sistemleri.' },
        { title: 'Sistem entegrasyonu', body: 'Karmaşık enerji sistemleri için kusursuz entegrasyon.' },
        { title: 'Avrupa uzmanlığı', body: 'Avrupa genelinde tasarlanır ve işletilir.' },
        { title: 'Sürdürülebilir etki', body: 'Temiz enerji geleceğine giden dönüşümü hızlandırır.' }
      ],
      partnersLabel: 'Kurumların ve sektör liderlerinin güveni',
      introEyebrow: 'Biz kimiz',
      introPre:
        'Basit bir inanç üzerine kurulu bir enerji şirketiyiz: temiz enerji dünyayı ancak ',
      introAccent: 'güvenilir',
      introPost: ', uygun maliyetli ve kalıcı olduğunda değiştirir.',
      introBody1:
        'On yılı aşkın süredir Korrente; güneş, rüzgâr ve depolama alanında yenilenebilir üretim geliştirip işletiyor — bunları ayrı projeler olarak değil, kendi şebeke zekâsı platformumuzla yönetilen koordineli bir filo olarak.',
      introBody2:
        'Bu, kesintisiz ve sevk edilebilir temiz enerji sunmamız anlamına gelir: şebekenin ihtiyaç duyduğu anda gelen, mühendislik titizliğiyle ve faaliyet gösterdiğimiz topluluklara gerçek bağlılıkla desteklenen bir güç.',
      introLink: 'Hikâyemiz hakkında daha fazlası',
      solutionsEyebrow: 'Ne yapıyoruz',
      solutionsTitle: 'Uçtan uca bir temiz enerji şirketi.',
      solutionsLead:
        'Bir projenin ilk megavatından şebekedeki gerçek zamanlı sevkiyata kadar, yenilenebilir enerjiyi güvenilir kılan her katmana sahibiz.',
      whyEyebrow: 'Neden Korrente',
      whyTitle: 'Sahip-işletmeci olmanın avantajları.',
      whyLead:
        'Projeleri devretmeyiz. Onları onlarca yıl çalışacak şekilde inşa ederiz — ve yirminci yılda da yanındayızdır.'
    },
    stats: {
      eyebrow: 'Etki',
      heading: 'Gigavatlarla ve hiç oluşmayan sera gazıyla ölçülür.'
    },
    testimonials: {
      eyebrow: 'Ortaklar',
      title: 'Güç verdiğimiz kurumların ve sektörlerin güveni.',
      prev: 'Önceki görüş',
      next: 'Sonraki görüş',
      choose: 'Görüş seç'
    },
    cta: {
      eyebrow: 'Birlikte inşa edelim',
      title: 'Geleceğe güç vermeye hazır mısınız?',
      body:
        'Sahanızı, yükünüzü veya karbonsuzlaşma hedefinizi bize anlatın. Geliştirme ekibimiz iki iş günü içinde size dönüş yapar.'
    },
    about: {
      eyebrow: 'Korrente Hakkında',
      title: 'Uzun vade için kurulmuş bir temiz enerji şirketi.',
      lead:
        '{year} yılından bu yana yenilenebilir enerji geliştirip işletiyoruz; tek bir hedefle: temiz enerjiyi hem şebekenin hem de hizmet verdiği toplulukların gerçekten güvenebileceği bir şeye dönüştürmek.',
      missionEyebrow: 'Misyonumuz',
      missionPre: 'Bir',
      missionAccent: ' düşük karbonlu ekonominin',
      missionPost:
        ' temiz ve güvenilir enerji omurgasını kurmak — ve onu altyapının hak ettiği özenle işletmek.',
      missionBody1:
        'Korrente tek bir güneş projesi ve bir rahatsızlıkla başladı: çok fazla temiz enerji, otuz yıl çalışmak için değil, basın bülteninde iyi görünmek için inşa ediliyordu. Biz tam tersini yapmaya koyulduk.',
      missionBody2:
        'Bugün güneş, rüzgâr, depolama ve hidrojenden oluşan çeşitlendirilmiş bir filoyu geliştiriyor, finanse ediyor, kuruyor ve işletiyoruz — hepsi kendi yazdığımız yazılımla koordine ediliyor. Gezegeni fazlasıyla önemseyen mühendisler, geliştiriciler ve operatörleriz.',
      principles: [
        { title: 'Önce güvenilirlik', body: 'Temiz enerji ancak güvenilirse işe yarar. Tasarladığımız her şey, onlarca yıl sonra da çalışıp çalışmayacağına göre değerlendirilir.' },
        { title: 'Gerçekten sürdürülebilir', body: 'Yalnızca düşük karbonlu üretim değil; döngüsel malzemeler, iyileştirilmiş araziler ve dürüst, denetlenmiş muhasebe.' },
        { title: 'Mühendislik titizliği', body: 'Pazarlama yerine ölçülmüş veri. Her projeyi ihtiyatlı bir şekilde taahhüt eder ve sayılarımızı kanıtlarız.' }
      ],
      storyEyebrow: 'Hikâyemiz',
      storyTitle: 'Tek bir projeden küresel bir filoya.',
      storyLead: 'On beş yıldır çalışmak zorunda olan temiz enerji inşa ediyoruz — ve çalışıyor.',
      statsEyebrow: 'Rakamlarla',
      statsHeading: 'On beş yıllık ölçülebilir etki.',
      valuesEyebrow: 'Nasıl çalışırız',
      valuesTitle: 'Ödün vermediğimiz ilkeler.',
      leadershipEyebrow: 'Liderlik',
      leadershipTitle: 'Her megavattan sorumlu olan insanlar.',
      ctaEyebrow: 'Bize katılın',
      ctaTitle: 'Enerji dönüşümünü bizimle inşa etmek ister misiniz?',
      ctaBody:
        'Temiz enerjiyi bizim kadar ciddiye alan mühendisleri, geliştiricileri ve operatörleri her zaman arıyoruz.'
    },
    solutions: {
      eyebrow: 'Çözümler',
      title: 'Güvenilir temiz enerjinin her katmanı.',
      lead:
        'Temiz enerji yığınının tamamında geliştirir, kurar ve işletiriz — ve hepsini, yenilenebilir enerjiyi kesintisiz ve planlanabilir bir güç gibi davranmaya iten yazılımla birbirine bağlarız.',
      processEyebrow: 'Nasıl teslim ederiz',
      processTitle: 'Kaynak bulmadan onlarca yıllık işletmeye.',
      process: [
        { title: 'Kaynak bul', body: 'Gerçekten fizibil projeler bulmak için saha, kaynak ve şebeke bağlantısı analizi.' },
        { title: 'Geliştir', body: 'Bir projeyi inşa edilebilir ve finanse edilebilir kılmak için izinler, topluluk katılımı ve mühendislik.' },
        { title: 'İnşa et', body: 'Zamanında, bütçesinde ve şartnamesine uygun teslim eden disiplinli EPC gözetimi.' },
        { title: 'İşlet', body: 'Şebeke zekâsı platformumuz aracılığıyla onlarca yıllık varlık yönetimi ve optimizasyon.' }
      ],
      ctaTitle: 'Aklınızda bir saha, yük ya da hedef mi var?',
      ctaBody:
        'İster boş arazi, ister bir alım ihtiyacı, ister kurumsal net sıfır hedefi olsun, ekibimiz temiz enerjiye giden en hızlı güvenilir yolu çıkarabilir.'
    },
    sustainability: {
      eyebrow: 'Sürdürülebilirlik & Etki',
      title: 'Ürün temiz enerji. Sürdürülebilirlik ise tüm şirket.',
      lead:
        'Kendi operasyonlarımızı, şebekeden istediğimiz standartta tutarız — ölçülebilir, denetlenmiş ve her yıl gelişen.',
      approachEyebrow: 'Yaklaşımımız',
      approachTitle: 'Faaliyet gösterdiğimiz her yerde üç taahhüt.',
      pillars: [
        { title: 'Karbonu azalt', body: 'Fosil üretimini, kömür ve gazı yalnızca desteklemek değil gerçekten emekliye ayıracak kadar güvenilir temiz enerjiyle ikame et.' },
        { title: 'Koru', body: 'Habitatları iyileştir, suyu koru ve her sahayı çevresindeki ekolojiyi ölçülebilir biçimde daha sağlıklı bırakacak şekilde tasarla.' },
        { title: 'Güçlendir', body: 'Projelerimize ev sahipliği yapan topluluklarla sahipliği ve değeri paylaş, geleceğin temiz enerji iş gücünü kur.' }
      ],
      commitmentsEyebrow: 'Hesap verdiğimiz hedefler',
      commitmentsTitle: 'Açıkça takip edilen kamuya açık taahhütler.',
      commitmentsLead:
        'Buradaki her rakam, etki raporumuzda yıllık olarak raporlanır ve bağımsız biçimde doğrulanır.',
      impactEyebrow: 'Bu yılki ilerleme',
      impactTitle: 'Atmosfere hiç ulaşmayan 9,6 milyon ton CO₂.',
      impactBody:
        'İşletmedeki filomuz genelinde temiz üretim, iki milyondan fazla otomobilin yıllık emisyonuna eşdeğer bir miktarı ikame etti. Depolama ve sevk zekâsı ekledikçe, inşa ettiğimiz her megavat daha fazlasını yapıyor — karbonu tam da şebekenin en kirli olduğu anda kesiyor.',
      bars: [
        'Yenilenebilir üretim',
        'Çöp sahasından uzaklaştırılan atık',
        'Su yoğunluğunda azalma',
        'Projelerde yerel istihdam'
      ],
      ctaEyebrow: 'Etkide ortak olun',
      ctaTitle: 'Kendi hedefinize doğru mu ilerliyorsunuz?',
      ctaBody:
        '7/24 karbonsuz enerji eşleştirmesinden topluluk fayda tasarımına kadar, ortaklarımızın sürdürülebilirlik hedeflerini kurulmuş, işleyen altyapıya dönüştürmesine yardımcı oluruz.'
    },
    news: {
      eyebrow: 'İçgörüler',
      title: 'Enerji dönüşümünün ön cephesinden notlar.',
      lead:
        'Her gün temiz enerji inşa eden ve işleten insanlardan saha raporları, teknik derinlemesine incelemeler ve dürüst değerlendirmeler.',
      featured: 'Öne çıkan',
      all: 'Tümü',
      empty: 'Bu kategoride henüz yazı yok — yakında tekrar bakın.',
      newsletterEyebrow: 'Gelişmelerden haberdar olun',
      newsletterTitle: 'Aylık saha notlarımızı alın.',
      newsletterBody:
        'Temiz enerji, şebeke ve inşa ederken öğrendiklerimiz üzerine ayda bir özenli e-posta. Gürültü yok.',
      emailPlaceholder: 'siz@sirket.com',
      backToNews: 'İçgörülere dön',
      loading: 'Yazı yükleniyor…',
      notFoundTitle: 'Yazı bulunamadı.',
      notFoundBody: 'Bu yazı taşınmış ya da hiç var olmamış olabilir.'
    },
    contact: {
      eyebrow: 'İletişim',
      title: 'Enerjinizi konuşalım.',
      lead:
        'İster bir saha, ister bir yük, ister bir hedef getirin; geliştirme ekibimiz sizi temiz enerjiye giden en hızlı güvenilir yola yönlendirir.',
      infoTitle: 'Bize doğrudan ulaşın',
      labelEmail: 'E-posta',
      labelPhone: 'Telefon',
      labelHq: 'Genel merkez',
      labelHours: 'Çalışma saatleri',
      note: 'Tipik yanıt süremiz iki iş gününden kısadır.',
      fieldName: 'Ad Soyad',
      fieldEmail: 'E-posta',
      fieldCompany: 'Şirket',
      fieldTopic: 'Konu',
      fieldMessage: 'Mesaj',
      topicPlaceholder: 'Bir konu seçin…',
      topics: [
        'Bizimle bir proje geliştirin',
        'Elektrik alımı / offtake',
        'Kurumsal karbonsuzlaşma',
        'Basın & medya',
        'Kariyer',
        'Başka bir şey'
      ],
      errName: 'Lütfen adınızı girin.',
      errEmailRequired: 'Lütfen e-postanızı girin.',
      errEmailInvalid: 'Lütfen geçerli bir e-posta adresi girin.',
      errTopic: 'Lütfen bir konu seçin.',
      errMessageRequired: 'Lütfen talebiniz hakkında biraz bilgi verin.',
      errMessageShort: 'Biraz daha ayrıntı, mesajınızı yönlendirmemize yardımcı olur.',
      legal:
        'Göndererek gizlilik politikamızı kabul etmiş olursunuz. Bilgilerinizi yalnızca talebinize yanıt vermek için kullanırız.',
      successTitle: 'Mesajınız alındı.',
      successBody:
        'Teşekkürler {name} — talebiniz ekibimize ulaştı. İki iş günü içinde {email} adresinden size ulaşacağız.',
      hours: 'Pzt–Cum · 08:00–18:00 PT'
    },
    technology: {
      eyebrow: 'Teknoloji',
      title: 'Her megavatın arkasındaki zekâ.',
      lead:
        'Korrente Grid, filomuzun yazılım katmanıdır — depolama ve üretimi gerçek zamanlı olarak tahminler, sevk eder ve optimize eder.',
      platformEyebrow: 'Platform',
      platformTitle: 'Esnek bir şebeke için tek bir kontrol katmanı.',
      platformLead:
        'Yenilenebilir enerjiyi ve depolamayı kesintisiz, planlanabilir bir güç gibi davranmaya itmek için özel olarak tasarlandı.',
      capabilities: [
        { title: 'Saat altı tahmin', body: 'Değişken yenilenebilir enerjiyi planlanabilir bir kaynağa dönüştüren yüksek çözünürlüklü üretim ve talep tahminleri.' },
        { title: 'Otomatik sevkiyat', body: 'Depolama, canlı piyasa fiyatlarına karşı birlikte optimize edilir ve saniye saniye otomatik olarak sevk edilir.' },
        { title: 'Öngörücü bakım', body: 'Sensör verileri bozulmayı erken işaret eder; böylece varlıklar arıza yapmadan önce bakıma alınır.' },
        { title: 'Açık entegrasyon', body: 'Standart tabanlı API’ler; SCADA’ya, piyasa operatörlerine ve üçüncü taraf varlıklara bağımlılık olmadan bağlanır.' }
      ],
      ctaTitle: 'Platforma daha yakından bakmak ister misiniz?',
      ctaBody: 'Filonun canlı bir görünümünü ve Korrente Grid’in varlıklarınızı nasıl sevk edebileceğini birlikte inceleyelim.'
    },
    projects: {
      eyebrow: 'Projeler',
      title: 'Kurduğumuz ve işlettiğimiz altyapı.',
      lead:
        'Korrente’nin Avrupa genelinde geliştirdiği, kurduğu ve işlettiği depolama ile üretim projelerinden bir seçki.',
      statusOperational: 'İşletmede',
      statusConstruction: 'Yapım aşamasında',
      statusDevelopment: 'Geliştirmede',
      ctaTitle: 'Aklınızda bir saha veya proje mi var?',
      ctaBody: 'Boş araziden şebeke bağlantısına kadar ekibimiz, kurulmuş ve işleyen bir varlığa giden en hızlı güvenilir yolu çıkarabilir.',
      backToProjects: 'Projelere dön',
      loading: 'Proje yükleniyor…',
      notFoundTitle: 'Proje bulunamadı.',
      notFoundBody: 'Bu proje taşınmış ya da hiç var olmamış olabilir.'
    },
    careers: {
      eyebrow: 'Kariyer',
      title: 'Enerji dönüşümünü bizimle inşa edin.',
      lead:
        'Temiz ve güvenilir enerjiyi gezegenin hak ettiği kadar ciddiye alan bir mühendis, geliştirici ve operatör ekibiyiz.',
      cultureEyebrow: 'Korrente’de hayat',
      cultureTitle: 'Ciddi işler, gerçekten iyi insanlar.',
      culture: [
        { title: 'Gerçek sahiplik', body: 'Küçük ekipler, büyük yetkiler. Kuyruktaki biletleri değil, sonuçları uçtan uca sahiplenirsiniz.' },
        { title: 'Ölçebileceğiniz etki', body: 'Dokunduğunuz her proje fosil üretimin yerini alır ve kamuya açık etki rakamlarımızda görünür.' },
        { title: 'Şebekeyle büyüyün', body: 'Cömert öğrenme bütçeleri, mentorluk ve filomuz Avrupa’da büyüdükçe net bir yol.' }
      ],
      rolesEyebrow: 'Açık pozisyonlar',
      rolesTitle: 'Nerede yer alabilirsiniz.',
      apply: 'Pozisyonu gör',
      ctaTitle: 'Pozisyonunuzu göremediniz mi?',
      ctaBody: 'Temiz enerjiyi önemseyen insanlarla tanışmaktan her zaman memnuniyet duyarız. Bize yazın ve neyi inşa edeceğinizi anlatın.',
      backToCareers: 'Kariyere dön',
      loading: 'Pozisyon yükleniyor…',
      notFoundTitle: 'Pozisyon bulunamadı.',
      notFoundBody: 'Bu pozisyon taşınmış ya da hiç var olmamış olabilir.',
      applyNow: 'Şimdi başvur',
      applySubject: 'Başvuru: {title}'
    },
    notFound: {
      title: 'Bu sayfa şebeke dışına çıktı.',
      lead:
        'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Sizi tekrar enerji dolu bir yere götürelim.'
    },
    calculator: {
      eyebrow: 'Gelir Hesaplayıcı',
      title: 'Batarya depolama gelirini tahmin edin.',
      lead:
        'Hollanda şebeke arbitrajı gelirini tahmin etmek için hızlı bir model. Varsayılanlar önceden dolduruldu — yalnızca bildiğiniz değerleri değiştirin.',
      inputsTitle: 'Proje girdileri',
      modeLabel: 'Mod',
      modeGrid: 'Şebeke Arbitrajı',
      modeSolar: 'Güneş Eşleşmeli',
      powerLabel: 'Güç kapasitesi',
      powerHelp: 'Projenin anma gücü, megavat cinsinden.',
      durationLabel: 'Süre',
      durationHelp: 'Anma gücünde depolama süresi. Daha uzun süre daha kademeli döngü sağlar ve verimliliği artırır.',
      durationUnit: 'saat',
      advancedToggle: 'Gelişmiş parametreler',
      advancedNote: 'Hollanda piyasa ve mühendislik varsayılanlarıyla önceden dolduruldu. Geçersiz kılmak için herhangi bir değeri düzenleyin.',
      groupCore: 'Temel varsayımlar',
      groupDegradation: 'Bozulma',
      groupStacking: 'Gelir istifleme',
      groupSolar: 'Güneş varsayımları',
      groupLifecycle: 'Yaşam döngüsü ekonomisi',
      fields: {
        priceSpread: { label: 'Fiyat farkı', help: 'Hollanda gün öncesi piyasasında ucuz ve pahalı saatler arasındaki ortalama günlük fark. Gelirin en büyük belirleyicisi — yalnızca kendi piyasa verileriniz varsa değiştirin.', unit: '€/MWh' },
        dod: { label: 'Deşarj derinliği', help: 'Döngü başına anma kapasitesinin kullanılabilir payı.', unit: '%' },
        cycles: { label: 'Yıllık döngü sayısı', help: 'Yüksek döngü sayıları batarya yıpranmasını artırır. Buradaki bozulma oranı, günde yaklaşık bir döngü varsayar — yoğun çoklu döngü kullanımı bataryayı gösterilenden daha hızlı yıpratır.', unit: 'döngü/yıl' },
        life: { label: 'Proje ömrü', help: 'Varlığın beklenen işletme ömrü.', unit: 'yıl' },
        capexPower: { label: 'CAPEX — güç bloğu', help: 'Anma gücünün kW başına güç dönüşüm sistemi maliyeti.', unit: '€/kW' },
        capexEnergy: { label: 'CAPEX — enerji bloğu', help: 'Anma kapasitesinin kWh başına batarya hücre/enerji maliyeti.', unit: '€/kWh' },
        opex: { label: 'OPEX', help: 'Toplam CAPEX’in payı olarak yıllık işletme maliyeti.', unit: 'CAPEX’in %’si' },
        degradationPerCycle: { label: 'Döngü başına bozulma', help: 'Tam bir şarj/deşarj döngüsünde kaybedilen kapasite. Yıllık döngü sayısıyla birlikte, throughput’a dayalı yıpranmayı belirler.', unit: '%/döngü' },
        calendarDegradation: { label: 'Takvim bozulması', help: 'Döngüden bağımsız olarak yıllık kaybedilen kapasite — batarya hiç kullanılmasa bile oluşan yaşlanma.', unit: '%/yıl' },
        fcrPrice: { label: 'FCR kapasite fiyatı', help: 'Frekans tutma rezervine ayrılan MW başına yıllık kapasite ödemesi.', unit: '€/MW/yıl' },
        balancingPrice: { label: 'Dengeleme kapasite fiyatı', help: 'Dengelemeye (aFRR/mFRR) ayrılan MW başına yıllık kapasite ödemesi.', unit: '€/MW/yıl' },
        specificYield: { label: 'Özgül verim', help: 'Kurulu kWp başına beklenen yıllık güneş üretimi.', unit: 'kWh/kWp/yıl' },
        summerShare: { label: 'Yaz üretim payı', help: 'Yıllık güneş üretiminin yılın yaz yarısında üretilen payı. Kış geri kalanıdır.', unit: '%' },
        selfConsumption: { label: 'Öz tüketim oranı', help: 'Güneş üretiminin ihraç edilmek yerine sahada (batarya desteğiyle) tüketilen payı.', unit: '%' },
        retailImport: { label: 'Perakende ithalat fiyatı', help: 'Bu enerjiyi şebekeden almak için ödeyeceğiniz fiyat — öz tüketilen güneşin değeri.', unit: '€/kWh' },
        feedInTariff: { label: 'Şebekeye satış tarifesi', help: 'Net ölçüm sona erdiğinde (2027 sonrası) ihraç edilen güneş için ödenen fiyat.', unit: '€/kWh' },
        discountRate: { label: 'İskonto oranı', help: 'NPV ve LCOS için gelecekteki nakit akışlarını iskonto etmekte kullanılır.', unit: '%' },
        chargingPrice: { label: 'Şarj fiyatı', help: 'Bataryayı şarj etmek için ödenen varsayılan ortalama fiyat. Referans için yıllık gösterilir; net fiyat farkına karşı iki kez sayılmaması için LCOS’tan ayrı tutulur.', unit: '€/MWh' }
      },
      solar: {
        pvSizeLabel: 'Güneş paneli boyutu',
        pvSizeHelp: 'Bu bataryayla eşleştirilen kurulu güneş kapasitesi.',
        consumptionLabel: 'Yıllık saha tüketimi',
        consumptionHelp: 'İsteğe bağlı — öz tüketimi gerçek saha talebiyle sınırlar. Yok saymak için 0 bırakın.',
        netMeteringLabel: 'Net ölçüm (2027 öncesi)',
        netMeteringHelp: 'Açıkken ihraç edilen güneş, bugünkü mahsuplaşma düzenlemesine uygun olarak perakende ithalat fiyatından değerlenir. Kapalıyken, öz tüketimi ana değer belirleyici yapan daha düşük 2027 sonrası şebekeye satış tarifesi uygulanır.'
      },
      stacking: {
        sectionNote: 'FCR veya dengelemeye ayrılan kapasite, arbitrajdan alınan kapasitedir — tahsisler her zaman bataryanın %100’ünü paylaştırır, asla toplamalı olarak istiflenmez.',
        fcrToggle: 'FCR’a tahsis et',
        fcrAllocLabel: 'FCR tahsisi',
        balancingToggle: 'Dengelemeye tahsis et',
        balancingAllocLabel: 'Dengeleme tahsisi',
        ineligible: '{h} saatlik sürede uygun değil — nitelik kazanmak için en az {min} saat gerekir.',
        clampedWarning: 'FCR ve dengeleme tahsisleri toplamda %100’ü aştı ve orantılı olarak aşağı ölçeklendirildi.',
        allocationTitle: 'Kapasite tahsisi',
        allocArbitrage: 'Arbitraj',
        allocFcr: 'FCR',
        allocBalancing: 'Dengeleme'
      },
      lifecycle: {
        sectionTitle: 'Yaşam döngüsü ekonomisi',
        lcos: 'Seviyelendirilmiş depolama maliyeti (LCOS)',
        npv: 'Net bugünkü değer (NPV)',
        viable: 'Mevcut varsayımlarla yalnızca arbitrajla uygun.',
        notViable: 'Yalnızca arbitrajla uygun değil — gelir istiflemeyi düşünün.',
        scopeNote: 'Yalnızca arbitraj testi — FCR, dengeleme ve güneşi hariç tutar. Tam gelir tablosu için NPV’ye bakın.',
        viabilityNote: 'Deşarj edilen MWh başına yakalanan net fiyat farkını ({spread}) LCOS ({lcos}) ile karşılaştırır.',
        tableTitle: 'Yıllık nakit akışı',
        tableNote: 'Yukarıdaki bozulma eğrisini kullanarak proje ömrü boyunca salt okunur projeksiyon.',
        colYear: 'Yıl',
        colSoh: 'SoH',
        colEnergy: 'Deşarj edilen enerji (batarya, MWh)',
        colArbitrageNet: 'Yalnızca arbitraj net',
        colNet: 'Net nakit akışı (toplam)',
        colDiscounted: 'İskontolu net (toplam)'
      },
      solarResults: {
        sectionTitle: 'Güneş ekonomisi',
        selfConsumedValue: 'Öz tüketilen değer',
        exportedValue: 'İhraç edilen değer',
        seasonalTitle: 'Mevsimsel üretim',
        summer: 'Yaz',
        winter: 'Kış'
      },
      resultsTitle: 'Tahmini sonuçlar',
      auto: 'otomatik',
      notViable: 'Yalnızca arbitrajla uygun değil',
      results: {
        nameplate: 'Anma kapasitesi',
        usable: 'Kullanılabilir kapasite',
        rte: 'Sistem RTE',
        capex: 'Toplam CAPEX',
        capexPerKwh: 'kWh başına CAPEX',
        grossRevenue: 'Yıllık brüt gelir',
        netIncome: 'Yıllık net gelir',
        payback: 'Basit geri ödeme',
        roi: 'Yatırım getirisi (ROI)'
      },
      years: 'yıl',
      disclaimer:
        'Yalnızca yukarıdaki varsayımlara dayalı tahminlerdir. Yatırım tavsiyesi değildir — gerçek proje ekonomisi sahaya özgü piyasa, mühendislik ve finansman koşullarına bağlıdır.'
    }
  }
}
