import type { Claim as ClaimData, Tone } from '@/content/types'

/**
 * The word for each tone.
 *
 * The figure's colour has always encoded this, but nothing on the page ever
 * said so — six cyan figures among eighteen read as arbitrary highlights
 * rather than a system. Saying it in words makes the rule learnable from the
 * first card, and means the distinction no longer rests on colour alone.
 */
const TONE_LABEL: Record<Tone, string> = {
    positive: 'improves',
    adverse: 'degrades',
    neutral: 'context',
}

/**
 * A figure and the precondition it depends on, bound together.
 *
 * The condition renders inside the same box on the same hairline grid — never
 * as a footnote, never hidden behind a tooltip, never dropped on small screens.
 * It sits on a tinted band that carries the tone, which makes the qualifier the
 * most structurally prominent part of the card rather than the least.
 *
 * An adverse result uses the identical component at the identical size, because
 * where a method fails is as much a finding as where it works. `lead` scales
 * every tone by the same amount, so an adverse claim can never come out smaller
 * than a positive one.
 */
export function ClaimCard({
    figure,
    metric,
    condition,
    tone,
    lead = false,
}: ClaimData & { lead?: boolean }) {
    return (
        <div className={`claim claim-${tone}${lead ? ' claim-lead' : ''}`}>
            <div className="claim-head">
                <span className="claim-tone">{TONE_LABEL[tone]}</span>
                <div className="claim-figure">{figure}</div>
                <div className="claim-metric">{metric}</div>
            </div>
            <div className="claim-condition">{condition}</div>
        </div>
    )
}

export function ClaimGrid({
    claims,
    lead = false,
}: {
    claims: readonly ClaimData[]
    lead?: boolean
}) {
    if (!claims.length) return null
    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {claims.map((c) => (
                <ClaimCard key={c.figure + c.metric} {...c} lead={lead} />
            ))}
        </div>
    )
}
