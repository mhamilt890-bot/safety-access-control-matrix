# Safety Access Control Matrix

Safety Access Control Matrix is a Supabase-backed safety access governance platform for tracking contractor and worker access reviews, serious event intake, incident records, restricted or banned-from-site status, corrective actions, reports, audit activity, and role-ready permissions.

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

## Production Data Storage

This version starts with no worker, incident, restricted/banned, corrective action, report, or audit records unless those records already exist in the connected Supabase database. The app does not load fake, sample, mock, seed, source-data, audit-import, Ward, OSHA, or CSV records by default.

Records entered through New Event, Add Worker, Add Incident, Add Restricted/Banned Record, Add Corrective Action, Add Report Record, edit, delete, and CSV import persist to Supabase. Dashboard counts, charts, filters, Worker Matrix, Incident Records, Restricted/Banned List, Corrective Actions, Reports, and Settings/Roles render from the shared database.

Clear All Local Records only removes old browser prototype storage keys from the current device. It does not delete shared database records.

## Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. For a new project, run `supabase_schema.sql`. For the current live project or any partially created Supabase schema, run `supabase_schema_repair.sql`.
4. In Supabase Authentication, create company users or allow email signup.
5. In Vercel, add these environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `APP_ACCESS_CODE`
6. Deploy through Vercel with output directory `dist`.

## Database Tables

- `access_records`: main worker/access review records used by Worker Matrix and dashboard counts.
- `incidents`: event/incident mirror records created from saved access review records.
- `restricted_banned_records`: automatic restricted/banned mirror records based on access, banned, suspended, removed-from-site, or substantiated status.
- `corrective_actions`: automatic corrective-action mirror records when action or open corrective status exists.
- `report_records`: manually maintained report records.
- `profiles`: authenticated user profile records.
- `app_roles`: editable app role/permission records.
- `audit_log`: append-only create/edit/delete activity log.

## Live Schema Repair

If Supabase reports a missing column such as `incidents.access_record_id`, run `supabase_schema_repair.sql` one time in the Supabase SQL Editor. It repairs existing tables with `alter table ... add column if not exists`, keeps text IDs for app-generated record IDs, adds `data jsonb` for flexible form fields, and preserves existing records where possible.

## Version Marker

Open Settings / Roles and confirm the visible marker starts with `Passcode access gate build:`.

## Access Gate

The live dashboard is hidden behind a simple passcode screen. Set the passcode in Vercel as `APP_ACCESS_CODE`. The passcode is checked by the Vercel serverless route `/api/verify-access-code`; it is not written into `config.js`.
