export interface Role {
    org: string
    url?: string
    title: string
    period: string
    current?: boolean
    location: string
    points: string[]
}

export const experience: Role[] = [
    {
        org: 'DAPM · Dynamic Assets & Performance Monitoring SA',
        url: 'https://dapm.com/',
        title: 'AI Intern',
        period: 'July 2026 – January 2027',
        current: true,
        location: 'Switzerland',
        points: [
            'Automated the monthly market overview report — a full day of manual work per cycle — with a Python pipeline pulling newsletters and LinkedIn posts (Apify) plus pricing data (company API) into a local LLM report generator running on vLLM.',
            'Redesigned the report into PDF and HTML, replacing a PDF-only version; now emailed monthly to clients and used by the Financial Engineering and Operations & Client Management teams.',
            'Structured the retrieved content into a queryable MySQL database with instrument-level entity labelling automated by a local LLM.',
        ],
    },
    {
        org: 'EPFL',
        title: 'Student Assistant, Technology and Equality',
        period: 'September – December 2025',
        location: 'Lausanne, Switzerland',
        points: ['Mentored student groups on structuring and delivering oral presentations.'],
    },
]
