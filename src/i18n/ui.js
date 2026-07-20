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
      rights: '© {year} Korrente Energy, Inc. All rights reserved.'
    },
    home: {
      heroEyebrow: 'Energy storage · System integration',
      heroTitleStart: 'We manage ',
      heroTitleAccent: 'energy flow.',
      heroTitleEnd: ' You shape the future.',
      heroLead:
        'Advanced energy storage and system integration solutions for a resilient and flexible energy infrastructure.',
      scene: {
        wind: 'Wind',
        solar: 'Solar',
        bess: 'Korrente BESS',
        grid: 'Grid'
      },
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
      introLink: 'Get in touch',
      solutionsEyebrow: 'What we do',
      solutionsTitle: 'A full-stack clean energy company.',
      solutionsLead:
        'From the first megawatt of a project to real-time dispatch on the grid, we own every layer that makes renewable power dependable.',
      whyEyebrow: 'Why Korrente',
      whyTitle: 'The advantages of an owner-operator.',
      whyLead:
        'We don’t hand projects off. We build them to run for decades — and we’re still there on year twenty.'
    },
    testimonials: {
      prev: 'Previous testimonial',
      next: 'Next testimonial',
      choose: 'Choose testimonial'
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
      ]
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
      ]
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
      labelEmail: 'Email',
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
        'Thanks, {name} — your enquiry is with our team. We’ll be in touch at {email} within two business days.'
    },
    projects: {
      statusOperational: 'Operational',
      statusConstruction: 'Under construction',
      statusDevelopment: 'In development',
      backToProjects: 'Back to Projects',
      loading: 'Loading project…',
      notFoundTitle: 'Project not found.',
      notFoundBody: 'This project may have moved or never existed.'
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
      chemistryLabel: 'Battery chemistry',
      chemistryLithium: 'Lithium LFP',
      chemistryFlow: 'Vanadium Flow',
      chemistryHelp:
        "Presets approximate each chemistry's efficiency, lifetime and cost. Flow batteries are modelled by adjusting these values, not full flow-specific physics — a close estimate, not an exact flow model.",
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
        lifetimeProfit: 'Lifetime net profit ({years} yr)',
        lifetimeProfitNote:
          'Estimated total earnings over the project life after CAPEX and running costs. An estimate based on the assumptions above — actual results depend on real market prices.',
        npvToday: "In today's money (NPV)",
        npvTodayNote:
          "Same profit expressed in today's money, using a {rate}% discount rate — the more conservative, finance-grade figure.",
        lcos: 'Levelised cost of storage (LCOS)',
        npv: 'Net present value (NPV)',
        projectViable: 'Viable — positive NPV over the project life.',
        projectNotViable: 'Not viable — negative NPV over the project life at current assumptions.',
        viable: 'Viable on arbitrage alone at current assumptions.',
        notViable: 'Not viable on arbitrage alone at current assumptions — enable revenue stacking or solar pairing to improve returns.',
        notViableSolarNote:
          'This battery would not cover its cost on arbitrage alone — but in solar-paired mode, solar generation and self-consumption drive the returns (see NPV above).',
        notViableStackingNote:
          'This battery would not cover its cost on arbitrage alone — but revenue stacking (FCR/balancing) is driving positive overall returns (see NPV above).',
        notViableWarnSolar:
          'Not viable at current assumptions, even with solar revenue included — consider revenue stacking or adjusting inputs.',
        scopeNote: 'Arbitrage-only test — excludes FCR, balancing and solar. See NPV for the full revenue picture.',
        viabilityNote: 'Compares the net spread captured per MWh discharged ({spread}) against LCOS ({lcos}).',
        tableTitle: 'Per-year cashflow',
        tableNote: 'Read-only projection over the project life, using the degradation curve above.',
        colYear: 'Year',
        colSoh: 'SoH',
        colEnergy: 'Energy discharged (battery, MWh)',
        colArbitrageNet: 'Arbitrage-only net',
        colNet: 'Net cashflow (total)',
        colDiscounted: 'Discounted net (total)',
        downloadCsv: 'Download CSV',
        csv: {
          colYear: 'Year',
          colSoh: 'SoH %',
          colEnergy: 'Energy discharged (battery, MWh)',
          colArbitrageNet: 'Arbitrage-only net (EUR)',
          colNet: 'Net cashflow (EUR)',
          colDiscounted: 'Discounted net (EUR)',
          summaryTitle: 'Summary',
          totalCapex: 'Total CAPEX (EUR)',
          lcos: 'LCOS (EUR/MWh)',
          npv: 'NPV (EUR)',
          payback: 'Payback (years)',
          roi: 'ROI (%)',
          assumptionsTitle: 'Assumptions',
          mode: 'Mode',
          chemistry: 'Battery chemistry',
          power: 'Power (MW)',
          duration: 'Duration (h)',
          priceSpread: 'Price spread (EUR/MWh)',
          cycles: 'Cycles/yr'
        }
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
  }
}
