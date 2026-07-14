// Prompt Library Tab

import {
  OWNER,
  REPO,
  RAW,
  api,
  fetchRaw,
  escapeHtml,
  cachedFetch,
  promptFiles,
  agendaMappings,
} from "./app.js";
import { switchTab, setAgentData, setPromptData } from "./app.js"; // cross-link support

import { showToast, skeleton, badge, debounce } from "./components.js";

export async function loadPrompts() {
  const list = [
    "build-api",
    "build-apps-script",
    "build-dashboard",
    "build-google-sheet",
    "build-pipeline",
    "build-sql",
    "build-ui-component",
    "build-web-app",
    "conduct-security-audit",
    "create-migration",
    "design-component",
    "design-system-token",
    "generate-documentation",
    "generate-tests",
    "plan-feature",
    "refactor-code",
    "review-code",
    "triage-request",
    "write-release-notes",
    "write-schema",
    "write-test-plan",
  ];

  // agenda mappings
  const agendaRaw = await fetchRaw(".ai/agenda.json");
  try {
    window.__agendaMappings = JSON.parse(agendaRaw).mappings || [];
  } catch (e) {
    window.__agendaMappings = [];
  }

  // batch fetch prompts in parallel (5 at a time)
  const batchSize = 5;
  const files = [];
  for (let i = 0; i < list.length; i += batchSize) {
    const batch = list.slice(i, i + batchSize).map(async (name) => {
      const content = await fetchRaw(`.ai/prompts/${name}.md`);
      const frontmatter = {};
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (fmMatch) {
        for (const line of fmMatch[1].split("\n")) {
          const idx = line.indexOf(":");
          if (idx > 0)
            frontmatter[line.slice(0, idx).trim()] = line
              .slice(idx + 1)
              .trim()
              .replace(/^\[|\]$/g, "");
        }
      }
      const title = (content.match(/^# .+/m) || [""])[0].replace(/^#\s*/, "") || name;
      const mappings = window.__agendaMappings || [];
      const usedBy = mappings.filter((m) => (m.prompts || []).includes(name)).map((m) => m.agent);
      const agents =
        typeof frontmatter.agents === "string"
          ? frontmatter.agents.split(",").map((s) => s.trim())
          : [];
      return {
        id: name,
        title,
        content,
        frontmatter,
        usedBy,
        agents,
        version: frontmatter.version || "1.0.0",
        output: frontmatter.output || "",
      };
    });
    const results = await Promise.all(batch);
    files.push(...results);
  }
  window.__promptFiles = files;
  renderPromptManager();
  return files;
}

export function renderPromptManager() {
  const files = window.__promptFiles || [];
  const q = (document.getElementById("promptSearch")?.value || "").toLowerCase();
  let html = "";
  for (const p of files) {
    if (
      q &&
      !p.title.toLowerCase().includes(q) &&
      !p.id.includes(q) &&
      !p.agents.join(" ").includes(q)
    )
      continue;
    const agentBadges = p.agents
      .slice(0, 3)
      .map((a) => `<span class="badge">${escapeHtml(a)}</span>`)
      .join("");
    html += `<div class="list-item" tabindex="0" role="button" onclick="window.__showPromptDetail('${p.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')window.__showPromptDetail('${p.id}')">
      <div><div class="primary">${escapeHtml(p.title)}</div>
        <div class="secondary flex wrap gap">${agentBadges} <span class="text-muted">v${p.version}</span> <span class="text-muted">${escapeHtml(p.output)}</span></div></div>
      <span class="badge ${p.usedBy.length ? "green" : ""}">${p.usedBy.length} agents</span></div>`;
  }
  document.getElementById("promptManagerList").innerHTML =
    html || '<div class="empty-state">No matching prompts</div>';
  document.getElementById("promptMgrCount").textContent = `(${files.length})`;
}

window.__showPromptDetail = async function (id) {
  const files = window.__promptFiles || [];
  const p = files.find((x) => x.id === id);
  if (!p) return;
  document.getElementById("promptDetail").style.display = "block";
  document.getElementById("wfDetail").style.display = "none";
  document.getElementById("agentDetail").style.display = "none";

  const wfs = window.__allWorkflows || [];
  const wfMeta = window.__WF_META || {};
  const relatedWfs = wfs.filter((w) => {
    const m = wfMeta[w.name];
    return m && p.usedBy.some((a) => m.agent === a);
  });

  document.getElementById("promptDetail").innerHTML = `
    <button class="back-btn" onclick="document.getElementById('promptDetail').style.display='none'">&larr; Back to list</button>
    <div class="meta-grid">
      <div class="meta-item"><div class="meta-label">ID</div>${escapeHtml(p.id)}</div>
      <div class="meta-item"><div class="meta-label">Version</div>v${p.version}</div>
      <div class="meta-item"><div class="meta-label">Output</div>${escapeHtml(p.output) || "—"}</div>
      <div class="meta-item"><div class="meta-label">Variables</div>${escapeHtml(p.frontmatter.required_variables) || "—"}</div>
    </div>
    <div class="flex wrap mb" style="gap:8px">
      <span class="meta-label">Used By Agents: </span>
      ${p.usedBy.length ? p.usedBy.map((a) => `<button class="agent-tag" onclick="switchTab('agents');setTimeout(()=>window.__showAgentDetail('${a}'),100)">${escapeHtml(a)}</button>`).join("") : '<span class="text-muted text-sm">None</span>'}
    </div>
    ${relatedWfs.length ? `<div class="flex wrap mb" style="gap:8px"><span class="meta-label">Related Workflows: </span>${relatedWfs.map((w) => `<button class="badge purple" style="cursor:pointer" onclick="switchTab('workflows');setTimeout(()=>window.__showWfDetail('${w.id}'),100)">${escapeHtml(w.name.replace(".yml", ""))}</button>`).join("")}</div>` : ""}
    <h4>Template Source</h4>
    <pre>${escapeHtml(p.content) || "Unable to load"}</pre>`;
};

// Wire up search debounce
const promptSearch = document.getElementById("promptSearch");
if (promptSearch) {
  let timer;
  promptSearch.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(renderPromptManager, 200);
  });
}
