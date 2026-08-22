import { useEffect } from 'react'

/**
 * Scroll-triggered reveals, without a library and without a wrapper element.
 *
 * Mark anything with `className="reveal"` and optionally `style={{'--r': n}}`
 * to stagger it within its group. One observer handles the whole page.
 *
 * The important detail is what this does NOT do: no stylesheet ever hides a
 * `.reveal`. This effect arms only the elements that are below the fold at the
 * moment it runs, so content already on screen is never touched, and if the JS
 * bundle fails to load nothing is hidden at all — which is the only honest
 * option on a site that ships every route as real prerendered HTML.
 *
 * Under `prefers-reduced-motion: reduce` nothing is armed, so the page is
 * simply static. That is a true collapse to zero, not a slower animation.
 */
export function useReveals(key: string) {
    useEffect(() => {
        const els = Array.from(
            document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)')
        )
        if (!els.length) return

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue
                    entry.target.classList.add('is-in')
                    observer.unobserve(entry.target)
                }
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
        )

        const armed: HTMLElement[] = []
        for (const el of els) {
            // Already visible: leave it alone entirely.
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('is-in')
                continue
            }
            el.classList.add('reveal-armed')
            armed.push(el)
            observer.observe(el)
        }

        return () => {
            observer.disconnect()
            // Route change mid-transition must not strand an element at zero.
            for (const el of armed) el.classList.add('is-in')
        }
    }, [key])
}
