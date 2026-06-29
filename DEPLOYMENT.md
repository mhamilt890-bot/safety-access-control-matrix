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

Do not upload generated folders unless your host requires them. The `dist` folder is created by `npm run build`.

## Vercel Deployment Steps

1. Create a GitHub repository.
2. Upload the files listed above.
3. Go to Vercel and choose `Add New Project`.
4. Import the GitHub repository.
5. Use these settings:
   - Framework preset: `Other`
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: `dist`
6. Click `Deploy`.
7. Open the Vercel URL after deployment finishes.

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
3. Open Worker Matrix and confirm imported source audit records display without fabricated worker names.
4. Click Add Access Review Record, complete the Serious Event Intake form, and submit the record for review.
5. Confirm the submitted browser-entered record appears in Worker Matrix and Incident Records along with imported source records.
6. Refresh the browser and confirm the submitted browser-entered record persists.
7. Use Search and filters for contractor, project, utility customer, status, severity, incident type, and banned status.
8. Open Restricted / Banned List, Corrective Actions, Reports, and Settings / Roles.
9. Click CSV Export and confirm a `.csv` file downloads.
10. Open Reports and use PDF / Print Report to save a PDF through the browser print dialog.
11. Test Clear All Local Records under Settings / Roles and confirm it asks before clearing browser-entered records only.
12. Test the site on a phone-sized browser window and confirm navigation and tables remain usable.

## Storage Note

This version includes production seed records prepared from project source files, including the proposed findings, corrective action, field verification, contractor, and OSHA reference CSVs. Submitted browser-entered records are saved in the browser's `localStorage`, so they persist on refresh for that browser only. It is not connected to a shared multi-user database yet. Clear All Local Records removes only browser-entered localStorage records, not imported source audit records.
