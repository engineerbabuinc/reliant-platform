import { useState, Fragment } from 'react';
import { LAND_PARCELS, TEAM, ISSUES, CITIES, SOURCES, formatCr } from '../data.js';
import { Icon, KPI, SectionHead, Source, Tabs, RankingBars, Modal } from './Primitives.jsx';
import { PageHead } from './Shell.jsx';

// ── Land Pitch Builder ──────────────────────────────────────────────────────

const USE_CASES = [
  { id: 'hospitality', label: 'Hospitality', icon: 'bed',       desc: '4–5 star hotel, serviced apartments, resort' },
  { id: 'healthcare',  label: 'Healthcare',  icon: 'building',  desc: 'Hospital, diagnostic centre, medical college' },
  { id: 'industrial',  label: 'Industrial',  icon: 'truck',     desc: 'Logistics park, warehousing, light manufacturing' },
  { id: 'commercial',  label: 'Commercial',  icon: 'briefcase', desc: 'Grade-A office, co-working, IT SEZ' },
  { id: 'residential', label: 'Residential', icon: 'home',      desc: 'Mid / high-rise housing, plotted development' },
  { id: 'mixed',       label: 'Mixed-Use',   icon: 'grid',      desc: 'Retail + office + residential integrated township' },
];

export function LandPitchTab() {
  const [step, setStep]       = useState(1);
  const [parcel, setParcel]   = useState(null);
  const [useCase, setUseCase] = useState(null);
  const [client, setClient]   = useState({ name: '', org: '', email: '' });

  const cityName = (id) => CITIES.find(c => c.id === id)?.name || id;

  function reset() { setStep(1); setParcel(null); setUseCase(null); setClient({ name:'', org:'', email:'' }); }

  return (
    <Fragment>
      <PageHead
        eyebrow="Reliant Intelligence Platform · FY26"
        title={<span>Land <em style={{ fontStyle:'italic' }}>Pitch</em> Builder</span>}
        sub="Four steps to a client-ready pitch deck. Print or save as PDF."
        actions={step > 1 && <button className="btn ghost sm" onClick={reset}><Icon name="arrow-right" size={12}/> Start over</button>}
      />

      {/* Step indicator */}
      <div className="row" style={{ gap: 0, marginBottom: 28, borderBottom: '1px solid var(--border-1)' }}>
        {['Parcel', 'Use case', 'Client', 'Preview'].map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const active = step === n;
          return (
            <div key={n} className="row" style={{ gap: 8, padding: '0 20px 0 0', marginBottom: -1, paddingBottom: 12,
              borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
              opacity: done || active ? 1 : 0.45, cursor: done ? 'pointer' : 'default' }}
              onClick={() => done && setStep(n)}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize: 11, fontWeight: 600,
                background: done ? 'var(--ok)' : active ? 'var(--accent)' : 'var(--border-1)',
                color: done || active ? 'white' : 'var(--fg-3)' }}>
                {done ? '✓' : n}
              </div>
              <span style={{ fontSize: 13, fontWeight: active ? 600 : 400 }}>{label}</span>
            </div>
          );
        })}
      </div>

      <div className="page-body" style={{ paddingTop: 0 }}>
        {step === 1 && <Step1 onSelect={p => { setParcel(p); setStep(2); }} cityName={cityName} />}
        {step === 2 && <Step2 parcel={parcel} onSelect={u => { setUseCase(u); setStep(3); }} cityName={cityName} />}
        {step === 3 && <Step3 client={client} setClient={setClient} onNext={() => setStep(4)} />}
        {step === 4 && <DeckPreview parcel={parcel} useCase={useCase} client={client} cityName={cityName} />}
      </div>
    </Fragment>
  );
}

function Step1({ onSelect, cityName }) {
  return (
    <Fragment>
      <SectionHead eyebrow="Step 1 of 4" title="Select a parcel" sub="Pick from the active Reliant land book." />
      <div className="grid cols-3">
        {LAND_PARCELS.map(p => (
          <div key={p.id} className="card" style={{ cursor:'pointer' }} onClick={() => onSelect(p)}>
            <div className="card-head">
              <div className="card-title">{p.area}</div>
              <span className="pill">{p.id}</span>
            </div>
            <div className="row" style={{ marginTop: 8, gap: 16 }}>
              <div className="col" style={{ gap: 2 }}>
                <div className="eyebrow">City</div>
                <div style={{ fontSize: 13 }}>{cityName(p.city)}</div>
              </div>
              <div className="col" style={{ gap: 2 }}>
                <div className="eyebrow">Acres</div>
                <div style={{ fontSize: 13 }}>{p.acres} ac</div>
              </div>
              <div className="col" style={{ gap: 2 }}>
                <div className="eyebrow">Zoning</div>
                <div style={{ fontSize: 13 }}>{p.zoning}</div>
              </div>
            </div>
            <div style={{ height: 1, background: 'var(--border-1)', margin: '12px 0' }} />
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>FSI {p.fsi} · Road {p.road_ft}ft · Airport {p.airport_km}km</span>
              <span className="metric-num" style={{ fontSize: 13 }}>₹{p.ask_cr_per_acre} Cr/ac</span>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

function Step2({ parcel, onSelect, cityName }) {
  return (
    <Fragment>
      <SectionHead eyebrow="Step 2 of 4" title="Choose a use case"
        sub={`Parcel: ${parcel.area}, ${cityName(parcel.city)} · ${parcel.acres} ac · ₹${parcel.ask_cr_per_acre} Cr/ac`} />
      <div className="grid cols-3">
        {USE_CASES.map(u => (
          <div key={u.id} className="card" style={{ cursor:'pointer' }} onClick={() => onSelect(u)}>
            <Icon name={u.icon} size={22} />
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 10 }}>{u.label}</div>
            <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>{u.desc}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

function Step3({ client, setClient, onNext }) {
  const ok = client.name && client.org;
  return (
    <Fragment>
      <SectionHead eyebrow="Step 3 of 4" title="Client details" sub="These appear on the cover page of the pitch deck." />
      <div className="card" style={{ maxWidth: 520 }}>
        <div className="col" style={{ gap: 16 }}>
          {[['name','Contact name','e.g. Ashish Gupta'],['org','Organisation','e.g. Apollo Hospitals'],['email','Email (optional)','e.g. ashish@example.com']].map(([k,l,ph]) => (
            <div key={k} className="col" style={{ gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-2)' }}>{l}</label>
              <input className="input" placeholder={ph} value={client[k]} onChange={e => setClient(c => ({ ...c, [k]: e.target.value }))} />
            </div>
          ))}
          <button className="btn primary" style={{ marginTop: 4, opacity: ok ? 1 : 0.5 }} disabled={!ok} onClick={onNext}>
            Generate deck <Icon name="arrow-right" size={14}/>
          </button>
        </div>
      </div>
    </Fragment>
  );
}

function DeckPreview({ parcel, useCase, client, cityName }) {
  const totalCr = (parcel.acres * parcel.ask_cr_per_acre).toFixed(1);
  const devPotSqft = Math.round(parcel.acres * 43560 * parcel.fsi / 1000) + 'k';

  const pages = [
    { label: 'Cover' },
    { label: 'Exec Summary' },
    { label: 'Site & Location' },
    { label: 'Market Context' },
    { label: 'Use Case' },
    { label: 'Commercials' },
    { label: 'Next Steps' },
  ];

  return (
    <Fragment>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <SectionHead eyebrow="Step 4 of 4" title="Deck preview" sub="7-page pitch deck — review, then print / save as PDF." />
        <button className="btn primary" onClick={() => window.print()}>
          <Icon name="download" size={14}/> Print / PDF
        </button>
      </div>

      <div className="deck-pages">
        {/* Page 1: Cover */}
        <div className="deck-page">
          <div style={{ flex: 1, display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
            <div className="eyebrow" style={{ marginBottom: 12, color: 'var(--accent)' }}>CONFIDENTIAL · RELIANT ASSOCIATES</div>
            <h1 style={{ fontFamily:'var(--font-serif)', fontSize: 42, lineHeight: 1.1, color: 'var(--fg-1)', marginBottom: 16 }}>
              {parcel.area}
            </h1>
            <div style={{ fontSize: 18, color: 'var(--fg-2)', marginBottom: 32 }}>
              {useCase.label} Opportunity · {cityName(parcel.city)}
            </div>
            <div style={{ display:'flex', gap: 40, color: 'var(--fg-3)', fontSize: 13 }}>
              <div><div className="eyebrow">Prepared for</div><div style={{ color:'var(--fg-1)', marginTop:4 }}>{client.name}</div><div>{client.org}</div></div>
              <div><div className="eyebrow">Prepared by</div><div style={{ color:'var(--fg-1)', marginTop:4 }}>Reliant Associates</div><div>Land Advisory</div></div>
              <div><div className="eyebrow">Date</div><div style={{ color:'var(--fg-1)', marginTop:4 }}>May 2026</div></div>
            </div>
          </div>
          <div style={{ marginTop: 40, padding: '20px 0', borderTop: '2px solid var(--accent)', display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>This document contains confidential and proprietary information of Reliant Associates.</span>
            <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>1 / 7</span>
          </div>
        </div>

        {/* Page 2: Exec Summary */}
        <div className="deck-page">
          <div className="eyebrow" style={{ marginBottom: 16, color: 'var(--accent)' }}>EXECUTIVE SUMMARY</div>
          <h2 className="section-title" style={{ marginBottom: 24 }}>The opportunity at a glance</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 20, marginBottom: 32 }}>
            {[
              ['Parcel', parcel.id],
              ['Location', `${parcel.area}, ${cityName(parcel.city)}`],
              ['Land area', `${parcel.acres} acres`],
              ['Zoning', parcel.zoning],
              ['FSI permissible', parcel.fsi + 'x'],
              ['Development potential', devPotSqft + ' sqft'],
              ['Ask price', `₹${parcel.ask_cr_per_acre} Cr/acre`],
              ['Total consideration', `₹${totalCr} Cr`],
              ['Proposed use', useCase.label],
            ].map(([k,v]) => (
              <div key={k} className="col" style={{ gap: 4 }}>
                <div className="eyebrow" style={{ fontSize: 10 }}>{k}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ background:'var(--bg-2)', borderRadius: 8, padding: 20, borderLeft:'3px solid var(--accent)' }}>
            <div style={{ fontSize: 13, lineHeight: 1.7 }}>
              This {parcel.acres}-acre {parcel.zoning.toLowerCase()} parcel in {parcel.area}, {cityName(parcel.city)},
              presents a rare opportunity for a {useCase.label.toLowerCase()} development. With {parcel.fsi}x permissible FSI,
              the site supports approximately {devPotSqft} sq ft of built-up area at an all-in land cost of ₹{totalCr} Cr.
              The site's proximity to key infrastructure — {parcel.airport_km} km to the nearest airport and {parcel.rail_km} km
              to the nearest rail — positions it well for {useCase.desc.toLowerCase()}.
            </div>
          </div>
          <div style={{ marginTop: 'auto', padding: '20px 0', borderTop: '1px solid var(--border-1)', display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>Reliant Associates · Confidential</span>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>2 / 7</span>
          </div>
        </div>

        {/* Page 3: Site & Location */}
        <div className="deck-page">
          <div className="eyebrow" style={{ marginBottom: 16, color: 'var(--accent)' }}>SITE & LOCATION</div>
          <h2 className="section-title" style={{ marginBottom: 24 }}>Location fundamentals</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20 }}>
            <div>
              <div className="col" style={{ gap: 14 }}>
                {[
                  ['Frontage road width', `${parcel.road_ft} ft`],
                  ['Distance to airport', `${parcel.airport_km} km`],
                  ['Distance to rail', `${parcel.rail_km} km`],
                  ['Permissible FSI', `${parcel.fsi}x`],
                  ['Current zoning', parcel.zoning],
                  ['City', cityName(parcel.city)],
                ].map(([k,v]) => (
                  <div key={k} className="row" style={{ justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border-1)' }}>
                    <span style={{ fontSize: 13, color:'var(--fg-3)' }}>{k}</span>
                    <span style={{ fontSize: 13, fontWeight:600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:'var(--bg-2)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', minHeight: 220 }}>
              <div className="col" style={{ alignItems:'center', gap:8, color:'var(--fg-3)' }}>
                <Icon name="map" size={32}/>
                <div style={{ fontSize: 12 }}>Site map placeholder</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 'auto', padding: '20px 0', borderTop: '1px solid var(--border-1)', display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>Reliant Associates · Confidential</span>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>3 / 7</span>
          </div>
        </div>

        {/* Page 4: Market Context */}
        <div className="deck-page">
          <div className="eyebrow" style={{ marginBottom: 16, color: 'var(--accent)' }}>MARKET CONTEXT</div>
          <h2 className="section-title" style={{ marginBottom: 24 }}>{cityName(parcel.city)} {useCase.label} market — FY26 snapshot</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
            {useCase.id === 'hospitality' && [
              ['RevPAR FY26','₹6,470'],['YoY growth','14.2%'],['Branded keys','178k'],
              ['Avg occ. rate','64.8%'],['Luxury ADR','₹12,400'],['New supply','28k keys'],
            ].map(([k,v]) => <StatBox key={k} label={k} value={v}/>)}
            {useCase.id === 'healthcare' && [
              ['ARPOB FY26','₹56,400'],['YoY growth','8.1%'],['Branded beds','218k'],
              ['Avg utilisation','64%'],['ICU premium','2.4x'],['New beds pipeline','18k'],
            ].map(([k,v]) => <StatBox key={k} label={k} value={v}/>)}
            {useCase.id === 'industrial' && [
              ['Absorption FY26','58.4 MSF'],['YoY growth','14.4%'],['Avg rent','₹24.2/sqft'],
              ['Vacancy','10.4%'],['Grade-A stock','820 MSF'],['New supply','48 MSF'],
            ].map(([k,v]) => <StatBox key={k} label={k} value={v}/>)}
            {useCase.id === 'commercial' && [
              ['Absorption FY26','76.4 MSF'],['YoY growth','9.6%'],['Avg rent','₹82/sqft/mo'],
              ['Vacancy','14.8%'],['Grade-A stock','1.2 BSF'],['Tech share','44%'],
            ].map(([k,v]) => <StatBox key={k} label={k} value={v}/>)}
            {useCase.id === 'residential' && [
              ['Sales FY26','502k units'],['YoY growth','8.2%'],['Avg PSF','₹8,420'],
              ['Months stock','22.4'],['Launches','484k units'],['Luxury share','18%'],
            ].map(([k,v]) => <StatBox key={k} label={k} value={v}/>)}
            {useCase.id === 'mixed' && [
              ['Total absorption','134 MSF'],['Residential sales','502k units'],['Commercial absorption','76 MSF'],
              ['Hospitality RevPAR','₹6,470'],['Industrial absorption','58 MSF'],['Healthcare ARPOB','₹56k'],
            ].map(([k,v]) => <StatBox key={k} label={k} value={v}/>)}
          </div>
          <div style={{ background:'var(--bg-2)', borderRadius:8, padding:16, fontSize: 13, lineHeight: 1.7 }}>
            {cityName(parcel.city)} is among India's top-tier real estate markets for {useCase.label.toLowerCase()} demand.
            FY26 data reflects strong fundamentals driven by infrastructure investment, expanding corporate presence, and rising
            domestic consumption. Reliant's proprietary data tracks 12 major cities across 6 asset classes.
          </div>
          <div style={{ marginTop: 'auto', padding: '20px 0', borderTop: '1px solid var(--border-1)', display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>Reliant Associates · Confidential</span>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>4 / 7</span>
          </div>
        </div>

        {/* Page 5: Use Case */}
        <div className="deck-page">
          <div className="eyebrow" style={{ marginBottom: 16, color: 'var(--accent)' }}>USE CASE RATIONALE</div>
          <h2 className="section-title" style={{ marginBottom: 24 }}>Why {useCase.label} on this site?</h2>
          <div className="col" style={{ gap: 16 }}>
            {[
              ['Strategic fit', `The ${parcel.zoning} zoning designation and ${parcel.fsi}x FSI make this parcel particularly well-suited for ${useCase.label.toLowerCase()} development. The ${parcel.road_ft}ft road frontage supports the required access infrastructure.`],
              ['Location advantage', `At ${parcel.airport_km} km from the nearest airport and ${parcel.rail_km} km from rail, the site offers connectivity benchmarks that match or exceed comparable ${useCase.label.toLowerCase()} assets in ${cityName(parcel.city)}.`],
              ['Demand drivers', `${cityName(parcel.city)}'s ${useCase.label.toLowerCase()} sector is growing at above-market rates in FY26. Reliant's pipeline tracking shows ${useCase.label === 'Hospitality' ? '14.2%' : useCase.id === 'healthcare' ? '8.1%' : useCase.id === 'industrial' ? '14.4%' : useCase.id === 'commercial' ? '9.6%' : '8.2%'} YoY improvement in key metrics.`],
              ['Risk considerations', `Key risks include regulatory approval timelines, construction cost escalation, and market absorption pace. Reliant recommends a phased development approach to de-risk the investment.`],
            ].map(([heading, text]) => (
              <div key={heading} style={{ padding: 16, background:'var(--bg-2)', borderRadius: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{heading}</div>
                <div style={{ fontSize: 13, color:'var(--fg-2)', lineHeight: 1.65 }}>{text}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', padding: '20px 0', borderTop: '1px solid var(--border-1)', display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>Reliant Associates · Confidential</span>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>5 / 7</span>
          </div>
        </div>

        {/* Page 6: Commercials */}
        <div className="deck-page">
          <div className="eyebrow" style={{ marginBottom: 16, color: 'var(--accent)' }}>COMMERCIALS & PROCESS</div>
          <h2 className="section-title" style={{ marginBottom: 24 }}>Indicative structure</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div className="col" style={{ gap: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Land economics</div>
              {[
                ['Land area', `${parcel.acres} acres`],
                ['Ask price', `₹${parcel.ask_cr_per_acre} Cr / acre`],
                ['Total land consideration', `₹${totalCr} Cr`],
                ['Development potential', `${devPotSqft} sqft`],
                ['Land cost per sqft', `₹${Math.round((parseFloat(totalCr) * 1e7) / (parcel.acres * 43560 * parcel.fsi)).toLocaleString('en-IN')}`],
              ].map(([k,v]) => (
                <div key={k} className="row" style={{ justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border-1)' }}>
                  <span style={{ fontSize: 13, color:'var(--fg-3)' }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="col" style={{ gap: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Indicative timeline</div>
              {[
                ['Due diligence & NDA', '2–3 weeks'],
                ['Detailed term sheet', '4–6 weeks'],
                ['Legal documentation', '6–8 weeks'],
                ['Registration', '8–12 weeks'],
                ['Total end-to-end', '~6 months'],
              ].map(([k,v]) => (
                <div key={k} className="row" style={{ justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border-1)' }}>
                  <span style={{ fontSize: 13, color:'var(--fg-3)' }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:'var(--warn-tint)', borderRadius:8, padding:16, fontSize: 12.5, color:'var(--fg-2)', lineHeight:1.65 }}>
            <strong>Disclaimer:</strong> All figures are indicative and for discussion purposes only. Reliant Associates does not
            guarantee any returns or valuations. Final terms subject to due diligence and regulatory approval.
          </div>
          <div style={{ marginTop: 'auto', padding: '20px 0', borderTop: '1px solid var(--border-1)', display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>Reliant Associates · Confidential</span>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>6 / 7</span>
          </div>
        </div>

        {/* Page 7: Next Steps */}
        <div className="deck-page">
          <div className="eyebrow" style={{ marginBottom: 16, color: 'var(--accent)' }}>NEXT STEPS</div>
          <h2 className="section-title" style={{ marginBottom: 24 }}>How to move forward</h2>
          <div className="col" style={{ gap: 16, flex: 1 }}>
            {[
              ['1', 'Sign NDA', 'Execute a mutual non-disclosure agreement to unlock detailed financials, legal title documents, and site survey reports.'],
              ['2', 'Site visit', "Reliant to organise a guided site visit with the landowner's representative. Typically within 2 weeks of NDA execution."],
              ['3', 'Due diligence', 'Engage your legal, technical, and financial advisors for a 4–6 week DD process. Reliant will co-ordinate data room access.'],
              ['4', 'Term sheet', 'Once DD is satisfactory, Reliant will facilitate exchange of a non-binding term sheet between buyer and seller.'],
              ['5', 'Close', 'Final documentation, registration, and handover per agreed timeline. Reliant remains engaged through closing.'],
            ].map(([n, heading, text]) => (
              <div key={n} className="row" style={{ gap: 16, alignItems:'flex-start' }}>
                <div style={{ minWidth: 32, height: 32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                  background:'var(--accent)', color:'white', fontWeight:700, fontSize: 14 }}>{n}</div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>{heading}</div>
                  <div style={{ fontSize: 13, color:'var(--fg-2)', lineHeight: 1.65 }}>{text}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, padding: 20, background:'var(--bg-2)', borderRadius: 8, textAlign:'center' }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 6 }}>Your Reliant contact</div>
            <div style={{ fontSize: 13, color:'var(--fg-2)' }}>Diya Mehta — VP, Land Advisory · diya.mehta@reliant.in · +91 98200 00001</div>
          </div>
          <div style={{ padding: '20px 0', borderTop: '1px solid var(--border-1)', display:'flex', justifyContent:'space-between', marginTop: 24 }}>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>Reliant Associates · Confidential</span>
            <span style={{ fontSize: 11, color:'var(--fg-3)' }}>7 / 7</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={{ padding: 14, background:'var(--bg-2)', borderRadius: 8 }}>
      <div className="eyebrow" style={{ fontSize: 10, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

// ── Team & Assignments ──────────────────────────────────────────────────────

export function TeamTab() {
  const totalGCI = TEAM.reduce((s, m) => s + m.gci_ytd_cr, 0).toFixed(1);
  const avgUtil = Math.round(TEAM.reduce((s, m) => s + m.util, 0) / TEAM.length);
  const activeDeals = TEAM.reduce((s, m) => s + m.deals_active, 0);

  return (
    <Fragment>
      <PageHead
        eyebrow="Reliant Intelligence Platform · FY26"
        title={<span>Team & <em style={{ fontStyle:'italic' }}>Assignments</em></span>}
        sub="Roster, utilisation, and GCI by team member — FY26 YTD."
        actions={<Fragment>
          <button className="btn"><Icon name="download" size={14}/> Export</button>
          <button className="btn primary"><Icon name="plus" size={14}/> Add member</button>
        </Fragment>}
      />

      <div className="grid cols-4" style={{ marginBottom: 24 }}>
        <KPI label="Team size" value={TEAM.length} />
        <KPI label="Avg utilisation" value={avgUtil} unit="%" delta={3.2} sub="vs FY25" />
        <KPI label="Active deals" value={activeDeals} delta={12.0} />
        <KPI label="GCI YTD" value={'₹' + totalGCI} unit=" Cr" delta={18.4} />
      </div>

      <div className="grid cols-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <SectionHead eyebrow="Utilisation" title="By team member" sub="% of capacity allocated to active mandates, FY26"/>
          <RankingBars
            data={[...TEAM].sort((a,b) => b.util - a.util).slice(0,8).map(m => ({ label: m.name.split(' ')[0] + ' ' + m.name.split(' ')[1][0] + '.', value: m.util }))}
            valueKey="value" labelKey="label"
            formatV={v => v + '%'}
            color="var(--accent)"
          />
        </div>
        <div className="card">
          <SectionHead eyebrow="GCI" title="By team member" sub="Gross commission income, ₹ Cr, FY26 YTD"/>
          <RankingBars
            data={[...TEAM].filter(m => m.gci_ytd_cr > 0).sort((a,b) => b.gci_ytd_cr - a.gci_ytd_cr).map(m => ({ label: m.name.split(' ')[0] + ' ' + m.name.split(' ')[1][0] + '.', value: m.gci_ytd_cr }))}
            valueKey="value" labelKey="label"
            formatV={v => '₹' + v + ' Cr'}
            color="var(--ink-900)"
          />
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
          <table className="tbl">
            <thead><tr>
              <th>Name</th><th>Role</th><th>Sector</th><th>City</th>
              <th className="right">Utilisation</th><th className="right">Active deals</th><th className="right">GCI YTD</th>
            </tr></thead>
            <tbody>
              {TEAM.map(m => (
                <tr key={m.id} className="clickable">
                  <td>
                    <div className="row" style={{ gap: 8 }}>
                      <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--bg-3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize: 11, fontWeight: 700, color:'var(--fg-2)', flexShrink:0 }}>
                        {m.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                      </div>
                      <div style={{ fontSize: 13.5 }}>{m.name}</div>
                    </div>
                  </td>
                  <td className="muted">{m.role}</td>
                  <td className="muted">{m.sector}</td>
                  <td className="muted">{CITIES.find(c=>c.id===m.city)?.short || m.city}</td>
                  <td className="num">
                    <div className="row" style={{ justifyContent:'flex-end', gap: 8 }}>
                      <div style={{ width: 60, height: 5, background:'var(--border-1)', borderRadius: 3 }}>
                        <div style={{ width: m.util+'%', height:'100%', background: m.util > 85 ? 'var(--bad)' : m.util > 75 ? 'var(--warn)' : 'var(--ok)', borderRadius:3 }}/>
                      </div>
                      <span>{m.util}%</span>
                    </div>
                  </td>
                  <td className="num">{m.deals_active}</td>
                  <td className="num">{m.gci_ytd_cr > 0 ? '₹' + m.gci_ytd_cr.toFixed(1) + ' Cr' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

// ── Issue Tracker ───────────────────────────────────────────────────────────

const SEV_COLOR = { High: 'bad', Med: 'warn', Low: 'info' };
const STATUS_COLOR = { Open: 'warn', 'In review': 'info', Blocked: 'bad', Resolved: 'ok', "Won't fix": '' };

export function IssuesTab() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]     = useState('All');

  const statuses = ['All', 'Open', 'In review', 'Blocked', 'Resolved', "Won't fix"];
  const visible  = filter === 'All' ? ISSUES : ISSUES.filter(i => i.status === filter);
  const openCnt  = ISSUES.filter(i => ['Open','In review','Blocked'].includes(i.status)).length;

  return (
    <Fragment>
      <PageHead
        eyebrow="Reliant Intelligence Platform · FY26"
        title={<span>Issue <em style={{ fontStyle:'italic' }}>Tracker</em></span>}
        sub="Data quality, UX bugs, and integration issues flagged by the team."
        actions={<button className="btn primary"><Icon name="plus" size={14}/> New issue</button>}
      />

      <div className="grid cols-4" style={{ marginBottom: 24 }}>
        <KPI label="Open" value={ISSUES.filter(i=>i.status==='Open').length} />
        <KPI label="In review" value={ISSUES.filter(i=>i.status==='In review').length} />
        <KPI label="Blocked" value={ISSUES.filter(i=>i.status==='Blocked').length} />
        <KPI label="Resolved" value={ISSUES.filter(i=>i.status==='Resolved').length} />
      </div>

      <div className="row" style={{ gap: 8, marginBottom: 16 }}>
        {statuses.map(s => (
          <button key={s} className={`btn ${filter === s ? 'primary' : 'ghost'} sm`} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
          <table className="tbl">
            <thead><tr>
              <th>ID</th><th>Title</th><th>Area</th><th>Severity</th><th>Status</th><th>Owner</th><th>Opened</th>
            </tr></thead>
            <tbody>
              {visible.map((iss, i) => (
                <tr key={iss.id} className="clickable" onClick={() => setSelected(iss)}>
                  <td style={{ fontFamily:'var(--font-mono)', fontSize: 12 }}>{iss.id}</td>
                  <td style={{ maxWidth: 380 }}>{iss.title}</td>
                  <td className="muted">{iss.area}</td>
                  <td><span className={`pill ${SEV_COLOR[iss.severity] || ''}`}>{iss.severity}</span></td>
                  <td><span className={`pill ${STATUS_COLOR[iss.status] || ''}`}>{iss.status}</span></td>
                  <td className="muted">{iss.owner}</td>
                  <td className="muted" style={{ fontFamily:'var(--font-mono)', fontSize: 12 }}>{iss.opened}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <Modal title={selected.id} onClose={() => setSelected(null)}>
          <div className="col" style={{ gap: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>{selected.title}</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12 }}>
              {[
                ['Severity', <span className={`pill ${SEV_COLOR[selected.severity]}`}>{selected.severity}</span>],
                ['Status',   <span className={`pill ${STATUS_COLOR[selected.status] || ''}`}>{selected.status}</span>],
                ['Area',     selected.area],
                ['Owner',    selected.owner],
                ['Opened',   selected.opened],
              ].map(([k,v]) => (
                <div key={k} className="col" style={{ gap: 4 }}>
                  <div className="eyebrow">{k}</div>
                  <div style={{ fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background:'var(--border-1)' }}/>
            <div style={{ fontSize: 13, color:'var(--fg-3)' }}>
              No comments yet. Use the comment box below to add context.
            </div>
            <textarea className="input" rows={3} placeholder="Add a comment…" style={{ resize:'vertical', fontFamily:'inherit', fontSize:13 }}/>
            <div className="row" style={{ justifyContent:'flex-end', gap:8 }}>
              <button className="btn ghost sm" onClick={() => setSelected(null)}>Cancel</button>
              <button className="btn primary sm">Save comment</button>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}
