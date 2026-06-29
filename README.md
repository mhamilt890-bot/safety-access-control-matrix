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

This version includes production seed records prepared from the project source files, including `proposed_findings_import_sif_reviewed.csv`, `proposed_corrective_action_import.csv`, `proposed_field_verification_import.csv`, `contractor_list.csv`, and `osha_reference_log.csv`. Browser-entered records from Submit for Review are saved in the browser's `localStorage`, so they persist on refresh for that browser only. It is not connected to a shared multi-user database yet.

The Settings / Roles button labeled Clear All Local Records clears only browser-entered localStorage records. It does not remove imported source audit records.
