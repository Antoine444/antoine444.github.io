import { Figure } from './Figure'

/**
 * Each layer consumes the guarantee below it and provides a stronger one.
 * Ordered bottom-up because that is the direction the guarantees compose.
 */
const LAYERS = [
    { name: 'Lattice agreement', guarantee: 'decisions totally ordered by inclusion, containing every proposal' },
    { name: 'FIFO broadcast', guarantee: 'per-sender ordering' },
    { name: 'Uniform reliable broadcast', guarantee: 'all-or-nothing across correct processes' },
    { name: 'Best-effort broadcast', guarantee: 'delivery to each peer if the sender is correct' },
    { name: 'Perfect links', guarantee: 'exactly once — no loss, no duplicates' },
    { name: 'Fair-loss links', guarantee: 'UDP: may drop, may duplicate, may reorder', base: true },
]

export function LayerStack() {
    const rowH = 50
    const gap = 12
    const top = 12
    const w = 668

    return (
        <Figure
            label="Figure — the stack, weakest guarantee at the bottom"
            caption="Read upward: each arrow is one layer turning the guarantee beneath it into a stronger one. Only the bottom layer touches the network."
        >
            <svg viewBox={`0 0 700 ${top + LAYERS.length * (rowH + gap)}`} width="700"
                 height={top + LAYERS.length * (rowH + gap)} role="img" style={{ maxWidth: 'none' }}>
                <title>Layered distributed abstractions over raw UDP</title>
                <desc>
                    Six layers. From the bottom: fair-loss links over UDP, perfect links,
                    best-effort broadcast, uniform reliable broadcast, FIFO broadcast, and lattice
                    agreement at the top. Each layer consumes the guarantee below it and provides a
                    stronger one.
                </desc>

                <defs>
                    <marker id="ls-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6"
                            markerHeight="6" orient="auto">
                        <path d="M0 10 L5 0 L10 10 z" fill="var(--rule-strong)" />
                    </marker>
                </defs>

                {LAYERS.map((l, i) => {
                    const y = top + i * (rowH + gap)
                    return (
                        <g key={l.name}>
                            <rect x="16" y={y} width={w} height={rowH} rx="3"
                                  fill={l.base ? 'var(--surface-sunk)' : 'var(--surface)'}
                                  stroke={l.base ? 'var(--rule)' : 'var(--rule-strong)'}
                                  strokeDasharray={l.base ? '4 3' : undefined} />
                            <text x="34" y={y + 21} fontFamily="var(--font-mono)" fontSize="13"
                                  fontWeight="600" fill="var(--ink)">
                                {l.name}
                            </text>
                            <text x="34" y={y + 38} fontFamily="var(--font-sans)" fontSize="12"
                                  fill="var(--ink-muted)">
                                {l.guarantee}
                            </text>
                            {i < LAYERS.length - 1 && (
                                <path d={`M 350 ${y + rowH + gap - 2} v ${-gap + 4}`}
                                      stroke="var(--rule-strong)" strokeWidth="1.5"
                                      markerEnd="url(#ls-arrow)" />
                            )}
                        </g>
                    )
                })}
            </svg>
        </Figure>
    )
}
