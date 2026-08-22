import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section className="shell py-28">
            <p className="eyebrow">404</p>
            <h1 className="t-h1 mt-4">That page does not exist</h1>
            <div className="mt-6 h-px" style={{ background: 'var(--rule-strong)' }} />
            <p
                className="prose-measure mt-6 text-[0.9375rem] leading-relaxed"
                style={{ color: 'var(--ink-muted)' }}
            >
                The link may be out of date, or the page may never have existed here.
            </p>
            <p className="mono mt-7 text-sm">
                <Link to="/" className="tap-sm">Back to the front page</Link>
            </p>
        </section>
    )
}
