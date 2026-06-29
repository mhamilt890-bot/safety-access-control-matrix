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

const savedRecordsKey = "safetyAccessProductionRecords";

const workers = [];

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

function emptyState(message) {
  return `<div class="empty-state">${message}</div>`;
}

function tableEmptyState(message) {
  return `<tr><td colspan="24" class="table-empty">${message}</td></tr>`;
}

function renderKpis() {
  const kpis = [
    ["Total Active Workers", workers.length, "Entered access review records"],
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

  if (!values.some((value) => value > 0)) {
    context.fillStyle = "#657286";
    context.font = "600 14px Arial";
    context.textAlign = "center";
    context.fillText("No access review records entered yet.", width / 2, height / 2);
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

function renderCharts() {
  const categoryLabels = eventCategories.map((category) => category.split(" / ")[0]);
  const categoryValues = eventCategories.map((category) => workers.filter((w) => w.type === category).length);
  const statusLabels = ["Under Review", "Restricted", "Monitor", "Banned From Site", "Clear"];
  const statusValues = statusLabels.map((status) => workers.filter((w) => w.access === status).length);
  const severityLabels = ["Low", "Moderate", "High", "Critical"];
  const severityValues = severityLabels.map((severity) => workers.filter((w) => w.severity === severity).length);
  const contractorCounts = workers.reduce((counts, worker) => {
    counts[worker.contractor] = (counts[worker.contractor] || 0) + 1;
    return counts;
  }, {});
  const contractorEntries = Object.entries(contractorCounts).slice(0, 6);

  drawBarChart("categoryChart", categoryLabels, categoryValues, ["#2563eb", "#dc2626", "#ea580c"]);
  drawBarChart("statusChart", statusLabels, statusValues, ["#2563eb", "#15803d", "#c2410c"]);
  drawBarChart("repeatChart", severityLabels, severityValues, ["#64748b", "#2563eb", "#ea580c", "#dc2626"]);
  drawBarChart("contractorChart", contractorEntries.map(([label]) => label), contractorEntries.map(([, value]) => value), ["#2563eb", "#ea580c", "#15803d", "#64748b"]);
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
  const current = activeWorkers();
  document.getElementById("matrixBody").innerHTML = current.length ? current
    .map(
      (w) => `<tr>
        <td>${w.id}</td><td><strong>${w.name}</strong></td><td>${w.source}</td><td>${w.contractor}</td><td>${w.priorContractor}</td>
        <td>${w.project}</td><td>${w.utility}</td><td>${w.jobClass}</td><td>${w.priorProject}</td><td>${w.date}</td><td>${w.type}</td><td>${chip(w.severity)}</td>
        <td>${chip(w.sif)}</td><td>${w.investigation}</td><td>${chip(w.evidence)}</td><td>${chip(w.access)}</td><td>${chip(w.banned)}</td><td>${w.scope}</td>
        <td>${w.action}</td><td>${w.reinstatement}</td><td>${w.authority}</td><td>${w.disposition}</td><td>${w.notes}</td><td>${w.updated}</td>
      </tr>`
    )
    .join("") : tableEmptyState("No access review records entered yet.");
}

function renderAlerts() {
  const risky = workers.filter((w) => w.sif === "Critical" || w.repeat);
  document.getElementById("alertList").innerHTML = risky.length ? risky
    .map((w) => `<div class="alert-item"><div><strong>${w.name}</strong><div class="meta">${w.id} | ${w.contractor} | ${w.project}</div></div><div>${w.type}<div class="meta">${w.investigation}</div></div><div>${chip(w.access)}</div></div>`)
    .join("") : emptyState("No high-risk access review records entered yet.");
}

function renderWorkflow() {
  document.getElementById("workflowBoard").innerHTML = workflow
    .map((stage) => {
      const stageWorkers = workers.filter((w) => w.investigation === stage).slice(0, 2);
      return `<section class="workflow-column"><h3>${stage}</h3>${stageWorkers
        .map((w) => `<div class="workflow-card-item"><strong>${w.name}</strong><span class="meta">${w.contractor} | ${w.type}</span>${chip(w.access)}</div>`)
        .join("") || '<div class="empty-state compact">No access review records entered yet.</div>'}</section>`;
    })
    .join("");
}

function renderRecordLists() {
  const restrictedRecords = workers.filter((w) => w.access === "Restricted" || w.access === "Banned From Site" || w.banned === "Yes");
  document.getElementById("restrictedList").innerHTML = restrictedRecords.length ? restrictedRecords
    .map((w) => `<div class="record-item"><div><strong>${w.name}</strong><div class="meta">${w.id} | ${w.contractor}</div></div><div>${w.scope}<div class="meta">${w.action}</div></div><div>${chip(w.access)}</div></div>`)
    .join("") : emptyState("No restricted or banned access records entered yet.");

  const reinstatementRecords = workers
    .filter((w) => w.reinstatement !== "N/A")
    .sort((a, b) => a.reinstatement.localeCompare(b.reinstatement));
  document.getElementById("reinstatementList").innerHTML = reinstatementRecords.length ? reinstatementRecords
    .map((w) => `<div class="record-item"><div><strong>${w.name}</strong><div class="meta">Review date ${w.reinstatement}</div></div><div>${w.action}<div class="meta">Authority: ${w.authority}</div></div><div>${chip(w.access)}</div></div>`)
    .join("") : emptyState("No reinstatement reviews entered yet.");
}

function renderIncidents() {
  const current = activeWorkers();
  document.getElementById("incidentList").innerHTML = current.length ? current
    .map((w) => `<div class="record-item"><div><strong>${w.date} | ${w.type}</strong><div class="meta">${w.name} | ${w.contractor} | ${w.project}</div></div><div>${w.notes}<div class="meta">Stop work: ${w.stopWork} | Removed from site: ${w.removedFromSite} | Utility restriction: ${w.utilityRestriction}</div><div class="meta">RCA: ${w.rca} | Corrective action: ${w.correctiveStatus} | Re-dispatch concern: ${w.reDispatchConcern}</div></div><div>${chip(w.managementReview)}</div></div>`)
    .join("") : emptyState("No incident records entered yet.");
}

function renderCorrective() {
  const correctiveRecords = activeWorkers().filter((w) => w.correctiveStatus === "Open" || w.access === "Monitor");
  document.getElementById("correctiveList").innerHTML = correctiveRecords.length ? correctiveRecords
    .map((w) => `<div class="record-item"><div><strong>${w.action}</strong><div class="meta">${w.name} | Owner: ${w.authority}</div></div><div>Due / review date: ${w.reinstatement}<div class="meta">Access impact: ${w.access} | Evidence: ${w.evidence}</div></div><div>${chip(w.correctiveStatus)}</div></div>`)
    .join("") : emptyState("No corrective actions entered yet.");
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
  document.getElementById("reportSummary").innerHTML = current.length ? items.map(([label, value]) => `<div class="summary-item"><span>${label}</span><strong>${value}</strong></div>`).join("") : emptyState("No access review records entered yet.");
}

function addAccessReviewRecord() {
  switchPage("intake");
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
    name: data.workerName.trim() || "Name pending review",
    source: "Intake Form",
    contractor: data.contractor || "Not specified",
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
  document.getElementById("notificationGrid").innerHTML = notices.length ? notices
    .map((w) => `<article class="notification-card"><strong>${w.contractor}</strong><div class="meta">${w.name} | ${w.id}</div>${chip(w.access)}<textarea readonly>Notice: ${w.investigation}. Please provide contractor response, corrective-action evidence, and supervisor acknowledgement for ${w.type}.</textarea><button class="ghost-btn">Queue Notice</button></article>`)
    .join("") : emptyState("No access review notifications are queued.");
}

function renderAudit() {
  document.getElementById("auditLog").innerHTML = workers.length ? workers
    .map((w) => `<div class="timeline-item"><time>${w.updated}</time><div>${w.name} submitted for access review. Status: ${w.investigation}.</div></div>`)
    .join("") : emptyState("No audit activity recorded yet.");
}

function renderAdmin() {
  document.getElementById("adminGrid").innerHTML = rolePermissions
    .map(([role, permissions]) => `<article class="role-card"><h3>${role}</h3><p class="meta">${permissions}</p><label class="meta"><input type="checkbox" checked /> Audit trail required</label></article>`)
    .join("") + `<article class="role-card admin-tools"><h3>Local Browser Data</h3><p class="meta">This version stores records in this browser's localStorage. It is not connected to a shared multi-user database yet.</p><button class="ghost-btn danger-btn" id="clearLocalRecords">Clear All Local Records</button></article>`;
  document.getElementById("clearLocalRecords").addEventListener("click", clearLocalRecords);
}

function clearLocalRecords() {
  const confirmed = window.confirm("Clear all locally saved access review records from this browser?");
  if (!confirmed) return;
  workers.splice(0, workers.length);
  localStorage.removeItem(savedRecordsKey);
  localStorage.removeItem("safetyAccessSubmittedRecords");
  renderAll();
  renderAudit();
  renderAdmin();
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
  document.getElementById("addAccessReviewRecord").addEventListener("click", addAccessReviewRecord);
  document.getElementById("intakeForm").addEventListener("submit", submitForReview);
  window.addEventListener("resize", renderCharts);
}

init();
