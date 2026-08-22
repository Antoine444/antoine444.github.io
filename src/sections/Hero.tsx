import { links, profile, throughLine } from '@/content/profile'
import { SOCIALS } from '@/components/socials'
import { Link } from 'react-router-dom'

export function Hero() {
    return (
        <section className="shell pt-14 pb-4 sm:pt-20">
            <h1 className="text-[clamp(2rem,6vw,3.1rem)]">{profile.name}</h1>
            <p className="prose-measure mt-4 text-[1.0625rem] leading-relaxed sm:text-lg">
                {profile.positioning}
            </p>

            {/* Status: the ten-second answer to who, when, and where. */}
            <dl className="mono mt-7 max-w-2xl border-t border-rule text-sm">
                {profile.status.map((s) => (
                    <div
                        key={s.label}
                        className="flex flex-col gap-0.5 border-b border-rule py-2.5
                                   sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                        <dt style={{ color: 'var(--ink)' }}>{s.label}</dt>
                        <dd className="text-xs sm:text-right" style={{ color: 'var(--ink-muted)' }}>
                            {s.value}
                        </dd>
                    </div>
                ))}
            </dl>

            <ul className="mt-6 flex flex-wrap items-center gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                    <li key={label}>
                        <a
                            href={href}
                            className="mono inline-flex items-center gap-2 rounded-sm border border-rule
                                       px-3 py-1.5 text-xs no-underline transition-colors
                                       hover:bg-surface-sunk"
                            style={{ color: 'var(--ink)' }}
                            {...(href.startsWith('http')
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {})}
                        >
                            <Icon width={15} height={15} />
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
}

/** Three fields, one profile — each column names artifacts, not adjectives. */
export function ThroughLine() {
    return (
        <section className="shell pt-14" aria-labelledby="through-line-heading">
            <h2 id="through-line-heading" className="sr-only">
                What I work on
            </h2>
            <div className="grid gap-px overflow-hidden rounded border border-rule bg-rule sm:grid-cols-3">
                {throughLine.map((c) => (
                    <div key={c.field} className="bg-surface p-5">
                        <h3 className="eyebrow">{c.field}</h3>
                        <p className="mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
                            {c.blurb}
                        </p>
                        <ul className="mt-3 space-y-1">
                            {c.anchors.map((a) => (
                                <li key={a.slug}>
                                    <Link
                                        to={`/projects/${a.slug}/`}
                                        className="mono text-xs no-underline hover:underline"
                                    >
                                        {a.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <p className="mono mt-3 text-[0.6875rem]" style={{ color: 'var(--ink-faint)' }}>
                            {c.stack}
                        </p>
                    </div>
                ))}
            </div>
            <p className="mono mt-3 text-xs" style={{ color: 'var(--ink-faint)' }}>
                Same person, read three ways — the overlap is the point.{' '}
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                    All repositories
                </a>
            </p>
        </section>
    )
}
