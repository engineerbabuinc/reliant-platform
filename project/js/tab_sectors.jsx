// ============================================================
// TABS 2-6 — Hospitality, Healthcare, Industrial, Commercial, Residential
// ============================================================

// ---------- TAB 2: HOSPITALITY ----------
function TabHospitality({ market }) {
  const brands = window.HOSP_BRANDS;
  const td = window.HOSP_TIER_DEMAND;
  const cr = window.HOSP_CITY_RATES;
  const mand = window.HOSP_MANDATES;
  const drv = window.HOSP_DRIVERS;
  const { sorted, sortKey, sortDir, onSort } = useSortable(brands, 'keys', 'desc');

  return (
    <div className="tabpane">
      <div className="card">
        <h3>Brand Pipeline</h3>
        <div className="tbl-wrap">
          <table className="data">
            <thead>
              <tr>
                <Th k="brand" label="Brand" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="tier" label="Tier" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="keys" label="Keys Planned FY27" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <th>Target Cities</th>
                <th>Site Criteria</th>
                <th>Format</th>
                <th>Decision Maker</th>
                <Th k="status" label="Reliant Status" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              </tr>
            </thead>
            <tbody>
              {sorted.map((b, i) => (
                <tr key={i}>
                  <td><strong>{b.brand}</strong></td>
                  <td><span className="badge badge-navy">{b.tier}</span></td>
                  <td className="text-strong">{fmtNum(b.keys)}</td>
                  <td className="text-sm">{b.cities}</td>
                  <td className="text-sm">{b.criteria}</td>
                  <td className="text-sm">{b.format}</td>
                  <td className="text-sm">{b.dm}</td>
                  <td><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row cols-2">
        <div className="card">
          <h3>Tier-wise Demand Index</h3>
          <VBar
            labels={td.labels}
            datasets={[
              { label: 'Occupancy %', data: td.occupancy, backgroundColor: '#0B1C3F' },
              { label: 'ADR ÷ 100', data: td.adr.map(v => v / 100), backgroundColor: '#C9A84C' },
              { label: 'RevPAR ÷ 100', data: td.revpar.map(v => v / 100), backgroundColor: '#16A34A' },
            ]}
            deps={[market]}
            height={260}
          />
        </div>
        <div className="card">
          <h3>ADR & RevPAR by City (₹)</h3>
          <VBar
            labels={cr.map(c => c.city)}
            datasets={[
              { label: 'ADR', data: cr.map(c => c.adr), backgroundColor: '#C9A84C' },
              { label: 'RevPAR', data: cr.map(c => c.revpar), backgroundColor: '#0B1C3F' },
            ]}
            deps={[market]}
            height={260}
          />
        </div>
      </div>

      <div className="card">
        <h3>Reliant Active Hospitality Mandates</h3>
        <div className="row cols-3" style={{ marginBottom: 0 }}>
          {mand.map((m, i) => (
            <div key={i} className="brand-card">
              <strong style={{ color: '#0B1C3F' }}>{m.parcel}</strong>
              <div className="text-xs text-muted mt-2">{m.city} · {m.area} acres</div>
              <div className="mt-3 flex-row" style={{ justifyContent: 'space-between' }}>
                <span className="text-sm">Ask: <strong>₹{m.ask} Cr</strong></span>
                <StatusBadge status={m.stage} />
              </div>
              <div className="mt-2 text-sm"><span className="text-muted">Brand:</span> {m.brand}</div>
              <div className="text-sm"><span className="text-muted">RM:</span> {m.rm}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Demand Drivers</h3>
        <div className="row cols-4" style={{ marginBottom: 0 }}>
          {drv.map((d, i) => (
            <div key={i}>
              <div className="kpi-label">{d.label}</div>
              <div className="kpi-num">{d.value}</div>
              <span className="kpi-delta up">↑ {d.delta}</span>
            </div>
          ))}
        </div>
      </div>
      <DataSources tab="hospitality" />
    </div>
  );
}

// ---------- TAB 3: HEALTHCARE ----------
function TabHealthcare({ market }) {
  const ch = window.HEALTH_CHAINS;
  const dia = window.HEALTH_DIAGNOSTIC;
  const ins = window.HEALTH_INSURANCE;
  const ppp = window.HEALTH_PPP;
  const kpis = window.HEALTH_KPIS;
  const { sorted, sortKey, sortDir, onSort } = useSortable(ch, 'planned', 'desc');

  return (
    <div className="tabpane">
      <div className="row cols-4">
        {kpis.map((k, i) => (
          <div key={i} className="card kpi">
            <div className="kpi-num">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="text-xs text-muted mt-2">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Hospital Chain Expansion Tracker</h3>
        <div className="tbl-wrap">
          <table className="data">
            <thead>
              <tr>
                <Th k="chain" label="Chain" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="operational" label="Beds Op" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="planned" label="Beds Planned FY27" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <th>Specialties</th>
                <th>Target Cities</th>
                <th>Land (acres)</th>
                <Th k="status" label="Status" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => (
                <tr key={i}>
                  <td><strong>{c.chain}</strong></td>
                  <td>{fmtNum(c.operational)}</td>
                  <td className="text-strong">+{c.planned}</td>
                  <td className="text-sm">{c.specialties}</td>
                  <td className="text-sm">{c.cities}</td>
                  <td>{c.land}</td>
                  <td><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3>Diagnostic & Daycare Expansion</h3>
        <div className="row cols-3" style={{ marginBottom: 0 }}>
          {dia.map((d, i) => (
            <div key={i} className="brand-card">
              <div className="flex-row gap-3">
                <BrandLogo name={d.name} color={d.color} />
                <strong style={{ color: '#0B1C3F' }}>{d.name}</strong>
              </div>
              <div className="text-sm mt-3"><span className="text-muted">Cities:</span> {d.cities}</div>
              <div className="text-sm mt-2"><span className="text-muted">Per centre:</span> {d.sqft} sqft</div>
              <div className="text-sm mt-2 text-strong">{d.expansion}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="row cols-2">
        <div className="card">
          <h3>Insurance Penetration by State</h3>
          <HBar
            labels={ins.map(i => i.state)}
            values={ins.map(i => i.pen)}
            color="#A11823"
            max={100}
            suffix="%"
            height={300}
            deps={[market]}
          />
        </div>
        <div className="card">
          <h3>PPP & Land-Grant Opportunities</h3>
          <div className="tbl-wrap">
            <table className="data">
              <thead><tr><th>State / City</th><th>Subsidy</th><th>Condition</th></tr></thead>
              <tbody>
                {ppp.map((p, i) => (
                  <tr key={i}>
                    <td><strong>{p.state}</strong><div className="text-xs text-muted">{p.city}</div></td>
                    <td className="text-sm">{p.subsidy}</td>
                    <td className="text-sm">{p.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DataSources tab="healthcare" />
    </div>
  );
}

// ---------- TAB 4: INDUSTRIAL ----------
function TabIndustrial({ market }) {
  const kpis = window.IND_KPIS;
  const tpl = window.IND_3PL;
  const mfg = window.IND_MFG;
  const cor = window.IND_CORRIDORS;
  const sup = window.IND_SUPPLY;

  return (
    <div className="tabpane">
      <div className="row cols-4">
        {kpis.map((k, i) => (
          <div key={i} className="card kpi">
            <div className="kpi-num">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <span className="kpi-delta up">{k.delta}</span>
          </div>
        ))}
      </div>

      <div className="row cols-2">
        <div className="card">
          <h3>3PL & E-commerce</h3>
          <div className="tbl-wrap">
            <table className="data">
              <thead><tr><th>Company</th><th>Sqft FY26 (msf)</th><th>Cities</th><th>FY27 Plan</th></tr></thead>
              <tbody>
                {tpl.map((t, i) => (
                  <tr key={i}>
                    <td><strong>{t.co}</strong></td>
                    <td className="text-strong">{t.sqft}</td>
                    <td className="text-sm">{t.cities}</td>
                    <td className="text-sm">{t.next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <h3>Manufacturing & PLI</h3>
          <div className="tbl-wrap">
            <table className="data">
              <thead><tr><th>Sector</th><th>Key Cos</th><th>PLI ₹Cr</th><th>Land</th></tr></thead>
              <tbody>
                {mfg.map((m, i) => (
                  <tr key={i}>
                    <td><strong>{m.sector}</strong></td>
                    <td className="text-sm">{m.cos}</td>
                    <td className="text-strong">₹{fmtNum(m.pli)}</td>
                    <td className="text-sm">{m.land}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Logistics Corridor Network</h3>
        <div className="row cols-2" style={{ marginBottom: 0 }}>
          {cor.map((c, i) => (
            <div key={i} style={{ padding: 14, background: '#FBFAF6', borderRadius: 12, borderLeft: '3px solid #C9A84C' }}>
              <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                <strong style={{ color: '#0B1C3F' }}>{c.name}</strong>
                <span className="badge badge-gold">{c.length}</span>
              </div>
              <div className="text-sm mt-2"><span className="text-muted">Anchors:</span> {c.anchors}</div>
              <div className="text-sm mt-2"><span className="text-muted">Status:</span> {c.status}</div>
              <div className="text-sm mt-2 text-strong">{c.impact}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Warehouse Supply Pipeline by City (msf)</h3>
        <VBar
          labels={sup.map(s => s.city)}
          datasets={[
            { label: 'Completed FY26', data: sup.map(s => s.completed), backgroundColor: '#0B1C3F' },
            { label: 'Under Construction', data: sup.map(s => s.uc), backgroundColor: '#C9A84C' },
            { label: 'Planned FY27-28', data: sup.map(s => s.planned), backgroundColor: '#9CA3AF' },
          ]}
          deps={[market]}
          height={280}
          suffix=" msf"
        />
      </div>
      <DataSources tab="industrial" />
    </div>
  );
}

// ---------- TAB 5: COMMERCIAL ----------
function TabCommercial({ market }) {
  const kpis = window.COMM_KPIS;
  const gcc = window.COMM_GCC;
  const cw = window.COMM_COWORK;
  const sez = window.COMM_SEZ;
  const pip = window.COMM_PIPELINE;
  const { sorted, sortKey, sortDir, onSort } = useSortable(gcc, 'expansion', 'desc');

  return (
    <div className="tabpane">
      <div className="row cols-4">
        {kpis.map((k, i) => (
          <div key={i} className="card kpi">
            <div className="kpi-num">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <span className="kpi-delta up">{k.delta}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Tech & GCC Demand</h3>
        <div className="tbl-wrap">
          <table className="data">
            <thead>
              <tr>
                <Th k="co" label="Company" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="current" label="Current (msf)" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="expansion" label="Expansion (msf)" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <th>Cities Shortlisted</th>
                <Th k="type" label="Type" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <th>DM</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((g, i) => (
                <tr key={i}>
                  <td><strong>{g.co}</strong></td>
                  <td>{g.current}</td>
                  <td className="text-strong">+{g.expansion}</td>
                  <td className="text-sm">{g.cities}</td>
                  <td><span className={`badge ${g.type === 'GCC' ? 'badge-gold' : 'badge-navy'}`}>{g.type}</span></td>
                  <td className="text-sm">{g.dm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3>Coworking Footprint Tracker</h3>
        <div className="row cols-3" style={{ marginBottom: 0 }}>
          {cw.map((c, i) => (
            <div key={i} className="brand-card">
              <div className="flex-row gap-3">
                <BrandLogo name={c.name} color={c.color} />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#0B1C3F' }}>{c.name}</strong>
                  <div className="text-xs text-muted mt-2">{fmtNum(c.seats)} seats live</div>
                </div>
              </div>
              <div className="text-sm mt-3"><span className="text-muted">Cities:</span> {c.cities}</div>
              <div className="text-sm mt-2 text-strong">{c.target}</div>
              <div className="mt-3">
                <div className="text-xs mb-2">Occupancy <strong style={{ float: 'right' }}>{c.occ}%</strong></div>
                <div className="progress"><div className="progress-bar" style={{ width: `${c.occ}%` }}></div></div>
              </div>
              <div className="mt-3"><StatusBadge status={c.status} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="row cols-2">
        <div className="card">
          <h3>SEZ vs Non-SEZ Absorption (msf)</h3>
          <VBar
            labels={sez.map(s => s.city)}
            datasets={[
              { label: 'SEZ', data: sez.map(s => s.sez), backgroundColor: '#C9A84C' },
              { label: 'Non-SEZ', data: sez.map(s => s.nonSez), backgroundColor: '#0B1C3F' },
            ]}
            stacked
            deps={[market]}
            height={280}
          />
        </div>
        <div className="card">
          <h3>Supply Pipeline by Micromarket</h3>
          <div className="tbl-wrap">
            <table className="data">
              <thead><tr><th>City</th><th>Micromarket</th><th>U/C (msf)</th><th>Completion</th><th>Anchor</th></tr></thead>
              <tbody>
                {pip.map((p, i) => (
                  <tr key={i}>
                    <td><strong>{p.city}</strong></td>
                    <td className="text-sm">{p.micromarket}</td>
                    <td className="text-strong">{p.uc}</td>
                    <td className="text-sm">{p.completion}</td>
                    <td className="text-sm">{p.anchor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DataSources tab="commercial" />
    </div>
  );
}

// ---------- TAB 6: RESIDENTIAL ----------
function TabResidential({ market }) {
  const kpis = window.RESI_KPIS;
  const ticket = window.RESI_TICKET;
  const dev = window.RESI_DEVELOPERS;
  const seg = window.RESI_SEGMENTS;
  const { sorted, sortKey, sortDir, onSort } = useSortable(dev, 'launches', 'desc');

  return (
    <div className="tabpane">
      <div className="row cols-4" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {kpis.map((k, i) => (
          <div key={i} className="card kpi">
            <div className="kpi-num" style={{ fontSize: 24 }}>{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <span className="kpi-delta up">{k.delta}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Absorption by Ticket Size · Units Sold FY26</h3>
        <VBar
          labels={ticket.labels}
          datasets={[{ label: 'Units', data: ticket.values, backgroundColor: '#C9A84C' }]}
          deps={[market]}
          height={260}
        />
      </div>

      <div className="card">
        <h3>Top Developer Scoreboard</h3>
        <div className="tbl-wrap">
          <table className="data">
            <thead>
              <tr>
                <Th k="dev" label="Developer" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="launches" label="Launches FY26" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="sellThru" label="Sell-thru %" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="avg" label="Avg ₹Cr" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <th>Cities</th>
                <Th k="overhang" label="Overhang (mo)" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="rating" label="Rating" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              </tr>
            </thead>
            <tbody>
              {sorted.map((d, i) => (
                <tr key={i}>
                  <td><strong>{d.dev}</strong></td>
                  <td>{fmtNum(d.launches)}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress" style={{ width: 60 }}><div className="progress-bar green" style={{ width: `${d.sellThru}%` }}></div></div>
                      <span className="text-sm">{d.sellThru}%</span>
                    </div>
                  </td>
                  <td>{d.avg}</td>
                  <td className="text-sm">{d.cities}</td>
                  <td>{d.overhang}</td>
                  <td><span className="badge badge-gold">{d.rating}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3>Buyer Segment Heat</h3>
        <div className="row cols-3" style={{ marginBottom: 0 }}>
          <div className="brand-card">
            <strong style={{ color: '#0B1C3F' }}>NRI</strong>
            <div className="kpi-num mt-2">{seg.nri.share}%</div>
            <div className="kpi-label">Of total sales</div>
            <div className="text-sm mt-3"><span className="text-muted">Sources:</span> {seg.nri.sources}</div>
            <div className="text-sm mt-2"><span className="text-muted">Cities:</span> {seg.nri.cities}</div>
          </div>
          <div className="brand-card">
            <strong style={{ color: '#0B1C3F' }}>HNI (₹5Cr+)</strong>
            <div className="kpi-num mt-2">{seg.hni.share}%</div>
            <div className="kpi-label">Of value</div>
            <div className="text-sm mt-3 text-strong">{seg.hni.trend}</div>
            <div className="text-sm mt-2"><span className="text-muted">Preferred:</span> {seg.hni.preferred}</div>
          </div>
          <div className="brand-card">
            <strong style={{ color: '#0B1C3F' }}>End-User</strong>
            <div className="kpi-num mt-2">{seg.endUser.share}%</div>
            <div className="kpi-label">Of units</div>
            <div className="text-sm mt-3"><span className="text-muted">Affordability:</span> {seg.endUser.affordability}</div>
            <div className="text-sm mt-2"><span className="text-muted">EMI/income by city:</span> {seg.endUser.cities}</div>
          </div>
        </div>
      </div>
      <DataSources tab="residential" />
    </div>
  );
}

Object.assign(window, { TabHospitality, TabHealthcare, TabIndustrial, TabCommercial, TabResidential });
