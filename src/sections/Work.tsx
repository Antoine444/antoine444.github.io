import { Link } from 'react-router-dom'
import { earlierProjects, projects } from '@/content/projects'
import { ClaimCard } from '@/components/Claim'
import { leadProject } from './leadProject'
import { SectionHead } from './SectionHead'

export function Work() {
    return (
        <section className="shell section" aria-labelledby="projects">
            <SectionHead label="Selected work" id="projects" />

            {/* Separate cards, not a stacked hairline list: each project has to
                read as its own object before anything inside it can. */}
            <ol className="grid gap-5">
                {projects.map((p, i) => {
                    // The hero already carries this project's findings in full.
                    const showClaims = p.slug !== leadProject.slug && p.claims?.length
                    return (
                        <li key={p.slug} className="reveal"
                            style={{ '--r': Math.min(i, 2) } as React.CSSProperties}>
                            <article className="card card-glow card-interactive tile-host rail p-5 sm:p-7">
                                {/* Metadata rail: the column a scanner runs their eye down. */}
                                <div className="rail-label">
                                    <div className="text-sm" style={{ color: 'var(--ink)' }}>
                                        {p.year}
                                    </div>
                                    <div className="mt-0.5 text-[0.6875rem]">{p.period}</div>
                                </div>

                                <div className="min-w-0">
                                    {p.slug === leadProject.slug && (
                                        <p className="badge mb-3">Current</p>
                                    )}
                                    <h3 className="t-h3">
                                        <Link
                                            to={`/projects/${p.slug}/`}
                                            className="title-link"
                                        >
                                            {p.title}
                                        </Link>
                                    </h3>
                                    <p
                                        className="mono mt-1.5 text-xs"
                                        style={{ color: 'var(--ink-faint)' }}
                                    >
                                        {p.venue}
                                    </p>
                                    <p className="prose-measure mt-3 text-[0.9375rem] leading-relaxed">
                                        {p.oneLine}
                                    </p>

                                    {showClaims && (
                                        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {p.claims!.map((c) => (
                                                <ClaimCard key={c.figure + c.metric} {...c} />
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                                        <Link
                                            to={`/projects/${p.slug}/`}
                                            className="mono arrow-link text-xs"
                                        >
                                            Read the write-up
                                            <span className="arrow" aria-hidden="true">
                                                →
                                            </span>
                                        </Link>
                                        <a
                                            href={p.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mono link-arrow tap-sm text-xs"
                                        >
                                            {p.repoLabel}
                                        </a>
                                        {p.extraLinks?.map((l) => (
                                            <a
                                                key={l.href}
                                                href={l.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mono link-arrow tap-sm text-xs"
                                            >
                                                {l.label}
                                            </a>
                                        ))}
                                    </div>

                                    <ul className="mt-4 flex flex-wrap gap-1.5">
                                        {p.tags.map((t) => (
                                            <li key={t} className="tag">
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        </li>
                    )
                })}
            </ol>

            {/* Subordinate by composition, not by hiding it: no card, no rail,
                two columns, hairline over each entry. */}
            <h3 className="sub-head mt-16">
                <span>Earlier work</span>
            </h3>
            <ul className="grid gap-5 sm:grid-cols-2">
                {earlierProjects.map((p, i) => (
                    <li key={p.repo}
                        className="card card-glow tile-host reveal p-6"
                        style={{ '--r': i } as React.CSSProperties}>
                        <p className="mono text-[0.6875rem]" style={{ color: 'var(--ink-faint)' }}>
                            {p.period}
                        </p>
                        <h4 className="mt-2 text-base font-semibold">{p.title}</h4>
                        <p className="mono mt-1 text-xs" style={{ color: 'var(--ink-faint)' }}>
                            {p.venue}
                        </p>
                        <p className="mt-2.5 text-sm leading-relaxed">{p.summary}</p>
                        <a
                            href={p.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mono link-arrow tap-sm mt-3 text-xs"
                        >
                            {p.repoLabel}
                        </a>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                            {p.tags.map((t) => (
                                <li key={t} className="tag">
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    )
}
