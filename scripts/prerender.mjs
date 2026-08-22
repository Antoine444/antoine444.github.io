/**
 * Renders every route to a real HTML file in dist/, so each URL is a genuine
 * 200 with readable content rather than an empty SPA shell. Runs after both
 * Vite builds; if it throws, `npm run build` fails and the deploy workflow
 * stops before it can replace the live site.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const dist = join(root, 'dist')
const ssrDir = join(root, '.ssr')

const { render, routes, notFoundMeta, siteUrl } = await import(
    new URL('../.ssr/entry-server.js', import.meta.url).href
)

const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function head({ title, description, canonical }) {
    return [
        `<title>${esc(title)}</title>`,
        `<meta name="description" content="${esc(description)}" />`,
        `<link rel="canonical" href="${esc(canonical)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="Antoine Garin" />`,
        `<meta property="og:title" content="${esc(title)}" />`,
        `<meta property="og:description" content="${esc(description)}" />`,
        `<meta property="og:url" content="${esc(canonical)}" />`,
        `<meta name="twitter:card" content="summary" />`,
        `<meta name="twitter:title" content="${esc(title)}" />`,
        `<meta name="twitter:description" content="${esc(description)}" />`,
    ].join('\n    ')
}

function build(meta, url) {
    const html = render(url)
    const canonical = siteUrl + (meta.path === '/' ? '/' : meta.path)
    return template
        // Replace the shell's placeholder title/description/canonical with the
        // per-route ones rather than appending duplicates.
        .replace(/<title>[\s\S]*?<\/title>/, '<title>__T__</title>')
        .replace(/\n\s*<meta name="description"[^>]*>/, '')
        .replace(/\n\s*<link rel="canonical"[^>]*>/, '')
        .replace('<title>__T__</title>', head({ ...meta, canonical }))
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
}

const written = []

for (const meta of routes) {
    const url = meta.path
    const out = meta.path === '/' ? join(dist, 'index.html') : join(dist, meta.path, 'index.html')
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, build(meta, url))
    written.push(out.replace(dist + '/', ''))
}

// GitHub Pages serves 404.html for anything it cannot resolve.
writeFileSync(join(dist, '404.html'), build(notFoundMeta, '/__not_found__'))
written.push('404.html')

// sitemap + robots, both derived from the same route table.
const urls = routes
    .map((r) => `  <url><loc>${siteUrl}${r.path === '/' ? '/' : r.path}</loc></url>`)
    .join('\n')
writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
written.push('sitemap.xml', 'robots.txt')

rmSync(ssrDir, { recursive: true, force: true })

console.log(`\nprerendered ${routes.length} route(s):`)
for (const f of written) console.log(`  dist/${f}`)
