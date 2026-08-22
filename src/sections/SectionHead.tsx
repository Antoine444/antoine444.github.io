export function SectionHead({ label, id }: { label: string; id?: string }) {
    return (
        <h2 id={id} className="section-head">
            <span>{label}</span>
        </h2>
    )
}
