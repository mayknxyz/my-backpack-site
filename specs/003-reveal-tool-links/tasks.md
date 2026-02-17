# Tasks: Reveal Tool Links on Backpack Hover

**Branch**: `003-reveal-tool-links` | **Created**: 2026-02-17 | **Status**: Complete

## Skills

- **svelte** — Svelte 5 runes (`$state`, `$props`, `$effect`), component structure, event handling
- **astro** — `getImage()` API, `client:visible` directive, Astro/Svelte island bridging
- **animation** — Staggered CSS transitions with `--i` custom property delay, reverse stagger on close, `prefers-reduced-motion`
- **a11y** — `aria-expanded`, `aria-controls`, `tabindex` toggling, keyboard handlers (Enter/Space/Escape), focus-visible outlines
- **tailwind** — Theme tokens (`--color-surface-alt`, `--color-primary`, `--shadow-soft`, `--radius-md`), dark mode compatibility
- **typescript** — `Tool` interface, `satisfies` pattern for data, type exports
- **web-core** — Semantic HTML (`<nav>`, `<button>`), event delegation, progressive enhancement

## Implementation

- [x] T001 Create `src/data/tools.ts` with `Tool` interface and tools array (My Kit, My Buddy) using `satisfies` pattern
- [x] T002 Create `src/components/organisms/BackpackRevealer.svelte` with component skeleton, props interface, and `isOpen` state management
- [x] T003 Add hover handlers (`mouseenter`/`mouseleave`) and touch toggle (`touchstart` with `isTouchDevice` flag)
- [x] T004 Add keyboard handlers — `<button>` wrapper with Enter/Space to toggle, Escape to close
- [x] T005 Add `aria-expanded`, `aria-controls`, dynamic screen reader text, and `tabindex` toggling on tool links
- [x] T006 Style tool pills using theme tokens (surface-alt bg, soft shadow, md radius) with hover/focus-visible states (primary bg, lifted shadow)
- [x] T007 Implement staggered entrance animation (translateY + opacity + scale, `--i * 80ms` delay) and reverse stagger on close
- [x] T008 Add `prefers-reduced-motion` support — instant transitions, no animation
- [x] T009 Create `src/components/organisms/BackpackHero.astro` — `getImage()` for both PNGs, pass optimized URLs to Svelte island with `client:visible`
- [x] T010 Update `src/pages/index.astro` to import `BackpackHero` instead of `BackpackLogo`
- [x] T011 Verify build (`bun run build`) and lint (`bun run lint`) pass cleanly
