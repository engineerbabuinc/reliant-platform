import { Icon } from './Primitives.jsx';
import { Drawer } from './Primitives.jsx';

export function TweaksPanel({ open, onClose, tweaks, setTweaks }) {
  function toggle(key) {
    setTweaks(t => ({ ...t, [key]: !t[key] }));
  }
  function set(key, val) {
    setTweaks(t => ({ ...t, [key]: val }));
  }

  return (
    <Drawer open={open} onClose={onClose} title="Tweaks">
      <div className="col" style={{ gap: 24 }}>

        <Section label="Appearance">
          <Row label="Theme" sub="Light or dark interface">
            <div className="row" style={{ gap: 4 }}>
              {['light','dark'].map(t => (
                <button key={t} className={`btn ${tweaks.theme === t ? 'primary' : 'ghost'} sm`}
                  onClick={() => set('theme', t)} style={{ textTransform:'capitalize' }}>{t}</button>
              ))}
            </div>
          </Row>
          <Row label="Density" sub="Compact or comfortable spacing">
            <div className="row" style={{ gap: 4 }}>
              {['comfortable','compact'].map(d => (
                <button key={d} className={`btn ${tweaks.density === d ? 'primary' : 'ghost'} sm`}
                  onClick={() => set('density', d)} style={{ textTransform:'capitalize' }}>{d}</button>
              ))}
            </div>
          </Row>
        </Section>

        <Section label="Data">
          <Row label="CRM live" sub="Simulate a live CRM connection">
            <Toggle on={tweaks.crmLive} onToggle={() => toggle('crmLive')} />
          </Row>
          <Row label="Show annex" sub="Open questions panel at bottom of Master">
            <Toggle on={tweaks.showAnnex} onToggle={() => toggle('showAnnex')} />
          </Row>
        </Section>

        <Section label="About">
          <div style={{ fontSize: 12.5, color: 'var(--fg-3)', lineHeight: 1.65 }}>
            Reliant Intelligence Platform · FY26<br/>
            Version 0.1-alpha · May 2026<br/>
            <br/>
            Data is mock-but-plausible. All figures are illustrative and for internal demonstration purposes only.
          </div>
        </Section>

      </div>
    </Drawer>
  );
}

function Section({ label, children }) {
  return (
    <div className="col" style={{ gap: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', paddingBottom: 6, borderBottom: '1px solid var(--border-1)' }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Row({ label, sub, children }) {
  return (
    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <div className="col" style={{ gap: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: 'var(--fg-3)' }}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 36, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer', padding: 2,
        background: on ? 'var(--accent)' : 'var(--border-1)',
        transition: 'background 0.15s',
        position: 'relative', flexShrink: 0,
      }}>
      <div style={{
        width: 16, height: 16, borderRadius: '50%', background: 'white',
        position: 'absolute', top: 2,
        left: on ? 16 : 2,
        transition: 'left 0.15s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}/>
    </button>
  );
}
