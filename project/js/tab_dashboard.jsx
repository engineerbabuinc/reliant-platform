// ============================================================
// TAB 1 — MASTER DASHBOARD
// Sub-tabs: Market Overview | Trends | Top Brands | City Analysis
// ============================================================

function KpiChip({ label, value, delta, deltaDir, sub }) {
  return (
    <div className="card kpi">
      <div className="kpi-num">{value}<LiveBadge /></div>
      <div className="kpi-label">{label}</div>
      {delta && <span className={`kpi-delta ${deltaDir || 'up'}`}>{deltaDir === 'down' ? '↓' : deltaDir === 'flat' ? '→' : '↑'} {delta}</span>}
      {sub && <div className="text-xs text-muted mt-2">{sub}</div>}
    </div>
  );
}

function MarketOverview({ market, openPitchModal }) {
  const f = window.CITY_FACTOR[market] || 1;
  const k = window.PAN_KPIS;
  const dealsK = Math.round(k.dealsClosedYTD * (market === 'panIndia' ? 1 : f * 4.5));
  const gmvK = Math.round(k.gmvCloseCr * (market === 'panIndia' ? 1 : f * 4.5));
  const mandK = Math.round(k.activeMandates * (market === 'panIndia' ? 1 : f * 4.5));
  const topBrands = getSource('topBrands', 'dashboard', market) || [];
  const priority = getSource('priority', 'dashboard', market) || [];
  const sentiment = getSource('sentiment', 'dashboard', market) || [];
  const focus = getSource('focus', 'dashboard', market) || [];
  const reTypes = getSource('reTypes', 'dashboard', market) || [];
  const heat = getSource('heatmap', 'dashboard', market) || [];

  const { sorted, sortKey, sortDir, onSort } = useSortable(topBrands, 'rank', 'asc');
  const [openPitch, setOpenPitch] = React.useState(null);

  return (
    <>
      <div className="row cols-4">
        <KpiChip label="Deals Closed YTD" value={dealsK} delta={`${k.dealsDelta}% vs LY`} deltaDir="up" />
        <KpiChip label="GMV Closed" value={`₹${gmvK} Cr`} delta={`${k.gmvDelta}%`} deltaDir="up" />
        <KpiChip label="Active Mandates" value={mandK} delta="vs 54 LY" deltaDir="up" />
        <KpiChip label="Win Rate" value={`${k.winRate}%`} delta={`+${k.winRateDelta}pp`} deltaDir="up" />
      </div>

      <div className="row cols-2">
        <div className="card">
          <h3>RE Type Priority Score</h3>
          <p className="sub">Composite score of demand × supply gap × Reliant fit, market-weighted.</p>
          <HBar
            labels={priority.map(p => p.type)}
            values={priority.map(p => p.score)}
            color="#C9A84C"
            deps={[market]}
          />
        </div>
        <div className="card">
          <h3>Market Sentiment Pulse</h3>
          <p className="sub">RM-reported sentiment, last 30 days.</p>
          <Donut
            labels={sentiment.map(s => s.label)}
            values={sentiment.map(s => s.value)}
            colors={['#16A34A', '#C9A84C', '#9CA3AF', '#DC2626']}
            deps={[market]}
          />
        </div>
      </div>

      <div className="card">
        <h3>Top 5 Brands to Target This Quarter</h3>
        <div className="tbl-wrap">
          <table className="data">
            <thead>
              <tr>
                <Th k="rank" label="Rank" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="brand" label="Brand" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="sector" label="Sector" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="intent" label="Intent" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <th>Cities Targeting</th>
                <th>Decision Maker</th>
                <Th k="lastTouch" label="Last Touch" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((b, i) => (
                <tr key={i}>
                  <td className="text-strong">#{b.rank}</td>
                  <td><strong>{b.brand}</strong></td>
                  <td><span className="badge badge-navy">{b.sector}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress" style={{ width: 80 }}><div className="progress-bar" style={{ width: `${b.intent}%` }}></div></div>
                      <span className="text-sm text-strong">{b.intent}</span>
                    </div>
                  </td>
                  <td className="text-sm">{b.cities}</td>
                  <td className="text-sm">{b.dm}<div className="text-xs text-muted">{b.dmTitle}</div></td>
                  <td className="text-sm">{b.lastTouch}<LiveBadge /></td>
                  <td><button className="btn btn-primary btn-sm" onClick={() => setOpenPitch(b)}>Pitch Now</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row cols-2-1">
        <div className="card">
          <h3>Top 5 Focus Cities · Opportunity Heatmap</h3>
          <p className="sub">Score 0–100. Cream → Gold → Navy = increasing opportunity.</p>
          <div className="heatmap" style={{ gridTemplateColumns: '120px repeat(5, 1fr)', marginTop: 8 }}>
            <div></div>
            {reTypes.map(t => <div key={t} className="heat-col-label">{t}</div>)}
            {focus.map((city, i) => (
              <React.Fragment key={city}>
                <div className="heat-row-label">{city}</div>
                {heat[i].map((s, j) => (
                  <div key={j} className="heat-cell" style={{ background: heatColor(s), color: heatTextColor(s) }}>{s}</div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Reliant's Position</h3>
          <div className="text-sm text-muted mb-2">Win rate vs peers</div>
          <div className="flex-col gap-2">
            <div><div className="text-xs mb-2">Reliant <strong style={{ float: 'right' }}>67%</strong></div><div className="progress"><div className="progress-bar" style={{ width: '67%' }}></div></div></div>
            <div><div className="text-xs mb-2">Peer Avg <strong style={{ float: 'right' }}>51%</strong></div><div className="progress"><div className="progress-bar navy" style={{ width: '51%' }}></div></div></div>
            <div><div className="text-xs mb-2">Market Leader <strong style={{ float: 'right' }}>72%</strong></div><div className="progress"><div className="progress-bar" style={{ width: '72%', background: '#9CA3AF' }}></div></div></div>
          </div>
          <div className="mt-4">
            <h4>Deals by Division</h4>
            <Donut
              labels={['Hospitality', 'Industrial', 'Commercial', 'Healthcare', 'Residential']}
              values={[11, 9, 7, 4, 3]}
              colors={['#C9A84C', '#0B1C3F', '#3B82F6', '#DC2626', '#16A34A']}
              height={150}
              deps={[market]}
            />
          </div>
          <div className="mt-3">
            <div className="text-xs text-muted mb-2">GMV closed (last 6 months, ₹Cr)</div>
            <Sparkline data={[112, 96, 134, 158, 142, 178]} />
          </div>
        </div>
      </div>

      <Modal open={!!openPitch} onClose={() => setOpenPitch(null)} title={openPitch ? `Pitch — ${openPitch.brand}` : ''} width={520}>
        {openPitch && (
          <div>
            <p><strong>Sector:</strong> {openPitch.sector}</p>
            <p><strong>RM Assigned:</strong> {openPitch.rm}</p>
            <p><strong>Decision Maker:</strong> {openPitch.dm} · {openPitch.dmTitle}</p>
            <p><strong>Last note:</strong> Intent score {openPitch.intent}/100. Targeting {openPitch.cities}. Last CRM touch: {openPitch.lastTouch}.</p>
            <div className="mt-3 flex-row gap-2">
              <button className="btn btn-primary">Generate Pitch Deck</button>
              <button className="btn btn-secondary">Open in CRM</button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

function TrendsView({ market }) {
  const [horizon, setHorizon] = React.useState('5');
  const trends = window.TRENDS;
  const years = horizon === '5' ? window.YEARS_5 : window.YEARS_10;
  const slice = (arr) => horizon === '5' ? arr.slice(-5) : arr;

  const buildLines = (key, suffix) => ({
    suffix,
    datasets: Object.keys(trends[key]).map(sec => ({
      label: sec,
      data: slice(trends[key][sec]),
      borderColor: SECTOR_COLOR[sec],
      backgroundColor: SECTOR_COLOR[sec],
    })),
  });

  const charts = [
    { title: 'Absorption (msf)', ...buildLines('absorption', ' msf') },
    { title: 'Avg Lease Rate (₹/sqft/mo)', ...buildLines('leaseRate', '') },
    { title: 'Capital Values (₹/sqft)', ...buildLines('capValue', '') },
    { title: 'Gross Yield (%)', ...buildLines('yield', '%') },
    { title: 'Supply Pipeline (msf)', ...buildLines('supply', ' msf') },
    { title: 'Active Brand Mandates', ...buildLines('mandates', '') },
  ];

  return (
    <>
      <div className="flex-row mb-3" style={{ justifyContent: 'space-between' }}>
        <div className="text-sm text-muted">Multi-year RE trends across all five sectors.</div>
        <div className="pill-toggle">
          <button className={horizon === '5' ? 'active' : ''} onClick={() => setHorizon('5')}>5 Years</button>
          <button className={horizon === '10' ? 'active' : ''} onClick={() => setHorizon('10')}>10 Years</button>
        </div>
      </div>
      <div className="row cols-2">
        {charts.slice(0, 2).map(c => (
          <div key={c.title} className="card"><h3>{c.title}</h3><TrendLines labels={years} datasets={c.datasets} suffix={c.suffix} deps={[horizon, market]} height={240} /></div>
        ))}
      </div>
      <div className="row cols-2">
        {charts.slice(2, 4).map(c => (
          <div key={c.title} className="card"><h3>{c.title}</h3><TrendLines labels={years} datasets={c.datasets} suffix={c.suffix} deps={[horizon, market]} height={240} /></div>
        ))}
      </div>
      <div className="row cols-2">
        {charts.slice(4, 6).map(c => (
          <div key={c.title} className="card"><h3>{c.title}</h3><TrendLines labels={years} datasets={c.datasets} suffix={c.suffix} deps={[horizon, market]} height={240} /></div>
        ))}
      </div>
    </>
  );
}

function TopBrandsFocus({ market }) {
  const [q, setQ] = React.useState('');
  const dq = useDebounce(q, 300);
  const [filter, setFilter] = React.useState('All');
  const brands = window.ALL_BRANDS;
  const filtered = brands.filter(b =>
    (filter === 'All' || b.sector === filter) &&
    (dq === '' || b.name.toLowerCase().includes(dq.toLowerCase()) || b.dm.toLowerCase().includes(dq.toLowerCase()))
  );

  return (
    <>
      <div className="card mb-4">
        <div className="flex-row gap-3" style={{ flexWrap: 'wrap' }}>
          <div className="field" style={{ flex: 1, minWidth: 240 }}>
            <input placeholder="Search brand or decision maker..." value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <div className="chips">
            {['All', 'Hospitality', 'Healthcare', 'Industrial', 'Commercial', 'Residential'].map(f => (
              <div key={f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="row cols-3">
        {filtered.map(b => (
          <div key={b.name} className="brand-card">
            <div className="flex-row gap-3" style={{ alignItems: 'flex-start' }}>
              <BrandLogo name={b.name} color={b.color} />
              <div style={{ flex: 1 }}>
                <div className="flex-row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <strong style={{ fontSize: 14, color: '#0B1C3F' }}>{b.name}</strong>
                </div>
                <div className="flex-row gap-2 mt-2" style={{ flexWrap: 'wrap' }}>
                  <span className="badge badge-navy">{b.sector}</span>
                  <span className="badge badge-grey">{b.fundraise}</span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xs text-muted mb-2">Intent Score <strong style={{ float: 'right', color: '#0B1C3F' }}>{b.intent}/100</strong></div>
              <div className="progress"><div className="progress-bar" style={{ width: `${b.intent}%` }}></div></div>
            </div>
            <div className="mt-3 text-xs"><strong className="text-strong">↑{b.delta} stores</strong> in 12 months</div>
            <div className="mt-3 text-sm"><strong>DM:</strong> {b.dm} <span className="text-muted">· {b.dmTitle}</span></div>
            <div className="mt-2 text-sm text-muted" style={{ lineHeight: 1.5 }}>{b.fit}</div>
            <button className="btn btn-ghost btn-sm mt-2" style={{ padding: '6px 0' }}>View Full Profile →</button>
          </div>
        ))}
      </div>
    </>
  );
}

function CityAnalysis({ market, setMarket }) {
  const cities = window.CITIES.filter(c => c.id !== 'panIndia');
  const detail = window.CITY_DETAIL[market] || window.CITY_DETAIL.panIndia;
  const infra = (window.CITY_INFRA[market] || window.CITY_INFRA.default);
  const rera = window.CITY_RERA, reraVals = window.CITY_RERA_VALUES;
  const micro = (window.CITY_MICROMARKETS[market] || window.CITY_MICROMARKETS.default);
  const rel = window.CITY_RELIANT;
  const { sorted, sortKey, sortDir, onSort } = useSortable(micro, 'mm', 'asc');

  return (
    <>
      <div className="card mb-4">
        <h3>Select City</h3>
        <div className="row cols-4" style={{ marginBottom: 0 }}>
          {cities.map(c => (
            <button
              key={c.id}
              className="brand-card"
              style={{ textAlign: 'left', cursor: 'pointer', padding: 14, border: market === c.id ? '2px solid #C9A84C' : '1px solid #EFEFEF' }}
              onClick={() => setMarket(c.id)}
            >
              <strong style={{ color: '#0B1C3F' }}>{c.name}</strong>
              <div className="text-xs text-muted mt-2">{c.state}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card mb-4">
        <h3>City Overview · {window.CITIES.find(c => c.id === market)?.name || 'Pan India'}</h3>
        <div className="row cols-4" style={{ marginBottom: 0 }}>
          <div><div className="kpi-label">Population</div><div className="kpi-num">{detail.pop}</div></div>
          <div><div className="kpi-label">GDP / Capita</div><div className="kpi-num">{detail.gdpPC}</div></div>
          <div><div className="kpi-label">Tier</div><div className="kpi-num" style={{ fontSize: 22 }}>{detail.tier}</div></div>
          <div><div className="kpi-label">Top Employers</div><div className="text-sm mt-2">{detail.employers}</div></div>
        </div>
      </div>

      <div className="row cols-2">
        <div className="card">
          <h3>Infrastructure Catalysts</h3>
          <div className="flex-col gap-3 mt-3">
            {infra.map((it, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: 12, background: '#FBFAF6', borderRadius: 10 }}>
                <div style={{ width: 4, background: it.status === 'Operational' ? '#16A34A' : it.status === 'Under Construction' ? '#C9A84C' : '#9CA3AF', borderRadius: 4 }}></div>
                <div style={{ flex: 1 }}>
                  <strong>{it.name}</strong>
                  <div className="text-xs text-muted mt-2">{it.timeline} · {it.impact}</div>
                </div>
                <span className={`badge ${it.status === 'Operational' ? 'badge-green' : it.status === 'Under Construction' ? 'badge-gold' : 'badge-grey'}`}>{it.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>RERA Project Density · By Micromarket</h3>
          <VBar
            labels={rera}
            datasets={[{ label: 'Projects Registered', data: reraVals, backgroundColor: '#0B1C3F' }]}
            deps={[market]}
            height={260}
          />
        </div>
      </div>

      <div className="card">
        <h3>Micromarket Deep Dive</h3>
        <div className="tbl-wrap">
          <table className="data">
            <thead>
              <tr>
                <Th k="mm" label="Micromarket" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="land" label="Avg Land Rate (₹K/sqft)" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="lease" label="Lease (₹/sqft/mo)" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="vacancy" label="Vacancy %" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <th>Top Occupier</th>
                <Th k="yoy" label="YoY" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              </tr>
            </thead>
            <tbody>
              {sorted.map((m, i) => (
                <tr key={i}>
                  <td><strong>{m.mm}</strong></td>
                  <td>{m.land}</td>
                  <td>₹{m.lease}</td>
                  <td>{m.vacancy}%</td>
                  <td>{m.top}</td>
                  <td><span className="badge badge-green">{m.yoy}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3>Reliant Activity in this City</h3>
        <div className="row cols-3" style={{ marginBottom: 0 }}>
          <KpiChip label="Active Mandates" value={rel.mandates} />
          <KpiChip label="Deals Won FY26" value={rel.won} />
          <KpiChip label="Brands Placed" value={rel.brands} />
        </div>
      </div>
    </>
  );
}

function TabDashboard({ market, setMarket }) {
  const [sub, setSub] = React.useState('overview');
  return (
    <div className="tabpane">
      <div className="subtabs">
        <button className={sub === 'overview' ? 'active' : ''} onClick={() => setSub('overview')}>Market Overview</button>
        <button className={sub === 'trends' ? 'active' : ''} onClick={() => setSub('trends')}>5yr / 10yr Trends</button>
        <button className={sub === 'brands' ? 'active' : ''} onClick={() => setSub('brands')}>Top Brands Focus</button>
        <button className={sub === 'cities' ? 'active' : ''} onClick={() => setSub('cities')}>City Analysis</button>
      </div>
      {sub === 'overview' && <MarketOverview market={market} />}
      {sub === 'trends' && <TrendsView market={market} />}
      {sub === 'brands' && <TopBrandsFocus market={market} />}
      {sub === 'cities' && <CityAnalysis market={market} setMarket={setMarket} />}
      <DataSources tab="dashboard" />
    </div>
  );
}

Object.assign(window, { TabDashboard, KpiChip });
