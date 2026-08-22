/**
 * Extracts every external href from the built site and checks it resolves.
 * Run after `npm run build`.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const dist = new URL('../dist/', import.meta.url).pathname

function walk(dir) {
    return readdirSync(dir).flatMap((f) => {
        const p = join(dir, f)
        return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []
    })
}

const found = new Map()
for (const file of walk(dist)) {
    const html = readFileSync(file, 'utf8')
    for (const [, href] of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
        if (!found.has(href)) found.set(href, [])
        found.get(href).push(file.replace(dist, ''))
    }
}

// LinkedIn answers 999 to every non-browser client; it is not a broken link.
const EXPECTED = { 'linkedin.com': [200, 999] }

// Own-site URLs come from canonical/og:url tags. They cannot resolve before the
// deploy that publishes them, so they are only checked with --live.
const SELF = 'https://antoine444.github.io'
const live = process.argv.includes('--live')

let failures = 0
const all = [...found.keys()].sort()
const outbound = all.filter((u) => !u.startsWith(SELF))
const own = all.filter((u) => u.startsWith(SELF))
const toCheck = live ? all : outbound

const results = await Promise.all(
    toCheck.map(async (url) => {
        try {
            const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'link-check' } })
            const allowed = Object.entries(EXPECTED).find(([host]) => url.includes(host))?.[1] ?? [200]
            return { url, status: res.status, ok: allowed.includes(res.status) }
        } catch (e) {
            return { url, status: String(e.cause?.code ?? e.message), ok: false }
        }
    })
)

for (const r of results) {
    if (!r.ok) failures++
    console.log(`  ${r.ok ? 'OK  ' : 'FAIL'}  ${String(r.status).padEnd(5)} ${r.url}`)
}
if (!live && own.length) {
    console.log(`\n  skipped ${own.length} own-site URL(s) (canonical/og tags — run with --live after deploy)`)
}
console.log(failures ? `\n  ${failures} broken link(s)\n` : `\n  All ${results.length} checked link(s) resolve.\n`)
process.exit(failures ? 1 : 0)
