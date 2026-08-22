import { experience } from '@/content/experience'
import { SectionHead } from './SectionHead'

export function Experience() {
    return (
        <section className="shell pt-16" aria-labelledby="experience">
            <SectionHead label="Experience" id="experience" />
            <ol className="space-y-px overflow-hidden rounded border border-rule bg-rule">
                {experience.map((r) => (
                    <li key={r.org + r.title} className="bg-surface">
                        <article className="rail p-5 sm:p-6">
                            <div className="rail-label">
                                <div>{r.period}</div>
                                {r.current && (
                                    <div
                                        className="mt-1.5 inline-block rounded-sm px-1.5 py-0.5 text-[0.625rem]"
                                        style={{
                                            background: 'var(--accent-wash)',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        current
                                    </div>
                                )}
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-lg">{r.title}</h3>
                                <p className="mono mt-1 text-xs" style={{ color: 'var(--ink-faint)' }}>
                                    {r.url ? (
                                        <a href={r.url} target="_blank" rel="noopener noreferrer"
                                           className="link-arrow">
                                            {r.org}
                                        </a>
                                    ) : (
                                        r.org
                                    )}
                                    {' · '}
                                    {r.location}
                                </p>
                                <ul className="body-prose mt-3 text-sm">
                                    {r.points.map((p) => (
                                        <li key={p}>{p}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    </li>
                ))}
            </ol>
        </section>
    )
}
