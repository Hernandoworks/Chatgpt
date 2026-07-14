import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const REPO_ROOT = resolve(import.meta.dirname, "../../..");

export function repoRoot(...segments: string[]): string {
  return resolve(REPO_ROOT, ...segments);
}

export function read(path: string): string {
  return readFileSync(repoRoot(path), "utf-8");
}

export function run(cmd: string): { stdout: string; stderr: string; code: number } {
  try {
    const stdout = execSync(cmd, {
      cwd: REPO_ROOT,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    return { stdout: stdout.trim(), stderr: "", code: 0 };
  } catch (e: unknown) {
    const err = e as Error & { stdout?: string; stderr?: string; status?: number };
    return {
      stdout: (err.stdout ?? "").toString().trim(),
      stderr: (err.stderr ?? err.message).toString().trim(),
      code: err.status ?? 1,
    };
  }
}
