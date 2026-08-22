import { links, profile, throughLine } from '@/content/profile'
import { Rotator } from '@/components/Rotator'
import { SOCIALS } from '@/components/socials'
import { MachineLearningIcon, QuantIcon, SystemsIcon } from '@/components/Icons'
import { ClaimGrid } from '@/components/Claim'
import { leadProject } from './leadProject'
import { SectionHead } from './SectionHead'
import { Link } from 'react-router-dom'

/**
 * Splits the name so each letter can arrive on its own, without ever letting a
 * word break mid-way on a narrow screen: words stay unbreakable, only the
 * letters inside them are staggered.
 */
function AnimatedName({ name }: { name: string }) {
    let n = 0
    return (
        <span aria-hidden="true">
            {name.split(' ').map((word, w, all) => (
                <span key={`${word}-${w}`}>
                    <span className="name-word">
                        {[...word].map((ch, i) => (
                            <span
                                key={i}
                                className="name-char"
                                style={{ '--c': n++ } as React.CSSProperties}
                            >
                                {ch}
                            </span>
                        ))}
                    </span>
                    {w < all.length - 1 ? ' ' : null}
                </span>
            ))}
        </span>
    )
}

/**
 * The opening statement.
 *
 * The name is the one genuinely large thing on the page. Under it, a rule and
 * the three fields — drawn from the through-line data, so the page names its
 * own subject in its own words before it says anything else.
 *
 * `--i` drives the first-paint stagger. The animation is CSS-only, so it runs
 * off the prerendered HTML without waiting for hydration.
 */
export function Hero() {
    return (
        <section className="shell pt-12 sm:pt-20">
            <h1 className="t-display" aria-label={profile.name}>
                <AnimatedName name={profile.name} />
            </h1>

            <div
                className="enter-rule mt-6 h-px"
                style={{ background: 'var(--rule-strong)', '--i': 1 } as React.CSSProperties}
            />

            <div className="enter mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-3"
                 style={{ '--i': 2 } as React.CSSProperties}>
                <p className="eyebrow" style={{ color: 'var(--ink-muted)' }}>
                    <Rotator items={throughLine.map((c) => c.field)} />
                </p>
                <p className="status-pill">Open to internships and graduate roles</p>
            </div>

            <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
                <div>
                    <p
                        className="t-lede prose-measure enter"
                        style={{ '--i': 3 } as React.CSSProperties}
                    >
                        {profile.positioning}
                    </p>

                    <ul
                        className="enter mt-7 flex flex-wrap items-center gap-2"
                        style={{ '--i': 5 } as React.CSSProperties}
                    >
                        {SOCIALS.map(({ href, label, Icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="pill"
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
                </div>

                {/* Status: the ten-second answer to who, when, and where. */}
                <dl
                    className="mono enter self-start border-t"
                    style={{ borderColor: 'var(--rule)', '--i': 4 } as React.CSSProperties}
                >
                    {profile.status.map((s) => (
                        <div
                            key={s.label}
                            className="flex flex-col gap-0.5 border-b py-2.5"
                            style={{ borderColor: 'var(--rule)' }}
                        >
                            <dt className="text-[0.8125rem]" style={{ color: 'var(--ink)' }}>
                                {s.label}
                            </dt>
                            <dd className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                                {s.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}

/**
 * The current project, presented in full at the top of the page.
 *
 * This is the thesis of the site made visible: a result, and the regime it
 * holds in, at the same size. The adverse finding sits second, unshrunk, in
 * the first screenful — which is the point. Work renders this project without
 * its claims so the page never states the same finding twice.
 */
export function CurrentWork() {
    const p = leadProject
    return (
        <section className="shell section" aria-labelledby="current-work">
            <SectionHead label="Current research" id="current-work" />

            <div className="reveal" style={{ '--r': 0 } as React.CSSProperties}>
                <h3 className="t-h2">
                    <Link to={`/projects/${p.slug}/`} className="title-link">
                        {p.title}
                    </Link>
                </h3>
                <p className="mono mt-2 text-xs" style={{ color: 'var(--ink-faint)' }}>
                    {p.venue} · {p.period}
                </p>
                <p className="prose-measure mt-4 text-[1.0625rem] leading-relaxed">{p.oneLine}</p>
            </div>

            {p.claims && (
                <div className="reveal mt-7" style={{ '--r': 1 } as React.CSSProperties}>
                    <ClaimGrid claims={p.claims} lead />
                </div>
            )}

            <div
                className="reveal mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
                style={{ '--r': 2 } as React.CSSProperties}
            >
                <Link to={`/projects/${p.slug}/`} className="mono arrow-link text-sm">
                    Read the write-up
                    <span className="arrow" aria-hidden="true">
                        →
                    </span>
                </Link>
                <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono link-arrow tap-sm text-sm"
                >
                    {p.repoLabel}
                </a>
            </div>
        </section>
    )
}

/** One mark per field, in the order the through-line declares them. */
const FIELD_ICONS = [SystemsIcon, MachineLearningIcon, QuantIcon]

/** Three fields, one profile — each tile names artifacts, not adjectives. */
export function ThroughLine() {
    return (
        <section className="shell section" aria-labelledby="through-line-heading">
            <SectionHead label="What I work on" id="through-line-heading" />

            <div className="grid gap-5 sm:grid-cols-3">
                {throughLine.map((c, i) => {
                    const Mark = FIELD_ICONS[i]
                    return (
                        <div
                            key={c.field}
                            className="card card-glow tile-host reveal flex flex-col p-6"
                            style={{ '--r': i } as React.CSSProperties}
                        >
                            <span className="icon-tile">
                                <Mark width={22} height={22} />
                            </span>
                            <h3 className="t-h3 mt-5">{c.field}</h3>
                            <p
                                className="mt-3 text-[0.9375rem] leading-relaxed"
                                style={{ color: 'var(--ink-muted)' }}
                            >
                                {c.blurb}
                            </p>
                            <ul className="mt-4 space-y-1.5">
                                {c.anchors.map((a) => (
                                    <li key={a.slug}>
                                        <Link
                                            to={`/projects/${a.slug}/`}
                                            className="mono tap-sm text-xs no-underline hover:underline"
                                        >
                                            {a.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <p
                                className="mono mt-auto pt-5 text-[0.6875rem] leading-relaxed"
                                style={{ color: 'var(--ink-faint)' }}
                            >
                                {c.stack}
                            </p>
                        </div>
                    )
                })}
            </div>

            <p className="mono mt-10 text-xs" style={{ color: 'var(--ink-faint)' }}>
                Same person, read three ways — the overlap is the point.{' '}
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                    All repositories
                </a>
            </p>
        </section>
    )
}
