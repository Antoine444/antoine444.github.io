import { coursework, education } from '@/content/education'
import { SectionHead } from './SectionHead'

/**
 * Two facts and a course list. It gets rules on the page rather than cards —
 * there is not enough here to justify an object, and the section next to it
 * already uses one.
 */
export function Education() {
    return (
        <section className="shell section" aria-labelledby="education">
            <SectionHead label="Education" id="education" />

            <ol className="border-t" style={{ borderColor: 'var(--rule)' }}>
                {education.map((d, i) => (
                    <li
                        key={d.degree}
                        className="rail reveal border-b py-5"
                        style={{ borderColor: 'var(--rule)', '--r': i } as React.CSSProperties}
                    >
                        <div className="rail-label">
                            <div>{d.period}</div>
                            {d.status && <div className="mt-0.5 text-[0.6875rem]">{d.status}</div>}
                        </div>
                        <div className="min-w-0">
                            <h3 className="t-h3">
                                {d.degree} {d.field}
                            </h3>
                            <p className="mono mt-1.5 text-xs" style={{ color: 'var(--ink-faint)' }}>
                                {d.school} · {d.location}
                                {d.gpa && <> · GPA {d.gpa}</>}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>

            <h3 className="sub-head mt-12">
                <span>Coursework</span>
            </h3>
            <div className="grid gap-x-10 gap-y-7 sm:grid-cols-3">
                {coursework.map((c, i) => (
                    <div key={c.group} className="reveal"
                         style={{ '--r': i } as React.CSSProperties}>
                        <h4 className="mono text-xs" style={{ color: 'var(--ink)' }}>
                            {c.group}
                        </h4>
                        <ul className="mt-2.5 space-y-1.5">
                            {c.items.map((course) => (
                                <li
                                    key={course}
                                    className="text-sm leading-snug"
                                    style={{ color: 'var(--ink-muted)' }}
                                >
                                    {course}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}
