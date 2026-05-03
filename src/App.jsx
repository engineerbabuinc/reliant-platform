import { useState, useEffect } from 'react';
import { OPEN_QUESTIONS } from './data.js';
import { Sidebar, Header } from './components/Shell.jsx';
import { Drawer } from './components/Primitives.jsx';
import { MasterDashboard } from './components/Master.jsx';
import {
  HospitalityTab, HealthcareTab, IndustrialTab, CommercialTab, ResidentialTab
} from './components/Sectors.jsx';
import { LandPitchTab, TeamTab, IssuesTab } from './components/Workbench.jsx';
import { TweaksPanel } from './components/TweaksPanel.jsx';
import { useData } from './hooks/useData.js';
import { api } from './api.js';
import './styles/colors_and_type.css';
import './styles/app.css';

const DEFAULT_TWEAKS = {
  theme:     'light',
  density:   'comfortable',
  crmLive:   true,
  showAnnex: false,
};

export default function App() {
  const [page,    setPage]    = useState('master');
  const [market,  setMarket]  = useState('pan');
  const [tweaks,  setTweaks]  = useState(DEFAULT_TWEAKS);
  const [notifs,  setNotifs]  = useState(false);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  // Apply theme + density to <html>
  useEffect(() => {
    document.documentElement.dataset.theme   = tweaks.theme;
    document.documentElement.dataset.density = tweaks.density;
  }, [tweaks.theme, tweaks.density]);

  const { data: issues } = useData(api.issues.list);
  const openIssues = (issues || []).filter(i => ['Open','In review','Blocked'].includes(i.status)).length;
  const { data: notifications } = useData(api.notifications.list);

  function jumpTo(sectorId) {
    setPage(sectorId);
  }

  return (
    <div className="app">
      <Sidebar active={page} onChange={setPage} openCount={openIssues} />

      <div className="main">
        <Header
          market={market}
          onMarket={setMarket}
          onOpenNotifs={() => setNotifs(true)}
          crmLive={tweaks.crmLive}
          onOpenTweaks={() => setTweaksOpen(true)}
        />

        <main className="content">
          {page === 'master'      && <MasterDashboard market={market} crmLive={tweaks.crmLive} onJump={jumpTo} />}
          {page === 'hospitality' && <HospitalityTab  market={market} />}
          {page === 'healthcare'  && <HealthcareTab   market={market} />}
          {page === 'industrial'  && <IndustrialTab   market={market} />}
          {page === 'commercial'  && <CommercialTab   market={market} />}
          {page === 'residential' && <ResidentialTab  market={market} />}
          {page === 'land'        && <LandPitchTab />}
          {page === 'team'        && <TeamTab />}
          {page === 'issues'      && <IssuesTab />}

          {page === 'master' && tweaks.showAnnex && <Annex />}
        </main>
      </div>

      {/* Notifications drawer */}
      <Drawer open={notifs} onClose={() => setNotifs(false)} title="Notifications">
        <div className="col" style={{ gap: 0 }}>
          {(notifications || []).map((n, i, arr) => (
            <div key={n.id} className="row" style={{ padding:'12px 0', borderBottom: i < arr.length-1 ? '1px solid var(--border-1)' : 0, gap: 12, alignItems:'flex-start' }}>
              <span className="pill" style={{ minWidth:84, justifyContent:'center', flexShrink:0 }}>{n.cat}</span>
              <div className="col" style={{ gap: 2, flex:1 }}>
                <div style={{ fontSize:13.5 }}>{n.title}</div>
                <div style={{ fontSize:11.5, color:'var(--fg-3)', fontFamily:'var(--font-mono)' }}>{n.time} ago</div>
              </div>
            </div>
          ))}
        </div>
      </Drawer>

      {/* Tweaks panel */}
      <TweaksPanel
        open={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
        tweaks={tweaks}
        setTweaks={setTweaks}
      />
    </div>
  );
}

function Annex() {
  return (
    <div className="annex" style={{ marginTop: 40 }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color:'var(--fg-2)' }}>
        Open questions &amp; assumptions
      </div>
      <div className="col" style={{ gap: 8 }}>
        {OPEN_QUESTIONS.map((q, i) => (
          <div key={i} className="row" style={{ gap: 12, alignItems:'flex-start', fontSize: 13, lineHeight: 1.6 }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)', flexShrink:0, paddingTop:2 }}>Q{i+1}</span>
            <span style={{ color:'var(--fg-2)' }}>{q}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
