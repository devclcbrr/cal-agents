# Web Development Trends — Knowledge Base

This file is updated by the `/learn` command. Each entry includes the source, date learned, and key takeaways.

---

## How This Works

1. Run `/learn` with a topic or URL to fetch and save new knowledge
2. Run `/learn` with no args to scan curated sources for what's new
3. The webdev agent reads this file before making technology decisions
4. Outdated entries get marked and eventually pruned

---

## Entries

<!-- New entries are added below this line -->

### CSS Nesting (Native)
- **Date learned:** 2026-03-27
- **Source:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting
- **Browser support:** All major browsers (Chrome 120+, Firefox 117+, Safari 17.2+)
- **Production ready:** Yes
- **Summary:** Native CSS nesting allows writing nested selectors without a preprocessor. Uses `&` for parent reference. Eliminates need for Sass/Less just for nesting.
- **Usage example:**
  ```css
  .card {
    padding: 1rem;

    & .title {
      font-size: 1.5rem;
    }

    &:hover {
      background: var(--color-gray-100);
    }

    @media (min-width: 768px) {
      padding: 2rem;
    }
  }
  ```
- **When to use:** All new CSS. Replace preprocessor nesting. Keep nesting to 2-3 levels max.

### CSS Container Queries
- **Date learned:** 2026-03-27
- **Source:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries
- **Browser support:** All major browsers (Chrome 105+, Firefox 110+, Safari 16+)
- **Production ready:** Yes
- **Summary:** Style elements based on their container size instead of viewport. Components can be truly responsive independent of where they're placed. Uses `container-type` and `@container`.
- **Usage example:**
  ```css
  .card-wrapper {
    container-type: inline-size;
  }

  .card {
    display: grid;
    grid-template-columns: 1fr;
  }

  @container (min-width: 400px) {
    .card {
      grid-template-columns: 200px 1fr;
    }
  }
  ```
- **When to use:** Component-level responsive design. Prefer over media queries when the component lives in variable-width containers.

### CSS :has() Selector
- **Date learned:** 2026-03-27
- **Source:** https://developer.mozilla.org/en-US/docs/Web/CSS/:has
- **Browser support:** All major browsers (Chrome 105+, Firefox 121+, Safari 15.4+)
- **Production ready:** Yes
- **Summary:** Parent selector — style a parent based on its children. Eliminates many JS-only styling patterns. Can also select previous siblings.
- **Usage example:**
  ```css
  /* Style form group when input is focused */
  .form-group:has(input:focus) {
    border-color: var(--color-primary);
  }

  /* Card with image gets different layout */
  .card:has(img) {
    grid-template-rows: 200px 1fr;
  }

  /* Previous sibling styling */
  h2:has(+ p) {
    margin-bottom: 0.5rem;
  }
  ```
- **When to use:** Conditional parent/sibling styling. Replace JS class toggling for state-dependent styles.

### CSS View Transitions API
- **Date learned:** 2026-03-27
- **Source:** https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
- **Browser support:** Same-document: Baseline (all engines). Cross-document: Chrome 126+, Safari 18.2+, Firefox in progress (146–151 partial). **Updated 2026-05-31.**
- **Production ready:** Yes for same-document; Partial→safe for cross-document as **progressive enhancement** (no-ops where unsupported).
- **Summary:** Animates between DOM states with browser-managed transitions. Creates smooth page/state changes without manual animation code. Supports both SPA and MPA transitions. Cross-document (MPA) opt-in: `@view-transition { navigation: auto; }` on every participating same-origin page.
- **Usage example:**
  ```css
  .card {
    view-transition-name: card-hero;
  }

  ::view-transition-old(card-hero) {
    animation: fade-out 0.3s ease-out;
  }

  ::view-transition-new(card-hero) {
    animation: fade-in 0.3s ease-in;
  }
  ```
  ```js
  document.startViewTransition(() => {
    updateDOM();
  });
  ```
- **When to use:** Page transitions in SPAs. State changes that benefit from visual continuity. Not yet reliable for cross-page MPA transitions.

### CSS Anchor Positioning
- **Date learned:** 2026-03-27 · **Updated:** 2026-05-31 (status flipped No → Yes)
- **Source:** https://caniuse.com/css-anchor-positioning · https://web.dev/baseline
- **Browser support:** Now cross-browser — Chrome 125+, Firefox 147+ (shipped Jan 2026), Safari 26 / 18.2+ (`@position-try` flip needs Safari 18.4+). ~91% traffic. **Baseline 2026.**
- **Production ready:** Yes (was No in March — Firefox 147 completed the set)
- **Summary:** Position elements relative to an "anchor" element without JS. Perfect for tooltips, popovers, dropdowns. Uses `anchor-name` and `position-anchor`.
- **Usage example:**
  ```css
  .trigger {
    anchor-name: --my-anchor;
  }

  .tooltip {
    position: fixed;
    position-anchor: --my-anchor;
    top: anchor(bottom);
    left: anchor(center);
  }
  ```
- **When to use:** Now production-safe for tooltips/popovers/dropdowns — pairs naturally with the Popover API. Drop Floating UI for new work; keep a static fallback only if you must support pre-2026 Safari/Firefox. Use `@supports (anchor-name: --x)` for progressive enhancement on legacy.

### Popover API (Native)
- **Date learned:** 2026-03-27
- **Source:** https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
- **Browser support:** All major browsers (Chrome 114+, Firefox 125+, Safari 17+)
- **Production ready:** Yes
- **Summary:** Native HTML attribute for popovers — handles show/hide, backdrop, focus trapping, and light dismiss without JS. Works with `popover` attribute and `popovertarget`.
- **Usage example:**
  ```html
  <button popovertarget="my-popover">Open</button>
  <div id="my-popover" popover>
    <p>Popover content here</p>
  </div>
  ```
  ```css
  [popover] {
    padding: 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-gray-200);
  }

  [popover]::backdrop {
    background: rgb(0 0 0 / 0.1);
  }
  ```
- **When to use:** Tooltips, menus, dropdowns, notification panels. Replace custom JS-based popover implementations.

### CSS oklch() Color Function
- **Date learned:** 2026-03-27
- **Source:** https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
- **Browser support:** All major browsers (Chrome 111+, Firefox 113+, Safari 15.4+)
- **Production ready:** Yes
- **Summary:** Perceptually uniform color space. Colors with the same lightness value actually look equally light (unlike HSL). Makes generating consistent color palettes trivial — change hue, keep lightness/chroma, and colors feel balanced.
- **Usage example:**
  ```css
  :root {
    --color-primary: oklch(0.59 0.16 245);     /* blue */
    --color-primary-light: oklch(0.72 0.12 245); /* same hue, lighter */
    --color-primary-dark: oklch(0.45 0.18 245);  /* same hue, darker */

    /* Generate accent by rotating hue */
    --color-accent: oklch(0.59 0.16 30);  /* same lightness/chroma, warm hue */
  }
  ```
- **When to use:** Design token color definitions. Generating shade/tint scales. Any time you need perceptually consistent color relationships.

### CSS Subgrid
- **Date learned:** 2026-03-27
- **Source:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid
- **Browser support:** All major browsers (Chrome 117+, Firefox 71+, Safari 16+)
- **Production ready:** Yes
- **Summary:** Child grid elements can inherit track sizing from their parent grid. Solves the alignment problem where card titles, content, and buttons need to align across a row of cards.
- **Usage example:**
  ```css
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .card {
    display: grid;
    grid-row: span 3;
    grid-template-rows: subgrid;
  }
  ```
- **When to use:** Card grids where content needs cross-card alignment. Any nested grid that should share parent track sizes.

---

## HubSpot CMS Best Practices

### HubL Template Structure & Annotations
- **Date learned:** 2026-04-02
- **Source:** https://developers.hubspot.com/docs/cms/start-building/building-blocks/templates/html-hubl-templates
- **Browser support:** N/A (server-side)
- **Production ready:** Yes
- **Summary:** Every HTML+HubL template requires annotations in an HTML comment at the top. Templates must include `{{ standard_header_includes }}` and `{{ standard_footer_includes }}` for HubSpot tracking and asset loading. Use partials for reusable code, global partials for shared content (headers/footers), and template inheritance with `{% extends %}` / `{% block %}` for layout consistency.
- **Usage example:**
  ```html
  <!--
    templateType: page
    isAvailableForNewContent: true
    enableDomainStylesheets: false
    label: My Template
    screenshotPath: ../images/preview.png
  -->

  {{ standard_header_includes }}

  {% extends "./layouts/base.html" %}
  {% block body %}
    {% dnd_area "main_content" %}
      {% dnd_section %}
        {% dnd_module path="@hubspot/rich_text" %}
        {% end_dnd_module %}
      {% end_dnd_section %}
    {% end_dnd_area %}
  {% endblock %}

  {{ standard_footer_includes }}
  ```
- **When to use:** Every new HubSpot template. Always include annotations, use partials to avoid duplication, prefer drag-and-drop areas for content creator flexibility.

### HubSpot Module Architecture
- **Date learned:** 2026-04-02
- **Source:** https://nexalab.io/blog/development/huspot-modules/
- **Browser support:** N/A (server-side + client)
- **Production ready:** Yes
- **Summary:** Modules follow a strict folder structure: `module.html`, `module.css`, `module.js`, `fields.json`, `meta.json`. Load CSS/JS through `meta.json` instead of direct `<link>` tags so assets only load when the module is present on a page. Design modules for reusability — a single "Card" module should serve testimonials, team members, and blog summaries. Use descriptive field names like `testimonial_author_name`, not `text1`.
- **Usage example:**
  ```
  my-card.module/
  ├── module.html      <!-- HubL markup -->
  ├── module.css       <!-- Scoped styles -->
  ├── module.js        <!-- Client-side behavior -->
  ├── fields.json      <!-- Editable fields config -->
  └── meta.json        <!-- CSS/JS dependencies, icon, label -->
  ```
  ```json
  // meta.json — load CSS conditionally
  {
    "css_assets": [{ "path": "../css/card-styles.css" }],
    "js_assets": [{ "path": "../js/card-interactions.js" }]
  }
  ```
  ```html
  <!-- module.html — graceful empty-field handling -->
  {% if module.heading %}
    <h2>{{ module.heading }}</h2>
  {% endif %}
  {% if module.body_text %}
    <div class="card__body">{{ module.body_text }}</div>
  {% endif %}
  ```
- **When to use:** All HubSpot module development. Always use `meta.json` for asset loading. Always handle empty fields with `{% if %}` checks. Use BEM naming in module CSS.

### HubL Performance & Clean Code
- **Date learned:** 2026-04-02
- **Source:** https://developers.hubspot.com/blog/coding-for-marketers-your-guide-to-coding-on-hubspots-cms-hub
- **Browser support:** N/A (server-side)
- **Production ready:** Yes
- **Summary:** Keep HubL logic clean and concise. Complex loops pulling lots of data in a single module slow page load times. Use built-in HubL filters: `|safe` for rich text fields, `|truncate` for previews, `|pprint` for debugging. Use HubL macros for repeated patterns. Avoid inline styles except for dynamic values from HubL variables.
- **Usage example:**
  ```html
  {# Macro for repeated button pattern #}
  {% macro render_button(text, url, style) %}
    <a href="{{ url }}" class="btn btn--{{ style|default('primary') }}">
      {{ text }}
    </a>
  {% endmacro %}

  {# Use filters appropriately #}
  {{ module.rich_text_field|safe }}
  {{ module.description|truncate(120) }}

  {# Conditional logic for optional fields #}
  {% if module.cta_link.url.href %}
    {{ render_button(module.cta_text, module.cta_link.url.href, "primary") }}
  {% endif %}
  ```
- **When to use:** All HubL development. Keep loops simple, use macros for repeated patterns, always use appropriate filters for field types.

---

## Clean Code Principles (Front-End)

### KISS, DRY, YAGNI for Frontend
- **Date learned:** 2026-04-02
- **Source:** https://dev.to/miasalazar/writing-clean-code-in-front-end-kiss-dry-yaign-and-beyond-54ok
- **Browser support:** N/A (methodology)
- **Production ready:** Yes
- **Summary:** Three foundational principles for maintainable frontend code. KISS: extract complex conditionals into named functions for readability. DRY: consolidate repeated UI patterns into components, but avoid over-abstraction. YAGNI: build for current requirements, not hypothetical future needs. Business requirements always beat clean code dogma — ship first, refactor strategically.
- **Usage example:**
  ```javascript
  // KISS — extract complex logic into named functions
  // Bad:
  const isAdmin = user?.roles?.includes('admin') && user?.permissions?.some(p => p.code === 'ALL_ACCESS') && user?.metadata?.active === true;
  // Good:
  const isAdmin = checkUserIsAdmin(user);

  // DRY — consolidate repeated patterns, don't over-abstract
  // 3 similar lines > premature abstraction

  // YAGNI — no speculative code
  // Don't add config options nobody asked for
  ```
- **When to use:** Every code decision. Apply as guidelines, not rigid rules. When principles conflict with shipping, ship and refactor later.

### Frontend Clean Code Practices 2026
- **Date learned:** 2026-04-02
- **Source:** https://medium.com/@hashbyt/frontend-clean-code-2026-2dc95e28f184
- **Browser support:** N/A (methodology)
- **Production ready:** Yes
- **Summary:** Clean code in 2026 is "a direction, not a destination." Key rules: meaningful names that convey intent, small single-purpose functions, separate business logic from UI rendering. Anti-patterns to avoid: over-engineering that discourages collaboration, fear-based development from perfectionist reviews, blindly trusting AI-generated code without architectural review, and massive multi-year refactor initiatives that never finish.
- **Usage example:**
  ```javascript
  // Naming: convey purpose and intent
  // Bad: handleClick, data, temp, flag
  // Good: handleFormSubmission, userProfile, isAuthenticated

  // Functions: small and single-purpose
  // Bad: a 200-line renderPage() that fetches, transforms, and renders
  // Good: fetchUserData() → transformForDisplay() → renderUserCard()

  // Separate concerns
  // Bad: API calls inside render logic
  // Good: custom hooks/services for data, components for display
  ```
- **When to use:** All frontend code. Prioritize readability over cleverness. Review AI-generated code for architectural coherence, not just formatting.

---

## Frontend Trends 2026

### CSS Customizable Select Elements
- **Date learned:** 2026-04-02
- **Source:** https://blog.logrocket.com/css-in-2026/
- **Browser support:** Chrome/Edge/Opera 134+ (default-on from 135). Firefox + Safari actively implementing, not shipped. ~70% global coverage. **Updated 2026-05-31.**
- **Production ready:** Partial — safe **only** behind `@supports` progressive enhancement (native `<select>` is the fallback; no JS needed either way). Was No in April; now usable with a guard.
- **Summary:** New `appearance: base-select` opts `<select>` into fully customizable mode while preserving native keyboard/accessibility behavior. Style dropdowns with `::picker(select)` pseudo-element. Paired with `sibling-index()` and `sibling-count()` functions for dynamic stagger animations and equal-width layouts.
- **Usage example:**
  ```css
  select {
    appearance: base-select;
  }

  select::picker(select) {
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  }

  option {
    transition-delay: calc(0.2s * (sibling-index() - 1));
  }
  ```
- **When to use:** NOT yet — Chromium only. Monitor for cross-browser support. Continue using custom dropdown components for production.

### CSS @starting-style
- **Date learned:** 2026-04-02
- **Source:** https://blog.logrocket.com/css-in-2026/
- **Browser support:** Chrome 117+, Firefox 129+, Safari 17.5+ — now **Baseline (cross-browser)**. **Updated 2026-05-31.**
- **Production ready:** Yes (was Partial in April; now broadly stable)
- **Summary:** Defines initial styles for entry animations. Elements can animate from a starting state when first rendered or when transitioning from `display: none`. Enables CSS-only appear animations without JS. Pairs with `transition-behavior: allow-discrete` to animate `display`.
- **Usage example:**
  ```css
  .modal {
    opacity: 1;
    translate: 0 0;
    transition: opacity 0.3s, translate 0.3s;

    @starting-style {
      opacity: 0;
      translate: 0 20px;
    }
  }
  ```
- **When to use:** Entry animations, modal/popover appearances, toast notifications. Good browser support — safe to start using with progressive enhancement.

### CSS Typed attr() Function
- **Date learned:** 2026-04-02
- **Source:** https://blog.logrocket.com/css-in-2026/
- **Browser support:** Chrome 135+ only (experimental)
- **Production ready:** No
- **Summary:** Reads HTML attributes as typed values (color, length, number) for use in CSS properties beyond just `content`. Enables data-driven styling directly from HTML attributes without custom properties or JS.
- **Usage example:**
  ```css
  /* Read data attributes as typed CSS values */
  .bar {
    width: attr(data-value percentage, 0%);
    background: attr(data-color color, gray);
  }
  ```
  ```html
  <div class="bar" data-value="75" data-color="#4CAF50"></div>
  ```
- **When to use:** NOT yet — Chromium only. Interesting for data visualizations and dynamic theming. Use CSS custom properties for now.

### Utility-First CSS Meets Native CSS (Hybrid Approach)
- **Date learned:** 2026-04-02
- **Source:** https://blog.logrocket.com/8-trends-web-dev-2026/
- **Browser support:** All major browsers
- **Production ready:** Yes
- **Summary:** The utility vs. traditional CSS divide is closing. Modern approach: use utilities for layout and spacing, but built on native CSS primitives (container queries, cascade layers, custom properties, modern color functions) rather than replacing them. Design systems increasingly use CSS custom properties as the source of truth with utility classes as a convenience layer.
- **Usage example:**
  ```css
  /* Design tokens as the foundation */
  :root {
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --color-surface: oklch(0.98 0.01 245);
  }

  /* Native CSS for component logic */
  .card {
    container-type: inline-size;
    padding: var(--space-md);
  }

  @container (min-width: 400px) {
    .card { grid-template-columns: 200px 1fr; }
  }

  /* Utilities for one-off layout tweaks in HTML */
  ```
- **When to use:** All new projects. Build design systems on CSS custom properties. Use container queries over media queries for components. Cascade layers (`@layer`) for managing specificity.

### React Compiler (v1.0)
- **Date learned:** 2026-04-02
- **Source:** https://blog.logrocket.com/8-trends-web-dev-2026/
- **Browser support:** N/A (build tool)
- **Production ready:** Yes (v1.0 released October 2025)
- **Summary:** React Compiler automatically handles memoization and performance optimization at build time. Eliminates need for manual `useMemo`, `useCallback`, and `React.memo`. Write simpler, more direct React code and let the compiler optimize.
- **Usage example:**
  ```jsx
  // Before (manual memoization — now legacy pattern)
  const MemoizedChild = React.memo(({ data }) => <div>{data}</div>);
  const processed = useMemo(() => transform(data), [data]);
  const handler = useCallback(() => doThing(), []);

  // After (React Compiler handles it)
  const Child = ({ data }) => <div>{data}</div>;
  const processed = transform(data);
  const handler = () => doThing();
  ```
- **When to use:** All new React projects using React 19+. Remove manual memoization when upgrading existing projects. Supported in Next.js 16, Vite, and Expo.

### Edge-First Deployment
- **Date learned:** 2026-04-02
- **Source:** https://blog.logrocket.com/8-trends-web-dev-2026/
- **Browser support:** N/A (infrastructure)
- **Production ready:** Yes
- **Summary:** Edge computing is the default deployment target in 2026. Code runs closer to users with reduced latency and automatic scaling. Edge awareness (understanding runtime constraints, streaming responses, regional data) is now a core frontend skill, not a DevOps specialty.
- **Usage example:**
  ```javascript
  // Edge-compatible server function (Cloudflare Workers style)
  export default {
    async fetch(request, env) {
      const data = await env.KV.get("key");
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      });
    }
  };
  ```
- **When to use:** Default deployment strategy for new projects. Consider edge constraints: no Node.js-specific APIs, size limits, execution time limits. Cloudflare Workers, Vercel Edge, Deno Deploy are mature options.

---

## May 2026 Refresh

### CSS Scroll-Driven Animations
- **Date learned:** 2026-05-31
- **Source:** https://web.dev/baseline · https://css-tricks.com/interop-2026/
- **Browser support:** Chrome 115+, Firefox + Safari now shipping full support — **Baseline 2026.**
- **Production ready:** Yes
- **Summary:** Link an animation's progress to scroll position (`scroll()`) or an element's visibility in the scrollport (`view()`) — no JS, no scroll listeners. Replaces IntersectionObserver/scroll-handler animation code for reveals, progress bars, parallax.
- **Usage example:**
  ```css
  .reveal {
    animation: fade-in linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
  @keyframes fade-in { from { opacity: 0; translate: 0 2rem; } }
  ```
- **When to use:** Scroll reveals, reading-progress indicators, sticky-section effects. Prefer over JS scroll listeners (runs off the main thread). Always gate motion with `@media (prefers-reduced-motion: reduce)`.

### CSS shape() Function
- **Date learned:** 2026-05-31
- **Source:** https://web.dev/blog/baseline-digest-feb-2026
- **Browser support:** Baseline since Feb 2026 (all major engines).
- **Production ready:** Yes
- **Summary:** Define complex `clip-path` / `offset-path` geometry with readable CSS commands (`line`, `arc`, `curve`) using CSS units and `var()` — instead of SVG-path-string `path()`. Responsive and animatable.
- **Usage example:**
  ```css
  .notch {
    clip-path: shape(from 0 0, line to 100% 0, line to 100% calc(100% - 1rem),
                     arc to 0 100% of 1rem, close);
  }
  ```
- **When to use:** Decorative cutouts, custom card shapes, motion paths that must respond to container size. Prefer over `path()` when you want tokens/units or transitions.

### CSS Relative Color Syntax + color-mix()
- **Date learned:** 2026-05-31
- **Source:** https://modern-css.com/whats-new-in-css-2026/
- **Browser support:** Baseline (all engines) — relative `oklch(from …)` and `color-mix()` both cross-browser.
- **Production ready:** Yes
- **Summary:** Derive colors from an existing one at style time. `oklch(from var(--base) l c h)` lets you tweak one channel; `color-mix()` blends two colors in a chosen space. Generate tints/shades/state colors from a single token without precomputing a scale.
- **Usage example:**
  ```css
  :root { --brand: oklch(0.6 0.15 250); }
  .btn:hover  { background: oklch(from var(--brand) calc(l - 0.08) c h); }
  .btn--ghost { background: color-mix(in oklch, var(--brand) 12%, white); }
  ```
- **When to use:** Token systems — derive hover/active/disabled and tint/shade scales from base tokens. Reduces hardcoded color variants. Aligns with Mim's design-token discipline.

### Tailwind CSS v4 (CSS-first config)
- **Date learned:** 2026-05-31
- **Source:** https://tailwindcss.com/blog/tailwindcss-v4
- **Browser support:** N/A (build tool). Output targets modern CSS (cascade layers, `@property`, `color-mix()`).
- **Production ready:** Yes (GA since early 2025)
- **Summary:** Config moves into CSS via `@theme` (no JS config file required); single `@import "tailwindcss"`; automatic content detection; first-party Vite plugin; 5×/100× faster builds. This is the stack Mim's projects already use.
- **Usage example:**
  ```css
  @import "tailwindcss";
  @theme {
    --color-brand: oklch(0.6 0.15 250);
    --font-display: "Lexend", sans-serif;
  }
  ```
- **When to use:** All Tailwind work here. Define tokens in `@theme`, consume as utilities or `var(--color-brand)`. **Still never `@apply`** (Mim rule) — utilities in markup or clean vanilla CSS. Gotcha: `--space-*` vs `--spacing-*` naming (see DGEX theme memory).

### JS Temporal API
- **Date learned:** 2026-05-31
- **Source:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal · https://www.smashingmagazine.com/2026/03/moving-from-moment-to-temporal-api/
- **Browser support:** Chrome 144+, Firefox 139+; Safari expected soon. **Partial.** Polyfill available for production.
- **Production ready:** Partial — use with the official polyfill until Safari ships.
- **Summary:** Immutable, timezone- and calendar-aware date/time built into the language. Reached TC39 Stage 4 (ES2026). The fix for `Date`'s long-standing footguns; retires Moment/day.js for most needs.
- **Usage example:**
  ```js
  const now = Temporal.Now.zonedDateTimeISO("Asia/Manila");
  const due = now.add({ days: 7 }).toPlainDate(); // immutable
  ```
- **When to use:** New date/time logic (scheduling, reporting windows, the PHT-heavy automation here). Ship with `@js-temporal/polyfill` until Safari support lands; don't assume native yet.

### JS Explicit Resource Management (`using` / `await using`)
- **Date learned:** 2026-05-31
- **Source:** https://aiwikiproject.com/articles/es2026-javascript-features
- **Browser support:** Shipping in modern engines (ES2026); transpile (TS 5.2+/esbuild) for broad support. **Partial.**
- **Production ready:** Partial — safe via transpilation; check runtime before relying on native.
- **Summary:** `using`/`await using` auto-dispose resources (file handles, streams, DB connections, locks) when they leave scope via `Symbol.dispose`/`asyncDispose` — replacing manual `try/finally`. Also new: `Array.fromAsync()`, `Iterator` helpers (`.map/.filter/.take/concat`).
- **Usage example:**
  ```js
  async function read() {
    await using f = await openFile("data.json"); // auto-closed on scope exit
    return JSON.parse(await f.readAll());
  }
  ```
- **When to use:** Worker/Node code managing streams or connections. In the browser, mostly via transpiler today — verify the target runtime first.
