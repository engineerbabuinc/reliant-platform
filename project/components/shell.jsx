/* Reliant — App shell: sidebar, header, market context, navigation */

const NAV_ITEMS = [
  { id: 'master',      label: 'Master Dashboard', icon: 'grid' },
  { id: 'hospitality', label: 'Hospitality',      icon: 'bed' },
  { id: 'healthcare',  label: 'Healthcare',       icon: 'building' },
  { id: 'industrial',  label: 'Industrial RE',    icon: 'truck' },
  { id: 'commercial',  label: 'Commercial RE',    icon: 'briefcase' },
  { id: 'residential', label: 'Residential RE',   icon: 'home' },
  { id: 'land',        label: 'Land Pitch Builder', icon: 'map' },
  { id: 'team',        label: 'Team & Assignments', icon: 'users' },
  { id: 'issues',      label: 'Issue Tracker',    icon: 'alert' },
];

function Sidebar({ active, onChange, openCount }) {
  const grouped = [
    { label: 'Overview',  items: ['master'] },
    { label: 'Sectors',   items: ['hospitality','healthcare','industrial','commercial','residential'] },
    { label: 'Workbench', items: ['land','team','issues'] },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">R</div>
        <div className="brand-wordmark">Reliant<span className="ampr"> </span>Associates</div>
      </div>
      <nav className="sidebar-nav">
        {grouped.map(g => (
          <div key={g.label}>
            <div className="nav-section-label">{g.label}</div>
            {g.items.map(id => {
              const item = NAV_ITEMS.find(n => n.id === id);
              return (
                <div key={id}
                     className={`nav-item ${active === id ? 'active' : ''}`}
                     onClick={() => onChange(id)}>
                  <Icon name={item.icon} size={15} />
                  <span>{item.label}</span>
                  {id === 'issues' && openCount > 0 && <span className="nav-meta">{openCount}</span>}
                </div>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="avatar">RK</div>
        <div className="col" style={{ gap: 0, flex: 1 }}>
          <div style={{ fontSize: 12.5, color: 'var(--fg-1)' }}>Rajiv Kapur</div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>Managing Director</div>
        </div>
        <button className="icon-btn" title="Sign out"><Icon name="logout" size={14}/></button>
      </div>
    </aside>
  );
}

function MarketSelector({ value, onChange }) {
  const cities = window.RELIANT.CITIES;
  return (
    <div className="market-select">
      <span className="market-label">Market</span>
      <select value={value} onChange={e => onChange(e.target.value)}>
        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <Icon name="chevron-down" size={14} />
    </div>
  );
}

function Header({ market, onMarket, onOpenNotifs, onOpenTweaks, crmLive }) {
  return (
    <header className="app-header">
      <div className="search">
        <Icon name="search" size={14} />
        <input placeholder="Search deals, occupiers, parcels…" />
        <span className="kbd">⌘K</span>
      </div>
      <div className="header-actions">
        <MarketSelector value={market} onChange={onMarket} />
        <span className={`pill ${crmLive ? 'ok' : ''}`} title={window.RELIANT.SOURCES.crm} style={{ marginLeft: 8 }}>
          <span className="dot" /> CRM {crmLive ? 'live' : 'stale'}
        </span>
        <button className="icon-btn" title="Notifications" onClick={onOpenNotifs}>
          <Icon name="bell" size={16}/>
          <span className="dot" />
        </button>
        <button className="icon-btn" title="Settings"><Icon name="settings" size={16}/></button>
      </div>
    </header>
  );
}

// Generic page subheader (title row)
function PageHead({ eyebrow, title, sub, actions }) {
  return (
    <div className="subheader">
      <div>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 6 }}>{eyebrow}</div>}
        <h1 className="page-title">{title}</h1>
        {sub && <div className="page-subtitle">{sub}</div>}
      </div>
      {actions && <div className="subheader-controls">{actions}</div>}
    </div>
  );
}

Object.assign(window, { Sidebar, MarketSelector, Header, PageHead, NAV_ITEMS });
