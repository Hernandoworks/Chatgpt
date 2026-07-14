// Workflow Manager Tab

import {
  OWNER,
  REPO,
  BASE,
  RAW,
  allWorkflows,
  allRuns,
  api,
  fetchRaw,
  escapeHtml,
  switchTab,
  iconFor,
  ago,
  getToken,
} from "./app.js";

import { showToast, showModal, closeModal, skeleton, badge, debounce } from "./components.js";

export const WF_META = {
  "wf-001-repo-bootstrap.yml": {
    id: "WF-001",
    desc: "Create and configure a new repository",
    agent: "repository-engineer",
    trigger: "workflow_dispatch",
  },
  "wf-002-project-planning.yml": {
    id: "WF-002",
    desc: "Read backlog, generate sprint plan, prioritize tasks",
    agent: "project-manager",
    trigger: "workflow_dispatch, schedule",
  },
  "wf-003-task-orchestration.yml": {
    id: "WF-003",
    desc: "Detect phoenix/* labels, assign agents, create branches",
    agent: "agent-orchestrator",
    trigger: "issues: labeled",
  },
  "wf-004-ai-planning.yml": {
    id: "WF-004",
    desc: "Load prompt + context, call DeepSeek, post planning report",
    agent: "agent-orchestrator",
    trigger: "workflow_dispatch",
  },
  "wf-005-ai-implementation.yml": {
    id: "WF-005",
    desc: "Generate code via AI, validate, open draft PR",
    agent: "ui-engineer",
    trigger: "workflow_dispatch",
  },
  "wf-006-component-generator.yml": {
    id: "WF-006",
    desc: "Scaffold React component with tests and stories",
    agent: "ui-engineer",
    trigger: "workflow_dispatch",
  },
  "wf-007-workbook-generator.yml": {
    id: "WF-007",
    desc: "Generate Google Sheets or Apps Script",
    agent: "workflow-engineer",
    trigger: "workflow_dispatch",
  },
  "wf-008-web-app-generator.yml": {
    id: "WF-008",
    desc: "Scaffold Next.js 16 application",
    agent: "solution-architect",
    trigger: "workflow_dispatch",
  },
  "wf-009-api-generator.yml": {
    id: "WF-009",
    desc: "Generate API service with validation and types",
    agent: "api-engineer",
    trigger: "workflow_dispatch",
  },
  "wf-010-database-generator.yml": {
    id: "WF-010",
    desc: "Create SQL migrations (up/down/seed)",
    agent: "database-engineer",
    trigger: "workflow_dispatch",
  },
  "wf-011-documentation.yml": {
    id: "WF-011",
    desc: "Auto-update README, CHANGELOG, API docs",
    agent: "documentation-engineer",
    trigger: "workflow_dispatch, push",
  },
  "wf-012-code-review.yml": {
    id: "WF-012",
    desc: "AI review of PR diffs with structured comments",
    agent: "quality-engineer",
    trigger: "pull_request",
  },
  "wf-013-quality-assurance.yml": {
    id: "WF-013",
    desc: "TypeCheck, lint, test, format, build, audit",
    agent: "quality-engineer",
    trigger: "pull_request, push",
  },
  "wf-014-repository-health.yml": {
    id: "WF-014",
    desc: "Scan for large files, dupes, doc gaps, unused deps",
    agent: "repository-engineer",
    trigger: "workflow_dispatch, schedule",
  },
  "wf-015-release.yml": {
    id: "WF-015",
    desc: "Version bump, changelog, tag, GitHub Release",
    agent: "release-manager",
    trigger: "workflow_dispatch, tag",
  },
  "wf-016-deployment.yml": {
    id: "WF-016",
    desc: "Deploy to dev/staging/prod via Cloudflare Workers",
    agent: "devops-engineer",
    trigger: "workflow_dispatch, release",
  },
  "wf-017-monitoring.yml": {
    id: "WF-017",
    desc: "Daily workflow stats, test metrics, health report",
    agent: "devops-engineer",
    trigger: "schedule, workflow_dispatch",
  },
  "wf-018-continuous-improvement.yml": {
    id: "WF-018",
    desc: "Analyze bottlenecks, generate recommendations",
    agent: "quality-engineer",
    trigger: "schedule, workflow_dispatch",
  },
};

const WF_INPUTS = {
  "wf-001-repo-bootstrap.yml": {
    repo_name: "string",
    description: "string",
    visibility: "choice:public,private",
  },
  "wf-002-project-planning.yml": { sprint_name: "string", sprint_duration_days: "string" },
  "wf-004-ai-planning.yml": {
    issue_number: "string",
    prompt_id:
      "choice:triage-request,plan-feature,build-ui-component,build-web-app,build-api,build-sql,generate-documentation,review-code,refactor-code",
  },
  "wf-005-ai-implementation.yml": {
    prompt_id:
      "choice:build-ui-component,build-web-app,build-api,build-sql,build-dashboard,build-google-sheet,build-apps-script,refactor-code,generate-tests,generate-documentation",
    issue_number: "string",
    additional_context: "string",
  },
  "wf-006-component-generator.yml": { component_name: "string", issue_number: "string" },
  "wf-007-workbook-generator.yml": {
    workbook_type: "choice:google-sheet,apps-script",
    description: "string",
  },
  "wf-008-web-app-generator.yml": { app_name: "string", description: "string" },
  "wf-009-api-generator.yml": { api_name: "string", description: "string" },
  "wf-010-database-generator.yml": { migration_name: "string", description: "string" },
  "wf-011-documentation.yml": {
    doc_type: "choice:readme,api-docs,architecture,changelog,build-summary,full",
    scope: "string",
  },
  "wf-014-repository-health.yml": {},
  "wf-015-release.yml": { version_bump: "choice:patch,minor,major", release_title: "string" },
  "wf-016-deployment.yml": {
    environment: "choice:development,staging,production",
    ref: "string",
    run_smoke_tests: "choice:true,false",
  },
  "wf-017-monitoring.yml": {},
  "wf-018-continuous-improvement.yml": { iteration_label: "string" },
  "wf-013-quality-assurance.yml": {},
  "wf-012-code-review.yml": {},
  "wf-003-task-orchestration.yml": {},
};

export function renderWorkflowManager() {
  const wfs = window.__allWorkflows || [];
  window.__WF_META = WF_META;
  const q = (document.getElementById("wfSearch")?.value || "").toLowerCase();
  let html = "";
  for (const wf of wfs) {
    const meta = WF_META[wf.name] || {};
    if (
      q &&
      !wf.name.toLowerCase().includes(q) &&
      !(meta.desc || "").toLowerCase().includes(q) &&
      !(meta.agent || "").includes(q)
    )
      continue;
    html += `<div class="list-item" tabindex="0" role="button" onclick="showWfDetail('${wf.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')showWfDetail('${wf.id}')">
      <div><div class="primary">${meta.id || "WF-?"} — ${wf.name.replace(".yml", "")}</div>
        <div class="secondary">${escapeHtml(meta.desc || "")} &middot; Agent: ${meta.agent || "—"} &middot; Trigger: ${meta.trigger || wf.name}</div></div>
      <span class="badge">${meta.id || "WF-?"}</span></div>`;
  }
  document.getElementById("workflowManagerList").innerHTML =
    html || '<div class="empty-state">No matching workflows</div>';
  document.getElementById("wfMgrCount").textContent = `(${wfs.length})`;
}

window.showWfDetail = async function (wfId) {
  const wfs = window.__allWorkflows || [];
  const wf = wfs.find((w) => w.id === wfId);
  if (!wf) return;
  document.getElementById("wfDetail").style.display = "block";
  document.getElementById("promptDetail").style.display = "none";
  document.getElementById("agentDetail").style.display = "none";
  const meta = WF_META[wf.name] || {};
  const yaml = await fetchRaw(wf.path);
  const runs = await api(`/actions/workflows/${wfId}/runs?per_page=5`).then(
    (d) => d?.workflow_runs || [],
  );
  let runHtml = "";
  for (const r of runs) {
    runHtml += `<div class="flex"><span>${iconFor(r.conclusion)}</span> <span>${ago(r.run_started_at)}</span> <span class="text-muted text-sm">(${r.conclusion || "running"})</span> <a href="${r.html_url}" target="_blank" class="text-sm">View</a></div>`;
  }
  document.getElementById("wfDetail").innerHTML = `
    <button class="back-btn" onclick="document.getElementById('wfDetail').style.display='none'">&larr; Back to list</button>
    <div class="meta-grid">
      <div class="meta-item"><div class="meta-label">Workflow</div>${meta.id || "WF-?"}</div>
      <div class="meta-item"><div class="meta-label">Name</div>${wf.name.replace(".yml", "")}</div>
      <div class="meta-item"><div class="meta-label">Agent</div>${meta.agent || "—"}</div>
      <div class="meta-item"><div class="meta-label">Trigger</div>${meta.trigger || "—"}</div>
      <div class="meta-item"><div class="meta-label">Status</div>${wf.state}</div>
      <div class="meta-item"><div class="meta-label">Path</div>${wf.path}</div>
    </div>
    <div style="margin-bottom:12px"><div class="meta-label" style="margin-bottom:4px">Description</div>${meta.desc || "—"}</div>
    <div class="flex wrap mb">
      <button class="btn btn-primary" onclick="openTrigger('${wf.id}','${wf.name.replace(/'/g, "\\'")}')">&#x25B6; Run Workflow</button>
      <button class="btn btn-secondary" onclick="window.open('${wf.html_url}','_blank')">&#x2197; Open in GitHub</button>
    </div>
    ${runs.length ? `<div style="margin-bottom:12px"><div class="meta-label" style="margin-bottom:4px">Recent Runs</div>${runHtml}</div>` : ""}
    <h4>Source (YAML)</h4>
    <pre>${escapeHtml(yaml) || "Unable to load YAML source"}</pre>`;
};

window.openTrigger = function (wfId, wfName) {
  const wfs = window.__allWorkflows || [];
  const fname = (wfs.find((w) => w.id === wfId) || {}).name || wfName;
  const fields = WF_INPUTS[fname] || {};
  let bodyHtml = "";
  for (const [key, type] of Object.entries(fields)) {
    const label = key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const id = `input-${key}`;
    if (type.startsWith("choice:")) {
      const opts = type.replace("choice:", "").split(",");
      bodyHtml += `<div class="field"><label for="${id}">${label}</label><select id="${id}">${opts.map((o) => `<option value="${o}">${o}</option>`).join("")}</select></div>`;
    } else if (
      type === "string" &&
      (key.includes("description") || key.includes("additional_context"))
    ) {
      bodyHtml += `<div class="field"><label for="${id}">${label}</label><textarea id="${id}"></textarea></div>`;
    } else {
      bodyHtml += `<div class="field"><label for="${id}">${label}</label><input type="text" id="${id}"></div>`;
    }
  }
  if (!Object.keys(fields).length)
    bodyHtml = '<p class="text-muted text-sm">No inputs required.</p>';

  window.__pendingTrigger = { wfId, fname, fields };
  showModal({
    title: `Run: ${fname}`,
    bodyHtml,
    confirmText: "Run Workflow",
    onConfirm: confirmTrigger,
  });
};

window.confirmTrigger = async function () {
  const token = getToken();
  if (!token) {
    document.getElementById("modalStatus").innerHTML =
      '<div class="error-text">Enter a GitHub PAT first.</div>';
    return;
  }
  const pending = window.__pendingTrigger;
  if (!pending) return;
  const inputs = {};
  for (const key of Object.keys(pending.fields)) {
    const el = document.getElementById(`input-${key}`);
    if (el) inputs[key] = el.value;
  }
  const confirmBtn = document.getElementById("modalConfirmBtn");
  confirmBtn.disabled = true;
  confirmBtn.textContent = "Triggering...";
  document.getElementById("modalStatus").innerHTML = "";
  try {
    const res = await fetch(`${BASE}/actions/workflows/${pending.wfId}/dispatches`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref: "main", inputs }),
    });
    if (res.status === 204) {
      document.getElementById("modalStatus").innerHTML =
        '<div class="success-text">Workflow triggered!</div>';
      showToast("Workflow triggered successfully", "success");
      setTimeout(closeModal, 1500);
    } else {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      document.getElementById("modalStatus").innerHTML =
        `<div class="error-text">Error: ${err.message}</div>`;
    }
  } catch (e) {
    document.getElementById("modalStatus").innerHTML =
      `<div class="error-text">Error: ${e.message}</div>`;
  }
  confirmBtn.disabled = false;
  confirmBtn.textContent = "Run Workflow";
};

window.quickTrigger = function (name, inputs) {
  const token = getToken();
  if (!token) {
    showToast("Enter a GitHub PAT first", "error");
    return;
  }
  const wfs = window.__allWorkflows || [];
  const wf = wfs.find((w) => w.name === name);
  if (!wf) {
    showToast("Workflow not found: " + name, "error");
    return;
  }
  fetch(`${BASE}/actions/workflows/${wf.id}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ref: "main", inputs }),
  }).then((r) => {
    if (r.status === 204) {
      showToast("Triggered: " + name, "success");
      setTimeout(window.__loadDashboard, 3000);
    } else showToast("Failed: " + name, "error");
  });
};

// Search debounce
const wfSearch = document.getElementById("wfSearch");
if (wfSearch) {
  let timer;
  wfSearch.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(renderWorkflowManager, 200);
  });
}
