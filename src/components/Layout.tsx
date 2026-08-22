import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { SOCIALS } from './socials'
import { useReveals } from './useReveals'
import { links, profile } from '@/content/profile'

/** Ids kept from the previous site so any shared link still lands correctly. */
const NAV = [
    { href: '#projects', label: 'Work' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
]

function Header() {
    const { pathname } = useLocation()
    const onHome = pathname === '/'
    const [active, setActive] = useState<string>('')

    useEffect(() => {
        if (!onHome) return
        const sections = NAV.map((n) => document.getElementById(n.href.slice(1))).filter(
            (el): el is HTMLElement => Boolean(el)
        )
        if (!sections.length) return
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
                if (visible) setActive(`#${visible.target.id}`)
            },
            { rootMargin: '-80px 0px -55% 0px', threshold: 0 }
        )
        sections.forEach((s) => observer.observe(s))
        return () => observer.disconnect()
    }, [onHome])

    return (
        <header
            className="sticky top-0 z-50 border-b bg-paper/92 backdrop-blur-xl"
            style={{ borderColor: 'var(--rule)', boxShadow: 'var(--shadow-header)' }}
        >
            <div className="shell flex h-16 items-center gap-3 sm:gap-4">
                <Link
                    to="/"
                    className="mono tap shrink-0 text-sm font-semibold tracking-tight no-underline"
                    style={{ color: 'var(--ink)' }}
                >
                    Antoine&nbsp;Garin
                </Link>

                {/* Scrolls sideways rather than disappearing: a phone reader
                    still gets to the sections, and the header stays one row. */}
                <nav aria-label="Sections" className="scroll-x nav-scroll -mx-1 min-w-0 flex-1">
                    <ul className="mono flex w-max items-center gap-0.5 px-1 text-xs">
                        {NAV.map((n) => (
                            <li key={n.href}>
                                <a
                                    href={onHome ? n.href : `/${n.href}`}
                                    aria-current={active === n.href ? 'true' : undefined}
                                    className="nav-link"
                                >
                                    {n.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="shrink-0">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}

function Footer() {
    return (
        <footer className="mt-24 border-t pt-10 pb-14" style={{ borderColor: 'var(--rule)' }}>
            <div className="shell grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                {/* A colophon, not a second hero: the page has already said what
                    it has to say by the time a reader gets here. */}
                <div className="max-w-md">
                    <p className="mono text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                        {profile.name}
                    </p>
                    <p className="mono mt-2 text-xs" style={{ color: 'var(--ink-faint)' }}>
                        {profile.location}
                    </p>
                    <p className="mono mt-4 text-xs" style={{ color: 'var(--ink-faint)' }}>
                        © {new Date().getFullYear()} Antoine Garin ·{' '}
                        <a href={links.source} className="no-underline hover:underline">
                            source on GitHub
                        </a>
                    </p>
                </div>
                <ul className="flex flex-wrap items-center gap-1.5">
                    {SOCIALS.map(({ href, label, Icon }) => (
                        <li key={label}>
                            <a
                                href={href}
                                aria-label={label}
                                title={label}
                                className="icon-btn icon-btn-plain"
                                {...(href.startsWith('http')
                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                    : {})}
                            >
                                <Icon width={18} height={18} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}

export function Layout({ children }: { children: ReactNode }) {
    const { pathname } = useLocation()
    useReveals(pathname)

    return (
        <>
            <a href="#main" className="skip mono text-sm">
                Skip to content
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
        </>
    )
}
