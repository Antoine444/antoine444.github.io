/** Section heading inside a project write-up. */
export function H({ children }: { children: string }) {
    return (
        <h2
            className="t-h3 mt-12 mb-4 border-t pt-5"
            style={{ borderColor: 'var(--rule)' }}
        >
            {children}
        </h2>
    )
}
