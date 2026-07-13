/* ------------------------------------------------------------------
   SOLUTIONS / SERVICES
   Translatable fields are { en, tr }; select with pick() from useI18n().
   `icon` maps to a key in components/Icon.jsx.
   ------------------------------------------------------------------ */

export const services = [
  {
    id: 'solar',
    icon: 'sun',
    name: 'Utility-Scale Solar',
    summary: 'Ground-mount and tracker solar plants delivered from site control to commercial operation.',
    description: 'We develop, finance, and operate utility-scale photovoltaic plants that feed clean power directly onto the grid. From land origination and interconnection to EPC oversight and long-term asset management, Korrente owns the full lifecycle so partners get predictable output and durable returns.',
    features: ['Single-axis tracking for higher yield', 'Bankable interconnection & permitting', 'Long-term O&M and performance guarantees'],
    metric: { value: '2.4', unit: 'GW', label: 'solar in operation' }
  },
  {
    id: 'wind',
    icon: 'wind',
    name: 'Wind Development',
    summary: 'Onshore wind portfolios built on rigorous resource assessment and community partnership.',
    description: 'Korrente develops onshore wind farms where the resource, the grid, and the community all align. Multi-year met-mast campaigns and high-resolution wake modelling let us site turbines for maximum lifetime yield while minimising land and visual impact.',
    features: ['Bankable multi-year resource studies', 'Turbine-agnostic procurement', 'Local ownership & benefit-sharing models'],
    metric: { value: '1.1', unit: 'GW', label: 'wind under development' }
  },
  {
    id: 'storage',
    icon: 'battery',
    name: 'Energy Storage',
    summary: 'Grid-scale battery systems that firm renewables and stabilise volatile markets.',
    description: 'Our battery energy storage systems (BESS) shift clean power to when it is needed most and provide the fast-frequency response modern grids depend on. Korrente co-locates storage with generation and stands alone at constrained nodes, unlocking capacity without new transmission.',
    features: ['Co-located & standalone BESS', 'Frequency response & capacity markets', 'Augmentation-ready 20-year design life'],
    metric: { value: '3.8', unit: 'GWh', label: 'storage contracted' }
  },
  {
    id: 'grid',
    icon: 'grid',
    name: 'Grid Intelligence',
    summary: 'A software platform that forecasts, dispatches, and optimises every asset in real time.',
    description: 'Korrente Grid is the control layer across our fleet — a real-time platform that forecasts generation, co-optimises storage against market prices, and dispatches assets automatically. Operators get a single pane of glass; the grid gets a more predictable, more flexible resource.',
    features: ['Sub-hourly generation forecasting', 'Automated market bidding & dispatch', 'Predictive maintenance from sensor telemetry'],
    metric: { value: '99.95', unit: '%', label: 'fleet availability' }
  },
  {
    id: 'hydrogen',
    icon: 'molecule',
    name: 'Green Hydrogen',
    summary: 'Electrolysis powered by our own renewables, decarbonising industry and heavy transport.',
    description: 'Where electrons can’t reach, molecules can. Korrente pairs dedicated renewable generation with electrolysis to produce green hydrogen for industrial off-takers, displacing fossil feedstocks in sectors that are hardest to abate.',
    features: ['Additional, dedicated renewable supply', 'Certified low-carbon intensity', 'Off-take structuring for industry'],
    metric: { value: '40', unit: 'MW', label: 'electrolysis in pipeline' }
  },
  {
    id: 'advisory',
    icon: 'compass',
    name: 'Transition Advisory',
    summary: 'Corporate decarbonisation strategy backed by assets we actually build and operate.',
    description: 'We help large energy buyers move from pledges to megawatts — structuring power purchase agreements, on-site generation, and 24/7 carbon-free energy matching. Because we own the assets, our advice is grounded in what genuinely gets built.',
    features: ['PPA & 24/7 CFE strategy', 'On-site & behind-the-meter generation', 'Transparent, audited carbon accounting'],
    metric: { value: '60+', unit: '', label: 'corporate off-takers' }
  }
]
