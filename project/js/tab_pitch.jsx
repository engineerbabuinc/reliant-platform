// ============================================================
// TAB 7 — LAND PITCH BUILDER
// ============================================================

function TabPitch({ market }) {
  const [stage, setStage] = React.useState('form');
  const [form, setForm] = React.useState({
    parcelId: 'BLR-DVN-2026-014',
    khasra: '142/3, 143/1',
    lat: '13.2477',
    lng: '77.7141',
    acres: '12',
    sqft: '522720',
    city: 'Bengaluru',
    locality: 'Devanahalli North',
    use: 'Agricultural',
    far: '2.5',
    coverage: '40',
    approvals: ['NA Order'],
    ownership: 'Joint',
    ask: '168',
    structure: 'Outright',
    encumb: 'No',
    notes: 'Owner family open to extended due diligence; clear title certificate available; 220m frontage on STRR.',
  });

  const onChange = (k, v) => {
    const next = { ...form, [k]: v };
    if (k === 'acres') next.sqft = (parseFloat(v) * 43560 || 0).toFixed(0);
    setForm(next);
  };

  const generateDeck = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    const html = `<!DOCTYPE html><html><head><title>Pitch Deck — ${form.parcelId}</title>
<style>
  body{font-family:'Inter',sans-serif;margin:0;color:#0B1C3F;background:#FAF7F0;}
  .pg{padding:60px 80px;page-break-after:always;min-height:100vh;background:#fff;border-bottom:1px solid #eee;}
  .cover{background:linear-gradient(135deg,#0B1C3F 0%,#162C5A 100%);color:#fff;display:flex;flex-direction:column;justify-content:center;}
  .cover h1{font-size:48px;margin:0;color:#C9A84C;}
  .cover h2{font-size:24px;font-weight:400;margin:12px 0;}
  .mark{width:60px;height:60px;border-radius:50%;background:#C9A84C;color:#0B1C3F;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:22px;margin-bottom:32px;}
  h3{color:#C9A84C;font-size:14px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;}
  h2.title{font-size:32px;margin:0 0 24px;}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
  table{width:100%;border-collapse:collapse;font-size:13px;}
  td,th{padding:10px;border-bottom:1px solid #eee;text-align:left;}
  th{background:#FBFAF6;}
  .map{background:linear-gradient(135deg,#E8E3D6,#FAF7F0);height:280px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#6B7280;font-size:14px;}
  ul{line-height:1.8;}
  @media print{.pg{padding:40px;}}
</style></head><body>
<div class="pg cover"><div class="mark">RA</div><h1>${form.parcelId}</h1><h2>${form.locality}, ${form.city}</h2><p>Intelligence-Backed Landowner Pitch · 3 May 2026</p><p style="margin-top:60px;opacity:.7;">Reliant Associates · Land to Leasing</p></div>
<div class="pg"><h3>Page 2 · Land Overview</h3><h2 class="title">${form.acres} acres · ${form.locality}</h2><div class="grid"><table><tr><th>Khasra</th><td>${form.khasra}</td></tr><tr><th>Coordinates</th><td>${form.lat}, ${form.lng}</td></tr><tr><th>Area (sqft)</th><td>${parseInt(form.sqft).toLocaleString('en-IN')}</td></tr><tr><th>Current Use</th><td>${form.use}</td></tr><tr><th>FAR</th><td>${form.far}</td></tr><tr><th>Ground Coverage</th><td>${form.coverage}%</td></tr><tr><th>Ownership</th><td>${form.ownership}</td></tr><tr><th>Approvals</th><td>${form.approvals.join(', ')}</td></tr></table><div class="map">Satellite imagery · ${form.lat}, ${form.lng}</div></div></div>
<div class="pg"><h3>Page 3 · Market Opportunity</h3><h2 class="title">Why ${form.city}, why now</h2><ul><li>Tier-1 demand fundamentals: GDP/capita $8,100, IT/GCC employment growth +14% YoY</li><li>Devanahalli/North Bengaluru capturing 38% of fresh hospitality keys signed FY26</li><li>STRR + Metro Phase 3 collectively unlocking 14 km of premium parcels</li><li>FY26 land transaction velocity in this micromarket: +41% vs FY25</li><li>4 Grade-A hotel signings within 6km radius in last 18 months</li></ul></div>
<div class="pg"><h3>Page 4 · Recommended Use Case</h3><h2 class="title">Hospitality · Upper-Upscale</h2><p>Confidence: 84%. Parcel size, frontage, and proximity to Kempegowda Intl + STRR ramp align with Marriott (Westin), IHG (Crowne Plaza), and Hyatt (Andaz) pipeline criteria.</p><table><tr><th>Brand</th><th>Format</th><th>Fit Score</th></tr><tr><td>Marriott (Westin)</td><td>Upper-Upscale, 220–280 keys</td><td>91/100</td></tr><tr><td>IHG (Crowne Plaza)</td><td>Upscale, 180–240 keys</td><td>84/100</td></tr><tr><td>Hyatt (Andaz)</td><td>Luxury, 140–180 keys</td><td>78/100</td></tr></table></div>
<div class="pg"><h3>Page 5 · Comparable Transactions</h3><h2 class="title">5 nearby comps · within 5km</h2><table><tr><th>Date</th><th>Distance</th><th>₹/sqft</th><th>Type</th><th>Buyer</th></tr>${window.PITCH_COMPS.map(c=>`<tr><td>${c.date}</td><td>${c.dist}</td><td>₹${c.rate.toLocaleString('en-IN')}</td><td>${c.type}</td><td>${c.buyer}</td></tr>`).join('')}</table></div>
<div class="pg"><h3>Page 6 · Indicative Pricing & Structures</h3><h2 class="title">Pricing band: ₹148–172 Cr</h2><p>Based on weighted comp average of ₹12,400/sqft × ${form.acres} acres, adjusted for frontage premium (+8%) and approval status (+4%).</p><table><tr><th>Structure</th><th>Indicative Headline</th><th>Note</th></tr><tr><td>Outright</td><td>₹148–168 Cr</td><td>Fastest closure, lower IRR for owner</td></tr><tr><td>JV / JDA</td><td>32–38% revenue share</td><td>Higher upside, 18–24mo build window</td></tr><tr><td>Revenue Share Lease</td><td>4.5–6% of room revenue</td><td>Monthly minimum guarantee ₹1.2 Cr</td></tr></table></div>
<div class="pg cover"><div class="mark">RA</div><h1 style="color:#C9A84C;">Reliant Associates</h1><p style="font-size:18px;line-height:1.7;margin-top:32px;">450+ closed mandates · 14 cities · ₹4,200 Cr GMV FY26</p><p style="margin-top:48px;"><strong>Your RM:</strong> Rohan Mehta · Sr Director, Hospitality<br/>rohan.mehta@reliant.in · +91 98765 43210</p><button onclick="window.print()" style="margin-top:48px;padding:14px 32px;background:#C9A84C;color:#0B1C3F;border:none;font-weight:700;border-radius:10px;cursor:pointer;font-size:14px;">Print / Save PDF</button></div>
</body></html>`;
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 500);
  };

  if (stage === 'form') {
    return (
      <div className="tabpane">
        <div className="card">
          <h3>Generate an Intelligence-Backed Landowner Pitch in 60 seconds</h3>
          <p className="sub">Capture parcel details. Reliant's engine returns recommended RE type, pricing band, top brand fits, and an exportable deck.</p>
          <div className="row cols-2" style={{ marginBottom: 12 }}>
            <div className="field"><label>Parcel ID / Khata No.</label><input value={form.parcelId} onChange={e => onChange('parcelId', e.target.value)} /></div>
            <div className="field"><label>Survey / Khasra No.</label><input value={form.khasra} onChange={e => onChange('khasra', e.target.value)} /></div>
            <div className="field"><label>Latitude</label><input value={form.lat} onChange={e => onChange('lat', e.target.value)} /></div>
            <div className="field"><label>Longitude</label><input value={form.lng} onChange={e => onChange('lng', e.target.value)} /></div>
            <div className="field"><label>Total Area (acres)</label><input type="number" value={form.acres} onChange={e => onChange('acres', e.target.value)} /></div>
            <div className="field"><label>Area (sqft, auto)</label><input value={form.sqft} disabled /></div>
            <div className="field"><label>City</label>
              <select value={form.city} onChange={e => onChange('city', e.target.value)}>
                {window.CITIES.filter(c => c.id !== 'panIndia').map(c => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="field"><label>Micromarket / Locality</label><input value={form.locality} onChange={e => onChange('locality', e.target.value)} /></div>
            <div className="field"><label>Current Land Use</label>
              <select value={form.use} onChange={e => onChange('use', e.target.value)}>
                {['Agricultural', 'Industrial', 'Commercial', 'Vacant', 'Mixed'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="field"><label>Permissible FAR</label><input type="number" step="0.1" value={form.far} onChange={e => onChange('far', e.target.value)} /></div>
            <div className="field"><label>Ground Coverage %</label><input type="number" value={form.coverage} onChange={e => onChange('coverage', e.target.value)} /></div>
            <div className="field"><label>Ownership Type</label>
              <select value={form.ownership} onChange={e => onChange('ownership', e.target.value)}>
                {['Single', 'Joint', 'Trust', 'Company'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="field"><label>Owner's Ask (₹ Cr) — optional</label><input type="number" value={form.ask} onChange={e => onChange('ask', e.target.value)} /></div>
            <div className="field"><label>Preferred Deal Structure</label>
              <select value={form.structure} onChange={e => onChange('structure', e.target.value)}>
                {['Outright', 'JV', 'JDA', 'Revenue Share'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="field"><label>Encumbrances?</label>
              <select value={form.encumb} onChange={e => onChange('encumb', e.target.value)}>
                <option>No</option><option>Yes</option>
              </select>
            </div>
          </div>

          <div className="field mb-3"><label>Approvals in Hand</label>
            <div className="chips">
              {['NA Order', 'Zone Change', 'Env Clearance', 'Building Plan', 'RERA', 'None'].map(a => (
                <div key={a} className={`chip ${form.approvals.includes(a) ? 'active' : ''}`}
                  onClick={() => {
                    const has = form.approvals.includes(a);
                    onChange('approvals', has ? form.approvals.filter(x => x !== a) : [...form.approvals, a]);
                  }}>{a}</div>
              ))}
            </div>
          </div>

          <div className="field mb-3"><label>Notes</label><textarea value={form.notes} onChange={e => onChange('notes', e.target.value)} /></div>

          <button className="btn btn-primary btn-block" onClick={() => setStage('result')}>Analyse & Generate Pitch →</button>
        </div>
        <DataSources tab="pitch" />
      </div>
    );
  }

  // Results stage
  return (
    <div className="tabpane">
      <button className="btn btn-ghost mb-3" onClick={() => setStage('form')}>← Edit Inputs</button>

      <div className="pitch-strip mb-4">
        <div className="pitch-strip-item"><div className="pitch-strip-label">Recommended</div><div className="pitch-strip-val"><span className="badge badge-gold" style={{ fontSize: 13 }}>Hospitality · Upper-Upscale</span></div></div>
        <div className="pitch-strip-item"><div className="pitch-strip-label">Confidence</div><div className="pitch-strip-val">84%</div></div>
        <div className="pitch-strip-item"><div className="pitch-strip-label">Pricing Band</div><div className="pitch-strip-val">₹148 – 172 Cr</div></div>
        <div className="pitch-strip-item"><div className="pitch-strip-label">Best Structure</div><div className="pitch-strip-val">Outright + Brand Tie-up</div></div>
      </div>

      <div className="row cols-2">
        <div className="card">
          <h3>Why this RE type?</h3>
          <ul style={{ paddingLeft: 18, lineHeight: 1.8, fontSize: 13 }}>
            <li>{form.acres} acres · {form.coverage}% coverage allows 220–280 key hotel programme</li>
            <li>1.4 km to upcoming Devanahalli Metro · 18 km to Kempegowda Intl Airport</li>
            <li>Marriott + IHG + Hyatt all confirmed expansion intent for North BLR FY27</li>
            <li>Hospitality yield (8.0%) outperforms commercial (8.6% but vacancy 16%) and resi (3.6%)</li>
          </ul>
        </div>
        <div className="card">
          <h3>Top 3 Likely Buyer Brands</h3>
          {[
            { name: 'Marriott (Westin)', fit: 'STRR proximity + airport access matches Westin convention-hotel template. RM: Rohan Mehta', score: 91, color: '#A11823' },
            { name: 'IHG (Crowne Plaza)', fit: 'Tier-1 outer-ring expansion mandate. 200m frontage requirement met. RM: Sneha Joshi', score: 84, color: '#003366' },
            { name: 'Hyatt (Andaz)', fit: 'North Bengaluru greenfield priority for FY27. RM: Rohan Mehta', score: 78, color: '#1B5E20' },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: 10, borderBottom: i < 2 ? '1px solid #EFEFEF' : 'none' }}>
              <BrandLogo name={b.name} color={b.color} />
              <div style={{ flex: 1 }}>
                <strong>{b.name}</strong> <span className="badge badge-gold" style={{ marginLeft: 6 }}>{b.score}/100</span>
                <div className="text-xs text-muted mt-2">{b.fit}</div>
              </div>
              <input type="checkbox" defaultChecked={i < 2} title="Add to Pitch" />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Comparable Transactions · within 5km</h3>
        <div className="tbl-wrap">
          <table className="data">
            <thead><tr><th>Date</th><th>Distance</th><th>₹/sqft</th><th>RE Type</th><th>Buyer</th></tr></thead>
            <tbody>
              {window.PITCH_COMPS.map((c, i) => (
                <tr key={i}>
                  <td>{c.date}</td>
                  <td>{c.dist}</td>
                  <td className="text-strong">₹{fmtNum(c.rate)}</td>
                  <td><span className="badge badge-navy">{c.type}</span></td>
                  <td>{c.buyer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row cols-2">
        <div className="card">
          <h3>Infrastructure within 5 km</h3>
          <div className="flex-col gap-2 mt-3">
            {window.PITCH_INFRA.map((p, i) => {
              const I = Icon[p.icon];
              return (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 10, background: '#FBFAF6', borderRadius: 8 }}>
                  <div style={{ color: '#C9A84C' }}>{I && <I />}</div>
                  <div style={{ flex: 1 }}>{p.label}</div>
                  <strong className="text-sm">{p.dist}</strong>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card">
          <h3>Risk Flags</h3>
          {[
            { sev: 'amber', text: 'Joint ownership — co-signatory NRI, expect 6–8 weeks for KYC.' },
            { sev: 'amber', text: 'Zone change from Agricultural → Hospitality required. Karnataka SLBC timeline 6–9 months.' },
            { sev: 'green', text: 'No active litigation. Encumbrance certificate clean.' },
          ].map((r, i) => (
            <div key={i} style={{ padding: 12, background: r.sev === 'amber' ? 'rgba(217,119,6,0.08)' : 'rgba(22,163,74,0.08)', borderLeft: `3px solid ${r.sev === 'amber' ? '#D97706' : '#16A34A'}`, borderRadius: 8, marginBottom: 8 }}>
              <span className="text-sm">{r.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Pitch Status Tracker</h3>
        <div className="stages">
          <span className="stage done">Draft ✓</span>
          <span className="stage current">Deck Sent</span>
          <span className="stage">Meeting Scheduled</span>
          <span className="stage">LOI</span>
          <span className="stage">Closed / Lost</span>
        </div>
        <button className="btn btn-primary btn-block mt-4" onClick={generateDeck}>Generate Pitch Deck (printable PDF) →</button>
      </div>
      <DataSources tab="pitch" />
    </div>
  );
}

Object.assign(window, { TabPitch });
