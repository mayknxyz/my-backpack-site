# Implementation Plan: Reveal Tool Links on Backpack Hover

**Branch**: `003-reveal-tool-links` | **Created**: 2026-02-17 | **Spec**: [spec.md](./spec.md)

## Technical Context

- **Technologies**: Astro 5, Svelte 5 (first island), Tailwind CSS v4, TypeScript
- **Dependencies**: None new — Svelte and `@astrojs/svelte` already installed and configured
- **Integration Points**: Astro `getImage()` for build-time image optimization, Tailwind `@theme` tokens for styling

## Design Decisions

### Svelte Island over Extended Astro Component

**Choice**: Create a new `BackpackRevealer.svelte` component instead of extending the existing `BackpackLogo.astro` with more vanilla JS.

**Rationale**: The feature requires coordinated state (open/closed), keyboard event handling across multiple focusable elements, `tabindex` toggling, and staggered animations tied to state. Svelte's reactivity (`$state`, `$props`, `$effect`) handles this cleanly. The project already has Svelte installed but unused — this is the intended use case per CLAUDE.md ("Only use `client:visible` when interactivity is needed").

### Image Optimization via Astro Wrapper

**Choice**: Use an Astro wrapper (`BackpackHero.astro`) that calls `getImage()` at build time and passes optimized URLs as string props to the Svelte island.

**Rationale**: Svelte islands cannot receive Astro `<Image>` components as props. Using `getImage()` preserves build-time optimization (WebP, resizing) while passing simple strings to the client component.

### Pill Positioning Above Backpack

**Choice**: Tool pills positioned absolutely above the backpack opening (`bottom: ~75%` of container), centered horizontally, using `flex-wrap` for multiple items.

**Rationale**: Creates the visual metaphor of items floating up out of the opened backpack. Absolute positioning relative to the backpack container keeps the layout self-contained regardless of viewport size.

## Skills

- **svelte** — Svelte 5 runes (`$state`, `$props`, `$effect`), component structure, event handling
- **astro** — `getImage()` API, `client:visible` directive, Astro/Svelte island bridging
- **animation** — Staggered CSS transitions with `--i` custom property delay, reverse stagger on close, `prefers-reduced-motion`
- **a11y** — `aria-expanded`, `aria-controls`, `tabindex` toggling, keyboard handlers (Enter/Space/Escape), focus-visible outlines
- **tailwind** — Theme tokens (`--color-surface-alt`, `--color-primary`, `--shadow-soft`, `--radius-md`), dark mode compatibility
- **typescript** — `Tool` interface, `satisfies` pattern for data, type exports

## Implementation Phases

### Phase 1: Data Layer

Create the tools data file following existing conventions.

**Key Tasks**:
- Create `src/data/tools.ts` with `Tool` interface and `tools` array using `satisfies` pattern
- Include My Kit and My Buddy entries with name, url, description, emoji

### Phase 2: Svelte Island Component

Build the core interactive component with all state management, accessibility, and animations.

**Key Tasks**:
- Create `src/components/organisms/BackpackRevealer.svelte`
- Implement `isOpen` state with hover, touch, and keyboard triggers
- Wrap backpack images in `<button>` with `aria-expanded` and `aria-controls`
- Create `<nav>` with tool pill links, `tabindex` toggled by open state
- Style pills using theme tokens (surface-alt bg, soft shadow, md radius)
- Implement staggered entrance animation (translateY + opacity + scale, `--i * 80ms + 200ms` delay)
- Implement reverse stagger on close (last item disappears first)
- Add hover/focus-visible states on pills (primary bg, lifted shadow)
- Handle `prefers-reduced-motion` (instant transitions)

### Phase 3: Astro Wrapper & Page Integration

Bridge image optimization and wire into the landing page.

**Key Tasks**:
- Create `src/components/organisms/BackpackHero.astro` using `getImage()` for both backpack PNGs
- Pass optimized image URLs and tools array as props with `client:visible`
- Update `src/pages/index.astro` to import `BackpackHero` instead of `BackpackLogo`

### Phase 4: Verification

Validate all success criteria.

**Key Tasks**:
- Test desktop hover open/close with staggered animations
- Test mobile tap toggle
- Test keyboard flow: Tab → Enter → Tab through pills → Escape
- Test dark mode appearance
- Test `prefers-reduced-motion` behavior
- Run `bun run build` — no errors
- Run `bun run lint` — passes Biome

## Success Criteria Reference

- **SC-001**: Backpack opens on hover/tap/keyboard and reveals tool pills with staggered animation
- **SC-002**: Tool links navigate to correct URLs in new tabs
- **SC-003**: Full keyboard navigation works (Enter/Space/Tab/Escape)
- **SC-004**: Screen readers announce expanded state and tool navigation
- **SC-005**: Animations disabled under `prefers-reduced-motion`
- **SC-006**: Visual appearance correct in both light and dark mode
- **SC-007**: `bun run build` succeeds with no errors
- **SC-008**: `bun run lint` passes Biome checks
