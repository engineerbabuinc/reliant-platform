// ============================================================
// HELPERS — formatting, INR notation, sortable hook, hooks
// ============================================================

// Indian lakh/crore notation. value is a raw number (₹).
function fmtINR(value, opts = {}) {
  if (value === null || value === undefined || isNaN(value)) return '—';
  const n = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  if (n >= 1e7) return `${sign}₹${(n / 1e7).toFixed(opts.decimals ?? 1).replace(/\.0$/, '')} Cr`;
  if (n >= 1e5) return `${sign}₹${(n / 1e5).toFixed(opts.decimals ?? 1).replace(/\.0$/, '')} L`;
  return `${sign}₹${n.toLocaleString('en-IN')}`;
}

function fmtNum(n, decimals = 0) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  return Number(n).toLocaleString('en-IN', { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}

function fmtPct(n) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  return `${n}%`;
}

// Debounce hook
function useDebounce(value, delay = 300) {
  const [v, setV] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

// Sort hook for tables
function useSortable(rows, defaultKey, defaultDir = 'asc') {
  const [sortKey, setSortKey] = React.useState(defaultKey);
  const [sortDir, setSortDir] = React.useState(defaultDir);
  const sorted = React.useMemo(() => {
    if (!sortKey) return rows;
    const arr = [...rows];
    arr.sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      if (typeof va === 'number' && typeof vb === 'number') return sortDir === 'asc' ? va - vb : vb - va;
      return sortDir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
    return arr;
  }, [rows, sortKey, sortDir]);
  const onSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };
  return { sorted, sortKey, sortDir, onSort };
}

// Th component for sortable tables
function Th({ k, label, sortKey, sortDir, onSort, align }) {
  const isActive = sortKey === k;
  return (
    <th
      className={`sortable ${isActive ? 'active' : ''}`}
      onClick={() => onSort(k)}
      style={align === 'right' ? { textAlign: 'right' } : undefined}
    >
      {label}
      <span className="sort-ind">{isActive ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}</span>
    </th>
  );
}

// Brand initials logo
function BrandLogo({ name, color }) {
  const initials = (name || 'XX').split(/[\s(]+/).filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase();
  return <div className="brand-logo" style={{ background: color || '#0B1C3F' }}>{initials}</div>;
}

// CRM Live badge
function LiveBadge() {
  const [live, setLive] = React.useState(window.__RELIANT_CRM_LIVE || false);
  React.useEffect(() => {
    const handler = () => setLive(window.__RELIANT_CRM_LIVE || false);
    window.addEventListener('reliant-crm-toggle', handler);
    return () => window.removeEventListener('reliant-crm-toggle', handler);
  }, []);
  if (!live) return null;
  return <span className="badge badge-green" style={{ marginLeft: 6 }}><span className="live-dot"></span>Live</span>;
}

// Status badge for hospitality / mandates
function StatusBadge({ status }) {
  const map = {
    'Mandated': 'badge-green', 'In Discussion': 'badge-gold', 'Prospecting': 'badge-grey',
    'LOI Signed': 'badge-green', 'Term Sheet': 'badge-gold', 'Negotiation': 'badge-gold',
    'Site Visits': 'badge-blue', 'Active Mandate': 'badge-green', 'Pitched': 'badge-gold', 'Cold': 'badge-grey',
    'Open': 'badge-amber', 'In Progress': 'badge-blue', 'Escalated': 'badge-red', 'Resolved': 'badge-green',
    'Top Performer': 'badge-green', 'On Track': 'badge-blue', 'Over Capacity': 'badge-red', 'Under-utilised': 'badge-grey',
    'Pending L1': 'badge-amber', 'Pending L2': 'badge-amber', 'Approved': 'badge-green',
    'P1': 'badge-red', 'P2': 'badge-amber', 'P3': 'badge-grey',
  };
  return <span className={`badge ${map[status] || 'badge-grey'}`}>{status}</span>;
}

// Heatmap color scale (cream → gold → navy)
function heatColor(score) {
  // 0..100 → gradient stops
  if (score < 40) return '#F5E6C0';
  if (score < 55) return '#EBD089';
  if (score < 70) return '#D9B65C';
  if (score < 80) return '#C9A84C';
  if (score < 90) return '#7A6B3A';
  return '#0B1C3F';
}
function heatTextColor(score) {
  return score >= 78 ? '#fff' : '#0B1C3F';
}

// Sparkline SVG
function Sparkline({ data, color = '#C9A84C', height = 40 }) {
  if (!data || data.length === 0) return null;
  const w = 200, h = height;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d - min) / range) * (h - 6) - 3;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Modal scaffold
function Modal({ open, onClose, title, children, width }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-bd" onClick={onClose}>
      <div className="modal" style={width ? { maxWidth: width } : undefined} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button className="modal-x" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// Data sources footer
function DataSources({ tab }) {
  const src = (window.DATA_SOURCES && window.DATA_SOURCES[tab]) || '';
  return (
    <details className="src-foot">
      <summary>Data sources for this tab</summary>
      <p>{src}</p>
    </details>
  );
}

// Icons (inline SVG)
const Icon = {
  bell: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  arrowRight: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  metro: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16M8 21l4-4 4 4M8 7h.01M16 7h.01"/></svg>,
  highway: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21l4-18M19 21l-4-18M12 3v3M12 10v3M12 17v3"/></svg>,
  airport: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>,
  hospital: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v4M8 8h8M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M3 21h18M9 14h6M9 18h6"/></svg>,
  mall: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>,
  office: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>,
};

Object.assign(window, {
  fmtINR, fmtNum, fmtPct, useDebounce, useSortable, Th, BrandLogo, LiveBadge, StatusBadge,
  heatColor, heatTextColor, Sparkline, Modal, DataSources, Icon,
});
