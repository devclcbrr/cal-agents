# webdev — Lessons Learned (feedback loop)

Durable corrections captured from real work. **The webdev agent reads this before starting any task.** This is the Level-2 self-improvement loop: knowledge in `trends.md` keeps the *outside world* current; lessons here keep *Mim's corrections* current.

Append via `/webdev-feedback`. Each lesson = what went wrong (or worked) + the generalizable rule + how to apply it.

**Curation (anti-rot):** when a lesson hardens into a permanent standard, promote it into `webdev.md`'s "Mim-specific rules" and mark the lesson here `**Promoted**`. The weekly curate pass prunes Promoted/obsolete entries so this file stays signal, not archive.

---

## Lessons

<!-- New lessons appended below this line -->

### Verify sub-500px responsive with DevTools emulation, not headless screenshots
- **Date:** 2026-05-29
- **Trigger:** clinic-mastery responsive pass
- **What happened:** Headless Chrome `--window-size` clamps to ~500px minimum, so mobile layouts looked falsely clipped/broken.
- **Rule:** For <500px checks, spin a separate headless Chrome with `--remote-debugging-port` + a fresh `--user-data-dir`, then drive device emulation via the chrome-devtools MCP. Don't trust raw headless screenshots below ~500px.
- **Applies to:** Any responsive verification, any project.
