import { useEffect, useRef, useState } from 'react'

const TYPE_MS = 55
const DELETE_MS = 28
const HOLD_MS = 1900
const REARM_MS = 320

type Phase = 'typing' | 'holding' | 'deleting'

/**
 * Types one phrase, holds it, deletes it, moves to the next, forever.
 *
 * The previous version of this site did the same thing with react-type-animation.
 * This is the same effect in about forty lines and no dependency.
 *
 * Three things it is careful about:
 *
 * - It renders the *complete* first phrase on the server and on the first client
 *   render, so the prerendered HTML carries real text and hydration matches.
 * - The animated text is aria-hidden and the full list is exposed to assistive
 *   technology as static text, because a node that rewrites itself every 50ms
 *   is announced as a stream of interruptions.
 * - It stops entirely under prefers-reduced-motion, and pauses when the tab is
 *   hidden rather than burning timers in the background.
 */
export function Rotator({
    items,
    className,
}: {
    items: readonly string[]
    className?: string
}) {
    const [index, setIndex] = useState(0)
    const [len, setLen] = useState(items[0]?.length ?? 0)
    const [phase, setPhase] = useState<Phase>('holding')
    const [animate, setAnimate] = useState(false)
    const timer = useRef<number | undefined>(undefined)

    // Only animate once we know the reader has not asked us not to.
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        const sync = () => setAnimate(!mq.matches)
        sync()
        mq.addEventListener('change', sync)
        return () => mq.removeEventListener('change', sync)
    }, [])

    useEffect(() => {
        if (!animate || items.length < 2) return

        let cancelled = false
        const step = () => {
            if (cancelled) return
            if (document.hidden) {
                timer.current = window.setTimeout(step, 400)
                return
            }
            const word = items[index] ?? ''
            if (phase === 'typing') {
                if (len < word.length) {
                    setLen(len + 1)
                    timer.current = window.setTimeout(step, TYPE_MS)
                } else {
                    setPhase('holding')
                }
                return
            }
            if (phase === 'holding') {
                timer.current = window.setTimeout(() => !cancelled && setPhase('deleting'), HOLD_MS)
                return
            }
            if (len > 0) {
                setLen(len - 1)
                timer.current = window.setTimeout(step, DELETE_MS)
            } else {
                setIndex((i) => (i + 1) % items.length)
                setPhase('typing')
                timer.current = window.setTimeout(step, REARM_MS)
            }
        }
        timer.current = window.setTimeout(step, phase === 'holding' ? 0 : TYPE_MS)
        return () => {
            cancelled = true
            window.clearTimeout(timer.current)
        }
    }, [animate, index, len, phase, items])

    // Reduced motion, or a single item: just say all of it, once.
    if (animate && items.length > 1) {
        // The longest phrase is rendered invisibly to hold the box open. Without
        // it the element grows a character at a time and shoves whatever sits
        // beside it sideways on every keystroke.
        const longest = items.reduce((a, b) => (b.length > a.length ? b : a), '')
        return (
            <span className={`rotator ${className ?? ''}`}>
                <span className="sr-only">{items.join(' · ')}</span>
                <span className="rotator-sizer" aria-hidden="true">
                    {longest}
                </span>
                {/* The caret is positioned by transform, not by layout. A box
                    that moves 9px on every keystroke is reported as a layout
                    shift on every keystroke; a transform is not. --n is the
                    character count, and the line is monospace, so 1ch plus the
                    tracking is exactly one advance. */}
                <span className="rotator-live" aria-hidden="true">
                    {(items[index] ?? '').slice(0, len)}
                    <span
                        className="rotator-caret"
                        style={{ '--n': len } as React.CSSProperties}
                    />
                </span>
            </span>
        )
    }
    return <span className={`rotator ${className ?? ''}`}>{items.join(' · ')}</span>
}
