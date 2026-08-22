import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section className="shell py-24">
            <p className="eyebrow">404</p>
            <h1 className="mt-3 text-3xl">That page does not exist</h1>
            <p className="prose-measure mt-3 text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
                The link may be out of date, or the page may never have existed here.
            </p>
            <p className="mono mt-6 text-sm">
                <Link to="/">Back to the front page</Link>
            </p>
        </section>
    )
}
