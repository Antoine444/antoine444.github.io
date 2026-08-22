import { coursework, education } from '@/content/education'
import { SectionHead } from './SectionHead'

export function Education() {
    return (
        <section className="shell pt-16" aria-labelledby="education">
            <SectionHead label="Education" id="education" />

            <ol className="space-y-px overflow-hidden rounded border border-rule bg-rule">
                {education.map((d) => (
                    <li key={d.degree} className="bg-surface">
                        <div className="rail p-5 sm:p-6">
                            <div className="rail-label">
                                <div>{d.period}</div>
                                {d.status && <div className="text-[0.6875rem]">{d.status}</div>}
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-lg">
                                    {d.degree} {d.field}
                                </h3>
                                <p className="mono mt-1 text-xs" style={{ color: 'var(--ink-faint)' }}>
                                    {d.school} · {d.location}
                                    {d.gpa && <> · GPA {d.gpa}</>}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>

            <h3 className="eyebrow mt-8 mb-3">Coursework</h3>
            <div className="grid gap-px overflow-hidden rounded border border-rule bg-rule sm:grid-cols-3">
                {coursework.map((c) => (
                    <div key={c.group} className="bg-surface p-5">
                        <h4 className="mono text-xs" style={{ color: 'var(--ink-faint)' }}>
                            {c.group}
                        </h4>
                        <ul className="mt-2 space-y-1 text-sm">
                            {c.items.map((i) => (
                                <li key={i}>{i}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}
