# Safety Access Control Matrix

Safety Access Control Matrix is a browser-based prototype for tracking contractor and worker safety access concerns, serious incident intake, investigation review, restricted or banned-from-site status, corrective actions, reports, audit activity, and role-ready permissions.

## Run Locally

```bash
npm install
npm run build
npm start
```

Open:

```text
http://localhost:4173
```

## Verify

```bash
npm run verify
```

## Deploy

Use the exact Vercel and Netlify deployment steps in `DEPLOYMENT.md`.

## Data Storage

This first version uses local mock data in `app.js`. The code is organized so a later version can connect to Supabase, Firebase, PostgreSQL, Airtable, or a company database.
