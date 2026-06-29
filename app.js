const eventCategories = [
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
  "Repeat Unsafe Conduct"
];

const savedRecordsKey = "safetyAccessSubmittedRecords";

const workers = [
  {
    id: "BADGE-1047",
    name: "Marcus Hale",
    source: "IBEW Local 111",
    contractor: "Ward Electric",
    priorContractor: "Sturgeon Electric",
    project: "Foothills 230kV Rebuild",
    priorProject: "North Ridge Substation",
    date: "2026-06-18",
    type: "Energized Work / Minimum Approach Distance",
    severity: "Critical",
    sif: "Critical",
    investigation: "Final Access Decision",
    evidence: "Complete",
    access: "Owner-Wide Access Revoked",
    scope: "Owner-controlled projects",
    action: "Executive safety review, retraining, documented competency review",
    reinstatement: "2026-09-18",
    authority: "Director Safety and Operations",
    updated: "2026-06-28",
    repeat: true
  },
  {
    id: "BADGE-0872",
    name: "Elena Ruiz",
    source: "Union Hall Dispatch",
    contractor: "PAR",
    priorContractor: "PAR",
    project: "Canyon Transmission Patrol",
    priorProject: "Mesa Tap Repair",
    date: "2026-06-11",
    type: "Suspended Load / Crane Zone",
    severity: "High",
    sif: "High",
    investigation: "Corrective Action Assigned",
    evidence: "Complete",
    access: "Cleared With Conditions",
    scope: "Crane zone exclusion until refresher complete",
    action: "Lift-plan briefing and spotter verification",
    reinstatement: "2026-07-12",
    authority: "Regional Safety Manager",
    updated: "2026-06-26",
    repeat: false
  },
  {
    id: "BADGE-1421",
    name: "Derrick Shaw",
    source: "IBEW Local 68",
    contractor: "Q3 Contracting",
    priorContractor: "Ward Electric",
    project: "Downtown Feeder Civil",
    priorProject: "West Yard Storm Response",
    date: "2026-06-07",
    type: "Excavation / Trenching",
    severity: "High",
    sif: "High",
    investigation: "Contractor Response Requested",
    evidence: "Partial",
    access: "Pending Review",
    scope: "Temporary pending review",
    action: "Competent person review pending",
    reinstatement: "2026-07-05",
    authority: "Access Review Committee",
    updated: "2026-06-24",
    repeat: false
  },
  {
    id: "BADGE-1163",
    name: "Jamal Nguyen",
    source: "Crux Dispatch",
    contractor: "Crux Micropiling",
    priorContractor: "Q3 Contracting",
    project: "River Crossing Foundation",
    priorProject: "Prairie Wind Tap",
    date: "2026-05-26",
    type: "Falsification of Safety Documentation",
    severity: "Critical",
    sif: "High",
    investigation: "Safety Review Completed",
    evidence: "Complete",
    access: "Restricted",
    scope: "Document control and field lead duties",
    action: "Ethics acknowledgement, supervisor signoff, audit sampling",
    reinstatement: "2026-08-01",
    authority: "Contractor Safety Governance",
    updated: "2026-06-20",
    repeat: true
  },
  {
    id: "BADGE-0996",
    name: "Priya Shah",
    source: "Sturgeon Direct Hire",
    contractor: "Sturgeon Electric",
    priorContractor: "Sturgeon Electric",
    project: "Airport Substation Upgrade",
    priorProject: "Airport Substation Upgrade",
    date: "2026-05-19",
    type: "Lockout Tagout",
    severity: "Moderate",
    sif: "Moderate",
    investigation: "Closed",
    evidence: "Complete",
    access: "Unsubstantiated / No Restriction",
    scope: "None",
    action: "No corrective action assigned after review",
    reinstatement: "N/A",
    authority: "Site Safety Lead",
    updated: "2026-06-15",
    repeat: false
  },
  {
    id: "BADGE-1510",
    name: "Owen Carter",
    source: "IBEW Local 111",
    contractor: "Ward Electric",
    priorContractor: "PAR",
    project: "South Loop Distribution",
    priorProject: "Canyon Transmission Patrol",
    date: "2026-04-30",
    type: "Repeat Unsafe Conduct",
    severity: "High",
    sif: "Critical",
    investigation: "Reinstatement Review Scheduled",
    evidence: "Complete",
    access: "Restricted",
    scope: "Site access limited to supervised tasks",
    action: "30-day observation plan and foreman coaching log",
    reinstatement: "2026-07-01",
    authority: "Access Review Committee",
    updated: "2026-06-22",
    repeat: true
  },
  {
    id: "BADGE-1622",
    name: "Nora Blake",
    source: "Q3 Dispatch",
    contractor: "Q3 Contracting",
    priorContractor: "Q3 Contracting",
    project: "North Metro Gas Joint Trench",
    priorProject: "Downtown Feeder Civil",
    date: "2026-06-21",
    type: "Vehicle / Equipment Operation",
    severity: "High",
    sif: "High",
    investigation: "Evidence Collected",
    evidence: "Partial",
    access: "Pending Review",
    scope: "Equipment operation hold",
    action: "Telematics review and operator evaluation",
    reinstatement: "2026-07-20",
    authority: "Fleet Safety Manager",
    updated: "2026-06-27",
    repeat: false
  },
  {
    id: "BADGE-1714",
    name: "Ty Bennett",
    source: "PAR Direct Hire",
    contractor: "PAR",
    priorContractor: "Ward Electric",
    project: "Mesa Tap Repair",
    priorProject: "Foothills 230kV Rebuild",
    date: "2026-04-14",
    type: "Fall Protection",
    severity: "Moderate",
    sif: "High",
    investigation: "Closed",
    evidence: "Complete",
    access: "Cleared",
    scope: "None",
    action: "Completed refresher and supervisor observation",
    reinstatement: "2026-05-14",
    authority: "Regional Safety Manager",
    updated: "2026-05-20",
    repeat: false
  }
];

const workflow = [
  "Event Reported",
  "Temporary Pending Review",
  "Evidence Collected",
  "Contractor Response Requested",
  "Safety Review Completed",
  "Final Access Decision",
  "Corrective Action Assigned",
  "Reinstatement Review Scheduled",
  "Closed"
];

const rolePermissions = [
  ["Executive Viewer", "Dashboard, restricted list summary, reinstatement status"],
  ["Safety Reviewer", "Investigation review, evidence status, corrective action decisions"],
  ["Contractor Admin", "Contractor response, evidence upload, notification acknowledgement"],
  ["Project Manager", "Current project eligibility, conditions, and site-level restrictions"],
  ["Audit Administrator", "Full audit trail, retention settings, permission management"],
  ["Legal / Labor Relations", "Due-process notes, substantiation status, appeal documentation"]
];

const workerDetails = {
  "BADGE-1047": ["Xcel Energy", "Journeyman Lineman", "Yes", "Owner-wide revocation pending executive reinstatement", "Repeat SIF-potential minimum approach distance violation after documented coaching"],
  "BADGE-0872": ["Xcel Energy", "Helicopter Lineworker", "No", "Cleared with conditions", "Restricted from crane-zone work until lift-plan refresher is verified"],
  "BADGE-1421": ["Xcel Energy", "Equipment Operator", "No", "Pending", "Contractor response and trench competent-person documentation requested"],
  "BADGE-1163": ["Xcel Energy", "Foundation Foreman", "No", "Restricted duties", "Documentation falsification review requires audit sampling before full restoration"],
  "BADGE-0996": ["Xcel Energy", "Substation Technician", "No", "No restriction", "Unsubstantiated after evidence and witness review"],
  "BADGE-1510": ["Xcel Energy", "Groundman", "No", "Eligible after review", "Reinstatement requires 30-day observation plan closeout"],
  "BADGE-1622": ["Xcel Energy", "Heavy Equipment Operator", "No", "Pending", "Equipment operation hold while telematics and observer statements are reviewed"],
  "BADGE-1714": ["Xcel Energy", "Journeyman Lineman", "No", "Cleared", "Completed fall protection refresher and supervisor observation"]
};

workers.forEach((worker) => {
  const [utility, jobClass, banned, disposition, notes] = workerDetails[worker.id] || ["Xcel Energy", "Field Craft", "No", "Pending", "Mock worker record for prototype review"];
  const legacyAccess = worker.access;
  const accessLabel = {
    "Cleared": "Clear",
    "Pending Review": "Under Review",
    "Restricted": "Restricted",
    "Cleared With Conditions": "Monitor",
    "Owner-Wide Access Revoked": "Banned From Site",
    "Unsubstantiated / No Restriction": "Clear"
  }[legacyAccess] || legacyAccess;
  Object.assign(worker, {
    legacyAccess,
    access: accessLabel,
    utility,
    jobClass,
    banned: legacyAccess.includes("Revoked") ? "Yes" : banned,
    disposition,
    notes,
    stopWork: worker.severity === "Critical" || worker.sif === "Critical" ? "Yes" : "No",
    removedFromSite: legacyAccess.includes("Revoked") || accessLabel === "Restricted" ? "Yes" : "No",
    utilityRestriction: legacyAccess.includes("Revoked") ? "Yes" : "No",
    rca: worker.evidence === "Complete" ? "In Review" : "Open",
    correctiveStatus: worker.investigation.includes("Closed") ? "Verified" : "Open",
    reDispatchConcern: worker.repeat || legacyAccess.includes("Revoked") ? "Yes" : "Monitor",
    managementReview: worker.investigation === "Closed" ? "Complete" : "Active"
  });
});

loadSubmittedRecords();

function chipClass(value) {
  if (value.includes("Revoked") || value === "Banned From Site" || value === "Critical") return "red";
  if (value.includes("Restricted") || value.includes("Pending") || value === "Under Review" || value === "Suspended" || value === "High") return "orange";
  if (value.includes("Clear") || value === "Complete" || value === "Low" || value === "Verified") return "green";
  if (value === "Moderate") return "blue";
  return "gray";
}

function chip(value) {
  return `<span class="chip ${chipClass(value)}">${value}</span>`;
}

function countWhere(predicate) {
  return workers.filter(predicate).length;
}

function renderKpis() {
  const kpis = [
    ["Total Active Workers", workers.length, "Prototype worker records"],
    ["Workers Under Review", countWhere((w) => w.access === "Under Review"), "Needs due-process review"],
    ["Restricted Access Count", countWhere((w) => w.access === "Restricted"), "Site or task restrictions"],
    ["Banned From Site Count", countWhere((w) => w.banned === "Yes" || w.access === "Banned From Site"), "Executive authority only"],
    ["Open Corrective Actions", countWhere((w) => w.correctiveStatus === "Open"), "Assigned or pending verification"],
    ["High-Severity Incidents", countWhere((w) => ["High", "Critical"].includes(w.severity)), "High, serious, or SIF potential"],
    ["Upcoming Review Dates", countWhere((w) => w.reinstatement !== "N/A" && w.reinstatement <= "2026-07-20"), "Next 30 days"]
  ];

  document.getElementById("kpiGrid").innerHTML = kpis
    .map(([label, value, note]) => `<article class="kpi-card"><span>${label}</span><strong>${value}</strong><em>${note}</em></article>`)
    .join("");
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

function renderCharts() {
  drawBarChart("categoryChart", ["Energized", "Crane Zone", "Trenching", "LOTO", "Repeat", "Vehicle"], [3, 2, 2, 1, 3, 2], ["#2563eb", "#dc2626", "#ea580c"]);
  drawBarChart("statusChart", ["Q3 25", "Q4 25", "Q1 26", "Q2 26"], [4, 6, 5, 8], ["#2563eb", "#15803d"]);
  drawBarChart("repeatChart", ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], [1, 1, 2, 2, 3, 3], ["#c2410c"]);
  drawBarChart("contractorChart", ["Ward", "PAR", "Q3", "Sturgeon", "Crux"], [4, 3, 3, 1, 1], ["#2563eb", "#ea580c", "#15803d", "#64748b"]);
}

function renderFilters() {
  const filterLabels = {
    statusFilter: "All access statuses",
    contractorFilter: "All contractors",
    severityFilter: "All severities",
    utilityFilter: "All utility customers",
    projectFilter: "All projects / sites",
    incidentTypeFilter: "All incident types",
    bannedFilter: "All banned statuses"
  };
  const addOptions = (id, values) => {
    const select = document.getElementById(id);
    const selected = select.value;
    select.innerHTML = `<option value="">${filterLabels[id]}</option>`;
    select.innerHTML += [...new Set(values)].sort().map((value) => `<option value="${value}">${value}</option>`).join("");
    select.value = [...select.options].some((option) => option.value === selected) ? selected : "";
  };
  addOptions("statusFilter", workers.map((w) => w.access));
  addOptions("contractorFilter", workers.map((w) => w.contractor));
  addOptions("severityFilter", workers.map((w) => w.severity));
  addOptions("utilityFilter", workers.map((w) => w.utility));
  addOptions("projectFilter", workers.map((w) => w.project));
  addOptions("incidentTypeFilter", workers.map((w) => w.type));
  addOptions("bannedFilter", workers.map((w) => w.banned));
  document.getElementById("eventCategorySelect").innerHTML = eventCategories.map((category) => `<option>${category}</option>`).join("");
}

function renderAll() {
  renderKpis();
  renderFilters();
  renderCharts();
  renderMatrix();
  renderAlerts();
  renderWorkflow();
  renderRecordLists();
  renderIncidents();
  renderCorrective();
  renderReports();
  renderNotifications();
}

function activeWorkers() {
  const text = document.getElementById("globalSearch").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;
  const contractor = document.getElementById("contractorFilter").value;
  const severity = document.getElementById("severityFilter").value;
  const utility = document.getElementById("utilityFilter").value;
  const project = document.getElementById("projectFilter").value;
  const incidentType = document.getElementById("incidentTypeFilter").value;
  const banned = document.getElementById("bannedFilter").value;
  return workers.filter((worker) => {
    const searchable = Object.values(worker).join(" ").toLowerCase();
    return (!text || searchable.includes(text)) && (!status || worker.access === status) && (!contractor || worker.contractor === contractor) && (!severity || worker.severity === severity) && (!utility || worker.utility === utility) && (!project || worker.project === project) && (!incidentType || worker.type === incidentType) && (!banned || worker.banned === banned);
  });
}

function renderMatrix() {
  document.getElementById("matrixBody").innerHTML = activeWorkers()
    .map(
      (w) => `<tr>
        <td>${w.id}</td><td><strong>${w.name}</strong></td><td>${w.source}</td><td>${w.contractor}</td><td>${w.priorContractor}</td>
        <td>${w.project}</td><td>${w.utility}</td><td>${w.jobClass}</td><td>${w.priorProject}</td><td>${w.date}</td><td>${w.type}</td><td>${chip(w.severity)}</td>
        <td>${chip(w.sif)}</td><td>${w.investigation}</td><td>${chip(w.evidence)}</td><td>${chip(w.access)}</td><td>${chip(w.banned)}</td><td>${w.scope}</td>
        <td>${w.action}</td><td>${w.reinstatement}</td><td>${w.authority}</td><td>${w.disposition}</td><td>${w.notes}</td><td>${w.updated}</td>
      </tr>`
    )
    .join("");
}

function renderAlerts() {
  const risky = workers.filter((w) => w.sif === "Critical" || w.repeat);
  document.getElementById("alertList").innerHTML = risky
    .map((w) => `<div class="alert-item"><div><strong>${w.name}</strong><div class="meta">${w.id} | ${w.contractor} | ${w.project}</div></div><div>${w.type}<div class="meta">${w.investigation}</div></div><div>${chip(w.access)}</div></div>`)
    .join("");
}

function renderWorkflow() {
  document.getElementById("workflowBoard").innerHTML = workflow
    .map((stage) => {
      const stageWorkers = workers.filter((w) => w.investigation === stage).slice(0, 2);
      return `<section class="workflow-column"><h3>${stage}</h3>${stageWorkers
        .map((w) => `<div class="workflow-card-item"><strong>${w.name}</strong><span class="meta">${w.contractor} | ${w.type}</span>${chip(w.access)}</div>`)
        .join("") || '<div class="meta">No active records</div>'}</section>`;
    })
    .join("");
}

function renderRecordLists() {
  document.getElementById("restrictedList").innerHTML = workers
    .filter((w) => w.access === "Restricted" || w.access === "Banned From Site" || w.banned === "Yes")
    .map((w) => `<div class="record-item"><div><strong>${w.name}</strong><div class="meta">${w.id} | ${w.contractor}</div></div><div>${w.scope}<div class="meta">${w.action}</div></div><div>${chip(w.access)}</div></div>`)
    .join("");

  document.getElementById("reinstatementList").innerHTML = workers
    .filter((w) => w.reinstatement !== "N/A")
    .sort((a, b) => a.reinstatement.localeCompare(b.reinstatement))
    .map((w) => `<div class="record-item"><div><strong>${w.name}</strong><div class="meta">Review date ${w.reinstatement}</div></div><div>${w.action}<div class="meta">Authority: ${w.authority}</div></div><div>${chip(w.access)}</div></div>`)
    .join("");
}

function renderIncidents() {
  document.getElementById("incidentList").innerHTML = activeWorkers()
    .map((w) => `<div class="record-item"><div><strong>${w.date} | ${w.type}</strong><div class="meta">${w.name} | ${w.contractor} | ${w.project}</div></div><div>${w.notes}<div class="meta">Stop work: ${w.stopWork} | Removed from site: ${w.removedFromSite} | Utility restriction: ${w.utilityRestriction}</div><div class="meta">RCA: ${w.rca} | Corrective action: ${w.correctiveStatus} | Re-dispatch concern: ${w.reDispatchConcern}</div></div><div>${chip(w.managementReview)}</div></div>`)
    .join("");
}

function renderCorrective() {
  document.getElementById("correctiveList").innerHTML = activeWorkers()
    .filter((w) => w.correctiveStatus === "Open" || w.access === "Monitor")
    .map((w) => `<div class="record-item"><div><strong>${w.action}</strong><div class="meta">${w.name} | Owner: ${w.authority}</div></div><div>Due / review date: ${w.reinstatement}<div class="meta">Access impact: ${w.access} | Evidence: ${w.evidence}</div></div><div>${chip(w.correctiveStatus)}</div></div>`)
    .join("");
}

function renderReports() {
  const current = activeWorkers();
  const items = [
    ["Filtered worker records", current.length],
    ["Under review", current.filter((w) => w.access === "Under Review").length],
    ["Restricted or banned", current.filter((w) => w.access === "Restricted" || w.access === "Banned From Site").length],
    ["Banned from site", current.filter((w) => w.banned === "Yes" || w.access === "Banned From Site").length],
    ["Open corrective actions", current.filter((w) => w.correctiveStatus === "Open").length],
    ["High or critical severity", current.filter((w) => ["High", "Critical"].includes(w.severity)).length]
  ];
  document.getElementById("reportSummary").innerHTML = items.map(([label, value]) => `<div class="summary-item"><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function addMockRecord() {
  const next = workers.length + 1001;
  const worker = {
    id: `BADGE-${next}`,
    name: `Access Review Worker ${next}`,
    source: "Union Hall Dispatch",
    contractor: "Ward Electric",
    priorContractor: "N/A",
    project: "Access Review Deployment Site",
    priorProject: "N/A",
    date: "2026-06-29",
    type: "Repeat Unsafe Conduct",
    severity: "High",
    sif: "High",
    investigation: "Event Reported",
    evidence: "Partial",
    access: "Under Review",
    scope: "Temporary pending review",
    action: "Management review and documented coaching",
    reinstatement: "2026-07-29",
    authority: "Safety Manager",
    updated: "2026-06-29",
    repeat: false,
    utility: "Xcel Energy",
    jobClass: "Field Craft",
    banned: "No",
    disposition: "Pending",
    notes: "Access review record added from the prototype UI to demonstrate new-record flow.",
    stopWork: "No",
    removedFromSite: "No",
    utilityRestriction: "No",
    rca: "Open",
    correctiveStatus: "Open",
    reDispatchConcern: "Monitor",
    managementReview: "Active",
    submitted: true
  };
  workers.unshift(worker);
  saveSubmittedRecords();
  renderAll();
}

function loadSubmittedRecords() {
  try {
    const savedRecords = JSON.parse(localStorage.getItem(savedRecordsKey) || "[]");
    if (Array.isArray(savedRecords)) {
      workers.unshift(...savedRecords);
    }
  } catch (error) {
    console.warn("Unable to load submitted safety access records.", error);
  }
}

function saveSubmittedRecords() {
  localStorage.setItem(savedRecordsKey, JSON.stringify(workers.filter((worker) => worker.submitted)));
}

function submittedRecordFromForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const today = new Date().toISOString().slice(0, 10);
  const accessByAction = {
    "Temporary Pending Review": ["Under Review", "Temporary pending review", "Pending"],
    "No Restriction Pending Facts": ["Clear", "None pending fact review", "Pending"],
    "Site-Specific Restriction": ["Restricted", "Site-specific restriction pending review", "Restricted duties"]
  };
  const [access, scope, disposition] = accessByAction[data.accessAction] || accessByAction["Temporary Pending Review"];

  return {
    id: data.badgeId.trim() || `BADGE-${Date.now()}`,
    name: data.workerName.trim() || "New Worker",
    source: "Intake Form",
    contractor: data.contractor,
    priorContractor: "N/A",
    project: "Pending assignment",
    priorProject: "N/A",
    date: data.eventDate || today,
    type: data.eventCategory,
    severity: data.severity,
    sif: data.sif,
    investigation: "Event Reported",
    evidence: "Partial",
    access,
    scope,
    action: "Safety review, contractor response, and corrective action determination",
    reinstatement: today,
    authority: "Access Review Committee",
    updated: today,
    repeat: false,
    utility: "Xcel Energy",
    jobClass: "Pending review",
    banned: "No",
    disposition,
    notes: data.eventSummary.trim() || "Submitted for review.",
    stopWork: ["High", "Critical"].includes(data.severity) || ["High", "Critical"].includes(data.sif) ? "Yes" : "No",
    removedFromSite: access === "Restricted" ? "Yes" : "No",
    utilityRestriction: "No",
    rca: "Open",
    correctiveStatus: "Open",
    reDispatchConcern: "Monitor",
    managementReview: "Active",
    submitted: true
  };
}

function submitForReview(event) {
  event.preventDefault();
  const form = event.currentTarget;
  workers.unshift(submittedRecordFromForm(form));
  saveSubmittedRecords();
  renderAll();
  document.getElementById("submissionMessage").textContent = "Record submitted for review.";
  switchPage("matrix");
}

function renderNotifications() {
  const notices = workers.filter((w) => ["Under Review", "Restricted", "Monitor", "Banned From Site"].includes(w.access)).slice(0, 6);
  document.getElementById("notificationGrid").innerHTML = notices
    .map((w) => `<article class="notification-card"><strong>${w.contractor}</strong><div class="meta">${w.name} | ${w.id}</div>${chip(w.access)}<textarea readonly>Notice: ${w.investigation}. Please provide contractor response, corrective-action evidence, and supervisor acknowledgement for ${w.type}.</textarea><button class="ghost-btn">Queue Notice</button></article>`)
    .join("");
}

function renderAudit() {
  const items = [
    ["2026-06-29 08:10", "Safety Reviewer updated evidence status for BADGE-1622 to Partial after telematics upload."],
    ["2026-06-28 15:44", "Director Safety and Operations approved owner-wide access revocation for BADGE-1047 after final review."],
    ["2026-06-27 10:22", "Contractor response requested from Q3 Contracting for trenching event BADGE-1421."],
    ["2026-06-26 14:05", "Corrective action assigned to PAR for crane-zone exclusion event BADGE-0872."],
    ["2026-06-22 09:30", "Reinstatement review scheduled for BADGE-1510 with access review committee."]
  ];
  document.getElementById("auditLog").innerHTML = items.map(([time, text]) => `<div class="timeline-item"><time>${time}</time><div>${text}</div></div>`).join("");
}

function renderAdmin() {
  document.getElementById("adminGrid").innerHTML = rolePermissions
    .map(([role, permissions]) => `<article class="role-card"><h3>${role}</h3><p class="meta">${permissions}</p><label class="meta"><input type="checkbox" checked /> Audit trail required</label></article>`)
    .join("");
}

function switchPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => page.classList.toggle("active-page", page.id === pageId));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.page === pageId));
}

function exportCsv() {
  const headers = ["Worker ID", "Worker Name", "Contractor", "Union Hall / Dispatch Source", "Project / Site", "Utility Customer", "Job Classification", "Event Date", "Incident Type", "Severity", "SIF Potential", "Investigation Status", "Evidence Status", "Access Status", "Banned From Site", "Restriction Scope", "Corrective Action", "Corrective Action Owner", "Review Date", "Final Disposition", "Notes", "Last Updated"];
  const rows = activeWorkers().map((w) => [w.id, w.name, w.contractor, w.source, w.project, w.utility, w.jobClass, w.date, w.type, w.severity, w.sif, w.investigation, w.evidence, w.access, w.banned, w.scope, w.action, w.authority, w.reinstatement, w.disposition, w.notes, w.updated]);
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "safety_access_control_matrix_export.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function init() {
  renderAll();
  renderAudit();
  renderAdmin();

  document.querySelectorAll("[data-page], [data-page-link]").forEach((button) => {
    button.addEventListener("click", () => switchPage(button.dataset.page || button.dataset.pageLink));
  });
  ["globalSearch", "statusFilter", "contractorFilter", "severityFilter", "utilityFilter", "projectFilter", "incidentTypeFilter", "bannedFilter"].forEach((id) => document.getElementById(id).addEventListener("input", () => {
    renderMatrix();
    renderIncidents();
    renderCorrective();
    renderReports();
  }));
  document.getElementById("clearFilters").addEventListener("click", () => {
    ["statusFilter", "contractorFilter", "severityFilter", "utilityFilter", "projectFilter", "incidentTypeFilter", "bannedFilter"].forEach((id) => {
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
  document.getElementById("reportPdfExport").addEventListener("click", () => window.print());
  document.getElementById("printReport").addEventListener("click", () => window.print());
  document.getElementById("addMockRecord").addEventListener("click", addMockRecord);
  document.getElementById("intakeForm").addEventListener("submit", submitForReview);
  window.addEventListener("resize", renderCharts);
}

init();
