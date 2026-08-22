import { Figure } from './Figure'

/**
 * The 64-bit versioned lock word. The whole point of the layout is that the
 * version and the lock bit live in one atomic, so a single load reads both.
 */
export function LockWord() {
    const x0 = 44
    const lockX = 604
    const x1 = 668
    const y = 46
    const h = 48

    return (
        <Figure
            label="Figure — VersionedLock, one std::atomic<uint64_t>"
            caption="Striped 2¹⁶-entry lock table, indexed by (address / align) % 65536. The clock is incremented by 2 so the low bit always stays clear and clock values compare directly against a lock word's version field."
        >
            <svg viewBox="0 0 712 172" width="712" height="172" role="img"
                 style={{ maxWidth: 'none' }}>
                <title>64-bit versioned lock word layout</title>
                <desc>
                    Bits 63 down to 1 hold the version. Bit 0, the least significant bit, is the
                    lock bit. Both fields live in a single 64-bit atomic, so one atomic load reads
                    the lock state and the version together.
                </desc>

                {/* bit indices */}
                <g fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-faint)">
                    <text x={x0} y={30} textAnchor="start">63</text>
                    <text x={lockX - 4} y={30} textAnchor="end">1</text>
                    <text x={(lockX + x1) / 2} y={30} textAnchor="middle">0</text>
                </g>

                {/* version field */}
                <rect x={x0} y={y} width={lockX - x0} height={h} rx="2"
                      fill="var(--wash-neutral)" stroke="var(--rule-strong)" />
                <text x={(x0 + lockX) / 2} y={y + h / 2 + 5} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize="14" fill="var(--ink)">
                    version
                </text>

                {/* lock bit */}
                <rect x={lockX} y={y} width={x1 - lockX} height={h} rx="2"
                      fill="var(--wash-positive)" stroke="var(--mark-positive)" />
                <text x={(lockX + x1) / 2} y={y + h / 2 + 5} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize="14" fontWeight="600"
                      fill="var(--ink-positive)">
                    L
                </text>

                {/* leader from the lock cell down to its label */}
                <path d={`M ${(lockX + x1) / 2} ${y + h + 4} v 18 h -70`}
                      fill="none" stroke="var(--rule-strong)" strokeWidth="1" />
                <text x={(lockX + x1) / 2 - 76} y={y + h + 26} textAnchor="end"
                      fontFamily="var(--font-mono)" fontSize="11.5" fill="var(--ink-muted)">
                    lock bit (LSB)
                </text>

                {/* span annotation under the version field */}
                <path d={`M ${x0} ${y + h + 4} v 8 M ${lockX} ${y + h + 4} v 8 M ${x0} ${y + h + 8} H ${lockX}`}
                      fill="none" stroke="var(--rule-strong)" strokeWidth="1" />
                <text x={x0} y={y + h + 28} textAnchor="start"
                      fontFamily="var(--font-mono)" fontSize="11.5" fill="var(--ink-muted)">
                    63 bits — bumped by 2 per commit, so bit 0 is never disturbed
                </text>

                <line x1={x0} y1={148} x2={x1} y2={148} stroke="var(--rule)" />
                <text x={x0} y={165} fontFamily="var(--font-mono)" fontSize="11.5"
                      fill="var(--ink)">
                    One atomic load returns (locked?, version) as a consistent pair.
                </text>
            </svg>
        </Figure>
    )
}
