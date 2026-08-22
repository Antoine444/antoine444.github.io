import type { ReactNode } from 'react'

/**
 * Wrapper for every diagram: a scroll container so a wide figure never makes
 * the page scroll sideways, plus a caption that carries the conditions the
 * figure was measured under.
 *
 * The caption sits against a rule rather than floating free — same hairline
 * grid the claims use, for the same reason: the qualifier belongs to the
 * figure, not to the whitespace after it.
 */
export function Figure({
    label,
    caption,
    children,
}: {
    label: string
    caption?: ReactNode
    children: ReactNode
}) {
    return (
        <figure className="my-10">
            <div className="eyebrow mb-2.5">{label}</div>
            <div className="scroll-x card p-4 sm:p-5">{children}</div>
            {caption && (
                <figcaption
                    className="mono prose-measure mt-3.5 border-l-2 pl-3.5 text-xs leading-relaxed"
                    style={{ borderColor: 'var(--rule-strong)', color: 'var(--ink-muted)' }}
                >
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}
