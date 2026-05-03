// ============================================================
// TAB 8 — TEAM & ASSIGNMENTS
// ============================================================

function TabTeam({ market }) {
  const team = window.TEAM;
  const reassign = window.TEAM_REASSIGN;
  const { sorted, sortKey, sortDir, onSort } = useSortable(team, 'pipeline', 'desc');
  const [openRm, setOpenRm] = React.useState(null);
  const [reForm, setReForm] = React.useState({ from: team[0].name, account: '', to: team[1].name, reason: 'Capacity rebalance', notes: '' });

  const totalPipe = team.reduce((s, t) => s + t.pipeline, 0);
  const avgPipe = Math.round(totalPipe / team.length);

  const capacityColor = (c) => c >= 90 ? '#DC2626' : c >= 70 ? '#16A34A' : '#9CA3AF';
  const weeks = ['W18', 'W19', 'W20', 'W21', 'W22', 'W23', 'W24', 'W25'];

  return (
    <div className="tabpane">
      <div className="row cols-4">
        <KpiChip label="Total RMs" value={team.length} />
        <KpiChip label="Active Mandates" value={61} />
        <KpiChip label="Avg Pipeline / RM" value={`₹${avgPipe} Cr`} />
        <KpiChip label="Top Performer" value="Rohan Mehta" sub="Hospitality · 78% win rate" />
      </div>

      <div className="card">
        <h3>RM Scoreboard</h3>
        <div className="tbl-wrap">
          <table className="data">
            <thead>
              <tr>
                <Th k="name" label="RM" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="division" label="Division" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="accounts" label="Accounts" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="pipeline" label="Pipeline ₹Cr" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="closed" label="Closed FY26" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="winRate" label="Win %" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <Th k="cycle" label="Cycle (days)" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
                <th>Capacity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t, i) => (
                <tr key={i} style={{ cursor: 'pointer' }} onClick={() => setOpenRm(t)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="brand-logo" style={{ width: 30, height: 30, fontSize: 11, background: t.color }}>{t.initials}</div>
                      <strong>{t.name}</strong>
                    </div>
                  </td>
                  <td><span className="badge badge-navy">{t.division}</span></td>
                  <td>{t.accounts}</td>
                  <td className="text-strong">₹{t.pipeline}</td>
                  <td>{t.closed}</td>
                  <td>{t.winRate}%</td>
                  <td>{t.cycle}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress" style={{ width: 70 }}><div className="progress-bar" style={{ width: `${t.capacity}%`, background: capacityColor(t.capacity) }}></div></div>
                      <span className="text-xs">{t.capacity}%</span>
                    </div>
                  </td>
                  <td><StatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row cols-2">
        <div className="card">
          <h3>Reassignment Workflow</h3>
          <div className="row cols-2" style={{ marginBottom: 8 }}>
            <div className="field"><label>From RM</label>
              <select value={reForm.from} onChange={e => setReForm({ ...reForm, from: e.target.value })}>
                {team.map(t => <option key={t.name}>{t.name}</option>)}
              </select>
            </div>
            <div className="field"><label>To RM</label>
              <select value={reForm.to} onChange={e => setReForm({ ...reForm, to: e.target.value })}>
                {team.map(t => <option key={t.name}>{t.name}</option>)}
              </select>
            </div>
            <div className="field"><label>Account</label><input value={reForm.account} placeholder="Marriott Hebbal..." onChange={e => setReForm({ ...reForm, account: e.target.value })} /></div>
            <div className="field"><label>Reason</label>
              <select value={reForm.reason} onChange={e => setReForm({ ...reForm, reason: e.target.value })}>
                {['Capacity rebalance', 'Domain expertise', 'Senior involvement', 'Geo-realignment', 'Conflict of interest'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button className="btn btn-primary mt-2">Submit for Approval</button>
          <h4 className="mt-4">Pending Reassignments</h4>
          <div className="tbl-wrap">
            <table className="data">
              <thead><tr><th>From</th><th>Account</th><th>To</th><th>Reason</th><th>Status</th></tr></thead>
              <tbody>
                {reassign.map((r, i) => (
                  <tr key={i}>
                    <td className="text-sm">{r.from}</td>
                    <td className="text-sm"><strong>{r.account}</strong></td>
                    <td className="text-sm">{r.to}</td>
                    <td className="text-sm">{r.reason}</td>
                    <td><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3>Capacity Heatmap · Next 8 Weeks</h3>
          <div className="cap-grid" style={{ gridTemplateColumns: '120px repeat(8, 1fr)' }}>
            <div></div>
            {weeks.map(w => <div key={w} className="heat-col-label">{w}</div>)}
            {team.slice(0, 10).map((t, i) => (
              <React.Fragment key={i}>
                <div className="heat-row-label" style={{ fontSize: 11 }}>{t.name.split(' ')[0]} {t.name.split(' ')[1]?.[0]}.</div>
                {weeks.map((w, j) => {
                  const variance = ((i * 7 + j * 11) % 30) - 12;
                  const cap = Math.max(20, Math.min(110, t.capacity + variance));
                  const bg = cap >= 95 ? '#DC2626' : cap >= 75 ? '#16A34A' : cap >= 50 ? '#FCD34D' : '#E5E7EB';
                  const fg = cap >= 95 || cap >= 75 ? '#fff' : '#1F2937';
                  return <div key={j} className="cap-cell" style={{ background: bg, color: fg }}>{cap}</div>;
                })}
              </React.Fragment>
            ))}
          </div>
          <div className="flex-row gap-3 mt-3 text-xs text-muted">
            <span><span className="swatch" style={{ background: '#DC2626' }}></span>Over-capacity</span>
            <span><span className="swatch" style={{ background: '#16A34A' }}></span>Healthy</span>
            <span><span className="swatch" style={{ background: '#FCD34D' }}></span>Under-utilised</span>
          </div>
        </div>
      </div>

      <Modal open={!!openRm} onClose={() => setOpenRm(null)} title={openRm ? openRm.name : ''} width={640}>
        {openRm && (
          <>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
              <div className="brand-logo" style={{ width: 64, height: 64, fontSize: 22, background: openRm.color }}>{openRm.initials}</div>
              <div>
                <strong style={{ fontSize: 18 }}>{openRm.name}</strong>
                <div className="text-sm text-muted">{openRm.title}</div>
                <div className="text-sm text-muted">Division: {openRm.division} · Joined {openRm.joined}</div>
              </div>
            </div>
            <div className="row cols-4" style={{ marginBottom: 12 }}>
              <KpiChip label="Deals YTD" value={openRm.closed} />
              <KpiChip label="GMV ₹Cr" value={openRm.pipeline} />
              <KpiChip label="Win Rate" value={`${openRm.winRate}%`} />
              <KpiChip label="Avg Cycle" value={`${openRm.cycle}d`} />
            </div>
            <h4>Active Accounts</h4>
            <div className="tbl-wrap">
              <table className="data">
                <thead><tr><th>Account</th><th>Stage</th><th>Value</th></tr></thead>
                <tbody>
                  {[
                    { acc: 'Marriott Devanahalli', stage: 'LOI Signed', val: '₹168 Cr' },
                    { acc: 'Hyatt Hebbal', stage: 'Term Sheet', val: '₹142 Cr' },
                    { acc: 'IHG Whitefield', stage: 'Negotiation', val: '₹86 Cr' },
                  ].map((a, i) => (
                    <tr key={i}><td>{a.acc}</td><td><StatusBadge status={a.stage} /></td><td className="text-strong">{a.val}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4 className="mt-3">Recent Activity</h4>
            <div className="flex-col gap-2">
              {['Pitch sent · Marriott IC · 2 May', 'Site visit · Hebbal · 30 Apr', 'Call · Hyatt DM · 28 Apr', 'Email · IHG term sheet review · 26 Apr', 'Meeting · Owner family Devanahalli · 24 Apr'].map((t, i) => (
                <div key={i} className="text-sm" style={{ padding: 8, background: '#FBFAF6', borderRadius: 6 }}>{t}</div>
              ))}
            </div>
            <button className="btn btn-secondary mt-3">Reassign an Account</button>
          </>
        )}
      </Modal>
      <DataSources tab="team" />
    </div>
  );
}

Object.assign(window, { TabTeam });
