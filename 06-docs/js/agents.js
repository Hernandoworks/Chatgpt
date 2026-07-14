// Agent Registry Tab

import { OWNER, REPO, RAW, fetchRaw, escapeHtml, switchTab, api, iconFor } from "./app.js";
import { showToast, skeleton, badge, debounce } from "./components.js";

const AGENT_LAYERS = {
  "agent-orchestrator": "engineering",
  "project-manager": "engineering",
  "solution-architect": "engineering",
  "repository-engineer": "engineering",
  "ui-engineer": "engineering",
  "api-engineer": "engineering",
  "database-engineer": "engineering",
  "devops-engineer": "engineering",
  "security-engineer": "engineering",
  "test-engineer": "engineering",
  "qa-engineer": "engineering",
  "quality-engineer": "engineering",
  "documentation-engineer": "engineering",
  "prompt-engineer": "engineering",
  "release-manager": "engineering",
  "ux-designer": "design",
  "visual-designer": "design",
  "interaction-designer": "design",
  "accessibility-specialist": "design",
  "design-system-engineer": "design",
  "domain-modeler": "business",
  "workflow-engineer": "business",
  "integration-engineer": "business",
  "data-analyst": "business",
  "product-manager": "product",
  "user-researcher": "product",
  "technical-writer": "product",
};
const AGENT_ICONS = {
  engineering: "\uD83C\uDFD7\uFE0F",
  design: "\uD83C\uDFA8",
  business: "\uD83D\uDCCB",
  product: "\uD83D\uDCCB",
};
const LAYER_NAMES = {
  engineering: "Engineering",
  design: "Design",
  business: "Business",
  product: "Product",
};

export async function loadAgents() {
  const mappings = window.__agendaMappings || [];
  const agentIds = Object.keys(AGENT_LAYERS);
  const batchSize = 5;
  const agents = [];

  for (let i = 0; i < agentIds.length; i += batchSize) {
    const batch = agentIds.slice(i, i + batchSize).map(async (id) => {
      const layer = AGENT_LAYERS[id];
      const file = layer === "engineering" ? `engineering/${id}` : `${layer}/${id}`;
      const content = await fetchRaw(`.ai/agents/${file}.md`);
      const mission = (content.match(/## Mission\n\n(.+)/) || ["", ""])[1] || "";
      const mapping = mappings.find((m) => m.agent === id) || {};
      return {
        id,
        name: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        layer,
        mission: mission.substring(0, 150),
        content,
        prompts: mapping.prompts || [],
        validators: mapping.validators || [],
        triggers: mapping.triggers || [],
        workflows: mapping.workflows || [],
      };
    });
    const results = await Promise.all(batch);
    agents.push(...results);
  }
  window.__agentData = agents;
  renderAgentManager();
  return agents;
}

export function renderAgentManager() {
  const agents = window.__agentData || [];
  const q = (document.getElementById("agentSearch")?.value || "").toLowerCase();
  const layers = ["engineering", "design", "business", "product"];
  let html = "";
  for (const layer of layers) {
    const filtered = agents.filter(
      (a) =>
        a.layer === layer &&
        (!q || a.name.toLowerCase().includes(q) || a.mission.toLowerCase().includes(q)),
    );
    if (!filtered.length && q) continue;
    html += `<div class="agent-category">
      <div class="agent-category-title">${AGENT_ICONS[layer]} ${LAYER_NAMES[layer]} <span class="text-muted text-sm">(${filtered.length})</span></div>
      <div class="agent-list">${filtered.map((a) => `<button class="agent-tag" onclick="window.__showAgentDetail('${a.id}')">${escapeHtml(a.name)}</button>`).join("")}</div></div>`;
  }
  document.getElementById("agentManagerList").innerHTML =
    html || '<div class="empty-state">No matching agents</div>';
  document.getElementById("agentMgrCount").textContent = `(${agents.length})`;
}

window.__showAgentDetail = async function (id) {
  const agents = window.__agentData || [];
  const a = agents.find((x) => x.id === id);
  if (!a) return;
  document.getElementById("agentDetail").style.display = "block";
  document.getElementById("wfDetail").style.display = "none";
  document.getElementById("promptDetail").style.display = "none";

  const prompts = window.__promptFiles || [];
  const wfs = window.__allWorkflows || [];
  const wfMeta = window.__WF_META || {};
  const relatedPrompts = prompts.filter((p) => a.prompts.includes(p.id));
  const relatedWfs = wfs.filter((w) => {
    const m = wfMeta[w.name];
    return m && m.agent === a.id;
  });

  document.getElementById("agentDetail").innerHTML = `
    <button class="back-btn" onclick="document.getElementById('agentDetail').style.display='none'">&larr; Back to list</button>
    <div class="meta-grid">
      <div class="meta-item"><div class="meta-label">Agent</div>${escapeHtml(a.name)}</div>
      <div class="meta-item"><div class="meta-label">ID</div>${escapeHtml(a.id)}</div>
      <div class="meta-item"><div class="meta-label">Layer</div>${AGENT_ICONS[a.layer]} ${LAYER_NAMES[a.layer]}</div>
      <div class="meta-item"><div class="meta-label">Triggers</div>${(a.triggers || []).join(", ") || "—"}</div>
    </div>
    <div style="margin-bottom:12px"><div class="meta-label" style="margin-bottom:4px">Mission</div>${escapeHtml(a.mission) || "—"}</div>
    ${a.prompts.length ? `<div class="flex wrap mb" style="gap:8px"><div><div class="meta-label" style="margin-bottom:4px">Prompts (${a.prompts.length})</div>${a.prompts.map((p) => `<button class="badge purple" style="cursor:pointer" onclick="switchTab('prompts');setTimeout(()=>window.__showPromptDetail('${p}'),100)">${escapeHtml(p)}</button>`).join(" ")}</div></div>` : ""}
    ${relatedWfs.length ? `<div class="flex wrap mb" style="gap:8px"><div><div class="meta-label" style="margin-bottom:4px">Workflows (${relatedWfs.length})</div>${relatedWfs.map((w) => `<button class="badge" style="cursor:pointer" onclick="switchTab('workflows');setTimeout(()=>window.__showWfDetail('${w.id}'),100)">${escapeHtml(w.name.replace(".yml", ""))}</button>`).join(" ")}</div></div>` : ""}
    ${a.validators.length ? `<div class="flex wrap mb" style="gap:8px"><div><div class="meta-label" style="margin-bottom:4px">Validators</div>${a.validators.map((v) => `<span class="badge green">${escapeHtml(v)}</span>`).join(" ")}</div></div>` : ""}
    <h4>Agent Definition</h4>
    <pre>${escapeHtml(a.content) || "Unable to load"}</pre>`;
};

const agentSearch = document.getElementById("agentSearch");
if (agentSearch) {
  let timer;
  agentSearch.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(renderAgentManager, 200);
  });
}
