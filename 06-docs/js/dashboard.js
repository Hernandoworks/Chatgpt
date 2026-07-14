// Dashboard Tab

import {
  OWNER,
  REPO,
  BASE,
  allWorkflows,
  allRuns,
  api,
  fetchRaw,
  cachedFetch,
  escapeHtml,
  switchTab,
  iconFor,
  ago,
} from "./app.js";

import { showToast, skeleton } from "./components.js";

import { renderWorkflowManager, WF_META } from "./workflows.js";

export async function loadDashboard() {
  document.getElementById("workflowList").innerHTML = skeleton(8);
  document.getElementById("activityFeed").innerHTML = skeleton(5);

  try {
    const [wfs, runs] = await Promise.all([
      cachedFetch("workflows", () =>
        api("/actions/workflows?per_page=50").then((d) => d?.workflows || []),
      ),
      cachedFetch("runs", () =>
        api("/actions/runs?per_page=15").then((d) => d?.workflow_runs || []),
      ),
    ]);
    window.__allWorkflows = wfs;
    window.__allRuns = runs;

    // Update counts
    const agentData = window.__agentData || [];
    const promptFiles = window.__promptFiles || [];
    document.getElementById("statWorkflows").textContent = wfs.length;
    document.getElementById("statPrompts").textContent = promptFiles.length;
    document.getElementById("statAgents").textContent = agentData.length;
    document.getElementById("statLOC").textContent = "2616";
    document.getElementById("wfCount").textContent = `(${wfs.length})`;
    document.getElementById("agentCount").textContent = `(${agentData.length})`;
    document.getElementById("tabWfCount").textContent = `(${wfs.length})`;
    document.getElementById("tabPromptCount").textContent = `(${promptFiles.length})`;
    document.getElementById("tabAgentCount").textContent = `(${agentData.length})`;

    // Workflow mini-list
    const runMap = {};
    for (const r of runs) if (!runMap[r.name]) runMap[r.name] = r;
    let wfHtml = "";
    for (const wf of wfs) {
      const run = runMap[wf.name];
      wfHtml += `<div class="wf-item" tabindex="0" role="button" onclick="switchTab('workflows');setTimeout(()=>window.showWfDetail('${wf.id}'),100)" onkeydown="if(event.key==='Enter'||event.key===' '){switchTab('workflows');setTimeout(()=>window.showWfDetail('${wf.id}'),100)}">
        <div class="wf-info"><div class="wf-name">${wf.name.replace(".yml", "")}</div>
          <div class="wf-meta">${run ? "Last: " + ago(run.run_started_at) : "Never run"}</div></div>
        <div class="wf-right">${iconFor(run?.conclusion)}
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();switchTab('workflows');setTimeout(()=>window.showWfDetail('${wf.id}'),100)">View</button></div></div>`;
    }
    document.getElementById("workflowList").innerHTML =
      wfHtml || '<div class="empty-state">No workflows found</div>';

    // Agent registry mini-list
    const layers = [
      {
        title: "\uD83C\uDFD7\uFE0F Engineering",
        agents: agentData.filter((a) => a.layer === "engineering").map((a) => a.id),
      },
      {
        title: "\uD83C\uDFA8 Design",
        agents: agentData.filter((a) => a.layer === "design").map((a) => a.id),
      },
      {
        title: "\uD83D\uDCCB Business",
        agents: agentData.filter((a) => a.layer === "business").map((a) => a.id),
      },
      {
        title: "\uD83D\uDCCB Product",
        agents: agentData.filter((a) => a.layer === "product").map((a) => a.id),
      },
    ];
    let agentHtml = "";
    for (const layer of layers) {
      if (!layer.agents.length) continue;
      agentHtml += `<div class="agent-category"><div class="agent-category-title">${layer.title} <span class="text-muted text-sm">(${layer.agents.length})</span></div>
        <div class="agent-list">${layer.agents
          .map((a) => {
            const name = a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
            return `<button class="agent-tag" onclick="switchTab('agents');setTimeout(()=>window.__showAgentDetail('${a}'),100)">${escapeHtml(name)}</button>`;
          })
          .join("")}</div></div>`;
    }
    document.getElementById("agentList").innerHTML =
      agentHtml || '<div class="empty-state">No agents loaded</div>';

    // Activity feed
    let activityHtml = "";
    for (const r of runs.slice(0, 12)) {
      const wfName = r.name
        ? r.name
            .replace(".yml", "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
        : "Workflow";
      activityHtml += `<div class="activity-item"><div>${iconFor(r.conclusion)} ${escapeHtml(wfName)} — <span style="color:var(--text-secondary)">${r.conclusion || "running"}</span></div>
        <div class="activity-time">${ago(r.run_started_at)} &middot; <a href="${r.html_url}" target="_blank">View run</a></div></div>`;
    }
    document.getElementById("activityFeed").innerHTML =
      activityHtml || '<div class="empty-state">No recent activity</div>';
    document.getElementById("lastUpdated").textContent = new Date().toLocaleTimeString();

    // Prefetch workflow YAMLs in background
    setTimeout(() => {
      for (const wf of wfs.slice(0, 5)) {
        fetchRaw(wf.path).then((yaml) => {
          if (!window.__wfYamls) window.__wfYamls = {};
          window.__wfYamls[wf.name] = yaml;
        });
      }
    }, 100);

    renderWorkflowManager();
  } catch (e) {
    document.getElementById("workflowList").innerHTML =
      '<div class="error-state">Failed to load workflows. <button class="btn btn-primary btn-sm" onclick="window.__loadDashboard()">Retry</button></div>';
    document.getElementById("activityFeed").innerHTML =
      '<div class="error-state">Failed to load recent runs.</div>';
  }
}

window.__loadDashboard = loadDashboard;
