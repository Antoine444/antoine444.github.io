import { useEffect, useRef, useState } from 'react'
import { MonitorIcon, MoonIcon, SunIcon } from './Icons'

type Choice = 'light' | 'dark' | 'system'

const ORDER: Choice[] = ['system', 'light', 'dark']
const LABEL: Record<Choice, string> = {
    system: 'Match system theme',
    light: 'Light theme',
    dark: 'Dark theme',
}

/** Length of the crossfade in styles.css; kept in sync by hand, deliberately. */
const CROSSFADE_MS = 240

function read(): Choice {
    if (typeof document === 'undefined') return 'system'
    const attr = document.documentElement.getAttribute('data-theme')
    return attr === 'light' || attr === 'dark' ? attr : 'system'
}

function apply(choice: Choice) {
    const root = document.documentElement
    if (choice === 'system') {
        root.removeAttribute('data-theme')
        // Stored, not removed: the head script defaults to dark when nothing is
        // on record, so clearing the key would silently undo this choice on the
        // next page load.
        localStorage.setItem('theme', 'system')
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
    const timer = useRef<number | undefined>(undefined)

    useEffect(() => {
        setChoice(read())
        setMounted(true)
        return () => window.clearTimeout(timer.current)
    }, [])

    const next = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length]
    const Icon = choice === 'light' ? SunIcon : choice === 'dark' ? MoonIcon : MonitorIcon

    /**
     * Colour transitions are armed only for the length of the change, then
     * disarmed. Leaving them on would make every hover anywhere on the page
     * pay for a transition it never asked for.
     */
    function change() {
        const root = document.documentElement
        root.classList.add('theme-anim')
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(
            () => root.classList.remove('theme-anim'),
            CROSSFADE_MS
        )
        apply(next)
        setChoice(next)
    }

    return (
        <button
            type="button"
            onClick={change}
            title={LABEL[choice]}
            aria-label={`${LABEL[choice]}. Activate for: ${LABEL[next].toLowerCase()}`}
            className="icon-btn icon-btn-turn"
        >
            {/* Until mounted the icon would be a guess, so keep it neutral. */}
            <Icon width={17} height={17} style={{ opacity: mounted ? 1 : 0.6 }} />
        </button>
    )
}
