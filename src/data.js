/* Reliant Intelligence Platform — DATA LAYER
   FY26 (Apr-2025 → Mar-2026), India real estate
   Mock-but-plausible data — NOT a proprietary dataset. */

export const CITIES = [
  { id: 'pan',  name: 'Pan India',     short: 'Pan-IN', mult: 1.00, tier: 0 },
  { id: 'mum',  name: 'Mumbai',        short: 'MUM',    mult: 1.40, tier: 1 },
  { id: 'blr',  name: 'Bengaluru',     short: 'BLR',    mult: 1.25, tier: 1 },
  { id: 'del',  name: 'Delhi NCR',     short: 'DEL',    mult: 1.30, tier: 1 },
  { id: 'hyd',  name: 'Hyderabad',     short: 'HYD',    mult: 1.05, tier: 1 },
  { id: 'pun',  name: 'Pune',          short: 'PUN',    mult: 0.92, tier: 1 },
  { id: 'che',  name: 'Chennai',       short: 'CHE',    mult: 0.88, tier: 1 },
  { id: 'kol',  name: 'Kolkata',       short: 'KOL',    mult: 0.62, tier: 2 },
  { id: 'ahd',  name: 'Ahmedabad',     short: 'AHD',    mult: 0.58, tier: 2 },
  { id: 'jai',  name: 'Jaipur',        short: 'JAI',    mult: 0.42, tier: 2 },
  { id: 'goa',  name: 'Goa',           short: 'GOA',    mult: 0.34, tier: 2 },
  { id: 'koc',  name: 'Kochi',         short: 'KOC',    mult: 0.36, tier: 2 },
];

const inrFmt = new Intl.NumberFormat('en-IN');

export function formatINR(rupees) {
  if (rupees == null || isNaN(rupees)) return '—';
  const abs = Math.abs(rupees);
  const sign = rupees < 0 ? '-' : '';
  if (abs >= 1e7) return sign + '₹' + (abs / 1e7).toFixed(abs >= 1e9 ? 0 : 1) + ' Cr';
  if (abs >= 1e5) return sign + '₹' + (abs / 1e5).toFixed(1) + ' L';
  if (abs >= 1000) return sign + '₹' + inrFmt.format(Math.round(abs));
  return sign + '₹' + abs.toFixed(0);
}
export function formatCr(crore) {
  if (crore == null) return '—';
  if (Math.abs(crore) >= 1000) return '₹' + (crore / 1000).toFixed(1) + 'k Cr';
  return '₹' + (Math.round(crore * 10) / 10) + ' Cr';
}
export function formatNum(n, decimals = 0) {
  if (n == null || isNaN(n)) return '—';
  return Number(n).toLocaleString('en-IN', { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}
export function formatPct(p, decimals = 1) {
  if (p == null) return '—';
  return Number(p).toFixed(decimals) + '%';
}
export function formatDelta(p) {
  if (p == null) return '—';
  return (p > 0 ? '+' : '') + p.toFixed(1) + '%';
}
export function filterByCity(items, cityId) {
  if (!cityId || cityId === 'pan') return items;
  return items.filter(it => it.city === cityId);
}
export function cityMult(cityId) {
  const c = CITIES.find(c => c.id === cityId);
  return c ? c.mult : 1;
}

export const HOSPITALITY = {
  summary: {
    keysFY26: 178400,
    pipelineKeys: 92800,
    systemAvgADR: 8950,
    systemRevPAR: 6470,
    occFY26: 72.3,
    yoyKeysPct: 8.2,
    yoyADRPct: 11.6,
    yoyRevPARPct: 14.2,
    yoyUtilPct: 2.1,
    branded_pct_fy26: 38.2,
  },
  quarterlyADR: [
    { quarter: 'Q1 FY26', adr: 8420, revpar: 5980, occ: 71.0 },
    { quarter: 'Q2 FY26', adr: 8610, revpar: 6120, occ: 71.1 },
    { quarter: 'Q3 FY26', adr: 9580, revpar: 7260, occ: 75.8 },
    { quarter: 'Q4 FY26', adr: 9180, revpar: 6520, occ: 71.0 },
  ],
  submarkets: [
    { id: 'mum-bkc',    city: 'mum', name: 'BKC / Bandra',          adr: 14200, revpar: 11260, occ: 79.3, keys: 4180,  pipeline: 1820 },
    { id: 'mum-andheri',city: 'mum', name: 'Andheri / Powai',       adr: 9100,  revpar: 6630,  occ: 72.9, keys: 6840,  pipeline: 2420 },
    { id: 'mum-south',  city: 'mum', name: 'South Mumbai',          adr: 16800, revpar: 12100, occ: 72.1, keys: 2940,  pipeline: 480  },
    { id: 'mum-navi',   city: 'mum', name: 'Navi Mumbai',           adr: 7400,  revpar: 5180,  occ: 70.0, keys: 3920,  pipeline: 2840 },
    { id: 'blr-orr',    city: 'blr', name: 'ORR / Whitefield',      adr: 8400,  revpar: 6300,  occ: 75.0, keys: 7820,  pipeline: 3150 },
    { id: 'blr-mg',     city: 'blr', name: 'MG Rd / Indiranagar',   adr: 9900,  revpar: 7320,  occ: 73.9, keys: 4220,  pipeline: 1240 },
    { id: 'blr-airport',city: 'blr', name: 'Airport / Devanahalli', adr: 7200,  revpar: 5540,  occ: 76.9, keys: 3140,  pipeline: 4320 },
    { id: 'del-aero',   city: 'del', name: 'Aerocity',              adr: 12400, revpar: 9300,  occ: 75.0, keys: 5280,  pipeline: 1680 },
    { id: 'del-cp',     city: 'del', name: 'Connaught Place',       adr: 11600, revpar: 8060,  occ: 69.5, keys: 3120,  pipeline: 420  },
    { id: 'del-gur',    city: 'del', name: 'Gurugram CBD',          adr: 9200,  revpar: 6900,  occ: 75.0, keys: 6940,  pipeline: 3260 },
    { id: 'del-noida',  city: 'del', name: 'Noida / Greater Noida', adr: 6800,  revpar: 4830,  occ: 71.0, keys: 4180,  pipeline: 4620 },
    { id: 'hyd-hitec',  city: 'hyd', name: 'Hitec City / Gachibowli',adr: 7600, revpar: 5780, occ: 76.1, keys: 4860,  pipeline: 3240 },
    { id: 'hyd-banj',   city: 'hyd', name: 'Banjara / Jubilee',     adr: 9100,  revpar: 6730,  occ: 74.0, keys: 2820,  pipeline: 940  },
    { id: 'pun-kop',    city: 'pun', name: 'Koregaon / Kalyani Nagar',adr: 8200,revpar: 6230, occ: 76.0, keys: 3940,  pipeline: 1860 },
    { id: 'pun-hin',    city: 'pun', name: 'Hinjewadi / Wakad',     adr: 6400,  revpar: 4670,  occ: 73.0, keys: 4720,  pipeline: 2640 },
    { id: 'che-omr',    city: 'che', name: 'OMR / Sholinganallur',  adr: 6800,  revpar: 4830,  occ: 71.0, keys: 4280,  pipeline: 2160 },
    { id: 'che-cbd',    city: 'che', name: 'Nungambakkam / CBD',    adr: 8400,  revpar: 6130,  occ: 73.0, keys: 2640,  pipeline: 720  },
    { id: 'kol-cbd',    city: 'kol', name: 'Salt Lake / EM Bypass', adr: 6200,  revpar: 4280,  occ: 69.0, keys: 3140,  pipeline: 880  },
    { id: 'ahd-sg',     city: 'ahd', name: 'SG Highway / Bopal',    adr: 5400,  revpar: 3780,  occ: 70.0, keys: 2820,  pipeline: 1340 },
    { id: 'jai-mi',     city: 'jai', name: 'MI Road / Tonk Rd',     adr: 5800,  revpar: 4060,  occ: 70.0, keys: 2160,  pipeline: 1180 },
    { id: 'goa-nor',    city: 'goa', name: 'North Goa Coastal',     adr: 11200, revpar: 8400,  occ: 75.0, keys: 3860,  pipeline: 2240 },
    { id: 'goa-sou',    city: 'goa', name: 'South Goa Coastal',     adr: 14800, revpar: 9620,  occ: 65.0, keys: 1840,  pipeline: 920  },
    { id: 'koc-mar',    city: 'koc', name: 'Marine Drive / Kakkanad',adr: 6400, revpar: 4480,  occ: 70.0, keys: 2240,  pipeline: 980  },
  ],
  operators: [
    { name: 'IHCL (Taj/Vivanta/Ginger)',   keys: 24800, pipeline: 12200, signings_fy26: 38, segment: 'Luxury → Mid' },
    { name: 'Marriott International',      keys: 18400, pipeline: 9460,  signings_fy26: 31, segment: 'Luxury → Select' },
    { name: 'Accor (Novotel/Ibis/Pullman)',keys: 9800,  pipeline: 6240,  signings_fy26: 22, segment: 'Up → Mid' },
    { name: 'Radisson Hotel Group',        keys: 12600, pipeline: 7800,  signings_fy26: 26, segment: 'Up → Mid' },
    { name: 'Hyatt',                       keys: 5400,  pipeline: 3120,  signings_fy26: 12, segment: 'Luxury → Up' },
    { name: 'Hilton',                      keys: 4200,  pipeline: 4640,  signings_fy26: 18, segment: 'Up → Select' },
    { name: 'Lemon Tree Hotels',           keys: 9400,  pipeline: 4280,  signings_fy26: 24, segment: 'Mid → Economy' },
    { name: 'ITC Hotels',                  keys: 11200, pipeline: 3640,  signings_fy26: 8,  segment: 'Luxury' },
    { name: 'Oberoi Group',                keys: 3200,  pipeline: 1240,  signings_fy26: 4,  segment: 'Luxury' },
    { name: 'Independent / Unbranded',     keys: 79400, pipeline: 40160, signings_fy26: null, segment: 'All' },
  ],
  deals: [
    { date: '2026-03-12', city: 'mum', asset: 'BKC tower conversion',   keys: 240, operator: 'Marriott', segment: 'Upscale', dealType: 'Operator deal',    value_cr: null },
    { date: '2026-02-28', city: 'goa', asset: 'South Goa beachfront',   keys: 184, operator: 'IHCL',     segment: 'Luxury',  dealType: 'Asset acquisition',value_cr: 380 },
    { date: '2026-02-14', city: 'blr', asset: 'Whitefield mid-scale',   keys: 220, operator: 'Accor',    segment: 'Mid',     dealType: 'Operator deal',    value_cr: null },
    { date: '2026-01-22', city: 'del', asset: 'Aerocity infill plot',   keys: 320, operator: 'Hilton',   segment: 'Upscale', dealType: 'Land acquisition', value_cr: 540 },
    { date: '2025-12-08', city: 'hyd', asset: 'Gachibowli select-service',keys: 168,operator: 'Lemon Tree',segment: 'Mid',  dealType: 'Operator deal',    value_cr: null },
    { date: '2025-11-20', city: 'pun', asset: 'Hinjewadi extended-stay', keys: 142, operator: 'Radisson', segment: 'Mid',   dealType: 'Operator deal',    value_cr: null },
    { date: '2025-10-30', city: 'jai', asset: 'Heritage palace conv.',   keys:  68, operator: 'Oberoi',   segment: 'Luxury',dealType: 'Asset acquisition',value_cr: 220 },
  ],
  insights: [
    'Q3 FY26 RevPAR jumped +18.5% YoY on wedding-season tailwind; the +14.2% full-year number hides Q3-loaded growth.',
    'Branded share of keys is climbing ~1.4 pts per year — reaching 38% in FY26 from 32% three years ago.',
    'Mid-scale + select-service signings now outpace upscale 2.4× on a key-count basis.',
    'Goa, Jaipur and Kochi outpaced metros on RevPAR growth — leisure demand is structurally higher post-2024.',
  ],
};

export const HEALTHCARE = {
  summary: {
    bedsFY26: 218400,
    pipelineBeds: 84600,
    utilisationFY26: 68.4,
    arpobFY26: 56400,
    yoyBedsPct: 9.4,
    yoyARPOBPct: 8.1,
    yoyUtilPct: 1.6,
  },
  chains: [
    { name: 'Apollo Hospitals',       beds: 12400, pipeline: 4200, hospitals: 73, segment: 'Multi-spec' },
    { name: 'Manipal Health',         beds: 9600,  pipeline: 3800, hospitals: 33, segment: 'Multi-spec' },
    { name: 'Max Healthcare',         beds: 5400,  pipeline: 3200, hospitals: 22, segment: 'Tertiary' },
    { name: 'Fortis Healthcare',      beds: 4900,  pipeline: 2200, hospitals: 28, segment: 'Tertiary' },
    { name: 'Narayana Health',        beds: 6200,  pipeline: 1800, hospitals: 21, segment: 'Multi-spec' },
    { name: 'Aster DM',               beds: 3800,  pipeline: 1400, hospitals: 14, segment: 'Multi-spec' },
    { name: 'Medanta',                beds: 2400,  pipeline: 1600, hospitals: 7,  segment: 'Tertiary' },
    { name: 'KIMS Hospitals',         beds: 4100,  pipeline: 1200, hospitals: 12, segment: 'Multi-spec' },
    { name: "Rainbow Children's",     beds: 1800,  pipeline: 800,  hospitals: 19, segment: 'Pediatric' },
    { name: 'Independent / Single',   beds: 167800,pipeline: 64400,hospitals: null, segment: 'All' },
  ],
  submarkets: [
    { id: 'mum-and',  city: 'mum', name: 'Andheri / Powai corridor',  beds: 4200, pipeline: 1800, util: 72, arpob: 78400, capex_cr_per_bed: 1.1 },
    { id: 'mum-thn',  city: 'mum', name: 'Thane / Navi Mumbai',       beds: 3800, pipeline: 2400, util: 68, arpob: 56000, capex_cr_per_bed: 0.9 },
    { id: 'blr-out',  city: 'blr', name: 'Outer Ring Road',           beds: 5200, pipeline: 2200, util: 71, arpob: 62000, capex_cr_per_bed: 0.85 },
    { id: 'blr-jaya', city: 'blr', name: 'Jayanagar / South',         beds: 3400, pipeline: 1100, util: 66, arpob: 48000, capex_cr_per_bed: 0.75 },
    { id: 'del-gur',  city: 'del', name: 'Gurugram',                  beds: 4400, pipeline: 1900, util: 70, arpob: 72000, capex_cr_per_bed: 1.05 },
    { id: 'del-noi',  city: 'del', name: 'Noida',                     beds: 3200, pipeline: 2000, util: 68, arpob: 54000, capex_cr_per_bed: 0.85 },
    { id: 'hyd-jub',  city: 'hyd', name: 'Jubilee / Banjara',         beds: 2800, pipeline: 1300, util: 68, arpob: 58000, capex_cr_per_bed: 0.9 },
    { id: 'hyd-hit',  city: 'hyd', name: 'Hitec / Gachibowli',        beds: 2200, pipeline: 1700, util: 66, arpob: 52000, capex_cr_per_bed: 0.85 },
    { id: 'pun-bal',  city: 'pun', name: 'Baner / Aundh',             beds: 2400, pipeline: 1100, util: 67, arpob: 50000, capex_cr_per_bed: 0.8 },
    { id: 'che-omr',  city: 'che', name: 'OMR corridor',              beds: 2600, pipeline: 1300, util: 65, arpob: 46000, capex_cr_per_bed: 0.78 },
    { id: 'kol-bypass',city:'kol', name: 'EM Bypass',                 beds: 2200, pipeline: 800,  util: 66, arpob: 40000, capex_cr_per_bed: 0.7 },
    { id: 'ahd-sg',   city: 'ahd', name: 'SG Highway',                beds: 1800, pipeline: 900,  util: 64, arpob: 42000, capex_cr_per_bed: 0.7 },
  ],
  requirements: [
    { chain: 'Apollo Hospitals',  city: 'pun', size_beds: 250, plot_acres_min: 3.5, fsi_min: 2.5, status: 'Active' },
    { chain: 'Manipal Health',    city: 'hyd', size_beds: 300, plot_acres_min: 4.0, fsi_min: 3.0, status: 'Active' },
    { chain: 'Max Healthcare',    city: 'blr', size_beds: 400, plot_acres_min: 5.0, fsi_min: 3.0, status: 'Active' },
    { chain: 'Narayana Health',   city: 'che', size_beds: 200, plot_acres_min: 3.0, fsi_min: 2.5, status: 'Scoping' },
    { chain: 'Aster DM',          city: 'koc', size_beds: 180, plot_acres_min: 2.5, fsi_min: 2.0, status: 'Active' },
    { chain: 'Medanta',           city: 'del', size_beds: 350, plot_acres_min: 4.5, fsi_min: 3.0, status: 'Active' },
    { chain: "Rainbow Children's",city: 'mum', size_beds: 120, plot_acres_min: 1.8, fsi_min: 2.5, status: 'Scoping' },
  ],
  insights: [
    'Tertiary chains are concentrating in three cities: Delhi-NCR, Mumbai and Bengaluru drove 64% of FY26 capex.',
    'ARPOB rose 8.1% YoY — pricing power is strongest in Mumbai and Delhi (>₹70k) and weakest in Tier-2 metros (~₹40k).',
    'Pipeline-to-existing-bed ratio is 38.7% — above hospitality (52%) but utilisation lags at 68%.',
    'Medical-college-attached models (Manipal, Apollo) are the most aggressive on land asks — 4–5 acre plots dominate FY26 RFPs.',
  ],
};

export const INDUSTRIAL = {
  summary: {
    stockMSF: 412,
    absorptionMSF_FY26: 58.4,
    vacancyFY26: 8.6,
    avgRentSqftMonth: 24.2,
    yoyAbsorptionPct: 14.4,
    yoyRentPct: 6.8,
  },
  submarkets: [
    { id:'mum-bhi', city:'mum', name:'Bhiwandi',           rent: 26.5, vac: 5.2, stockMSF: 38.0, absMSF: 6.8 },
    { id:'mum-pan', city:'mum', name:'Panvel / JNPT',      rent: 32.0, vac: 7.8, stockMSF: 18.0, absMSF: 3.4 },
    { id:'del-bha', city:'del', name:'Bhiwadi / Tauru',    rent: 22.0, vac: 6.4, stockMSF: 28.0, absMSF: 5.1 },
    { id:'del-fbd', city:'del', name:'Faridabad / Ballabh',rent: 21.5, vac: 9.0, stockMSF: 14.0, absMSF: 1.9 },
    { id:'blr-hos', city:'blr', name:'Hoskote / Soukya',   rent: 25.0, vac: 7.5, stockMSF: 22.0, absMSF: 3.9 },
    { id:'blr-nel', city:'blr', name:'Nelamangala',        rent: 23.0, vac: 8.6, stockMSF: 16.0, absMSF: 2.6 },
    { id:'hyd-med', city:'hyd', name:'Medchal',            rent: 21.0, vac: 9.4, stockMSF: 14.0, absMSF: 2.4 },
    { id:'hyd-shm', city:'hyd', name:'Shamshabad',         rent: 22.5, vac: 8.0, stockMSF: 11.0, absMSF: 2.1 },
    { id:'pun-chk', city:'pun', name:'Chakan',             rent: 24.5, vac: 6.8, stockMSF: 24.0, absMSF: 4.2 },
    { id:'pun-tlg', city:'pun', name:'Talegaon',           rent: 22.0, vac: 8.8, stockMSF: 18.0, absMSF: 2.8 },
    { id:'che-ora', city:'che', name:'Oragadam',           rent: 21.5, vac: 9.5, stockMSF: 16.0, absMSF: 2.4 },
    { id:'che-spd', city:'che', name:'Sriperumbudur',      rent: 22.5, vac: 7.9, stockMSF: 14.0, absMSF: 2.3 },
    { id:'kol-dhk', city:'kol', name:'Dhulagarh',          rent: 18.0, vac:11.0, stockMSF: 8.0,  absMSF: 1.0 },
    { id:'ahd-bch', city:'ahd', name:'Becharaji / Sanand', rent: 19.5, vac: 9.4, stockMSF: 10.0, absMSF: 1.4 },
  ],
  quarterlyAbs: [
    { q: 'Q1 FY26', abs: 12.4, vac: 9.2 },
    { q: 'Q2 FY26', abs: 13.8, vac: 8.8 },
    { q: 'Q3 FY26', abs: 16.6, vac: 8.4 },
    { q: 'Q4 FY26', abs: 15.6, vac: 8.6 },
  ],
  operators: [
    { name: 'Welspun One Logistics Parks', stockMSF: 24.0, pipelineMSF: 14.0 },
    { name: 'IndoSpace',                    stockMSF: 38.0, pipelineMSF: 16.0 },
    { name: 'ESR India',                    stockMSF: 28.0, pipelineMSF: 18.0 },
    { name: 'LOGOS India',                  stockMSF: 14.0, pipelineMSF: 9.0 },
    { name: 'Embassy Industrial Parks',     stockMSF: 12.0, pipelineMSF: 6.0 },
    { name: 'Mahindra Logistics',           stockMSF: 9.0,  pipelineMSF: 4.0 },
    { name: 'NDR Group',                    stockMSF: 7.0,  pipelineMSF: 3.0 },
    { name: 'Independent / Owner-built',    stockMSF: 280.0,pipelineMSF: null },
  ],
  requirements: [
    { occupier: 'Flipkart',          city:'blr', size_sqft: 800000, lease_yrs: 9, status: 'Active'   },
    { occupier: 'Amazon India',      city:'del', size_sqft: 600000, lease_yrs: 9, status: 'Active'   },
    { occupier: 'Reliance Retail',   city:'mum', size_sqft: 1100000,lease_yrs: 12,status: 'Active'   },
    { occupier: 'DHL Supply Chain',  city:'pun', size_sqft: 450000, lease_yrs: 9, status: 'Negotiating' },
    { occupier: 'Maruti Suzuki',     city:'ahd', size_sqft: 1400000,lease_yrs: 15,status: 'Scoping'  },
    { occupier: 'Tata 1mg',          city:'hyd', size_sqft: 280000, lease_yrs: 7, status: 'Active'   },
    { occupier: 'Zepto',             city:'che', size_sqft: 220000, lease_yrs: 6, status: 'Active'   },
    { occupier: 'Foxconn (EMS)',     city:'che', size_sqft: 2200000,lease_yrs: 20,status: 'BTS RFP'  },
  ],
  insights: [
    'Bhiwandi remains the deepest market — 38 MSF stock, sub-6% vacancy, ₹26.5/sqft rent.',
    'Q3 saw the FY peak for absorption at 16.6 MSF on festive-season e-commerce demand.',
    'BTS deals for EMS (Foxconn, Pegatron) are the new shape of ≥1 MSF requirements — 3 in pipeline for FY27.',
    'Tier-2 logistics hubs (Sanand, Dhulagarh) lag on rent but offer 100+ acre contiguous plots — Reliant asset advantage.',
  ],
};

export const COMMERCIAL = {
  summary: {
    stockMSF: 832,
    absorptionMSF_FY26: 76.4,
    vacancyFY26: 14.8,
    avgRentSqftMonth: 96.0,
    yoyAbsorptionPct: 9.6,
    yoyRentPct: 4.4,
  },
  submarkets: [
    { id:'blr-orr',  city:'blr', name:'Outer Ring Road',     rent: 112, vac: 9.4,  stockMSF: 78.0, absMSF: 8.4 },
    { id:'blr-wht',  city:'blr', name:'Whitefield',          rent:  92, vac: 14.8, stockMSF: 52.0, absMSF: 5.2 },
    { id:'blr-cbd',  city:'blr', name:'CBD / MG-Indiranagar',rent: 168, vac: 6.8,  stockMSF: 22.0, absMSF: 1.8 },
    { id:'mum-bkc',  city:'mum', name:'BKC',                 rent: 320, vac: 8.4,  stockMSF: 18.0, absMSF: 1.6 },
    { id:'mum-and',  city:'mum', name:'Andheri / SEEPZ',     rent: 168, vac: 12.0, stockMSF: 28.0, absMSF: 2.8 },
    { id:'mum-tha',  city:'mum', name:'Thane / Navi Mumbai', rent: 102, vac: 18.6, stockMSF: 38.0, absMSF: 3.4 },
    { id:'del-cyb',  city:'del', name:'Cyber City Gurgaon',  rent: 158, vac: 11.0, stockMSF: 42.0, absMSF: 4.6 },
    { id:'del-noi',  city:'del', name:'Noida Expressway',    rent:  92, vac: 18.4, stockMSF: 48.0, absMSF: 4.2 },
    { id:'del-cbd',  city:'del', name:'Connaught Place',     rent: 410, vac: 5.2,  stockMSF:  6.0, absMSF: 0.4 },
    { id:'hyd-hit',  city:'hyd', name:'Hitec City',          rent: 102, vac: 11.6, stockMSF: 56.0, absMSF: 6.4 },
    { id:'hyd-gac',  city:'hyd', name:'Gachibowli',          rent:  88, vac: 13.0, stockMSF: 32.0, absMSF: 3.8 },
    { id:'pun-hin',  city:'pun', name:'Hinjewadi',           rent:  82, vac: 16.4, stockMSF: 38.0, absMSF: 3.2 },
    { id:'pun-yer',  city:'pun', name:'Yerwada',             rent: 124, vac: 9.8,  stockMSF: 12.0, absMSF: 1.0 },
    { id:'che-omr',  city:'che', name:'OMR / Sholinganallur',rent:  78, vac: 17.4, stockMSF: 42.0, absMSF: 3.6 },
    { id:'che-cbd',  city:'che', name:'Anna Salai / CBD',    rent: 132, vac: 8.4,  stockMSF: 12.0, absMSF: 0.9 },
    { id:'kol-cbd',  city:'kol', name:'Salt Lake / Sector V',rent:  68, vac: 15.0, stockMSF: 18.0, absMSF: 1.4 },
  ],
  occupiers: [
    { name: 'Microsoft India',       footprint_msf: 4.2, fy26_take_msf: 0.84, sectors: 'IT/SaaS' },
    { name: 'Google India',          footprint_msf: 3.6, fy26_take_msf: 0.60, sectors: 'IT/SaaS' },
    { name: 'JP Morgan Chase',       footprint_msf: 3.2, fy26_take_msf: 1.20, sectors: 'BFSI / GCC' },
    { name: 'Goldman Sachs',         footprint_msf: 2.4, fy26_take_msf: 0.40, sectors: 'BFSI / GCC' },
    { name: 'Amazon India',          footprint_msf: 5.1, fy26_take_msf: 0.96, sectors: 'IT/SaaS' },
    { name: 'Walmart Global Tech',   footprint_msf: 1.8, fy26_take_msf: 0.32, sectors: 'GCC' },
    { name: 'Wells Fargo',           footprint_msf: 2.0, fy26_take_msf: 0.42, sectors: 'BFSI / GCC' },
    { name: 'Cognizant',             footprint_msf: 8.4, fy26_take_msf: 0.62, sectors: 'IT services' },
    { name: 'TCS',                   footprint_msf:14.2, fy26_take_msf: 1.40, sectors: 'IT services' },
    { name: 'Infosys',               footprint_msf:11.6, fy26_take_msf: 0.92, sectors: 'IT services' },
  ],
  quarterlyAbs: [
    { q: 'Q1 FY26', abs: 17.2, vac: 15.8 },
    { q: 'Q2 FY26', abs: 18.8, vac: 15.2 },
    { q: 'Q3 FY26', abs: 21.4, vac: 14.6 },
    { q: 'Q4 FY26', abs: 19.0, vac: 14.8 },
  ],
  insights: [
    'GCC demand led FY26 absorption: 38% of Grade-A take-up was BFSI / capability centres.',
    'Bengaluru ORR is the deepest single submarket — 78 MSF, sub-10% vacancy, ₹112 weighted rent.',
    'Rent growth concentrated in CBD/island markets (BKC, CP, MG Rd) — 8–11% YoY vs ~3% on suburban supply-heavy nodes.',
    'Net new supply outpaced absorption in Noida-Expressway and Thane — vacancy is structurally higher than the metro average.',
  ],
};

export const RESIDENTIAL = {
  summary: {
    launchesFY26: 528000,
    salesFY26: 502000,
    unsoldStock: 938000,
    psfFY26: 9840,
    yoyLaunchesPct: 6.4,
    yoySalesPct: 8.2,
    yoyPSFPct: 9.6,
    monthsInventory: 22.4,
  },
  submarkets: [
    { id:'mum-thn', city:'mum', name:'Thane',         psf: 14800, launches: 18400, sales: 17200, unsold: 30200, msi: 21.0 },
    { id:'mum-mlc', city:'mum', name:'Mulund / LBS',  psf: 22400, launches:  6800, sales:  6600, unsold: 12400, msi: 22.5 },
    { id:'mum-pnv', city:'mum', name:'Panvel',        psf:  9200, launches: 14200, sales: 13400, unsold: 24600, msi: 22.0 },
    { id:'blr-eor', city:'blr', name:'East Bengaluru',psf:  8400, launches: 22400, sales: 21800, unsold: 32400, msi: 17.8 },
    { id:'blr-nor', city:'blr', name:'North Bengaluru',psf: 9200, launches: 18800, sales: 17900, unsold: 27800, msi: 18.6 },
    { id:'blr-sth', city:'blr', name:'South Bengaluru',psf: 8800, launches: 19400, sales: 19000, unsold: 28400, msi: 17.9 },
    { id:'del-gur', city:'del', name:'Gurugram',      psf: 18400, launches: 24800, sales: 23200, unsold: 38800, msi: 20.0 },
    { id:'del-noi', city:'del', name:'Noida / Greater Noida', psf: 11200, launches: 22000, sales: 20800, unsold: 36400, msi: 21.0 },
    { id:'hyd-out', city:'hyd', name:'West Hyderabad',psf:  8800, launches: 24400, sales: 22600, unsold: 39200, msi: 20.8 },
    { id:'hyd-east',city:'hyd', name:'East Hyderabad',psf:  6800, launches: 12400, sales: 11000, unsold: 22400, msi: 24.4 },
    { id:'pun-hin', city:'pun', name:'West Pune',     psf:  9400, launches: 18400, sales: 17400, unsold: 28200, msi: 19.4 },
    { id:'che-omr', city:'che', name:'OMR/IT Corridor',psf: 8200, launches: 11800, sales: 11400, unsold: 18200, msi: 19.2 },
    { id:'kol-cbd', city:'kol', name:'New Town / Rajarhat',psf:6800, launches:8400, sales: 7800, unsold: 16800, msi: 25.8 },
    { id:'ahd-sg',  city:'ahd', name:'SG Highway',    psf:  6400, launches: 10800, sales: 10200, unsold: 17200, msi: 20.2 },
    { id:'jai-jln', city:'jai', name:'JLN / Mansarovar',psf:5400, launches:  7400, sales:  6800, unsold: 11800, msi: 20.8 },
    { id:'koc-mar', city:'koc', name:'Marine Drive / Kakkanad', psf:7200, launches:5400, sales: 5000, unsold: 8800, msi: 21.1 },
  ],
  developers: [
    { name: 'DLF',                fy26_launches: 12400, fy26_sales: 11800, top_market: 'Gurugram',   segment: 'Premium' },
    { name: 'Lodha',              fy26_launches: 18800, fy26_sales: 17600, top_market: 'Thane',      segment: 'Mid-Premium' },
    { name: 'Godrej Properties',  fy26_launches: 22600, fy26_sales: 21000, top_market: 'Multi-city', segment: 'Premium' },
    { name: 'Prestige Group',     fy26_launches: 19400, fy26_sales: 18200, top_market: 'Bengaluru',  segment: 'Premium' },
    { name: 'Brigade Group',      fy26_launches: 14600, fy26_sales: 13800, top_market: 'Bengaluru',  segment: 'Mid-Premium' },
    { name: 'Sobha',              fy26_launches: 11200, fy26_sales: 10400, top_market: 'Bengaluru',  segment: 'Premium' },
    { name: 'Oberoi Realty',      fy26_launches:  4800, fy26_sales:  4400, top_market: 'Mumbai',     segment: 'Luxury' },
    { name: 'Macrotech (Lodha)',  fy26_launches: 16400, fy26_sales: 15600, top_market: 'MMR',        segment: 'Mid-Premium' },
    { name: 'M3M / Signature',    fy26_launches:  9400, fy26_sales:  8800, top_market: 'Gurugram',   segment: 'Premium' },
    { name: 'Phoenix Mills (res)',fy26_launches:  3200, fy26_sales:  3000, top_market: 'Bengaluru',  segment: 'Luxury' },
  ],
  insights: [
    'Months-of-inventory is at 22.4 — below the 24-month "healthy" line for the first time since 2019.',
    'Premium (₹1.5–4 Cr ticket) segments outsold mid (8.4% vs 2.1%) in FY26 — buyer mix continues to skew up.',
    'Hyderabad West has the most aggressive launch pipeline but absorption is 7% behind launches — early signs of supply overhang.',
    "Land-aggregator JV models (Reliant's sweet spot) account for 17% of FY26 launches and are the fastest-growing structure.",
  ],
};

export const ISSUES = [
  { id:'RIP-2841', title:'Hospitality Q3 RevPAR formula uses calendar Q not fiscal Q', severity:'High', status:'In review', owner:'A. Khanna', area:'Hospitality / Calc', opened:'2026-04-22' },
  { id:'RIP-2840', title:'Industrial submarket "Sanand" rolls up to Pan-IN twice',     severity:'High', status:'Open',      owner:'R. Iyer',   area:'Industrial / Data', opened:'2026-04-21' },
  { id:'RIP-2837', title:"Pan-India market filter doesn't reset chart legends",         severity:'Med',  status:'Open',      owner:'V. Rao',    area:'UX / Charts',       opened:'2026-04-19' },
  { id:'RIP-2829', title:'Healthcare ARPOB tooltip shows monthly when source is daily', severity:'Med',  status:'Open',      owner:'A. Khanna', area:'Healthcare / Calc', opened:'2026-04-15' },
  { id:'RIP-2811', title:'Land Pitch deck print scales to 80% on Chrome/Mac',          severity:'Low',  status:'In review', owner:'P. Banerjee',area:'Pitch Builder',    opened:'2026-04-09' },
  { id:'RIP-2795', title:"Drawer doesn't close on Esc when search is focused",         severity:'Low',  status:'Open',      owner:'V. Rao',    area:'UX / Shell',        opened:'2026-04-02' },
  { id:'RIP-2790', title:'CRM live toggle shows stale opportunity count',              severity:'Med',  status:'Blocked',   owner:'D. Mehta',  area:'Integrations',     opened:'2026-03-29' },
  { id:'RIP-2782', title:'Residential PSF for Goa not weighted by inventory',          severity:'Med',  status:'Open',      owner:'A. Khanna', area:'Residential / Calc',opened:'2026-03-25' },
  { id:'RIP-2774', title:"Sidebar nav order doesn't match v2 IA",                      severity:'Low',  status:"Won't fix", owner:'V. Rao',    area:'UX',                opened:'2026-03-20' },
  { id:'RIP-2768', title:'Commercial chart: Q4 vs Q3 yoy color reversed',              severity:'Low',  status:'Resolved',  owner:'V. Rao',    area:'UX / Charts',       opened:'2026-03-14' },
];

export const TEAM = [
  { id:'rk', name:'Rajiv Kapur',     role:'Managing Director',    sector:'All',         city:'mum', util: 76, deals_active: 4, gci_ytd_cr: 18.4 },
  { id:'ak', name:'Aanya Khanna',    role:'Director — Capital Mkts',sector:'Hospitality',city:'mum', util: 84, deals_active: 6, gci_ytd_cr: 12.6 },
  { id:'ri', name:'Rohan Iyer',      role:'Principal — Industrial', sector:'Industrial', city:'pun', util: 82, deals_active: 8, gci_ytd_cr: 9.4 },
  { id:'pb', name:'Priya Banerjee',  role:'Principal — Healthcare', sector:'Healthcare', city:'blr', util: 78, deals_active: 5, gci_ytd_cr: 7.8 },
  { id:'sm', name:'Siddharth Menon', role:'Director — Commercial',  sector:'Commercial', city:'blr', util: 80, deals_active: 7, gci_ytd_cr: 11.2 },
  { id:'vr', name:'Vikram Rao',      role:'VP — Residential',       sector:'Residential',city:'del', util: 74, deals_active: 6, gci_ytd_cr: 8.6 },
  { id:'dm', name:'Diya Mehta',      role:'VP — Land Advisory',     sector:'Land',       city:'hyd', util: 70, deals_active: 4, gci_ytd_cr: 6.4 },
  { id:'nk', name:'Neha Kapoor',     role:'Senior Associate',       sector:'Hospitality',city:'del', util: 88, deals_active: 5, gci_ytd_cr: 4.2 },
  { id:'as', name:'Arjun Saxena',    role:'Senior Associate',       sector:'Industrial', city:'che', util: 86, deals_active: 6, gci_ytd_cr: 3.8 },
  { id:'mp', name:'Meera Pillai',    role:'Senior Associate',       sector:'Commercial', city:'mum', util: 72, deals_active: 4, gci_ytd_cr: 3.4 },
  { id:'rj', name:'Rahul Jain',      role:'Associate',              sector:'Residential',city:'pun', util: 68, deals_active: 3, gci_ytd_cr: 2.1 },
  { id:'ts', name:'Tara Shetty',     role:'Associate',              sector:'Healthcare', city:'blr', util: 64, deals_active: 3, gci_ytd_cr: 1.9 },
  { id:'kn', name:'Kabir Narang',    role:'Analyst',                sector:'Land',       city:'mum', util: 92, deals_active: 0, gci_ytd_cr: 0 },
  { id:'in', name:'Ishita Nair',     role:'Analyst',                sector:'Hospitality',city:'mum', util: 88, deals_active: 0, gci_ytd_cr: 0 },
  { id:'sp', name:'Suhas Pai',       role:'Analyst',                sector:'Industrial', city:'pun', util: 90, deals_active: 0, gci_ytd_cr: 0 },
];

export const LAND_PARCELS = [
  { id:'L-2401', city:'pun', area:'Hinjewadi Phase 4',      acres: 8.2,  fsi: 2.5, zoning:'Mixed-Use',   ask_cr_per_acre: 14.0, road_ft: 80,  airport_km: 28, rail_km: 6 },
  { id:'L-2402', city:'blr', area:'Devanahalli Airport Belt',acres: 22.0,fsi: 1.5, zoning:'Industrial',  ask_cr_per_acre: 6.4,  road_ft: 100, airport_km: 4,  rail_km: 22 },
  { id:'L-2403', city:'hyd', area:'Patancheru',              acres: 14.4,fsi: 1.5, zoning:'Industrial',  ask_cr_per_acre: 4.8,  road_ft: 100, airport_km: 28, rail_km: 4 },
  { id:'L-2404', city:'mum', area:'Bhiwandi (Kalyan-Murbad)',acres: 18.0,fsi: 1.5, zoning:'Industrial',  ask_cr_per_acre: 9.4,  road_ft: 80,  airport_km: 38, rail_km: 5 },
  { id:'L-2405', city:'del', area:'Sohna Master Plan',       acres: 24.0,fsi: 1.75,zoning:'Mixed-Use',   ask_cr_per_acre: 12.8, road_ft: 90,  airport_km: 32, rail_km: 8 },
  { id:'L-2406', city:'goa', area:'North Goa — Morjim',      acres: 4.4, fsi: 1.0, zoning:'Hospitality', ask_cr_per_acre: 28.0, road_ft: 40,  airport_km: 38, rail_km: 14 },
  { id:'L-2407', city:'che', area:'Sriperumbudur',           acres: 32.0,fsi: 1.5, zoning:'Industrial',  ask_cr_per_acre: 5.6,  road_ft: 100, airport_km: 24, rail_km: 6 },
  { id:'L-2408', city:'jai', area:'Mahindra SEZ Ring',       acres: 12.0,fsi: 1.5, zoning:'Industrial',  ask_cr_per_acre: 3.8,  road_ft: 80,  airport_km: 18, rail_km: 9 },
];

export const MASTER = {
  sectors: [
    { id:'hospitality', name:'Hospitality', kpi_label:'RevPAR FY26', kpi_value:'₹6,470', kpi_yoy:14.2, second_label:'Branded keys', second_value:'178k', tone:'up' },
    { id:'healthcare',  name:'Healthcare',  kpi_label:'ARPOB FY26',  kpi_value:'₹56,400',kpi_yoy: 8.1, second_label:'Branded beds', second_value:'218k', tone:'up' },
    { id:'industrial',  name:'Industrial',  kpi_label:'Absorption',  kpi_value:'58.4 MSF',kpi_yoy:14.4, second_label:'Avg rent',    second_value:'₹24.2/sqft', tone:'up' },
    { id:'commercial',  name:'Commercial',  kpi_label:'Absorption',  kpi_value:'76.4 MSF',kpi_yoy: 9.6, second_label:'Vacancy',     second_value:'14.8%', tone:'flat' },
    { id:'residential', name:'Residential', kpi_label:'Sales (units)',kpi_value:'502k',   kpi_yoy: 8.2, second_label:'Months stock',second_value:'22.4',  tone:'up' },
    { id:'land',        name:'Land',        kpi_label:'Active reqs', kpi_value:'42',      kpi_yoy:21.4, second_label:'Avg ticket',  second_value:'₹140 Cr', tone:'up' },
  ],
  pipeline_stages: [
    { stage: 'Identified',   count: 184, value_cr: 14200 },
    { stage: 'Qualified',    count: 112, value_cr:  9840 },
    { stage: 'Pitched',      count:  68, value_cr:  6420 },
    { stage: 'Term sheet',   count:  34, value_cr:  3640 },
    { stage: 'In execution', count:  18, value_cr:  2210 },
    { stage: 'Closed FY26',  count:  42, value_cr:  4640 },
  ],
  hot_deals: [
    { name:'BKC tower → Marriott conversion',  sector:'hospitality', stage:'Term sheet',   city:'mum', value_cr: 480,  owner:'A. Khanna' },
    { name:'Manipal Hyd 300-bed plot',         sector:'healthcare',  stage:'Pitched',      city:'hyd', value_cr: 220,  owner:'P. Banerjee' },
    { name:'Foxconn Sriperumbudur BTS',        sector:'industrial',  stage:'Qualified',    city:'che', value_cr: 1240, owner:'R. Iyer' },
    { name:'JP Morgan Bengaluru ORR campus',   sector:'commercial',  stage:'Pitched',      city:'blr', value_cr: 940,  owner:'S. Menon' },
    { name:'Lodha Thane mid-rise tranche',     sector:'residential', stage:'In execution', city:'mum', value_cr: 320,  owner:'V. Rao' },
    { name:'Sohna 24-acre mixed-use',          sector:'land',        stage:'Term sheet',   city:'del', value_cr: 308,  owner:'D. Mehta' },
  ],
  notifications: [
    { time:'2h',  title:'New healthcare RFP — Apollo Pune 250-bed',          cat:'requirement' },
    { time:'5h',  title:'Goa hospitality deal closed — South Goa, 184 keys', cat:'deal' },
    { time:'1d',  title:'Q4 FY26 hospitality data refreshed',                cat:'data' },
    { time:'1d',  title:'Vikram Rao opened pitch for Sohna 24-acre',         cat:'team' },
    { time:'2d',  title:'CRM sync warning — 3 stale opportunities',          cat:'system' },
  ],
};

export const SOURCES = {
  hospitality: 'Mock-but-plausible · Branded keys, ADR, RevPAR — illustrative FY26 (Apr-25 → Mar-26)',
  healthcare:  'Mock-but-plausible · Bedded capacity, ARPOB — illustrative FY26',
  industrial:  'Mock-but-plausible · Grade-A logistics + IP — illustrative FY26',
  commercial:  'Mock-but-plausible · Grade-A office — illustrative FY26',
  residential: 'Mock-but-plausible · Launches, sales, weighted PSF — illustrative FY26',
  land:        'Mock-but-plausible · Internal Reliant land book — illustrative',
  crm:         'Pipeline data: simulated CRM sync · last refresh: 04 May 2026, 09:14 IST',
};

export const OPEN_QUESTIONS = [
  "What's the canonical fiscal calendar — strict Apr-Mar, or do hospitality / hotels report on a calendar year? The dashboard currently assumes fiscal everywhere.",
  "Which CRM is the source of record (Salesforce, HubSpot, in-house)? The Pipeline tab is built against a generic schema; we'll need a real adapter.",
  'For the Land Pitch Builder — should generated decks be saved/versioned in the platform, or treated as one-shot exports? Versioning changes the data model.',
  "Should we separate \"Reliant-managed\" vs \"market-wide\" dataviews on each sector tab? Right now they're merged; some users may want only what we own.",
  'Healthcare ARPOB and hospitality RevPAR — confirm definitions and exclusions (e.g., does ARPOB include pharmacy or just IP/OP)?',
  'Industrial: do we treat warehousing and industrial parks as one sector or split (US/UK markets typically split)? Affects benchmarking.',
  'Residential: is the team interested in primary-only data, or do we need resale data too? Resale is harder to source but materially changes "true" inventory.',
  'Pan-India weighted averages — what weighting do partners want? Inventory-weighted, transaction-weighted, equal-weighted? Currently inventory-weighted.',
  'Tier-2 cities beyond the 11 covered (Lucknow, Coimbatore, Indore, Vizag) — are these on the roadmap, or out of scope?',
  'Permissions / RBAC — who can see all sectors vs only their sector\'s book? The current build assumes all roles see all data.',
];
