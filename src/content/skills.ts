export const skills = [
    { group: 'Languages', items: ['C++17', 'Python', 'Java', 'Scala', 'TypeScript'] },
    { group: 'Machine learning', items: ['PyTorch', 'Transformers', 'TRL/PEFT', 'FAISS', 'vLLM', 'scikit-learn', 'NumPy', 'Pandas'] },
    {
        group: 'Systems',
        items: ['Concurrency & multithreading', 'Distributed systems', 'POSIX sockets', 'CMake', 'Linux', 'Git', 'pytest'],
    },
    { group: 'Data', items: ['SQL / MySQL'] },
    {
        group: 'Quantitative',
        items: [
            'Probability & stochastic calculus',
            'Time series',
            'Derivatives pricing',
            'Backtesting',
            'Monte Carlo',
            'VaR / CVaR',
            'Market microstructure',
        ],
    },
    { group: 'Optimisation', items: ['Pyomo', 'Ipopt', 'DRO'] },
] as const
