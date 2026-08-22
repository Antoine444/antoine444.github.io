import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react'
import { links, profile } from '@/content/profile'
import { SOCIALS } from '@/components/socials'
import { SectionHead } from './SectionHead'

const SERVICE_ID = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'throttled'

const FIELD =
    'mono w-full rounded-sm border border-rule bg-surface px-3 py-2 text-sm ' +
    'placeholder:text-ink-faint focus-visible:border-accent'

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
        <section className="shell pt-16" aria-labelledby="contact">
            <SectionHead label="Contact" id="contact" />

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div>
                    <p className="prose-measure text-sm leading-relaxed">
                        Open to internships and graduate roles in systems, machine learning and
                        quantitative research. The form below reaches my inbox; if you would rather
                        not use it, the address is right there.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-5 grid gap-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                            <label className="grid gap-1.5">
                                <span className="eyebrow">First name</span>
                                <input name="firstName" required maxLength={80} autoComplete="given-name"
                                       className={FIELD} />
                            </label>
                            <label className="grid gap-1.5">
                                <span className="eyebrow">Last name</span>
                                <input name="lastName" required maxLength={80} autoComplete="family-name"
                                       className={FIELD} />
                            </label>
                        </div>
                        <label className="grid gap-1.5">
                            <span className="eyebrow">Your email</span>
                            <input type="email" name="email" required maxLength={160}
                                   autoComplete="email" className={FIELD} />
                        </label>
                        <label className="grid gap-1.5">
                            <span className="eyebrow">Subject</span>
                            <input name="subject" required maxLength={140} className={FIELD} />
                        </label>
                        <label className="grid gap-1.5">
                            <span className="eyebrow">Message</span>
                            <textarea name="message" required maxLength={4000} rows={6}
                                      className={`${FIELD} resize-y`} />
                        </label>

                        {/* Honeypot — hidden from sight and from assistive technology. */}
                        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
                            <label>
                                Website
                                <input name="website" tabIndex={-1} autoComplete="off" />
                            </label>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                type="submit"
                                disabled={status === 'sending' || !configured}
                                className="mono rounded-sm px-4 py-2 text-sm font-medium
                                           transition-opacity disabled:opacity-50"
                                style={{ background: 'var(--accent)', color: 'var(--paper)' }}
                            >
                                {status === 'sending' ? 'Sending…' : 'Send message'}
                            </button>
                            <a href={links.email} className="mono text-xs">
                                or email {profile.email} directly
                            </a>
                        </div>

                        {/* Every failure says what happened and what to do instead. */}
                        <p role="status" aria-live="polite" className="mono min-h-5 text-xs">
                            {!configured && (
                                <span style={{ color: 'var(--ink-adverse)' }}>
                                    The form is not configured in this build. Email{' '}
                                    <a href={links.email}>{profile.email}</a>.
                                </span>
                            )}
                            {status === 'sent' && (
                                <span style={{ color: 'var(--ink-positive)' }}>
                                    Message sent. I will reply to the address you gave.
                                </span>
                            )}
                            {status === 'throttled' && (
                                <span style={{ color: 'var(--ink-adverse)' }}>
                                    Too many sends in a short window. Wait a moment, or email{' '}
                                    <a href={links.email}>{profile.email}</a>.
                                </span>
                            )}
                            {status === 'error' && (
                                <span style={{ color: 'var(--ink-adverse)' }}>
                                    The message did not send{detail ? ` (${detail})` : ''}. Email{' '}
                                    <a href={links.email}>{profile.email}</a> instead.
                                </span>
                            )}
                        </p>
                    </form>
                </div>

                <aside className="card h-fit p-5">
                    <h3 className="eyebrow">Elsewhere</h3>
                    <ul className="mt-3 space-y-2.5">
                        {SOCIALS.map(({ href, label, Icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="mono flex items-center gap-2.5 text-sm no-underline hover:underline"
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
                    <p className="mono mt-4 border-t border-rule pt-3 text-xs"
                       style={{ color: 'var(--ink-muted)' }}>
                        {profile.location}
                        <br />
                        {profile.citizenship}
                    </p>
                </aside>
            </div>

            {/* Preserves the previous site's #about anchor. */}
            <div id="about" className="mt-16 border-t border-rule pt-6">
                <h2 className="eyebrow">Beyond work</h2>
                <p className="prose-measure mt-2 text-sm leading-relaxed">{profile.interests}</p>
            </div>
        </section>
    )
}
