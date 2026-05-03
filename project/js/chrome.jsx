// ============================================================
// CHROME — Header, Tab nav, Notifications, CRM toggle, Tweaks
// ============================================================

const TABS = [
  { id: 'dashboard', label: 'Master Dashboard' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'residential', label: 'Residential' },
  { id: 'pitch', label: 'Land Pitch Builder' },
  { id: 'team', label: 'Team & Assignments' },
  { id: 'issues', label: 'Issue Tracker' },
];

function Header({ market, setMarket, crmLive, setCrmLive }) {
  const [notifOpen, setNotifOpen] = React.useState(false);
  const ddRef = React.useRef(null);

  React.useEffect(() => {
    const onClick = (e) => {
      if (notifOpen && ddRef.current && !ddRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [notifOpen]);

  const toggleCrm = () => {
    const next = !crmLive;
    setCrmLive(next);
    window.__RELIANT_CRM_LIVE = next;
    window.dispatchEvent(new CustomEvent('reliant-crm-toggle'));
  };

  return (
    <header className="header">
      <div className="h-logo">
        <div className="logo-mark">RA</div>
        <div className="h-wordmark">Reliant Associates <span> · Intelligence Platform</span></div>
      </div>
      <div className="h-pill">LAND TO LEASING</div>
      <div className="h-right">
        <select className="h-select" value={market} onChange={e => setMarket(e.target.value)}>
          {window.CITIES.map(c => (
            <option key={c.id} value={c.id}>{c.name}{c.state ? ` · ${c.state}` : ''}</option>
          ))}
        </select>
        <span className="h-chip">3 May 2026</span>

        <div ref={ddRef} style={{ position: 'relative' }}>
          <button className="h-bell" onClick={() => setNotifOpen(o => !o)} aria-label="Notifications">
            <Icon.bell />
            <span className="h-bell-badge">3</span>
          </button>
          {notifOpen && (
            <div className="notif-dd">
              <h4>Notifications</h4>
              {window.NOTIFICATIONS.map((n, i) => (
                <div key={i} className="notif-item">
                  <div className="notif-dot" style={{ background: n.dot === 'green' ? '#16A34A' : n.dot === 'red' ? '#DC2626' : '#C9A84C' }}></div>
                  <div>
                    <div className="notif-text">{n.text}</div>
                    <div className="notif-time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-toggle" title="CRM Live Toggle">
          <span>{crmLive ? 'Salesforce CRM' : 'Static Data'}</span>
          <div className={`switch ${crmLive ? 'on' : ''}`} onClick={toggleCrm}></div>
        </div>

        <div className="h-avatar">RA</div>
      </div>
    </header>
  );
}

function TabNav({ tab, setTab }) {
  return (
    <nav className="tabnav">
      {TABS.map(t => (
        <button
          key={t.id}
          className={tab === t.id ? 'active' : ''}
          onClick={() => setTab(t.id)}
        >{t.label}</button>
      ))}
    </nav>
  );
}

function TweaksPanel({ density, setDensity, accent, setAccent }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button
        className="btn btn-primary btn-sm"
        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 350, boxShadow: '0 8px 18px -4px rgba(11,28,63,0.3)' }}
        onClick={() => setOpen(o => !o)}
      >{open ? 'Hide Tweaks' : '⚙ Tweaks'}</button>
      {open && (
        <div className="tweaks-panel" style={{ bottom: 72 }}>
          <div className="tweaks-head">
            <h3>Tweaks</h3>
            <button className="modal-x" style={{ color: '#fff' }} onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="tweaks-body">
            <div className="tweaks-row">
              <span>Compact density</span>
              <div className={`switch ${density === 'compact' ? 'on' : ''}`} onClick={() => setDensity(density === 'compact' ? 'normal' : 'compact')}></div>
            </div>
            <div className="tweaks-row">
              <span>Accent color</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#C9A84C', '#0B1C3F', '#A11823', '#005A9C'].map(c => (
                  <button key={c} onClick={() => setAccent(c)} style={{ width: 22, height: 22, borderRadius: 6, background: c, border: accent === c ? '2px solid #1F2937' : '2px solid transparent', cursor: 'pointer' }}></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Header, TabNav, TweaksPanel, TABS });
