/* Land Pitch Builder — wizard + 7-page deck preview */

const SAMPLE_PARCEL = {
  id: 'L-2402',
  name: 'Devanahalli Airport Belt',
  city: 'blr',
  acres: 22,
  fsi: 1.5,
  zoning: 'Industrial',
  ask_cr_per_acre: 6.4,
  road_ft: 100,
  airport_km: 4,
  rail_km: 22,
};

function LandPitchTab({ market }) {
  const F = window.RELIANT;
  const [tab, setTab] = useState('builder');
  const [step, setStep] = useState(1);
  const [parcel, setParcel] = useState(SAMPLE_PARCEL);
  const [target, setTarget] = useState('industrial');
  const [client, setClient] = useState({ name: 'Reliance Retail', contact: 'Anand Mehta', email: 'anand.mehta@example.com' });
  const [deck, setDeck] = useState(null);
  const parcels = F.filterByCity(F.LAND_PARCELS, market);

  function generate() {
    setDeck({ parcel, target, client, generatedAt: new Date().toISOString() });
    setStep(4);
  }
  function printDeck() { window.print(); }

  return (
    <Fragment>
      <PageHead
        eyebrow="Workbench · Land Pitch Builder"
        title={<span><em style={{ fontStyle: 'italic' }}>Pitch</em> a parcel — in seven pages</span>}
        sub="Pick a parcel, pick a target, generate a printable client deck."
        actions={<Fragment>
          <button className="btn"><Icon name="filter" size={14}/> Browse book</button>
          {deck && <button className="btn primary" onClick={printDeck}><Icon name="print" size={14}/> Print deck</button>}
        </Fragment>}
      />
      <Tabs items={[
        { id:'builder',  label:'Builder' },
        { id:'parcels',  label:'Land book', count: parcels.length },
        { id:'history',  label:'Recent decks', count: 4 },
      ]} value={tab} onChange={setTab}/>
      <div className="page-body">
        {tab === 'builder' && (
          <Fragment>
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="row" style={{ gap: 24, alignItems: 'stretch' }}>
                {[
                  { n: 1, label: 'Parcel' },
                  { n: 2, label: 'Target' },
                  { n: 3, label: 'Client' },
                  { n: 4, label: 'Preview' },
                ].map((s, i, arr) => (
                  <Fragment key={s.n}>
                    <div className="row" style={{ gap: 10, opacity: step >= s.n ? 1 : 0.4 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: step >= s.n ? 'var(--ink-900)' : 'var(--bg-2)', color: step >= s.n ? 'var(--paper-50)' : 'var(--fg-3)', display: 'grid', placeItems: 'center', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{s.n}</div>
                      <div style={{ fontSize: 13.5 }}>{s.label}</div>
                    </div>
                    {i < arr.length - 1 && <div style={{ flex: 1, height: 1, background: 'var(--border-1)', alignSelf: 'center' }}/>}
                  </Fragment>
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="card">
                <SectionHead eyebrow="Step 1" title="Pick a parcel from the land book"/>
                <div className="grid cols-2" style={{ gap: 12 }}>
                  {parcels.map(p => (
                    <div key={p.id} className={`card alt`} style={{ cursor: 'pointer', border: parcel.id === p.id ? '2px solid var(--accent)' : '1px solid var(--border-1)', padding: 16 }} onClick={() => setParcel({ ...p, name: p.area })}>
                      <div className="row" style={{ marginBottom: 6 }}>
                        <span className="eyebrow">{p.id}</span><span className="spacer"/>
                        <span className="pill">{p.zoning}</span>
                      </div>
                      <div className="section-title" style={{ fontSize: 18 }}>{p.area}</div>
                      <div className="page-subtitle" style={{ marginTop: 4 }}>{F.CITIES.find(c=>c.id===p.city)?.name}</div>
                      <div className="row mt-3" style={{ gap: 16, fontSize: 12 }}>
                        <span><span className="eyebrow">Acres</span> <span className="metric-num">{p.acres}</span></span>
                        <span><span className="eyebrow">FSI</span> <span className="metric-num">{p.fsi}</span></span>
                        <span><span className="eyebrow">Ask</span> <span className="metric-num">₹{p.ask_cr_per_acre}/ac</span></span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row mt-5">
                  <span className="spacer"/>
                  <button className="btn primary" onClick={() => setStep(2)}>Next: target <Icon name="arrow-right" size={14}/></button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card">
                <SectionHead eyebrow="Step 2" title="Pick the target use case"/>
                <div className="grid cols-3" style={{ gap: 12 }}>
                  {[
                    { id:'industrial',  label:'Industrial / Warehousing', sub:'Logistics park, BTS, EMS' },
                    { id:'healthcare',  label:'Healthcare campus',        sub:'Tertiary, multi-spec' },
                    { id:'hospitality', label:'Hospitality',              sub:'Mid → upscale, branded' },
                    { id:'commercial',  label:'Commercial office',        sub:'Grade-A office park' },
                    { id:'residential', label:'Residential township',     sub:'Mid-premium, premium' },
                    { id:'mixed',       label:'Mixed-use',                sub:'Retail + res + commercial' },
                  ].map(t => (
                    <div key={t.id} className="card alt" style={{ cursor: 'pointer', border: target === t.id ? '2px solid var(--accent)' : '1px solid var(--border-1)', padding: 16 }} onClick={() => setTarget(t.id)}>
                      <div className="card-title">{t.label}</div>
                      <div className="page-subtitle mt-3">{t.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="row mt-5">
                  <button className="btn ghost" onClick={() => setStep(1)}>Back</button>
                  <span className="spacer"/>
                  <button className="btn primary" onClick={() => setStep(3)}>Next: client <Icon name="arrow-right" size={14}/></button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="card">
                <SectionHead eyebrow="Step 3" title="Who's the deck for?"/>
                <div className="grid cols-3" style={{ gap: 16 }}>
                  <div className="field"><label>Client</label><input className="input" value={client.name} onChange={e => setClient({...client, name: e.target.value})}/></div>
                  <div className="field"><label>Contact</label><input className="input" value={client.contact} onChange={e => setClient({...client, contact: e.target.value})}/></div>
                  <div className="field"><label>Email</label><input className="input" value={client.email} onChange={e => setClient({...client, email: e.target.value})}/></div>
                </div>
                <div className="row mt-5">
                  <button className="btn ghost" onClick={() => setStep(2)}>Back</button>
                  <span className="spacer"/>
                  <button className="btn primary" onClick={generate}><Icon name="sparkle" size={14}/> Generate 7-page deck</button>
                </div>
              </div>
            )}

            {step === 4 && deck && (
              <Fragment>
                <div className="card" style={{ marginBottom: 16, background: 'var(--ok-tint)', border: 0 }}>
                  <div className="row" style={{ gap: 12 }}>
                    <Icon name="check" size={20}/>
                    <div className="col" style={{ gap: 2, flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ok)' }}>Deck generated · 7 pages</div>
                      <div className="small" style={{ color: 'var(--ok)' }}>Pitch for <strong>{deck.client.name}</strong> on <strong>{deck.parcel.name}</strong> as <strong>{target}</strong>.</div>
                    </div>
                    <button className="btn primary" onClick={printDeck}><Icon name="print" size={14}/> Print / save PDF</button>
                  </div>
                </div>
                <DeckPreview deck={deck}/>
                <div className="row mt-5">
                  <button className="btn ghost" onClick={() => { setStep(1); setDeck(null); }}>Start over</button>
                  <span className="spacer"/>
                  <button className="btn"><Icon name="mail" size={14}/> Email to {deck.client.contact.split(' ')[0]}</button>
                  <button className="btn primary" onClick={printDeck}><Icon name="print" size={14}/> Print deck</button>
                </div>
              </Fragment>
            )}
          </Fragment>
        )}
        {tab === 'parcels' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Parcel ID</th><th>Area</th><th>City</th><th>Zoning</th>
                  <th className="right">Acres</th><th className="right">FSI</th><th className="right">Ask/acre</th>
                  <th className="right">Airport</th><th className="right">Rail</th>
                </tr></thead>
                <tbody>{parcels.map(p => (
                  <tr key={p.id} className="clickable" onClick={() => { setParcel({...p, name: p.area}); setTab('builder'); setStep(2); }}>
                    <td className="muted">{p.id}</td>
                    <td>{p.area}</td>
                    <td className="muted">{F.CITIES.find(c=>c.id===p.city)?.short}</td>
                    <td><span className="pill">{p.zoning}</span></td>
                    <td className="num">{p.acres}</td>
                    <td className="num">{p.fsi}</td>
                    <td className="num">₹{p.ask_cr_per_acre} Cr</td>
                    <td className="num">{p.airport_km} km</td>
                    <td className="num">{p.rail_km} km</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'history' && (
          <div className="card">
            <SectionHead eyebrow="Recent decks" title="Generated last 30 days"/>
            <div className="col">
              {[
                { client: 'Apollo Hospitals', parcel: 'Hinjewadi Phase 4', target: 'Healthcare', when: '12 days ago', owner: 'P. Banerjee' },
                { client: 'Foxconn India', parcel: 'Sriperumbudur', target: 'Industrial', when: '19 days ago', owner: 'A. Saxena' },
                { client: 'IHCL', parcel: 'North Goa — Morjim', target: 'Hospitality', when: '24 days ago', owner: 'A. Khanna' },
                { client: 'Manipal Health', parcel: 'Patancheru', target: 'Healthcare', when: '28 days ago', owner: 'P. Banerjee' },
              ].map((h,i) => (
                <div key={i} className="row" style={{ padding: '14px 0', borderBottom: i < 3 ? '1px solid var(--border-1)' : 0, gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-2)', display: 'grid', placeItems: 'center' }}><Icon name="print" size={14}/></div>
                  <div className="col" style={{ gap: 2, flex: 1 }}>
                    <div style={{ fontSize: 13.5 }}><strong>{h.client}</strong> · {h.parcel}</div>
                    <div className="small fg-3">{h.target} · by {h.owner}</div>
                  </div>
                  <span className="small fg-3" style={{ fontFamily: 'var(--font-mono)' }}>{h.when}</span>
                  <button className="btn sm">Reopen</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

// 7-page printable deck
function DeckPreview({ deck }) {
  const F = window.RELIANT;
  const p = deck.parcel;
  const cityName = F.CITIES.find(c => c.id === p.city)?.name;
  const totalAsk = p.acres * p.ask_cr_per_acre;

  function Page({ children, n, title }) {
    return (
      <div className="deck-page" style={{
        background: 'var(--paper-50)',
        border: '1px solid var(--border-1)',
        borderRadius: 12,
        padding: 36,
        marginBottom: 14,
        minHeight: 540,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div className="row" style={{ marginBottom: 18 }}>
          <span className="eyebrow">Reliant Associates · {p.id}</span>
          <span className="spacer"/>
          <span className="eyebrow">{n} / 7</span>
        </div>
        {title && <h2 className="page-title" style={{ fontSize: 28 }}>{title}</h2>}
        <div style={{ flex: 1, marginTop: 16 }}>{children}</div>
        <div className="row" style={{ marginTop: 18, fontSize: 10.5, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          <span>Confidential · for {deck.client.name}</span>
          <span className="spacer"/>
          <span>{new Date(deck.generatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="col" style={{ gap: 0 }}>
      <Page n={1}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div className="brand-mark" style={{ marginBottom: 24, width: 36, height: 36 }}>R</div>
          <div className="brand-wordmark" style={{ fontSize: 18, marginBottom: 32 }}>Reliant Associates</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 48, lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: 720 }}>
            {p.name} —<br/>a {p.acres}-acre {deck.target} opportunity.
          </div>
          <div className="page-subtitle" style={{ fontSize: 16, marginTop: 18 }}>Prepared for {deck.client.name}</div>
        </div>
      </Page>
      <Page n={2} title="Executive summary">
        <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)', maxWidth: 760 }}>
          Reliant Associates is pleased to present <strong>{p.name}</strong>, a <strong>{p.acres}-acre</strong> contiguous {p.zoning.toLowerCase()} parcel in <strong>{cityName}</strong>, with FSI <strong>{p.fsi}</strong>, frontage on a {p.road_ft}-ft road, and immediate proximity to {p.airport_km < 10 ? 'the international airport' : 'rail and arterial logistics'}.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)', maxWidth: 760, marginTop: 14 }}>
          We are recommending it for {deck.target === 'mixed' ? 'a mixed-use' : 'a ' + deck.target} development at a guidance price of <strong>₹{p.ask_cr_per_acre} Cr per acre</strong> (total <strong>₹{totalAsk.toFixed(0)} Cr</strong>). The opportunity is exclusive to {deck.client.name} for an initial 21-day window.
        </p>
        <div className="grid cols-3 mt-5" style={{ gap: 12 }}>
          <KPI label="Site area" value={p.acres} unit=" ac"/>
          <KPI label="Buildable" value={Math.round(p.acres * 43560 * p.fsi / 1000) + 'k'} unit=" sqft"/>
          <KPI label="Total ask" value={'₹' + totalAsk.toFixed(0)} unit=" Cr"/>
        </div>
      </Page>
      <Page n={3} title="Site & location">
        <div className="grid cols-2" style={{ gap: 16 }}>
          <div className="card">
            <table className="tbl"><tbody>
              <tr><td className="muted">Parcel ID</td><td className="num">{p.id}</td></tr>
              <tr><td className="muted">City / submarket</td><td>{cityName}</td></tr>
              <tr><td className="muted">Area</td><td className="num">{p.acres} acres</td></tr>
              <tr><td className="muted">Zoning</td><td>{p.zoning}</td></tr>
              <tr><td className="muted">FSI</td><td className="num">{p.fsi}</td></tr>
              <tr><td className="muted">Buildable area</td><td className="num">{Math.round(p.acres * 43560 * p.fsi).toLocaleString('en-IN')} sqft</td></tr>
              <tr><td className="muted">Road frontage</td><td className="num">{p.road_ft} ft</td></tr>
              <tr><td className="muted">Airport</td><td className="num">{p.airport_km} km</td></tr>
              <tr><td className="muted">Rail</td><td className="num">{p.rail_km} km</td></tr>
            </tbody></table>
          </div>
          <div className="card alt" style={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
            <div style={{ textAlign: 'center', color: 'var(--fg-3)' }}>
              <Icon name="map" size={48}/>
              <div className="eyebrow mt-3">Site map placeholder</div>
              <div className="small mt-3">Insert satellite + cadastral overlay before sending</div>
            </div>
          </div>
        </div>
      </Page>
      <Page n={4} title="Market context">
        <p style={{ fontSize: 14, color: 'var(--fg-2)', marginBottom: 16 }}>{cityName} {deck.target} demand at a glance — FY26.</p>
        <div className="grid cols-3" style={{ gap: 12, marginBottom: 16 }}>
          <KPI label="Submarket rent" value="₹25" unit=" /sqft/mo"/>
          <KPI label="Vacancy" value="6.4" unit="%"/>
          <KPI label="Yr-on-yr rent growth" value="+8.4" unit="%"/>
        </div>
        <div className="card">
          <div className="card-title">Comparable transactions (last 18 months)</div>
          <table className="tbl mt-3"><thead><tr>
            <th>Asset</th><th>Type</th><th className="right">Acres</th><th className="right">₹/acre</th>
          </tr></thead><tbody>
            <tr><td>{cityName} — comparable A</td><td>Industrial</td><td className="num">14</td><td className="num">₹6.0 Cr</td></tr>
            <tr><td>{cityName} — comparable B</td><td>Industrial</td><td className="num">28</td><td className="num">₹6.6 Cr</td></tr>
            <tr><td>{cityName} — comparable C</td><td>Mixed-use</td><td className="num">12</td><td className="num">₹7.2 Cr</td></tr>
          </tbody></table>
        </div>
      </Page>
      <Page n={5} title="Use case · {deck.target}">
        <h3 className="section-title" style={{ marginBottom: 12 }}>Why this site fits {deck.client.name}'s thesis</h3>
        <ul style={{ paddingLeft: 18, fontSize: 14.5, lineHeight: 1.75, color: 'var(--fg-2)' }}>
          <li>Contiguous {p.acres}-acre parcels with {p.fsi} FSI are scarce — three of seven comparable sales in 2024–25 cleared at &gt; ₹{(p.ask_cr_per_acre * 1.05).toFixed(1)} Cr/acre.</li>
          <li>Zoning is {p.zoning.toLowerCase()}; conversion to alternate use is permissible under the master plan, with 18–22 weeks of regulatory runway.</li>
          <li>Road frontage of {p.road_ft} ft supports {p.road_ft >= 100 ? 'heavy logistics access without easement constraints' : 'standard ingress / egress'} — material for {deck.target} operations.</li>
          <li>Distance to {p.airport_km < 10 ? 'airport' : 'rail head'} ({p.airport_km < 10 ? p.airport_km : p.rail_km} km) drives {deck.target === 'industrial' ? 'last-mile efficiency' : 'guest / patient catchment'}.</li>
        </ul>
        <div className="card alt mt-5">
          <div className="eyebrow">Indicative project economics</div>
          <div className="grid cols-3 mt-3">
            <KPI label="Land cost" value={'₹' + totalAsk.toFixed(0)} unit=" Cr"/>
            <KPI label="Build (₹2.5k/sqft)" value={'₹' + Math.round(p.acres * 43560 * p.fsi * 2500 / 1e7).toLocaleString('en-IN')} unit=" Cr"/>
            <KPI label="Stabilised yield" value="9.4" unit="%" sub="indicative"/>
          </div>
        </div>
      </Page>
      <Page n={6} title="Commercials & process">
        <div className="grid cols-2" style={{ gap: 16 }}>
          <div className="card">
            <div className="card-title">Commercials</div>
            <table className="tbl mt-3"><tbody>
              <tr><td className="muted">Guidance / acre</td><td className="num">₹{p.ask_cr_per_acre} Cr</td></tr>
              <tr><td className="muted">Total guidance</td><td className="num">₹{totalAsk.toFixed(0)} Cr</td></tr>
              <tr><td className="muted">Earnest money</td><td className="num">10%</td></tr>
              <tr><td className="muted">Title due-diligence</td><td className="num">3 weeks</td></tr>
              <tr><td className="muted">Exclusivity window</td><td className="num">21 days</td></tr>
              <tr><td className="muted">Reliant fee</td><td className="num">1.5% of consideration</td></tr>
            </tbody></table>
          </div>
          <div className="card">
            <div className="card-title">Indicative timeline</div>
            <div className="col mt-3" style={{ gap: 10 }}>
              {[
                { wk: 'Wk 0–1',   step: 'Term sheet exchange & exclusivity' },
                { wk: 'Wk 1–4',   step: 'Title + technical due-diligence' },
                { wk: 'Wk 4–6',   step: 'Definitive agreement' },
                { wk: 'Wk 6–10',  step: 'Stamp duty, registration, handover' },
                { wk: 'Wk 10+',   step: 'Master-plan & approvals kickoff' },
              ].map((t,i) => (
                <div key={i} className="row" style={{ gap: 12, fontSize: 13 }}>
                  <span className="pill solid-ink" style={{ minWidth: 78, justifyContent: 'center' }}>{t.wk}</span>
                  <span style={{ color: 'var(--fg-2)' }}>{t.step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Page>
      <Page n={7} title="Next steps">
        <div className="row mt-3" style={{ alignItems: 'flex-start', gap: 32 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14.5, color: 'var(--fg-2)', lineHeight: 1.65 }}>
              We propose a site visit in the next 5 working days, followed by a structured term sheet within 10. Reliant Associates will single-thread this engagement through Aanya Khanna and the {deck.target} desk.
            </p>
            <div className="card alt mt-5">
              <div className="eyebrow">Reliant point of contact</div>
              <div className="row mt-3" style={{ gap: 12 }}>
                <div className="avatar" style={{ width: 44, height: 44, fontSize: 14 }}>AK</div>
                <div className="col" style={{ gap: 2 }}>
                  <div style={{ fontWeight: 500 }}>Aanya Khanna</div>
                  <div className="small fg-3">Director — Capital Markets</div>
                  <div className="small fg-3">aanya@reliant-associates.in · +91 98 2014 7720</div>
                </div>
              </div>
            </div>
          </div>
          <div className="card ink" style={{ width: 320 }}>
            <div className="eyebrow" style={{ color: 'rgba(250,248,243,0.6)' }}>Action</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 28, lineHeight: 1.1, marginTop: 10 }}>
              Confirm a site visit by Friday and we hold exclusivity through month-end.
            </div>
          </div>
        </div>
      </Page>
    </div>
  );
}

// ============================================================
// TEAM
// ============================================================
function TeamTab({ market }) {
  const F = window.RELIANT;
  const [tab, setTab] = useState('roster');
  const [openMember, setOpenMember] = useState(null);
  const team = F.filterByCity(F.TEAM, market);

  return (
    <Fragment>
      <PageHead
        eyebrow="Workbench · Team"
        title={<span><em style={{ fontStyle: 'italic' }}>Team</em> & assignments</span>}
        sub="Who's on what — utilisation, active deals, GCI."
        actions={<button className="btn primary"><Icon name="plus" size={14}/> Assign deal</button>}
      />
      <Tabs items={[
        { id:'roster',     label:'Roster', count: team.length },
        { id:'utilisation',label:'Utilisation' },
        { id:'gci',        label:'GCI YTD' },
      ]} value={tab} onChange={setTab}/>
      <div className="page-body">
        {tab === 'roster' && (
          <div className="card" style={{ padding: 0 }}>
            <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
              <table className="tbl">
                <thead><tr>
                  <th>Name</th><th>Role</th><th>Sector</th><th>City</th>
                  <th className="right">Util</th><th className="right">Active</th><th className="right">GCI YTD</th>
                </tr></thead>
                <tbody>{team.map(t => (
                  <tr key={t.id} className="clickable" onClick={() => setOpenMember(t)}>
                    <td><div className="row" style={{ gap: 10 }}><div className="avatar">{t.name.split(' ').map(n=>n[0]).join('')}</div>{t.name}</div></td>
                    <td className="muted">{t.role}</td>
                    <td><span className="pill">{t.sector}</span></td>
                    <td className="muted">{F.CITIES.find(c=>c.id===t.city)?.short}</td>
                    <td className="num">{t.util}%</td>
                    <td className="num">{t.deals_active}</td>
                    <td className="num">₹{t.gci_ytd_cr.toFixed(1)} Cr</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            {openMember && (
              <Drawer title={openMember.name} onClose={() => setOpenMember(null)}
                      footer={<Fragment><button className="btn" onClick={() => setOpenMember(null)}>Close</button><button className="btn primary"><Icon name="mail" size={14}/> Message</button></Fragment>}>
                <div className="row" style={{ gap: 14, marginBottom: 18 }}>
                  <div className="avatar" style={{ width: 56, height: 56, fontSize: 16 }}>{openMember.name.split(' ').map(n=>n[0]).join('')}</div>
                  <div className="col" style={{ gap: 2 }}>
                    <div style={{ fontWeight: 500, fontSize: 15 }}>{openMember.name}</div>
                    <div className="small fg-3">{openMember.role}</div>
                    <div className="small fg-3">{F.CITIES.find(c=>c.id===openMember.city)?.name} · {openMember.sector}</div>
                  </div>
                </div>
                <div className="grid cols-3" style={{ marginBottom: 16 }}>
                  <KPI label="Utilisation" value={openMember.util} unit="%"/>
                  <KPI label="Active deals" value={openMember.deals_active}/>
                  <KPI label="GCI YTD" value={'₹' + openMember.gci_ytd_cr.toFixed(1)} unit=" Cr"/>
                </div>
                <SectionHead eyebrow="Recent" title="Active engagements"/>
                <div className="col">
                  {Array.from({ length: Math.min(openMember.deals_active, 4) }, (_, i) => (
                    <div key={i} className="row" style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 8, gap: 10, marginBottom: 8 }}>
                      <span className="pill info">In execution</span>
                      <div style={{ fontSize: 13, flex: 1 }}>{openMember.sector} engagement #{i+1}</div>
                      <span className="metric-num" style={{ fontSize: 12.5 }}>₹{(180 + i*40)} Cr</span>
                    </div>
                  ))}
                </div>
              </Drawer>
            )}
          </div>
        )}
        {tab === 'utilisation' && (
          <div className="card">
            <SectionHead eyebrow="Utilisation" title="Capacity by person"/>
            <RankingBars data={team.sort((a,b)=>b.util-a.util)} valueKey="util" labelKey="name" formatV={v => v + '%'} max={100}/>
          </div>
        )}
        {tab === 'gci' && (
          <div className="card">
            <SectionHead eyebrow="GCI YTD" title="Top earners"/>
            <RankingBars data={team.sort((a,b)=>b.gci_ytd_cr-a.gci_ytd_cr)} valueKey="gci_ytd_cr" labelKey="name" formatV={v => '₹' + v.toFixed(1) + ' Cr'} color="var(--clay-500)"/>
          </div>
        )}
      </div>
    </Fragment>
  );
}

// ============================================================
// ISSUES
// ============================================================
function IssuesTab() {
  const F = window.RELIANT;
  const [filter, setFilter] = useState('open');
  const [open, setOpen] = useState(null);
  const items = F.ISSUES.filter(i => filter === 'all' ? true : filter === 'open' ? i.status !== 'Resolved' && i.status !== 'Won\'t fix' : i.status === 'Resolved');

  return (
    <Fragment>
      <PageHead
        eyebrow="Workbench · Issue Tracker"
        title={<span><em style={{ fontStyle: 'italic' }}>Issues</em> &amp; data quality</span>}
        sub="Bugs, calc errors, data refreshes — anything that needs the team's attention."
        actions={<button className="btn primary"><Icon name="plus" size={14}/> New issue</button>}
      />
      <Tabs items={[
        { id:'open', label:'Open', count: F.ISSUES.filter(i => i.status !== 'Resolved' && i.status !== 'Won\'t fix').length },
        { id:'all',  label:'All',  count: F.ISSUES.length },
        { id:'closed',label:'Closed', count: F.ISSUES.filter(i => i.status === 'Resolved' || i.status === 'Won\'t fix').length },
      ]} value={filter} onChange={setFilter}/>
      <div className="page-body">
        <div className="grid cols-4" style={{ marginBottom: 24 }}>
          <KPI label="Open" value={F.ISSUES.filter(i => i.status === 'Open').length}/>
          <KPI label="In review" value={F.ISSUES.filter(i => i.status === 'In review').length}/>
          <KPI label="Blocked" value={F.ISSUES.filter(i => i.status === 'Blocked').length}/>
          <KPI label="High severity" value={F.ISSUES.filter(i => i.severity === 'High' && i.status !== 'Resolved').length} ink/>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <div className="tbl-wrap" style={{ border: 0, maxHeight: 'none' }}>
            <table className="tbl">
              <thead><tr>
                <th>ID</th><th>Title</th><th>Area</th><th>Severity</th><th>Status</th><th>Owner</th><th>Opened</th>
              </tr></thead>
              <tbody>{items.map(i => (
                <tr key={i.id} className="clickable" onClick={() => setOpen(i)}>
                  <td className="muted" style={{ fontFamily: 'var(--font-mono)' }}>{i.id}</td>
                  <td>{i.title}</td>
                  <td className="muted">{i.area}</td>
                  <td><span className={`pill ${i.severity==='High'?'bad':i.severity==='Med'?'warn':''}`}>{i.severity}</span></td>
                  <td><span className={`pill ${i.status==='Open'?'info':i.status==='Resolved'?'ok':i.status==='Blocked'?'bad':''}`}>{i.status}</span></td>
                  <td className="muted">{i.owner}</td>
                  <td className="muted" style={{ fontFamily: 'var(--font-mono)' }}>{i.opened}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          {open && (
            <Modal title={open.id + ' · ' + open.title} onClose={() => setOpen(null)}
                   footer={<Fragment><button className="btn" onClick={() => setOpen(null)}>Close</button><button className="btn primary">Mark resolved</button></Fragment>}>
              <div className="grid cols-3" style={{ marginBottom: 16 }}>
                <KPI label="Severity" value={<span style={{ fontSize: 22 }}>{open.severity}</span>}/>
                <KPI label="Status" value={<span style={{ fontSize: 22 }}>{open.status}</span>}/>
                <KPI label="Owner" value={<span style={{ fontSize: 22 }}>{open.owner}</span>}/>
              </div>
              <SectionHead eyebrow="Description" title="What's wrong"/>
              <p style={{ fontSize: 13.5, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                Reproduced on {open.opened}. {open.area} owner ({open.owner}) is investigating; root cause identified as data calculation logic. Fix in flight.
              </p>
              <SectionHead eyebrow="Activity" title="Timeline"/>
              <div className="col">
                {[
                  { who: 'V. Rao', when: open.opened, what: 'Filed issue with reproduction notes' },
                  { who: open.owner, when: '2026-04-23', what: 'Triaged · severity ' + open.severity },
                  { who: open.owner, when: '2026-04-24', what: 'Investigating root cause' },
                ].map((a,i) => (
                  <div key={i} className="row" style={{ gap: 10, padding: 10, borderBottom: i < 2 ? '1px solid var(--border-1)' : 0 }}>
                    <div className="avatar" style={{ width: 24, height: 24, fontSize: 9 }}>{a.who.split(' ').map(n=>n[0]).join('')}</div>
                    <div className="col" style={{ gap: 0, flex: 1 }}>
                      <div style={{ fontSize: 13 }}>{a.what}</div>
                      <div className="small fg-3">{a.who} · {a.when}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Modal>
          )}
        </div>
      </div>
    </Fragment>
  );
}

Object.assign(window, { LandPitchTab, TeamTab, IssuesTab });
