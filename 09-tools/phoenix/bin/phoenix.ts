import { Command } from "commander";
import { parseProjectState, parseProgress, parseHealth, listTasks, nextTask } from "../src/docs.js";
import { run, repoRoot } from "../src/core.js";
import { readFileSync } from "node:fs";

const program = new Command();

program.name("phoenix").description("Phoenix CLI — repository control center").version("0.1.0");

// ── status ──────────────────────────────────────
program
  .command("status")
  .description("Show repository status")
  .action(() => {
    const state = parseProjectState();
    const progress = parseProgress();
    console.log(`\n  Phoenix Repository`);
    console.log(`  ${"─".repeat(40)}`);
    console.log(`  Phase          ${state.phase}`);
    console.log(`  Milestone      ${state.milestone}`);
    console.log(`  Current Task   ${state.task}`);
    console.log(`  Status         ${state.status}`);
    console.log(`  Progress       ${progress.pct}%`);
    console.log(`  Health         ${state.health}`);
    console.log(`  Next Action    ${state.nextAction}`);
    console.log(`  Blockers       ${state.blockers}`);
    console.log();
  });

// ── doctor ──────────────────────────────────────
program
  .command("doctor")
  .description("Validate repository health")
  .action(() => {
    const health = parseHealth();
    let allPass = true;
    for (const [check, status] of Object.entries(health)) {
      const ok = status === "PASS";
      if (!ok) allPass = false;
      console.log(`  ${ok ? "✓" : "✗"} ${check.padEnd(16)} ${status}`);
    }
    console.log();
    if (allPass) {
      console.log("  Repository is healthy.");
    } else {
      console.log("  Some checks are failing. Run `phoenix doctor` for details.");
    }
    console.log();
  });

// ── progress ────────────────────────────────────
program
  .command("progress")
  .description("Show progress dashboard")
  .action(() => {
    const p = parseProgress();
    const blocks = Math.round(p.pct / 5);
    const bar = "█".repeat(blocks) + "░".repeat(20 - blocks);
    console.log(`\n  Overall Progress`);
    console.log(`  ${bar}`);
    console.log(`  ${p.pct}%\n`);
    console.log(`  Completed           ${p.completed}`);
    console.log(`  Remaining           ${p.remaining}`);
    console.log(`  Blocked             ${p.blocked}`);
    console.log(`  Milestones          ${p.milestones}`);
    console.log();
  });

// ── roadmap ─────────────────────────────────────
program
  .command("roadmap")
  .description("Display roadmap")
  .action(() => {
    const text = readFileSync(repoRoot(".opencode/ROADMAP.md"), "utf-8");
    const lines = text.split("\n").filter((l) => l.startsWith("## ") || l.startsWith("| "));
    for (const line of lines) {
      if (line.startsWith("## ")) {
        console.log(`\n  ${line.replace(/^#+\s*/, "").trim()}`);
      } else if (line.startsWith("|")) {
        const parts = line
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean);
        if (parts.length >= 2) {
          console.log(`    ${(parts[0] ?? "").padEnd(50)} ${parts[1] ?? ""}`);
        }
      }
    }
    console.log();
  });

// ── task ────────────────────────────────────────
const taskCmd = program.command("task").description("Manage tasks");

taskCmd
  .command("list")
  .description("List all tasks")
  .action(() => {
    const tasks = listTasks();
    console.log();
    for (const t of tasks) {
      const icon =
        t.status === "COMPLETED"
          ? "✓"
          : t.status === "IN_PROGRESS"
            ? "→"
            : t.status === "BLOCKED"
              ? "!"
              : t.status === "REVIEW"
                ? "?"
                : t.status === "READY"
                  ? "○"
                  : "·";
      const prio = t.priority === "HIGH" ? "\x1b[33m" : "";
      const reset = "\x1b[0m";
      console.log(`  ${icon} ${t.id.padEnd(10)} ${prio}${t.status.padEnd(14)}${reset} ${t.title}`);
    }
    console.log();
  });

taskCmd
  .command("next")
  .description("Show highest-priority READY task")
  .action(() => {
    const t = nextTask();
    if (t) {
      console.log(`\n  Next: ${t.id} — ${t.title}\n`);
    } else {
      console.log("\n  No READY tasks.\n");
    }
  });

taskCmd
  .command("start")
  .argument("<id>", "Task ID (e.g. TASK-0009)")
  .action((id: string) => {
    console.log(`  Starting ${id}...`);
    console.log("  Update TASK_REGISTER.md status to IN_PROGRESS manually.\n");
  });

taskCmd
  .command("done")
  .argument("<id>", "Task ID")
  .action((id: string) => {
    console.log(`  Marking ${id} as COMPLETED...`);
    console.log("  Update TASK_REGISTER.md, BUILD_SUMMARY.md, and CHANGELOG.md manually.\n");
  });

// ── build / lint / test / format / validate ─────
program
  .command("build")
  .description("Build the project")
  .action(() => {
    const r = run("pnpm build");
    console.log(r.stdout || r.stderr);
    process.exit(r.code);
  });

program
  .command("lint")
  .description("Run lint")
  .action(() => {
    const r = run("pnpm lint");
    console.log(r.stdout || r.stderr);
    process.exit(r.code);
  });

program
  .command("test")
  .description("Run tests")
  .action(() => {
    const r = run("pnpm test");
    console.log(r.stdout || r.stderr);
    process.exit(r.code);
  });

program
  .command("format")
  .description("Format code")
  .action(() => {
    const r = run("pnpm format");
    console.log(r.stdout || r.stderr);
    process.exit(r.code);
  });

program
  .command("validate")
  .description("Run all validation (typecheck, lint, test, format:check)")
  .action(() => {
    const steps = [
      ["TypeScript", "pnpm --filter web typecheck && pnpm --filter ui typecheck"],
      ["Lint", "pnpm lint"],
      ["Tests", "pnpm test"],
      ["Format", "pnpm format:check"],
    ];
    let allPass = true;
    for (const [label, cmd] of steps) {
      process.stdout.write(`  ${label}... `);
      const r = run(cmd!);
      if (r.code === 0) {
        console.log("PASS");
      } else {
        allPass = false;
        console.log("FAIL");
        console.log(r.stderr || r.stdout);
      }
    }
    console.log(allPass ? "\n  All checks passed.\n" : "\n  Some checks failed.\n");
    process.exit(allPass ? 0 : 1);
  });

// ── commit ──────────────────────────────────────
program
  .command("commit")
  .description("Create a conventional commit")
  .argument("<message>", 'Commit message e.g. "feat(ui): add Button"')
  .action((message: string) => {
    const r = run(`git add -A && git commit -m "${message}"`);
    console.log(r.stdout || r.stderr);
    process.exit(r.code);
  });

// ── show tokens ─────────────────────────────────
program
  .command("tokens")
  .description("Show design tokens overview")
  .action(() => {
    const dir = repoRoot("02-packages/ui/src/tokens");
    const files = [
      "colors.ts",
      "typography.ts",
      "spacing.ts",
      "radius.ts",
      "shadows.ts",
      "motion.ts",
      "breakpoints.ts",
    ];
    console.log();
    for (const f of files) {
      console.log(`  ${f.replace(".ts", "").padEnd(16)} ${dir}/${f}`);
    }
    console.log(
      `  ${"theme".padEnd(16)} ${repoRoot("02-packages/ui/src/theme/ThemeProvider.tsx")}`,
    );
    console.log();
  });

// ── natural language passthrough ────────────────
program
  .argument("[query...]")
  .allowExcessArguments(true)
  .action((query: string[]) => {
    if (query.length > 0) {
      const text = query.join(" ");
      console.log(`\n  Interpreting: "${text}"\n`);
      if (/next|what.*build/i.test(text)) {
        const t = nextTask();
        if (t) console.log(`  Next task: ${t.id} — ${t.title}`);
        else console.log("  No READY tasks.");
      } else if (/status|health/i.test(text)) {
        const state = parseProjectState();
        console.log(
          `  Status: ${state.status} | Health: ${state.health} | Next: ${state.nextAction}`,
        );
      } else if (/progress/i.test(text)) {
        const p = parseProgress();
        console.log(`  Progress: ${p.pct}% (${p.completed} done, ${p.remaining} remaining)`);
      } else {
        console.log(
          "  Try: `phoenix status`, `phoenix doctor`, `phoenix progress`, `phoenix task next`",
        );
      }
      console.log();
    } else {
      program.help();
    }
  });

program.parse(process.argv);
