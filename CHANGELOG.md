# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-17

### Added

- Landing page with centered backpack logo and hero text
- Animated backpack logo with CSS crossfade (closed to open on hover/tap)
- Idle breathing animation on backpack logo (subtle scale pulse)
- Touch support for mobile devices (tap to toggle open state)
- Dark mode support via `prefers-color-scheme` with oklch token remapping
- Reduced motion support via `prefers-reduced-motion` (instant swap, no animations)
- Base layout with SEO meta tags, JSON-LD structured data, and OG/Twitter cards
- Skip navigation link for accessibility
- Fluid typography with `clamp()` for heading and subtitle
- Tailwind CSS v4 theme with oklch color tokens, system-ui fonts, and custom shadows
- Centralized site metadata in `src/data/site.ts`
- Atomic design component structure (`atoms/`, `molecules/`, `organisms/`, `templates/`)
- Astro image optimization (WebP output, explicit dimensions, eager loading for hero)
- SVG favicon (backpack icon)
- Biome v2 linter/formatter with Astro and Svelte overrides
- TypeScript strict mode with path aliases

[0.1.0]: https://github.com/mayknxyz/my-backpack-site/releases/tag/v0.1.0
