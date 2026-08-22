import type { Claim as ClaimData } from '@/content/types'

/**
 * A figure and the precondition it depends on, bound together.
 *
 * The condition renders inside the same box on the same hairline grid — never
 * as a footnote, never hidden behind a tooltip, never dropped on small screens.
 * An adverse result uses the identical component at the identical size, because
 * where a method fails is as much a finding as where it works.
 */
export function ClaimCard({ figure, metric, condition, tone }: ClaimData) {
    return (
        <div className={`claim claim-${tone}`}>
            <div className="claim-figure">{figure}</div>
            <div className="claim-metric">{metric}</div>
            <div className="claim-condition">{condition}</div>
        </div>
    )
}

export function ClaimGrid({ claims }: { claims: readonly ClaimData[] }) {
    if (!claims.length) return null
    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {claims.map((c) => (
                <ClaimCard key={c.figure + c.metric} {...c} />
            ))}
        </div>
    )
}
