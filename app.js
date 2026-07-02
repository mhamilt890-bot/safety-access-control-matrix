const eventCategories = [
  "Electrical Contact",
  "Arc Flash / Arc Blast Potential",
  "Backfeed Exposure",
  "Missed Cutout / Incomplete Isolation",
  "Padmount Elbow Flash",
  "Dropped Conductor / Conductor Control",
  "Equipment Contact with Overhead Lines",
  "Excavation Utility Conflict",
  "Hydrovac Utility Damage",
  "Directional Bore Strike",
  "Potholing / Daylighting Miss",
  "Locate Mismatch / Marking Conflict",
  "Unknown Facility Encounter",
  "Rigging Failure / Suspended Load",
  "Helicopter Load Control",
  "Substation Access Boundary",
  "Traffic Control Exposure",
  "Stop Work / Good Catch",
  "Generation Plant Electrical Event",
  "Generator / Turbine Protection Event",
  "Battery Energy Storage Exposure",
  "Relay / Protection Misoperation",
  "Control Room / Dispatch Communication Event",
  "Energized Work / Minimum Approach Distance",
  "Switching / Clearance / Isolation",
  "Lockout Tagout",
  "Fall Protection",
  "Excavation / Trenching",
  "Confined Space",
  "Vehicle / Equipment Operation",
  "Suspended Load / Crane Zone",
  "Substance / Impairment Concern",
  "Violence / Threat",
  "Falsification of Safety Documentation",
  "Repeat Unsafe Conduct",
  "Other"
];

const workTypes = [
  "Overhead Distribution",
  "Underground Distribution",
  "Transmission Line",
  "Substation",
  "Energized Work / MAD Exposure",
  "Switching / Clearance / Isolation",
  "Grounding / EPZ",
  "Transformer / Padmount / Elbow Work",
  "Pole Setting / Framing",
  "Reconductoring / Stringing",
  "Excavation / Civil",
  "Hydrovac / Vacuum Excavation",
  "Directional Boring",
  "Potholing / Daylighting",
  "Trenching / Open Cut",
  "Crane / Rigging / Hoisting",
  "Helicopter / External Load",
  "Traffic Control",
  "Storm / Emergency Response",
  "Power Generation - Gas / Thermal",
  "Power Generation - Hydro",
  "Power Generation - Solar / BESS",
  "Generation Switchyard",
  "Relay / Protection / SCADA",
  "Control Room / Dispatch Operations"
];

const operatingDomains = [
  "Transmission",
  "Distribution",
  "Substation",
  "Underground",
  "Power Generation",
  "Civil / Excavation",
  "Helicopter / Aviation",
  "System Operations",
  "Contractor Access Control"
];

const programRiskTiers = ["Routine", "Elevated", "High Risk", "Critical Control Required", "Executive Review"];

const damagePreventionMethods = [
  "Hydrovac",
  "Directional Bore",
  "Open Cut",
  "Potholing / Daylighting",
  "Trenching",
  "Plowing",
  "Auger",
  "Hand Dig",
  "Vacuum Excavation Support",
  "No Strike / Near Miss"
];

const facilityTypes = [
  "Electric Primary",
  "Electric Secondary",
  "Gas",
  "Fiber",
  "Water",
  "Sewer",
  "Communication",
  "Streetlight / Traffic",
  "Unknown Facility",
  "No Damage / Good Catch"
];

const locateStatuses = ["Valid", "Expired", "Missing", "Incorrect", "Conflicting", "Not Required", "Needs Review"];
const strikeSeverities = ["No Damage / Good Catch", "Coating Damage", "Service Line Damage", "Primary Electric Strike", "Gas Release", "Public Impact", "Major Outage", "Regulatory Reportable"];
const ownerNotificationStatuses = ["Notified", "Acknowledged", "Field Rep Dispatched", "Damage Assessment Complete", "Claim / Recovery Pending", "Closed", "Not Required"];

const contractorNames = [
  "Summit Line Services",
  "High Desert Utility Contractors",
  "Ironridge Electric",
  "NorthPeak Civil & Power",
  "Mesa Valley Underground",
  "BlueRiver Transmission Services",
  "Western Grid Constructors",
  "RedRock Substation Services"
];

const criticalControlsLibrary = [
  ["Overhead Distribution", "Job briefing / tailboard verification", "Crew confirms scope, energy sources, roles, MAD, and stop-work triggers."],
  ["Energized Work / MAD Exposure", "Minimum approach distance", "Qualified observer verifies phase-to-ground and phase-to-phase approach limits."],
  ["Switching / Clearance / Isolation", "Switching order / clearance verification", "Switching authority, hold points, clearance limits, and device positions are verified."],
  ["Grounding / EPZ", "Grounding and bonding / EPZ", "EPZ plan confirms tested absence of voltage, approved grounding locations, and equipotential bonding."],
  ["Transformer / Padmount / Elbow Work", "Cutout / fuse / source-load verification", "Crew verifies source/load orientation, backfeed exposure, and elbow condition before switching."],
  ["Underground Distribution", "Backfeed identification", "All alternate feeds, customer generation, and induced energy paths are checked before touch."],
  ["Substation", "Substation access and arc-flash boundaries", "Access authorization, arc-flash PPE, barriers, and energized boundary controls are documented."],
  ["Excavation / Civil", "Excavation utility locate", "Locate ticket, potholing, spotter, and tolerance-zone controls are confirmed before digging."],
  ["Hydrovac / Vacuum Excavation", "Daylighting and facility exposure verification", "Vacuum pressure, spoil control, facility support, and positive visual verification are documented."],
  ["Directional Boring", "Bore path and tolerance-zone verification", "Locate ticket, bore plan, potholing, depth checks, steering log, and spotter controls are verified."],
  ["Potholing / Daylighting", "Positive facility identification", "Facility type, depth, alignment, owner, and clearance from planned work path are verified before production work."],
  ["Trenching / Open Cut", "Excavation protection and utility crossing control", "Locate quality, competent person, protective systems, crossing exposure, and emergency plan are confirmed."],
  ["Crane / Rigging / Hoisting", "Rigging inspection", "Rigging, lift plan, exclusion zone, and qualified signal/spotter roles are verified."],
  ["Helicopter / External Load", "Helicopter exclusion zone / communication plan", "Landing zone, external-load route, radio plan, and ground exclusion controls are in place."],
  ["Traffic Control", "Traffic control setup", "MUTCD-aligned setup, public protection, and spotter exposure controls are verified."],
  ["Storm / Emergency Response", "Qualified worker verification", "Rapid-response crews are matched to task qualification, fatigue limits, and switching authority."],
  ["Power Generation - Gas / Thermal", "Stored energy and pressure-system isolation", "LOTO, bleed-down, permissives, and rotating-equipment boundaries are verified before work."],
  ["Power Generation - Hydro", "Water conveyance and mechanical isolation", "Gate position, hydraulic energy, confined access, and rescue controls are verified."],
  ["Power Generation - Solar / BESS", "DC arc-flash and battery thermal-runaway controls", "DC isolation, fire response, ventilation, and battery monitoring controls are confirmed."],
  ["Generation Switchyard", "Switchyard clearance and grounding", "Clearance limits, induced voltage, step-touch controls, and switching communication are verified."],
  ["Relay / Protection / SCADA", "Protection scheme and control-point verification", "Test blocks, trip paths, communications, and control authority are confirmed before changes."],
  ["Control Room / Dispatch Operations", "Three-part communication and hold-point control", "Switching authority, read-back, clearance boundaries, and abnormal-condition escalation are documented."]
];

const utilityProgramDomains = [
  ["Transmission", "Line construction, reconductoring, structures, helicopters, induced voltage, and clearance work."],
  ["Distribution", "Overhead, underground, transformers, switching, storm response, and contractor access decisions."],
  ["Substation", "Switchyards, control houses, relay work, arc-flash boundaries, and energized yard controls."],
  ["Power Generation", "Gas, thermal, hydro, solar, BESS, switchyards, controls, stored energy, and plant LOTO."],
  ["Civil / Excavation", "Foundations, trenching, traffic control, utility locates, public protection, and equipment separation."],
  ["System Operations", "Dispatch, switching, clearance administration, control room communication, and grid-event response."]
];

const storageKey = "safetyAccessControlMatrixLocalData";
const demoStorageKey = "safetyAccessControlMatrixDemoMode";
const oldStorageKeys = ["safetyAccessProductionRecords", "safetyAccessSubmittedRecords", storageKey];
const buildMarker = "Shared data ownership security build: 2026-07-01 00:00:00 -06:00";
const accessSessionKey = "safetyAccessGateUnlocked";
const config = window.SAFETY_ACCESS_CONFIG || {};
const evidenceBucketName = config.evidenceBucketName || "safety-evidence";

const blankState = {
  records: [],
  reportRecords: [],
  roles: [],
  profiles: []
};

let state = JSON.parse(JSON.stringify(blankState));
let editing = null;
let db = null;
let dbReady = false;
let currentUser = null;
let currentUserRole = "";
let normalizedUserRole = "";
let appStarted = false;
let authListenerAttached = false;
const adminEmail = "mhamilt890@gmail.com";
let profileDebug = {};

function isAccessUnlocked() {
  return sessionStorage.getItem(accessSessionKey) === "true";
}

function setAccessUnlocked(value) {
  if (value) sessionStorage.setItem(accessSessionKey, "true");
  else sessionStorage.removeItem(accessSessionKey);
}

function showAccessGate(message = "") {
  document.body.classList.add("access-locked");
  document.body.classList.add("auth-locked");
  document.getElementById("appShell")?.setAttribute("aria-hidden", "true");
  const gate = document.getElementById("accessGate");
  gate?.removeAttribute("aria-hidden");
  document.getElementById("authGate")?.setAttribute("aria-hidden", "true");
  const messageElement = document.getElementById("accessGateMessage");
  if (messageElement) messageElement.textContent = message;
}

function showAuthGate(message = "") {
  document.body.classList.remove("access-locked");
  document.body.classList.add("auth-locked");
  document.getElementById("appShell")?.setAttribute("aria-hidden", "true");
  document.getElementById("accessGate")?.setAttribute("aria-hidden", "true");
  document.getElementById("authGate")?.removeAttribute("aria-hidden");
  renderAuthGate(message);
}

function renderAuthGate(message = "") {
  const content = document.getElementById("authGateContent");
  if (!content) return;
  const pending = currentUser && !hasApprovedRole();
  content.innerHTML = `<div class="brand access-brand">
    <div class="brand-mark">SA</div>
    <div><strong>Safety Access</strong><span>Control Matrix</span></div>
  </div>
  <h1 id="authGateTitle">${pending ? "Account Pending Approval" : "Account Login Required"}</h1>
  <p>${pending ? "Account pending approval. An admin must approve your account and assign a role before dashboard data is visible." : "Sign in with an approved company account before dashboard data is visible."}</p>
  ${pending ? `<p class="meta">${escapeHtml(currentUser.email || "")}</p>${profileDebugLine()}<button class="ghost-btn" id="authGateLogoutBtn" type="button">Logout</button>` : `<form id="authGateForm">
    <label>Email<input id="authGateEmail" type="email" autocomplete="email" required /></label>
    <label>Password<input id="authGatePassword" type="password" autocomplete="current-password" required /></label>
    <button class="primary-btn" type="submit">Sign In</button>
    <button class="ghost-btn" id="createAccountBtn" type="button">Create Account</button>
    <p class="access-note">New accounts require administrator approval before access is granted.</p>
  </form>`}
  <div class="access-error" id="authGateMessage" role="alert">${escapeHtml(message)}</div>`;
  document.getElementById("authGateForm")?.addEventListener("submit", signIn);
  document.getElementById("createAccountBtn")?.addEventListener("click", createAccount);
  document.getElementById("authGateLogoutBtn")?.addEventListener("click", logoutAccessGate);
}

function profileDebugLine() {
  const fields = [
    ["auth user id", profileDebug.authUserId],
    ["auth email", profileDebug.authEmail],
    ["profile id", profileDebug.profileId],
    ["profile email", profileDebug.profileEmail],
    ["profile role", profileDebug.profileRole],
    ["profile approved", profileDebug.profileApproved]
  ];
  return `<div class="profile-debug">${fields.map(([label, value]) => `<div><strong>${label}:</strong> ${escapeHtml(value ?? "not found")}</div>`).join("")}</div>`;
}

async function evaluateAccess() {
  await initDatabase();
  if (!dbReady) {
    showAuthGate("Supabase login is not configured. Dashboard data is locked.");
    return;
  }
  if (!currentUser || !hasApprovedRole()) {
    showAuthGate(currentUser ? "Account pending approval." : "");
    return;
  }
  await unlockApp();
}

async function unlockApp() {
  if (!hasApprovedRole()) {
    showAuthGate(currentUser ? "Account pending approval." : "");
    return;
  }
  document.body.classList.remove("access-locked");
  document.body.classList.remove("auth-locked");
  document.getElementById("appShell")?.setAttribute("aria-hidden", "false");
  document.getElementById("accessGate")?.setAttribute("aria-hidden", "true");
  document.getElementById("authGate")?.setAttribute("aria-hidden", "true");
  if (!appStarted) {
    appStarted = true;
    await init();
  } else {
    await loadRemoteState();
    renderAll();
  }
}

async function verifyAccessCode(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const input = document.getElementById("appAccessCodeInput");
  const message = document.getElementById("accessGateMessage");
  const button = form.querySelector('button[type="submit"]');
  const code = input.value;
  message.textContent = "";
  button.disabled = true;

  try {
    const result = await fetch("/api/verify-access-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    const payload = await result.json().catch(() => ({}));
    if (!result.ok || !payload.ok) {
      message.textContent = payload.message || "Incorrect access code.";
      return;
    }
    setAccessUnlocked(true);
    input.value = "";
    await evaluateAccess();
  } catch (_error) {
    message.textContent = "Unable to verify access code. Check the deployment setup.";
  } finally {
    button.disabled = false;
  }
}

function logoutAccessGate() {
  setAccessUnlocked(false);
  db?.auth?.signOut();
  state = JSON.parse(JSON.stringify(blankState));
  showAccessGate("Logged out.");
}

async function initDatabase() {
  if (dbReady) return;
  if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase) return;
  db = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  dbReady = true;
  const { data } = await db.auth.getSession();
  currentUser = data.session?.user || null;
  await loadCurrentUserRole();
  if (authListenerAttached) return;
  authListenerAttached = true;
  db.auth.onAuthStateChange(async (_event, session) => {
    currentUser = session?.user || null;
    await loadCurrentUserRole();
    if (isAccessUnlocked() && hasApprovedRole()) {
      await unlockApp();
    } else if (isAccessUnlocked()) {
      showAuthGate(currentUser ? "Account pending approval." : "");
    }
  });
}

function normalizeRole(role) {
  const value = String(role || "").trim().toLowerCase();
  if (["admin", "system admin", "safety admin"].includes(value)) return "admin";
  if (["reviewer", "safety reviewer", "safety manager", "editor"].includes(value)) return "reviewer";
  if (["viewer", "read only", "read-only"].includes(value)) return "viewer";
  if (["user", "approved"].includes(value)) return "approved";
  return "";
}

function hasApprovedRole() {
  return Boolean(currentUser && (isAdmin() || ["admin", "reviewer", "viewer", "approved"].includes(normalizedUserRole)));
}

function canView() {
  return hasApprovedRole();
}

function canWrite() {
  return hasApprovedRole();
}

function isAdmin() {
  return String(currentUser?.email || "").toLowerCase() === adminEmail && normalizedUserRole === "admin";
}

function canManageUsers() {
  return isAdmin();
}

function canExport() {
  return hasApprovedRole();
}

function ownsRecord(record) {
  if (!record || !currentUser) return false;
  return record.createdBy === currentUser.id ||
    String(record.createdByEmail || "").toLowerCase() === String(currentUser.email || "").toLowerCase();
}

function canEditRecord(record) {
  return isAdmin() || ownsRecord(record);
}

function canDeleteRecord(record) {
  return isAdmin() || ownsRecord(record);
}

async function loadCurrentUserRole() {
  currentUserRole = "";
  normalizedUserRole = "";
  profileDebug = {
    authUserId: currentUser?.id || "",
    authEmail: currentUser?.email || "",
    profileId: "",
    profileEmail: "",
    profileRole: "",
    profileApproved: ""
  };
  if (!dbReady || !currentUser) return;

  const authEmail = String(currentUser.email || "").trim().toLowerCase();
  let profile = null;
  const rpcResult = await db.rpc("get_my_profile");
  if (!rpcResult.error && Array.isArray(rpcResult.data) && rpcResult.data[0]) {
    profile = rpcResult.data[0];
  }

  if (!profile) {
    const byId = await db.from("profiles").select("id, email, role, approved").eq("id", currentUser.id).maybeSingle();
    if (!byId.error && byId.data) {
      profile = byId.data;
    } else if (authEmail) {
      const byEmail = await db.from("profiles").select("id, email, role, approved").ilike("email", authEmail).maybeSingle();
      if (!byEmail.error && byEmail.data) profile = byEmail.data;
    }
  }

  profileDebug = {
    authUserId: currentUser.id || "",
    authEmail: currentUser.email || "",
    profileId: profile?.id || "",
    profileEmail: profile?.email || "",
    profileRole: profile?.role || "",
    profileApproved: profile ? String(profile.approved === true) : ""
  };

  const approved = profile?.approved === true;
  if (!approved) return profile;
  if (profile?.role) {
    currentUserRole = profile.role;
    normalizedUserRole = normalizeRole(currentUserRole) || "approved";
  } else {
    currentUserRole = "approved";
    normalizedUserRole = "approved";
  }
  return profile;
}

async function loadRemoteState() {
  state = JSON.parse(JSON.stringify(blankState));
  if (!dbReady || !canView()) return;
  const [recordsResult, reportsResult, rolesResult] = await Promise.all([
    db.from("access_records").select("*").order("created_at", { ascending: false }),
    db.from("report_records").select("*").order("created_at", { ascending: false }),
    db.from("app_roles").select("*").order("created_at", { ascending: false })
  ]);

  if (recordsResult.error) console.warn("Unable to load access records.", recordsResult.error);
  if (reportsResult.error) console.warn("Unable to load report records.", reportsResult.error);
  if (rolesResult.error) console.warn("Unable to load roles.", rolesResult.error);

  state.records = (recordsResult.data || []).map(rowToRecord);
  state.reportRecords = (reportsResult.data || []).map(rowToReport);
  state.roles = (rolesResult.data || []).map(rowToRole);
  applyDemoState();
  if (isAdmin()) await loadProfiles();
}

async function loadProfiles() {
  if (!dbReady || !isAdmin()) {
    state.profiles = [];
    return;
  }
  const { data, error } = await db.from("profiles").select("id, email, role, approved, created_at, updated_at").order("approved", { ascending: true }).order("created_at", { ascending: false });
  if (error) {
    console.warn("Unable to load user approvals.", error);
    state.profiles = [];
    return;
  }
  state.profiles = data || [];
}

function recordToRow(record) {
  return {
    id: record.id,
    name: record.name,
    source: record.source,
    contractor: record.contractor,
    prior_contractor: record.priorContractor,
    project: record.project,
    prior_project: record.priorProject,
    event_date: record.date || null,
    event_type: record.type,
    severity: record.severity,
    sif: record.sif,
    investigation: record.investigation,
    evidence: record.evidence,
    access_status: record.access,
    restriction_scope: record.scope,
    corrective_action: record.action,
    review_date: record.reinstatement || null,
    authority: record.authority,
    updated_label: record.updated,
    repeat_event: Boolean(record.repeat),
    utility: record.utility,
    job_class: record.jobClass,
    banned: record.banned,
    disposition: record.disposition,
    notes: record.notes,
    stop_work: record.stopWork,
    removed_from_site: record.removedFromSite,
    utility_restriction: record.utilityRestriction,
    rca: record.rca,
    corrective_status: record.correctiveStatus,
    redispatch_concern: record.reDispatchConcern,
    management_review: record.managementReview,
    created_by: record.createdBy || currentUser?.id || null,
    created_by_email: record.createdByEmail || currentUser?.email || null,
    data: record
  };
}

function rowToRecord(row) {
  return blankRecord({
    ...(row.data || {}),
    id: row.id,
    name: row.name,
    source: row.source,
    contractor: row.contractor,
    priorContractor: row.prior_contractor,
    project: row.project,
    priorProject: row.prior_project,
    date: row.event_date || "",
    type: row.event_type,
    severity: row.severity,
    sif: row.sif,
    investigation: row.investigation,
    evidence: row.evidence,
    access: row.access_status,
    scope: row.restriction_scope,
    action: row.corrective_action,
    reinstatement: row.review_date || "",
    authority: row.authority,
    updated: row.updated_label,
    repeat: row.repeat_event,
    utility: row.utility,
    jobClass: row.job_class,
    banned: row.banned,
    disposition: row.disposition,
    notes: row.notes,
    stopWork: row.stop_work,
    removedFromSite: row.removed_from_site,
    utilityRestriction: row.utility_restriction,
    rca: row.rca,
    correctiveStatus: row.corrective_status,
    reDispatchConcern: row.redispatch_concern,
    managementReview: row.management_review,
    createdBy: row.created_by || row.data?.createdBy || "",
    createdByEmail: row.created_by_email || row.data?.createdByEmail || "",
    evidenceAttachments: row.data?.evidenceAttachments || []
  });
}

function reportToRow(report) {
  return { id: report.id, title: report.title, report_date: report.date || null, owner: report.owner, notes: report.notes, created_by: report.createdBy || currentUser?.id || null, created_by_email: report.createdByEmail || currentUser?.email || null, data: report };
}

function rowToReport(row) {
  return { ...(row.data || {}), id: row.id, title: row.title || row.data?.title || "", date: row.report_date || row.data?.date || "", owner: row.owner || row.data?.owner || "", notes: row.notes || row.data?.notes || "", createdBy: row.created_by || row.data?.createdBy || "", createdByEmail: row.created_by_email || row.data?.createdByEmail || "" };
}

function roleToRow(role) {
  return { id: role.id, role: role.role, permissions: role.permissions, audit: role.audit, created_by: role.createdBy || currentUser?.id || null, created_by_email: role.createdByEmail || currentUser?.email || null, data: role };
}

function rowToRole(row) {
  return { ...(row.data || {}), id: row.id, role: row.role || row.data?.role || "", permissions: row.permissions || row.data?.permissions || "", audit: row.audit || row.data?.audit || "Yes" };
}

async function signIn(event) {
  event?.preventDefault();
  if (!dbReady || !db) return alert("Supabase login is not configured.");
  const email = (document.getElementById("authGateEmail")?.value || document.getElementById("authEmail")?.value || "").trim();
  const password = document.getElementById("authGatePassword")?.value || document.getElementById("authPassword")?.value;
  const message = document.getElementById("authGateMessage");
  const button = event?.currentTarget?.querySelector?.('button[type="submit"]');
  if (!email || !password) return alert("Enter an email and password.");

  if (message) message.textContent = "";
  if (button) button.disabled = true;

  try {
    const { error } = await db.auth.signInWithPassword({ email, password });
    if (error) {
      const text = String(error.message || "").toLowerCase().includes("invalid login credentials")
        ? "Invalid email or password."
        : error.message;
      if (message) message.textContent = text;
      else alert(text);
      return;
    }

    const { data } = await db.auth.getSession();
    currentUser = data.session?.user || null;
    const profile = await loadCurrentUserRole();
    if (!profile?.approved) {
      await db.auth.signOut();
      currentUser = null;
      currentUserRole = "";
      normalizedUserRole = "";
      state = JSON.parse(JSON.stringify(blankState));
      showAuthGate("Your account exists but has not been approved by an administrator.");
      return;
    }

    await evaluateAccess();
  } finally {
    if (button) button.disabled = false;
  }
}

async function createAccount(event) {
  event?.preventDefault();
  if (!dbReady || !db) return alert("Supabase login is not configured.");
  const email = (document.getElementById("authGateEmail")?.value || "").trim();
  const password = document.getElementById("authGatePassword")?.value || "";
  const message = document.getElementById("authGateMessage");
  const button = document.getElementById("createAccountBtn");
  if (!email || !password) return alert("Enter an email and password before creating an account.");
  if (password.length < 6) return alert("Password must be at least 6 characters.");
  button.disabled = true;
  if (message) message.textContent = "";

  try {
    const { data, error } = await db.auth.signUp({ email, password });
    if (error) {
      const text = String(error.message || "").toLowerCase().includes("rate limit")
        ? "Account request could not be created because the email service is temporarily rate limited. Contact an administrator."
        : error.message;
      if (message) message.textContent = text;
      return;
    }
    currentUser = data.user || null;
    currentUserRole = "";
    normalizedUserRole = "";
    state = JSON.parse(JSON.stringify(blankState));
    showAuthGate("Account pending approval. An administrator must approve your account before dashboard data is visible.");
  } finally {
    button.disabled = false;
  }
}

async function signOut() {
  const { error } = await db.auth.signOut();
  if (error) alert(error.message);
  currentUser = null;
  currentUserRole = "";
  normalizedUserRole = "";
  state = JSON.parse(JSON.stringify(blankState));
  showAuthGate("Signed out.");
}

async function saveAccessRecord(record) {
  if (!canWrite()) {
    alert("Please sign in with an authorized role before saving records.");
    return false;
  }
  record.createdBy = record.createdBy || currentUser?.id || "";
  record.createdByEmail = record.createdByEmail || currentUser?.email || "";
  if (dbReady) {
    const { error } = await db.from("access_records").upsert(recordToRow(record));
    if (error) throw error;
    await syncDerivedRecords(record);
    await writeAudit("upsert", "access_records", record.id, record);
  }
  return true;
}

async function syncDerivedRecords(record) {
  const incidentRow = {
    id: record.id,
    access_record_id: record.id,
    event_date: record.date || null,
    event_type: record.type,
    severity: record.severity,
    sif: record.sif,
    investigation: record.investigation,
    notes: record.notes,
    created_by: record.createdBy || currentUser?.id || null,
    created_by_email: record.createdByEmail || currentUser?.email || null,
    data: record
  };
  const { error: incidentError } = await db.from("incidents").upsert(incidentRow);
  if (incidentError) throw incidentError;

  if (isRestrictedRecord(record)) {
    const restrictedRow = {
      id: record.id,
      access_record_id: record.id,
      worker_name: record.name,
      contractor: record.contractor,
      access_status: record.access,
      banned: record.banned,
      restriction_scope: record.scope,
      disposition: record.disposition,
      review_date: record.reinstatement || null,
      created_by: record.createdBy || currentUser?.id || null,
      created_by_email: record.createdByEmail || currentUser?.email || null,
      data: record
    };
    const { error } = await db.from("restricted_banned_records").upsert(restrictedRow);
    if (error) throw error;
  } else {
    const { error } = await db.from("restricted_banned_records").delete().eq("id", record.id);
    if (error) throw error;
  }

  if (record.action || record.correctiveStatus === "Open" || record.access === "Monitor") {
    const actionRow = {
      id: record.id,
      access_record_id: record.id,
      action: record.action,
      owner: record.authority,
      status: record.correctiveStatus,
      review_date: record.reinstatement || null,
      evidence: record.evidence,
      created_by: record.createdBy || currentUser?.id || null,
      created_by_email: record.createdByEmail || currentUser?.email || null,
      data: record
    };
    const { error } = await db.from("corrective_actions").upsert(actionRow);
    if (error) throw error;
  } else {
    const { error } = await db.from("corrective_actions").delete().eq("id", record.id);
    if (error) throw error;
  }
}

async function saveReportRecord(report) {
  if (!canWrite()) {
    alert("Please sign in with an authorized role before saving report records.");
    return false;
  }
  report.createdBy = report.createdBy || currentUser?.id || "";
  report.createdByEmail = report.createdByEmail || currentUser?.email || "";
  if (dbReady) {
    const { error } = await db.from("report_records").upsert(reportToRow(report));
    if (error) throw error;
    await writeAudit("upsert", "report_records", report.id, report);
  }
  return true;
}

async function saveRoleRecord(role) {
  if (!canManageUsers()) {
    alert("Please sign in with an authorized role before saving roles.");
    return false;
  }
  if (dbReady) {
    const { error } = await db.from("app_roles").upsert(roleToRow(role));
    if (error) throw error;
    await writeAudit("upsert", "app_roles", role.id, role);
  }
  return true;
}

async function deleteRemoteRecord(table, id) {
  if (dbReady) {
    const { error } = await db.from(table).delete().eq("id", id);
    if (error) throw error;
    await writeAudit("delete", table, id, {});
  }
  return true;
}

async function writeAudit(action, tableName, recordId, details) {
  if (!dbReady || !currentUser) return;
  await db.from("audit_log").insert({
    action,
    table_name: tableName,
    record_id: recordId,
    user_id: currentUser.id,
    user_email: currentUser.email,
    details
  });
}

function newId(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function formatFileSize(bytes = 0) {
  const size = Number(bytes) || 0;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function evidenceSafeName(name = "evidence-file") {
  return String(name)
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120) || "evidence-file";
}

async function getEvidenceUrl(path) {
  if (!dbReady || !path) return "";
  const { data } = await db.storage.from(evidenceBucketName).createSignedUrl(path, 60 * 60);
  if (data?.signedUrl) return data.signedUrl;
  const publicResult = db.storage.from(evidenceBucketName).getPublicUrl(path);
  return publicResult?.data?.publicUrl || "";
}

async function uploadEvidenceFiles(files, recordId) {
  const selectedFiles = [...(files || [])];
  if (!selectedFiles.length) return [];
  if (!dbReady || !currentUser) throw new Error("Supabase login is required before uploading evidence.");

  const uploadedAt = new Date().toISOString();
  const attachments = [];

  for (const file of selectedFiles) {
    const path = `${recordId}/${Date.now()}-${crypto.randomUUID()}-${evidenceSafeName(file.name)}`;
    const { error } = await db.storage.from(evidenceBucketName).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "application/octet-stream"
    });
    if (error) throw new Error(`Evidence upload failed for ${file.name}: ${error.message}`);
    attachments.push({
      recordId,
      fileName: file.name,
      fileType: file.type || "Unknown",
      fileSize: file.size,
      fileSizeLabel: formatFileSize(file.size),
      uploadedAt,
      bucket: evidenceBucketName,
      path,
      url: await getEvidenceUrl(path)
    });
  }

  return attachments;
}

function renderEvidenceAttachments(record) {
  const attachments = Array.isArray(record.evidenceAttachments) ? record.evidenceAttachments : [];
  if (!attachments.length) return '<div class="evidence-list empty-evidence">No evidence files attached.</div>';
  return `<div class="evidence-list">${attachments.map((file) => {
    const label = `${file.fileName || "Evidence file"} (${file.fileSizeLabel || formatFileSize(file.fileSize)})`;
    const meta = `${file.fileType || "Unknown type"} | Uploaded ${file.uploadedAt ? new Date(file.uploadedAt).toLocaleString() : "date unavailable"}`;
    return `<div class="evidence-item">${file.url ? `<a href="${escapeHtml(file.url)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>` : `<strong>${escapeHtml(label)}</strong>`}<div class="meta">${escapeHtml(meta)}</div></div>`;
  }).join("")}</div>`;
}

function chipClass(value) {
  const text = String(value || "");
  if (text.includes("Banned") || text.includes("Revoked") || text === "Critical") return "red";
  if (text.includes("Restricted") || text.includes("Pending") || text === "Under Review" || text === "Suspended" || text === "High") return "orange";
  if (text.includes("Clear") || text === "Complete" || text === "Low" || text === "Verified") return "green";
  if (text === "Moderate") return "blue";
  return "gray";
}

function chip(value) {
  return `<span class="chip ${chipClass(value)}">${escapeHtml(value || "Not set")}</span>`;
}

function emptyState(message = "No records entered yet.") {
  return `<div class="empty-state">${message}</div>`;
}

function findRoleSelect(userId) {
  return [...document.querySelectorAll("[data-user-role]")].find((select) => select.dataset.userRole === userId);
}

function tableEmptyState(message = "No records entered yet.") {
  return `<tr><td colspan="35" class="table-empty">${message}</td></tr>`;
}

function isRestrictedRecord(record) {
  return ["Restricted", "Banned From Site", "Suspended"].includes(record.access) ||
    record.banned === "Yes" ||
    record.removedFromSite === "Yes" ||
    record.disposition === "Substantiated";
}

function activeRecords() {
  const text = document.getElementById("globalSearch").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;
  const contractor = document.getElementById("contractorFilter").value;
  const severity = document.getElementById("severityFilter").value;
  const utility = document.getElementById("utilityFilter").value;
  const project = document.getElementById("projectFilter").value;
  const incidentType = document.getElementById("incidentTypeFilter").value;
  const workType = document.getElementById("workTypeFilter")?.value || "";
  const domain = document.getElementById("domainFilter")?.value || "";
  const banned = document.getElementById("bannedFilter").value;

  return state.records.filter((record) => {
    const searchable = Object.values(record).join(" ").toLowerCase();
    return (!text || searchable.includes(text)) &&
      (!status || record.access === status) &&
      (!contractor || record.contractor === contractor) &&
      (!severity || record.severity === severity) &&
      (!utility || record.utility === utility) &&
      (!project || record.project === project) &&
      (!incidentType || record.type === incidentType) &&
      (!workType || record.workType === workType) &&
      (!domain || record.operatingDomain === domain) &&
      (!banned || record.banned === banned);
  });
}

function renderKpis() {
  const records = state.records;
  const overdue = records.filter((r) => r.correctiveStatus === "Open" && r.reinstatement && r.reinstatement < today()).length;
  const kpis = [
    ["Total Events", records.length, "All submitted matrix records"],
    ["Open Investigations", records.filter((r) => !["Closed", "Final Access Decision"].includes(r.investigation)).length, "Active review workload"],
    ["SIF Potential Events", records.filter((r) => ["High", "Critical"].includes(r.sif)).length, "High or critical SIF potential"],
    ["Restricted Workers", records.filter(isRestrictedRecord).length, "Restricted, suspended, or banned"],
    ["Overdue Corrective Actions", overdue, "Past-due open items"],
    ["Reinstatement Pending", records.filter((r) => ["Required", "Conditional", "Pending Review"].includes(r.reinstatementRequired) && r.returnStatus !== "Cleared").length, "Return-to-site review needed"],
    ["Open High-Risk Work", records.filter((r) => ["Transmission Line", "Substation", "Helicopter / External Load", "Energized Work / MAD Exposure", "Power Generation - Gas / Thermal", "Power Generation - Hydro", "Power Generation - Solar / BESS"].includes(r.workType) && r.access !== "Clear").length, "Manager attention required"]
  ];

  document.getElementById("kpiGrid").innerHTML = kpis
    .map(([label, value, note]) => `<article class="kpi-card"><span>${label}</span><strong>${value}</strong><em>${note}</em></article>`)
    .join("");
  renderTrendCards(records);
}

function drawBarChart(canvasId, labels, values, colors) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext("2d");
  const width = canvas.clientWidth || 520;
  const height = canvas.height;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.scale(ratio, ratio);
  context.clearRect(0, 0, width, height);

  if (!values.some((value) => value > 0)) {
    context.fillStyle = "#657286";
    context.font = "600 14px Arial";
    context.textAlign = "center";
    context.fillText("No records entered yet.", width / 2, height / 2);
    context.textAlign = "start";
    return;
  }

  const chartHeight = height - 58;
  const max = Math.max(...values, 1);
  const gap = 12;
  const barWidth = (width - gap * (values.length + 1)) / values.length;

  context.strokeStyle = "#d9e1ec";
  context.beginPath();
  context.moveTo(0, chartHeight + 14);
  context.lineTo(width, chartHeight + 14);
  context.stroke();

  values.forEach((value, index) => {
    const barHeight = (value / max) * (chartHeight - 24);
    const x = gap + index * (barWidth + gap);
    const y = chartHeight - barHeight + 14;
    context.fillStyle = colors[index % colors.length];
    context.fillRect(x, y, Math.max(barWidth, 12), barHeight);
    context.fillStyle = "#172033";
    context.font = "700 13px Arial";
    context.fillText(value, x, y - 6);
    context.fillStyle = "#657286";
    context.font = "12px Arial";
    const label = labels[index].length > 16 ? `${labels[index].slice(0, 14)}...` : labels[index];
    context.fillText(label, x, height - 16);
  });
}

function countBy(records, field, labels) {
  return labels.map((label) => records.filter((record) => record[field] === label).length);
}

function renderTrendCards(records) {
  const daysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().slice(0, 10);
  };
  const trendItems = [
    ["Last 30 Days", records.filter((r) => r.date >= daysAgo(30)).length, "New events"],
    ["Last 60 Days", records.filter((r) => r.date >= daysAgo(60)).length, "New events"],
    ["Last 90 Days", records.filter((r) => r.date >= daysAgo(90)).length, "New events"],
    ["Control Failures", records.filter((r) => ["Failed / Missing", "Pending Verification"].includes(r.criticalControlStatus)).length, "Needs field verification"]
  ];
  document.getElementById("trendCards").innerHTML = trendItems
    .map(([label, value, note]) => `<article class="program-card"><span>${label}</span><strong>${value}</strong><em>${note}</em></article>`)
    .join("");
}

function renderProgramPanels() {
  const records = state.records;
  const controlItems = ["Effective", "Failed / Missing", "Pending Verification", "Not Applicable"].map((status) => {
    const total = records.filter((r) => r.criticalControlStatus === status).length;
    return `<div class="summary-item"><span>${status}</span><strong>${total}</strong></div>`;
  }).join("");
  document.getElementById("controlsStatus").innerHTML = controlItems || emptyState("No records entered yet.");

  const highRisk = records
    .filter((r) => ["Critical", "High"].includes(r.sif) || ["Transmission Line", "Substation", "Helicopter / External Load", "Energized Work / MAD Exposure", "Power Generation - Gas / Thermal", "Power Generation - Hydro", "Power Generation - Solar / BESS"].includes(r.workType))
    .slice(0, 6);
  document.getElementById("highRiskWork").innerHTML = highRisk.length ? highRisk
    .map((r) => `<div class="compact-record"><strong>${escapeHtml(r.workType)}</strong><span>${escapeHtml(r.contractor)} | ${escapeHtml(r.project)}</span>${chip(r.access)}</div>`)
    .join("") : emptyState("No high-risk work records entered yet.");
}

function renderUtilityProgram() {
  const records = state.records;
  const domainContainer = document.getElementById("domainCommandCards");
  if (!domainContainer) return;
  domainContainer.innerHTML = utilityProgramDomains.map(([domain, description]) => {
    const related = records.filter((r) => r.operatingDomain === domain || r.workType.includes(domain));
    const critical = related.filter((r) => ["High", "Critical"].includes(r.sif) || r.programRisk === "Executive Review").length;
    const open = related.filter((r) => !["Closed", "Final Access Decision"].includes(r.investigation)).length;
    return `<article class="domain-card">
      <div><strong>${escapeHtml(domain)}</strong><span>${escapeHtml(description)}</span></div>
      <div class="domain-metrics"><b>${related.length}</b><small>Total</small><b>${critical}</b><small>SIF / exec</small><b>${open}</b><small>Open</small></div>
    </article>`;
  }).join("");

  const generationRecords = records.filter((r) => r.operatingDomain === "Power Generation" || String(r.workType).includes("Generation") || ["Power Generation - Hydro", "Power Generation - Solar / BESS", "Relay / Protection / SCADA", "Control Room / Dispatch Operations"].includes(r.workType));
  document.getElementById("generationReadiness").innerHTML = [
    ["Generation Records", generationRecords.length],
    ["Switchyard / Relay / SCADA", generationRecords.filter((r) => ["Generation Switchyard", "Relay / Protection / SCADA", "Control Room / Dispatch Operations"].includes(r.workType)).length],
    ["Stored Energy / LOTO Focus", generationRecords.filter((r) => /LOTO|stored|pressure|hydraulic|battery|DC/i.test(`${r.criticalControlDetail} ${r.energySource}`)).length],
    ["Open Generation Corrective Actions", generationRecords.filter((r) => r.correctiveStatus === "Open").length]
  ].map(([label, value]) => `<div class="summary-item"><span>${label}</span><strong>${value}</strong></div>`).join("");

  const escalations = records
    .filter((r) => r.programRisk === "Executive Review" || r.sif === "Critical" || r.criticalControlStatus === "Failed / Missing" || r.access === "Banned From Site")
    .slice(0, 8);
  document.getElementById("executiveEscalation").innerHTML = escalations.length ? escalations.map((r) => `<div class="compact-record">
    <strong>${escapeHtml(r.programRisk)} | ${escapeHtml(r.operatingDomain)}</strong>
    <span>${escapeHtml(r.contractor)} | ${escapeHtml(r.workType)} | ${escapeHtml(r.project)}</span>
    <span>${escapeHtml(r.criticalControlDetail || r.type)}</span>
    ${chip(r.access)}
  </div>`).join("") : emptyState("No executive escalation records entered yet.");
}

function renderCharts() {
  const records = state.records;
  const workTypeLabels = workTypes.slice(0, 8);
  const controlLabels = ["Effective", "Failed / Missing", "Pending Verification", "Not Applicable"];
  const severityLabels = ["Low", "Moderate", "High", "Critical"];
  const contractors = [...new Set(records.map((record) => record.contractor).filter(Boolean))].slice(0, 6);

  drawBarChart("categoryChart", workTypeLabels.map((label) => label.split(" / ")[0]), countBy(records, "workType", workTypeLabels), ["#2563eb", "#dc2626", "#ea580c"]);
  drawBarChart("statusChart", controlLabels, countBy(records, "criticalControlStatus", controlLabels), ["#15803d", "#dc2626", "#ea580c", "#64748b"]);
  drawBarChart("repeatChart", severityLabels, countBy(records, "severity", severityLabels), ["#64748b", "#2563eb", "#ea580c", "#dc2626"]);
  drawBarChart("contractorChart", contractors.length ? contractors : ["No records"], contractors.map((contractor) => records.filter((record) => record.contractor === contractor).length), ["#2563eb", "#ea580c", "#15803d", "#64748b"]);
  renderProgramPanels();
  renderUtilityProgram();
}

function setOptions(id, values, defaultLabel) {
  const select = document.getElementById(id);
  const selected = select.value;
  select.innerHTML = `<option value="">${defaultLabel}</option>`;
  [...new Set(values.filter(Boolean))].sort().forEach((value) => {
    select.innerHTML += `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`;
  });
  select.value = [...select.options].some((option) => option.value === selected) ? selected : "";
}

function renderFilters() {
  setOptions("statusFilter", state.records.map((r) => r.access), "All access statuses");
  setOptions("contractorFilter", state.records.map((r) => r.contractor), "All contractors");
  setOptions("severityFilter", state.records.map((r) => r.severity), "All severities");
  setOptions("utilityFilter", state.records.map((r) => r.utility), "All utility customers");
  setOptions("projectFilter", state.records.map((r) => r.project), "All projects / sites");
  setOptions("incidentTypeFilter", state.records.map((r) => r.type), "All incident types");
  setOptions("workTypeFilter", state.records.map((r) => r.workType), "All work types");
  setOptions("domainFilter", state.records.map((r) => r.operatingDomain), "All operating domains");
  setOptions("bannedFilter", state.records.map((r) => r.banned), "All banned statuses");
  document.getElementById("eventCategorySelect").innerHTML = eventCategories.map((category) => `<option>${category}</option>`).join("");
  document.getElementById("workTypeSelect").innerHTML = workTypes.map((type) => `<option>${type}</option>`).join("");
  document.getElementById("operatingDomainSelect").innerHTML = operatingDomains.map((domain) => `<option>${domain}</option>`).join("");
  document.getElementById("programRiskSelect").innerHTML = programRiskTiers.map((tier) => `<option>${tier}</option>`).join("");
  document.getElementById("damageMethodSelect").innerHTML = damagePreventionMethods.map((method) => `<option>${method}</option>`).join("");
  document.getElementById("facilityTypeSelect").innerHTML = facilityTypes.map((type) => `<option>${type}</option>`).join("");
  document.getElementById("locateStatusSelect").innerHTML = locateStatuses.map((status) => `<option>${status}</option>`).join("");
  document.getElementById("strikeSeveritySelect").innerHTML = strikeSeverities.map((severity) => `<option>${severity}</option>`).join("");
  document.getElementById("ownerNotificationStatusSelect").innerHTML = ownerNotificationStatuses.map((status) => `<option>${status}</option>`).join("");
}

function recordActions(record) {
  const canEdit = canEditRecord(record);
  const canRemove = canDeleteRecord(record);
  if (!canEdit && !canRemove) return "";
  return `<div class="record-actions">${canEdit ? `<button class="ghost-btn" data-edit-record="${record.id}">Edit</button>` : ""}${canRemove ? `<button class="ghost-btn danger-btn" data-delete-record="${record.id}">Delete</button>` : ""}</div>`;
}

function renderMatrix() {
  const records = activeRecords();
  document.getElementById("matrixBody").innerHTML = records.length ? records.map((r) => `<tr>
    <td>${escapeHtml(r.id)}</td><td><strong>${escapeHtml(r.name)}</strong></td><td>${escapeHtml(r.source)}</td><td>${escapeHtml(r.contractor)}</td><td>${escapeHtml(r.priorContractor)}</td>
    <td>${escapeHtml(r.project)}</td><td>${escapeHtml(r.operatingDomain)}</td><td>${escapeHtml(r.workType)}</td><td>${chip(r.programRisk)}</td><td>${escapeHtml(r.utility)}</td><td>${escapeHtml(r.jobClass)}</td><td>${escapeHtml(r.priorProject)}</td><td>${escapeHtml(r.date)}</td><td>${escapeHtml(r.type)}</td><td>${chip(r.severity)}</td>
    <td>${chip(r.sif)}</td><td>${escapeHtml(r.sifControl)}</td><td>${escapeHtml(r.investigation)}</td><td>${chip(r.evidence)}</td><td>${chip(r.access)}</td><td>${chip(r.banned)}</td><td>${escapeHtml(r.scope)}</td>
    <td>${escapeHtml(r.action)}</td><td>${escapeHtml(r.reinstatementRequired)}</td><td>${escapeHtml(r.trainingRequired)}</td><td>${escapeHtml(r.competency)}</td><td>${escapeHtml(r.supervisorApproval)}</td><td>${escapeHtml(r.safetyApproval)}</td><td>${escapeHtml(r.returnStatus)}</td>
    <td>${escapeHtml(r.reinstatement)}</td><td>${escapeHtml(r.authority)}</td><td>${escapeHtml(r.disposition)}</td><td>${escapeHtml(r.notes)}</td><td>${escapeHtml(r.updated)}</td><td>${recordActions(r)}</td>
  </tr>`).join("") : tableEmptyState("No records entered yet.");
}

function renderAlerts() {
  const records = state.records.filter((r) => r.sif === "Critical" || r.severity === "Critical" || r.disposition === "Substantiated");
  document.getElementById("alertList").innerHTML = records.length ? records
    .map((r) => `<div class="alert-item"><div><strong>${escapeHtml(r.name)}</strong><div class="meta">${escapeHtml(r.id)} | ${escapeHtml(r.contractor)} | ${escapeHtml(r.project)}</div></div><div>${escapeHtml(r.type)}<div class="meta">${escapeHtml(r.investigation)}</div></div><div>${chip(r.access)}</div>${recordActions(r)}</div>`)
    .join("") : emptyState("No records entered yet.");
}

function renderWorkflow() {
  const workflow = ["Event Reported", "Under Review", "Evidence Collected", "Contractor Response Requested", "Safety Review Completed", "Final Access Decision", "Corrective Action Assigned", "Closed"];
  document.getElementById("workflowBoard").innerHTML = workflow.map((stage) => {
    const records = state.records.filter((r) => r.investigation === stage).slice(0, 4);
    return `<section class="workflow-column"><h3>${stage}</h3>${records.map((r) => `<div class="workflow-card-item"><strong>${escapeHtml(r.name)}</strong><span class="meta">${escapeHtml(r.contractor)} | ${escapeHtml(r.type)}</span>${chip(r.access)}${recordActions(r)}</div>`).join("") || '<div class="empty-state compact">No records entered yet.</div>'}</section>`;
  }).join("");
}

function renderCriticalControls() {
  const container = document.getElementById("criticalControlsList");
  if (!container) return;
  container.innerHTML = criticalControlsLibrary.map(([workType, control, detail]) => {
    const related = state.records.filter((r) => r.workType === workType);
    const failed = related.filter((r) => r.criticalControlStatus === "Failed / Missing").length;
    return `<article class="control-card">
      <div>
        <strong>${escapeHtml(workType)}</strong>
        <span>${escapeHtml(control)}</span>
      </div>
      <p>${escapeHtml(detail)}</p>
      <div class="meta">Records: ${related.length} | Failed or missing: ${failed}</div>
    </article>`;
  }).join("");
}

function isDamagePreventionRecord(record) {
  return ["Hydrovac", "Directional Bore", "Open Cut", "Potholing / Daylighting", "Trenching", "Plowing", "Auger", "Hand Dig", "Vacuum Excavation Support"].includes(record.damageMethod) ||
    ["Hydrovac / Vacuum Excavation", "Directional Boring", "Potholing / Daylighting", "Trenching / Open Cut", "Excavation / Civil", "Underground Distribution"].includes(record.workType) ||
    ["Hydrovac Utility Damage", "Directional Bore Strike", "Potholing / Daylighting Miss", "Locate Mismatch / Marking Conflict", "Unknown Facility Encounter", "Excavation Utility Conflict"].includes(record.type);
}

function renderDamagePrevention() {
  const records = state.records.filter(isDamagePreventionRecord);
  const openReviews = records.filter((r) => !["Closed", "Final Access Decision"].includes(r.investigation));
  const summaryItems = [
    ["Damage Prevention Records", records.length],
    ["Hydrovac Events", records.filter((r) => r.damageMethod === "Hydrovac" || r.workType === "Hydrovac / Vacuum Excavation").length],
    ["Bore Strike / Near Miss", records.filter((r) => r.damageMethod === "Directional Bore" || r.type === "Directional Bore Strike").length],
    ["Locate Issues", records.filter((r) => ["Expired", "Missing", "Incorrect", "Conflicting", "Needs Review"].includes(r.locateStatus)).length],
    ["Potholing Not Complete", records.filter((r) => ["No", "Partial"].includes(r.potholingCompleted)).length],
    ["Owner Notifications Open", records.filter((r) => !["Closed", "Not Required"].includes(r.ownerNotificationStatus)).length],
    ["Repeat Strike Flags", records.filter((r) => ["Yes", "Monitor"].includes(r.repeatStrikeFlag)).length],
    ["High-Severity Strikes", records.filter((r) => !["No Damage / Good Catch", "Coating Damage"].includes(r.strikeSeverity)).length]
  ];
  document.getElementById("damagePreventionSummary").innerHTML = summaryItems
    .map(([label, value]) => `<div class="summary-item"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
  document.getElementById("damagePreventionList").innerHTML = openReviews.length ? openReviews.slice(0, 12).map((r) => `<div class="record-item">
    <div><strong>${escapeHtml(r.type)}</strong><div class="meta">${escapeHtml(r.contractor)} | ${escapeHtml(r.project)} | ${escapeHtml(r.damageMethod)}</div></div>
    <div>Facility: ${escapeHtml(r.facilityType)} | Ticket: ${escapeHtml(r.locateTicket || "Not logged")} | Locate: ${escapeHtml(r.locateStatus)}<div class="meta">Potholing: ${escapeHtml(r.potholingCompleted)} | Tolerance zone: ${escapeHtml(r.toleranceZone)} | Bore path: ${escapeHtml(r.borePathVerified)}</div><div class="meta">Owner notification: ${escapeHtml(r.ownerNotificationStatus)} | Root cause: ${escapeHtml(r.damageRootCause)}</div></div>
    <div>${chip(r.strikeSeverity)}</div>${recordActions(r)}
  </div>`).join("") : emptyState("No open damage prevention reviews.");
  const damageControls = [
    ["Valid locate ticket", records.filter((r) => r.locateStatus === "Valid").length],
    ["Marks visible / reconciled", records.filter((r) => r.marksVisible === "Yes").length],
    ["Positive potholing complete", records.filter((r) => r.potholingCompleted === "Yes").length],
    ["Tolerance zone followed", records.filter((r) => r.toleranceZone === "Yes").length],
    ["Bore path verified", records.filter((r) => r.borePathVerified === "Yes").length],
    ["Owner notification closed", records.filter((r) => r.ownerNotificationStatus === "Closed").length]
  ];
  document.getElementById("damageControlsList").innerHTML = damageControls.map(([control, value]) => `<article class="control-card"><div><strong>${control}</strong><span>${value} verified records</span></div><p>Review exceptions where this control is missing, partial, conflicting, or pending utility-owner response.</p></article>`).join("");
}

function renderRecordLists() {
  const restrictedRecords = state.records.filter(isRestrictedRecord);
  document.getElementById("restrictedList").innerHTML = restrictedRecords.length ? restrictedRecords
    .map((r) => `<div class="record-item"><div><strong>${escapeHtml(r.name)}</strong><div class="meta">${escapeHtml(r.id)} | ${escapeHtml(r.contractor)} | ${escapeHtml(r.workType)}</div></div><div>${escapeHtml(r.scope)}<div class="meta">Decision: ${escapeHtml(r.authority)} | Evidence: ${escapeHtml(r.evidence)} | Reinstatement: ${escapeHtml(r.reinstatementRequired)}</div><div class="meta">${escapeHtml(r.conditionalAccessNotes || r.action)}</div></div><div>${chip(r.access)}</div>${recordActions(r)}</div>`)
    .join("") : emptyState("No records entered yet.");

  const reinstatementRecords = state.records.filter((r) => r.reinstatement && r.reinstatement !== "N/A").sort((a, b) => String(a.reinstatement).localeCompare(String(b.reinstatement)));
  document.getElementById("reinstatementList").innerHTML = reinstatementRecords.length ? reinstatementRecords
    .map((r) => `<div class="record-item"><div><strong>${escapeHtml(r.name)}</strong><div class="meta">Review date ${escapeHtml(r.reinstatement)} | ${escapeHtml(r.contractor)}</div></div><div>Training: ${escapeHtml(r.trainingRequired)} | Coaching: ${escapeHtml(r.coachingCompleted)} | Field observation: ${escapeHtml(r.fieldObservation)}<div class="meta">Competency: ${escapeHtml(r.competency)} | Supervisor: ${escapeHtml(r.supervisorApproval)} | Safety: ${escapeHtml(r.safetyApproval)} | Customer: ${escapeHtml(r.customerApproval)}</div><div class="meta">${escapeHtml(r.conditionalAccessNotes)}</div></div><div>${chip(r.returnStatus)}</div>${recordActions(r)}</div>`)
    .join("") : emptyState("No records entered yet.");
}

function renderIncidents() {
  const records = activeRecords();
  document.getElementById("incidentList").innerHTML = records.length ? records
    .map((r) => `<div class="record-item incident-card"><div><strong>${escapeHtml(r.date)} | ${escapeHtml(r.type)}</strong><div class="meta">${escapeHtml(r.name)} | ${escapeHtml(r.contractor)} | ${escapeHtml(r.workType)} | ${escapeHtml(r.project)}</div></div><div>${escapeHtml(r.notes)}<div class="meta">SIF: ${escapeHtml(r.sif)} | Control: ${escapeHtml(r.sifControl)} | Critical control: ${escapeHtml(r.criticalControlStatus)} - ${escapeHtml(r.criticalControlDetail)}</div>${isDamagePreventionRecord(r) ? `<div class="meta">Damage prevention: ${escapeHtml(r.damageMethod)} | Facility: ${escapeHtml(r.facilityType)} | Locate: ${escapeHtml(r.locateStatus)} | Strike severity: ${escapeHtml(r.strikeSeverity)}</div>` : ""}<div class="meta">Stop work: ${escapeHtml(r.stopWork)} | Removed from site: ${escapeHtml(r.removedFromSite)} | Utility restriction: ${escapeHtml(r.utilityRestriction)}</div><div class="meta">RCA: ${escapeHtml(r.rca)} | Corrective action: ${escapeHtml(r.correctiveStatus)} | Re-dispatch concern: ${escapeHtml(r.reDispatchConcern)}</div>${renderEvidenceAttachments(r)}</div><div>${chip(r.managementReview)}</div>${recordActions(r)}</div>`)
    .join("") : emptyState("No records entered yet.");
}

function renderCorrective() {
  const records = activeRecords().filter((r) => r.correctiveStatus === "Open" || r.action || r.access === "Monitor");
  document.getElementById("correctiveList").innerHTML = records.length ? records
    .map((r) => `<div class="record-item"><div><strong>${escapeHtml(r.action || "Corrective action pending")}</strong><div class="meta">${escapeHtml(r.name)} | Owner: ${escapeHtml(r.authority)} | Linked event: ${escapeHtml(r.id)}</div></div><div>Due / review date: ${escapeHtml(r.reinstatement)}<div class="meta">Verification: ${escapeHtml(r.verificationMethod)} | Field verification: ${escapeHtml(r.fieldVerification)} | Evidence: ${escapeHtml(r.evidence)}</div><div class="meta">Access impact: ${escapeHtml(r.accessImpact || r.access)} | Closure: ${escapeHtml(r.closureApproval)}</div></div><div>${chip(r.correctiveStatus)}</div>${recordActions(r)}</div>`)
    .join("") : emptyState("No records entered yet.");
}

function renderReports() {
  const current = activeRecords();
  const items = [
    ["Weekly Safety Summary", current.length],
    ["Contractor Risk Summary", [...new Set(current.map((r) => r.contractor).filter(Boolean))].length],
    ["Open Corrective Actions", current.filter((r) => r.correctiveStatus === "Open").length],
    ["Restricted Worker Summary", current.filter(isRestrictedRecord).length],
    ["SIF Potential Trend", current.filter((r) => ["High", "Critical"].includes(r.sif)).length],
    ["Critical Controls Failure Summary", current.filter((r) => r.criticalControlStatus === "Failed / Missing").length],
    ["Reinstatement Pending Report", current.filter((r) => ["Required", "Conditional", "Pending Review"].includes(r.reinstatementRequired) && r.returnStatus !== "Cleared").length],
    ["High-Risk Work Lookahead", current.filter((r) => ["Transmission Line", "Substation", "Helicopter / External Load", "Energized Work / MAD Exposure"].includes(r.workType)).length],
    ["Underground Strike Summary", current.filter(isDamagePreventionRecord).length],
    ["Hydrovac Damage Prevention Report", current.filter((r) => r.damageMethod === "Hydrovac").length],
    ["Contractor Bore Strike Trend", current.filter((r) => r.damageMethod === "Directional Bore" || r.type === "Directional Bore Strike").length],
    ["Locate Quality / Mismatch Report", current.filter((r) => ["Incorrect", "Conflicting", "Expired", "Missing"].includes(r.locateStatus)).length],
    ["Open Utility Owner Notifications", current.filter((r) => !["Closed", "Not Required"].includes(r.ownerNotificationStatus)).length]
  ];
  const summary = current.length ? items.map(([label, value]) => `<div class="summary-item"><span>${label}</span><strong>${value}</strong></div>`).join("") : emptyState("No records entered yet.");
  const reportRecords = state.reportRecords.length ? state.reportRecords.map((r) => `<div class="record-item"><div><strong>${escapeHtml(r.title)}</strong><div class="meta">${escapeHtml(r.date)} | ${escapeHtml(r.owner)}</div></div><div>${escapeHtml(r.notes)}</div><div>${recordReportActions(r)}</div></div>`).join("") : emptyState("No records entered yet.");
  document.getElementById("reportSummary").innerHTML = `${summary}${canWrite() ? '<div class="section-actions"><button class="primary-btn" id="addReportRecord">Add Report Record</button></div>' : ""}<div class="record-list">${reportRecords}</div>`;
  document.getElementById("addReportRecord")?.addEventListener("click", () => openReportEditor());
}

function recordReportActions(record) {
  const canEdit = canEditRecord(record);
  const canRemove = canDeleteRecord(record);
  if (!canEdit && !canRemove) return "";
  return `<div class="record-actions">${canEdit ? `<button class="ghost-btn" data-edit-report="${record.id}">Edit</button>` : ""}${canRemove ? `<button class="ghost-btn danger-btn" data-delete-report="${record.id}">Delete</button>` : ""}</div>`;
}

function renderNotifications() {
  const records = state.records.filter((r) => ["Under Review", "Restricted", "Monitor", "Banned From Site", "Suspended"].includes(r.access)).slice(0, 6);
  document.getElementById("notificationGrid").innerHTML = records.length ? records
    .map((r) => `<article class="notification-card"><strong>${escapeHtml(r.contractor)}</strong><div class="meta">${escapeHtml(r.name)} | ${escapeHtml(r.id)}</div>${chip(r.access)}<textarea readonly>Notice: ${escapeHtml(r.investigation)}. Please provide contractor response, corrective-action evidence, and supervisor acknowledgement for ${escapeHtml(r.type)}.</textarea><button class="ghost-btn">Queue Notice</button></article>`)
    .join("") : emptyState("No records entered yet.");
}

function renderAudit() {
  document.getElementById("auditLog").innerHTML = state.records.length ? state.records
    .map((r) => `<div class="timeline-item"><time>${escapeHtml(r.updated)}</time><div>${escapeHtml(r.name)} saved. Status: ${escapeHtml(r.investigation)}.</div></div>`)
    .join("") : emptyState("No records entered yet.");
}

function renderAdmin() {
  const roleCards = state.roles.length ? state.roles
    .map((role) => `<article class="role-card"><h3>${escapeHtml(role.role)}</h3><p class="meta">${escapeHtml(role.permissions)}</p><p class="meta">Audit trail required: ${escapeHtml(role.audit)}</p>${recordRoleActions(role)}</article>`)
    .join("") : emptyState("No records entered yet.");
  const authCard = dbReady ? (currentUser
    ? `<article class="role-card admin-tools"><h3>Signed In</h3><p class="meta">${escapeHtml(currentUser.email)}</p><p class="meta">Role: ${escapeHtml(currentUserRole)}</p><p class="meta">Records save to the shared Supabase database.</p><button class="ghost-btn" id="signOutBtn">Sign Out</button></article>`
    : `<article class="role-card admin-tools"><h3>Database Sign In Required</h3><p class="meta">Use the account login screen before dashboard access is granted.</p></article>`)
    : `<article class="role-card admin-tools"><h3>Database Setup Needed</h3><p class="meta">Add SUPABASE_URL and SUPABASE_ANON_KEY in Vercel to enable the shared database.</p></article>`;
  document.getElementById("adminGrid").innerHTML = `${authCard}${roleCards}<article class="role-card admin-tools"><h3>Admin Tools</h3><p class="meta">Clear All Local Records removes old browser prototype data only. Shared database records remain until an authorized admin deletes them.</p><p class="meta build-marker">${buildMarker}</p>${canManageUsers() ? '<button class="primary-btn" id="addRoleRecord">Add Role</button>' : ""}<button class="ghost-btn danger-btn" id="clearLocalRecords">Clear All Local Records</button></article>`;
  document.getElementById("clearLocalRecords").addEventListener("click", clearLocalRecords);
  document.getElementById("addRoleRecord")?.addEventListener("click", () => openRoleEditor());
  document.getElementById("signOutBtn")?.addEventListener("click", signOut);
}

function renderUserApprovals() {
  const container = document.getElementById("userApprovalsList");
  if (!container) return;
  if (!isAdmin()) {
    container.innerHTML = emptyState("Admin access required.");
    return;
  }
  const users = [...state.profiles].sort((a, b) => {
    if (a.approved !== b.approved) return a.approved ? 1 : -1;
    return String(b.created_at || "").localeCompare(String(a.created_at || ""));
  });
  container.innerHTML = users.length ? users.map((user) => {
    const isCurrent = user.id === currentUser?.id;
    const status = user.approved ? "Approved" : "Pending";
    const role = user.role || "viewer";
    return `<div class="record-item user-approval-item">
      <div><strong>${escapeHtml(user.email || "No email")}</strong><div class="meta">Created: ${escapeHtml(user.created_at || "Not available")}</div></div>
      <div>${chip(status)}<div class="meta">Last updated: ${escapeHtml(user.updated_at || "Not available")}</div></div>
      <div class="approval-controls">
        <select data-user-role="${escapeHtml(user.id)}" ${isCurrent ? "disabled" : ""}>
          ${["viewer", "reviewer", "admin"].map((option) => `<option value="${option}"${option === role ? " selected" : ""}>${option}</option>`).join("")}
        </select>
        <button class="primary-btn" data-approve-user="${escapeHtml(user.id)}" ${isCurrent ? "disabled" : ""}>Approve user</button>
        <button class="ghost-btn" data-update-user-role="${escapeHtml(user.id)}" ${isCurrent ? "disabled" : ""}>Change role</button>
        <button class="ghost-btn danger-btn" data-disable-user="${escapeHtml(user.id)}" ${isCurrent ? "disabled" : ""}>Disable/Deny user</button>
      </div>
    </div>`;
  }).join("") : emptyState("No user accounts found.");
}

function userApprovalMessage(message, isError = false) {
  const target = document.getElementById("userApprovalMessage");
  if (!target) return;
  target.textContent = message;
  target.classList.toggle("error-message", isError);
}

async function updateUserProfile(userId, changes, successMessage) {
  if (!isAdmin()) return userApprovalMessage("Only the administrator can manage user approvals.", true);
  if (userId === currentUser?.id) return userApprovalMessage("You cannot approve, disable, or change your own admin account here.", true);
  const selectedRole = changes.role || findRoleSelect(userId)?.value || "viewer";
  if (selectedRole === "admin" && !isAdmin()) return userApprovalMessage("Only mhamilt890@gmail.com can assign admin role.", true);
  const payload = { ...changes };
  if (payload.approved === true && !payload.role) payload.role = selectedRole || "viewer";
  try {
    const { error } = await db.from("profiles").update(payload).eq("id", userId);
    if (error) throw error;
    userApprovalMessage(successMessage);
    await loadProfiles();
    renderUserApprovals();
  } catch (error) {
    userApprovalMessage(`Unable to update user: ${error.message}`, true);
  }
}

function recordRoleActions(role) {
  if (!canManageUsers()) return "";
  return `<div class="record-actions"><button class="ghost-btn" data-edit-role="${role.id}">Edit</button><button class="ghost-btn danger-btn" data-delete-role="${role.id}">Delete</button></div>`;
}

function renderAll() {
  renderKpis();
  renderFilters();
  renderCharts();
  renderMatrix();
  renderAlerts();
  renderWorkflow();
  renderCriticalControls();
  renderDamagePrevention();
  renderRecordLists();
  renderIncidents();
  renderCorrective();
  renderReports();
  renderNotifications();
  renderAudit();
  renderAdmin();
  renderUserApprovals();
  updatePermissionControls();
}

function updatePermissionControls() {
  const writable = canWrite();
  const exportAllowed = canExport();
  ["addWorker", "addIncident", "addRestricted", "addCorrective"].forEach((id) => {
    document.getElementById(id)?.classList.toggle("permission-hidden", !writable);
  });
  document.querySelector('[data-page-link="intake"]')?.classList.toggle("permission-hidden", !writable);
  document.getElementById("reportCsvImport")?.classList.toggle("permission-hidden", !writable);
  document.getElementById("exportBtn")?.classList.toggle("permission-hidden", !exportAllowed);
  document.getElementById("reportCsvExport")?.classList.toggle("permission-hidden", !exportAllowed);
  document.getElementById("userApprovalsNav")?.classList.toggle("permission-hidden", !isAdmin());
}

function blankRecord(overrides = {}) {
  return {
    id: overrides.id || newId("REC"),
    name: overrides.name || "",
    source: overrides.source || "",
    contractor: overrides.contractor || "",
    supervisor: overrides.supervisor || "",
    priorContractor: overrides.priorContractor || "",
    project: overrides.project || "",
    priorProject: overrides.priorProject || "",
    date: overrides.date || today(),
    operatingDomain: overrides.operatingDomain || "Distribution",
    workType: overrides.workType || workTypes[0],
    assetClass: overrides.assetClass || "",
    energySource: overrides.energySource || "",
    programRisk: overrides.programRisk || "Elevated",
    type: overrides.type || eventCategories[0],
    severity: overrides.severity || "Moderate",
    sif: overrides.sif || "Moderate",
    sifControl: overrides.sifControl || "Needs Review",
    criticalControlStatus: overrides.criticalControlStatus || "Pending Verification",
    criticalControlDetail: overrides.criticalControlDetail || "",
    damageMethod: overrides.damageMethod || "No Strike / Near Miss",
    facilityType: overrides.facilityType || "No Damage / Good Catch",
    locateTicket: overrides.locateTicket || "",
    locateStatus: overrides.locateStatus || "Needs Review",
    marksVisible: overrides.marksVisible || "Not Applicable",
    potholingCompleted: overrides.potholingCompleted || "Not Required",
    toleranceZone: overrides.toleranceZone || "Not Applicable",
    borePathVerified: overrides.borePathVerified || "Not Applicable",
    depthVerified: overrides.depthVerified || "",
    utilityOwner: overrides.utilityOwner || "",
    ownerNotificationStatus: overrides.ownerNotificationStatus || "Not Required",
    emergencyResponse: overrides.emergencyResponse || "No",
    serviceInterruption: overrides.serviceInterruption || "No",
    publicExposure: overrides.publicExposure || "No",
    environmentalRelease: overrides.environmentalRelease || "No",
    strikeSeverity: overrides.strikeSeverity || "No Damage / Good Catch",
    damageRootCause: overrides.damageRootCause || "Needs Review",
    repeatStrikeFlag: overrides.repeatStrikeFlag || "No",
    investigation: overrides.investigation || "Event Reported",
    evidence: overrides.evidence || "Partial",
    access: overrides.access || "Under Review",
    scope: overrides.scope || "",
    action: overrides.action || "",
    reinstatement: overrides.reinstatement || "",
    authority: overrides.authority || "",
    updated: today(),
    repeat: overrides.repeat || false,
    utility: overrides.utility || "",
    jobClass: overrides.jobClass || "",
    banned: overrides.banned || "No",
    disposition: overrides.disposition || "Pending",
    notes: overrides.notes || "",
    stopWork: overrides.stopWork || "No",
    removedFromSite: overrides.removedFromSite || "No",
    utilityRestriction: overrides.utilityRestriction || "No",
    rca: overrides.rca || "Open",
    correctiveStatus: overrides.correctiveStatus || "Open",
    verificationMethod: overrides.verificationMethod || "Supervisor field verification",
    fieldVerification: overrides.fieldVerification || "Required",
    accessImpact: overrides.accessImpact || "Under review",
    closureApproval: overrides.closureApproval || "Safety approval required",
    reinstatementRequired: overrides.reinstatementRequired || "Pending Review",
    trainingRequired: overrides.trainingRequired || "Pending Review",
    coachingCompleted: overrides.coachingCompleted || "No",
    fieldObservation: overrides.fieldObservation || "Pending",
    competency: overrides.competency || "Pending",
    supervisorApproval: overrides.supervisorApproval || "Pending",
    safetyApproval: overrides.safetyApproval || "Pending",
    customerApproval: overrides.customerApproval || "Not Required",
    returnStatus: overrides.returnStatus || "Not Cleared",
    conditionalAccessNotes: overrides.conditionalAccessNotes || "",
    reDispatchConcern: overrides.reDispatchConcern || "Monitor",
    managementReview: overrides.managementReview || "Active",
    submitted: true,
    createdBy: overrides.createdBy || "",
    createdByEmail: overrides.createdByEmail || "",
    evidenceAttachments: Array.isArray(overrides.evidenceAttachments) ? overrides.evidenceAttachments : []
  };
}

function field(name, label, value = "", type = "text") {
  return `<label>${label}<input name="${name}" type="${type}" value="${escapeHtml(value)}" /></label>`;
}

function selectField(name, label, value, options) {
  return `<label>${label}<select name="${name}">${options.map((option) => `<option${option === value ? " selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select></label>`;
}

function openRecordEditor(record = null, context = "record") {
  if (!canWrite()) return alert("Your account does not have permission to add or edit records.");
  if (record?.id && !canEditRecord(record)) return alert("You can edit only records you created.");
  editing = { type: "record", id: record?.id || null };
  const current = blankRecord(record || {});
  const host = document.getElementById("editorHost");
  const helperText = context === "Manual Matrix Entry / Backfill Record"
    ? "Matrix entries track access review, investigation status, restrictions, reinstatement decisions, and historical contractor context. Use this form for backfill, corrections, or records not submitted through Serious Event Intake."
    : "Save or cancel your changes";
  host.innerHTML = `<form class="panel editor-panel" id="recordEditor">
    <div class="panel-heading"><h2>${record ? "Edit" : "Add"} ${context}</h2><span>${helperText}</span></div>
    <div class="form-grid">
      ${field("id", "Record ID / Badge ID", current.id)}
      ${field("name", "Worker / Record Name", current.name)}
      ${field("source", "Union Local / Dispatch Source", current.source)}
      ${field("contractor", "Contractor", current.contractor)}
      ${field("supervisor", "Supervisor / Foreman", current.supervisor)}
      ${field("priorContractor", "Prior Contractor", current.priorContractor)}
      ${field("project", "Project / Site", current.project)}
      ${field("utility", "Utility Customer", current.utility)}
      ${field("jobClass", "Job Classification", current.jobClass)}
      ${field("priorProject", "Prior Project", current.priorProject)}
      ${field("date", "Event Date", current.date, "date")}
      ${selectField("operatingDomain", "Operating Domain", current.operatingDomain, operatingDomains)}
      ${selectField("workType", "Work Type", current.workType, workTypes)}
      ${field("assetClass", "Asset / Facility", current.assetClass)}
      ${field("energySource", "Energy Source", current.energySource)}
      ${selectField("programRisk", "Program Risk Tier", current.programRisk, programRiskTiers)}
      ${selectField("type", "Event Type", current.type, eventCategories)}
      ${selectField("severity", "Severity", current.severity, ["Low", "Moderate", "High", "Critical"])}
      ${selectField("sif", "SIF Potential", current.sif, ["Low", "Moderate", "High", "Critical"])}
      ${selectField("sifControl", "SIF Control Category", current.sifControl, ["Controllable SIF", "Uncontrollable SIF", "Not SIF", "Needs Review"])}
      ${selectField("criticalControlStatus", "Critical Control Status", current.criticalControlStatus, ["Effective", "Failed / Missing", "Pending Verification", "Not Applicable"])}
      ${field("criticalControlDetail", "Critical Control Detail", current.criticalControlDetail)}
      ${selectField("damageMethod", "Damage Prevention Method", current.damageMethod, damagePreventionMethods)}
      ${selectField("facilityType", "Facility Type", current.facilityType, facilityTypes)}
      ${field("locateTicket", "Locate Ticket / One-Call Reference", current.locateTicket)}
      ${selectField("locateStatus", "Locate Ticket Status", current.locateStatus, locateStatuses)}
      ${selectField("marksVisible", "Marks Visible", current.marksVisible, ["Yes", "No", "Partial", "Conflicting", "Not Applicable"])}
      ${selectField("potholingCompleted", "Potholing / Daylighting Completed", current.potholingCompleted, ["Yes", "No", "Partial", "Not Required"])}
      ${selectField("toleranceZone", "Tolerance Zone Followed", current.toleranceZone, ["Yes", "No", "Needs Review", "Not Applicable"])}
      ${selectField("borePathVerified", "Bore Path Verified", current.borePathVerified, ["Yes", "No", "Changed in Field", "Not Applicable"])}
      ${field("depthVerified", "Depth Verified", current.depthVerified)}
      ${field("utilityOwner", "Facility / Utility Owner", current.utilityOwner)}
      ${selectField("ownerNotificationStatus", "Utility Owner Notification", current.ownerNotificationStatus, ownerNotificationStatuses)}
      ${selectField("strikeSeverity", "Strike Severity", current.strikeSeverity, strikeSeverities)}
      ${selectField("emergencyResponse", "Emergency Response Required", current.emergencyResponse, ["No", "Yes"])}
      ${selectField("serviceInterruption", "Service Interruption", current.serviceInterruption, ["No", "Yes"])}
      ${selectField("publicExposure", "Public Exposure", current.publicExposure, ["No", "Yes"])}
      ${selectField("environmentalRelease", "Environmental Release", current.environmentalRelease, ["No", "Yes"])}
      ${selectField("damageRootCause", "Damage Prevention Root Cause", current.damageRootCause, ["Needs Review", "Locate issue", "Crew deviation", "Print mismatch", "Unknown facility", "Depth conflict", "Poor communication", "Procedure not followed"])}
      ${selectField("repeatStrikeFlag", "Repeat Strike Contractor Flag", current.repeatStrikeFlag, ["No", "Yes", "Monitor"])}
      ${selectField("investigation", "Investigation Status", current.investigation, ["Event Reported", "Under Review", "Evidence Collected", "Contractor Response Requested", "Safety Review Completed", "Final Access Decision", "Corrective Action Assigned", "Closed"])}
      ${selectField("evidence", "Evidence Status", current.evidence, ["None", "Partial", "Complete", "Pending Upload"])}
      ${selectField("access", "Access Status", current.access, ["Under Review", "Clear", "Monitor", "Restricted", "Suspended", "Banned From Site"])}
      ${selectField("banned", "Banned From Site", current.banned, ["No", "Yes"])}
      ${field("scope", "Restriction Scope", current.scope)}
      ${field("action", "Required Corrective Action", current.action)}
      ${selectField("verificationMethod", "Verification Method", current.verificationMethod, ["Supervisor field verification", "Safety observation", "Training record review", "Crew stand-down", "Procedure revision", "Contractor management review"])}
      ${selectField("fieldVerification", "Field Verification Required", current.fieldVerification, ["Required", "Completed", "Not Required"])}
      ${selectField("accessImpact", "Access Impact", current.accessImpact, ["Under review", "No access impact", "Project restricted", "Site restricted", "Utility customer restricted", "Fully banned"])}
      ${field("reinstatement", "Review Date", current.reinstatement, "date")}
      ${field("authority", "Decision Authority / Owner", current.authority)}
      ${selectField("disposition", "Final Disposition", current.disposition, ["Pending", "Unsubstantiated", "Substantiated", "Closed"])}
      ${selectField("stopWork", "Stop Work", current.stopWork, ["No", "Yes"])}
      ${selectField("removedFromSite", "Removed From Site", current.removedFromSite, ["No", "Yes"])}
      ${selectField("utilityRestriction", "Utility Restriction", current.utilityRestriction, ["No", "Yes"])}
      ${selectField("rca", "RCA", current.rca, ["Open", "In Review", "Complete"])}
      ${selectField("correctiveStatus", "Corrective Action Status", current.correctiveStatus, ["Open", "In Progress", "Verified", "Closed"])}
      ${selectField("reinstatementRequired", "Reinstatement Required", current.reinstatementRequired, ["Required", "Conditional", "Pending Review", "Not Required"])}
      ${selectField("trainingRequired", "Training Required", current.trainingRequired, ["Required", "Completed", "Pending Review", "Not Required"])}
      ${selectField("coachingCompleted", "Coaching Completed", current.coachingCompleted, ["No", "Yes", "Not Required"])}
      ${selectField("fieldObservation", "Field Observation", current.fieldObservation, ["Pending", "Completed", "Not Required"])}
      ${selectField("competency", "Competency Verification", current.competency, ["Pending", "Verified", "Not Required"])}
      ${selectField("supervisorApproval", "Supervisor Approval", current.supervisorApproval, ["Pending", "Approved", "Denied", "Not Required"])}
      ${selectField("safetyApproval", "Safety Approval", current.safetyApproval, ["Pending", "Approved", "Denied", "Not Required"])}
      ${selectField("customerApproval", "Customer Approval", current.customerApproval, ["Not Required", "Pending", "Approved", "Denied"])}
      ${selectField("returnStatus", "Return-to-Site Status", current.returnStatus, ["Not Cleared", "Conditional", "Cleared", "Denied"])}
      ${field("closureApproval", "Closure Approval", current.closureApproval)}
      ${selectField("reDispatchConcern", "Re-dispatch Concern", current.reDispatchConcern, ["No", "Monitor", "Yes"])}
      ${selectField("managementReview", "Management Review", current.managementReview, ["Active", "Pending", "Complete"])}
    </div>
    <label class="wide-label">Conditional Access Notes<textarea name="conditionalAccessNotes">${escapeHtml(current.conditionalAccessNotes)}</textarea></label>
    <label class="wide-label">Notes<textarea name="notes">${escapeHtml(current.notes)}</textarea></label>
    <div class="editor-actions"><button class="primary-btn" type="submit">Save</button><button class="ghost-btn" type="button" id="cancelEditor">Cancel</button></div>
  </form>`;
  host.scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById("recordEditor").addEventListener("submit", saveRecordEditor);
  document.getElementById("cancelEditor").addEventListener("click", closeEditor);
}

async function saveRecordEditor(event) {
  event.preventDefault();
  event.stopPropagation();
  const form = event.currentTarget;
  if (form.dataset.saving === "true") return;
  form.dataset.saving = "true";
  form.querySelector('button[type="submit"]').disabled = true;
  const data = Object.fromEntries(new FormData(form).entries());
  const existingId = editing.id || data.id;
  const existingIndex = state.records.findIndex((item) => item.id === existingId || item.id === data.id);
  const existingRecord = existingIndex >= 0 ? state.records[existingIndex] : null;
  if (existingRecord && !canEditRecord(existingRecord)) {
    alert("You can edit only records you created.");
    form.dataset.saving = "false";
    form.querySelector('button[type="submit"]').disabled = false;
    return;
  }
  const record = blankRecord(data);
  record.updated = today();
  record.createdBy = existingRecord?.createdBy || currentUser?.id || "";
  record.createdByEmail = existingRecord?.createdByEmail || currentUser?.email || "";
  try {
    const saved = await saveAccessRecord(record);
    if (!saved) return;
  } catch (error) {
    alert(`Unable to save record: ${error.message}`);
    return;
  } finally {
    form.dataset.saving = "false";
    form.querySelector('button[type="submit"]').disabled = false;
  }
  if (existingIndex >= 0) {
    state.records[existingIndex] = record;
  } else {
    state.records.unshift(record);
  }
  closeEditor();
  renderAll();
}

function closeEditor() {
  editing = null;
  document.getElementById("editorHost").innerHTML = "";
}

function openReportEditor(record = null) {
  if (!canWrite()) return alert("Your account does not have permission to add or edit report records.");
  if (record?.id && !canEditRecord(record)) return alert("You can edit only report records you created.");
  const current = record || { id: newId("RPT"), title: "", date: today(), owner: "", notes: "" };
  const host = document.getElementById("editorHost");
  host.innerHTML = `<form class="panel editor-panel" id="reportEditor">
    <div class="panel-heading"><h2>${record ? "Edit" : "Add"} Report Record</h2><span>Save or cancel your changes</span></div>
    <div class="form-grid">${field("id", "Report ID", current.id)}${field("title", "Title", current.title)}${field("date", "Date", current.date, "date")}${field("owner", "Owner", current.owner)}</div>
    <label class="wide-label">Notes<textarea name="notes">${escapeHtml(current.notes)}</textarea></label>
    <div class="editor-actions"><button class="primary-btn" type="submit">Save</button><button class="ghost-btn" type="button" id="cancelEditor">Cancel</button></div>
  </form>`;
  editing = { type: "report", id: record?.id || null };
  host.scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById("reportEditor").addEventListener("submit", saveReportEditor);
  document.getElementById("cancelEditor").addEventListener("click", closeEditor);
}

async function saveReportEditor(event) {
  event.preventDefault();
  event.stopPropagation();
  const form = event.currentTarget;
  if (form.dataset.saving === "true") return;
  form.dataset.saving = "true";
  form.querySelector('button[type="submit"]').disabled = true;
  const report = Object.fromEntries(new FormData(form).entries());
  const existingId = editing.id || report.id;
  const existingIndex = state.reportRecords.findIndex((item) => item.id === existingId || item.id === report.id);
  const existingReport = existingIndex >= 0 ? state.reportRecords[existingIndex] : null;
  if (existingReport && !canEditRecord(existingReport)) {
    alert("You can edit only report records you created.");
    form.dataset.saving = "false";
    form.querySelector('button[type="submit"]').disabled = false;
    return;
  }
  report.createdBy = existingReport?.createdBy || currentUser?.id || "";
  report.createdByEmail = existingReport?.createdByEmail || currentUser?.email || "";
  try {
    const saved = await saveReportRecord(report);
    if (!saved) return;
  } catch (error) {
    alert(`Unable to save report record: ${error.message}`);
    return;
  } finally {
    form.dataset.saving = "false";
    form.querySelector('button[type="submit"]').disabled = false;
  }
  if (existingIndex >= 0) {
    state.reportRecords[existingIndex] = report;
  } else {
    state.reportRecords.unshift(report);
  }
  closeEditor();
  renderAll();
}

function openRoleEditor(role = null) {
  if (!canManageUsers()) return alert("Only admins can manage roles.");
  const current = role || { id: newId("ROLE"), role: "", permissions: "", audit: "Yes" };
  const host = document.getElementById("editorHost");
  host.innerHTML = `<form class="panel editor-panel" id="roleEditor">
    <div class="panel-heading"><h2>${role ? "Edit" : "Add"} Role</h2><span>Save or cancel your changes</span></div>
    <div class="form-grid">${field("id", "Role ID", current.id)}${field("role", "Role", current.role)}${selectField("audit", "Audit Trail Required", current.audit, ["Yes", "No"])}</div>
    <label class="wide-label">Permissions<textarea name="permissions">${escapeHtml(current.permissions)}</textarea></label>
    <div class="editor-actions"><button class="primary-btn" type="submit">Save</button><button class="ghost-btn" type="button" id="cancelEditor">Cancel</button></div>
  </form>`;
  editing = { type: "role", id: role?.id || null };
  host.scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById("roleEditor").addEventListener("submit", saveRoleEditor);
  document.getElementById("cancelEditor").addEventListener("click", closeEditor);
}

async function saveRoleEditor(event) {
  event.preventDefault();
  event.stopPropagation();
  const form = event.currentTarget;
  if (form.dataset.saving === "true") return;
  form.dataset.saving = "true";
  form.querySelector('button[type="submit"]').disabled = true;
  const role = Object.fromEntries(new FormData(form).entries());
  const existingId = editing.id || role.id;
  try {
    const saved = await saveRoleRecord(role);
    if (!saved) return;
  } catch (error) {
    alert(`Unable to save role: ${error.message}`);
    return;
  } finally {
    form.dataset.saving = "false";
    form.querySelector('button[type="submit"]').disabled = false;
  }
  const existingIndex = state.roles.findIndex((item) => item.id === existingId || item.id === role.id);
  if (existingIndex >= 0) {
    state.roles[existingIndex] = role;
  } else {
    state.roles.unshift(role);
  }
  closeEditor();
  renderAll();
}

async function deleteRecord(id) {
  const record = state.records.find((item) => item.id === id);
  if (!canDeleteRecord(record)) return alert("You can delete only records you created.");
  if (!window.confirm("Delete this record?")) return;
  try {
    const deleted = await deleteRemoteRecord("access_records", id);
    if (!deleted) return;
    state.records = state.records.filter((record) => record.id !== id);
    renderAll();
  } catch (error) {
    alert(`Unable to delete record: ${error.message}`);
  }
}

async function deleteReport(id) {
  const record = state.reportRecords.find((item) => item.id === id);
  if (!canDeleteRecord(record)) return alert("You can delete only report records you created.");
  if (!window.confirm("Delete this report record?")) return;
  try {
    const deleted = await deleteRemoteRecord("report_records", id);
    if (!deleted) return;
    state.reportRecords = state.reportRecords.filter((record) => record.id !== id);
    renderAll();
  } catch (error) {
    alert(`Unable to delete report record: ${error.message}`);
  }
}

async function deleteRole(id) {
  if (!canManageUsers()) return alert("Only admins can delete roles.");
  if (!window.confirm("Delete this role?")) return;
  try {
    const deleted = await deleteRemoteRecord("app_roles", id);
    if (!deleted) return;
    state.roles = state.roles.filter((role) => role.id !== id);
    renderAll();
  } catch (error) {
    alert(`Unable to delete role: ${error.message}`);
  }
}

function buildDemoRecords() {
  const scenarios = [
    ["Missed transformer cutout before conductor transfer.", "Missed Cutout / Incomplete Isolation", "Transformer / Padmount / Elbow Work", "Critical", "High", "Failed / Missing", "Cutout / fuse / source-load verification"],
    ["Backfeed exposure during single-phase tap work.", "Backfeed Exposure", "Overhead Distribution", "High", "Critical", "Failed / Missing", "Backfeed identification"],
    ["Padmount elbow flash during switching sequence.", "Padmount Elbow Flash", "Underground Distribution", "Critical", "Critical", "Failed / Missing", "Switching order / clearance verification"],
    ["Mule tape exposure during underground cable pull.", "Underground Distribution", "Underground Distribution", "Moderate", "High", "Pending Verification", "Qualified worker verification"],
    ["Excavator contacted overhead communication line near work zone.", "Equipment Contact with Overhead Lines", "Excavation / Civil", "High", "High", "Failed / Missing", "Spotter / observer"],
    ["Dropped conductor near energized phase during transfer.", "Dropped Conductor / Conductor Control", "Reconductoring / Stringing", "High", "Critical", "Failed / Missing", "Minimum approach distance"],
    ["Helicopter external-load exclusion-zone issue.", "Helicopter Load Control", "Helicopter / External Load", "High", "Critical", "Pending Verification", "Helicopter exclusion zone / communication plan"],
    ["Substation unauthorized access boundary issue.", "Substation Access Boundary", "Substation", "Moderate", "High", "Failed / Missing", "Substation access and arc-flash boundaries"],
    ["Repeat PPE noncompliance identified during energized work setup.", "Repeat Unsafe Conduct", "Energized Work / MAD Exposure", "High", "High", "Failed / Missing", "PPE verification"],
    ["Stop work authority used correctly for missing grounding verification.", "Stop Work / Good Catch", "Grounding / EPZ", "Moderate", "High", "Effective", "Grounding and bonding / EPZ"],
    ["Good catch for missing EPZ confirmation before pole transfer.", "Stop Work / Good Catch", "Pole Setting / Framing", "Moderate", "High", "Effective", "Grounding and bonding / EPZ"],
    ["Reinstatement case after verified retraining and field observation.", "Corrective Action Assigned", "Traffic Control", "Low", "Moderate", "Effective", "Traffic control setup"],
    ["Generation switchyard clearance boundary discrepancy.", "Generation Plant Electrical Event", "Generation Switchyard", "High", "Critical", "Failed / Missing", "Switchyard clearance and grounding"],
    ["Hydro unit wicket gate stored-energy isolation concern.", "Generator / Turbine Protection Event", "Power Generation - Hydro", "High", "Critical", "Pending Verification", "Water conveyance and mechanical isolation"],
    ["BESS DC disconnect labeling issue during inspection.", "Battery Energy Storage Exposure", "Power Generation - Solar / BESS", "Moderate", "High", "Failed / Missing", "DC arc-flash and battery thermal-runaway controls"],
    ["Relay test block configuration nearly tripped wrong feeder.", "Relay / Protection Misoperation", "Relay / Protection / SCADA", "High", "Critical", "Failed / Missing", "Protection scheme and control-point verification"],
    ["Control room switching hold point was read back incorrectly.", "Control Room / Dispatch Communication Event", "Control Room / Dispatch Operations", "High", "High", "Pending Verification", "Three-part communication and hold-point control"],
    ["Hydrovac exposed unmarked secondary conduit during daylighting.", "Hydrovac Utility Damage", "Hydrovac / Vacuum Excavation", "High", "High", "Failed / Missing", "Daylighting and facility exposure verification"],
    ["Directional bore crossed marked fiber tolerance zone.", "Directional Bore Strike", "Directional Boring", "High", "Critical", "Failed / Missing", "Bore path and tolerance-zone verification"],
    ["Potholing was partial before trenching at road crossing.", "Potholing / Daylighting Miss", "Potholing / Daylighting", "Moderate", "High", "Pending Verification", "Positive facility identification"],
    ["Locate marks conflicted with as-built drawings near padmount.", "Locate Mismatch / Marking Conflict", "Trenching / Open Cut", "Moderate", "High", "Failed / Missing", "Excavation protection and utility crossing control"],
    ["Unknown service encountered during civil foundation excavation.", "Unknown Facility Encounter", "Excavation / Civil", "High", "High", "Pending Verification", "Excavation utility locate"]
  ];
  const names = ["Avery Cole", "Jordan Vale", "Taylor Reed", "Morgan Blake", "Casey Lane", "Riley Quinn", "Drew Harper", "Skyler Stone", "Rowan Pierce", "Jamie Cross", "Parker Ellis", "Kendall Brooks"];
  const projects = ["North Loop Feeder", "Mesa 230 kV Rebuild", "Canyon Substation", "West Valley URD", "Ridge Tie Line", "Airport Road Civil", "Summit Storm Patrol", "Riverbend Padmounts", "Fictional Creek Hydro", "South Mesa BESS", "Unit 4 Gas Turbine", "Control Center Desk"];
  return Array.from({ length: 40 }, (_, index) => {
    const scenario = scenarios[index % scenarios.length];
    const contractor = contractorNames[index % contractorNames.length];
    const severity = scenario[3];
    const sif = scenario[4];
    const restricted = index % 5 === 0 || severity === "Critical";
    const dueDay = String(3 + (index % 24)).padStart(2, "0");
    return blankRecord({
      id: `DEMO-${String(index + 1).padStart(3, "0")}`,
      name: names[index % names.length],
      source: index % 3 === 0 ? "IBEW Local 769" : "Contractor dispatch",
      contractor,
      priorContractor: contractorNames[(index + 2) % contractorNames.length],
      project: projects[index % projects.length],
      priorProject: projects[(index + 3) % projects.length],
      utility: ["Desert Grid Utility", "Mountain West Power", "Mesa Valley Energy"][index % 3],
      jobClass: ["Journeyman Lineworker", "Apprentice Lineworker", "Equipment Operator", "Cable Splicer", "Substation Technician"][index % 5],
      supervisor: ["Fictional Supervisor A", "Fictional Supervisor B", "Fictional Supervisor C"][index % 3],
      date: `2026-0${(index % 6) + 1}-${String(8 + (index % 18)).padStart(2, "0")}`,
      type: scenario[1],
      workType: scenario[2],
      operatingDomain: scenario[2].includes("Generation") || scenario[2].includes("Hydro") || scenario[2].includes("BESS") ? "Power Generation" :
        scenario[2].includes("Transmission") || scenario[2].includes("Reconductoring") ? "Transmission" :
        scenario[2].includes("Substation") || scenario[2].includes("Relay") ? "Substation" :
        scenario[2].includes("Underground") ? "Underground" :
        scenario[2].includes("Helicopter") ? "Helicopter / Aviation" :
        scenario[2].includes("Excavation") || scenario[2].includes("Traffic") ? "Civil / Excavation" :
        scenario[2].includes("Control Room") ? "System Operations" : "Distribution",
      assetClass: ["Feeder", "Transmission structure", "Substation bay", "Padmount transformer", "Switchyard", "Hydro unit", "BESS container", "Control desk"][index % 8],
      energySource: ["AC electrical", "Induced voltage", "DC battery", "Hydraulic stored energy", "Mechanical rotation", "Thermal / pressure", "Traffic / public exposure"][index % 7],
      programRisk: severity === "Critical" || index % 9 === 0 ? "Executive Review" : ["Elevated", "High Risk", "Critical Control Required"][index % 3],
      damageMethod: scenario[2] === "Hydrovac / Vacuum Excavation" ? "Hydrovac" :
        scenario[2] === "Directional Boring" ? "Directional Bore" :
        scenario[2] === "Potholing / Daylighting" ? "Potholing / Daylighting" :
        scenario[2] === "Trenching / Open Cut" ? "Open Cut" :
        scenario[2] === "Excavation / Civil" ? "Trenching" : "No Strike / Near Miss",
      facilityType: ["Electric Primary", "Electric Secondary", "Gas", "Fiber", "Water", "Unknown Facility", "No Damage / Good Catch"][index % 7],
      locateTicket: `811-DEMO-${String(1200 + index)}`,
      locateStatus: ["Valid", "Incorrect", "Conflicting", "Expired", "Needs Review"][index % 5],
      marksVisible: ["Yes", "Partial", "Conflicting", "No"][index % 4],
      potholingCompleted: ["Yes", "Partial", "No", "Not Required"][index % 4],
      toleranceZone: ["Yes", "Needs Review", "No", "Not Applicable"][index % 4],
      borePathVerified: scenario[2] === "Directional Boring" ? ["Changed in Field", "No", "Yes"][index % 3] : "Not Applicable",
      depthVerified: `${24 + (index % 30)} in.`,
      utilityOwner: ["Desert Grid Utility", "Municipal Fiber Group", "Western Gas Distribution", "Mesa Water Authority"][index % 4],
      ownerNotificationStatus: ["Notified", "Acknowledged", "Field Rep Dispatched", "Damage Assessment Complete", "Claim / Recovery Pending", "Closed"][index % 6],
      emergencyResponse: index % 11 === 0 ? "Yes" : "No",
      serviceInterruption: index % 13 === 0 ? "Yes" : "No",
      publicExposure: index % 9 === 0 ? "Yes" : "No",
      environmentalRelease: index % 17 === 0 ? "Yes" : "No",
      strikeSeverity: ["No Damage / Good Catch", "Coating Damage", "Service Line Damage", "Primary Electric Strike", "Gas Release", "Public Impact"][index % 6],
      damageRootCause: ["Needs Review", "Locate issue", "Crew deviation", "Print mismatch", "Unknown facility", "Depth conflict", "Poor communication"][index % 7],
      repeatStrikeFlag: index % 8 === 0 ? "Monitor" : "No",
      severity,
      sif,
      sifControl: sif === "Critical" ? "Controllable SIF" : "Needs Review",
      criticalControlStatus: scenario[5],
      criticalControlDetail: scenario[6],
      investigation: ["Under Review", "Evidence Collected", "Contractor Response Requested", "Safety Review Completed", "Corrective Action Assigned", "Closed"][index % 6],
      evidence: ["Partial", "Complete", "Pending Upload"][index % 3],
      access: restricted ? ["Under Review", "Restricted", "Suspended", "Banned From Site"][index % 4] : ["Clear", "Monitor"][index % 2],
      scope: restricted ? ["Temporary pending review", "Project restricted", "Utility customer restricted", "Reinstated with conditions"][index % 4] : "No restriction pending fact review",
      action: `Verify ${scenario[6].toLowerCase()} and document contractor response.`,
      reinstatement: `2026-07-${dueDay}`,
      authority: ["Safety Manager", "Operations Manager", "Contractor Oversight Lead"][index % 3],
      repeat: index % 6 === 0,
      banned: index % 17 === 0 ? "Yes" : "No",
      disposition: restricted ? "Substantiated" : "Pending",
      notes: `TEST RECORD - sanitized for prototype evaluation. ${scenario[0]}`,
      stopWork: index % 4 === 0 ? "Yes" : "No",
      removedFromSite: restricted ? "Yes" : "No",
      utilityRestriction: restricted && index % 2 === 0 ? "Yes" : "No",
      rca: index % 4 === 0 ? "Complete" : "In Review",
      correctiveStatus: index % 7 === 0 ? "Closed" : "Open",
      verificationMethod: ["Supervisor field verification", "Safety observation", "Training record review", "Crew stand-down"][index % 4],
      fieldVerification: index % 4 === 0 ? "Completed" : "Required",
      accessImpact: restricted ? "Access restriction active" : "No access impact",
      closureApproval: index % 4 === 0 ? "Approved for closure" : "Safety approval required",
      reinstatementRequired: restricted ? ["Required", "Conditional", "Pending Review"][index % 3] : "Not Required",
      trainingRequired: restricted ? ["Required", "Completed", "Pending Review"][index % 3] : "Not Required",
      coachingCompleted: index % 3 === 0 ? "Yes" : "No",
      fieldObservation: index % 4 === 0 ? "Completed" : "Pending",
      competency: index % 4 === 0 ? "Verified" : "Pending",
      supervisorApproval: index % 4 === 0 ? "Approved" : "Pending",
      safetyApproval: index % 5 === 0 ? "Approved" : "Pending",
      customerApproval: index % 6 === 0 ? "Pending" : "Not Required",
      returnStatus: restricted ? ["Not Cleared", "Conditional", "Cleared"][index % 3] : "Cleared",
      conditionalAccessNotes: restricted ? "Conditional access requires documented coaching, field observation, and manager approval." : "",
      managementReview: index % 5 === 0 ? "Complete" : "Active",
      createdBy: currentUser?.id || "demo",
      createdByEmail: currentUser?.email || "demo@example.invalid"
    });
  });
}

function buildDemoReports() {
  const titles = [
    "Weekly Safety Summary",
    "Contractor Risk Summary",
    "Open Corrective Actions",
    "Restricted Worker Summary",
    "SIF Potential Trend",
    "Critical Controls Failure Summary",
    "Reinstatement Pending Report",
    "High-Risk Work Lookahead",
    "Transmission / Substation Risk Review",
    "Power Generation Readiness Review",
    "System Operations Communication Review",
    "Underground Strike Summary",
    "Hydrovac Damage Prevention Report",
    "Contractor Bore Strike Trend",
    "Locate Quality / Mismatch Report",
    "Open Utility Owner Notifications",
    "Good Catch Report",
    "Stop Work Report"
  ];
  return titles.map((title, index) => ({
    id: `DEMO-RPT-${String(index + 1).padStart(2, "0")}`,
    title,
    date: `2026-07-${String(index + 1).padStart(2, "0")}`,
    owner: "Safety Program Review",
    notes: `Fictional manager-review summary for ${title.toLowerCase()}.`,
    createdBy: currentUser?.id || "demo",
    createdByEmail: currentUser?.email || "demo@example.invalid"
  }));
}

function applyDemoState() {
  const raw = localStorage.getItem(demoStorageKey);
  if (!raw) {
    document.body.classList.remove("demo-active");
    return;
  }
  try {
    const demo = JSON.parse(raw);
    state.records = Array.isArray(demo.records) ? demo.records.map((record) => blankRecord(record)) : state.records;
    state.reportRecords = Array.isArray(demo.reportRecords) ? demo.reportRecords : state.reportRecords;
    document.body.classList.add("demo-active");
  } catch (_error) {
    localStorage.removeItem(demoStorageKey);
    document.body.classList.remove("demo-active");
  }
}

function loadDemoData() {
  const demo = { records: buildDemoRecords(), reportRecords: buildDemoReports() };
  localStorage.setItem(demoStorageKey, JSON.stringify(demo));
  applyDemoState();
  closeEditor();
  renderAll();
}

async function resetDemoData() {
  localStorage.removeItem(demoStorageKey);
  document.body.classList.remove("demo-active");
  await loadRemoteState();
  closeEditor();
  renderAll();
}

function submittedRecordFromForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const accessByAction = {
    "Temporary Pending Review": ["Under Review", "Temporary pending review", "Pending"],
    "No Restriction Pending Facts": ["Clear", "None pending fact review", "Pending"],
    "Site-Specific Restriction": ["Restricted", "Site-specific restriction pending review", "Substantiated"],
    "Suspended Pending Review": ["Suspended", "Suspended pending review", "Substantiated"],
    "Banned From Site": ["Banned From Site", "Site access removed", "Substantiated"]
  };
  const [access, scope, disposition] = accessByAction[data.accessAction] || accessByAction["Temporary Pending Review"];

  return blankRecord({
    id: data.badgeId.trim() || newId("REC"),
    name: data.workerName.trim() || "Name pending review",
    source: data.source || "Intake Form",
    contractor: data.contractor || "",
    supervisor: data.supervisor || "",
    project: data.project || "",
    utility: data.utility || "",
    date: data.eventDate || today(),
    operatingDomain: data.operatingDomain || "Distribution",
    workType: data.workType || workTypes[0],
    assetClass: data.assetClass || "",
    energySource: data.energySource || "",
    programRisk: data.programRisk || "Elevated",
    type: data.eventCategory,
    severity: data.severity,
    sif: data.sif,
    sifControl: data.sifControl || "Needs Review",
    criticalControlStatus: data.criticalControlStatus || "Pending Verification",
    criticalControlDetail: data.criticalControlDetail || "",
    damageMethod: data.damageMethod || "No Strike / Near Miss",
    facilityType: data.facilityType || "No Damage / Good Catch",
    locateTicket: data.locateTicket || "",
    locateStatus: data.locateStatus || "Needs Review",
    marksVisible: data.marksVisible || "Not Applicable",
    potholingCompleted: data.potholingCompleted || "Not Required",
    toleranceZone: data.toleranceZone || "Not Applicable",
    borePathVerified: data.borePathVerified || "Not Applicable",
    ownerNotificationStatus: data.ownerNotificationStatus || "Not Required",
    strikeSeverity: data.strikeSeverity || "No Damage / Good Catch",
    damageRootCause: data.locateStatus === "Incorrect" || data.locateStatus === "Conflicting" ? "Locate issue" : "Needs Review",
    investigation: data.investigation || "Under Review",
    evidence: data.evidence || "Partial",
    action: data.correctiveRequired === "Yes" ? `Corrective action required for ${data.criticalControlDetail || data.eventCategory}` : "",
    correctiveStatus: data.correctiveRequired === "No" ? "Closed" : "Open",
    reinstatementRequired: data.reinstatementRequired || "Pending Review",
    trainingRequired: data.reinstatementRequired === "Required" ? "Required" : "Pending Review",
    competency: data.reinstatementRequired === "Required" ? "Pending" : "Not Required",
    supervisorApproval: data.reinstatementRequired === "Not Required" ? "Not Required" : "Pending",
    safetyApproval: data.reinstatementRequired === "Not Required" ? "Not Required" : "Pending",
    returnStatus: data.reinstatementRequired === "Not Required" ? "Cleared" : "Not Cleared",
    accessImpact: scope,
    access,
    scope,
    disposition,
    notes: data.eventSummary.trim(),
    stopWork: ["High", "Critical"].includes(data.severity) || ["High", "Critical"].includes(data.sif) ? "Yes" : "No",
    removedFromSite: ["Restricted", "Suspended", "Banned From Site"].includes(access) ? "Yes" : "No",
    banned: access === "Banned From Site" ? "Yes" : "No"
  });
}

async function submitForReview(event) {
  event.preventDefault();
  if (!canWrite()) return alert("Your account does not have permission to submit records.");
  const form = event.currentTarget;
  const submitButton = document.getElementById("submitForReview");
  const message = document.getElementById("submissionMessage");
  const record = submittedRecordFromForm(form);
  const evidenceFiles = form.elements.evidenceFiles?.files || [];
  submitButton.disabled = true;
  message.classList.remove("error-message");
  message.textContent = evidenceFiles.length ? "Uploading evidence and submitting record..." : "Submitting record...";
  try {
    record.evidenceAttachments = await uploadEvidenceFiles(evidenceFiles, record.id);
    if (record.evidenceAttachments.length) record.evidence = "Complete";
    const saved = await saveAccessRecord(record);
    if (!saved) return;
    state.records.unshift(record);
    renderAll();
    form.reset();
    document.getElementById("eventCategorySelect").selectedIndex = 0;
    message.textContent = record.evidenceAttachments.length ? "Record submitted with evidence attached." : "Record submitted for review.";
    switchPage("incidents");
  } catch (error) {
    message.classList.add("error-message");
    message.textContent = `Unable to submit record: ${error.message}`;
    alert(`Unable to submit record: ${error.message}`);
  } finally {
    submitButton.disabled = false;
  }
}

async function clearLocalRecords() {
  const confirmed = window.confirm("Clear old local browser records from this device? Shared database records will not be deleted.");
  if (!confirmed) return;
  localStorage.removeItem(storageKey);
  oldStorageKeys.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem(demoStorageKey);
  Object.keys(localStorage)
    .filter((key) => key.toLowerCase().includes("safetyaccess"))
    .forEach((key) => localStorage.removeItem(key));
  await loadRemoteState();
  closeEditor();
  renderAll();
}

function switchPage(pageId) {
  if (pageId === "userApprovals" && !isAdmin()) return;
  document.querySelectorAll(".page").forEach((page) => page.classList.toggle("active-page", page.id === pageId));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.page === pageId));
}

function exportCsv() {
  if (!canExport()) return alert("Only admins can export records.");
  const headers = ["Record ID", "Worker / Record Name", "Contractor", "Source", "Project / Site", "Utility Customer", "Job Classification", "Event Date", "Incident Type", "Severity", "SIF Potential", "Investigation Status", "Evidence Status", "Access Status", "Banned From Site", "Restriction Scope", "Corrective Action", "Corrective Action Owner", "Review Date", "Final Disposition", "Notes", "Last Updated"];
  const rows = activeRecords().map((r) => [r.id, r.name, r.contractor, r.source, r.project, r.utility, r.jobClass, r.date, r.type, r.severity, r.sif, r.investigation, r.evidence, r.access, r.banned, r.scope, r.action, r.authority, r.reinstatement, r.disposition, r.notes, r.updated]);
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell || "").replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "safety_access_control_matrix_export.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}

function importCsvFile(file) {
  if (!canWrite()) return alert("Your account does not have permission to import records.");
  const reader = new FileReader();
  reader.onload = async () => {
    const rows = parseCsv(String(reader.result || ""));
    const [, ...dataRows] = rows;
    const csvRecords = dataRows.map((row) => blankRecord({
      id: row[0] || newId("REC"),
      name: row[1] || "",
      contractor: row[2] || "",
      source: row[3] || "CSV Import",
      project: row[4] || "",
      utility: row[5] || "",
      jobClass: row[6] || "",
      date: row[7] || today(),
      type: row[8] || eventCategories[0],
      severity: row[9] || "Moderate",
      sif: row[10] || "Moderate",
      investigation: row[11] || "Event Reported",
      evidence: row[12] || "Partial",
      access: row[13] || "Under Review",
      banned: row[14] || "No",
      scope: row[15] || "",
      action: row[16] || "",
      authority: row[17] || "",
      reinstatement: row[18] || "",
      disposition: row[19] || "Pending",
      notes: row[20] || "",
      updated: row[21] || today()
    }));

    try {
      for (const record of csvRecords) {
        const saved = await saveAccessRecord(record);
        if (!saved) return;
      }
      state.records.unshift(...csvRecords);
      renderAll();
    } catch (error) {
      alert(`Unable to import CSV records: ${error.message}`);
    }
  };
  reader.readAsText(file);
}

function addPageButtons() {
  document.getElementById("incidentList").insertAdjacentHTML("beforebegin", '<div class="section-actions"><button class="primary-btn" id="addIncident">Add Incident</button></div>');
  document.getElementById("restrictedList").insertAdjacentHTML("beforebegin", '<div class="section-actions"><button class="primary-btn" id="addRestricted">Add Restricted/Banned Record</button></div>');
  document.getElementById("correctiveList").insertAdjacentHTML("beforebegin", '<div class="section-actions"><button class="primary-btn" id="addCorrective">Add Corrective Action</button></div>');
  document.getElementById("addIncident").addEventListener("click", () => openRecordEditor(blankRecord({ source: "Manual Incident", investigation: "Event Reported" }), "Incident"));
  document.getElementById("addRestricted").addEventListener("click", () => openRecordEditor(blankRecord({ source: "Manual Restricted/Banned Record", access: "Restricted", removedFromSite: "Yes", disposition: "Substantiated" }), "Restricted/Banned Record"));
  document.getElementById("addCorrective").addEventListener("click", () => openRecordEditor(blankRecord({ source: "Manual Corrective Action", correctiveStatus: "Open", investigation: "Corrective Action Assigned" }), "Corrective Action"));
}

function handleDocumentClick(event) {
  const editRecordId = event.target.dataset.editRecord;
  const deleteRecordId = event.target.dataset.deleteRecord;
  const editReportId = event.target.dataset.editReport;
  const deleteReportId = event.target.dataset.deleteReport;
  const editRoleId = event.target.dataset.editRole;
  const deleteRoleId = event.target.dataset.deleteRole;
  const approveUserId = event.target.dataset.approveUser;
  const disableUserId = event.target.dataset.disableUser;
  const updateUserRoleId = event.target.dataset.updateUserRole;

  if (editRecordId) openRecordEditor(state.records.find((record) => record.id === editRecordId), "Record");
  if (deleteRecordId) deleteRecord(deleteRecordId);
  if (editReportId) openReportEditor(state.reportRecords.find((record) => record.id === editReportId));
  if (deleteReportId) deleteReport(deleteReportId);
  if (editRoleId) openRoleEditor(state.roles.find((role) => role.id === editRoleId));
  if (deleteRoleId) deleteRole(deleteRoleId);
  if (approveUserId) updateUserProfile(approveUserId, { approved: true }, "User approved.");
  if (disableUserId) updateUserProfile(disableUserId, { approved: false }, "User disabled.");
  if (updateUserRoleId) {
    const role = findRoleSelect(updateUserRoleId)?.value || "viewer";
    updateUserProfile(updateUserRoleId, { role }, "Role updated.");
  }
}

async function init() {
  if (document.getElementById("editorHost")) return;
  document.querySelector(".workspace").insertAdjacentHTML("afterbegin", '<div id="editorHost"></div>');
  addPageButtons();
  await initDatabase();
  await loadRemoteState();
  renderAll();

  document.querySelectorAll("[data-page], [data-page-link]").forEach((button) => {
    button.addEventListener("click", () => switchPage(button.dataset.page || button.dataset.pageLink));
  });
  ["globalSearch", "statusFilter", "contractorFilter", "severityFilter", "utilityFilter", "projectFilter", "incidentTypeFilter", "workTypeFilter", "domainFilter", "bannedFilter"].forEach((id) => document.getElementById(id).addEventListener("input", () => {
    renderMatrix();
    renderIncidents();
    renderCorrective();
    renderReports();
  }));
  document.getElementById("clearFilters").addEventListener("click", () => {
    ["statusFilter", "contractorFilter", "severityFilter", "utilityFilter", "projectFilter", "incidentTypeFilter", "workTypeFilter", "domainFilter", "bannedFilter"].forEach((id) => {
      document.getElementById(id).value = "";
    });
    document.getElementById("globalSearch").value = "";
    renderMatrix();
    renderIncidents();
    renderCorrective();
    renderReports();
  });
  document.getElementById("exportBtn").addEventListener("click", exportCsv);
  document.getElementById("reportCsvExport").addEventListener("click", exportCsv);
  document.getElementById("reportCsvImport").addEventListener("click", () => document.getElementById("csvImportInput").click());
  document.getElementById("csvImportInput").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) importCsvFile(file);
    event.target.value = "";
  });
  document.getElementById("reportPdfExport").addEventListener("click", () => window.print());
  document.getElementById("printReport").addEventListener("click", () => window.print());
  document.getElementById("loadDemoData").addEventListener("click", loadDemoData);
  document.getElementById("resetDemoData").addEventListener("click", resetDemoData);
  document.getElementById("addWorker").addEventListener("click", () => openRecordEditor(blankRecord({ source: "Manual Worker Matrix Entry" }), "Manual Matrix Entry / Backfill Record"));
  document.getElementById("appLogoutBtn").addEventListener("click", logoutAccessGate);
  document.getElementById("intakeForm").addEventListener("submit", submitForReview);
  document.addEventListener("click", handleDocumentClick);
  window.addEventListener("resize", renderCharts);
}

async function bootstrapAccessGate() {
  document.getElementById("accessGateForm").addEventListener("submit", verifyAccessCode);
  if (isAccessUnlocked()) {
    await evaluateAccess();
  } else {
    showAccessGate();
  }
}

bootstrapAccessGate();
