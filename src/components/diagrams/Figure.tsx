import type { ReactNode } from 'react'

/**
 * Wrapper for every diagram: a scroll container so a wide figure never makes
 * the page scroll sideways, plus a caption that carries the conditions the
 * figure was measured under.
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
        <figure className="my-8">
            <div className="eyebrow mb-2">{label}</div>
            <div className="scroll-x card p-3 sm:p-4">{children}</div>
            {caption && (
                <figcaption className="mono mt-2 text-xs leading-relaxed text-ink-muted prose-measure">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}

