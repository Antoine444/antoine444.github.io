export const profile = {
    name: 'Antoine Garin',
    // The one-line thesis: three fields, one profile.
    positioning:
        'I build correct concurrent and distributed systems, train and evaluate models rigorously, and apply both to financial problems.',
    location: 'Lausanne, Switzerland',
    citizenship: 'French citizen with EU work authorisation',
    email: 'antoine.garin@epfl.ch',
    status: [
        { label: 'MSc Computer Science, EPFL', value: 'graduating November 2027' },
        { label: 'AI Intern, DAPM', value: 'through January 2027' },
        { label: 'Lausanne, Switzerland', value: 'French citizen, EU work authorisation' },
    ],
    interests: 'Competitive table tennis at French national level, tennis, astronomy.',
} as const

export const links = {
    github: 'https://github.com/Antoine444',
    linkedin: 'https://www.linkedin.com/in/antoine-garin-775560320/',
    huggingface: 'https://huggingface.co/antoine-444',
    email: 'mailto:antoine.garin@epfl.ch',
    source: 'https://github.com/Antoine444/antoine444.github.io',
} as const

/** The through-line: the same person, read three ways. */
export const throughLine = [
    {
        field: 'Systems',
        blurb:
            'Concurrency and distribution from the bottom up — lock protocols, delivery guarantees, and the shutdown paths that make them safe to run.',
        anchors: [
            { text: 'TL2 software transactional memory', slug: 'tl2-stm' },
            { text: 'Uniform reliable broadcast over raw UDP', slug: 'distributed-building-blocks' },
        ],
        stack: 'C++17 · POSIX sockets · atomics · CMake',
    },
    {
        field: 'Machine learning',
        blurb:
            'Post-training and evaluation with the measurement taken seriously — held-out selection, seed variance, and reporting the regimes where a method fails.',
        anchors: [
            { text: 'Qwen3 SFT → DPO, 17 models published', slug: 'qwen-stem-tutor' },
            { text: 'Limit order book forecasting', slug: 'bitcoin-lob-forecasting' },
        ],
        stack: 'PyTorch · Transformers · TRL/PEFT · FAISS · vLLM',
    },
    {
        field: 'Quantitative finance',
        blurb:
            'Derivatives, risk measures and portfolio construction, treated as optimisation problems with stated assumptions and honest cost accounting.',
        anchors: [
            { text: 'Wasserstein-DRO deep hedging', slug: 'deep-hedging-dro' },
            { text: 'Global tactical fund simulator', slug: 'global-tactical-fund' },
        ],
        stack: 'Pyomo · Ipopt · CVaR/VaR · Monte Carlo',
    },
] as const
