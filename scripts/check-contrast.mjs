/**
 * Reads the real token values out of src/styles.css and checks every
 * foreground/background pair the site actually renders, in both themes,
 * against WCAG 2.1 AA. Fails the process on any violation.
 */
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')

function parseBlock(re) {
    const m = css.match(re)
    if (!m) throw new Error(`token block not found: ${re}`)
    const out = {}
    for (const [, k, v] of m[1].matchAll(/--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{6});/g)) out[k] = v
    return out
}

const light = parseBlock(/^:root \{\n([\s\S]*?)\n\}/m)
const dark = parseBlock(/^:root\[data-theme="dark"\] \{\n([\s\S]*?)\n\}/m)

// The prefers-color-scheme block must define exactly the same keys as the
// [data-theme] block, or the two dark paths drift apart.
const media = parseBlock(/:root:not\(\[data-theme="light"\]\) \{\n([\s\S]*?)\n {4}\}/)
const driftKeys = [...new Set([...Object.keys(dark), ...Object.keys(media)])]
    .filter((k) => dark[k] !== media[k])

function lum(hex) {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
        .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
    return (x + 0.05) / (y + 0.05)
}

/** [foreground, background, minimum, what it is] */
const PAIRS = [
    ['ink', 'paper', 4.5, 'body text on page'],
    ['ink', 'surface', 4.5, 'body text on card'],
    ['ink', 'surface-sunk', 4.5, 'body text on sunk surface'],
    ['ink-muted', 'paper', 4.5, 'secondary text on page'],
    ['ink-muted', 'surface', 4.5, 'secondary text on card'],
    ['ink-muted', 'surface-sunk', 4.5, 'tag text'],
    ['ink-faint', 'paper', 3.0, 'eyebrow / rail label (>=18.66px bold or decorative)'],
    ['ink-faint', 'surface', 3.0, 'faint text on card'],
    ['accent', 'paper', 4.5, 'link on page'],
    ['accent', 'surface', 4.5, 'link on card'],
    ['accent', 'accent-wash', 3.0, 'accent on its own wash'],
    ['ink-positive', 'surface', 4.5, 'positive claim figure'],
    ['ink-adverse', 'surface', 4.5, 'adverse claim figure'],
    ['ink-positive', 'wash-positive', 4.5, 'positive cell text in matrix'],
    ['ink-adverse', 'wash-adverse', 4.5, 'adverse cell text in matrix'],
    ['ink-muted', 'wash-neutral', 4.5, 'neutral cell text in matrix'],
    ['mark-positive', 'paper', 3.0, 'positive chart mark'],
    ['mark-adverse', 'paper', 3.0, 'adverse chart mark'],
    ['mark-neutral', 'paper', 3.0, 'neutral chart mark'],
    ['ramp-2', 'surface', 3.0, 'ordinal ramp, "after" bar'],
    ['ramp-1', 'surface', 2.0, 'ordinal ramp, "before" bar (light end, labelled)'],
    ['rule-strong', 'paper', 1.5, 'hairline rule (non-text)'],
    ['accent', 'paper', 3.0, 'focus ring against page'],
]

let failed = 0
for (const [theme, tokens] of [['light', light], ['dark', dark]]) {
    console.log(`\n  ${theme.toUpperCase()}  (page ${tokens.paper})`)
    for (const [fg, bg, min, what] of PAIRS) {
        if (!tokens[fg] || !tokens[bg]) {
            console.log(`  MISSING  ${fg} / ${bg}`)
            failed++
            continue
        }
        const r = ratio(tokens[fg], tokens[bg])
        const ok = r >= min
        if (!ok) failed++
        console.log(
            `  ${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ` +
            `${fg} on ${bg} — ${what}`
        )
    }
}

if (driftKeys.length) {
    console.log(`\n  FAIL  dark tokens differ between the media query and [data-theme="dark"]: ${driftKeys.join(', ')}`)
    failed++
}

console.log(failed ? `\n  ${failed} contrast failure(s)\n` : '\n  All contrast pairs pass WCAG AA in both themes.\n')
process.exit(failed ? 1 : 0)
