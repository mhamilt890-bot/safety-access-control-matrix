Project name: Safety Access Control Matrix

Simple local opening instructions:
- Run npm install
- Run npm run build
- Run npm start
- Open http://localhost:4173 in Chrome or Microsoft Edge

Short description:
This web app is intended to help track contractor/worker safety access concerns, serious event intake, investigation review, restricted access status, reinstatement review, notifications, audit log, and admin permissions.

Storage note:
This version starts with no worker, incident, restricted/banned, corrective action, report, or audit records unless records already exist in Supabase. Records entered through New Event, Add buttons, edit, delete, or CSV import save to the shared Supabase database. Clear All Local Records removes old browser prototype keys from the current device only and does not delete shared database records.

Setup note:
Run supabase_schema_repair.sql in Supabase for the current live project, then set SUPABASE_URL, SUPABASE_ANON_KEY, and APP_ACCESS_CODE in Vercel before deployment. For a brand-new empty Supabase project, supabase_schema.sql also works. The dashboard stays hidden until the APP_ACCESS_CODE passcode is entered.
