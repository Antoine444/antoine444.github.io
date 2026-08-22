import { Link } from 'react-router-dom'
import { earlierProjects, projects } from '@/content/projects'
import { ClaimCard } from '@/components/Claim'
import { SectionHead } from './SectionHead'

export function Work() {
    return (
        <section className="shell pt-16" aria-labelledby="projects">
            <SectionHead label="Selected work" id="projects" />

            <ol className="space-y-px overflow-hidden rounded border border-rule bg-rule">
                {projects.map((p) => (
                    <li key={p.slug} className="bg-surface">
                        <article className="rail p-5 sm:p-6">
                            {/* Metadata rail: the column a scanner runs their eye down. */}
                            <div className="rail-label">
                                <div style={{ color: 'var(--ink-muted)' }}>{p.year}</div>
                                <div className="text-[0.6875rem]">{p.period}</div>
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-lg">
                                    <Link to={`/projects/${p.slug}/`} className="no-underline hover:underline"
                                          style={{ color: 'var(--ink)' }}>
                                        {p.title}
                                    </Link>
                                </h3>
                                <p className="mono mt-1 text-xs" style={{ color: 'var(--ink-faint)' }}>
                                    {p.venue}
                                </p>
                                <p className="prose-measure mt-3 text-sm leading-relaxed">{p.oneLine}</p>

                                {p.claims && (
                                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {p.claims.map((c) => (
                                            <ClaimCard key={c.figure + c.metric} {...c} />
                                        ))}
                                    </div>
                                )}

                                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <Link to={`/projects/${p.slug}/`} className="mono text-xs">
                                        Read the write-up
                                    </Link>
                                    <a
                                        href={p.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mono link-arrow text-xs"
                                    >
                                        {p.repoLabel}
                                    </a>
                                    {p.extraLinks?.map((l) => (
                                        <a key={l.href} href={l.href} target="_blank"
                                           rel="noopener noreferrer" className="mono link-arrow text-xs">
                                            {l.label}
                                        </a>
                                    ))}
                                </div>

                                <ul className="mt-3 flex flex-wrap gap-1.5">
                                    {p.tags.map((t) => (
                                        <li key={t} className="tag">{t}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    </li>
                ))}
            </ol>

            <h3 className="eyebrow mt-10 mb-3">Earlier work</h3>
            <ul className="space-y-px overflow-hidden rounded border border-rule bg-rule">
                {earlierProjects.map((p) => (
                    <li key={p.repo} className="bg-surface">
                        <article className="rail p-5">
                            <div className="rail-label">{p.period}</div>
                            <div className="min-w-0">
                                <h4 className="text-base font-semibold">{p.title}</h4>
                                <p className="mono mt-1 text-xs" style={{ color: 'var(--ink-faint)' }}>
                                    {p.venue}
                                </p>
                                <p className="prose-measure mt-2 text-sm leading-relaxed">{p.summary}</p>
                                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <a href={p.repo} target="_blank" rel="noopener noreferrer"
                                       className="mono link-arrow text-xs">
                                        {p.repoLabel}
                                    </a>
                                    <ul className="flex flex-wrap gap-1.5">
                                        {p.tags.map((t) => (
                                            <li key={t} className="tag">{t}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    )
}
