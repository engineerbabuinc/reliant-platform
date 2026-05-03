// ============================================================
// TAB 9 — ISSUE TRACKER
// ============================================================

function TabIssues({ market }) {
  const issues = window.ISSUES;
  const k = window.ISSUE_KPIS;
  const [view, setView] = React.useState('table');
  const [typeF, setTypeF] = React.useState('All');
  const [statusF, setStatusF] = React.useState('All');
  const [expanded, setExpanded] = React.useState(null);

  const types = ['All', 'Title', 'Approval', 'Encumbrance', 'Pricing Gap', 'Buyer Side', 'Compliance', 'Legal'];
  const statuses = ['All', 'Open', 'In Progress', 'Escalated', 'Resolved'];
  const filtered = issues.filter(i =>
    (typeF === 'All' || i.type === typeF) &&
    (statusF === 'All' || i.status === statusF)
  );

  const slaData = ['Title', 'Approval', 'Encumbrance', 'Pricing Gap', 'Buyer Side', 'Compliance', 'Legal'];
  const slaWithin = [4, 8, 6, 5, 7, 9, 5];
  const slaBreached = [2, 3, 1, 1, 2, 1, 2];

  const cols = [
    { key: 'Open', label: 'Open' },
    { key: 'In Progress', label: 'In Progress' },
    { key: 'Escalated', label: 'Escalated' },
    { key: 'Resolved', label: 'Resolved' },
  ];

  return (
    <div className="tabpane">
      <div className="row cols-4">
        <KpiChip label="Open Issues" value={k.open} />
        <KpiChip label="Overdue" value={k.overdue} delta="needs action" deltaDir="down" />
        <KpiChip label="Avg Age" value={`${k.avgAge}d`} />
        <KpiChip label="Resolved FY26" value={k.resolved} delta="+18 vs FY25" deltaDir="up" />
      </div>

      <div className="card">
        <div className="flex-row gap-3 mb-3" style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div className="flex-row gap-3" style={{ flexWrap: 'wrap' }}>
            <div className="chips">
              {types.map(t => <div key={t} className={`chip ${typeF === t ? 'active' : ''}`} onClick={() => setTypeF(t)}>{t}</div>)}
            </div>
          </div>
          <div className="pill-toggle">
            <button className={view === 'table' ? 'active' : ''} onClick={() => setView('table')}>Table</button>
            <button className={view === 'kanban' ? 'active' : ''} onClick={() => setView('kanban')}>Kanban</button>
          </div>
        </div>
        <div className="chips mb-3">
          {statuses.map(s => <div key={s} className={`chip ${statusF === s ? 'active' : ''}`} onClick={() => setStatusF(s)}>{s}</div>)}
        </div>

        {view === 'table' && (
          <div className="tbl-wrap">
            <table className="data">
              <thead><tr><th>ID</th><th>Title</th><th>Type</th><th>Pri</th><th>Owner</th><th>Deal</th><th>Age</th><th>SLA</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.map((it, i) => (
                  <React.Fragment key={i}>
                    <tr style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === it.id ? null : it.id)}>
                      <td className="text-strong">{it.id}</td>
                      <td><strong>{it.title}</strong></td>
                      <td><span className="badge badge-navy">{it.type}</span></td>
                      <td><StatusBadge status={it.priority} /></td>
                      <td className="text-sm">{it.owner}</td>
                      <td className="text-sm">{it.deal}</td>
                      <td>{it.age}d</td>
                      <td className="text-sm">{it.sla}</td>
                      <td><StatusBadge status={it.status} /></td>
                    </tr>
                    {expanded === it.id && (
                      <tr><td colSpan="9" style={{ background: '#FBFAF6', padding: 16 }}>
                        <div className="text-sm mb-2"><strong>Description:</strong> {it.desc}</div>
                        <div className="text-sm mb-3"><strong>Updates:</strong></div>
                        {it.updates.length > 0 ? (
                          <div className="flex-col gap-2">
                            {it.updates.map((u, j) => <div key={j} className="text-sm" style={{ padding: 6, background: '#fff', borderRadius: 6 }}>• {u}</div>)}
                          </div>
                        ) : <div className="text-sm text-muted">No updates yet.</div>}
                        <div className="flex-row gap-2 mt-3">
                          <button className="btn btn-primary btn-sm">Mark Resolved</button>
                          <button className="btn btn-secondary btn-sm">Escalate</button>
                        </div>
                      </td></tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'kanban' && (
          <div className="kanban">
            {cols.map(c => (
              <div key={c.key} className="kanban-col">
                <h4>{c.label} <span className="badge badge-grey">{filtered.filter(i => i.status === c.key).length}</span></h4>
                {filtered.filter(i => i.status === c.key).map((it, i) => (
                  <div key={i} className="kanban-card">
                    <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                      <span className="text-xs text-muted">{it.id}</span>
                      <StatusBadge status={it.priority} />
                    </div>
                    <div className="text-sm text-strong mt-2">{it.title}</div>
                    <div className="text-xs text-muted mt-2">{it.owner} · {it.age}d old</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h3>SLA Performance by Issue Type</h3>
        <VBar
          labels={slaData}
          datasets={[
            { label: 'Within SLA', data: slaWithin, backgroundColor: '#16A34A' },
            { label: 'Breached', data: slaBreached, backgroundColor: '#DC2626' },
          ]}
          stacked
          deps={[market]}
          height={240}
        />
      </div>
      <DataSources tab="issues" />
    </div>
  );
}

Object.assign(window, { TabIssues });
