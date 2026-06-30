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
3. Open Worker Matrix and confirm the blank empty-state message displays.
4. Click Add Worker, enter a record, and save it.
5. Click New Event, complete the Serious Event Intake form, and submit the record for review.
6. Confirm the submitted record appears in Worker Matrix and Incident Records.
7. Submit or edit a record with Restricted, Suspended, Banned From Site, or substantiated status and confirm it appears in Restricted / Banned List.
8. Refresh the browser and confirm saved records persist.
9. Use Search and filters for contractor, project, utility customer, status, severity, incident type, and banned status.
10. Open Restricted / Banned List, Corrective Actions, Reports, and Settings / Roles.
11. Use Edit, Delete, Save, and Cancel on manually entered records.
12. Click CSV Export and confirm a `.csv` file downloads.
13. Open Reports and use PDF / Print Report to save a PDF through the browser print dialog.
14. Test Clear All Local Records under Settings / Roles and confirm it asks before clearing all local records.
15. Test the site on a phone-sized browser window and confirm navigation and tables remain usable.

## Storage Note

This version starts with no worker, incident, restricted/banned, corrective action, report, or audit records. User-entered records are saved in the browser's `localStorage`, so they persist on refresh for that browser only. It is not connected to a shared multi-user database yet. Clear All Local Records returns the app to blank empty-state views.
