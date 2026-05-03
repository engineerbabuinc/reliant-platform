require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app    = express();
const PORT   = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── Health ──────────────────────────────────────────────────────────────────
app.get('/api/health', (_, res) => res.json({ ok: true, ts: new Date() }));

// ── Pipeline ────────────────────────────────────────────────────────────────
app.get('/api/pipeline', async (_, res) => {
  const stages = await prisma.pipelineStage.findMany({ orderBy: { order: 'asc' } });
  res.json(stages);
});

app.put('/api/pipeline/:stage', async (req, res) => {
  const { count, valueCr } = req.body;
  const stage = await prisma.pipelineStage.update({
    where: { stage: req.params.stage },
    data: { ...(count != null && { count }), ...(valueCr != null && { valueCr }) },
  });
  res.json(stage);
});

// ── Deals ───────────────────────────────────────────────────────────────────
app.get('/api/deals', async (req, res) => {
  const where = {};
  if (req.query.hot === 'true') where.hot = true;
  if (req.query.sector) where.sector = req.query.sector;
  if (req.query.city)   where.city   = req.query.city;
  const deals = await prisma.deal.findMany({ where, orderBy: { createdAt: 'desc' } });
  res.json(deals);
});

app.get('/api/deals/:id', async (req, res) => {
  const deal = await prisma.deal.findUnique({ where: { id: req.params.id } });
  if (!deal) return res.status(404).json({ error: 'Not found' });
  res.json(deal);
});

app.post('/api/deals', async (req, res) => {
  const { name, sector, stage, city, valueCr, owner, hot, notes } = req.body;
  if (!name || !sector || !stage || !city || !owner)
    return res.status(400).json({ error: 'name, sector, stage, city, owner are required' });
  const deal = await prisma.deal.create({
    data: { name, sector, stage, city, valueCr: valueCr || 0, owner, hot: !!hot, notes: notes || '' },
  });
  res.status(201).json(deal);
});

app.put('/api/deals/:id', async (req, res) => {
  const allowed = ['name','sector','stage','city','valueCr','owner','hot','notes'];
  const data = {};
  for (const k of allowed) if (req.body[k] !== undefined) data[k] = req.body[k];
  const deal = await prisma.deal.update({ where: { id: req.params.id }, data });
  res.json(deal);
});

app.delete('/api/deals/:id', async (req, res) => {
  await prisma.deal.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

// ── Issues ──────────────────────────────────────────────────────────────────
app.get('/api/issues', async (req, res) => {
  const where = {};
  if (req.query.status) where.status = req.query.status;
  const issues = await prisma.issue.findMany({
    where,
    include: { comments: { orderBy: { createdAt: 'asc' } } },
    orderBy: { opened: 'desc' },
  });
  res.json(issues);
});

app.get('/api/issues/:id', async (req, res) => {
  const issue = await prisma.issue.findUnique({
    where: { id: req.params.id },
    include: { comments: { orderBy: { createdAt: 'asc' } } },
  });
  if (!issue) return res.status(404).json({ error: 'Not found' });
  res.json(issue);
});

app.post('/api/issues', async (req, res) => {
  const { title, area, severity, owner } = req.body;
  if (!title || !area || !severity || !owner)
    return res.status(400).json({ error: 'title, area, severity, owner are required' });

  const count  = await prisma.issue.count();
  const nextId = `RIP-${2842 + count}`;
  const today  = new Date().toISOString().slice(0, 10);
  const issue  = await prisma.issue.create({
    data: { id: nextId, title, area, severity, owner, status: 'Open', opened: today },
    include: { comments: true },
  });
  res.status(201).json(issue);
});

app.put('/api/issues/:id', async (req, res) => {
  const allowed = ['title','area','severity','status','owner'];
  const data = {};
  for (const k of allowed) if (req.body[k] !== undefined) data[k] = req.body[k];
  const issue = await prisma.issue.update({
    where: { id: req.params.id },
    data,
    include: { comments: { orderBy: { createdAt: 'asc' } } },
  });
  res.json(issue);
});

app.post('/api/issues/:id/comments', async (req, res) => {
  const { author, body } = req.body;
  if (!body) return res.status(400).json({ error: 'body is required' });
  const comment = await prisma.issueComment.create({
    data: { issueId: req.params.id, author: author || 'Rajiv Kapur', body },
  });
  res.status(201).json(comment);
});

// ── Team ────────────────────────────────────────────────────────────────────
app.get('/api/team', async (_, res) => {
  const team = await prisma.teamMember.findMany({ orderBy: { name: 'asc' } });
  res.json(team);
});

app.post('/api/team', async (req, res) => {
  const { name, role, sector, city, util, dealsActive, gciYtdCr } = req.body;
  if (!name || !role || !sector || !city)
    return res.status(400).json({ error: 'name, role, sector, city are required' });

  const id = name.toLowerCase().replace(/\s+/g, '').slice(0, 4) + Date.now().toString(36);
  const member = await prisma.teamMember.create({
    data: { id, name, role, sector, city, util: util || 0, dealsActive: dealsActive || 0, gciYtdCr: gciYtdCr || 0 },
  });
  res.status(201).json(member);
});

app.put('/api/team/:id', async (req, res) => {
  const allowed = ['name','role','sector','city','util','dealsActive','gciYtdCr'];
  const data = {};
  for (const k of allowed) if (req.body[k] !== undefined) data[k] = req.body[k];
  const member = await prisma.teamMember.update({ where: { id: req.params.id }, data });
  res.json(member);
});

app.delete('/api/team/:id', async (req, res) => {
  await prisma.teamMember.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

// ── Land Parcels ─────────────────────────────────────────────────────────────
app.get('/api/land-parcels', async (_, res) => {
  const parcels = await prisma.landParcel.findMany({ orderBy: { createdAt: 'asc' } });
  res.json(parcels);
});

app.post('/api/land-parcels', async (req, res) => {
  const { city, area, acres, fsi, zoning, askCrPerAcre, roadFt, airportKm, railKm } = req.body;
  if (!city || !area || !acres || !zoning)
    return res.status(400).json({ error: 'city, area, acres, zoning are required' });

  const count = await prisma.landParcel.count();
  const id    = `L-${2409 + count}`;
  const parcel = await prisma.landParcel.create({
    data: { id, city, area, acres: +acres, fsi: fsi || 1.5, zoning,
            askCrPerAcre: askCrPerAcre || 0, roadFt: roadFt || 60,
            airportKm: airportKm || 0, railKm: railKm || 0 },
  });
  res.status(201).json(parcel);
});

app.put('/api/land-parcels/:id', async (req, res) => {
  const allowed = ['city','area','acres','fsi','zoning','askCrPerAcre','roadFt','airportKm','railKm','status','notes'];
  const data = {};
  for (const k of allowed) if (req.body[k] !== undefined) data[k] = req.body[k];
  const parcel = await prisma.landParcel.update({ where: { id: req.params.id }, data });
  res.json(parcel);
});

app.delete('/api/land-parcels/:id', async (req, res) => {
  await prisma.landParcel.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

// ── Notifications ────────────────────────────────────────────────────────────
app.get('/api/notifications', async (_, res) => {
  const notifs = await prisma.notification.findMany({ orderBy: { createdAt: 'desc' }, take: 20 });
  res.json(notifs);
});

app.post('/api/notifications', async (req, res) => {
  const { title, cat } = req.body;
  if (!title || !cat) return res.status(400).json({ error: 'title, cat required' });
  const notif = await prisma.notification.create({ data: { title, cat, time: 'just now' } });
  res.status(201).json(notif);
});

// ── Error handler ────────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => console.log(`✅ Reliant API running on http://localhost:${PORT}`));
