# Web Development Fundamentals

Core principles that never go out of style. The agent should apply these by default.

---

## HTML

### Semantics
- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Headings follow hierarchy: one `<h1>` per page, then `<h2>` > `<h3>` in order
- Use `<button>` for actions, `<a>` for navigation — never swap them
- Lists (`<ul>`, `<ol>`) for groups of related items
- `<figure>` + `<figcaption>` for images with context
- `<time>` for dates, `<address>` for contact info
- `<dialog>` for modals (native, accessible)

### Accessibility (a11y)
- Every `<img>` needs `alt` (descriptive) or `alt=""` (decorative)
- Form inputs need associated `<label>` elements
- ARIA attributes only when native HTML can't do the job
- `role`, `aria-label`, `aria-expanded`, `aria-hidden` for dynamic UI
- Skip navigation link for keyboard users
- Focus management: visible focus rings, logical tab order
- Color contrast: minimum 4.5:1 for text, 3:1 for large text (WCAG AA)
- Keyboard navigable: every interactive element reachable via Tab/Enter/Space/Escape

### Performance
- Lazy load images below the fold: `loading="lazy"`
- `<picture>` with `srcset` for responsive images
- Preload critical assets: `<link rel="preload">`
- Defer non-critical JS: `defer` or `async`
- Minimize DOM depth — deep nesting hurts rendering

---

## CSS

### Architecture
- **Design tokens first**: colors, typography, spacing, shadows as CSS custom properties
- **Low specificity**: prefer classes over IDs, avoid nesting beyond 3 levels
- **No `!important`** unless overriding third-party (document why)
- **Component-scoped**: styles co-located with their component
- **Mobile-first**: base styles for mobile, `@media (min-width)` for larger screens

### Layout
- **Flexbox**: one-dimensional layouts (rows or columns)
- **Grid**: two-dimensional layouts (rows AND columns)
- **Container queries** (`@container`): component-level responsiveness
- Avoid `float` for layout (legacy)
- `gap` over margin hacks for spacing between items

### Typography
- `rem` for font sizes (respects user preferences)
- `em` for component-relative sizing
- `px` for borders, shadows, and fine details
- `line-height` unitless (e.g., `1.5` not `24px`)
- `font-display: swap` for web fonts (prevent FOIT)
- Limit to 2-3 font families max

### Colors
- CSS custom properties for all colors
- Use `oklch()` or `hsl()` for perceptual uniformity
- Support light/dark themes via `prefers-color-scheme`
- Never hardcode colors in component styles

### Responsive
- Breakpoints based on content, not devices
- Common breakpoints: 640px, 768px, 1024px, 1280px
- `clamp()` for fluid typography: `font-size: clamp(1rem, 2.5vw, 2rem)`
- `min()`, `max()`, `clamp()` for fluid spacing and sizing
- Test at every width, not just breakpoints

### Transitions & Animation
- Only animate `transform` and `opacity` (GPU-composited, 60fps)
- `will-change` sparingly and only when needed
- `prefers-reduced-motion`: respect user preference
- Duration: 150-300ms for UI feedback, 300-500ms for reveals
- Easing: `ease-out` for entrances, `ease-in` for exits, `ease-in-out` for state changes

---

## JavaScript

### Modern Patterns
- `const` by default, `let` when mutation needed, never `var`
- Template literals over string concatenation
- Destructuring for clean data access
- Optional chaining `?.` and nullish coalescing `??`
- `for...of` for arrays, `Object.entries()` for objects
- `async/await` over `.then()` chains

### DOM
- `querySelector`/`querySelectorAll` over `getElementById`
- Event delegation: listen on parent, filter by `event.target`
- `IntersectionObserver` for scroll-triggered effects
- `MutationObserver` for DOM change detection
- `ResizeObserver` for element size changes
- `requestAnimationFrame` for smooth visual updates
- Avoid layout thrashing: batch reads, then batch writes

### Performance
- Debounce scroll/resize handlers (150-300ms)
- Throttle high-frequency events (16ms for 60fps)
- Web Workers for heavy computation
- Dynamic `import()` for code splitting
- `AbortController` to cancel fetch requests

### Security
- Never use `innerHTML` with user data (XSS risk) — use `textContent`
- Sanitize all user input
- CSP headers to prevent injection
- No inline event handlers (`onclick=""`) — use `addEventListener`
- Validate on both client AND server

---

## Performance Checklist

- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Images optimized: WebP/AVIF, proper dimensions, lazy loaded
- [ ] CSS: no unused styles, critical CSS inlined or preloaded
- [ ] JS: minified, tree-shaken, code-split
- [ ] Fonts: subset, preloaded, `font-display: swap`
- [ ] HTTP: gzip/brotli compression, cache headers, HTTP/2+
- [ ] No render-blocking resources in `<head>`

---

## SEO Essentials

- Unique `<title>` per page (50-60 chars)
- `<meta name="description">` per page (150-160 chars)
- One `<h1>` per page matching the topic
- Semantic heading hierarchy
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Open Graph tags for social sharing
- Structured data (JSON-LD) where applicable
- `<link rel="canonical">` to prevent duplicate content
- `sitemap.xml` and `robots.txt`

---

## Testing Mindset

- Test on real devices, not just responsive mode
- Test with keyboard only (no mouse)
- Test with screen reader (VoiceOver on Mac)
- Test with slow network (Chrome DevTools throttling)
- Test with large content (long names, missing images, empty states)
