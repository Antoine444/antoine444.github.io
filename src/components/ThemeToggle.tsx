import { useEffect, useState } from 'react'
import { MonitorIcon, MoonIcon, SunIcon } from './Icons'

type Choice = 'light' | 'dark' | 'system'

const ORDER: Choice[] = ['system', 'light', 'dark']
const LABEL: Record<Choice, string> = {
    system: 'Match system theme',
    light: 'Light theme',
    dark: 'Dark theme',
}

function read(): Choice {
    if (typeof document === 'undefined') return 'system'
    const attr = document.documentElement.getAttribute('data-theme')
    return attr === 'light' || attr === 'dark' ? attr : 'system'
}

function apply(choice: Choice) {
    const root = document.documentElement
    if (choice === 'system') {
        root.removeAttribute('data-theme')
        localStorage.removeItem('theme')
    } else {
        root.setAttribute('data-theme', choice)
        localStorage.setItem('theme', choice)
    }
}

export function ThemeToggle() {
    // Start at 'system' so the server-rendered markup matches the first client
    // render; the inline head script has already painted the right colours.
    const [choice, setChoice] = useState<Choice>('system')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setChoice(read())
        setMounted(true)
    }, [])

    const next = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length]
    const Icon = choice === 'light' ? SunIcon : choice === 'dark' ? MoonIcon : MonitorIcon

    return (
        <button
            type="button"
            onClick={() => {
                apply(next)
                setChoice(next)
            }}
            title={LABEL[choice]}
            aria-label={`${LABEL[choice]}. Activate for: ${LABEL[next].toLowerCase()}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border
                       border-rule text-ink-muted transition-colors hover:bg-surface-sunk
                       hover:text-ink"
        >
            {/* Until mounted the icon would be a guess, so keep it neutral. */}
            <Icon width={17} height={17} style={{ opacity: mounted ? 1 : 0.6 }} />
        </button>
    )
}
