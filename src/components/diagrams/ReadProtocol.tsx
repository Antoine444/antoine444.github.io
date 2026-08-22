import { Figure } from './Figure'

/**
 * The sampling sandwich. Numbered because the order is the mechanism — step 3
 * exists purely to stop the compiler or CPU hoisting step 2 outside the two
 * samples, which would make the validation prove nothing.
 */
const STEPS = [
    { n: 1, text: 'pre-read lock sample', note: 'one atomic load' },
    { n: 2, text: 'read the word', note: '' },
    { n: 3, text: 'std::atomic_thread_fence(memory_order_acquire)', note: 'load-bearing', key: true },
    { n: 4, text: 'post-read lock sample', note: 'one atomic load' },
    { n: 5, text: 'validate', note: '' },
]

const CONDITIONS = [
    'unlocked in both samples',
    'version unchanged between them',
    'version ≤ the transaction read-version rv',
]

export function ReadProtocol() {
    const rowH = 38
    const top = 34

    return (
        <Figure
            label="Figure — tm_read, the sampling sandwich"
            caption="A read-write transaction records the lock pointer for commit-time revalidation. A read-only transaction takes no locks and builds no read-set at all — the sandwich has already proved every read came from a state at or before rv."
        >
            <svg viewBox="0 0 640 316" width="640" height="316" role="img" style={{ maxWidth: 'none' }}>
                <title>TL2 read protocol: the sampling sandwich</title>
                <desc>
                    Five ordered steps. A lock sample before the read, the read itself, an acquire
                    fence, a lock sample after the read, then validation. The read is valid only if
                    the word was unlocked in both samples, the version did not change between them,
                    and that version is not newer than the transaction read-version.
                </desc>

                {/* bracket spanning steps 1 to 4 */}
                <path d={`M 18 ${top + 8} h -8 v ${rowH * 3 + 16} h 8`}
                      fill="none" stroke="var(--rule-strong)" strokeWidth="1" />
                <text x="4" y={top + rowH * 2 - 6} transform={`rotate(-90 4 ${top + rowH * 2 - 6})`}
                      textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10"
                      letterSpacing="0.1em" fill="var(--ink-faint)">
                    SANDWICH
                </text>

                {STEPS.map((s, i) => {
                    const y = top + i * rowH
                    return (
                        <g key={s.n}>
                            {i > 0 && (
                                <path d={`M 40 ${y - 12} v 8`} stroke="var(--rule-strong)"
                                      strokeWidth="1" markerEnd="url(#rp-arrow)" />
                            )}
                            <circle cx="40" cy={y + 8} r="11"
                                    fill={s.key ? 'var(--wash-positive)' : 'var(--surface-sunk)'}
                                    stroke={s.key ? 'var(--mark-positive)' : 'var(--rule-strong)'} />
                            <text x="40" y={y + 12} textAnchor="middle" fontFamily="var(--font-mono)"
                                  fontSize="11" fontWeight="600"
                                  fill={s.key ? 'var(--ink-positive)' : 'var(--ink-muted)'}>
                                {s.n}
                            </text>
                            <text x="62" y={y + 12} fontFamily="var(--font-mono)"
                                  fontSize={s.key ? 11.5 : 13}
                                  fill="var(--ink)">
                                {s.text}
                            </text>
                            {s.note && (
                                <text x="620" y={y + 12} textAnchor="end" fontFamily="var(--font-mono)"
                                      fontSize="11" fill="var(--ink-faint)">
                                    {s.note}
                                </text>
                            )}
                        </g>
                    )
                })}

                <defs>
                    <marker id="rp-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5"
                            markerHeight="5" orient="auto">
                        <path d="M0 0 L8 4 L0 8 z" fill="var(--rule-strong)" />
                    </marker>
                </defs>

                {/* validity conditions */}
                <rect x="24" y={top + rowH * 5 + 8} width="596" height="86" rx="3"
                      fill="var(--surface-sunk)" stroke="var(--rule)" />
                <text x="40" y={top + rowH * 5 + 30} fontFamily="var(--font-mono)" fontSize="11"
                      letterSpacing="0.08em" fill="var(--ink-faint)">
                    VALID ONLY IF ALL THREE HOLD
                </text>
                {CONDITIONS.map((c, i) => (
                    <g key={c}>
                        <path d={`M 42 ${top + rowH * 5 + 47 + i * 17} h 8`}
                              stroke="var(--rule-strong)" strokeWidth="1" />
                        <text x="58" y={top + rowH * 5 + 51 + i * 17} fontFamily="var(--font-mono)"
                              fontSize="12" fill="var(--ink)">
                            {c}
                        </text>
                    </g>
                ))}
                <text x="612" y={top + rowH * 5 + 84} textAnchor="end" fontFamily="var(--font-mono)"
                      fontSize="11" fill="var(--ink-adverse)">
                    otherwise: abort
                </text>
            </svg>
        </Figure>
    )
}
