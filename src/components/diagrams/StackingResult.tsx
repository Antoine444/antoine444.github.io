import { Figure } from './Figure'

/**
 * Three measures on three different scales, so three small multiples with their
 * own axis each — never one chart with two y-scales. Direction differs between
 * panels, so each states it rather than relying on "shorter bar looks better".
 */
const PANELS = [
    { metric: 'PnL standard deviation', before: 12.5, after: 3.6, better: 'lower' },
    { metric: 'CVaR₉₅', before: 32.5, after: 15.0, better: 'lower' },
    { metric: 'Sharpe ratio', before: 0.53, after: 1.99, better: 'higher' },
]

const fmt = (v: number) => (Number.isInteger(v * 10) ? v.toFixed(1) : v.toFixed(2))

export function StackingResult() {
    const barX = 178
    const barMax = 330
    const panelH = 80
    const top = 44
    const width = 660
    const height = top + PANELS.length * panelH + 8

    return (
        <Figure
            label="Figure — weighting stacked with adversarial training, volatility-drift slice"
            caption="One slice only: the volatility-drift scenario. Each panel has its own scale, since the three measures are not comparable to one another. Both bars are labelled with their value; the panels do not share an axis."
        >
            <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img"
                 style={{ maxWidth: 'none' }}>
                <title>Effect of stacking temporal weighting with adversarial training</title>
                <desc>
                    Three panels. PnL standard deviation falls from 12.5 to 3.6, where lower is
                    better. CVaR ninety-five falls from 32.5 to 15.0, where lower is better. The
                    Sharpe ratio rises from 0.53 to 1.99, where higher is better.
                </desc>

                {/* legend */}
                <g transform="translate(16, 20)">
                    <rect x="0" y="-9" width="11" height="11" rx="2" fill="var(--ramp-1)" />
                    <text x="18" y="0" fontFamily="var(--font-mono)" fontSize="11"
                          fill="var(--ink-muted)">baseline</text>
                    <rect x="106" y="-9" width="11" height="11" rx="2" fill="var(--ramp-2)" />
                    <text x="124" y="0" fontFamily="var(--font-mono)" fontSize="11"
                          fill="var(--ink-muted)">weighting + adversarial training</text>
                </g>

                {PANELS.map((p, i) => {
                    const y = top + i * panelH
                    const scale = Math.max(p.before, p.after)
                    const wBefore = (p.before / scale) * barMax
                    const wAfter = (p.after / scale) * barMax
                    return (
                        <g key={p.metric}>
                            <line x1="16" y1={y - 10} x2={width - 16} y2={y - 10}
                                  stroke="var(--rule)" />
                            <text x="16" y={y + 8} fontFamily="var(--font-mono)" fontSize="12.5"
                                  fill="var(--ink)">
                                {p.metric}
                            </text>
                            <text x="16" y={y + 25} fontFamily="var(--font-mono)" fontSize="10"
                                  fill="var(--ink-faint)">
                                {p.better} is better
                            </text>

                            {/* baseline bar — 2px gap to the bar below, ends rounded */}
                            <rect x={barX} y={y - 2} width={wBefore} height={14} rx="3"
                                  fill="var(--ramp-1)" />
                            <text x={barX + wBefore + 9} y={y + 9} fontFamily="var(--font-mono)"
                                  fontSize="12" fill="var(--ink-muted)">
                                {fmt(p.before)}
                            </text>

                            {/* after bar */}
                            <rect x={barX} y={y + 14} width={wAfter} height={14} rx="3"
                                  fill="var(--ramp-2)" />
                            <text x={barX + wAfter + 9} y={y + 25} fontFamily="var(--font-mono)"
                                  fontSize="12" fontWeight="600" fill="var(--ink)">
                                {fmt(p.after)}
                            </text>
                        </g>
                    )
                })}
            </svg>
        </Figure>
    )
}
