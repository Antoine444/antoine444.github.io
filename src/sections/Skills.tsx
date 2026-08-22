import { skills } from '@/content/skills'
import { SectionHead } from './SectionHead'

export function Skills() {
    return (
        <section className="shell pt-16" aria-labelledby="skills">
            <SectionHead label="Skills" id="skills" />
            <dl className="overflow-hidden rounded border border-rule">
                {skills.map((s, i) => (
                    <div
                        key={s.group}
                        className={`rail bg-surface p-4 sm:px-5 ${i > 0 ? 'border-t border-rule' : ''}`}
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
