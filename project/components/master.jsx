/* Master Dashboard — sector roll-ups, pipeline, hot deals */

function MasterDashboard({ market, crmLive, onJump }) {
  const M = window.RELIANT.MASTER;
  const F = window.RELIANT;
  const [tab, setTab] = useState('overview');
  const cityName = F.CITIES.find(c => c.id === market)?.name || 'Pan India';

  return (
    <Fragment>
      <PageHead
        eyebrow="Reliant Intelligence Platform · FY26"
        title={<span>What's <em style={{ fontStyle: 'italic' }}>moving</em> in {cityName}.</span>}
        sub="Cross-sector view — six books, one workbench. Click any tile to drill in."
        actions={<Fragment>
          <button className="btn"><Icon name="filter" size={14}/> Filters</button>
          <button className="btn"><Icon name="download" size={14}/> Export</button>
          <button className="btn primary"><Icon name="plus" size={14}/> New deal</button>
        </Fragment>}
      />
      <Tabs items={[
        { id:'overview',  label:'Overview' },
        { id:'pipeline',  label:'Pipeline', count: M.pipeline_stages.reduce((s,x)=>s+x.count,0) },
        { id:'hot',       label:'Hot deals', count: M.hot_deals.length },
        { id:'feed',      label:'Activity feed' },
      ]} value={tab} onChange={setTab} />

      <div className="page-body">
        {tab === 'overview' && <MasterOverview market={market} onJump={onJump} crmLive={crmLive}/>}
        {tab === 'pipeline' && <MasterPipeline crmLive={crmLive}/>}
        {tab === 'hot' && <MasterHot/>}
        {tab === 'feed' && <MasterFeed/>}
      </div>
    </Fragment>
  );
}

function MasterOverview({ market, onJump, crmLive }) {
  const M = window.RELIANT.MASTER;
  const F = window.RELIANT;
  return (
    <Fragment>
      {/* Sector tiles */}
      <SectionHead eyebrow="Sectors" title="Six books at a glance" sub="FY26 lead metric and YoY for each Reliant sector." />
      <div className="grid cols-3" style={{ marginBottom: 32 }}>
        {M.sectors.map(s => (
          <div key={s.id} className="card" style={{ cursor: 'pointer' }} onClick={() => onJump(s.id)}>
            <div className="card-head">
              <div className="card-title">{s.name}</div>
              <Icon name="arrow-right" size={14}/>
            </div>
            <div className="row" style={{ alignItems: 'baseline', gap: 12 }}>
              <div className="metric">{s.kpi_value}</div>
              <Delta pct={s.kpi_yoy}/>
            </div>
            <div className="page-subtitle" style={{ marginTop: 6 }}>{s.kpi_label}</div>
            <div style={{ height: 1, background: 'var(--border-1)', margin: '14px 0 12px' }}/>
            <div className="row">
              <span className="eyebrow">{s.second_label}</span>
              <span className="spacer"/>
              <span className="metric-num" style={{ fontSize: 14 }}>{s.second_value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline + hot deals */}
      <div className="grid cols-2" style={{ marginBottom: 32 }}>
        <div className="card">
          <SectionHead eyebrow="Pipeline" title="FY26 funnel" right={<button className="btn ghost sm">View all <Icon name="arrow-right" size={12}/></button>}/>
          <PipelineFunnel stages={M.pipeline_stages}/>
          <Source>{F.SOURCES.crm}</Source>
        </div>
        <div className="card">
          <SectionHead eyebrow="Hot" title="Live deals to watch" right={<button className="btn ghost sm">All deals <Icon name="arrow-right" size={12}/></button>}/>
          <div className="col" style={{ gap: 0 }}>
            {M.hot_deals.slice(0,5).map((d,i) => (
              <div key={i} className="row" style={{ padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--border-1)' : 0, gap: 10 }}>
                <div className="col" style={{ gap: 2, flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, color: 'var(--fg-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--fg-3)' }}>{d.sector} · {F.CITIES.find(c=>c.id===d.city)?.short} · {d.owner}</div>
                </div>
                <span className="pill info">{d.stage}</span>
                <div className="metric-num" style={{ fontSize: 13, width: 80, textAlign: 'right' }}>₹{d.value_cr.toLocaleString('en-IN')} Cr</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cross-sector map of activity */}
      <div className="grid cols-2">
        <div className="card">
          <SectionHead eyebrow="By city" title="Where the work is" sub="Active mandates per city, FY26"/>
          <RankingBars
            data={F.CITIES.filter(c => c.id !== 'pan').slice(0,8).map(c => ({
              label: c.name,
              value: Math.round(28 * c.mult)
            })).sort((a,b) => b.value - a.value)}
            valueKey="value" labelKey="label"
            formatV={v => v + ' active'}
            color="var(--ink-900)"
          />
        </div>
        <div className="card">
          <SectionHead eyebrow="Risk" title="What needs attention" sub="From issue tracker + CRM signals"/>
          <div className="col" style={{ gap: 10 }}>
            <div className="row" style={{ gap: 10, padding: 10, background: 'var(--warn-tint)', borderRadius: 8 }}>
              <Icon name="alert" size={16}/>
              <div style={{ fontSize: 13 }}>3 stale opportunities · CRM hasn't synced in 3+ days</div>
            </div>
            <div className="row" style={{ gap: 10, padding: 10, background: 'var(--bad-tint)', borderRadius: 8 }}>
              <Icon name="alert" size={16}/>
              <div style={{ fontSize: 13 }}>2 high-severity data issues open · last 14 days</div>
            </div>
            <div className="row" style={{ gap: 10, padding: 10, background: 'var(--info-tint)', borderRadius: 8 }}>
              <Icon name="sparkle" size={16}/>
              <div style={{ fontSize: 13 }}>New healthcare RFP — Apollo Pune 250-bed, opened 2h ago</div>
            </div>
            <div className="row" style={{ gap: 10, padding: 10, background: 'var(--ok-tint)', borderRadius: 8 }}>
              <Icon name="check" size={16}/>
              <div style={{ fontSize: 13 }}>Goa hospitality deal closed — South Goa, 184 keys</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function MasterPipeline({ crmLive }) {
  const M = window.RELIANT.MASTER;
  const F = window.RELIANT;
  return (
    <Fragment>
      <div className="grid cols-4" style={{ marginBottom: 24 }}>
        <KPI label="Pipeline value" value={F.formatCr(M.pipeline_stages.reduce((s,x)=>s+x.value_cr,0))} delta={18.4} sub="vs FY25"/>
        <KPI label="Open deals" value={M.pipeline_stages.slice(0,5).reduce((s,x)=>s+x.count,0)} delta={12.0}/>
        <KPI label="Closed FY26" value={M.pipeline_stages[5].count} delta={21.4}/>
        <KPI label="Win rate" value="38" unit="%" delta={2.4}/>
      </div>
      <div className="card">
        <SectionHead eyebrow="Funnel" title="By stage"/>
        <PipelineFunnel stages={M.pipeline_stages}/>
        <Source>{F.SOURCES.crm}</Source>
      </div>
    </Fragment>
  );
}

function MasterHot() {
  const M = window.RELIANT.MASTER;
  const F = window.RELIANT;
  return (
    <div className="card" style={{ padding: 0 }}>
      <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
        <table className="tbl">
          <thead><tr>
            <th>Deal</th><th>Sector</th><th>City</th><th>Stage</th><th>Owner</th><th className="right">Value</th>
          </tr></thead>
          <tbody>
            {M.hot_deals.map((d,i) => (
              <tr key={i} className="clickable">
                <td>{d.name}</td>
                <td className="muted">{d.sector}</td>
                <td className="muted">{F.CITIES.find(c=>c.id===d.city)?.name}</td>
                <td><span className="pill info">{d.stage}</span></td>
                <td className="muted">{d.owner}</td>
                <td className="num">₹{d.value_cr.toLocaleString('en-IN')} Cr</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MasterFeed() {
  const M = window.RELIANT.MASTER;
  return (
    <div className="card">
      <SectionHead eyebrow="Activity" title="Recent" sub="Notifications across deals, data refreshes, CRM events."/>
      <div className="col" style={{ gap: 0 }}>
        {M.notifications.map((n,i) => (
          <div key={i} className="row" style={{ padding: '12px 0', borderBottom: i < M.notifications.length - 1 ? '1px solid var(--border-1)' : 0, gap: 12 }}>
            <span className="pill" style={{ minWidth: 84, justifyContent: 'center' }}>{n.cat}</span>
            <div style={{ fontSize: 13.5, flex: 1 }}>{n.title}</div>
            <div style={{ fontSize: 11.5, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{n.time} ago</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { MasterDashboard });
