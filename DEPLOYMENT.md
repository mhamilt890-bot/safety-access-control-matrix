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
3. Open Worker Matrix and confirm worker rows display.
4. Use Search and filters for contractor, project, utility customer, status, severity, incident type, and banned status.
5. Click Add Mock Record and confirm a new worker record appears.
6. Open Incident Records, Restricted / Banned List, Corrective Actions, Reports, and Settings / Roles.
7. Click CSV Export and confirm a `.csv` file downloads.
8. Open Reports and use PDF / Print Report to save a PDF through the browser print dialog.
9. Test the site on a phone-sized browser window and confirm navigation and tables remain usable.

## Storage Note

The first version uses local mock data in `app.js`. The data layer is intentionally centralized so a later version can connect to Supabase, Firebase, PostgreSQL, Airtable, or a company database.
