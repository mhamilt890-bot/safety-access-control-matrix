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
- `supabase_schema_repair.sql`

Do not upload generated folders unless your host requires them. The `dist` folder is created by `npm run build`.

## Vercel Deployment Steps

1. Create a GitHub repository.
2. Upload the files listed above.
3. Create a Supabase project.
4. Run `supabase_schema_repair.sql` in the Supabase SQL Editor for the current live project. For a brand-new empty Supabase project, `supabase_schema.sql` also works.
5. In Vercel, add these environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `APP_ACCESS_CODE`
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
2. Confirm the app shows the Secure Access Required screen before any dashboard data is visible.
3. Enter the Vercel `APP_ACCESS_CODE`.
4. Sign in with Supabase Auth.
5. If the account is not approved, confirm it shows `Account pending approval.` and no dashboard data.
6. Approve the first admin in Supabase SQL Editor:
   `update public.profiles set role = 'admin', approved = true where email = 'mhamilt890@gmail.com';`
7. Sign in again and confirm the visible marker starts with `Shared data ownership security build:`.
8. Open Worker Matrix and confirm the blank empty-state message displays when the database has no records.
9. Click Add Worker, enter a record, and save it.
10. Click New Event, complete the Serious Event Intake form, and submit the record for review.
11. Confirm the submitted record appears in Worker Matrix and Incident Records.
12. Submit or edit a record with Restricted, Suspended, Banned From Site, or substantiated status and confirm it appears in Restricted / Banned List.
13. Refresh the browser and confirm saved records persist from Supabase.
14. Use Search and filters for contractor, project, utility customer, status, severity, incident type, and banned status.
15. Open Restricted / Banned List, Corrective Actions, Reports, and Settings / Roles.
16. Test admin `mhamilt890@gmail.com`: add/edit/delete/export and user management are available for all records.
17. Test a normal approved user: all shared records are visible, new records can be created, own records can be edited/deleted, other users' records cannot be edited/deleted.
18. Test export: approved users export the full shared database view.
19. Open Reports and use PDF / Print Report to save a PDF through the browser print dialog.
20. Test Logout and confirm the dashboard is hidden again.
21. Test Clear All Local Records under Settings / Roles and confirm it clears old browser prototype keys only.
22. Test the site on a phone-sized browser window and confirm navigation and tables remain usable.

## Storage Note

This version starts blank unless records already exist in Supabase. No fake, sample, mock, seed, Ward, OSHA, source-data, or CSV records are auto-loaded. Add/edit/delete/import actions save to Supabase. Clear All Local Records only removes old local browser prototype keys from the current device and does not delete shared database records.

## Architecture

- Frontend: current static `index.html`, `styles.css`, and `app.js`.
- Database/auth: Supabase Auth and Postgres with row level security.
- Hosting: Vercel static build output in `dist`.
- Configuration: `build.js` writes `dist/config.js` from Vercel environment variables.
- Audit trail: app write actions insert append-only rows into `audit_log`; no update/delete policy is created for that table.
- Access gate: `/api/verify-access-code` checks `APP_ACCESS_CODE` on the Vercel server before Supabase login appears.
- Account gate: Supabase Auth plus `public.profiles.role` and `public.profiles.approved` controls dashboard access.
- Ownership: all approved users read shared records; record creators can edit/delete their own records; `mhamilt890@gmail.com` with role `admin` can edit/delete all records.
