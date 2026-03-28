# Web Development Agent System — Session Memory

**Location:** `/Users/mimcabrera/cal-claude-code/agents/`
**Status:** ✅ Live and operational
**Scope:** Global — works across all projects in `~/cal-claude-code/`

---

## What This Is

A comprehensive **web development agent system** built on Claude Code to orchestrate all coding, refactoring, auditing, and design tasks across projects. The agent learns over time, stays current with trends, and enforces standards.

---

## System Architecture

### Agent Brain
**File:** `webdev.md` — 250+ lines of instructions covering:
- Core principles (read before write, design tokens first, ask before destroying)
- Tech stack (HubSpot CMS, HubL, HTML, CSS, JS, React)
- Task modes (build, refactor, audit, review, tokens)
- Coding rules (CSS max nesting 3, no !important, semantic HTML)
- File organization standards
- Output style (concise, terse, no filler)

### Knowledge System
**Location:** `knowledge/`

#### Fundamentals (`fundamentals.md`)
Static knowledge covering:
- HTML semantics and accessibility
- CSS architecture (ITCSS, design tokens, responsive)
- JavaScript patterns (modern ES2020+)
- React + HubL hybrid patterns
- Performance targets (Core Web Vitals)
- SEO essentials
- Testing checklist

#### Trends (`trends.md`)
Living document updated by `/learn` command:
- **Seeded with 8 entries** on modern CSS:
  - Native CSS nesting (all browsers)
  - Container queries (@container)
  - `:has()` selector (parent/sibling styling)
  - View Transitions API (page transitions)
  - Popover API (native popovers)
  - `oklch()` color function (perceptual uniformity)
  - CSS Subgrid (nested grid alignment)
  - Anchor positioning (Chromium only, not ready)

Each trend entry includes:
- Browser support status
- Production readiness (Yes/No/Partial)
- Code example
- When to use

**How it works:** Agent reads both files before deciding, prefers trends that are production-ready over old patterns.

### Task Modes (Slash Commands)

| Command | Mode | What It Does |
|---------|------|------------|
| `/webdev` | Full | Activates agent, reads project context, waits for instructions |
| `/build` | Scaffold | Create new files, components, modules (follows conventions) |
| `/refactor` | Clean | Replace hardcoded values with tokens, remove dead code, show diffs |
| `/audit` | Scan | Trace dependencies, find orphans, scan for hardcoded values (NO changes) |
| `/review` | Quality | Check accessibility, performance, security, SEO, CSS quality |
| `/tokens` | Design System | Find hardcoded values, propose tokens, enforce usage |

### Learning System

**`/learn` command** — research and save new knowledge

**Modes:**
1. **Topic research:** `/learn CSS scroll-driven animations`
   - Researches the topic, extracts best practices
   - Saves to `knowledge/trends.md`

2. **URL fetch:** `/learn https://web.dev/article-about-css`
   - Extracts key takeaways from URL
   - Saves to trends.md

3. **Curated sources:** `/learn` (no args)
   - Scans web.dev, MDN, Chrome blog, CSS-Tricks
   - Finds what's new and worth knowing

**Integration:** Trends saved by `/learn` are automatically read by `/webdev` agent

### Frontend Design Skill

**`/frontend-design`** — create distinctive, production-grade UI

Installed from ClawHub. Guides creation of:
- Components with intentional aesthetic direction
- Bold, memorable design (not generic AI slop)
- Production-ready code
- Avoids clichés (Inter fonts, purple gradients, predictable layouts)

---

## How It Works in Practice

### Example: Build a New Component

```
User: /build header navigation menu for new theme
```

Agent:
1. Reads webdev.md instructions
2. Reads project CLAUDE.md for context
3. Creates `header-nav.module/` with:
   - `module.html` (HubL structure)
   - `module.css` (references design tokens, no hardcoded values)
   - `module.js` (minimal, semantic)
   - `fields.json`, `meta.json` (HubSpot config)
   - Follows STANDARDS.md patterns

### Example: Refactor CSS

```
User: /refactor header.css with design tokens
```

Agent:
1. Reads `design-tokens.css`
2. Reads header.css line by line
3. Replaces hardcoded values:
   - `color: #288FCA` → `color: var(--color-primary)`
   - `padding: 20px` → `padding: var(--space-6)`
   - `font-size: 16px` → `font-size: var(--text-lg)`
4. Shows before/after diffs
5. Asks for approval before saving

### Example: Stay Current

```
Session 1: User builds components, agent uses current best practices
↓
User runs: /learn container queries
↓
Agent researches, finds container queries are production-ready
↓
Agent saves to trends.md: "@container is fully supported, use for component-level responsiveness"
↓
Session 2 (next week): Agent reads updated trends.md
↓
Agent now recommends container queries over media queries for components
```

---

## Files Created

### Agent Core
- `webdev.md` (250+ lines) — agent instructions, tech stack, rules
- `knowledge/fundamentals.md` — core web dev principles
- `knowledge/trends.md` — modern APIs and patterns

### Task Mode Commands
- `~/.claude/commands/webdev.md` — full agent activation
- `~/.claude/commands/build.md` — scaffold mode
- `~/.claude/commands/refactor.md` — clean mode
- `~/.claude/commands/audit.md` — scan mode
- `~/.claude/commands/review.md` — quality check mode
- `~/.claude/commands/tokens.md` — token enforcement mode
- `~/.claude/commands/learn.md` — research and save mode

### Skills
- `~/.claude/commands/frontend-design.md` — distinctive UI creation
- `~/.claude/skills/last30days/` — ClawHub skill installed (research last 30 days)

---

## Design Principles

### 1. Standards-First
Agent enforces WCAG 2.1 AA accessibility, responsive design, Core Web Vitals targets, semantic HTML, clean CSS architecture.

### 2. Design Tokens Everything
Never hardcode colors, spacing, fonts, or sizes. Always use CSS custom properties from design-tokens.css.

### 3. React + HubL (When Applicable)
React for complex state, HubL for rendering and HubSpot integration. Never pure React, never vanilla JS for state.

### 4. Read Before Write
Agent always reads existing code before suggesting changes. Understands context, patterns, and architecture.

### 5. Minimal Changes
Do the task, nothing more. No unsolicited refactors, no "while we're at it" improvements.

### 6. Ask Before Destroying
Never delete files, force push, or overwrite without confirmation.

---

## Integration Points

### Projects Using This Agent

1. **DGEX HubSpot Audit**
   - Uses `/audit` to scan dependencies
   - Uses `/tokens` to enforce design system
   - Reference: `../hs-discoverer-audit/memory.md`

2. **cms-theme-discoverer** (New Theme)
   - Uses `/build` to scaffold modules
   - Uses `/refactor` to use design tokens
   - Uses `/review` for quality checks
   - Reference: `../cms-theme-discoverer/memory.md`

3. **Other Projects** (future)
   - Agent scales to any web dev project
   - Reads project CLAUDE.md for context
   - Adapts to project conventions

### Knowledge Sharing

When agent learns something new via `/learn`:
- Saved to `knowledge/trends.md`
- Available to ALL projects in next session
- Evolves over time as web standards advance

---

## Learning System Details

### What Gets Learned

**Production-ready patterns:**
- New CSS features (`:has()`, `@container`, nesting)
- New APIs (View Transitions, Popover, Anchor Positioning)
- New frameworks/libraries (if relevant)
- New best practices (React patterns, a11y techniques)
- Performance optimizations

**What doesn't:** Opinion pieces, announcements without code impact, experimental/vapor tech

### How It's Used

Agent checks `knowledge/trends.md` before making decisions:
- If trend is "Production ready: Yes" with broad browser support → prefer it
- If trend is "Partial" or "No" → stick to fundamentals
- If trend contradicts fundamentals → production-ready trend wins

### Example Workflow

Session 1:
```
User: /refactor button.css
Agent: Uses old CSS approach (no @container support on radar yet)
Outputs: Clean CSS using flexbox
```

Session 2 (after learning):
```
User: /learn container queries CSS
Agent: Researches, saves to trends.md — "All browsers, production ready"
```

Session 3:
```
User: /refactor card.css
Agent: Reads trends.md, finds @container entry
Recommends: "Use @container for responsive card widths instead of media queries"
```

---

## Workflow Examples

### Build a New Landing Page

```
/webdev
```
↓
Agent reads project CLAUDE.md
↓
```
/build landing page for DGEX product catalog
```
↓
Agent:
- Reads existing landing pages for patterns
- Creates `templates/product-landing.html`
- Includes modules (hero, features, CTA)
- All CSS uses design tokens
- Follows STANDARDS.md accessibility rules
↓
```
/review landing page accessibility
```
↓
Agent audits for WCAG 2.1 AA compliance

### Migrate Old Theme to New

```
/audit cms-dgex-theme dependencies
```
↓
Agent lists all modules, partials, styles used
↓
```
/build header.module v3 (React + HubL)
```
↓
Agent creates new, clean version
↓
```
/review new header performance
```
↓
Agent checks Core Web Vitals, sizes, render time
↓
```
/audit old theme orphaned files
```
↓
Agent lists what can be deleted

---

## Global Configuration

### How to Activate

**Full Agent:**
```
/webdev
```

**Specific Task:**
```
/build [component/description]
/refactor [file/description]
/audit [topic/description]
/review [component/aspect]
/tokens [file/topic]
/learn [topic/URL]
```

### How to Extend

To add new task modes:
1. Create `~/.claude/commands/new-mode.md`
2. Reference `webdev.md` instructions
3. Add specific guidance for that mode
4. Document in this memory.md

To add new knowledge:
1. Run `/learn [topic]`
2. Agent saves to `knowledge/trends.md`
3. Automatically available to all projects next session

---

## Performance Characteristics

- **Speed:** Agent reads memory files instantly (they're local, small)
- **Accuracy:** Based on actual code reading + standards knowledge
- **Latency:** No network calls (trends are cached locally)
- **Scope:** Entire ~/cal-claude-code/ — all projects benefit from learning
- **Durability:** Knowledge in trends.md persists across sessions

---

## Future Enhancements

- [ ] Add image optimization agent mode
- [ ] Add performance profiling mode
- [ ] Add accessibility scanner mode (automated)
- [ ] Add bundle analyzer mode
- [ ] Add component documentation generator
- [ ] Add test generator mode (unit, integration, e2e)
- [ ] Add migration assistant (old framework → new)

---

## Key Files

| File | Purpose |
|------|---------|
| `webdev.md` | Agent brain (rules, patterns, principles) |
| `knowledge/fundamentals.md` | Static knowledge (timeless web dev) |
| `knowledge/trends.md` | Dynamic knowledge (updated by /learn) |
| `~/.claude/commands/webdev.md` | Entry point (full agent) |
| `~/.claude/commands/*.md` | Task mode shortcuts |
| `~/.claude/commands/frontend-design.md` | Design skill |

---

## Quick Reference

**Activate:** `/webdev` then describe task
**Build:** `/build [component]`
**Refactor:** `/refactor [file]`
**Audit:** `/audit [topic]`
**Review:** `/review [component]`
**Learn:** `/learn [topic/URL]`
**Design:** `/frontend-design [concept]`

---

**This agent is built to learn, adapt, and enforce standards as web development evolves.**
