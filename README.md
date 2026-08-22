# antoine444.github.io

Source for [antoine444.github.io](https://antoine444.github.io) — a static, prerendered
portfolio built with Vite, React and Tailwind CSS v4.

## Build

```bash
npm ci
npm run dev            # dev server
npm run build          # type-check, bundle, prerender
npm run preview        # serve dist/
```

`npm run build` is four steps, and any of them failing stops the deploy before it
publishes:

```
tsc -b                                    type gate
vite build                     → dist/    client bundle
vite build --ssr …             → .ssr/    server bundle (removed after prerender)
node scripts/prerender.mjs                writes dist/**/index.html
```

Prerendering matters because this is a multi-page site on GitHub Pages. Every route is
emitted as a real HTML file, so a deep link returns HTTP 200 with readable content
rather than an empty SPA shell that only works if JavaScript runs. `dist/404.html`,
`sitemap.xml` and `robots.txt` come from the same route table in `src/routes.ts`.

## Checks

```bash
npm run lint           # eslint
npm run check:a11y     # WCAG AA contrast, every token pair, both themes
npm run check:links    # every external link in dist/ resolves
npm run check:links -- --live   # also check own-site canonical URLs, after deploy
```

`check:a11y` parses the real values out of `src/styles.css`, so it fails if a token is
edited into a contrast violation. It also asserts the two dark-theme blocks — the
`prefers-color-scheme` one and the `[data-theme="dark"]` one — stay in sync.

## Layout

```
src/
  content/        all site copy and data; the only files to edit for content changes
    profile.ts      name, positioning, status, links
    projects.tsx    project write-ups, including their diagrams
    experience.ts   education.ts   skills.ts   types.ts
  components/
    Claim.tsx       a figure bound to the condition it holds under
    diagrams/       inline SVG, theme-aware, one per mechanism worth drawing
  sections/       home page sections
  pages/          Home, Project, NotFound
  routes.ts       route table + per-route <title> and description
  styles.css      design tokens and component layer
scripts/
  prerender.mjs   check-contrast.mjs   check-links.mjs
```

## Deployment

`.github/workflows/deployment.yaml` builds on every push to `main` and publishes `dist/`
to GitHub Pages. This is a **user site**, served from the domain root, so `base` stays
`/` in `vite.config.ts` and `BrowserRouter` stays without a `basename`.

The contact form uses EmailJS; the workflow writes `VITE_APP_EMAILJS_SERVICE_ID`,
`VITE_APP_EMAILJS_TEMPLATE_ID` and `VITE_APP_EMAILJS_PUBLIC_KEY` from repository secrets
into `.env` before building. These are public by necessity — they ship in the client
bundle. The controls that actually restrict use are server-side in the EmailJS
dashboard: the domain allowlist and the CAPTCHA on the template. If the secrets are
absent the form disables itself and points at the email address instead, rather than
failing silently.

## Licence

MIT.
