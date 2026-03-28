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
- **Browser support:** Chrome 111+, Safari 18+, Firefox 126+
- **Production ready:** Partial (same-document transitions are solid; cross-document still emerging)
- **Summary:** Animates between DOM states with browser-managed transitions. Creates smooth page/state changes without manual animation code. Supports both SPA and MPA transitions.
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
- **Date learned:** 2026-03-27
- **Source:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
- **Browser support:** Chrome 125+, Edge 125+. No Firefox/Safari yet.
- **Production ready:** No (Chromium only)
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
- **When to use:** NOT yet — Chromium only. Monitor for Safari/Firefox support. Use Floating UI or manual JS positioning for now.

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
