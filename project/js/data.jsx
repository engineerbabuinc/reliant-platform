// ============================================================
// RELIANT INTELLIGENCE PLATFORM — DATA LAYER
// All mock data lives here. getSource() is the integration seam.
// ============================================================

const CITIES = [
  { id: 'panIndia', name: 'Pan India', state: '' },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
  { id: 'delhi', name: 'Delhi NCR', state: 'Delhi/UP/HR' },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka' },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana' },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra' },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat' },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal' },
  { id: 'indore', name: 'Indore', state: 'Madhya Pradesh' },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan' },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh' },
  { id: 'kochi', name: 'Kochi', state: 'Kerala' },
];

// Per-city scaling factors so changing market visibly changes numbers
const CITY_FACTOR = {
  panIndia: 1.0, mumbai: 0.22, delhi: 0.20, bengaluru: 0.18, hyderabad: 0.13,
  chennai: 0.09, pune: 0.10, ahmedabad: 0.05, kolkata: 0.04, indore: 0.025,
  jaipur: 0.02, lucknow: 0.018, kochi: 0.022,
};

// ---- Master KPIs (Pan India base; cities scaled) ----
const PAN_KPIS = {
  dealsClosedYTD: 34,
  gmvCloseCr: 847,
  activeMandates: 61,
  winRate: 67,
  dealsDelta: 12,
  gmvDelta: 18,
  winRateDelta: 4,
};

const RE_PRIORITY = [
  { type: 'Hospitality', score: 82 },
  { type: 'Industrial', score: 78 },
  { type: 'Commercial', score: 71 },
  { type: 'Healthcare', score: 68 },
  { type: 'Residential', score: 54 },
];

const SENTIMENT = [
  { label: 'Bullish', value: 44 },
  { label: 'Cautiously Optimistic', value: 31 },
  { label: 'Neutral', value: 18 },
  { label: 'Bearish', value: 7 },
];

const TOP_BRANDS_QUARTER = [
  { rank: 1, brand: 'Marriott International', sector: 'Hospitality', intent: 91, cities: 'Bengaluru, Hyderabad, Goa, Indore', dm: 'Ranju Alex', dmTitle: 'MD South Asia', lastTouch: '4 days ago', rm: 'Rohan Mehta' },
  { rank: 2, brand: 'Apollo Hospitals', sector: 'Healthcare', intent: 88, cities: 'Pune, Lucknow, Indore, Jaipur', dm: 'Suneeta Reddy', dmTitle: 'Joint MD', lastTouch: '2 days ago', rm: 'Priya Iyer' },
  { rank: 3, brand: 'Delhivery', sector: 'Industrial', intent: 85, cities: 'Hyderabad, Bhiwandi, Farukhnagar', dm: 'Sahil Barua', dmTitle: 'CEO', lastTouch: 'Today', rm: 'Karthik Nair' },
  { rank: 4, brand: 'Smartworks', sector: 'Commercial', intent: 83, cities: 'Bengaluru, Mumbai, Pune, Chennai', dm: 'Neetish Sarda', dmTitle: 'Founder', lastTouch: '6 days ago', rm: 'Aanya Kapoor' },
  { rank: 5, brand: 'Godrej Properties', sector: 'Residential', intent: 79, cities: 'Mumbai, Bengaluru, NCR', dm: 'Gaurav Pandey', dmTitle: 'CEO', lastTouch: '1 day ago', rm: 'Vivek Saxena' },
];

const FOCUS_CITIES = ['Bengaluru', 'Hyderabad', 'Pune', 'Indore', 'Chennai'];
const RE_TYPES = ['Hosp', 'Health', 'Indust', 'Comm', 'Resi'];
const HEATMAP_SCORES = [
  [78, 72, 84, 91, 68],   // Bengaluru
  [82, 81, 88, 85, 71],   // Hyderabad
  [76, 74, 89, 79, 73],   // Pune
  [88, 65, 82, 58, 54],   // Indore
  [70, 79, 76, 74, 62],   // Chennai
];

// 5/10 yr trends
const YEARS_10 = ['FY17','FY18','FY19','FY20','FY21','FY22','FY23','FY24','FY25','FY26'];
const YEARS_5 = YEARS_10.slice(-5);

const TRENDS = {
  absorption: {
    Hospitality: [12.4, 14.2, 15.6, 9.8, 7.2, 11.4, 14.8, 17.2, 19.4, 21.8],
    Industrial:  [22.1, 26.8, 31.4, 28.2, 24.6, 32.8, 41.2, 48.6, 56.4, 62.8],
    Commercial:  [38.2, 42.6, 47.8, 33.4, 28.6, 41.2, 49.8, 56.4, 63.2, 71.4],
    Healthcare:  [4.8, 5.6, 6.2, 5.8, 5.1, 6.8, 8.2, 9.6, 11.2, 12.8],
    Residential: [180, 198, 215, 178, 152, 198, 248, 296, 324, 358],
  },
  leaseRate: {
    Hospitality: [62, 68, 74, 71, 69, 76, 84, 92, 98, 104],
    Industrial:  [18, 19, 21, 22, 23, 25, 27, 29, 31, 33],
    Commercial:  [82, 88, 94, 89, 86, 92, 98, 104, 110, 116],
    Healthcare:  [54, 58, 62, 64, 66, 70, 76, 82, 88, 94],
    Residential: [38, 41, 44, 42, 41, 45, 49, 53, 56, 60],
  },
  capValue: {
    Hospitality: [8400, 9100, 9800, 9500, 9200, 9800, 10600, 11400, 12100, 12900],
    Industrial:  [3200, 3450, 3700, 3850, 4000, 4250, 4600, 4950, 5300, 5700],
    Commercial:  [11200, 12000, 12800, 12200, 11800, 12600, 13500, 14400, 15200, 16100],
    Healthcare:  [9800, 10400, 11100, 11400, 11700, 12300, 13100, 14000, 14800, 15700],
    Residential: [6800, 7200, 7600, 7400, 7200, 7800, 8400, 9000, 9500, 10100],
  },
  yield: {
    Hospitality: [7.4, 7.5, 7.5, 7.5, 7.5, 7.7, 7.9, 8.1, 8.1, 8.0],
    Industrial:  [6.8, 6.6, 6.8, 6.9, 6.9, 7.1, 7.0, 7.0, 7.0, 6.9],
    Commercial:  [8.8, 8.8, 8.8, 8.8, 8.7, 8.8, 8.7, 8.7, 8.7, 8.6],
    Healthcare:  [6.6, 6.7, 6.7, 6.7, 6.8, 6.8, 7.0, 7.0, 7.1, 7.2],
    Residential: [3.4, 3.4, 3.5, 3.4, 3.4, 3.5, 3.5, 3.5, 3.5, 3.6],
  },
  supply: {
    Hospitality: [10.2, 12.1, 13.8, 11.4, 9.6, 12.4, 15.8, 18.2, 21.4, 24.6],
    Industrial:  [24.6, 28.2, 33.8, 30.4, 27.2, 35.4, 44.8, 52.6, 61.2, 68.4],
    Commercial:  [42.8, 46.2, 51.4, 38.6, 34.2, 45.8, 53.4, 60.8, 67.2, 74.6],
    Healthcare:  [5.2, 6.0, 6.8, 6.4, 5.8, 7.4, 8.8, 10.2, 11.8, 13.4],
    Residential: [195, 215, 232, 192, 168, 215, 268, 318, 348, 382],
  },
  mandates: {
    Hospitality: [4, 6, 8, 7, 6, 9, 12, 15, 17, 19],
    Industrial:  [3, 5, 7, 8, 9, 11, 14, 16, 18, 21],
    Commercial:  [5, 7, 9, 8, 7, 10, 12, 14, 15, 17],
    Healthcare:  [2, 3, 4, 5, 5, 6, 7, 8, 9, 11],
    Residential: [1, 2, 3, 3, 2, 4, 5, 6, 7, 8],
  },
};

// ---- Top Brands (Tab 1, sub-tab 3) ----
const ALL_BRANDS = [
  { name: 'Marriott International', sector: 'Hospitality', intent: 91, delta: 28, fundraise: 'Listed (NASDAQ)', dm: 'Ranju Alex', dmTitle: 'MD South Asia', fit: 'Aggressive Westin + Courtyard pipeline; 14 LOIs signed FY26. Targeting tier-1 leisure plus tier-2 commerce hubs.', color: '#A11823' },
  { name: 'Apollo Hospitals', sector: 'Healthcare', intent: 88, delta: 12, fundraise: 'Listed (NSE)', dm: 'Suneeta Reddy', dmTitle: 'Joint MD', fit: '2,300 beds added FY26. Tier-2 + tier-3 push under "Apollo HealthCo". 6-acre+ parcels with 200m road frontage.', color: '#005EB8' },
  { name: 'Delhivery', sector: 'Industrial', intent: 85, delta: 41, fundraise: 'Listed (NSE)', dm: 'Sahil Barua', dmTitle: 'CEO', fit: 'FY27 footprint plan: +14 Grade-A warehouses 200K-500K sqft, on/near logistics corridors.', color: '#E94B2A' },
  { name: 'Smartworks', sector: 'Commercial', intent: 83, delta: 23, fundraise: 'IPO-ready FY27', dm: 'Neetish Sarda', dmTitle: 'Founder', fit: 'Enterprise-only operator. Looking for ≥80K sqft anchor leases in Grade-A SBDs.', color: '#FF5722' },
  { name: 'Godrej Properties', sector: 'Residential', intent: 79, delta: 8, fundraise: 'Listed (NSE)', dm: 'Gaurav Pandey', dmTitle: 'CEO', fit: 'Mid-premium and luxury. 25-50 acre parcels in metro & tier-1 outer rings, NCR-MMR-Bengaluru focus.', color: '#00A651' },
  { name: 'IHG Hotels & Resorts', sector: 'Hospitality', intent: 84, delta: 19, fundraise: 'Listed (LSE)', dm: 'Sudeep Jain', dmTitle: 'MD SWA', fit: '60 hotels signed last 18 months. Holiday Inn Express drives volume; Crowne Plaza for tier-1 metros.', color: '#003366' },
  { name: 'Manipal Hospitals', sector: 'Healthcare', intent: 81, delta: 15, fundraise: 'PE-backed (Temasek)', dm: 'Dilip Jose', dmTitle: 'CEO', fit: 'Post-AMRI acquisition expansion. Looking at 4-7 acres in tier-1.5 cities, Eastern India focus.', color: '#E2231A' },
  { name: 'Amazon India', sector: 'Industrial', intent: 87, delta: 22, fundraise: 'Subsidiary (NASDAQ parent)', dm: 'Akhil Saxena', dmTitle: 'VP Customer Fulfillment', fit: 'Sortation centers 80-150K sqft + FCs 500K+. Tier-2/3 expansion now exceeds tier-1.', color: '#FF9900' },
  { name: 'Awfis Space Solutions', sector: 'Commercial', intent: 76, delta: 18, fundraise: 'Listed (NSE) FY24', dm: 'Amit Ramani', dmTitle: 'CEO', fit: 'Managed Aggregation flips. 30K-60K sqft floors, mid-priced micromarkets, 9-yr lease comfortable.', color: '#0066CC' },
  { name: 'Lodha (Macrotech)', sector: 'Residential', intent: 72, delta: 6, fundraise: 'Listed (NSE)', dm: 'Abhishek Lodha', dmTitle: 'MD & CEO', fit: 'Mumbai-heavy but Pune & Bengaluru push. 100+ acre integrated townships preferred.', color: '#7B1FA2' },
  { name: 'Taj Hotels (IHCL)', sector: 'Hospitality', intent: 80, delta: 14, fundraise: 'Listed (NSE)', dm: 'Puneet Chhatwal', dmTitle: 'MD & CEO', fit: 'Ginger drives volume; Vivanta + SeleQtions in tier-2; Taj flagship in heritage destinations.', color: '#8B0000' },
  { name: 'Lemon Tree Hotels', sector: 'Hospitality', intent: 74, delta: 11, fundraise: 'Listed (NSE)', dm: 'Patanjali Keswani', dmTitle: 'CMD', fit: 'Tier-2/3 mid-scale. Aurika upper-upscale flagship roll-out. 1.5-2.5 acre parcels.', color: '#9ACD32' },
  { name: 'Max Healthcare', sector: 'Healthcare', intent: 78, delta: 17, fundraise: 'Listed (NSE)', dm: 'Abhay Soi', dmTitle: 'Chairman & MD', fit: 'NCR fortress + Mumbai/Pune entry. Brownfield acquisitions plus 5-acre greenfield in tier-1.', color: '#005A9C' },
  { name: 'Walmart Global Tech (Flipkart)', sector: 'Commercial', intent: 82, delta: 24, fundraise: 'Subsidiary', dm: 'Prashant Lokhande', dmTitle: 'Head, Real Estate', fit: 'GCC consolidation: 600K+ sqft single-tenant campuses. Bengaluru + Hyderabad firm; Pune evaluating.', color: '#0071CE' },
  { name: 'Prestige Group', sector: 'Residential', intent: 70, delta: 9, fundraise: 'Listed (NSE)', dm: 'Irfan Razack', dmTitle: 'Chairman & MD', fit: 'Bengaluru fortress moving to Mumbai luxury. 30-80 acre parcels for branded residences.', color: '#1B5E20' },
  { name: 'XpressBees', sector: 'Industrial', intent: 71, delta: 26, fundraise: 'Series F (Unicorn)', dm: 'Amitava Saha', dmTitle: 'CEO', fit: 'Post-funding push: 35 new sortation hubs FY27. 2-4 acre BTS warehouses in tier-2 corridor cities.', color: '#5B21B6' },
];

// ---- Hospitality ----
const HOSP_BRANDS = [
  { brand: 'Marriott (Westin/Courtyard/Moxy)', tier: 'Upper-Upscale', keys: 4200, cities: 'Bengaluru, Hyderabad, Pune, Goa, Indore, Jaipur', criteria: '1.5-3 acres metros, 5+ acres resorts', format: 'Full-service + Select', dm: 'Ranju Alex', status: 'Mandated' },
  { brand: 'IHG (Holiday Inn/Crowne Plaza)', tier: 'Upscale', keys: 3100, cities: 'NCR, Bengaluru, Mumbai, Chennai, Lucknow', criteria: '1-2.5 acres, 200m+ frontage', format: 'Full-service', dm: 'Sudeep Jain', status: 'Mandated' },
  { brand: 'Accor (Novotel/ibis/Mercure)', tier: 'Upscale + Mid', keys: 2800, cities: 'Hyderabad, Pune, Kochi, Jaipur, Indore', criteria: '0.8-2 acres, near airport/CBD', format: 'Full + Select + Budget', dm: 'Puneet Dhawan', status: 'In Discussion' },
  { brand: 'Taj Hotels (IHCL)', tier: 'Luxury + Mid', keys: 3600, cities: 'Pan-India, leisure focus', criteria: 'Heritage parcels, beachfront, 3+ acres', format: 'Full-service + Ginger', dm: 'Puneet Chhatwal', status: 'Mandated' },
  { brand: 'Oberoi (Wildflower/Trident)', tier: 'Luxury', keys: 980, cities: 'Bengaluru, Goa, Udaipur, Shimla', criteria: '5+ acres, view-oriented', format: 'Full-service', dm: 'Vikram Oberoi', status: 'Prospecting' },
  { brand: 'Lemon Tree Hotels', tier: 'Mid-scale', keys: 2400, cities: 'Tier-2/3 nationally', criteria: '1.5-2.5 acres, road frontage', format: 'Select + Budget', dm: 'Patanjali Keswani', status: 'Mandated' },
  { brand: 'ITC Hotels', tier: 'Luxury', keys: 1450, cities: 'Mumbai, Bengaluru, Hyderabad, Goa', criteria: '4+ acres, LEED Platinum target', format: 'Full-service', dm: 'Anil Chadha', status: 'In Discussion' },
  { brand: 'Radisson Hotel Group', tier: 'Upscale + Mid', keys: 2950, cities: 'Tier-2/3, religious/leisure', criteria: '1-2 acres', format: 'Full + Select', dm: 'Nikhil Sharma', status: 'In Discussion' },
  { brand: 'Hyatt (Andaz/Alila)', tier: 'Luxury', keys: 1100, cities: 'Mumbai, Bengaluru, Goa, Udaipur', criteria: '3-5 acres premium locations', format: 'Full-service', dm: 'Sunjae Sharma', status: 'Prospecting' },
  { brand: 'OYO Premium / Palette Resorts', tier: 'Mid + Budget', keys: 8400, cities: 'Pan-India tier-2/3 + leisure', criteria: 'Operating leases, 50-150 keys', format: 'Asset-light', dm: 'Ritesh Agarwal', status: 'In Discussion' },
];

const HOSP_TIER_DEMAND = {
  labels: ['Tier 1', 'Tier 2', 'Leisure'],
  occupancy: [72, 64, 78],
  adr: [9800, 6400, 14200],
  revpar: [7056, 4096, 11076],
};

const HOSP_CITY_RATES = [
  { city: 'Mumbai', adr: 11200, revpar: 8064 },
  { city: 'Bengaluru', adr: 9800, revpar: 7056 },
  { city: 'NCR', adr: 10400, revpar: 7488 },
  { city: 'Goa', adr: 14800, revpar: 11248 },
  { city: 'Hyderabad', adr: 8600, revpar: 6020 },
  { city: 'Pune', adr: 7200, revpar: 4896 },
  { city: 'Jaipur', adr: 9100, revpar: 6552 },
  { city: 'Kochi', adr: 8200, revpar: 5494 },
];

const HOSP_MANDATES = [
  { parcel: 'Devanahalli North 12-acre', city: 'Bengaluru', area: 12, ask: 168, brand: 'Marriott (Westin)', rm: 'Rohan Mehta', stage: 'LOI Signed' },
  { parcel: 'Hebbal Lakeview 8-acre', city: 'Bengaluru', area: 8, ask: 142, brand: 'Hyatt (Andaz)', rm: 'Aanya Kapoor', stage: 'Term Sheet' },
  { parcel: 'Whitefield Hotel Plot', city: 'Bengaluru', area: 4.2, ask: 86, brand: 'IHG', rm: 'Vivek Saxena', stage: 'Negotiation' },
  { parcel: 'Hinjewadi Phase 4 Hotel', city: 'Pune', area: 3.6, ask: 64, brand: 'Lemon Tree (Aurika)', rm: 'Karthik Nair', stage: 'Mandated' },
  { parcel: 'Madhapur Heritage Plot', city: 'Hyderabad', area: 2.8, ask: 78, brand: 'Accor (Novotel)', rm: 'Priya Iyer', stage: 'Site Visits' },
  { parcel: 'Calangute Beach Plot', city: 'Goa', area: 6.5, ask: 124, brand: 'Taj (Vivanta)', rm: 'Rohan Mehta', stage: 'LOI Signed' },
];

const HOSP_DRIVERS = [
  { label: 'Domestic Tourists FY26', value: '2.84 Bn', delta: '+11%' },
  { label: 'Foreign Tourist Arrivals', value: '11.4 Mn', delta: '+22%' },
  { label: 'Airline Seat Capacity', value: '+14%', delta: 'YoY' },
  { label: 'Corporate Travel Index', value: '128', delta: '+9pp vs FY25' },
];

// ---- Healthcare ----
const HEALTH_CHAINS = [
  { chain: 'Apollo Hospitals', operational: 12300, planned: 700, specialties: 'Tertiary, Cardiac, Onco, Neuro', cities: 'Pune, Lucknow, Indore, Jaipur', land: '5-7', status: 'Mandated' },
  { chain: 'Manipal Hospitals', operational: 9800, planned: 500, specialties: 'Tertiary, Multi-specialty', cities: 'Kolkata, Hyderabad, Pune', land: '4-6', status: 'Mandated' },
  { chain: 'Max Healthcare', operational: 4500, planned: 400, specialties: 'Tertiary, Onco, Cardiac', cities: 'Mumbai, Pune, Lucknow', land: '5+', status: 'In Discussion' },
  { chain: 'Fortis Healthcare', operational: 4200, planned: 350, specialties: 'Multi-specialty', cities: 'NCR, Bengaluru, Chennai', land: '4-5', status: 'In Discussion' },
  { chain: 'Narayana Hrudayalaya', operational: 6100, planned: 280, specialties: 'Cardiac, Affordable Tertiary', cities: 'Kolkata, Bengaluru, Jaipur', land: '6+', status: 'Prospecting' },
  { chain: 'Medanta', operational: 2600, planned: 320, specialties: 'Quaternary care', cities: 'Indore, Patna, NCR (expansion)', land: '8+', status: 'Mandated' },
  { chain: 'Aster DM Healthcare', operational: 3400, planned: 240, specialties: 'Multi-specialty, Mother & Child', cities: 'Bengaluru, Kochi, Hyderabad', land: '4-5', status: 'In Discussion' },
  { chain: 'KIMS Hospitals', operational: 3800, planned: 220, specialties: 'Tertiary, Trauma', cities: 'Hyderabad, Andhra cluster', land: '4-6', status: 'Prospecting' },
  { chain: 'Yashoda Hospitals', operational: 2900, planned: 200, specialties: 'Cardiac, Onco', cities: 'Hyderabad expansion', land: '5+', status: 'Prospecting' },
  { chain: 'Narayana Health (NH)', operational: 6100, planned: 180, specialties: 'NABH-accredited tertiary', cities: 'Eastern India focus', land: '5+', status: 'In Discussion' },
];

const HEALTH_DIAGNOSTIC = [
  { name: 'Dr Lal PathLabs', cities: 'NCR, MP, Rajasthan, Punjab', sqft: '1500-3000', expansion: '+220 collection centres FY27', color: '#0066B3' },
  { name: 'Metropolis Healthcare', cities: 'Mumbai, Bengaluru, Chennai', sqft: '1800-2500', expansion: '+180 PSCs, 6 reference labs', color: '#00A19A' },
  { name: 'Thyrocare', cities: 'Pan-India franchisee model', sqft: '600-1200', expansion: '+450 outlets FY27', color: '#E31E24' },
  { name: 'Practo Clinics', cities: 'Tier-1 metros', sqft: '1200-2000', expansion: '40+ multi-specialty clinics', color: '#01BFB1' },
  { name: 'Pristyn Care', cities: 'NCR, Bengaluru, Hyderabad, Chennai', sqft: '2500-4000', expansion: '+30 surgical centres FY27', color: '#7B2D8E' },
  { name: 'Healthians', cities: 'NCR-led, expanding south', sqft: '600-1000', expansion: '+180 hubs', color: '#F47B20' },
];

const HEALTH_INSURANCE = [
  { state: 'Kerala', pen: 78 }, { state: 'Karnataka', pen: 64 }, { state: 'Tamil Nadu', pen: 61 },
  { state: 'Maharashtra', pen: 56 }, { state: 'Telangana', pen: 52 }, { state: 'Gujarat', pen: 48 },
  { state: 'Delhi NCR', pen: 71 }, { state: 'Punjab', pen: 45 }, { state: 'Rajasthan', pen: 38 },
  { state: 'MP', pen: 34 }, { state: 'UP', pen: 31 }, { state: 'Bihar', pen: 24 },
];

const HEALTH_PPP = [
  { state: 'Telangana', city: 'Hyderabad outer ring', subsidy: '50% land cost waiver', condition: '300+ beds, 30% EWS' },
  { state: 'Karnataka', city: 'Mysuru, Hubli, Mangaluru', subsidy: 'KIADB land at concessional rate', condition: 'Tertiary care, 200+ beds' },
  { state: 'Maharashtra', city: 'Aurangabad, Nashik, Solapur', subsidy: 'MIDC industrial land repurposed', condition: '5-yr operational commitment' },
  { state: 'Madhya Pradesh', city: 'Bhopal, Indore, Jabalpur', subsidy: 'Stamp duty + 25% capital subsidy', condition: '150+ beds, GoMP empanelment' },
  { state: 'Tamil Nadu', city: 'Coimbatore, Madurai, Trichy', subsidy: 'SIPCOT land at ₹0.5 Cr/acre', condition: 'Multi-specialty, 250+ beds' },
  { state: 'Uttar Pradesh', city: 'Lucknow, Varanasi, Gorakhpur', subsidy: '100% stamp duty waiver, GST refund', condition: '200+ beds, NABH within 3 yrs' },
];

const HEALTH_KPIS = [
  { label: 'Beds per 1,000 population', value: '1.46', sub: 'WHO target 3.0' },
  { label: 'NABH-Accredited Hospitals', value: '1,847', sub: '+218 vs FY25' },
  { label: 'Health Insurance Penetration', value: '38%', sub: '+5pp vs FY25' },
  { label: 'Medical Tourism Revenue', value: '$13.4 Bn', sub: '+24% YoY' },
];

// ---- Industrial ----
const IND_KPIS = [
  { label: 'Grade-A Absorption FY26', value: '62.8 msf', delta: '+11%' },
  { label: 'Vacancy Rate', value: '7.4%', delta: '-1.2pp' },
  { label: 'Avg Rent ₹/sqft/mo', value: '₹33', delta: '+6%' },
  { label: 'YoY Rent Growth', value: '+6.4%', delta: 'stable' },
];

const IND_3PL = [
  { co: 'Amazon India', sqft: 8.4, cities: 'Hyderabad, Bhiwandi, Farukhnagar, Lucknow', next: '+3.2 msf FY27' },
  { co: 'Flipkart', sqft: 6.2, cities: 'Bengaluru, Hyderabad, NCR, Kolkata', next: '+2.4 msf FY27' },
  { co: 'Meesho', sqft: 2.1, cities: 'Bengaluru, NCR, Chennai', next: '+1.6 msf FY27' },
  { co: 'Delhivery', sqft: 4.8, cities: 'Bhiwandi, Farukhnagar, Hyderabad, Bengaluru', next: '+2.8 msf FY27' },
  { co: 'XpressBees', sqft: 2.4, cities: 'Pune, Hyderabad, Lucknow, Indore', next: '+1.4 msf FY27' },
  { co: 'Ecom Express', sqft: 2.8, cities: 'Bhiwandi, NCR, Bengaluru', next: '+1.2 msf FY27' },
];

const IND_MFG = [
  { sector: 'EV & Components', cos: 'Tata Motors, Ola Electric, Ather, Hero MotoCorp', pli: 25938, land: '50-200 acres' },
  { sector: 'Electronics', cos: 'Foxconn, Pegatron, Dixon, Tata Electronics', pli: 38601, land: '100-400 acres' },
  { sector: 'Pharma & API', cos: 'Sun Pharma, Cipla, Dr Reddy\'s, Lupin', pli: 15000, land: '20-80 acres' },
  { sector: 'Textiles (PM MITRA)', cos: 'Welspun, Trident, Arvind, Vardhman', pli: 10683, land: '40-150 acres' },
  { sector: 'Defence & Aerospace', cos: 'Tata Advanced Systems, L&T, Adani Defence', pli: 8400, land: '100-500 acres' },
];

const IND_CORRIDORS = [
  { name: 'Western DFC', length: '1,506 km', anchors: 'JNPT (Mumbai) → Dadri (UP)', status: 'Operational since FY24', impact: 'Logistics cost down 35% on ₹6.50/tkm benchmark' },
  { name: 'Eastern DFC', length: '1,337 km', anchors: 'Ludhiana → Sonenagar (Bihar)', status: 'Phase 1 operational', impact: 'Coal & steel freight; East-West connectivity unlocked' },
  { name: 'DMIC (Delhi-Mumbai Industrial)', length: '1,500 km', anchors: '8 nodes incl. Dholera, Shendra', status: 'Mixed (Dholera u/c)', impact: '₹100 Bn invested, 24 industrial cities planned' },
  { name: 'Chennai-Bengaluru Industrial', length: '560 km', anchors: 'Chennai → Bengaluru via Hosur', status: 'Master-plan stage', impact: 'EV + electronics cluster anchor' },
  { name: 'Amritsar-Kolkata Industrial', length: '1,839 km', anchors: 'AKIC nodes Saharanpur, Patna, Howrah', status: 'Phased rollout', impact: '20+ industrial nodes, Eastern India revival' },
];

const IND_SUPPLY = [
  { city: 'Mumbai/Bhiwandi', completed: 8.4, uc: 6.2, planned: 4.8 },
  { city: 'NCR/Farukhnagar', completed: 7.8, uc: 5.4, planned: 4.2 },
  { city: 'Bengaluru', completed: 6.4, uc: 4.8, planned: 3.6 },
  { city: 'Chennai', completed: 4.6, uc: 3.4, planned: 2.8 },
  { city: 'Hyderabad', completed: 5.2, uc: 3.8, planned: 3.2 },
  { city: 'Pune/Chakan', completed: 4.2, uc: 3.6, planned: 2.4 },
  { city: 'Kolkata', completed: 2.8, uc: 1.8, planned: 1.4 },
  { city: 'Ahmedabad', completed: 3.4, uc: 2.6, planned: 1.8 },
];

// ---- Commercial ----
const COMM_KPIS = [
  { label: 'Net Absorption FY26', value: '71.4 msf', delta: '+13%' },
  { label: 'Vacancy', value: '15.8%', delta: '-1.4pp' },
  { label: 'Avg Grade-A Rent ₹/sqft/mo', value: '₹116', delta: '+5%' },
  { label: 'New Completions FY26', value: '74.6 msf', delta: '+10%' },
];

const COMM_GCC = [
  { co: 'TCS', current: 28.4, expansion: 4.2, cities: 'Bengaluru, Pune, Chennai, Hyderabad', type: 'Captive', dm: 'Aarthi Subramanian' },
  { co: 'Infosys', current: 24.6, expansion: 3.8, cities: 'Bengaluru, Hyderabad, Pune, Mysuru', type: 'Captive', dm: 'Salil Parekh' },
  { co: 'Wipro', current: 18.2, expansion: 2.6, cities: 'Bengaluru, Pune, Hyderabad', type: 'Captive', dm: 'Srinivas Pallia' },
  { co: 'HCLTech', current: 14.8, expansion: 2.4, cities: 'NCR, Bengaluru, Chennai', type: 'Captive', dm: 'C Vijayakumar' },
  { co: 'Accenture', current: 22.4, expansion: 3.6, cities: 'Bengaluru, Hyderabad, Mumbai', type: 'Captive', dm: 'Rekha Menon' },
  { co: 'Capgemini', current: 12.8, expansion: 2.2, cities: 'Mumbai, Bengaluru, Pune, Chennai', type: 'Captive', dm: 'Ashwin Yardi' },
  { co: 'JP Morgan', current: 6.8, expansion: 1.8, cities: 'Bengaluru, Hyderabad, Mumbai', type: 'GCC', dm: 'Madhav Kalyan' },
  { co: 'Goldman Sachs', current: 4.2, expansion: 1.4, cities: 'Bengaluru, Hyderabad', type: 'GCC', dm: 'Sonjoy Chatterjee' },
  { co: 'HSBC', current: 5.6, expansion: 1.2, cities: 'Bengaluru, Hyderabad, Pune', type: 'GCC', dm: 'Hitendra Dave' },
  { co: 'Walmart Global Tech', current: 3.8, expansion: 1.6, cities: 'Bengaluru, Chennai', type: 'GCC', dm: 'Hari Vasudev' },
];

const COMM_COWORK = [
  { name: 'WeWork India', seats: 96000, cities: 'Bengaluru, Mumbai, NCR, Pune, Chennai, Hyderabad', target: '+18K seats FY27', occ: 88, color: '#000', status: 'Active Mandate' },
  { name: 'Smartworks', seats: 162000, cities: 'Bengaluru, Mumbai, NCR, Pune, Chennai, Hyderabad, Kolkata', target: '+42K seats FY27', occ: 91, color: '#FF5722', status: 'Active Mandate' },
  { name: 'Awfis', seats: 128000, cities: 'Pan-India, 16 cities', target: '+38K seats FY27', occ: 78, color: '#0066CC', status: 'Active Mandate' },
  { name: 'IndiQube', seats: 84000, cities: 'Bengaluru-led, 8 cities', target: '+22K seats FY27', occ: 86, color: '#5B21B6', status: 'Pitched' },
  { name: '91springboard', seats: 32000, cities: 'NCR, Bengaluru, Mumbai, Hyderabad', target: '+8K seats FY27', occ: 74, color: '#E94B2A', status: 'Cold' },
  { name: 'Bhive', seats: 28000, cities: 'Bengaluru, Mumbai', target: '+12K seats FY27', occ: 82, color: '#0EA5E9', status: 'Pitched' },
  { name: 'Simpliwork', seats: 24000, cities: 'Bengaluru, Hyderabad, NCR', target: '+9K seats FY27', occ: 89, color: '#16A34A', status: 'Active Mandate' },
];

const COMM_SEZ = [
  { city: 'Bengaluru', sez: 8.4, nonSez: 12.6 },
  { city: 'Hyderabad', sez: 6.8, nonSez: 7.2 },
  { city: 'Pune', sez: 3.2, nonSez: 6.4 },
  { city: 'Chennai', sez: 2.6, nonSez: 4.8 },
  { city: 'Mumbai', sez: 1.4, nonSez: 8.2 },
  { city: 'NCR', sez: 2.2, nonSez: 7.8 },
];

const COMM_PIPELINE = [
  { city: 'Bengaluru', micromarket: 'ORR', uc: 4.8, completion: 'Q3 FY27', anchor: 'Goldman Sachs' },
  { city: 'Bengaluru', micromarket: 'Whitefield', uc: 3.6, completion: 'Q1 FY27', anchor: 'Wells Fargo' },
  { city: 'Hyderabad', micromarket: 'HITEC City', uc: 4.2, completion: 'Q4 FY27', anchor: 'Microsoft' },
  { city: 'Hyderabad', micromarket: 'Gachibowli', uc: 3.4, completion: 'Q2 FY27', anchor: 'Amazon' },
  { city: 'Pune', micromarket: 'Hinjewadi P3', uc: 2.8, completion: 'Q3 FY27', anchor: 'TCS' },
  { city: 'Mumbai', micromarket: 'BKC Annexe', uc: 1.6, completion: 'Q4 FY27', anchor: 'JP Morgan' },
  { city: 'Chennai', micromarket: 'OMR Phase 2', uc: 2.4, completion: 'Q2 FY27', anchor: 'Cognizant' },
  { city: 'NCR', micromarket: 'DLF Cyber City Ph 4', uc: 1.8, completion: 'Q3 FY27', anchor: 'Genpact' },
];

// ---- Residential ----
const RESI_KPIS = [
  { label: 'Units Launched FY26', value: '4.62 L', delta: '+14%' },
  { label: 'Units Sold FY26', value: '3.84 L', delta: '+9%' },
  { label: 'Inventory Overhang', value: '14 mo', delta: '-3 mo' },
  { label: 'Avg Ticket Size', value: '₹1.24 Cr', delta: '+11%' },
  { label: 'NRI Sales Share', value: '18%', delta: '+3pp' },
];

const RESI_TICKET = {
  labels: ['<50L', '50L–1Cr', '1–2Cr', '2–5Cr', '5Cr+'],
  values: [42000, 96000, 138000, 84000, 24000],
};

const RESI_DEVELOPERS = [
  { dev: 'DLF', launches: 14600, sellThru: 92, avg: 4.8, cities: 'NCR, Chennai, Goa', overhang: 6, rating: 'AAA' },
  { dev: 'Godrej Properties', launches: 22400, sellThru: 84, avg: 1.9, cities: 'NCR, MMR, Bengaluru, Pune', overhang: 9, rating: 'AAA' },
  { dev: 'Prestige Group', launches: 18200, sellThru: 78, avg: 2.4, cities: 'Bengaluru, Chennai, Mumbai', overhang: 12, rating: 'AA+' },
  { dev: 'Sobha Limited', launches: 6200, sellThru: 71, avg: 2.1, cities: 'Bengaluru, NCR, Kerala', overhang: 14, rating: 'AA' },
  { dev: 'Brigade Enterprises', launches: 7800, sellThru: 73, avg: 1.7, cities: 'Bengaluru, Chennai, Hyderabad', overhang: 13, rating: 'AA' },
  { dev: 'Lodha (Macrotech)', launches: 21800, sellThru: 86, avg: 1.8, cities: 'MMR, Pune, Bengaluru', overhang: 8, rating: 'AAA' },
  { dev: 'Mahindra Lifespaces', launches: 4400, sellThru: 68, avg: 1.4, cities: 'MMR, Pune, NCR', overhang: 16, rating: 'AA' },
  { dev: 'Tata Housing', launches: 5600, sellThru: 74, avg: 1.6, cities: 'NCR, MMR, Bengaluru', overhang: 12, rating: 'AA+' },
  { dev: 'Puravankara', launches: 3800, sellThru: 66, avg: 1.5, cities: 'Bengaluru, Pune, Chennai', overhang: 18, rating: 'A+' },
  { dev: 'Kolte-Patil', launches: 4200, sellThru: 70, avg: 1.1, cities: 'Pune, Bengaluru, Mumbai', overhang: 15, rating: 'AA-' },
];

const RESI_SEGMENTS = {
  nri: { share: 18, sources: 'UAE 34%, USA 22%, Singapore 14%, UK 11%', cities: 'Bengaluru, Kochi, Hyderabad, Mumbai' },
  hni: { share: 22, trend: '5Cr+ ticket up 28% YoY; branded residences see 92% sell-through', preferred: 'Mumbai, NCR, Goa, Alibaug' },
  endUser: { share: 60, affordability: 'EMI/income avg 41% (vs 38% FY25)', cities: 'Pune 36%, Hyderabad 39%, Bengaluru 43%, Mumbai 56%, NCR 51%' },
};

// ---- Land Pitch sample comparables ----
const PITCH_COMPS = [
  { date: 'Jan 2026', dist: '1.2 km', rate: 14800, type: 'Hospitality', buyer: 'Marriott (Westin)' },
  { date: 'Nov 2025', dist: '2.4 km', rate: 12400, type: 'Commercial', buyer: 'Smartworks' },
  { date: 'Sep 2025', dist: '0.8 km', rate: 16200, type: 'Hospitality', buyer: 'IHG (Crowne Plaza)' },
  { date: 'Jul 2025', dist: '3.6 km', rate: 9800, type: 'Healthcare', buyer: 'Apollo Hospitals' },
  { date: 'May 2025', dist: '4.1 km', rate: 8400, type: 'Industrial', buyer: 'Delhivery' },
];

const PITCH_INFRA = [
  { icon: 'metro', label: 'Metro Station (Purple Line)', dist: '1.4 km' },
  { icon: 'highway', label: 'NH-44 / Outer Ring Road', dist: '2.8 km' },
  { icon: 'airport', label: 'Kempegowda Intl Airport', dist: '18 km' },
  { icon: 'hospital', label: 'Manipal Hospital', dist: '3.2 km' },
  { icon: 'mall', label: 'Phoenix Marketcity', dist: '4.6 km' },
  { icon: 'office', label: 'Manyata Tech Park', dist: '5.1 km' },
];

// ---- Team ----
const TEAM = [
  { name: 'Rohan Mehta', division: 'Hospitality', accounts: 9, pipeline: 142, closed: 6, winRate: 78, cycle: 84, capacity: 92, status: 'Top Performer', initials: 'RM', color: '#0B1C3F', joined: 'Aug 2019', title: 'Sr Director, Hospitality' },
  { name: 'Priya Iyer', division: 'Healthcare', accounts: 7, pipeline: 96, closed: 4, winRate: 71, cycle: 112, capacity: 84, status: 'On Track', initials: 'PI', color: '#A11823', joined: 'Mar 2020', title: 'Director, Healthcare' },
  { name: 'Karthik Nair', division: 'Industrial', accounts: 11, pipeline: 124, closed: 5, winRate: 68, cycle: 96, capacity: 96, status: 'Over Capacity', initials: 'KN', color: '#E94B2A', joined: 'Jun 2018', title: 'Director, Industrial' },
  { name: 'Aanya Kapoor', division: 'Commercial', accounts: 8, pipeline: 88, closed: 4, winRate: 64, cycle: 102, capacity: 74, status: 'On Track', initials: 'AK', color: '#0066CC', joined: 'Jan 2021', title: 'Sr Manager, Commercial' },
  { name: 'Vivek Saxena', division: 'Residential', accounts: 6, pipeline: 64, closed: 3, winRate: 58, cycle: 134, capacity: 62, status: 'Under-utilised', initials: 'VS', color: '#00A651', joined: 'Sep 2022', title: 'Manager, Residential' },
  { name: 'Ishaan Bhatt', division: 'Hospitality', accounts: 6, pipeline: 78, closed: 3, winRate: 62, cycle: 98, capacity: 78, status: 'On Track', initials: 'IB', color: '#0B1C3F', joined: 'Apr 2021', title: 'Manager, Hospitality' },
  { name: 'Meera Krishnan', division: 'Healthcare', accounts: 5, pipeline: 58, closed: 2, winRate: 56, cycle: 124, capacity: 68, status: 'On Track', initials: 'MK', color: '#A11823', joined: 'Nov 2022', title: 'Manager, Healthcare' },
  { name: 'Arjun Desai', division: 'Industrial', accounts: 8, pipeline: 92, closed: 4, winRate: 66, cycle: 88, capacity: 86, status: 'On Track', initials: 'AD', color: '#E94B2A', joined: 'Feb 2020', title: 'Sr Manager, Industrial' },
  { name: 'Nisha Pillai', division: 'Commercial', accounts: 7, pipeline: 74, closed: 4, winRate: 71, cycle: 92, capacity: 88, status: 'On Track', initials: 'NP', color: '#0066CC', joined: 'Jul 2019', title: 'Director, Commercial' },
  { name: 'Rohit Banerjee', division: 'Residential', accounts: 5, pipeline: 52, closed: 2, winRate: 48, cycle: 148, capacity: 58, status: 'Under-utilised', initials: 'RB', color: '#00A651', joined: 'Mar 2023', title: 'Associate, Residential' },
  { name: 'Sneha Joshi', division: 'Hospitality', accounts: 6, pipeline: 84, closed: 3, winRate: 64, cycle: 106, capacity: 81, status: 'On Track', initials: 'SJ', color: '#0B1C3F', joined: 'Oct 2020', title: 'Manager, Hospitality' },
  { name: 'Vikrant Shah', division: 'Industrial', accounts: 7, pipeline: 68, closed: 3, winRate: 60, cycle: 104, capacity: 76, status: 'On Track', initials: 'VS', color: '#E94B2A', joined: 'Aug 2022', title: 'Manager, Industrial' },
];

const TEAM_REASSIGN = [
  { from: 'Rohit Banerjee', account: 'Lodha Worli Plot', to: 'Vivek Saxena', reason: 'Capacity rebalance', status: 'Pending L2' },
  { from: 'Karthik Nair', account: 'Delhivery Bhiwandi 4', to: 'Arjun Desai', reason: 'Over capacity', status: 'Approved' },
  { from: 'Meera Krishnan', account: 'Aster DM Bengaluru', to: 'Priya Iyer', reason: 'Senior involvement requested', status: 'Pending L1' },
];

// ---- Issues ----
const ISSUES = [
  { id: 'RA-101', title: 'Title dispute — Baner Pune 4-acre parcel', type: 'Title', priority: 'P1', owner: 'Karthik Nair', deal: 'Delhivery Pune-2', age: 14, sla: '8 May 2026', status: 'Escalated', desc: 'Encumbrance certificate shows two competing claims dating to 1983 partition. Sub-registrar records being pulled.', updates: ['3 May: Counsel meeting scheduled with both heirs', '1 May: Sub-registrar response received', '24 Apr: Issue raised post-DD'] },
  { id: 'RA-102', title: 'NA conversion pending — Hebbal lakefront', type: 'Approval', priority: 'P2', owner: 'Aanya Kapoor', deal: 'Marriott Hebbal', age: 22, sla: '15 May 2026', status: 'In Progress', desc: 'Conversion from agricultural to commercial. DC office files moved to revenue dept on 18 Apr.', updates: ['2 May: Follow-up with DC PA', '28 Apr: Files at revenue dept', '11 Apr: Application filed'] },
  { id: 'RA-103', title: 'Owner ask 32% above comp band', type: 'Pricing Gap', priority: 'P2', owner: 'Rohan Mehta', deal: 'Devanahalli Westin', age: 6, sla: '12 May 2026', status: 'Open', desc: 'Owner anchoring on Whitefield comp; correct comp is Bagalur. Need 3 fresh comps + valuation memo.', updates: ['3 May: Valuation memo drafted', '29 Apr: Owner meeting scheduled'] },
  { id: 'RA-104', title: 'Buyer dropped — Smartworks BKC pull-out', type: 'Buyer Side', priority: 'P1', owner: 'Aanya Kapoor', deal: 'BKC Annexe', age: 4, sla: '6 May 2026', status: 'In Progress', desc: 'Smartworks revised mandate; BKC no longer in target list. Pivoting parcel to Awfis.', updates: ['3 May: Awfis sent prelim deck', '1 May: Smartworks confirmed pull-out'] },
  { id: 'RA-105', title: 'Encumbrance: family pledge unreleased', type: 'Encumbrance', priority: 'P1', owner: 'Vivek Saxena', deal: 'Lodha Worli', age: 18, sla: '10 May 2026', status: 'Escalated', desc: '₹14 Cr pledge against Andhra Bank; release pending KYC by absent NRI co-signatory.', updates: ['2 May: Bank confirms pledge active', '24 Apr: NRI co-signatory traced'] },
  { id: 'RA-106', title: 'RERA registration overdue — Sobha launch', type: 'Compliance', priority: 'P2', owner: 'Vivek Saxena', deal: 'Sobha NCR', age: 9, sla: '7 May 2026', status: 'In Progress', desc: 'Project >500 sqm, pre-launch stopped pending RERA UP filing. Architect drawings being finalised.', updates: ['3 May: RERA portal upload 80% done'] },
  { id: 'RA-107', title: 'Environmental clearance — Aurika Aurangabad', type: 'Approval', priority: 'P3', owner: 'Sneha Joshi', deal: 'Lemon Tree Aurika', age: 31, sla: '20 May 2026', status: 'In Progress', desc: 'EAC meeting deferred from Apr to May docket. Wildlife buffer zone classification under review.', updates: ['28 Apr: EAC meeting deferred'] },
  { id: 'RA-108', title: 'Joint owners disagree on deal structure', type: 'Legal', priority: 'P2', owner: 'Karthik Nair', deal: 'Hyderabad ORR Plot', age: 11, sla: '14 May 2026', status: 'Open', desc: '4 of 6 co-owners want outright sale; 2 want JDA. Mediation session scheduled.', updates: ['2 May: Mediation slot confirmed for 8 May'] },
  { id: 'RA-109', title: 'Apollo land requirement size mismatch', type: 'Buyer Side', priority: 'P3', owner: 'Priya Iyer', deal: 'Apollo Indore', age: 7, sla: '13 May 2026', status: 'Open', desc: 'Apollo wants 6 acres contiguous; current parcel is 4.8 acres + 1.4 across lane. Adjacent purchase under exploration.', updates: [] },
  { id: 'RA-110', title: 'Stamp duty interpretation — Telangana JDA', type: 'Legal', priority: 'P2', owner: 'Arjun Desai', deal: 'Hyderabad Industrial Zone', age: 16, sla: '11 May 2026', status: 'In Progress', desc: 'Counsel opinion split on whether JDA attracts 4% or 7.5% stamp duty under TG Act.', updates: ['1 May: Senior counsel opined 4%'] },
  { id: 'RA-111', title: 'Site fencing damaged — security risk', type: 'Compliance', priority: 'P3', owner: 'Ishaan Bhatt', deal: 'Calangute Beach Plot', age: 3, sla: '15 May 2026', status: 'Open', desc: 'Boundary fence breached; encroachment risk pre-monsoon.', updates: [] },
  { id: 'RA-112', title: 'Marriott LOI extension request', type: 'Buyer Side', priority: 'P2', owner: 'Rohan Mehta', deal: 'Devanahalli Westin', age: 5, sla: '8 May 2026', status: 'In Progress', desc: 'Marriott IC pushed final approval to next quarterly meeting.', updates: ['3 May: Drafting 60-day extension addendum'] },
];

const ISSUE_KPIS = { open: 18, overdue: 4, avgAge: 12, resolved: 47 };

// ---- Notifications ----
const NOTIFICATIONS = [
  { dot: 'gold', text: 'Apollo Hospitals confirmed 2 new target cities (Lucknow, Jaipur).', time: '14 min ago' },
  { dot: 'green', text: 'Land pitch for Hebbal lakefront opened by Marriott IC team.', time: '2 hrs ago' },
  { dot: 'red', text: 'Issue #RA-101 (Title) overdue 6 days — escalated to Priya Iyer.', time: '5 hrs ago' },
];

// ---- City detail ----
const CITY_DETAIL = {
  panIndia: { pop: '1.42 Bn', gdpPC: '$2,610', tier: 'National', employers: 'IT/ITeS, BFSI, Mfg, Retail, Healthcare' },
  bengaluru: { pop: '13.6 Mn', gdpPC: '$8,100', tier: 'Tier-1', employers: 'IT (37%), GCC (18%), Biotech (8%), Aerospace (6%)' },
  mumbai: { pop: '21.7 Mn', gdpPC: '$7,800', tier: 'Tier-1', employers: 'BFSI (29%), Media (12%), Pharma (9%), IT (14%)' },
  delhi: { pop: '32.1 Mn', gdpPC: '$6,400', tier: 'Tier-1', employers: 'Govt + PSU (18%), IT (16%), Retail (14%), Mfg (12%)' },
  hyderabad: { pop: '10.8 Mn', gdpPC: '$6,900', tier: 'Tier-1', employers: 'IT (32%), Pharma (14%), GCC (16%), Biotech (8%)' },
  chennai: { pop: '11.5 Mn', gdpPC: '$5,400', tier: 'Tier-1', employers: 'Auto (18%), IT (22%), Mfg (16%), Healthcare (9%)' },
  pune: { pop: '7.4 Mn', gdpPC: '$5,800', tier: 'Tier-1', employers: 'IT (28%), Auto (19%), Mfg (12%), Education (8%)' },
  ahmedabad: { pop: '8.4 Mn', gdpPC: '$4,200', tier: 'Tier-1', employers: 'Textiles (16%), Pharma (14%), Chem (12%), IT (10%)' },
  kolkata: { pop: '15.1 Mn', gdpPC: '$3,200', tier: 'Tier-1', employers: 'BFSI (16%), Govt (14%), IT (11%), Engineering (9%)' },
  indore: { pop: '3.4 Mn', gdpPC: '$3,800', tier: 'Tier-2', employers: 'Mfg (19%), IT (12%), Education (11%), Retail (10%)' },
  jaipur: { pop: '4.1 Mn', gdpPC: '$3,400', tier: 'Tier-2', employers: 'Tourism (16%), Gems & Jewellery (14%), IT (8%), Govt (12%)' },
  lucknow: { pop: '3.9 Mn', gdpPC: '$2,800', tier: 'Tier-2', employers: 'Govt (22%), Healthcare (11%), IT (9%), Education (8%)' },
  kochi: { pop: '2.8 Mn', gdpPC: '$4,100', tier: 'Tier-2', employers: 'IT (18%), Tourism (16%), Marine (11%), Healthcare (9%)' },
};

const CITY_INFRA = {
  default: [
    { name: 'Metro Phase 3 Extension', status: 'Under Construction', timeline: 'Open Q4 FY27', impact: '+38 km, 32 stations' },
    { name: 'Outer Ring Road Widening', status: 'Operational', timeline: 'Done FY25', impact: '8 → 10 lanes, ₹4,200 Cr' },
    { name: 'Airport Terminal 2 Expansion', status: 'Under Construction', timeline: 'Open Q2 FY27', impact: '+45 MPPA capacity' },
    { name: 'Smart City Mission Tranche-3', status: 'Planned', timeline: 'FY27-29', impact: '₹1,800 Cr, ABD area focus' },
  ],
};

const CITY_RERA = ['Central', 'North', 'South', 'East', 'West', 'Outer Ring', 'Outer East', 'Outer West'];
const CITY_RERA_VALUES = [142, 88, 124, 96, 78, 168, 112, 84];

const CITY_MICROMARKETS = {
  default: [
    { mm: 'Whitefield / ORR North', land: 18.4, lease: 116, vacancy: 12, top: 'Goldman Sachs', yoy: '+8%' },
    { mm: 'Hebbal / Bellary Rd', land: 22.6, lease: 98, vacancy: 14, top: 'Marriott', yoy: '+11%' },
    { mm: 'Devanahalli', land: 8.2, lease: 64, vacancy: 22, top: 'Embassy REIT', yoy: '+18%' },
    { mm: 'Electronic City', land: 14.8, lease: 88, vacancy: 18, top: 'Infosys', yoy: '+6%' },
    { mm: 'Sarjapur Rd', land: 19.6, lease: 112, vacancy: 11, top: 'Wipro', yoy: '+9%' },
    { mm: 'Bannerghatta Rd', land: 12.4, lease: 94, vacancy: 16, top: 'Manipal Hospitals', yoy: '+7%' },
    { mm: 'KR Puram', land: 9.8, lease: 76, vacancy: 24, top: 'Delhivery', yoy: '+12%' },
    { mm: 'Yeshwanthpur', land: 16.2, lease: 102, vacancy: 13, top: 'Tata Realty', yoy: '+8%' },
  ],
};

const CITY_RELIANT = { mandates: 14, won: 6, brands: 12 };

// ---- Data sources by tab ----
const DATA_SOURCES = {
  dashboard: 'JLL India Q1 2026 | Knight Frank India Hospitality | Salesforce CRM | RERA portals (KA, MH, TG, TN) | Internal Reliant deal log',
  hospitality: 'JLL Hospitality Report Q1 2026 | HVS India Hotel Survey | FHRAI data | RERA (MH, KA, TG) | Marriott / IHG investor relations | CRM (Salesforce)',
  healthcare: 'CRISIL Healthcare 2026 | NABH directory | IRDAI insurance penetration | NITI Aayog Health Index | State PPP portals | CRM',
  industrial: 'Knight Frank India Logistics | JLL Industrial Outlook FY26 | IPRTSA leasing data | DPIIT PLI scheme dashboard | NHAI / DFCCIL | CRM',
  commercial: 'CBRE India Office Marketbeat Q1 2026 | JLL Office Marketview | NASSCOM GCC Report 2026 | Coworking association data | CRM',
  residential: 'PropEquity Q1 2026 | Anarock Residential Trends | RERA portals | Magicbricks Index | NRI remittance data (RBI) | CRM',
  pitch: 'Reliant comp database | RERA filings (state) | Govt GIS portals (Bhulekh, Bhoomi) | Sub-registrar comparable sales | Reliant brand DM matrix',
  team: 'Salesforce CRM | Reliant HRMS | Capacity planner v2.4 | Internal escalation logs',
  issues: 'Reliant issue tracker (internal) | SLA matrix v3.1 | Escalation policy doc | Counsel opinion library',
};

// ---- The DATA superobject ----
// Tabs read via getSource(); cities scale numerically by CITY_FACTOR
const DATA = {
  cities: CITIES,
  cityFactor: CITY_FACTOR,
  panIndia: {
    dashboard: { kpis: PAN_KPIS, priority: RE_PRIORITY, sentiment: SENTIMENT, topBrands: TOP_BRANDS_QUARTER, focus: FOCUS_CITIES, reTypes: RE_TYPES, heatmap: HEATMAP_SCORES, trends: TRENDS, years5: YEARS_5, years10: YEARS_10, allBrands: ALL_BRANDS, cityDetail: CITY_DETAIL, infra: CITY_INFRA, rera: { mm: CITY_RERA, values: CITY_RERA_VALUES }, micro: CITY_MICROMARKETS, reliant: CITY_RELIANT },
    hospitality: { brands: HOSP_BRANDS, tierDemand: HOSP_TIER_DEMAND, cityRates: HOSP_CITY_RATES, mandates: HOSP_MANDATES, drivers: HOSP_DRIVERS },
    healthcare: { chains: HEALTH_CHAINS, diagnostic: HEALTH_DIAGNOSTIC, insurance: HEALTH_INSURANCE, ppp: HEALTH_PPP, kpis: HEALTH_KPIS },
    industrial: { kpis: IND_KPIS, threePL: IND_3PL, mfg: IND_MFG, corridors: IND_CORRIDORS, supply: IND_SUPPLY },
    commercial: { kpis: COMM_KPIS, gcc: COMM_GCC, cowork: COMM_COWORK, sez: COMM_SEZ, pipeline: COMM_PIPELINE },
    residential: { kpis: RESI_KPIS, ticket: RESI_TICKET, developers: RESI_DEVELOPERS, segments: RESI_SEGMENTS },
    pitch: { comps: PITCH_COMPS, infra: PITCH_INFRA },
    team: { team: TEAM, reassign: TEAM_REASSIGN },
    issues: { issues: ISSUES, kpis: ISSUE_KPIS },
    notifications: NOTIFICATIONS,
    sources: DATA_SOURCES,
  },
};

// ---- getSource — the integration seam ----
function getSource(sourceName, tab, market, params = {}) {
  const m = market || 'panIndia';
  const tabData = (DATA[m] && DATA[m][tab]) || (DATA.panIndia[tab] || {});
  const result = tabData[sourceName] !== undefined ? tabData[sourceName] : (DATA.panIndia[tab] && DATA.panIndia[tab][sourceName]);
  const live = (typeof window !== 'undefined' && window.__RELIANT_CRM_LIVE) ? 'YES' : 'no';
  // eslint-disable-next-line no-console
  console.log(`[Reliant] Source: ${sourceName} | Tab: ${tab} | Market: ${m} | Live: ${live}`);
  return result;
}

// ---- City scaling helper ----
function scaleByCity(value, market) {
  const f = CITY_FACTOR[market] !== undefined ? CITY_FACTOR[market] : 1;
  if (typeof value !== 'number') return value;
  return value * f;
}

// Export to window
Object.assign(window, {
  DATA, CITIES, CITY_FACTOR, getSource, scaleByCity,
  PAN_KPIS, RE_PRIORITY, SENTIMENT, TOP_BRANDS_QUARTER, FOCUS_CITIES, RE_TYPES, HEATMAP_SCORES,
  YEARS_10, YEARS_5, TRENDS, ALL_BRANDS,
  HOSP_BRANDS, HOSP_TIER_DEMAND, HOSP_CITY_RATES, HOSP_MANDATES, HOSP_DRIVERS,
  HEALTH_CHAINS, HEALTH_DIAGNOSTIC, HEALTH_INSURANCE, HEALTH_PPP, HEALTH_KPIS,
  IND_KPIS, IND_3PL, IND_MFG, IND_CORRIDORS, IND_SUPPLY,
  COMM_KPIS, COMM_GCC, COMM_COWORK, COMM_SEZ, COMM_PIPELINE,
  RESI_KPIS, RESI_TICKET, RESI_DEVELOPERS, RESI_SEGMENTS,
  PITCH_COMPS, PITCH_INFRA, TEAM, TEAM_REASSIGN, ISSUES, ISSUE_KPIS,
  NOTIFICATIONS, CITY_DETAIL, CITY_INFRA, CITY_RERA, CITY_RERA_VALUES, CITY_MICROMARKETS, CITY_RELIANT,
  DATA_SOURCES,
});
