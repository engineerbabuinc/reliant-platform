import { useState, Fragment } from 'react';
import { MASTER, CITIES, SOURCES, formatCr } from '../data.js';
import { Icon, KPI, SectionHead, Source, Tabs, Delta, PipelineFunnel, RankingBars, Modal } from './Primitives.jsx';
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

const STAGES  = ['Identified','Qualified','Pitched','Term sheet','In execution','Closed FY26'];
const SECTORS = ['hospitality','healthcare','industrial','commercial','residential','land'];

export function MasterDashboard({ market, crmLive, onJump }) {
  const [tab, setTab] = useState('overview');
  const cityName = CITIES.find(c => c.id === market)?.name || 'Pan India';
  const { data: pipeline } = useData(api.pipeline.list);
  const pipelineStages = pipeline
    ? pipeline.map(s => ({ stage: s.stage, count: s.count, value_cr: s.valueCr }))
    : MASTER.pipeline_stages;

  return (
    <Fragment>
      <PageHead
        eyebrow="Reliant Intelligence Platform · FY26"
        title={<span>What's <em style={{ fontStyle:'italic' }}>moving</em> in {cityName}.</span>}
        sub="Cross-sector view — six books, one workbench. Click any tile to drill in."
        actions={<Fragment>
          <button className="btn"><Icon name="filter" size={14}/> Filters</button>
          <button className="btn"><Icon name="download" size={14}/> Export</button>
        </Fragment>}
      />
      <Tabs items={[
        { id:'overview', label:'Overview' },
        { id:'pipeline', label:'Pipeline', count: pipelineStages.reduce((s,x)=>s+x.count,0) },
        { id:'hot',      label:'Hot deals' },
        { id:'feed',     label:'Activity feed' },
      ]} value={tab} onChange={setTab}/>
      <div className="page-body">
        {tab === 'overview' && <MasterOverview market={market} onJump={onJump} pipeline={pipelineStages}/>}
        {tab === 'pipeline' && <MasterPipeline pipeline={pipelineStages}/>}
        {tab === 'hot'      && <MasterHot/>}
        {tab === 'feed'     && <MasterFeed/>}
      </div>
    </Fragment>
  );
}

function MasterOverview({ market, onJump, pipeline }) {
  const { data: hotDeals, loading } = useData(() => api.deals.list('?hot=true'));
  return (
    <Fragment>
      <SectionHead eyebrow="Sectors" title="Six books at a glance" sub="FY26 lead metric and YoY for each Reliant sector." />
      <div className="grid cols-3" style={{ marginBottom:32 }}>
        {MASTER.sectors.map(s => (
          <div key={s.id} className="card" style={{ cursor:'pointer' }} onClick={() => onJump(s.id)}>
            <div className="card-head">
              <div className="card-title">{s.name}</div>
              <Icon name="arrow-right" size={14}/>
            </div>
            <div className="row" style={{ alignItems:'baseline', gap:12 }}>
              <div className="metric">{s.kpi_value}</div>
              <Delta pct={s.kpi_yoy}/>
            </div>
            <div className="page-subtitle" style={{ marginTop:6 }}>{s.kpi_label}</div>
            <div style={{ height:1, background:'var(--border-1)', margin:'14px 0 12px' }}/>
            <div className="row">
              <span className="eyebrow">{s.second_label}</span>
              <span className="spacer"/>
              <span className="metric-num" style={{ fontSize:14 }}>{s.second_value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid cols-2" style={{ marginBottom:32 }}>
        <div className="card">
          <SectionHead eyebrow="Pipeline" title="FY26 funnel"/>
          <PipelineFunnel stages={pipeline}/>
          <Source>{SOURCES.crm}</Source>
        </div>
        <div className="card">
          <SectionHead eyebrow="Hot" title="Live deals to watch"/>
          {loading ? <Spinner/> : (
            <div className="col" style={{ gap:0 }}>
              {(hotDeals||[]).slice(0,5).map((d,i) => (
                <div key={d.id} className="row" style={{ padding:'10px 0', borderBottom:i<4?'1px solid var(--border-1)':0, gap:10 }}>
                  <div className="col" style={{ gap:2, flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13.5, color:'var(--fg-1)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.name}</div>
                    <div style={{ fontSize:11.5, color:'var(--fg-3)' }}>{d.sector} · {CITIES.find(c=>c.id===d.city)?.short} · {d.owner}</div>
                  </div>
                  <span className="pill info">{d.stage}</span>
                  <div className="metric-num" style={{ fontSize:13, width:80, textAlign:'right' }}>₹{Number(d.valueCr).toLocaleString('en-IN')} Cr</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid cols-2">
        <div className="card">
          <SectionHead eyebrow="By city" title="Where the work is" sub="Active mandates per city, FY26"/>
          <RankingBars
            data={CITIES.filter(c=>c.id!=='pan').slice(0,8).map(c=>({ label:c.name, value:Math.round(28*c.mult) })).sort((a,b)=>b.value-a.value)}
            valueKey="value" labelKey="label" formatV={v=>v+' active'} color="var(--ink-900)"
          />
        </div>
        <div className="card">
          <SectionHead eyebrow="Risk" title="What needs attention"/>
          <div className="col" style={{ gap:10 }}>
            <div className="row" style={{ gap:10, padding:10, background:'var(--warn-tint)', borderRadius:8 }}>
              <Icon name="alert" size={16}/>
              <div style={{ fontSize:13 }}>3 stale opportunities · CRM hasn't synced in 3+ days</div>
            </div>
            <div className="row" style={{ gap:10, padding:10, background:'var(--bad-tint)', borderRadius:8 }}>
              <Icon name="alert" size={16}/>
              <div style={{ fontSize:13 }}>2 high-severity data issues open · last 14 days</div>
            </div>
            <div className="row" style={{ gap:10, padding:10, background:'var(--info-tint)', borderRadius:8 }}>
              <Icon name="sparkle" size={16}/>
              <div style={{ fontSize:13 }}>New healthcare RFP — Apollo Pune 250-bed, opened 2h ago</div>
            </div>
            <div className="row" style={{ gap:10, padding:10, background:'var(--ok-tint)', borderRadius:8 }}>
              <Icon name="check" size={16}/>
              <div style={{ fontSize:13 }}>Goa hospitality deal closed — South Goa, 184 keys</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function MasterPipeline({ pipeline }) {
  const total  = pipeline.reduce((s,x)=>s+x.value_cr,0);
  const open   = pipeline.slice(0,5).reduce((s,x)=>s+x.count,0);
  const closed = pipeline[5]?.count || 0;
  return (
    <Fragment>
      <div className="grid cols-4" style={{ marginBottom:24 }}>
        <KPI label="Pipeline value" value={formatCr(total)} delta={18.4} sub="vs FY25"/>
        <KPI label="Open deals"    value={open}   delta={12.0}/>
        <KPI label="Closed FY26"  value={closed}  delta={21.4}/>
        <KPI label="Win rate"     value="38" unit="%" delta={2.4}/>
      </div>
      <div className="card">
        <SectionHead eyebrow="Funnel" title="By stage"/>
        <PipelineFunnel stages={pipeline}/>
        <Source>{SOURCES.crm}</Source>
      </div>
    </Fragment>
  );
}

function MasterHot() {
  const { data: deals, loading, error, setData } = useData(() => api.deals.list(''));
  const [showForm, setShowForm]   = useState(false);
  const [editDeal, setEditDeal]   = useState(null);
  const [form, setForm] = useState({ name:'', sector:'hospitality', stage:'Identified', city:'mum', valueCr:'', owner:'', hot:false, notes:'' });

  function openNew()    { setForm({ name:'', sector:'hospitality', stage:'Identified', city:'mum', valueCr:'', owner:'', hot:false, notes:'' }); setShowForm(true); }
  function openEdit(d)  { setForm({ name:d.name, sector:d.sector, stage:d.stage, city:d.city, valueCr:d.valueCr, owner:d.owner, hot:d.hot, notes:d.notes||'' }); setEditDeal(d); }
  function closeForm()  { setShowForm(false); setEditDeal(null); }

  async function saveDeal() {
    const payload = { ...form, valueCr: parseFloat(form.valueCr)||0 };
    if (editDeal) {
      const updated = await api.deals.update(editDeal.id, payload);
      setData(d => d.map(x => x.id===updated.id ? updated : x));
    } else {
      const created = await api.deals.create(payload);
      setData(d => [created, ...(d||[])]);
    }
    closeForm();
  }

  async function removeDeal(id, e) {
    e.stopPropagation();
    if (!confirm('Delete this deal?')) return;
    await api.deals.remove(id);
    setData(d => d.filter(x => x.id !== id));
  }

  if (loading) return <Spinner/>;
  if (error)   return <Err msg={error}/>;

  return (
    <Fragment>
      <div className="row" style={{ justifyContent:'flex-end', marginBottom:16 }}>
        <button className="btn primary" onClick={openNew}><Icon name="plus" size={14}/> New deal</button>
      </div>
      <div className="card" style={{ padding:0 }}>
        <div className="tbl-wrap" style={{ border:0, maxHeight:'none' }}>
          <table className="tbl">
            <thead><tr>
              <th>Deal</th><th>Sector</th><th>City</th><th>Stage</th><th>Owner</th><th className="right">Value</th><th></th>
            </tr></thead>
            <tbody>
              {(deals||[]).map(d => (
                <tr key={d.id} className="clickable" onClick={() => openEdit(d)}>
                  <td>{d.name}{d.hot && <span className="pill info" style={{ marginLeft:6, fontSize:10, padding:'1px 6px' }}>hot</span>}</td>
                  <td className="muted">{d.sector}</td>
                  <td className="muted">{CITIES.find(c=>c.id===d.city)?.name || d.city}</td>
                  <td><span className="pill info">{d.stage}</span></td>
                  <td className="muted">{d.owner}</td>
                  <td className="num">₹{Number(d.valueCr).toLocaleString('en-IN')} Cr</td>
                  <td onClick={e=>removeDeal(d.id,e)}>
                    <button className="icon-btn"><Icon name="x" size={13}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(showForm || editDeal) && (
        <Modal title={editDeal ? 'Edit deal' : 'New deal'} onClose={closeForm}>
          <div className="col" style={{ gap:14 }}>
            <Field label="Deal name"><input className="input" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="e.g. BKC tower conversion"/></Field>
            <div className="grid cols-2">
              <Field label="Sector">
                <select className="input select" value={form.sector} onChange={e=>setForm(p=>({...p,sector:e.target.value}))}>
                  {SECTORS.map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                </select>
              </Field>
              <Field label="Stage">
                <select className="input select" value={form.stage} onChange={e=>setForm(p=>({...p,stage:e.target.value}))}>
                  {STAGES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid cols-2">
              <Field label="City">
                <select className="input select" value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))}>
                  {CITIES.filter(c=>c.id!=='pan').map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Value (₹ Cr)"><input className="input" type="number" value={form.valueCr} onChange={e=>setForm(p=>({...p,valueCr:e.target.value}))} placeholder="0"/></Field>
            </div>
            <Field label="Owner"><input className="input" value={form.owner} onChange={e=>setForm(p=>({...p,owner:e.target.value}))} placeholder="e.g. A. Khanna"/></Field>
            <Field label="Notes"><textarea className="input" rows={2} value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} style={{ resize:'vertical' }}/></Field>
            <label className="row" style={{ gap:6, cursor:'pointer', fontSize:13 }}>
              <input type="checkbox" checked={!!form.hot} onChange={e=>setForm(p=>({...p,hot:e.target.checked}))}/>
              Mark as hot deal
            </label>
            <div className="row" style={{ justifyContent:'flex-end', gap:8 }}>
              <button className="btn ghost sm" onClick={closeForm}>Cancel</button>
              <button className="btn primary sm" disabled={!form.name||!form.owner} onClick={saveDeal}>Save</button>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}

function MasterFeed() {
  const { data: notifs, loading, error } = useData(api.notifications.list);
  if (loading) return <Spinner/>;
  if (error)   return <Err msg={error}/>;
  return (
    <div className="card">
      <SectionHead eyebrow="Activity" title="Recent" sub="Notifications across deals, data refreshes, CRM events."/>
      <div className="col" style={{ gap:0 }}>
        {(notifs||[]).map((n,i,arr) => (
          <div key={n.id} className="row" style={{ padding:'12px 0', borderBottom:i<arr.length-1?'1px solid var(--border-1)':0, gap:12 }}>
            <span className="pill" style={{ minWidth:84, justifyContent:'center' }}>{n.cat}</span>
            <div style={{ fontSize:13.5, flex:1 }}>{n.title}</div>
            <div style={{ fontSize:11.5, color:'var(--fg-3)', fontFamily:'var(--font-mono)' }}>{n.time} ago</div>
          </div>
        ))}
      </div>
    </div>
  );
}
