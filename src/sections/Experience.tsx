import { experience } from '@/content/experience'
import { SectionHead } from './SectionHead'

/**
 * A spine, because this list really is a sequence: reverse-chronological, with
 * the current role at the top. The marker encodes position in time, which is
 * information the reader needs, rather than decoration.
 */
export function Experience() {
    return (
        <section className="shell section" aria-labelledby="experience">
            <SectionHead label="Experience" id="experience" />
            <ol className="spine grid gap-10">
                {experience.map((r, i) => (
                    <li
                        key={r.org + r.title}
                        className={`spine-item reveal${r.current ? ' spine-item-current' : ''}`}
                        style={{ '--r': i } as React.CSSProperties}
                    >
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                            <span className="mono text-xs" style={{ color: 'var(--ink-faint)' }}>
                                {r.period}
                            </span>
                            {r.current && (
                                <span className="badge">current</span>
                            )}
                        </div>
                        <h3 className="t-h3 mt-2">{r.title}</h3>
                        <p className="mono mt-1.5 text-xs" style={{ color: 'var(--ink-faint)' }}>
                            {r.url ? (
                                <a
                                    href={r.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-arrow"
                                >
                                    {r.org}
                                </a>
                            ) : (
                                r.org
                            )}
                            {' · '}
                            {r.location}
                        </p>
                        <ul className="body-prose prose-measure mt-4 text-sm">
                            {r.points.map((p) => (
                                <li key={p}>{p}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </section>
    )
}
