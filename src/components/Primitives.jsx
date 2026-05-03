import { useEffect, Fragment } from 'react';

export function Icon({ name, size = 16, stroke = 1.5, ...rest }) {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round', ...rest
  };
  switch (name) {
    case 'search':       return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'bell':         return <svg {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case 'settings':     return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.1a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.1a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.1a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.1a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case 'plus':         return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'arrow-right':  return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-up':     return <svg {...props}><path d="M7 17 17 7M7 7h10v10"/></svg>;
    case 'arrow-down':   return <svg {...props}><path d="M17 7 7 17M17 17H7V7"/></svg>;
    case 'chevron-down': return <svg {...props}><path d="m6 9 6 6 6-6"/></svg>;
    case 'chevron-right':return <svg {...props}><path d="m9 6 6 6-6 6"/></svg>;
    case 'x':            return <svg {...props}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case 'filter':       return <svg {...props}><path d="M3 4h18l-7 9v6l-4 2v-8z"/></svg>;
    case 'download':     return <svg {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>;
    case 'print':        return <svg {...props}><path d="M6 9V2h12v7"/><rect x="6" y="14" width="12" height="8"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/></svg>;
    case 'share':        return <svg {...props}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>;
    case 'building':     return <svg {...props}><rect x="4" y="2" width="16" height="20"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>;
    case 'bed':          return <svg {...props}><path d="M2 4v16M22 8v12M2 12h20"/><circle cx="7" cy="10" r="2"/></svg>;
    case 'truck':        return <svg {...props}><path d="M14 18V6h4l4 5v7h-3"/><path d="M2 18V6h12v12"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>;
    case 'briefcase':    return <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
    case 'home':         return <svg {...props}><path d="M3 9.5 12 3l9 6.5V21H3z"/><path d="M9 22V12h6v10"/></svg>;
    case 'map':          return <svg {...props}><path d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3z"/><path d="M9 3v15M15 6v15"/></svg>;
    case 'users':        return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case 'alert':        return <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>;
    case 'flag':         return <svg {...props}><path d="M4 22V4l14 1-2 6 2 6-14-1z"/></svg>;
    case 'grid':         return <svg {...props}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
    case 'sparkle':      return <svg {...props}><path d="M12 3v18M3 12h18M5 5l14 14M19 5 5 19"/></svg>;
    case 'check':        return <svg {...props}><path d="m5 13 4 4L19 7"/></svg>;
    case 'circle':       return <svg {...props}><circle cx="12" cy="12" r="10"/></svg>;
    case 'dot-3':        return <svg {...props}><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>;
    case 'pen':          return <svg {...props}><path d="m12 19 7-7 3 3-7 7H12z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>;
    case 'mail':         return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>;
    case 'phone':        return <svg {...props}><path d="M22 16.92V21a1 1 0 0 1-1.1 1A19 19 0 0 1 2 4.1 1 1 0 0 1 3 3h4.09a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.27 1L7 10a16 16 0 0 0 7 7l1.25-1.82a1 1 0 0 1 1-.27l4 1a1 1 0 0 1 .75 1z"/></svg>;
    case 'logout':       return <svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
    default:             return <svg {...props}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

export function Delta({ pct, suffix = ' YoY' }) {
  if (pct == null) return <span className="delta flat">—</span>;
  const cls = pct > 0.05 ? 'up' : pct < -0.05 ? 'down' : 'flat';
  const arrow = cls === 'up' ? '↑' : cls === 'down' ? '↓' : '·';
  return <span className={`delta ${cls}`}>{arrow} {(pct > 0 ? '+' : '') + pct.toFixed(1)}%{suffix}</span>;
}

export function KPI({ label, value, unit, delta, sub, ink }) {
  return (
    <div className={`card kpi ${ink ? 'ink' : ''}`}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}{unit && <span className="unit">{unit}</span>}</div>
      <div className="kpi-foot">
        {delta != null ? <Delta pct={delta} /> : <span className="delta flat">—</span>}
        {sub && <span className="small fg-3" style={{ fontSize: 11.5 }}>{sub}</span>}
      </div>
    </div>
  );
}

export function SectionHead({ title, sub, right, eyebrow }) {
  return (
    <div className="row" style={{ alignItems: 'flex-end', marginBottom: 14, gap: 16 }}>
      <div>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 6 }}>{eyebrow}</div>}
        <h3 className="section-title">{title}</h3>
        {sub && <div className="page-subtitle" style={{ marginTop: 4 }}>{sub}</div>}
      </div>
      <div className="spacer" />
      {right}
    </div>
  );
}

export function Source({ children }) {
  return <div className="source-line">SRC · {children}</div>;
}

export function Tabs({ items, value, onChange }) {
  return (
    <div className="tabs-strip">
      {items.map(it => (
        <div key={it.id}
             className={`tab ${value === it.id ? 'active' : ''}`}
             onClick={() => onChange(it.id)}>
          {it.label}
          {it.count != null && <span className="tab-count">{it.count}</span>}
        </div>
      ))}
    </div>
  );
}

export function BarChart({ data, height = 220, valueKey = 'value', valueKey2, labelKey = 'label', formatY = String, showAxis = true }) {
  const W = 720, H = height;
  const pad = { l: 44, r: 16, t: 16, b: 32 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const all = data.flatMap(d => [d[valueKey], valueKey2 ? d[valueKey2] : 0]).filter(v => v != null);
  const max = Math.max(...all, 1);
  const niceMax = Math.ceil(max * 1.15);
  const bandW = innerW / data.length;
  const barGroup = bandW * 0.66;
  const barW = valueKey2 ? barGroup / 2 - 2 : barGroup;
  const ticks = 4;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => (niceMax / ticks) * i);

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {showAxis && tickVals.map((t, i) => {
        const y = pad.t + innerH - (t / niceMax) * innerH;
        return (
          <g key={i}>
            <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="var(--border-1)" strokeWidth="1" strokeDasharray={i === 0 ? '0' : '2 4'} />
            <text x={pad.l - 8} y={y + 4} fontSize="10" fill="var(--fg-3)" fontFamily="var(--font-mono)" textAnchor="end">{formatY(t)}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const cx = pad.l + bandW * i + bandW / 2;
        const v1 = d[valueKey] ?? 0;
        const h1 = (v1 / niceMax) * innerH;
        const v2 = valueKey2 ? (d[valueKey2] ?? 0) : null;
        const h2 = v2 != null ? (v2 / niceMax) * innerH : null;
        return (
          <g key={i}>
            {valueKey2 ? (
              <Fragment>
                <rect x={cx - barGroup/2} y={pad.t + innerH - h1} width={barW} height={h1} fill="var(--ink-900)" rx="2" />
                <rect x={cx - barGroup/2 + barW + 4} y={pad.t + innerH - h2} width={barW} height={h2} fill="var(--signal-600)" rx="2" />
              </Fragment>
            ) : (
              <rect x={cx - barW/2} y={pad.t + innerH - h1} width={barW} height={h1} fill="var(--ink-900)" rx="2" />
            )}
            <text x={cx} y={H - pad.b + 16} fontSize="10.5" fill="var(--fg-3)" fontFamily="var(--font-sans)" textAnchor="middle">{d[labelKey]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function LineChart({ data, height = 220, lines = [{ key: 'value', color: 'var(--ink-900)', label: '' }], xKey = 'label', formatY = String }) {
  const W = 720, H = height;
  const pad = { l: 44, r: 16, t: 16, b: 32 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const all = data.flatMap(d => lines.map(l => d[l.key]));
  const max = Math.max(...all);
  const min = Math.min(...all);
  const range = (max - min) || 1;
  const niceMax = max + range * 0.1;
  const niceMin = Math.max(0, min - range * 0.1);
  const span = niceMax - niceMin;
  const stepX = innerW / (data.length - 1 || 1);
  const ticks = 4;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => niceMin + (span / ticks) * i);

  function px(i) { return pad.l + stepX * i; }
  function py(v) { return pad.t + innerH - ((v - niceMin) / span) * innerH; }

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {tickVals.map((t, i) => {
        const y = py(t);
        return (
          <g key={i}>
            <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="var(--border-1)" strokeWidth="1" strokeDasharray={i === 0 ? '0' : '2 4'} />
            <text x={pad.l - 8} y={y + 4} fontSize="10" fill="var(--fg-3)" fontFamily="var(--font-mono)" textAnchor="end">{formatY(t)}</text>
          </g>
        );
      })}
      {lines.map((line, lidx) => {
        const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${px(i)} ${py(d[line.key])}`).join(' ');
        const areaPath = path + ` L ${px(data.length - 1)} ${py(niceMin)} L ${px(0)} ${py(niceMin)} Z`;
        return (
          <g key={lidx}>
            {lidx === 0 && <path d={areaPath} fill={line.color} opacity="0.08" />}
            <path d={path} fill="none" stroke={line.color} strokeWidth="2" />
            {data.map((d, i) => (
              <circle key={i} cx={px(i)} cy={py(d[line.key])} r="3" fill={line.color} />
            ))}
          </g>
        );
      })}
      {data.map((d, i) => (
        <text key={i} x={px(i)} y={H - pad.b + 16} fontSize="10.5" fill="var(--fg-3)" fontFamily="var(--font-sans)" textAnchor="middle">{d[xKey]}</text>
      ))}
    </svg>
  );
}

export function RankingBars({ data, max, valueKey = 'value', labelKey = 'label', formatV = String, color = 'var(--ink-900)' }) {
  const m = max || Math.max(...data.map(d => d[valueKey]));
  return (
    <div className="col" style={{ gap: 8 }}>
      {data.map((d, i) => (
        <div key={i} className="row" style={{ gap: 12 }}>
          <div style={{ width: 180, fontSize: 12.5, color: 'var(--fg-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d[labelKey]}</div>
          <div style={{ flex: 1, height: 18, background: 'var(--bg-2)', borderRadius: 4, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, width: `${(d[valueKey] / m) * 100}%`, background: color, borderRadius: 4 }} />
          </div>
          <div className="metric-num" style={{ width: 80, textAlign: 'right', fontSize: 12.5, color: 'var(--fg-1)' }}>{formatV(d[valueKey])}</div>
        </div>
      ))}
    </div>
  );
}

export function Donut({ data, size = 180, valueKey = 'value', labelKey = 'label', colorKey = 'color', formatV = String, centerLabel, centerValue }) {
  const total = data.reduce((s, d) => s + d[valueKey], 0);
  const r = size / 2 - 6;
  const cx = size / 2, cy = size / 2;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="row" style={{ gap: 24, alignItems: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} stroke="var(--bg-2)" strokeWidth="14" fill="none" />
        {data.map((d, i) => {
          const frac = d[valueKey] / total;
          const dash = frac * C;
          const offset = -acc * C;
          acc += frac;
          return (
            <circle key={i} cx={cx} cy={cy} r={r}
                    stroke={d[colorKey] || 'var(--ink-900)'} strokeWidth="14" fill="none"
                    strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={offset}
                    transform={`rotate(-90 ${cx} ${cy})`} />
          );
        })}
        {centerValue && (
          <Fragment>
            <text x={cx} y={cy - 2} textAnchor="middle" fontFamily="var(--font-serif)" fontSize="22" fontStyle="italic" fill="var(--fg-1)">{centerValue}</text>
            <text x={cx} y={cy + 16} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-3)" letterSpacing="1">{centerLabel || ''}</text>
          </Fragment>
        )}
      </svg>
      <div className="col" style={{ gap: 6, flex: 1 }}>
        {data.map((d, i) => (
          <div key={i} className="row" style={{ gap: 8, fontSize: 12.5 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: d[colorKey] || 'var(--ink-900)', flexShrink: 0 }} />
            <span style={{ color: 'var(--fg-2)' }}>{d[labelKey]}</span>
            <span className="spacer" />
            <span className="metric-num" style={{ color: 'var(--fg-1)' }}>{formatV(d[valueKey])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Scatter({ data, height = 280, xKey, yKey, sizeKey, labelKey, xLabel, yLabel, formatX = String, formatY = String, color = 'var(--signal-600)' }) {
  const W = 720, H = height;
  const pad = { l: 56, r: 24, t: 16, b: 40 };
  const xs = data.map(d => d[xKey]);
  const ys = data.map(d => d[yKey]);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const yMin = Math.min(...ys), yMax = Math.max(...ys);
  const xRange = (xMax - xMin) || 1, yRange = (yMax - yMin) || 1;
  const niceXmin = xMin - xRange * 0.05, niceXmax = xMax + xRange * 0.05;
  const niceYmin = Math.max(0, yMin - yRange * 0.05), niceYmax = yMax + yRange * 0.1;
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const sizes = sizeKey ? data.map(d => d[sizeKey]) : [];
  const sMax = sizes.length ? Math.max(...sizes) : 1;
  function px(v) { return pad.l + ((v - niceXmin) / (niceXmax - niceXmin)) * innerW; }
  function py(v) { return pad.t + innerH - ((v - niceYmin) / (niceYmax - niceYmin)) * innerH; }
  const xt = Array.from({ length: 5 }, (_, i) => niceXmin + (niceXmax - niceXmin) * i / 4);
  const yt = Array.from({ length: 5 }, (_, i) => niceYmin + (niceYmax - niceYmin) * i / 4);

  return (
    <svg className="chart-tall chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {yt.map((t, i) => {
        const y = py(t);
        return (
          <g key={'y' + i}>
            <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="var(--border-1)" strokeDasharray={i === 0 ? '0' : '2 4'} />
            <text x={pad.l - 8} y={y + 4} fontSize="10" fill="var(--fg-3)" fontFamily="var(--font-mono)" textAnchor="end">{formatY(t)}</text>
          </g>
        );
      })}
      {xt.map((t, i) => {
        const x = px(t);
        return (
          <g key={'x' + i}>
            <line x1={x} y1={pad.t} x2={x} y2={pad.t + innerH} stroke="var(--border-1)" strokeDasharray={i === 0 ? '0' : '2 4'} />
            <text x={x} y={H - pad.b + 16} fontSize="10" fill="var(--fg-3)" fontFamily="var(--font-mono)" textAnchor="middle">{formatX(t)}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const r = sizeKey ? 4 + (d[sizeKey] / sMax) * 12 : 5;
        return (
          <g key={i}>
            <circle cx={px(d[xKey])} cy={py(d[yKey])} r={r} fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1.5" />
            {labelKey && r > 9 && <text x={px(d[xKey])} y={py(d[yKey]) + 3} fontSize="9.5" fill="white" fontFamily="var(--font-sans)" textAnchor="middle" fontWeight="500">{(d[labelKey] || '').slice(0,3).toUpperCase()}</text>}
          </g>
        );
      })}
      {xLabel && <text x={pad.l + innerW / 2} y={H - 4} fontSize="10.5" fill="var(--fg-3)" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="1">{xLabel}</text>}
      {yLabel && <text transform={`translate(14 ${pad.t + innerH / 2}) rotate(-90)`} fontSize="10.5" fill="var(--fg-3)" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="1">{yLabel}</text>}
    </svg>
  );
}

export function Sparkline({ data, width = 96, height = 28, color = 'var(--ink-900)' }) {
  if (!data || !data.length) return null;
  const max = Math.max(...data), min = Math.min(...data);
  const span = (max - min) || 1;
  const step = width / (data.length - 1 || 1);
  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${height - ((v - min) / span) * height}`).join(' ');
  return (
    <svg className="spark" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

export function PipelineFunnel({ stages }) {
  const max = Math.max(...stages.map(s => s.count));
  return (
    <div className="col" style={{ gap: 6 }}>
      {stages.map((s, i) => {
        const w = (s.count / max) * 100;
        return (
          <div key={i} className="row" style={{ gap: 12 }}>
            <div style={{ width: 130, fontSize: 12.5, color: 'var(--fg-2)' }}>{s.stage}</div>
            <div style={{ flex: 1, position: 'relative', height: 30, background: 'var(--bg-2)', borderRadius: 6 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${w}%`, background: i === stages.length - 1 ? 'var(--clay-500)' : 'var(--ink-900)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, color: 'var(--paper-50)', fontSize: 11.5, fontFamily: 'var(--font-mono)' }}>
                {s.count}
              </div>
            </div>
            <div className="metric-num" style={{ width: 90, textAlign: 'right', fontSize: 12.5, color: 'var(--fg-1)' }}>₹{s.value_cr.toLocaleString('en-IN')} Cr</div>
          </div>
        );
      })}
    </div>
  );
}

export function Modal({ title, children, footer, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="eyebrow">Detail</div>
            <h3 className="section-title" style={{ marginTop: 4 }}>{title}</h3>
          </div>
          <button className="icon-btn" onClick={onClose}><Icon name="x" size={18}/></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

export function Drawer({ title, children, footer, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <Fragment>
      <div className="drawer-backdrop" onClick={onClose}/>
      <div className="drawer">
        <div className="modal-head">
          <div>
            <div className="eyebrow">Detail</div>
            <h3 className="section-title" style={{ marginTop: 4 }}>{title}</h3>
          </div>
          <button className="icon-btn" onClick={onClose}><Icon name="x" size={18}/></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </Fragment>
  );
}
