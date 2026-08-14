# Architecture & Implementation Notes

## Project: Personal Portfolio - Irvan Farael Hanafi ("Farel")

### 1. Dual-Target Deployment Strategy
- **GitHub Pages (Static Export)**:
  - Enabled via `next.config.ts` setting `output: 'export'` when `process.env.GITHUB_PAGES === 'true'`.
  - Driven by `process.env.NEXT_PUBLIC_BASE_PATH` for asset prefix handling.
  - Configured with `images: { unoptimized: true }` as GitHub Pages does not run Node.js server image optimization.
  - Automated deployment configured in `.github/workflows/deploy-gh-pages.yml` uploading the `out/` artifact.
- **Vercel (SSR / Edge Static)**:
  - Works natively with Next.js App Router without static export restrictions when `GITHUB_PAGES` environment variable is omitted or set to `false`.

### 2. Architecture & Performance Assumptions
- **Static Content Architecture**: All portfolio data is housed in strongly-typed files in `/content/` (`profile.ts`, `projects.ts`, `journey.ts`, `links.ts`, `contact.ts`, `playlist.ts`).
- **Zero Server Runtime Dependency**: All features (Theme toggling, i18n, Minigame, YouTube Music Player, contact links) operate entirely client-side without requiring API routes, ensuring 100% compatibility with static hosting.
- **Lazy Loading & Code Splitting**:
  - `MinigameCanvas` is dynamically loaded with SSR disabled to prevent hydration mismatches and minimize initial bundle size.
  - `MusicPlayer` initializes YouTube IFrame API lazily on first user interaction, preserving first-paint metrics and honoring browser autoplay restrictions.
- **Flash-Free Theme Initialization**:
  - The `ThemeProvider` injects an inline script into the document `<head>` to read `localStorage.getItem('theme')` or evaluate `window.matchMedia('(prefers-color-scheme: dark)')` before DOM rendering.
- **Bilingual i18n (EN / ID)**:
  - Client-side dictionary switching (`content/i18n/en.json` and `content/i18n/id.json`) wrapped in `LanguageProvider`. Default is English (`en`).
