# My Backpack Site

A directory of online tools and web apps at `mybackpack.mikenavales.xyz`.

## Tech Stack

- **Framework:** Astro 5 with Svelte islands
- **Styling:** Tailwind CSS v4 (Vite plugin)
- **Linter/Formatter:** Biome v2
- **Runtime:** Bun
- **Deployment:** Cloudflare Pages (static)

## Commands

```sh
bun run dev       # Start dev server
bun run build     # Production build
bun run preview   # Preview production build
bun run lint      # Lint with Biome
bun run lint:fix  # Lint and auto-fix
```

## Conventions

- **Component architecture:** Atomic design (`atoms/`, `molecules/`, `organisms/`, `templates/`)
- **Data layer:** Centralized in `src/data/` with TypeScript `satisfies` pattern
- **Props:** Use `interface Props` in Astro components
- **Svelte islands:** Only use `client:visible` when interactivity is needed
- **Styling:** Tailwind utilities + `@theme` tokens with oklch colors
- **Accessibility:** Semantic HTML, skip links, `prefers-reduced-motion`, focus-visible
- **Performance:** `fetchpriority="high"` on hero, explicit dimensions, `loading="eager"` for above-fold
- **SEO:** JSON-LD structured data, OG/Twitter meta, canonical URL
- **Git:** Conventional commits (`feat:`, `fix:`, `docs:`, etc.)
