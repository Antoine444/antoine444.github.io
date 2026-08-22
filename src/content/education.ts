export interface Degree {
    degree: string
    field: string
    school: string
    location: string
    period: string
    gpa?: string
    status?: string
}

export const education: Degree[] = [
    {
        degree: 'MSc',
        field: 'Computer Science, Minor in Financial Engineering',
        school: 'EPFL',
        location: 'Lausanne, Switzerland',
        period: '2024 – November 2027',
        gpa: '5.0 / 6.0',
        status: 'In progress',
    },
    {
        degree: 'BSc',
        field: 'Computer Science',
        school: 'EPFL',
        location: 'Lausanne, Switzerland',
        period: '2020 – 2024',
        gpa: '4.5 / 6.0',
    },
]

/** Coursework grouped the way the profile reads, not the way the registrar lists it. */
export const coursework = [
    { group: 'Machine learning & AI', items: ['Machine Learning', 'Artificial Intelligence', 'Modern NLP', 'Applied Data Analysis'] },
    { group: 'Systems', items: ['Distributed Algorithms', 'Concurrent Computing'] },
    {
        group: 'Quantitative finance',
        items: ['Probability & Stochastic Calculus', 'Derivatives', 'Investments', 'Quantitative Risk Management'],
    },
] as const
