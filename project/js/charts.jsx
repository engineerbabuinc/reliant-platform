// ============================================================
// CHARTS — Chart.js wrappers, all use refs so we can destroy
// ============================================================

const CHART_DEFAULTS = {
  navy: '#0B1C3F', gold: '#C9A84C', goldLight: '#F5E6C0',
  navyMid: '#162C5A', success: '#16A34A', danger: '#DC2626', warning: '#D97706',
  axis: '#9CA3AF', grid: '#F1F2F4',
};

const SECTOR_COLOR = {
  Hospitality: '#C9A84C', Industrial: '#0B1C3F', Commercial: '#3B82F6',
  Healthcare: '#DC2626', Residential: '#16A34A',
};

function applyChartDefaults() {
  if (!window.Chart) return;
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 11;
  Chart.defaults.color = '#374151';
  Chart.defaults.plugins.tooltip.backgroundColor = '#0B1C3F';
  Chart.defaults.plugins.tooltip.titleColor = '#fff';
  Chart.defaults.plugins.tooltip.bodyColor = '#fff';
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.boxPadding = 4;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;
  Chart.defaults.plugins.legend.labels.padding = 12;
}

// Generic chart wrapper
function ChartBox({ type, data, options, height = 220, deps = [] }) {
  const ref = React.useRef(null);
  const chartRef = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.Chart) return;
    applyChartDefaults();
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }
    chartRef.current = new Chart(ref.current, { type, data, options });
    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } };
  }, deps);
  return <div style={{ position: 'relative', height }}><canvas ref={ref}></canvas></div>;
}

// Horizontal bar (for priority scores, etc.)
function HBar({ labels, values, color = CHART_DEFAULTS.gold, max = 100, suffix = '', height = 220, deps = [] }) {
  return (
    <ChartBox
      type="bar"
      height={height}
      deps={deps}
      data={{
        labels,
        datasets: [{
          data: values, backgroundColor: color, borderRadius: 6, barThickness: 18,
        }]
      }}
      options={{
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `${ctx.parsed.x}${suffix}` } } },
        scales: {
          x: { beginAtZero: true, max, grid: { color: CHART_DEFAULTS.grid, drawBorder: false }, ticks: { color: CHART_DEFAULTS.axis } },
          y: { grid: { display: false }, ticks: { color: '#1F2937', font: { weight: 600 } } },
        }
      }}
    />
  );
}

// Donut
function Donut({ labels, values, colors, height = 220, deps = [] }) {
  return (
    <ChartBox
      type="doughnut"
      height={height}
      deps={deps}
      data={{ labels, datasets: [{ data: values, backgroundColor: colors, borderColor: '#fff', borderWidth: 2 }] }}
      options={{
        responsive: true, maintainAspectRatio: false, cutout: '62%',
        plugins: { legend: { position: 'right', labels: { color: '#374151' } }, tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}%` } } }
      }}
    />
  );
}

// Multi-line trend
function TrendLines({ labels, datasets, height = 220, suffix = '', deps = [] }) {
  return (
    <ChartBox
      type="line"
      height={height}
      deps={deps}
      data={{ labels, datasets: datasets.map(d => ({ ...d, tension: 0.35, borderWidth: 2, pointRadius: 2, pointHoverRadius: 5, fill: false })) }}
      options={{
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', align: 'end', labels: { boxHeight: 6 } }, tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}${suffix}` } } },
        scales: {
          x: { grid: { display: false }, ticks: { color: CHART_DEFAULTS.axis } },
          y: { grid: { color: CHART_DEFAULTS.grid, drawBorder: false }, ticks: { color: CHART_DEFAULTS.axis } },
        }
      }}
    />
  );
}

// Vertical bar (single or grouped)
function VBar({ labels, datasets, height = 220, suffix = '', stacked = false, deps = [] }) {
  return (
    <ChartBox
      type="bar"
      height={height}
      deps={deps}
      data={{ labels, datasets: datasets.map(d => ({ ...d, borderRadius: 6, barPercentage: 0.7, categoryPercentage: 0.65 })) }}
      options={{
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', align: 'end', display: datasets.length > 1, labels: { boxHeight: 6 } }, tooltip: { callbacks: { label: ctx => `${ctx.dataset.label || ''} ${ctx.parsed.y}${suffix}` } } },
        scales: {
          x: { stacked, grid: { display: false }, ticks: { color: CHART_DEFAULTS.axis, maxRotation: 30, minRotation: 0 } },
          y: { stacked, beginAtZero: true, grid: { color: CHART_DEFAULTS.grid, drawBorder: false }, ticks: { color: CHART_DEFAULTS.axis } },
        }
      }}
    />
  );
}

Object.assign(window, { ChartBox, HBar, Donut, TrendLines, VBar, CHART_DEFAULTS, SECTOR_COLOR, applyChartDefaults });
