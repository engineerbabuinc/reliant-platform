// ============================================================
// APP — Root component, tab routing, market state, Tweaks
// ============================================================

function App() {
  const [tab, setTab] = React.useState('dashboard');
  const [market, setMarket] = React.useState('panIndia');
  const [crmLive, setCrmLive] = React.useState(false);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const [tweaks, setTweaks] = React.useState({
    density: 'comfortable',
    accent: '#C9A84C',
    showSparklines: true,
  });

  // Apply density to body
  React.useEffect(() => {
    document.body.classList.toggle('compact', tweaks.density === 'compact');
  }, [tweaks.density]);

  // Tweaks protocol — register listener BEFORE announcing
  React.useEffect(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const closeTweaks = () => {
    setTweaksOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const setTweak = (k, v) => setTweaks(prev => ({ ...prev, [k]: v }));

  const renderTab = () => {
    switch (tab) {
      case 'dashboard': return <TabDashboard market={market} onJumpToPitch={() => setTab('pitch')} />;
      case 'hospitality': return <TabHospitality market={market} />;
      case 'healthcare': return <TabHealthcare market={market} />;
      case 'industrial': return <TabIndustrial market={market} />;
      case 'commercial': return <TabCommercial market={market} />;
      case 'residential': return <TabResidential market={market} />;
      case 'pitch': return <TabPitch market={market} />;
      case 'team': return <TabTeam market={market} />;
      case 'issues': return <TabIssues market={market} />;
      default: return null;
    }
  };

  return (
    <>
      <Header market={market} setMarket={setMarket} crmLive={crmLive} setCrmLive={setCrmLive} />
      <TabNav tab={tab} setTab={setTab} />
      <div className="page" data-screen-label={tab}>
        {renderTab()}
      </div>
      {tweaksOpen && (
        <div className="tweaks-panel">
          <div className="tweaks-head">
            <h3>Tweaks</h3>
            <button className="modal-x" style={{ color: '#fff' }} onClick={closeTweaks}>×</button>
          </div>
          <div className="tweaks-body">
            <div className="tweaks-row">
              <span>Density</span>
              <div className="pill-toggle">
                <button className={tweaks.density === 'comfortable' ? 'active' : ''} onClick={() => setTweak('density', 'comfortable')}>Comfortable</button>
                <button className={tweaks.density === 'compact' ? 'active' : ''} onClick={() => setTweak('density', 'compact')}>Compact</button>
              </div>
            </div>
            <div className="tweaks-row">
              <span>Live CRM Sync</span>
              <div className={`switch ${crmLive ? 'on' : ''}`} onClick={() => setCrmLive(!crmLive)}></div>
            </div>
            <div className="tweaks-row">
              <span>Show sparklines</span>
              <div className={`switch ${tweaks.showSparklines ? 'on' : ''}`} onClick={() => setTweak('showSparklines', !tweaks.showSparklines)}></div>
            </div>
            <div className="tweaks-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <span>Accent color</span>
              <div className="flex-row gap-2">
                {['#C9A84C', '#A11823', '#1B5E20', '#2563EB', '#7C3AED'].map(c => (
                  <button key={c} onClick={() => {
                    setTweak('accent', c);
                    document.documentElement.style.setProperty('--gold', c);
                  }} style={{ width: 28, height: 28, borderRadius: 8, background: c, border: tweaks.accent === c ? '3px solid #0B1C3F' : '1px solid #ddd', cursor: 'pointer' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
