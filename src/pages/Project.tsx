import { Link, useParams } from 'react-router-dom'
import { projectBySlug } from '@/content/projects'
import { ClaimGrid } from '@/components/Claim'
import NotFound from './NotFound'

export default function Project() {
    const { slug } = useParams<{ slug: string }>()
    const project = slug ? projectBySlug.get(slug) : undefined
    if (!project) return <NotFound />

    const meta: { label: string; value: React.ReactNode }[] = [
        { label: 'Context', value: project.venue },
        { label: 'Period', value: project.period },
        {
            label: 'Code',
            value: (
                <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow tap-sm"
                >
                    {project.repoLabel}
                </a>
            ),
        },
        ...(project.extraLinks ?? []).map((l) => ({
            label: 'Models',
            value: (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-arrow tap-sm">
                    {l.label}
                </a>
            ),
        })),
    ]

    return (
        <article className="shell pt-10 pb-4">
            <nav aria-label="Breadcrumb" className="mono enter text-xs"
                 style={{ '--i': 0 } as React.CSSProperties}>
                <Link to="/" className="tap-sm no-underline hover:underline">
                    Antoine Garin
                </Link>
                <span aria-hidden="true" style={{ color: 'var(--ink-faint)' }}>
                    {' / '}
                </span>
                <Link to="/#projects" className="tap-sm no-underline hover:underline">
                    Work
                </Link>
            </nav>

            <h1 className="t-h1 enter mt-5" style={{ '--i': 1 } as React.CSSProperties}>
                {project.title}
            </h1>

            <div
                className="enter-rule mt-5 h-px"
                style={{ background: 'var(--rule-strong)', '--i': 2 } as React.CSSProperties}
            />

            <p
                className="t-lede prose-measure enter mt-5"
                style={{ '--i': 3 } as React.CSSProperties}
            >
                {project.oneLine}
            </p>

            {/* Front matter — everything a reader needs before deciding to read on.
                Rows, not columns: a two-column grid goes ragged the moment one
                value wraps, and the venue always wraps. */}
            <dl
                className="card mono enter mt-7 overflow-hidden text-xs"
                style={{ '--i': 4 } as React.CSSProperties}
            >
                {meta.map((m, i) => (
                    <div
                        key={`${m.label}-${i}`}
                        className={`grid gap-x-5 gap-y-1 px-5 py-3 sm:grid-cols-[6rem_minmax(0,1fr)] ${
                            i > 0 ? 'border-t' : ''
                        }`}
                        style={i > 0 ? { borderColor: 'var(--rule)' } : undefined}
                    >
                        <dt className="eyebrow sm:pt-0.5">{m.label}</dt>
                        <dd className="breakable" style={{ color: 'var(--ink)' }}>
                            {m.value}
                        </dd>
                    </div>
                ))}
            </dl>

            {project.claims && (
                <div className="enter mt-6" style={{ '--i': 5 } as React.CSSProperties}>
                    <ClaimGrid claims={project.claims} />
                </div>
            )}

            <div className="body-prose mt-4">{project.body()}</div>

            <ul className="mt-12 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                    <li key={t} className="tag">
                        {t}
                    </li>
                ))}
            </ul>

            <p
                className="mono mt-8 border-t pt-5 text-sm"
                style={{ borderColor: 'var(--rule)' }}
            >
                <Link to="/#projects" className="tap-sm no-underline hover:underline">
                    ← All work
                </Link>
            </p>
        </article>
    )
}
