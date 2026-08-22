import { Figure } from './Figure'

/**
 * The honest centrepiece. Non-uniform temporal weighting is not a win — it is a
 * win in one quadrant, a wash in another, and a loss in a whole column. The
 * diverging encoding carries polarity; the text in every cell carries the same
 * information again, so nothing is read by colour alone.
 */
type State = 'positive' | 'neutral' | 'adverse'

const CELL: Record<State, { label: string; sub: string; fill: string; stroke: string; ink: string }> = {
    positive: {
        label: '−35 to −50%',
        sub: 'test CVaR₉₅, Sharpe up',
        fill: 'var(--wash-positive)',
        stroke: 'var(--mark-positive)',
        ink: 'var(--ink-positive)',
    },
    neutral: {
        label: 'no change',
        sub: 'neutral vs uniform',
        fill: 'var(--wash-neutral)',
        stroke: 'var(--mark-neutral)',
        ink: 'var(--ink-muted)',
    },
    adverse: {
        label: 'worse',
        sub: 'than uniform weighting',
        fill: 'var(--wash-adverse)',
        stroke: 'var(--mark-adverse)',
        ink: 'var(--ink-adverse)',
    },
}

const ROWS: { drift: string; hedgingRelevant: boolean; cells: [State, State] }[] = [
    { drift: 'Price drift, small', hedgingRelevant: false, cells: ['adverse', 'neutral'] },
    { drift: 'Price drift, large', hedgingRelevant: true, cells: ['adverse', 'positive'] },
    { drift: 'Volatility drift', hedgingRelevant: true, cells: ['adverse', 'positive'] },
    { drift: 'Joint drift', hedgingRelevant: true, cells: ['adverse', 'positive'] },
]

const COLS = ['1k paths per block', '≥ 5k paths per block']

export function ConditionalityMatrix() {
    const labelW = 172
    const colW = 216
    const gap = 4
    const x0 = 16
    const headerY = 14
    const rowTop = 46
    const rowH = 54

    const colX = (i: number) => x0 + labelW + gap + i * (colW + gap)
    const height = rowTop + ROWS.length * (rowH + gap) + 44

    return (
        <Figure
            label="Figure — where non-uniform temporal weighting helps, and where it does not"
            caption="Effect of non-uniform block weighting on out-of-sample performance, against a uniformly weighted baseline. Validated over 10 seeds with 95% confidence intervals and validation-selected hyperparameters, so no test data informed the choice. Mean PnL is flat to marginally worse everywhere — the gain, where there is one, is in dispersion and tail risk."
        >
            <svg viewBox={`0 0 ${colX(2) + 4} ${height}`} width={colX(2) + 4} height={height}
                 role="img" style={{ maxWidth: 'none' }}>
                <title>Conditionality of non-uniform temporal weighting</title>
                <desc>
                    A four by two grid. Rows are drift type: small price drift, large price drift,
                    volatility drift, and joint drift. Columns are sample size per block: one
                    thousand paths, and five thousand or more paths. At one thousand paths per
                    block, weighting is worse than uniform for every drift type. At five thousand
                    or more, it cuts test CVaR ninety-five by thirty-five to fifty percent for
                    large price drift, volatility drift and joint drift, and is neutral for small
                    price drift.
                </desc>

                {/* column headers */}
                {COLS.map((c, i) => (
                    <text key={c} x={colX(i) + colW / 2} y={headerY + 14} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize="11.5" fill="var(--ink-muted)">
                        {c}
                    </text>
                ))}
                <text x={x0} y={headerY + 14} fontFamily="var(--font-mono)" fontSize="10"
                      letterSpacing="0.1em" fill="var(--ink-faint)">
                    DRIFT TYPE
                </text>

                {ROWS.map((r, ri) => {
                    const y = rowTop + ri * (rowH + gap)
                    return (
                        <g key={r.drift}>
                            <text x={x0} y={y + rowH / 2 - 2} fontFamily="var(--font-mono)"
                                  fontSize="12.5" fill="var(--ink)">
                                {r.drift}
                            </text>
                            <text x={x0} y={y + rowH / 2 + 14} fontFamily="var(--font-mono)"
                                  fontSize="10" fill="var(--ink-faint)">
                                {r.hedgingRelevant ? 'hedging-relevant' : 'not hedging-relevant'}
                            </text>
                            {r.cells.map((state, ci) => {
                                const c = CELL[state]
                                return (
                                    <g key={ci}>
                                        <rect x={colX(ci)} y={y} width={colW} height={rowH} rx="3"
                                              fill={c.fill} stroke={c.stroke} strokeWidth="1" />
                                        <text x={colX(ci) + colW / 2} y={y + rowH / 2 - 1}
                                              textAnchor="middle" fontFamily="var(--font-mono)"
                                              fontSize="14" fontWeight="600" fill={c.ink}>
                                            {c.label}
                                        </text>
                                        <text x={colX(ci) + colW / 2} y={y + rowH / 2 + 15}
                                              textAnchor="middle" fontFamily="var(--font-mono)"
                                              fontSize="10" fill="var(--ink-muted)">
                                            {c.sub}
                                        </text>
                                    </g>
                                )
                            })}
                        </g>
                    )
                })}

                {/* legend — identity is never colour-alone, but the key is still present */}
                <g transform={`translate(${x0}, ${rowTop + ROWS.length * (rowH + gap) + 18})`}>
                    {(['positive', 'neutral', 'adverse'] as State[]).map((s, i) => (
                        <g key={s} transform={`translate(${i * 178}, 0)`}>
                            <rect x="0" y="-9" width="11" height="11" rx="2"
                                  fill={CELL[s].fill} stroke={CELL[s].stroke} />
                            <text x="18" y="0" fontFamily="var(--font-mono)" fontSize="11"
                                  fill="var(--ink-muted)">
                                {s === 'positive' ? 'improves on uniform'
                                    : s === 'neutral' ? 'indistinguishable' : 'worse than uniform'}
                            </text>
                        </g>
                    ))}
                </g>
            </svg>
        </Figure>
    )
}
