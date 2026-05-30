#!/usr/bin/env node
/**
 * webdev-learn-refresh.mjs — weekly Level-1 knowledge refresh + curate (LOCAL, via launchd).
 *
 * Runs `claude -p` headless to execute /learn AND a curation pass, editing the
 * LOCAL knowledge files the webdev agent reads. No git round-trip — the files in
 * ~/cal-claude-code/agents/knowledge/ are authoritative locally, so a remote
 * cloud routine would only fight them. This keeps Level 1 simple and local.
 *
 * Manual test:  node webdev-learn-refresh.mjs
 * Logs:         agents/scripts/webdev-learn.log  (launchd-redirected)
 * Override bin: CLAUDE_BIN=/path/to/claude node webdev-learn-refresh.mjs
 */
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AGENTS = path.resolve(__dirname, '..'); // ~/cal-claude-code/agents

// Use the real native claude binary, NOT the cmux wrapper (which only resolves
// inside a cmux terminal and fails in launchd's clean env).
const CLAUDE_BIN =
  [process.env.CLAUDE_BIN, '/Users/mimcabrera/.local/bin/claude', '/opt/homebrew/bin/claude']
    .filter(Boolean)[0] || 'claude';

const PROMPT = `You are running Mim's weekly webdev knowledge refresh on his LOCAL machine. Work autonomously, do not ask questions, be concise.

Step 1 — LEARN: Read the runbook at ~/.claude/commands/learn.md and execute it with NO arguments. Scan the curated sources for web-dev developments newer than the most recent entries in ~/cal-claude-code/agents/knowledge/trends.md. Append new, actionable, production-relevant entries in the file's existing strict format. Prioritise the Baseline / caniuse / WebKit group when setting the Production-ready flag — honest cross-browser support only.

Step 2 — CURATE (anti-rot, this is what keeps the file smart not bloated): Re-evaluate existing trends.md entries. If an entry's browser-support advanced, update its flag and add an "Updated: <date>" note; mark superseded entries **Outdated**. Prune entries that have been **Outdated** for more than ~60 days. Keep the file under ~30 entries — if over, drop the least-actionable Outdated ones. NEVER modify fundamentals.md.

Step 3 — Print a one-line summary: "<N> new, <M> re-evaluated, <K> pruned".`;

console.log(`[${new Date().toISOString()}] webdev-learn refresh start — bin=${CLAUDE_BIN}`);

const res = spawnSync(
  CLAUDE_BIN,
  [
    '-p', '--output-format', 'text',
    '--allowed-tools', 'Bash', 'Read', 'Write', 'Edit', 'Glob', 'Grep', 'WebFetch', 'WebSearch',
    '--append-system-prompt',
    "You are Mim's local webdev knowledge-refresh runner. Execute /learn and curate trends.md fully and autonomously. Never mark a Chrome-only feature production-ready.",
  ],
  { input: PROMPT, cwd: AGENTS, encoding: 'utf8', maxBuffer: 40 * 1024 * 1024, timeout: 20 * 60 * 1000 }
);

if (res.error || res.status !== 0) {
  console.error(`[${new Date().toISOString()}] FAILED: ${(res.stderr || res.error?.message || 'unknown').slice(0, 500)}`);
  process.exit(1);
}

console.log(res.stdout || '');
console.log(`[${new Date().toISOString()}] webdev-learn refresh done`);
