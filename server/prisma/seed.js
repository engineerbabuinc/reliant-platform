const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database…');

  await prisma.issueComment.deleteMany();
  await prisma.issue.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.pipelineStage.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.landParcel.deleteMany();
  await prisma.notification.deleteMany();

  await prisma.pipelineStage.createMany({ data: [
    { stage:'Identified',   count:184, valueCr:14200, order:1 },
    { stage:'Qualified',    count:112, valueCr: 9840, order:2 },
    { stage:'Pitched',      count: 68, valueCr: 6420, order:3 },
    { stage:'Term sheet',   count: 34, valueCr: 3640, order:4 },
    { stage:'In execution', count: 18, valueCr: 2210, order:5 },
    { stage:'Closed FY26',  count: 42, valueCr: 4640, order:6 },
  ]});

  await prisma.deal.createMany({ data: [
    { name:'BKC tower → Marriott conversion',  sector:'hospitality', stage:'Term sheet',   city:'mum', valueCr: 480,  owner:'A. Khanna',   hot:true  },
    { name:'Manipal Hyd 300-bed plot',          sector:'healthcare',  stage:'Pitched',      city:'hyd', valueCr: 220,  owner:'P. Banerjee', hot:true  },
    { name:'Foxconn Sriperumbudur BTS',         sector:'industrial',  stage:'Qualified',    city:'che', valueCr:1240,  owner:'R. Iyer',     hot:true  },
    { name:'JP Morgan Bengaluru ORR campus',    sector:'commercial',  stage:'Pitched',      city:'blr', valueCr: 940,  owner:'S. Menon',    hot:true  },
    { name:'Lodha Thane mid-rise tranche',      sector:'residential', stage:'In execution', city:'mum', valueCr: 320,  owner:'V. Rao',      hot:true  },
    { name:'Sohna 24-acre mixed-use',           sector:'land',        stage:'Term sheet',   city:'del', valueCr: 308,  owner:'D. Mehta',    hot:true  },
    { name:'Aerocity plot — Hilton upscale',    sector:'hospitality', stage:'Qualified',    city:'del', valueCr: 540,  owner:'A. Khanna',   hot:false },
    { name:'Chakan BTS — DHL 4.5L sqft',        sector:'industrial',  stage:'Identified',   city:'pun', valueCr: 180,  owner:'R. Iyer',     hot:false },
    { name:'Apollo Chennai 200-bed',            sector:'healthcare',  stage:'Identified',   city:'che', valueCr: 120,  owner:'P. Banerjee', hot:false },
    { name:'Whitefield Grade-A infill',         sector:'commercial',  stage:'Identified',   city:'blr', valueCr: 640,  owner:'S. Menon',    hot:false },
  ]});

  await prisma.issue.createMany({ data: [
    { id:'RIP-2841', title:'Hospitality Q3 RevPAR formula uses calendar Q not fiscal Q', severity:'High', status:'In review', owner:'A. Khanna',   area:'Hospitality / Calc', opened:'2026-04-22' },
    { id:'RIP-2840', title:'Industrial submarket "Sanand" rolls up to Pan-IN twice',     severity:'High', status:'Open',      owner:'R. Iyer',     area:'Industrial / Data', opened:'2026-04-21' },
    { id:'RIP-2837', title:"Pan-India market filter doesn't reset chart legends",         severity:'Med',  status:'Open',      owner:'V. Rao',      area:'UX / Charts',       opened:'2026-04-19' },
    { id:'RIP-2829', title:'Healthcare ARPOB tooltip shows monthly when source is daily', severity:'Med',  status:'Open',      owner:'A. Khanna',   area:'Healthcare / Calc', opened:'2026-04-15' },
    { id:'RIP-2811', title:'Land Pitch deck print scales to 80% on Chrome/Mac',          severity:'Low',  status:'In review', owner:'P. Banerjee', area:'Pitch Builder',     opened:'2026-04-09' },
    { id:'RIP-2795', title:"Drawer doesn't close on Esc when search is focused",         severity:'Low',  status:'Open',      owner:'V. Rao',      area:'UX / Shell',        opened:'2026-04-02' },
    { id:'RIP-2790', title:'CRM live toggle shows stale opportunity count',              severity:'Med',  status:'Blocked',   owner:'D. Mehta',    area:'Integrations',      opened:'2026-03-29' },
    { id:'RIP-2782', title:'Residential PSF for Goa not weighted by inventory',          severity:'Med',  status:'Open',      owner:'A. Khanna',   area:'Residential / Calc',opened:'2026-03-25' },
    { id:'RIP-2774', title:"Sidebar nav order doesn't match v2 IA",                      severity:'Low',  status:"Won't fix", owner:'V. Rao',      area:'UX',                opened:'2026-03-20' },
    { id:'RIP-2768', title:'Commercial chart: Q4 vs Q3 yoy color reversed',              severity:'Low',  status:'Resolved',  owner:'V. Rao',      area:'UX / Charts',       opened:'2026-03-14' },
  ]});

  await prisma.teamMember.createMany({ data: [
    { id:'rk', name:'Rajiv Kapur',     role:'Managing Director',      sector:'All',         city:'mum', util:76, dealsActive:4, gciYtdCr:18.4 },
    { id:'ak', name:'Aanya Khanna',    role:'Director — Capital Mkts', sector:'Hospitality', city:'mum', util:84, dealsActive:6, gciYtdCr:12.6 },
    { id:'ri', name:'Rohan Iyer',      role:'Principal — Industrial',  sector:'Industrial',  city:'pun', util:82, dealsActive:8, gciYtdCr:9.4  },
    { id:'pb', name:'Priya Banerjee',  role:'Principal — Healthcare',  sector:'Healthcare',  city:'blr', util:78, dealsActive:5, gciYtdCr:7.8  },
    { id:'sm', name:'Siddharth Menon', role:'Director — Commercial',   sector:'Commercial',  city:'blr', util:80, dealsActive:7, gciYtdCr:11.2 },
    { id:'vr', name:'Vikram Rao',      role:'VP — Residential',        sector:'Residential', city:'del', util:74, dealsActive:6, gciYtdCr:8.6  },
    { id:'dm', name:'Diya Mehta',      role:'VP — Land Advisory',      sector:'Land',        city:'hyd', util:70, dealsActive:4, gciYtdCr:6.4  },
    { id:'nk', name:'Neha Kapoor',     role:'Senior Associate',        sector:'Hospitality', city:'del', util:88, dealsActive:5, gciYtdCr:4.2  },
    { id:'as', name:'Arjun Saxena',    role:'Senior Associate',        sector:'Industrial',  city:'che', util:86, dealsActive:6, gciYtdCr:3.8  },
    { id:'mp', name:'Meera Pillai',    role:'Senior Associate',        sector:'Commercial',  city:'mum', util:72, dealsActive:4, gciYtdCr:3.4  },
    { id:'rj', name:'Rahul Jain',      role:'Associate',               sector:'Residential', city:'pun', util:68, dealsActive:3, gciYtdCr:2.1  },
    { id:'ts', name:'Tara Shetty',     role:'Associate',               sector:'Healthcare',  city:'blr', util:64, dealsActive:3, gciYtdCr:1.9  },
    { id:'kn', name:'Kabir Narang',    role:'Analyst',                 sector:'Land',        city:'mum', util:92, dealsActive:0, gciYtdCr:0    },
    { id:'in', name:'Ishita Nair',     role:'Analyst',                 sector:'Hospitality', city:'mum', util:88, dealsActive:0, gciYtdCr:0    },
    { id:'sp', name:'Suhas Pai',       role:'Analyst',                 sector:'Industrial',  city:'pun', util:90, dealsActive:0, gciYtdCr:0    },
  ]});

  await prisma.landParcel.createMany({ data: [
    { id:'L-2401', city:'pun', area:'Hinjewadi Phase 4',       acres:8.2,  fsi:2.5, zoning:'Mixed-Use',   askCrPerAcre:14.0, roadFt:80,  airportKm:28, railKm:6  },
    { id:'L-2402', city:'blr', area:'Devanahalli Airport Belt', acres:22.0, fsi:1.5, zoning:'Industrial',  askCrPerAcre:6.4,  roadFt:100, airportKm:4,  railKm:22 },
    { id:'L-2403', city:'hyd', area:'Patancheru',               acres:14.4, fsi:1.5, zoning:'Industrial',  askCrPerAcre:4.8,  roadFt:100, airportKm:28, railKm:4  },
    { id:'L-2404', city:'mum', area:'Bhiwandi (Kalyan-Murbad)', acres:18.0, fsi:1.5, zoning:'Industrial',  askCrPerAcre:9.4,  roadFt:80,  airportKm:38, railKm:5  },
    { id:'L-2405', city:'del', area:'Sohna Master Plan',        acres:24.0, fsi:1.75,zoning:'Mixed-Use',   askCrPerAcre:12.8, roadFt:90,  airportKm:32, railKm:8  },
    { id:'L-2406', city:'goa', area:'North Goa — Morjim',       acres:4.4,  fsi:1.0, zoning:'Hospitality', askCrPerAcre:28.0, roadFt:40,  airportKm:38, railKm:14 },
    { id:'L-2407', city:'che', area:'Sriperumbudur',            acres:32.0, fsi:1.5, zoning:'Industrial',  askCrPerAcre:5.6,  roadFt:100, airportKm:24, railKm:6  },
    { id:'L-2408', city:'jai', area:'Mahindra SEZ Ring',        acres:12.0, fsi:1.5, zoning:'Industrial',  askCrPerAcre:3.8,  roadFt:80,  airportKm:18, railKm:9  },
  ]});

  await prisma.notification.createMany({ data: [
    { title:'New healthcare RFP — Apollo Pune 250-bed',          cat:'requirement', time:'2h' },
    { title:'Goa hospitality deal closed — South Goa, 184 keys', cat:'deal',        time:'5h' },
    { title:'Q4 FY26 hospitality data refreshed',                cat:'data',        time:'1d' },
    { title:'Vikram Rao opened pitch for Sohna 24-acre',         cat:'team',        time:'1d' },
    { title:'CRM sync warning — 3 stale opportunities',          cat:'system',      time:'2d' },
  ]});

  console.log('✅ Seed complete');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
