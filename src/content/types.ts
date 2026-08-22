import type { ReactNode } from 'react'

export type Tone = 'positive' | 'neutral' | 'adverse'

/**
 * A number and the condition under which it holds.
 * The condition is not a footnote — it renders at the same weight as the figure.
 */
export interface Claim {
    figure: string
    metric: string
    condition: string
    tone: Tone
}

export interface Project {
    slug: string
    title: string
    venue: string
    period: string
    /** Sorting key; also the year shown in the metadata rail. */
    year: string
    repo: string
    repoLabel: string
    extraLinks?: { label: string; href: string }[]
    /** One sentence a reader can carry away. No adjectives. */
    oneLine: string
    tags: string[]
    claims?: Claim[]
    /** Rendered on the detail page. */
    body: () => ReactNode
}

export interface EarlierProject {
    title: string
    venue: string
    period: string
    repo: string
    repoLabel: string
    summary: string
    tags: string[]
}
