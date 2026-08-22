import { Figure } from './Figure'

/**
 * The post-training chain, with the two things bolted onto it. The accuracy
 * step belongs to the SFT-then-DPO path; RAG and QLoRA are separate branches
 * and their numbers measure different things, so they sit off the main line.
 */
export function QwenPipeline() {
    const boxW = 168
    const boxH = 54
    const gap = 46
    const y = 42
    const x = (i: number) => 16 + i * (boxW + gap)

    const MAIN = [
        { title: 'Qwen3-0.6B-Base', sub: 'starting checkpoint' },
        { title: 'SFT', sub: 'supervised fine-tuning' },
        { title: 'DPO', sub: 'preference optimisation' },
    ]

    const BRANCHES = [
        { title: 'RAG', sub: '49K-passage corpus, FAISS index', stat: 'retrieval F1 0.84' },
        { title: 'QLoRA', sub: 'quantised adapters', stat: '−75% memory, 96.2% retained' },
    ]

    return (
        <Figure
            label="Figure — post-training pipeline"
            caption="Accuracy is STEM multiple-choice. The RAG and QLoRA figures measure retrieval quality and memory cost respectively; they are not accuracy and do not sit on the same axis."
        >
            <svg viewBox="0 0 660 250" width="660" height="250" role="img" style={{ maxWidth: 'none' }}>
                <title>Qwen STEM Tutor post-training pipeline</title>
                <desc>
                    A base Qwen3 0.6B checkpoint passes through supervised fine-tuning then direct
                    preference optimisation, taking STEM multiple-choice accuracy from 64.5 percent
                    to 81.97 percent. Two separate additions sit off the main path: retrieval
                    augmented generation over a 49 thousand passage FAISS index with retrieval F1
                    of 0.84, and QLoRA quantisation cutting memory by 75 percent while retaining
                    96.2 percent of full-precision performance.
                </desc>

                <defs>
                    <marker id="qp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6"
                            markerHeight="6" orient="auto">
                        <path d="M0 0 L10 5 L0 10 z" fill="var(--rule-strong)" />
                    </marker>
                </defs>

                {MAIN.map((m, i) => (
                    <g key={m.title}>
                        <rect x={x(i)} y={y} width={boxW} height={boxH} rx="3"
                              fill={i === 0 ? 'var(--surface-sunk)' : 'var(--surface)'}
                              stroke={i === 0 ? 'var(--rule)' : 'var(--rule-strong)'} />
                        <text x={x(i) + boxW / 2} y={y + 23} textAnchor="middle"
                              fontFamily="var(--font-mono)" fontSize="13" fontWeight="600"
                              fill="var(--ink)">
                            {m.title}
                        </text>
                        <text x={x(i) + boxW / 2} y={y + 40} textAnchor="middle"
                              fontFamily="var(--font-sans)" fontSize="11" fill="var(--ink-muted)">
                            {m.sub}
                        </text>
                        {i < MAIN.length - 1 && (
                            <path d={`M ${x(i) + boxW + 6} ${y + boxH / 2} h ${gap - 14}`}
                                  stroke="var(--rule-strong)" strokeWidth="1.5"
                                  markerEnd="url(#qp-arrow)" />
                        )}
                    </g>
                ))}

                {/* accuracy step under the main chain */}
                <path d={`M ${x(0) + boxW / 2} ${y + boxH + 8} v 14 H ${x(2) + boxW / 2} v -14`}
                      fill="none" stroke="var(--rule)" strokeWidth="1" />
                <text x={x(0) + boxW / 2} y={y + boxH + 40} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize="13" fill="var(--ink-muted)">
                    64.5%
                </text>
                <text x={(x(0) + x(2) + boxW) / 2} y={y + boxH + 40} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-faint)">
                    STEM multiple-choice accuracy
                </text>
                <text x={x(2) + boxW / 2} y={y + boxH + 40} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize="13" fontWeight="600"
                      fill="var(--ink-positive)">
                    81.97%
                </text>

                {/* branches */}
                <line x1="16" y1="168" x2="644" y2="168" stroke="var(--rule)" />
                <text x="16" y="162" fontFamily="var(--font-mono)" fontSize="10"
                      letterSpacing="0.1em" fill="var(--ink-faint)">
                    ADDED SEPARATELY
                </text>
                {BRANCHES.map((b, i) => (
                    <g key={b.title} transform={`translate(${16 + i * 322}, 180)`}>
                        <rect x="0" y="0" width="300" height="52" rx="3"
                              fill="var(--surface)" stroke="var(--rule)" strokeDasharray="4 3" />
                        <text x="14" y="21" fontFamily="var(--font-mono)" fontSize="12.5"
                              fontWeight="600" fill="var(--ink)">
                            {b.title}
                        </text>
                        <text x="60" y="21" fontFamily="var(--font-sans)" fontSize="11"
                              fill="var(--ink-muted)">
                            {b.sub}
                        </text>
                        <text x="14" y="40" fontFamily="var(--font-mono)" fontSize="11.5"
                              fill="var(--ink-positive)">
                            {b.stat}
                        </text>
                    </g>
                ))}
            </svg>
        </Figure>
    )
}
