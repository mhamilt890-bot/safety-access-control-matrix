# Safety Access Control Matrix Deployment

## Local Install

Install command:

```bash
npm install
```

Build command:

```bash
npm run build
```

Start command:

```bash
npm start
```

Verify command:

```bash
npm run verify
```

Local URL:

```text
http://localhost:4173
```

## Files To Upload To GitHub

Upload these project files and folders:

- `index.html`
- `styles.css`
- `app.js`
- `README.txt`
- `package.json`
- `build.js`
- `server.js`
- `verify.js`
- `vercel.json`
- `netlify.toml`
- `DEPLOYMENT.md`
- `README.md`
- `config.js`
- `supabase_schema.sql`

Do not upload generated folders unless your host requires them. The `dist` folder is created by `npm run build`.

## Vercel Deployment Steps

1. Create a GitHub repository.
2. Upload the files listed above.
3. Create a Supabase project.
4. Run `supabase_schema.sql` in the Supabase SQL Editor.
5. In Vercel, add these environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
6. Go to Vercel and choose `Add New Project`.
7. Import the GitHub repository.
8. Use these settings:
   - Framework preset: `Other`
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: `dist`
9. Click `Deploy`.
10. Open the Vercel URL after deployment finishes.

## Netlify Deployment Steps

1. Create a GitHub repository.
2. Upload the files listed above.
3. Go to Netlify and choose `Add new site`.
4. Import the GitHub repository.
5. Use these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click `Deploy`.
7. Open the Netlify URL after deployment finishes.

## How To Confirm The Deployed App Works

1. Open the deployed URL in Chrome or Microsoft Edge.
2. Confirm the Dashboard loads with KPI cards and charts.
3. Open Settings / Roles and sign in with a Supabase user.
4. Confirm the visible marker starts with `Supabase multi-user build:`.
5. Open Worker Matrix and confirm the blank empty-state message displays when the database has no records.
6. Click Add Worker, enter a record, and save it.
7. Click New Event, complete the Serious Event Intake form, and submit the record for review.
8. Confirm the submitted record appears in Worker Matrix and Incident Records.
9. Submit or edit a record with Restricted, Suspended, Banned From Site, or substantiated status and confirm it appears in Restricted / Banned List.
10. Refresh the browser and confirm saved records persist from Supabase.
11. Use Search and filters for contractor, project, utility customer, status, severity, incident type, and banned status.
12. Open Restricted / Banned List, Corrective Actions, Reports, and Settings / Roles.
13. Use Edit, Delete, Save, and Cancel on manually entered records.
14. Click CSV Export and confirm a `.csv` file downloads.
15. Import a CSV and confirm imported records persist to Supabase.
16. Open Reports and use PDF / Print Report to save a PDF through the browser print dialog.
17. Test Clear All Local Records under Settings / Roles and confirm it clears old browser prototype keys only.
18. Test the site on a phone-sized browser window and confirm navigation and tables remain usable.

## Storage Note

This version starts blank unless records already exist in Supabase. No fake, sample, mock, seed, Ward, OSHA, source-data, or CSV records are auto-loaded. Add/edit/delete/import actions save to Supabase. Clear All Local Records only removes old local browser prototype keys from the current device and does not delete shared database records.

## Architecture

- Frontend: current static `index.html`, `styles.css`, and `app.js`.
- Database/auth: Supabase Auth and Postgres with row level security.
- Hosting: Vercel static build output in `dist`.
- Configuration: `build.js` writes `dist/config.js` from Vercel environment variables.
- Audit trail: app write actions insert append-only rows into `audit_log`; no update/delete policy is created for that table.
