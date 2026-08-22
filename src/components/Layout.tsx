import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { SOCIALS } from './socials'
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
            { rootMargin: '-72px 0px -55% 0px', threshold: 0 }
        )
        sections.forEach((s) => observer.observe(s))
        return () => observer.disconnect()
    }, [onHome])

    return (
        <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-sm">
            <div className="shell flex h-14 items-center justify-between gap-4">
                <Link
                    to="/"
                    className="mono text-sm font-semibold tracking-tight no-underline"
                    style={{ color: 'var(--ink)' }}
                >
                    Antoine&nbsp;Garin
                </Link>

                <nav aria-label="Sections" className="scroll-x -mx-1 hidden sm:block">
                    <ul className="flex items-center gap-1 px-1">
                        {NAV.map((n) => (
                            <li key={n.href}>
                                <a
                                    href={onHome ? n.href : `/${n.href}`}
                                    aria-current={active === n.href ? 'true' : undefined}
                                    className="mono rounded-sm px-2.5 py-1.5 text-xs no-underline transition-colors"
                                    style={{
                                        color: active === n.href ? 'var(--accent)' : 'var(--ink-muted)',
                                        background: active === n.href ? 'var(--accent-wash)' : 'transparent',
                                    }}
                                >
                                    {n.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <ThemeToggle />
            </div>
        </header>
    )
}

function Footer() {
    return (
        <footer className="mt-20 border-t border-rule py-10">
            <div className="shell flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-md">
                    <p className="text-sm text-ink-muted">{profile.interests}</p>
                    <p className="mono mt-3 text-xs text-ink-faint">
                        © {new Date().getFullYear()} Antoine Garin ·{' '}
                        <a href={links.source} className="no-underline hover:underline">
                            source on GitHub
                        </a>
                    </p>
                </div>
                <ul className="flex flex-wrap items-center gap-1">
                    {SOCIALS.map(({ href, label, Icon }) => (
                        <li key={label}>
                            <a
                                href={href}
                                aria-label={label}
                                title={label}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-sm
                                           text-ink-muted transition-colors hover:bg-surface-sunk hover:text-ink"
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
