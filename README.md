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

This version starts with no worker, incident, restricted/banned, corrective action, report, or audit records. Records entered through New Event or the Add buttons are saved in the browser's `localStorage`, so they persist on refresh for that browser only. It is not connected to a shared multi-user database yet.

The Settings / Roles button labeled Clear All Local Records clears user-entered localStorage records and returns the app to blank empty-state views.
