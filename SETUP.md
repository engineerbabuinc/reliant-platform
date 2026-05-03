# Reliant Intelligence Platform — Local Setup

## Prerequisites
- Node.js 18+

## Frontend (already on Netlify)
The frontend auto-deploys from GitHub. No local setup needed to view the app.

## Backend (run locally for real data)

```bash
cd server
npm install
npm run db:migrate    # creates SQLite database
npm run db:seed       # loads all sample data
npm run dev           # starts API on http://localhost:3001
```

The frontend at `http://localhost:5173` connects to the API automatically.

To also run the frontend locally:
```bash
# in a second terminal, from the repo root:
npm install
npm run dev
```

## What's in the database

| Table | Records |
|-------|---------|
| Deals | 10 (6 hot, 4 regular) |
| Pipeline stages | 6 (Identified → Closed FY26) |
| Issues | 10 (mix of open/in-review/resolved) |
| Team members | 15 (across sectors and cities) |
| Land parcels | 8 (across cities) |
| Notifications | 5 |

## Re-seed / reset

```bash
cd server
npm run db:reset    # drops and recreates database, runs seed
```

## API base URL

- Local: `http://localhost:3001`
- Production: set `VITE_API_URL` in Netlify environment variables
