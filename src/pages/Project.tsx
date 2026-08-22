import { Link, useParams } from 'react-router-dom'
import { projectBySlug } from '@/content/projects'
import { ClaimGrid } from '@/components/Claim'
import NotFound from './NotFound'

export default function Project() {
    const { slug } = useParams<{ slug: string }>()
    const project = slug ? projectBySlug.get(slug) : undefined
    if (!project) return <NotFound />

    return (
        <article className="shell pt-10 pb-4">
            <nav aria-label="Breadcrumb" className="mono text-xs">
                <Link to="/" className="no-underline hover:underline">Antoine Garin</Link>
                <span aria-hidden="true" style={{ color: 'var(--ink-faint)' }}> / </span>
                <Link to="/#projects" className="no-underline hover:underline">Work</Link>
            </nav>

            <h1 className="mt-4 text-[clamp(1.6rem,4.4vw,2.35rem)]">{project.title}</h1>
            <p className="prose-measure mt-3 text-base leading-relaxed sm:text-[1.0625rem]">
                {project.oneLine}
            </p>

            {/* Metadata bar — everything a reader needs before deciding to read on. */}
            <dl className="mono mt-6 grid gap-x-8 gap-y-2 border-y border-rule py-3 text-xs sm:grid-cols-2">
                <div className="flex gap-2">
                    <dt style={{ color: 'var(--ink-faint)' }}>Context</dt>
                    <dd style={{ color: 'var(--ink)' }}>{project.venue}</dd>
                </div>
                <div className="flex gap-2">
                    <dt style={{ color: 'var(--ink-faint)' }}>Period</dt>
                    <dd style={{ color: 'var(--ink)' }}>{project.period}</dd>
                </div>
                <div className="flex gap-2">
                    <dt style={{ color: 'var(--ink-faint)' }}>Code</dt>
                    <dd>
                        <a href={project.repo} target="_blank" rel="noopener noreferrer"
                           className="link-arrow">
                            {project.repoLabel}
                        </a>
                    </dd>
                </div>
                {project.extraLinks?.map((l) => (
                    <div key={l.href} className="flex gap-2">
                        <dt style={{ color: 'var(--ink-faint)' }}>Models</dt>
                        <dd>
                            <a href={l.href} target="_blank" rel="noopener noreferrer"
                               className="link-arrow">
                                {l.label}
                            </a>
                        </dd>
                    </div>
                ))}
            </dl>

            {project.claims && (
                <div className="mt-6">
                    <ClaimGrid claims={project.claims} />
                </div>
            )}

            <div className="body-prose mt-2">{project.body()}</div>

            <ul className="mt-10 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                    <li key={t} className="tag">{t}</li>
                ))}
            </ul>

            <p className="mono mt-8 border-t border-rule pt-5 text-xs">
                <Link to="/#projects" className="no-underline hover:underline">
                    ← All work
                </Link>
            </p>
        </article>
    )
}
