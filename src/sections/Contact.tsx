import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react'
import { profile } from '@/content/profile'
import { SOCIALS } from '@/components/socials'
import { SectionHead } from './SectionHead'

const SERVICE_ID = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'throttled'

export function Contact() {
    const formRef = useRef<HTMLFormElement>(null)
    const [status, setStatus] = useState<Status>('idle')
    const [detail, setDetail] = useState('')

    const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = formRef.current
        if (!form) return

        // Honeypot: a real person never fills a field they cannot see.
        if ((form.elements.namedItem('website') as HTMLInputElement | null)?.value) {
            setStatus('sent')
            form.reset()
            return
        }

        setStatus('sending')
        setDetail('')
        try {
            await emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, form, {
                publicKey: PUBLIC_KEY!,
                // Client-side friction only — a direct POST to the API bypasses both.
                // The controls that actually hold are the domain allowlist and the
                // CAPTCHA configured server-side on the EmailJS template.
                blockHeadless: true,
                limitRate: { throttle: 15000 },
            })
            setStatus('sent')
            form.reset()
        } catch (err: unknown) {
            const e = err as { status?: number; text?: string }
            if (e?.status === 429) {
                setStatus('throttled')
            } else {
                setStatus('error')
                setDetail(e?.text ? `${e.text}` : '')
            }
        }
    }

    return (
        <section className="shell section" aria-labelledby="contact">
            <SectionHead label="Contact" id="contact" />

            <div className="reveal grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
                <div>
                    <p className="prose-measure text-[0.9375rem] leading-relaxed">
                        Open to internships and graduate roles in systems, machine learning and
                        quantitative research. The form below reaches my inbox. The links under
                        Elsewhere work just as well.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-6 grid gap-3.5">
                        <div className="grid gap-3.5 sm:grid-cols-2">
                            <label className="grid gap-1.5">
                                <span className="eyebrow">First name</span>
                                <input
                                    name="firstName"
                                    required
                                    maxLength={80}
                                    autoComplete="given-name"
                                    className="field"
                                />
                            </label>
                            <label className="grid gap-1.5">
                                <span className="eyebrow">Last name</span>
                                <input
                                    name="lastName"
                                    required
                                    maxLength={80}
                                    autoComplete="family-name"
                                    className="field"
                                />
                            </label>
                        </div>
                        <label className="grid gap-1.5">
                            <span className="eyebrow">Your email</span>
                            <input
                                type="email"
                                name="email"
                                required
                                maxLength={160}
                                autoComplete="email"
                                className="field"
                            />
                        </label>
                        <label className="grid gap-1.5">
                            <span className="eyebrow">Subject</span>
                            <input name="subject" required maxLength={140} className="field" />
                        </label>
                        <label className="grid gap-1.5">
                            <span className="eyebrow">Message</span>
                            <textarea
                                name="message"
                                required
                                maxLength={4000}
                                rows={6}
                                className="field resize-y"
                            />
                        </label>

                        {/* Honeypot — hidden from sight and from assistive technology. */}
                        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
                            <label>
                                Website
                                <input name="website" tabIndex={-1} autoComplete="off" />
                            </label>
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
                            <button
                                type="submit"
                                disabled={status === 'sending' || !configured}
                                className="btn"
                            >
                                {status === 'sending' ? 'Sending…' : 'Send message'}
                            </button>
                        </div>

                        {/* Every failure says what happened and what to do instead.
                            Keyed so a new outcome re-runs the settle rather than
                            swapping text in place. */}
                        <p role="status" aria-live="polite" className="mono min-h-5 text-xs">
                            {!configured && (
                                <span style={{ color: 'var(--ink-adverse)' }}>
                                    The form is not configured in this build. Use the links under
                                    Elsewhere to reach me.
                                </span>
                            )}
                            {configured && status === 'sent' && (
                                <span key="sent" className="enter inline-block"
                                      style={{ color: 'var(--ink-positive)' }}>
                                    Message sent. I will reply to the address you gave.
                                </span>
                            )}
                            {configured && status === 'throttled' && (
                                <span key="throttled" className="enter inline-block"
                                      style={{ color: 'var(--ink-adverse)' }}>
                                    Too many sends in a short window. Wait a moment and try again.
                                </span>
                            )}
                            {configured && status === 'error' && (
                                <span key="error" className="enter inline-block"
                                      style={{ color: 'var(--ink-adverse)' }}>
                                    The message did not send{detail ? ` (${detail})` : ''}. Try
                                    again, or use the links under Elsewhere.
                                </span>
                            )}
                        </p>
                    </form>
                </div>

                <aside className="card h-fit p-6">
                    <h3 className="mono text-sm font-semibold" style={{ color: 'var(--ink)' }}>Elsewhere</h3>
                    <ul className="mt-4 space-y-3">
                        {SOCIALS.map(({ href, label, Icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="mono tap-sm flex items-center gap-2.5 text-sm no-underline hover:underline"
                                    {...(href.startsWith('http')
                                        ? { target: '_blank', rel: 'noopener noreferrer' }
                                        : {})}
                                >
                                    <Icon width={16} height={16} />
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p
                        className="mono mt-5 border-t pt-4 text-xs leading-relaxed"
                        style={{ borderColor: 'var(--rule)', color: 'var(--ink-muted)' }}
                    >
                        {profile.location}
                        <br />
                        {profile.citizenship}
                    </p>
                </aside>
            </div>

            {/* Preserves the previous site's #about anchor. */}
            <div
                id="about"
                className="mt-16 border-t pt-6"
                style={{ borderColor: 'var(--rule)' }}
            >
                <h2 className="sub-head">
                    <span>Beyond work</span>
                </h2>
                <p className="prose-measure mt-2.5 text-sm leading-relaxed">{profile.interests}</p>
            </div>
        </section>
    )
}
