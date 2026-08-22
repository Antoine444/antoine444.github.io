import { skills } from '@/content/skills'
import { SectionHead } from './SectionHead'

/**
 * The one place on the page where high density is the right answer: a single
 * card holding every group, so the whole inventory reads as one object.
 */
export function Skills() {
    return (
        <section className="shell section" aria-labelledby="skills">
            <SectionHead label="Skills" id="skills" />
            <dl className="card reveal overflow-hidden">
                {skills.map((s, i) => (
                    <div
                        key={s.group}
                        className={`rail px-5 py-4 sm:px-6 ${i > 0 ? 'border-t' : ''}`}
                        style={i > 0 ? { borderColor: 'var(--rule)' } : undefined}
                    >
                        <dt className="rail-label">{s.group}</dt>
                        <dd>
                            <ul className="flex flex-wrap gap-1.5">
                                {s.items.map((t) => (
                                    <li key={t} className="tag">
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}
