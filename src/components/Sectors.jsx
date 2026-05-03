import { useState, Fragment } from 'react';
import {
  HOSPITALITY, HEALTHCARE, INDUSTRIAL, COMMERCIAL, RESIDENTIAL,
  CITIES, SOURCES,
  formatINR, formatNum, filterByCity, cityMult
} from '../data.js';
import {
  Icon, KPI, SectionHead, Source, Tabs,
  BarChart, LineChart, RankingBars, Donut, Scatter, Modal
} from './Primitives.jsx';
import { PageHead } from './Shell.jsx';

// ============================================================
// HOSPITALITY
// ============================================================
export function HospitalityTab({ market }) {
  const [tab, setTab] = useState('overview');
  const [openDeal, setOpenDeal] = useState(null);
  const submarkets = filterByCity(HOSPITALITY.submarkets, market);
  const cityName = CITIES.find(c => c.id === market)?.name || 'Pan India';
  const mult = cityMult(market);
  const adj = (v) => Math.round(v * mult);

  return (
    <Fragment>
      <PageHead
        eyebrow="Sector · Hospitality"
        title={<span><em style={{ fontStyle: 'italic' }}>Hospitality</em> — {cityName}</span>}
        sub="Branded keys, ADR, RevPAR, occupancy. Q1–Q4 FY26."
        actions={<Fragment>
          <button className="btn"><Icon name="filter" size={14}/> Segment</button>
          <button className="btn"><Icon name="download" size={14}/> Export</button>
        </Fragment>}
      />
      <Tabs items={[
        { id:'overview',   label:'Overview' },
        { id:'submarkets', label:'Submarkets', count: submarkets.length },
        { id:'operators',  label:'Operators',  count: HOSPITALITY.operators.length },
        { id:'deals',      label:'Deals',      count: HOSPITALITY.deals.length },
        { id:'insights',   label:'Insights' },
      ]} value={tab} onChange={setTab}/>
      <div className="page-body">
        {tab === 'overview' && (
          <Fragment>
            <div className="grid cols-4" style={{ marginBottom: 24 }}>
              <KPI label="Branded keys (FY26)" value={formatNum(adj(HOSPITALITY.summary.keysFY26))} delta={HOSPITALITY.summary.yoyKeysPct}/>
              <KPI label="System ADR" value={formatINR(adj(HOSPITALITY.summary.systemAvgADR))} delta={HOSPITALITY.summary.yoyADRPct}/>
              <KPI label="System RevPAR" value={formatINR(adj(HOSPITALITY.summary.systemRevPAR))} delta={HOSPITALITY.summary.yoyRevPARPct} ink/>
              <KPI label="Occupancy" value={HOSPITALITY.summary.occFY26.toFixed(1)} unit="%" delta={HOSPITALITY.summary.yoyUtilPct}/>
            </div>
            <div className="grid cols-2" style={{ marginBottom: 24 }}>
              <div className="card">
                <SectionHead eyebrow="Quarterly" title="ADR & RevPAR · FY26" sub="Wedding-season Q3 spike is structural."/>
                <BarChart data={HOSPITALITY.quarterlyADR} valueKey="adr" valueKey2="revpar" labelKey="quarter" formatY={v => '₹' + (v/1000).toFixed(0) + 'k'} height={240}/>
                <div className="legend" style={{ marginTop: 8 }}>
                  <span><span className="swatch" style={{ background: 'var(--ink-900)' }}/>ADR</span>
                  <span><span className="swatch" style={{ background: 'var(--signal-600)' }}/>RevPAR</span>
                </div>
                <Source>{SOURCES.hospitality}</Source>
              </div>
              <div className="card">
                <SectionHead eyebrow="Composition" title="Branded vs unbranded keys"/>
                <Donut
                  data={[
                    { label: 'Branded',   value: HOSPITALITY.summary.branded_pct_fy26, color: 'var(--ink-900)' },
                    { label: 'Unbranded', value: 100 - HOSPITALITY.summary.branded_pct_fy26, color: 'var(--paper-200)' },
                  ]}
                  centerValue={HOSPITALITY.summary.branded_pct_fy26 + '%'} centerLabel="Branded"
                  formatV={v => v.toFixed(1) + '%'}
                />
                <Source>{SOURCES.hospitality}</Source>
              </div>
            </div>
            <div className="card">
              <SectionHead eyebrow="By submarket" title="ADR vs occupancy" sub="Bubble size = total keys"/>
              <Scatter
                data={submarkets} xKey="adr" yKey="occ" sizeKey="keys" labelKey="name"
                xLabel="ADR (INR)" yLabel="OCC %"
                formatX={v => '₹' + (v/1000).toFixed(0) + 'k'} formatY={v => v.toFixed(0) + '%'}
                color="var(--signal-600)"
              />
              <Source>{SOURCES.hospitality}</Source>
            </div>
          </Fragment>
        )}
        {tab === 'submarkets' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Submarket</th><th>City</th><th className="right">ADR</th><th className="right">RevPAR</th><th className="right">OCC</th><th className="right">Keys</th><th className="right">Pipeline</th>
                </tr></thead>
                <tbody>{submarkets.map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td className="muted">{CITIES.find(c=>c.id===s.city)?.short}</td>
                    <td className="num">{formatINR(s.adr)}</td>
                    <td className="num">{formatINR(s.revpar)}</td>
                    <td className="num">{s.occ.toFixed(1)}%</td>
                    <td className="num">{formatNum(s.keys)}</td>
                    <td className="num muted">{formatNum(s.pipeline)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'operators' && (
          <div className="grid cols-2" style={{ gap: 24 }}>
            <div className="card">
              <SectionHead eyebrow="Top operators" title="Existing keys"/>
              <RankingBars data={HOSPITALITY.operators.filter(o=>o.name!=='Independent / Unbranded').sort((a,b)=>b.keys-a.keys)} valueKey="keys" labelKey="name" formatV={formatNum}/>
            </div>
            <div className="card">
              <SectionHead eyebrow="Top operators" title="Pipeline keys"/>
              <RankingBars data={HOSPITALITY.operators.filter(o=>o.name!=='Independent / Unbranded').sort((a,b)=>b.pipeline-a.pipeline)} valueKey="pipeline" labelKey="name" formatV={formatNum} color="var(--signal-600)"/>
            </div>
          </div>
        )}
        {tab === 'deals' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Date</th><th>City</th><th>Asset</th><th>Operator</th><th>Segment</th><th>Type</th><th className="right">Keys</th><th className="right">Value</th>
                </tr></thead>
                <tbody>{HOSPITALITY.deals.map((d,i) => (
                  <tr key={i} className="clickable" onClick={() => setOpenDeal(d)}>
                    <td className="muted">{d.date}</td>
                    <td className="muted">{CITIES.find(c=>c.id===d.city)?.short}</td>
                    <td>{d.asset}</td>
                    <td className="muted">{d.operator}</td>
                    <td><span className="pill">{d.segment}</span></td>
                    <td className="muted">{d.dealType}</td>
                    <td className="num">{d.keys}</td>
                    <td className="num">{d.value_cr ? '₹' + d.value_cr + ' Cr' : '—'}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            {openDeal && (
              <Modal title={openDeal.asset} onClose={() => setOpenDeal(null)}
                     footer={<Fragment><button className="btn" onClick={() => setOpenDeal(null)}>Close</button><button className="btn primary"><Icon name="share" size={14}/> Share</button></Fragment>}>
                <div className="grid cols-3" style={{ marginBottom: 16 }}>
                  <KPI label="Keys" value={openDeal.keys}/>
                  <KPI label="Operator" value={<span style={{ fontSize: 22 }}>{openDeal.operator}</span>}/>
                  <KPI label="Value" value={openDeal.value_cr ? '₹' + openDeal.value_cr : '—'} unit={openDeal.value_cr ? ' Cr' : ''}/>
                </div>
                <div className="card alt">
                  <div className="eyebrow">Reliant role</div>
                  <p style={{ marginTop: 8, fontSize: 13.5, color: 'var(--fg-2)' }}>Sell-side advisor on the {openDeal.dealType.toLowerCase()}. Aanya Khanna led the engagement; engagement closed Q4 FY26.</p>
                </div>
              </Modal>
            )}
          </div>
        )}
        {tab === 'insights' && (
          <div className="card">
            <SectionHead eyebrow="Why it matters" title="What we're seeing"/>
            <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 1.7, color: 'var(--fg-2)' }}>
              {HOSPITALITY.insights.map((s,i) => <li key={i} style={{ marginBottom: 10 }}>{s}</li>)}
            </ol>
          </div>
        )}
      </div>
    </Fragment>
  );
}

// ============================================================
// HEALTHCARE
// ============================================================
export function HealthcareTab({ market }) {
  const [tab, setTab] = useState('overview');
  const submarkets = filterByCity(HEALTHCARE.submarkets, market);
  const requirements = filterByCity(HEALTHCARE.requirements, market);
  const cityName = CITIES.find(c => c.id === market)?.name || 'Pan India';
  const mult = cityMult(market);

  return (
    <Fragment>
      <PageHead
        eyebrow="Sector · Healthcare"
        title={<span><em style={{ fontStyle: 'italic' }}>Healthcare</em> — {cityName}</span>}
        sub="Bedded capacity, ARPOB, occupancy, chain pipelines."
        actions={<button className="btn"><Icon name="download" size={14}/> Export</button>}
      />
      <Tabs items={[
        { id:'overview',     label:'Overview' },
        { id:'submarkets',   label:'Submarkets', count: submarkets.length },
        { id:'chains',       label:'Chains',     count: HEALTHCARE.chains.length },
        { id:'requirements', label:'Requirements', count: requirements.length },
        { id:'insights',     label:'Insights' },
      ]} value={tab} onChange={setTab}/>
      <div className="page-body">
        {tab === 'overview' && (
          <Fragment>
            <div className="grid cols-4" style={{ marginBottom: 24 }}>
              <KPI label="Branded beds (FY26)" value={formatNum(Math.round(HEALTHCARE.summary.bedsFY26 * mult))} delta={HEALTHCARE.summary.yoyBedsPct}/>
              <KPI label="ARPOB / day" value={formatINR(Math.round(HEALTHCARE.summary.arpobFY26 * mult))} delta={HEALTHCARE.summary.yoyARPOBPct} ink/>
              <KPI label="Utilisation" value={HEALTHCARE.summary.utilisationFY26.toFixed(1)} unit="%" delta={HEALTHCARE.summary.yoyUtilPct}/>
              <KPI label="Pipeline beds" value={formatNum(Math.round(HEALTHCARE.summary.pipelineBeds * mult))} sub="under development"/>
            </div>
            <div className="grid cols-2" style={{ marginBottom: 24 }}>
              <div className="card">
                <SectionHead eyebrow="Submarkets" title="ARPOB vs utilisation"/>
                <Scatter data={submarkets} xKey="arpob" yKey="util" sizeKey="beds" labelKey="name"
                         xLabel="ARPOB (INR)" yLabel="UTIL %"
                         formatX={v => '₹' + (v/1000).toFixed(0) + 'k'} formatY={v => v.toFixed(0) + '%'}
                         color="var(--clay-500)"/>
                <Source>{SOURCES.healthcare}</Source>
              </div>
              <div className="card">
                <SectionHead eyebrow="Chains" title="Top by bed count"/>
                <RankingBars
                  data={HEALTHCARE.chains.filter(c=>c.name!=='Independent / Single').sort((a,b)=>b.beds-a.beds).slice(0,8)}
                  valueKey="beds" labelKey="name" formatV={formatNum}/>
              </div>
            </div>
            <div className="card">
              <SectionHead eyebrow="Pipeline ratio" title="Beds: existing vs pipeline"/>
              <BarChart data={submarkets.slice(0,10)} valueKey="beds" valueKey2="pipeline" labelKey="name" formatY={v => v >= 1000 ? (v/1000).toFixed(1)+'k' : v}/>
              <div className="legend" style={{ marginTop: 8 }}>
                <span><span className="swatch" style={{ background: 'var(--ink-900)' }}/>Existing beds</span>
                <span><span className="swatch" style={{ background: 'var(--signal-600)' }}/>Pipeline</span>
              </div>
            </div>
          </Fragment>
        )}
        {tab === 'submarkets' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Submarket</th><th>City</th><th className="right">Beds</th><th className="right">Pipeline</th><th className="right">Util</th><th className="right">ARPOB</th><th className="right">Capex/bed</th>
                </tr></thead>
                <tbody>{submarkets.map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td className="muted">{CITIES.find(c=>c.id===s.city)?.short}</td>
                    <td className="num">{formatNum(s.beds)}</td>
                    <td className="num muted">{formatNum(s.pipeline)}</td>
                    <td className="num">{s.util}%</td>
                    <td className="num">{formatINR(s.arpob)}</td>
                    <td className="num">₹{s.capex_cr_per_bed.toFixed(2)} Cr</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'chains' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Chain</th><th className="right">Beds</th><th className="right">Pipeline</th><th className="right">Hospitals</th><th>Segment</th>
                </tr></thead>
                <tbody>{HEALTHCARE.chains.map((c,i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td className="num">{formatNum(c.beds)}</td>
                    <td className="num muted">{formatNum(c.pipeline)}</td>
                    <td className="num muted">{c.hospitals ?? '—'}</td>
                    <td><span className="pill">{c.segment}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'requirements' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Chain</th><th>City</th><th className="right">Beds</th><th className="right">Plot (acres)</th><th className="right">FSI min</th><th>Status</th>
                </tr></thead>
                <tbody>{requirements.map((r,i) => (
                  <tr key={i}>
                    <td>{r.chain}</td>
                    <td className="muted">{CITIES.find(c=>c.id===r.city)?.name}</td>
                    <td className="num">{r.size_beds}</td>
                    <td className="num">{r.plot_acres_min.toFixed(1)}</td>
                    <td className="num">{r.fsi_min.toFixed(1)}</td>
                    <td><span className={`pill ${r.status==='Active'?'ok':r.status==='Scoping'?'warn':''}`}>{r.status}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'insights' && (
          <div className="card">
            <SectionHead eyebrow="Why it matters" title="What we're seeing"/>
            <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 1.7, color: 'var(--fg-2)' }}>
              {HEALTHCARE.insights.map((s,i) => <li key={i} style={{ marginBottom: 10 }}>{s}</li>)}
            </ol>
          </div>
        )}
      </div>
    </Fragment>
  );
}

// ============================================================
// INDUSTRIAL
// ============================================================
export function IndustrialTab({ market }) {
  const [tab, setTab] = useState('overview');
  const submarkets = filterByCity(INDUSTRIAL.submarkets, market);
  const requirements = filterByCity(INDUSTRIAL.requirements, market);
  const cityName = CITIES.find(c => c.id === market)?.name || 'Pan India';
  const mult = cityMult(market);

  return (
    <Fragment>
      <PageHead
        eyebrow="Sector · Industrial RE"
        title={<span><em style={{ fontStyle: 'italic' }}>Industrial</em> — {cityName}</span>}
        sub="Grade-A logistics + industrial parks. Stock, absorption, rents."
        actions={<button className="btn"><Icon name="download" size={14}/> Export</button>}
      />
      <Tabs items={[
        { id:'overview',     label:'Overview' },
        { id:'submarkets',   label:'Submarkets',   count: submarkets.length },
        { id:'operators',    label:'Park operators',count: INDUSTRIAL.operators.length },
        { id:'requirements', label:'Occupier reqs', count: requirements.length },
        { id:'insights',     label:'Insights' },
      ]} value={tab} onChange={setTab}/>
      <div className="page-body">
        {tab === 'overview' && (
          <Fragment>
            <div className="grid cols-4" style={{ marginBottom: 24 }}>
              <KPI label="Stock (Grade-A)" value={(INDUSTRIAL.summary.stockMSF * mult).toFixed(0)} unit=" MSF"/>
              <KPI label="Absorption FY26" value={(INDUSTRIAL.summary.absorptionMSF_FY26 * mult).toFixed(1)} unit=" MSF" delta={INDUSTRIAL.summary.yoyAbsorptionPct} ink/>
              <KPI label="Vacancy" value={INDUSTRIAL.summary.vacancyFY26.toFixed(1)} unit="%"/>
              <KPI label="Avg rent" value={'₹' + INDUSTRIAL.summary.avgRentSqftMonth.toFixed(1)} unit=" /sqft/mo" delta={INDUSTRIAL.summary.yoyRentPct}/>
            </div>
            <div className="grid cols-2" style={{ marginBottom: 24 }}>
              <div className="card">
                <SectionHead eyebrow="Quarterly" title="Absorption · FY26"/>
                <BarChart data={INDUSTRIAL.quarterlyAbs} valueKey="abs" labelKey="q" formatY={v => v.toFixed(1) + ' MSF'}/>
                <Source>{SOURCES.industrial}</Source>
              </div>
              <div className="card">
                <SectionHead eyebrow="Park operators" title="Built stock vs pipeline"/>
                <RankingBars
                  data={INDUSTRIAL.operators.filter(o=>o.name!=='Independent / Owner-built').sort((a,b)=>b.stockMSF-a.stockMSF)}
                  valueKey="stockMSF" labelKey="name" formatV={v => v.toFixed(1) + ' MSF'}/>
              </div>
            </div>
            <div className="card">
              <SectionHead eyebrow="Submarkets" title="Rent vs vacancy" sub="Bubble size = stock"/>
              <Scatter data={submarkets} xKey="rent" yKey="vac" sizeKey="stockMSF" labelKey="name"
                       xLabel="Rent (INR/sqft/mo)" yLabel="Vacancy %"
                       formatX={v => '₹' + v.toFixed(0)} formatY={v => v.toFixed(0) + '%'}
                       color="var(--signal-600)"/>
              <Source>{SOURCES.industrial}</Source>
            </div>
          </Fragment>
        )}
        {tab === 'submarkets' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Submarket</th><th>City</th><th className="right">Rent</th><th className="right">Vac</th><th className="right">Stock</th><th className="right">Absorption</th>
                </tr></thead>
                <tbody>{submarkets.map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td className="muted">{CITIES.find(c=>c.id===s.city)?.short}</td>
                    <td className="num">₹{s.rent.toFixed(1)}</td>
                    <td className="num">{s.vac.toFixed(1)}%</td>
                    <td className="num">{s.stockMSF.toFixed(1)} MSF</td>
                    <td className="num">{s.absMSF.toFixed(1)} MSF</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'operators' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Operator</th><th className="right">Stock</th><th className="right">Pipeline</th>
                </tr></thead>
                <tbody>{INDUSTRIAL.operators.map((o,i) => (
                  <tr key={i}>
                    <td>{o.name}</td>
                    <td className="num">{o.stockMSF.toFixed(1)} MSF</td>
                    <td className="num muted">{o.pipelineMSF != null ? o.pipelineMSF.toFixed(1) + ' MSF' : '—'}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'requirements' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Occupier</th><th>City</th><th className="right">Size</th><th className="right">Lease</th><th>Status</th>
                </tr></thead>
                <tbody>{requirements.map((r,i) => (
                  <tr key={i}>
                    <td>{r.occupier}</td>
                    <td className="muted">{CITIES.find(c=>c.id===r.city)?.name}</td>
                    <td className="num">{formatNum(r.size_sqft)} sqft</td>
                    <td className="num">{r.lease_yrs} yrs</td>
                    <td><span className={`pill ${r.status==='Active'?'ok':r.status==='Scoping'?'warn':r.status==='BTS RFP'?'info':''}`}>{r.status}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'insights' && (
          <div className="card">
            <SectionHead eyebrow="Why it matters" title="What we're seeing"/>
            <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 1.7, color: 'var(--fg-2)' }}>
              {INDUSTRIAL.insights.map((s,i) => <li key={i} style={{ marginBottom: 10 }}>{s}</li>)}
            </ol>
          </div>
        )}
      </div>
    </Fragment>
  );
}

// ============================================================
// COMMERCIAL
// ============================================================
export function CommercialTab({ market }) {
  const [tab, setTab] = useState('overview');
  const submarkets = filterByCity(COMMERCIAL.submarkets, market);
  const cityName = CITIES.find(c => c.id === market)?.name || 'Pan India';
  const mult = cityMult(market);

  return (
    <Fragment>
      <PageHead
        eyebrow="Sector · Commercial RE"
        title={<span><em style={{ fontStyle: 'italic' }}>Commercial</em> — {cityName}</span>}
        sub="Grade-A office. Absorption, rents, vacancies, occupiers."
        actions={<button className="btn"><Icon name="download" size={14}/> Export</button>}
      />
      <Tabs items={[
        { id:'overview',  label:'Overview' },
        { id:'submarkets',label:'Submarkets', count: submarkets.length },
        { id:'occupiers', label:'Top occupiers', count: COMMERCIAL.occupiers.length },
        { id:'insights',  label:'Insights' },
      ]} value={tab} onChange={setTab}/>
      <div className="page-body">
        {tab === 'overview' && (
          <Fragment>
            <div className="grid cols-4" style={{ marginBottom: 24 }}>
              <KPI label="Stock (Grade-A)" value={(COMMERCIAL.summary.stockMSF * mult).toFixed(0)} unit=" MSF"/>
              <KPI label="Absorption FY26" value={(COMMERCIAL.summary.absorptionMSF_FY26 * mult).toFixed(1)} unit=" MSF" delta={COMMERCIAL.summary.yoyAbsorptionPct} ink/>
              <KPI label="Vacancy" value={COMMERCIAL.summary.vacancyFY26.toFixed(1)} unit="%"/>
              <KPI label="Weighted rent" value={'₹' + COMMERCIAL.summary.avgRentSqftMonth.toFixed(0)} unit=" /sqft/mo" delta={COMMERCIAL.summary.yoyRentPct}/>
            </div>
            <div className="grid cols-2" style={{ marginBottom: 24 }}>
              <div className="card">
                <SectionHead eyebrow="Quarterly" title="Absorption & vacancy"/>
                <LineChart data={COMMERCIAL.quarterlyAbs} xKey="q"
                  lines={[{ key:'abs', color:'var(--ink-900)', label:'Abs (MSF)' }]}
                  formatY={v => v.toFixed(1)} height={220}/>
                <Source>{SOURCES.commercial}</Source>
              </div>
              <div className="card">
                <SectionHead eyebrow="Top occupiers" title="FY26 net take-up"/>
                <RankingBars data={[...COMMERCIAL.occupiers].sort((a,b)=>b.fy26_take_msf-a.fy26_take_msf)} valueKey="fy26_take_msf" labelKey="name" formatV={v => v.toFixed(2) + ' MSF'} color="var(--signal-600)"/>
              </div>
            </div>
            <div className="card">
              <SectionHead eyebrow="Submarkets" title="Rent vs vacancy" sub="Bubble size = stock"/>
              <Scatter data={submarkets} xKey="rent" yKey="vac" sizeKey="stockMSF" labelKey="name"
                       xLabel="Rent (INR/sqft/mo)" yLabel="Vacancy %"
                       formatX={v => '₹' + v.toFixed(0)} formatY={v => v.toFixed(0) + '%'}
                       color="var(--clay-500)"/>
            </div>
          </Fragment>
        )}
        {tab === 'submarkets' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Submarket</th><th>City</th><th className="right">Rent</th><th className="right">Vac</th><th className="right">Stock</th><th className="right">Absorption</th>
                </tr></thead>
                <tbody>{submarkets.map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td className="muted">{CITIES.find(c=>c.id===s.city)?.short}</td>
                    <td className="num">₹{s.rent.toFixed(0)}</td>
                    <td className="num">{s.vac.toFixed(1)}%</td>
                    <td className="num">{s.stockMSF.toFixed(1)} MSF</td>
                    <td className="num">{s.absMSF.toFixed(1)} MSF</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'occupiers' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Occupier</th><th>Sector</th><th className="right">Footprint</th><th className="right">FY26 take-up</th>
                </tr></thead>
                <tbody>{COMMERCIAL.occupiers.map((o,i) => (
                  <tr key={i}>
                    <td>{o.name}</td>
                    <td className="muted">{o.sectors}</td>
                    <td className="num">{o.footprint_msf.toFixed(1)} MSF</td>
                    <td className="num">{o.fy26_take_msf.toFixed(2)} MSF</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'insights' && (
          <div className="card">
            <SectionHead eyebrow="Why it matters" title="What we're seeing"/>
            <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 1.7, color: 'var(--fg-2)' }}>
              {COMMERCIAL.insights.map((s,i) => <li key={i} style={{ marginBottom: 10 }}>{s}</li>)}
            </ol>
          </div>
        )}
      </div>
    </Fragment>
  );
}

// ============================================================
// RESIDENTIAL
// ============================================================
export function ResidentialTab({ market }) {
  const [tab, setTab] = useState('overview');
  const submarkets = filterByCity(RESIDENTIAL.submarkets, market);
  const cityName = CITIES.find(c => c.id === market)?.name || 'Pan India';
  const mult = cityMult(market);

  return (
    <Fragment>
      <PageHead
        eyebrow="Sector · Residential RE"
        title={<span><em style={{ fontStyle: 'italic' }}>Residential</em> — {cityName}</span>}
        sub="Launches, sales, weighted PSF, inventory."
        actions={<button className="btn"><Icon name="download" size={14}/> Export</button>}
      />
      <Tabs items={[
        { id:'overview',  label:'Overview' },
        { id:'submarkets',label:'Submarkets', count: submarkets.length },
        { id:'developers',label:'Developers',  count: RESIDENTIAL.developers.length },
        { id:'insights',  label:'Insights' },
      ]} value={tab} onChange={setTab}/>
      <div className="page-body">
        {tab === 'overview' && (
          <Fragment>
            <div className="grid cols-4" style={{ marginBottom: 24 }}>
              <KPI label="Launches FY26" value={formatNum(Math.round(RESIDENTIAL.summary.launchesFY26 * mult))} delta={RESIDENTIAL.summary.yoyLaunchesPct}/>
              <KPI label="Sales FY26" value={formatNum(Math.round(RESIDENTIAL.summary.salesFY26 * mult))} delta={RESIDENTIAL.summary.yoySalesPct} ink/>
              <KPI label="Weighted PSF" value={'₹' + formatNum(Math.round(RESIDENTIAL.summary.psfFY26 * mult))} delta={RESIDENTIAL.summary.yoyPSFPct}/>
              <KPI label="Months inventory" value={RESIDENTIAL.summary.monthsInventory.toFixed(1)} sub="below 24-month line"/>
            </div>
            <div className="grid cols-2" style={{ marginBottom: 24 }}>
              <div className="card">
                <SectionHead eyebrow="Submarkets" title="Launches vs sales · top 10"/>
                <BarChart data={submarkets.slice(0,10)} valueKey="launches" valueKey2="sales" labelKey="name" formatY={v => v >= 1000 ? (v/1000).toFixed(0)+'k' : v}/>
                <div className="legend" style={{ marginTop: 8 }}>
                  <span><span className="swatch" style={{ background: 'var(--ink-900)' }}/>Launches</span>
                  <span><span className="swatch" style={{ background: 'var(--signal-600)' }}/>Sales</span>
                </div>
              </div>
              <div className="card">
                <SectionHead eyebrow="Developers" title="FY26 sales · top 10"/>
                <RankingBars data={[...RESIDENTIAL.developers].sort((a,b)=>b.fy26_sales-a.fy26_sales).slice(0,8)} valueKey="fy26_sales" labelKey="name" formatV={formatNum}/>
              </div>
            </div>
            <div className="card">
              <SectionHead eyebrow="Submarkets" title="Months-of-inventory by market"/>
              <RankingBars data={[...submarkets].sort((a,b)=>b.msi-a.msi).slice(0,12)} valueKey="msi" labelKey="name" formatV={v => v.toFixed(1) + ' mo'} color="var(--clay-500)"/>
            </div>
          </Fragment>
        )}
        {tab === 'submarkets' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Submarket</th><th>City</th><th className="right">PSF</th><th className="right">Launches</th><th className="right">Sales</th><th className="right">Unsold</th><th className="right">MSI</th>
                </tr></thead>
                <tbody>{submarkets.map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td className="muted">{CITIES.find(c=>c.id===s.city)?.short}</td>
                    <td className="num">₹{formatNum(s.psf)}</td>
                    <td className="num">{formatNum(s.launches)}</td>
                    <td className="num">{formatNum(s.sales)}</td>
                    <td className="num muted">{formatNum(s.unsold)}</td>
                    <td className="num">{s.msi.toFixed(1)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'developers' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Developer</th><th className="right">Launches</th><th className="right">Sales</th><th>Top market</th><th>Segment</th>
                </tr></thead>
                <tbody>{RESIDENTIAL.developers.map((d,i) => (
                  <tr key={i}>
                    <td>{d.name}</td>
                    <td className="num">{formatNum(d.fy26_launches)}</td>
                    <td className="num">{formatNum(d.fy26_sales)}</td>
                    <td className="muted">{d.top_market}</td>
                    <td><span className="pill">{d.segment}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'insights' && (
          <div className="card">
            <SectionHead eyebrow="Why it matters" title="What we're seeing"/>
            <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 1.7, color: 'var(--fg-2)' }}>
              {RESIDENTIAL.insights.map((s,i) => <li key={i} style={{ marginBottom: 10 }}>{s}</li>)}
            </ol>
          </div>
        )}
      </div>
    </Fragment>
  );
}
