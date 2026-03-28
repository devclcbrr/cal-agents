# Meta Ads Creative Strategist — Session Memory

**Location:** `~/cal-claude-code/agents/meta-ads/`
**Status:** Active
**Scope:** E-commerce + service-based Meta advertising (Facebook + Instagram)

---

## What This Is

A **Meta ads creative strategy agent system** with three specialized sub-agents, built on Claude Code. Handles creative briefs, ad copy, competitor research, trend analysis, creative auditing, and test planning.

---

## System Architecture

### Orchestrator
**File:** `meta-ads.md`
- Shared principles (client auto-loading, funnel awareness, compliance first)
- Output templates for all skills
- Routes to the correct sub-agent based on the task
- Niche adaptation rules (e-commerce vs service-based)

### Sub-Agent: Creative
**File:** `creative.md`
- Skills: `/creative-brief`, `/copy`, `/angles`, `/iterate`
- Thinks like a direct response copywriter and creative director
- Produces briefs, ad copy, angle concepts, and performance-based iterations

### Sub-Agent: Intel
**File:** `intel.md`
- Skills: `/swipe`, `/trends`, `/ad-learn`, `/ad-audit`
- Thinks like a competitive intelligence analyst
- Researches competitors, tracks trends, audits creatives, builds swipe file

### Sub-Agent: Analytics
**File:** `analytics.md`
- Skills: `/test-plan`
- Thinks like a growth strategist
- Designs creative tests, defines kill criteria, recommends testing sequences
- Future: reporting dashboard (pending Meta Marketing API MCP integration)

### Knowledge System
**Location:** `knowledge/`

| File | Purpose | Updated By |
|------|---------|-----------|
| `fundamentals.md` | Timeless principles — hooks, copy frameworks, funnel strategy, Meta specs, policies, offer framing, fatigue management, testing methodology | Manual |
| `trends.md` | What's working now — updated by `/ad-learn` and daily scheduled trigger | `/ad-learn` + trigger |
| `swipe-file.md` | Annotated competitor ads — built by `/swipe` | `/swipe` |
| `clients.md` | Brand profiles — voice, audience, offers, performance history | Manual + agent onboarding |
| `benchmarks.md` | Industry benchmarks by niche (e-commerce, services, video metrics, seasonal) | Manual |

---

## Skill Map

| Command | Sub-Agent | Mode | What It Does |
|---------|-----------|------|-------------|
| `/meta-ads` | orchestrator | Full | Activate system, load context |
| `/creative-brief` | creative | Strategy | Generate structured creative briefs |
| `/copy` | creative | Writing | Write ad copy per placement with variants |
| `/angles` | creative | Ideation | Generate hooks, angles, concepts |
| `/iterate` | creative | Optimization | Improve ads using performance data |
| `/swipe` | intel | Research | Analyze competitor ads, save to swipe file |
| `/trends` | intel | Pulse | What's performing now on Meta |
| `/ad-learn` | intel | Learning | Auto-scan sources, update knowledge |
| `/ad-audit` | intel | Analysis | Score creatives on hook, copy, compliance, fit |
| `/test-plan` | analytics | Testing | Design creative tests with kill criteria |

---

## Scheduled Automation

**Daily trigger:** `meta-ads-daily-learn`
- Runs daily at 2am Asia/Manila (6pm UTC)
- Scans marketing sources for Meta ads trends
- Updates `knowledge/trends.md`
- Commits changes to `devclcbrr/cal-agents`

---

## Key Files

| File | Purpose |
|------|---------|
| `meta-ads.md` | Orchestrator brain |
| `creative.md` | Creative sub-agent brain |
| `intel.md` | Intel sub-agent brain |
| `analytics.md` | Analytics sub-agent brain |
| `memory.md` | This file — system docs |
| `knowledge/fundamentals.md` | Timeless principles |
| `knowledge/trends.md` | Current trends (auto-updated) |
| `knowledge/swipe-file.md` | Annotated ad examples |
| `knowledge/clients.md` | Brand profiles |
| `knowledge/benchmarks.md` | Industry benchmarks |

---

## Quick Reference

**Activate:** `/meta-ads` then describe task
**Brief:** `/creative-brief [product/campaign]`
**Copy:** `/copy [product/campaign]`
**Angles:** `/angles [product/offer]`
**Iterate:** `/iterate [paste metrics + creative]`
**Audit:** `/ad-audit [paste or describe creative]`
**Swipe:** `/swipe [paste ad or describe it]`
**Trends:** `/trends`
**Learn:** `/ad-learn [topic/URL]`
**Test Plan:** `/test-plan [campaign/objective]`

---

## Future Enhancements

- [ ] Reporting dashboard (pending Meta Marketing API MCP server)
- [ ] Auto-generate Canva designs from creative briefs (Canva MCP is connected)
- [ ] Multi-platform expansion (Google Ads, TikTok Ads)
- [ ] Creative asset library management
- [ ] Automated fatigue detection from live campaign data
