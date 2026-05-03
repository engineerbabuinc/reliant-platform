import { useState, Fragment } from 'react';
import { CITIES } from '../data.js';
import { Icon, KPI, SectionHead, Tabs, RankingBars, Modal } from './Primitives.jsx';
import { PageHead } from './Shell.jsx';
import { useData } from '../hooks/useData.js';
import { api } from '../api.js';

function Spinner() {
  return <div className="loading-row"><div className="spinner"/><span>Loading…</span></div>;
}
function Err({ msg }) {
  return <div className="error-row"><Icon name="alert" size={15}/>{msg}</div>;
}
function Field({ label, children }) {
  return <div className="col" style={{ gap:5 }}><label style={{ fontSize:12, fontWeight:600, color:'var(--fg-2)' }}>{label}</label>{children}</div>;
}

// ── Land Pitch Builder ──────────────────────────────────────────────────────

const USE_CASES = [
  { id:'hospitality', label:'Hospitality', icon:'bed',       desc:'4–5 star hotel, serviced apartments, resort' },
  { id:'healthcare',  label:'Healthcare',  icon:'building',  desc:'Hospital, diagnostic centre, medical college' },
  { id:'industrial',  label:'Industrial',  icon:'truck',     desc:'Logistics park, warehousing, light manufacturing' },
  { id:'commercial',  label:'Commercial',  icon:'briefcase', desc:'Grade-A office, co-working, IT SEZ' },
  { id:'residential', label:'Residential', icon:'home',      desc:'Mid / high-rise housing, plotted development' },
  { id:'mixed',       label:'Mixed-Use',   icon:'grid',      desc:'Retail + office + residential integrated township' },
];

export function LandPitchTab() {
  const [step,    setStep]    = useState(1);
  const [parcel,  setParcel]  = useState(null);
  const [useCase, setUseCase] = useState(null);
  const [client,  setClient]  = useState({ name:'', org:'', email:'' });
  const { data: parcels, loading, error, reload } = useData(api.landParcels.list);

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
      <div className="row" style={{ gap:0, marginBottom:28, borderBottom:'1px solid var(--border-1)', padding:'0 32px' }}>
        {['Parcel','Use case','Client','Preview'].map((label,i) => {
          const n = i+1, done = step>n, active = step===n;
          return (
            <div key={n} className="row" style={{ gap:8, padding:'0 20px 0 0', marginBottom:-1, paddingBottom:12,
              borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
              opacity: done||active ? 1 : 0.45, cursor: done ? 'pointer' : 'default' }}
              onClick={() => done && setStep(n)}>
              <div style={{ width:20, height:20, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:600,
                background: done ? 'var(--ok)' : active ? 'var(--accent)' : 'var(--border-1)',
                color: done||active ? 'white' : 'var(--fg-3)' }}>
                {done ? '✓' : n}
              </div>
              <span style={{ fontSize:13, fontWeight: active ? 600 : 400 }}>{label}</span>
            </div>
          );
        })}
      </div>

      <div className="page-body" style={{ paddingTop:0 }}>
        {step===1 && (loading ? <Spinner/> : error ? <Err msg={error}/> :
          <Step1 parcels={parcels||[]} onSelect={p=>{setParcel(p);setStep(2);}} cityName={cityName} onReload={reload}/>
        )}
        {step===2 && <Step2 parcel={parcel} onSelect={u=>{setUseCase(u);setStep(3);}} cityName={cityName}/>}
        {step===3 && <Step3 client={client} setClient={setClient} onNext={()=>setStep(4)}/>}
        {step===4 && <DeckPreview parcel={parcel} useCase={useCase} client={client} cityName={cityName}/>}
      </div>
    </Fragment>
  );
}

function Step1({ parcels, onSelect, cityName, onReload }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ city:'mum', area:'', acres:'', fsi:'1.5', zoning:'Mixed-Use', askCrPerAcre:'', roadFt:'60', airportKm:'', railKm:'' });

  async function addParcel() {
    await api.landParcels.create({ ...form, acres:+form.acres, fsi:+form.fsi, askCrPerAcre:+form.askCrPerAcre, roadFt:+form.roadFt, airportKm:+form.airportKm, railKm:+form.railKm });
    setShowAdd(false);
    onReload();
  }

  async function deleteParcel(id, e) {
    e.stopPropagation();
    if (!confirm('Remove this parcel?')) return;
    await api.landParcels.remove(id);
    onReload();
  }

  return (
    <Fragment>
      <div className="row" style={{ justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
        <SectionHead eyebrow="Step 1 of 4" title="Select a parcel" sub="Pick from the active Reliant land book."/>
        <button className="btn primary sm" onClick={()=>setShowAdd(true)}><Icon name="plus" size={13}/> Add parcel</button>
      </div>
      <div className="grid cols-3">
        {parcels.map(p => (
          <div key={p.id} className="card" style={{ cursor:'pointer', position:'relative' }} onClick={()=>onSelect(p)}>
            <div className="card-head">
              <div className="card-title">{p.area}</div>
              <div className="row" style={{ gap:6 }}>
                <span className="pill">{p.id}</span>
                <button className="icon-btn" style={{ color:'var(--bad)' }} title="Remove" onClick={e=>deleteParcel(p.id,e)}><Icon name="x" size={12}/></button>
              </div>
            </div>
            <div className="row" style={{ marginTop:8, gap:16 }}>
              <div className="col" style={{ gap:2 }}><div className="eyebrow">City</div><div style={{ fontSize:13 }}>{cityName(p.city)}</div></div>
              <div className="col" style={{ gap:2 }}><div className="eyebrow">Acres</div><div style={{ fontSize:13 }}>{p.acres} ac</div></div>
              <div className="col" style={{ gap:2 }}><div className="eyebrow">Zoning</div><div style={{ fontSize:13 }}>{p.zoning}</div></div>
            </div>
            <div style={{ height:1, background:'var(--border-1)', margin:'12px 0' }}/>
            <div className="row" style={{ justifyContent:'space-between' }}>
              <span style={{ fontSize:12, color:'var(--fg-3)' }}>FSI {p.fsi} · Road {p.roadFt}ft · Airport {p.airportKm}km</span>
              <span className="metric-num" style={{ fontSize:13 }}>₹{p.askCrPerAcre} Cr/ac</span>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <Modal title="Add parcel" onClose={()=>setShowAdd(false)}>
          <div className="col" style={{ gap:13 }}>
            <div className="grid cols-2">
              <Field label="City">
                <select className="input select" value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))}>
                  {CITIES.filter(c=>c.id!=='pan').map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Zoning">
                <select className="input select" value={form.zoning} onChange={e=>setForm(p=>({...p,zoning:e.target.value}))}>
                  {['Mixed-Use','Industrial','Hospitality','Commercial','Residential','Agricultural'].map(z=><option key={z}>{z}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Area / locality name"><input className="input" value={form.area} onChange={e=>setForm(p=>({...p,area:e.target.value}))} placeholder="e.g. Hinjewadi Phase 4"/></Field>
            <div className="grid cols-3">
              <Field label="Acres"><input className="input" type="number" value={form.acres} onChange={e=>setForm(p=>({...p,acres:e.target.value}))} placeholder="0"/></Field>
              <Field label="FSI"><input className="input" type="number" step="0.25" value={form.fsi} onChange={e=>setForm(p=>({...p,fsi:e.target.value}))}/></Field>
              <Field label="Ask (₹ Cr/ac)"><input className="input" type="number" value={form.askCrPerAcre} onChange={e=>setForm(p=>({...p,askCrPerAcre:e.target.value}))} placeholder="0"/></Field>
            </div>
            <div className="grid cols-3">
              <Field label="Road (ft)"><input className="input" type="number" value={form.roadFt} onChange={e=>setForm(p=>({...p,roadFt:e.target.value}))}/></Field>
              <Field label="Airport (km)"><input className="input" type="number" value={form.airportKm} onChange={e=>setForm(p=>({...p,airportKm:e.target.value}))} placeholder="0"/></Field>
              <Field label="Rail (km)"><input className="input" type="number" value={form.railKm} onChange={e=>setForm(p=>({...p,railKm:e.target.value}))} placeholder="0"/></Field>
            </div>
            <div className="row" style={{ justifyContent:'flex-end', gap:8 }}>
              <button className="btn ghost sm" onClick={()=>setShowAdd(false)}>Cancel</button>
              <button className="btn primary sm" disabled={!form.area||!form.acres} onClick={addParcel}>Add parcel</button>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}

function Step2({ parcel, onSelect, cityName }) {
  return (
    <Fragment>
      <SectionHead eyebrow="Step 2 of 4" title="Choose a use case"
        sub={`Parcel: ${parcel.area}, ${cityName(parcel.city)} · ${parcel.acres} ac · ₹${parcel.askCrPerAcre} Cr/ac`}/>
      <div className="grid cols-3">
        {USE_CASES.map(u => (
          <div key={u.id} className="card" style={{ cursor:'pointer' }} onClick={()=>onSelect(u)}>
            <Icon name={u.icon} size={22}/>
            <div style={{ fontSize:15, fontWeight:600, marginTop:10 }}>{u.label}</div>
            <div style={{ fontSize:13, color:'var(--fg-3)', marginTop:4 }}>{u.desc}</div>
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
      <SectionHead eyebrow="Step 3 of 4" title="Client details" sub="These appear on the cover page of the pitch deck."/>
      <div className="card" style={{ maxWidth:520 }}>
        <div className="col" style={{ gap:16 }}>
          {[['name','Contact name','e.g. Ashish Gupta'],['org','Organisation','e.g. Apollo Hospitals'],['email','Email (optional)','e.g. ashish@example.com']].map(([k,l,ph])=>(
            <div key={k} className="col" style={{ gap:6 }}>
              <label style={{ fontSize:12, fontWeight:600, color:'var(--fg-2)' }}>{l}</label>
              <input className="input" placeholder={ph} value={client[k]} onChange={e=>setClient(c=>({...c,[k]:e.target.value}))}/>
            </div>
          ))}
          <button className="btn primary" style={{ marginTop:4, opacity:ok?1:0.5 }} disabled={!ok} onClick={onNext}>
            Generate deck <Icon name="arrow-right" size={14}/>
          </button>
        </div>
      </div>
    </Fragment>
  );
}

function DeckPreview({ parcel, useCase, client, cityName }) {
  const totalCr   = (parcel.acres * parcel.askCrPerAcre).toFixed(1);
  const devPotSqft = Math.round(parcel.acres * 43560 * parcel.fsi / 1000) + 'k';
  return (
    <Fragment>
      <div className="row" style={{ justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <SectionHead eyebrow="Step 4 of 4" title="Deck preview" sub="7-page pitch deck — review, then print / save as PDF."/>
        <button className="btn primary" onClick={()=>window.print()}><Icon name="download" size={14}/> Print / PDF</button>
      </div>
      <div className="deck-pages">
        {/* Page 1 */}
        <div className="deck-page">
          <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
            <div className="eyebrow" style={{ marginBottom:12, color:'var(--accent)' }}>CONFIDENTIAL · RELIANT ASSOCIATES</div>
            <h1 style={{ fontFamily:'var(--font-serif)', fontSize:42, lineHeight:1.1, color:'var(--fg-1)', marginBottom:16 }}>{parcel.area}</h1>
            <div style={{ fontSize:18, color:'var(--fg-2)', marginBottom:32 }}>{useCase.label} Opportunity · {cityName(parcel.city)}</div>
            <div style={{ display:'flex', gap:40, color:'var(--fg-3)', fontSize:13 }}>
              <div><div className="eyebrow">Prepared for</div><div style={{ color:'var(--fg-1)', marginTop:4 }}>{client.name}</div><div>{client.org}</div></div>
              <div><div className="eyebrow">Prepared by</div><div style={{ color:'var(--fg-1)', marginTop:4 }}>Reliant Associates</div><div>Land Advisory</div></div>
              <div><div className="eyebrow">Date</div><div style={{ color:'var(--fg-1)', marginTop:4 }}>May 2026</div></div>
            </div>
          </div>
          <div style={{ marginTop:40, padding:'20px 0', borderTop:'2px solid var(--accent)', display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize:12, color:'var(--fg-3)' }}>This document contains confidential and proprietary information.</span>
            <span style={{ fontSize:12, color:'var(--fg-3)' }}>1 / 7</span>
          </div>
        </div>
        {/* Page 2 */}
        <div className="deck-page">
          <div className="eyebrow" style={{ marginBottom:16, color:'var(--accent)' }}>EXECUTIVE SUMMARY</div>
          <h2 className="section-title" style={{ marginBottom:24 }}>The opportunity at a glance</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20, marginBottom:32 }}>
            {[['Parcel',parcel.id],['Location',`${parcel.area}, ${cityName(parcel.city)}`],['Land area',`${parcel.acres} acres`],
              ['Zoning',parcel.zoning],['FSI permissible',parcel.fsi+'x'],['Development potential',devPotSqft+' sqft'],
              ['Ask price',`₹${parcel.askCrPerAcre} Cr/acre`],['Total consideration',`₹${totalCr} Cr`],['Proposed use',useCase.label],
            ].map(([k,v])=>(
              <div key={k} className="col" style={{ gap:4 }}>
                <div className="eyebrow" style={{ fontSize:10 }}>{k}</div>
                <div style={{ fontSize:14, fontWeight:600 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ background:'var(--bg-2)', borderRadius:8, padding:20, borderLeft:'3px solid var(--accent)' }}>
            <div style={{ fontSize:13, lineHeight:1.7 }}>
              This {parcel.acres}-acre {parcel.zoning.toLowerCase()} parcel in {parcel.area}, {cityName(parcel.city)}, presents a rare opportunity for {useCase.label.toLowerCase()} development. With {parcel.fsi}x permissible FSI, the site supports approximately {devPotSqft} sq ft of built-up area at an all-in land cost of ₹{totalCr} Cr.
            </div>
          </div>
          <div style={{ marginTop:'auto', padding:'20px 0', borderTop:'1px solid var(--border-1)', display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize:11, color:'var(--fg-3)' }}>Reliant Associates · Confidential</span><span style={{ fontSize:11, color:'var(--fg-3)' }}>2 / 7</span>
          </div>
        </div>
        {/* Pages 3–7: site, market, use case, commercials, next steps */}
        {[
          ['SITE & LOCATION','Location fundamentals',
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              <div className="col" style={{ gap:12 }}>
                {[['Frontage road width',`${parcel.roadFt} ft`],['Distance to airport',`${parcel.airportKm} km`],['Distance to rail',`${parcel.railKm} km`],['Permissible FSI',`${parcel.fsi}x`],['Current zoning',parcel.zoning],['City',cityName(parcel.city)]].map(([k,v])=>(
                  <div key={k} className="row" style={{ justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border-1)' }}>
                    <span style={{ fontSize:13, color:'var(--fg-3)' }}>{k}</span><span style={{ fontSize:13, fontWeight:600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background:'var(--bg-2)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', minHeight:220 }}>
                <div className="col" style={{ alignItems:'center', gap:8, color:'var(--fg-3)' }}><Icon name="map" size={32}/><div style={{ fontSize:12 }}>Site map placeholder</div></div>
              </div>
            </div>, '3'],
          ['USE CASE RATIONALE',`Why ${useCase.label} on this site?`,
            <div className="col" style={{ gap:14 }}>
              {[['Strategic fit',`The ${parcel.zoning} zoning and ${parcel.fsi}x FSI make this parcel well-suited for ${useCase.label.toLowerCase()} development.`],
                ['Location advantage',`At ${parcel.airportKm} km from the nearest airport and ${parcel.railKm} km from rail, the site offers strong connectivity.`],
                ['Demand drivers',`${cityName(parcel.city)}'s ${useCase.label.toLowerCase()} sector is growing at above-market rates in FY26.`],
                ['Risk considerations','Key risks include regulatory approval timelines, construction cost escalation, and absorption pace. A phased approach is recommended.'],
              ].map(([h,t])=>(
                <div key={h} style={{ padding:16, background:'var(--bg-2)', borderRadius:8 }}>
                  <div style={{ fontSize:13, fontWeight:700, marginBottom:6 }}>{h}</div>
                  <div style={{ fontSize:13, color:'var(--fg-2)', lineHeight:1.65 }}>{t}</div>
                </div>
              ))}
            </div>, '4'],
          ['COMMERCIALS & PROCESS','Indicative structure',
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              <div className="col" style={{ gap:12 }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>Land economics</div>
                {[['Land area',`${parcel.acres} acres`],['Ask price',`₹${parcel.askCrPerAcre} Cr/acre`],['Total consideration',`₹${totalCr} Cr`],['Development potential',`${devPotSqft} sqft`]].map(([k,v])=>(
                  <div key={k} className="row" style={{ justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border-1)' }}><span style={{ fontSize:13, color:'var(--fg-3)' }}>{k}</span><span style={{ fontSize:13, fontWeight:600 }}>{v}</span></div>
                ))}
              </div>
              <div className="col" style={{ gap:12 }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>Indicative timeline</div>
                {[['Due diligence','2–3 weeks'],['Term sheet','4–6 weeks'],['Legal docs','6–8 weeks'],['Registration','8–12 weeks'],['Total','~6 months']].map(([k,v])=>(
                  <div key={k} className="row" style={{ justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border-1)' }}><span style={{ fontSize:13, color:'var(--fg-3)' }}>{k}</span><span style={{ fontSize:13, fontWeight:600 }}>{v}</span></div>
                ))}
              </div>
            </div>, '5'],
          ['NEXT STEPS','How to move forward',
            <div className="col" style={{ gap:14 }}>
              {[['1','Sign NDA','Execute a mutual non-disclosure agreement to unlock detailed financials and site documents.'],['2','Site visit','Guided visit with landowner representative — typically within 2 weeks of NDA.'],['3','Due diligence','4–6 week DD process. Reliant coordinates data room access.'],['4','Term sheet','Non-binding term sheet once DD is satisfactory.'],['5','Close','Documentation, registration, and handover per agreed timeline.']].map(([n,h,t])=>(
                <div key={n} className="row" style={{ gap:14, alignItems:'flex-start' }}>
                  <div style={{ minWidth:30, height:30, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--accent)', color:'white', fontWeight:700 }}>{n}</div>
                  <div><div style={{ fontSize:13.5, fontWeight:600, marginBottom:3 }}>{h}</div><div style={{ fontSize:13, color:'var(--fg-2)', lineHeight:1.65 }}>{t}</div></div>
                </div>
              ))}
            </div>, '6'],
        ].map(([eyebrow, title, content, page]) => (
          <div key={page} className="deck-page">
            <div className="eyebrow" style={{ marginBottom:16, color:'var(--accent)' }}>{eyebrow}</div>
            <h2 className="section-title" style={{ marginBottom:24 }}>{title}</h2>
            {content}
            <div style={{ marginTop:'auto', padding:'20px 0', borderTop:'1px solid var(--border-1)', display:'flex', justifyContent:'space-between' }}>
              <span style={{ fontSize:11, color:'var(--fg-3)' }}>Reliant Associates · Confidential</span>
              <span style={{ fontSize:11, color:'var(--fg-3)' }}>{parseInt(page)+2} / 7</span>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

// ── Team & Assignments ──────────────────────────────────────────────────────

export function TeamTab() {
  const { data: team, loading, error, setData } = useData(api.team.list);
  const [showAdd,  setShowAdd]  = useState(false);
  const [editMbr,  setEditMbr]  = useState(null);
  const [form, setForm] = useState({ name:'', role:'', sector:'Commercial', city:'mum', util:0, dealsActive:0, gciYtdCr:0 });

  function openAdd()    { setForm({ name:'', role:'', sector:'Commercial', city:'mum', util:0, dealsActive:0, gciYtdCr:0 }); setShowAdd(true); }
  function openEdit(m)  { setForm({ name:m.name, role:m.role, sector:m.sector, city:m.city, util:m.util, dealsActive:m.dealsActive, gciYtdCr:m.gciYtdCr }); setEditMbr(m); }
  function closeForm()  { setShowAdd(false); setEditMbr(null); }

  async function saveMember() {
    const payload = { ...form, util:+form.util, dealsActive:+form.dealsActive, gciYtdCr:+form.gciYtdCr };
    if (editMbr) {
      const updated = await api.team.update(editMbr.id, payload);
      setData(d => d.map(x => x.id===updated.id ? updated : x));
    } else {
      const created = await api.team.create(payload);
      setData(d => [...(d||[]), created]);
    }
    closeForm();
  }

  async function removeMember(id, e) {
    e.stopPropagation();
    if (!confirm('Remove this team member?')) return;
    await api.team.remove(id);
    setData(d => d.filter(x => x.id !== id));
  }

  if (loading) return <Fragment><PageHead eyebrow="Reliant Intelligence Platform · FY26" title={<span>Team & <em style={{ fontStyle:'italic' }}>Assignments</em></span>} sub="Roster, utilisation, and GCI — FY26 YTD."/><div className="page-body"><Spinner/></div></Fragment>;
  if (error)   return <Fragment><PageHead eyebrow="Reliant Intelligence Platform · FY26" title="Team" sub=""/><div className="page-body"><Err msg={error}/></div></Fragment>;

  const members = team || [];
  const totalGCI   = members.reduce((s,m) => s+m.gciYtdCr, 0).toFixed(1);
  const avgUtil    = members.length ? Math.round(members.reduce((s,m) => s+m.util, 0) / members.length) : 0;
  const activeDeals = members.reduce((s,m) => s+m.dealsActive, 0);

  return (
    <Fragment>
      <PageHead
        eyebrow="Reliant Intelligence Platform · FY26"
        title={<span>Team & <em style={{ fontStyle:'italic' }}>Assignments</em></span>}
        sub="Roster, utilisation, and GCI by team member — FY26 YTD."
        actions={<Fragment>
          <button className="btn"><Icon name="download" size={14}/> Export</button>
          <button className="btn primary" onClick={openAdd}><Icon name="plus" size={14}/> Add member</button>
        </Fragment>}
      />
      <div className="page-body">
        <div className="grid cols-4" style={{ marginBottom:24 }}>
          <KPI label="Team size"       value={members.length}/>
          <KPI label="Avg utilisation" value={avgUtil} unit="%" delta={3.2} sub="vs FY25"/>
          <KPI label="Active deals"    value={activeDeals} delta={12.0}/>
          <KPI label="GCI YTD"         value={'₹'+totalGCI} unit=" Cr" delta={18.4}/>
        </div>

        <div className="grid cols-2" style={{ marginBottom:24 }}>
          <div className="card">
            <SectionHead eyebrow="Utilisation" title="By team member" sub="% capacity used, FY26"/>
            <RankingBars
              data={[...members].sort((a,b)=>b.util-a.util).slice(0,8).map(m=>({ label:m.name.split(' ').slice(0,2).join(' '), value:m.util }))}
              valueKey="value" labelKey="label" formatV={v=>v+'%'} color="var(--accent)"
            />
          </div>
          <div className="card">
            <SectionHead eyebrow="GCI" title="By team member" sub="Gross commission income, ₹ Cr, FY26 YTD"/>
            <RankingBars
              data={[...members].filter(m=>m.gciYtdCr>0).sort((a,b)=>b.gciYtdCr-a.gciYtdCr).map(m=>({ label:m.name.split(' ').slice(0,2).join(' '), value:m.gciYtdCr }))}
              valueKey="value" labelKey="label" formatV={v=>'₹'+v+' Cr'} color="var(--ink-900)"
            />
          </div>
        </div>

        <div className="card" style={{ padding:0 }}>
          <div className="tbl-wrap" style={{ border:0, maxHeight:'none' }}>
            <table className="tbl">
              <thead><tr>
                <th>Name</th><th>Role</th><th>Sector</th><th>City</th>
                <th className="right">Utilisation</th><th className="right">Active deals</th><th className="right">GCI YTD</th><th></th>
              </tr></thead>
              <tbody>
                {members.map(m => (
                  <tr key={m.id} className="clickable" onClick={() => openEdit(m)}>
                    <td>
                      <div className="row" style={{ gap:8 }}>
                        <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--bg-3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'var(--fg-2)', flexShrink:0 }}>
                          {m.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                        </div>
                        <span style={{ fontSize:13.5 }}>{m.name}</span>
                      </div>
                    </td>
                    <td className="muted">{m.role}</td>
                    <td className="muted">{m.sector}</td>
                    <td className="muted">{CITIES.find(c=>c.id===m.city)?.short||m.city}</td>
                    <td className="num">
                      <div className="row" style={{ justifyContent:'flex-end', gap:8 }}>
                        <div style={{ width:60, height:5, background:'var(--border-1)', borderRadius:3 }}>
                          <div style={{ width:m.util+'%', height:'100%', borderRadius:3, background: m.util>85?'var(--bad)':m.util>75?'var(--warn)':'var(--ok)' }}/>
                        </div>
                        <span>{m.util}%</span>
                      </div>
                    </td>
                    <td className="num">{m.dealsActive}</td>
                    <td className="num">{m.gciYtdCr>0?'₹'+m.gciYtdCr.toFixed(1)+' Cr':'—'}</td>
                    <td onClick={e=>removeMember(m.id,e)}><button className="icon-btn"><Icon name="x" size={13}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {(showAdd||editMbr) && (
        <Modal title={editMbr?'Edit member':'Add member'} onClose={closeForm}>
          <div className="col" style={{ gap:13 }}>
            <Field label="Full name"><input className="input" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="e.g. Priya Sharma"/></Field>
            <Field label="Role / title"><input className="input" value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))} placeholder="e.g. Senior Associate"/></Field>
            <div className="grid cols-2">
              <Field label="Sector">
                <select className="input select" value={form.sector} onChange={e=>setForm(p=>({...p,sector:e.target.value}))}>
                  {['All','Hospitality','Healthcare','Industrial','Commercial','Residential','Land'].map(s=><option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="City">
                <select className="input select" value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))}>
                  {CITIES.filter(c=>c.id!=='pan').map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid cols-3">
              <Field label="Utilisation %"><input className="input" type="number" value={form.util} onChange={e=>setForm(p=>({...p,util:e.target.value}))} min="0" max="100"/></Field>
              <Field label="Active deals"><input className="input" type="number" value={form.dealsActive} onChange={e=>setForm(p=>({...p,dealsActive:e.target.value}))} min="0"/></Field>
              <Field label="GCI YTD (₹ Cr)"><input className="input" type="number" step="0.1" value={form.gciYtdCr} onChange={e=>setForm(p=>({...p,gciYtdCr:e.target.value}))}/></Field>
            </div>
            <div className="row" style={{ justifyContent:'flex-end', gap:8 }}>
              <button className="btn ghost sm" onClick={closeForm}>Cancel</button>
              <button className="btn primary sm" disabled={!form.name||!form.role} onClick={saveMember}>Save</button>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}

// ── Issue Tracker ───────────────────────────────────────────────────────────

const SEV_COLOR    = { High:'bad',       Med:'warn',  Low:'info' };
const STATUS_COLOR = { Open:'warn', 'In review':'info', Blocked:'bad', Resolved:'ok', "Won't fix":'' };
const SEVERITIES   = ['High','Med','Low'];
const STATUSES     = ['Open','In review','Blocked','Resolved','Won\'t fix'];

export function IssuesTab() {
  const { data: issues, loading, error, setData } = useData(api.issues.list);
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter]   = useState('All');
  const [showNew,  setShowNew]  = useState(false);
  const [comment,  setComment]  = useState('');
  const [newForm,  setNewForm]  = useState({ title:'', area:'', severity:'Med', owner:'Rajiv Kapur' });

  const allStatuses = ['All','Open','In review','Blocked','Resolved',"Won't fix"];
  const visible = filter==='All' ? (issues||[]) : (issues||[]).filter(i=>i.status===filter);

  async function createIssue() {
    const created = await api.issues.create(newForm);
    setData(d => [created, ...(d||[])]);
    setShowNew(false);
    setNewForm({ title:'', area:'', severity:'Med', owner:'Rajiv Kapur' });
  }

  async function updateStatus(id, status) {
    const updated = await api.issues.update(id, { status });
    setData(d => d.map(x => x.id===id ? updated : x));
    setSelected(updated);
  }

  async function postComment(id) {
    if (!comment.trim()) return;
    await api.issues.addComment(id, { author:'Rajiv Kapur', body:comment });
    const updated = await api.issues.get(id);
    setData(d => d.map(x => x.id===id ? updated : x));
    setSelected(updated);
    setComment('');
  }

  if (loading) return <Fragment><PageHead eyebrow="Reliant Intelligence Platform · FY26" title={<span>Issue <em style={{ fontStyle:'italic' }}>Tracker</em></span>} sub=""/><div className="page-body"><Spinner/></div></Fragment>;
  if (error)   return <Fragment><PageHead eyebrow="Reliant Intelligence Platform · FY26" title="Issues" sub=""/><div className="page-body"><Err msg={error}/></div></Fragment>;

  const iss = issues||[];

  return (
    <Fragment>
      <PageHead
        eyebrow="Reliant Intelligence Platform · FY26"
        title={<span>Issue <em style={{ fontStyle:'italic' }}>Tracker</em></span>}
        sub="Data quality, UX bugs, and integration issues flagged by the team."
        actions={<button className="btn primary" onClick={()=>setShowNew(true)}><Icon name="plus" size={14}/> New issue</button>}
      />
      <div className="page-body">
        <div className="grid cols-4" style={{ marginBottom:24 }}>
          <KPI label="Open"      value={iss.filter(i=>i.status==='Open').length}/>
          <KPI label="In review" value={iss.filter(i=>i.status==='In review').length}/>
          <KPI label="Blocked"   value={iss.filter(i=>i.status==='Blocked').length}/>
          <KPI label="Resolved"  value={iss.filter(i=>i.status==='Resolved').length}/>
        </div>

        <div className="row" style={{ gap:8, marginBottom:16, flexWrap:'wrap' }}>
          {allStatuses.map(s => (
            <button key={s} className={`btn ${filter===s?'primary':'ghost'} sm`} onClick={()=>setFilter(s)}>{s}</button>
          ))}
        </div>

        <div className="card" style={{ padding:0 }}>
          <div className="tbl-wrap" style={{ border:0, maxHeight:'none' }}>
            <table className="tbl">
              <thead><tr>
                <th>ID</th><th>Title</th><th>Area</th><th>Severity</th><th>Status</th><th>Owner</th><th>Opened</th>
              </tr></thead>
              <tbody>
                {visible.map(iss => (
                  <tr key={iss.id} className="clickable" onClick={()=>{ setSelected(iss); setComment(''); }}>
                    <td style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{iss.id}</td>
                    <td style={{ maxWidth:340 }}>{iss.title}</td>
                    <td className="muted">{iss.area}</td>
                    <td><span className={`pill ${SEV_COLOR[iss.severity]||''}`}>{iss.severity}</span></td>
                    <td><span className={`pill ${STATUS_COLOR[iss.status]||''}`}>{iss.status}</span></td>
                    <td className="muted">{iss.owner}</td>
                    <td className="muted" style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{iss.opened}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Issue detail modal */}
      {selected && (
        <Modal title={selected.id} onClose={()=>setSelected(null)}>
          <div className="col" style={{ gap:16 }}>
            <div style={{ fontSize:15, fontWeight:600, lineHeight:1.4 }}>{selected.title}</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div className="col" style={{ gap:4 }}>
                <div className="eyebrow">Severity</div>
                <span className={`pill ${SEV_COLOR[selected.severity]||''}`} style={{ alignSelf:'flex-start' }}>{selected.severity}</span>
              </div>
              <div className="col" style={{ gap:4 }}>
                <div className="eyebrow">Status</div>
                <select className="input select" style={{ fontSize:12, padding:'4px 28px 4px 8px', height:28 }}
                  value={selected.status} onChange={e=>updateStatus(selected.id, e.target.value)}>
                  {STATUSES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {[['Area',selected.area],['Owner',selected.owner],['Opened',selected.opened]].map(([k,v])=>(
                <div key={k} className="col" style={{ gap:4 }}><div className="eyebrow">{k}</div><div style={{ fontSize:13 }}>{v}</div></div>
              ))}
            </div>

            {/* Comments */}
            <div style={{ height:1, background:'var(--border-1)' }}/>
            <div style={{ fontSize:12, fontWeight:700, color:'var(--fg-2)', letterSpacing:'0.06em', textTransform:'uppercase' }}>
              Comments ({(selected.comments||[]).length})
            </div>
            {(selected.comments||[]).length === 0
              ? <div style={{ fontSize:13, color:'var(--fg-3)' }}>No comments yet.</div>
              : (selected.comments||[]).map(c=>(
                <div key={c.id} style={{ padding:'10px 12px', background:'var(--bg-2)', borderRadius:8 }}>
                  <div className="row" style={{ justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:12, fontWeight:600 }}>{c.author}</span>
                    <span style={{ fontSize:11, color:'var(--fg-3)', fontFamily:'var(--font-mono)' }}>{c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN') : ''}</span>
                  </div>
                  <div style={{ fontSize:13, color:'var(--fg-2)' }}>{c.body}</div>
                </div>
              ))
            }
            <textarea className="input" rows={3} placeholder="Add a comment…" value={comment} onChange={e=>setComment(e.target.value)} style={{ resize:'vertical', fontFamily:'inherit', fontSize:13 }}/>
            <div className="row" style={{ justifyContent:'flex-end', gap:8 }}>
              <button className="btn ghost sm" onClick={()=>setSelected(null)}>Close</button>
              <button className="btn primary sm" disabled={!comment.trim()} onClick={()=>postComment(selected.id)}>Post comment</button>
            </div>
          </div>
        </Modal>
      )}

      {/* New issue modal */}
      {showNew && (
        <Modal title="New issue" onClose={()=>setShowNew(false)}>
          <div className="col" style={{ gap:13 }}>
            <Field label="Title"><input className="input" value={newForm.title} onChange={e=>setNewForm(p=>({...p,title:e.target.value}))} placeholder="Describe the issue…"/></Field>
            <Field label="Area"><input className="input" value={newForm.area} onChange={e=>setNewForm(p=>({...p,area:e.target.value}))} placeholder="e.g. Healthcare / Calc"/></Field>
            <div className="grid cols-2">
              <Field label="Severity">
                <select className="input select" value={newForm.severity} onChange={e=>setNewForm(p=>({...p,severity:e.target.value}))}>
                  {SEVERITIES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Owner"><input className="input" value={newForm.owner} onChange={e=>setNewForm(p=>({...p,owner:e.target.value}))} placeholder="e.g. A. Khanna"/></Field>
            </div>
            <div className="row" style={{ justifyContent:'flex-end', gap:8 }}>
              <button className="btn ghost sm" onClick={()=>setShowNew(false)}>Cancel</button>
              <button className="btn primary sm" disabled={!newForm.title||!newForm.area} onClick={createIssue}>Create issue</button>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}
