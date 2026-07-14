import { read } from "./core.js";

export interface ProjectState {
  phase: string;
  milestone: string;
  task: string;
  status: string;
  health: string;
  quality: string;
  nextAction: string;
  blockers: string;
}

export function parseProjectState(): ProjectState {
  const text = read(".opencode/PROJECT_STATE.md");
  const lines = text.split("\n");
  const get = (label: string): string => {
    const idx = lines.findIndex((l) => l.replace(/^#+\s*/, "").trim() === label);
    if (idx === -1) return "—";
    for (let i = idx + 1; i < lines.length; i++) {
      const line = lines[i]!;
      if (line.trim()) return line.trim();
    }
    return "—";
  };
  return {
    phase: get("Current Phase"),
    milestone: get("Current Milestone"),
    task: get("Current Task"),
    status: get("Status"),
    health: get("Repository Health"),
    quality: get("Quality Score"),
    nextAction: get("Next Action"),
    blockers: get("Blockers"),
  };
}

export function parseProgress(): {
  pct: number;
  completed: number;
  remaining: number;
  blocked: number;
  milestones: string;
} {
  const text = read("06-docs/project/PROGRESS.md");
  const completed = parseInt(text.match(/Completed\s*\n(\d+)/)?.[1] ?? "0", 10);
  const remaining = parseInt(text.match(/Remaining\s*\n~?(\d+)/)?.[1] ?? "0", 10);
  const blocked = parseInt(text.match(/Blocked\s*\n(\d+)/)?.[1] ?? "0", 10);
  const pctLine = text.match(/^\s*(\d+)%/m)?.[1] ?? "0";
  const milestones = text.match(/Milestones Complete\s*\n([\d\s/]+)/)?.[1] ?? "0 / 0";
  return { pct: parseInt(pctLine, 10), completed, remaining, blocked, milestones };
}

export function parseHealth(): Record<string, string> {
  const text = read("06-docs/project/BUILD_SUMMARY.md");
  const section = text.split("## Repository Health")[1] ?? "";
  const results: Record<string, string> = {};
  for (const line of section.split("\n")) {
    const m = line.match(/^\|\s*(\w[\w\s]*)\s*\|\s*(\S+)\s*\|$/);
    if (m) {
      const key = m[1]?.trim() ?? "";
      const val = m[2]?.trim() ?? "";
      if (key) results[key] = val;
    }
  }
  return results;
}

export interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  dependencies: string;
}

export function listTasks(): Task[] {
  const text = read("06-docs/project/TASK_REGISTER.md");
  const blocks = text.split(/^## TASK-/m).slice(1);
  return blocks.map((block) => {
    const id = "TASK-" + block.match(/^(\d+)/)?.[1];
    const title = (block.match(/Title\s*\|\s*(.+?)\s*\|\s*$/m)?.[1] ?? "")
      .replace(/\s*\|\s*$/, "")
      .trim();
    const status = block.match(/Status\s*\|\s*(\w+)/)?.[1] ?? "";
    const priority = block.match(/Priority\s*\|\s*(\w+)/)?.[1] ?? "";
    const deps = block.match(/Dependencies\s*\|\s*(.+?)\s*\|\s*$/m)?.[1] ?? "";
    return { id, title, status, priority, dependencies: deps.replace(/\s*\|\s*$/, "").trim() };
  });
}

export function nextTask(): Task | undefined {
  return listTasks().find((t) => t.status === "READY" || t.status === "IN_PROGRESS");
}
