import type { EarlierProject, Project } from './types'
import { ConditionalityMatrix } from '@/components/diagrams/ConditionalityMatrix'
import { StackingResult } from '@/components/diagrams/StackingResult'
import { LayerStack } from '@/components/diagrams/LayerStack'
import { LockWord } from '@/components/diagrams/LockWord'
import { ReadProtocol } from '@/components/diagrams/ReadProtocol'
import { QwenPipeline } from '@/components/diagrams/QwenPipeline'
import { H } from '@/components/Prose'

export const projects: Project[] = [
    /* ------------------------------------------------------------------ */
    {
        slug: 'deep-hedging-dro',
        title: 'Wasserstein-DRO temporal weighting for deep hedging',
        venue: "Master's research project · Risk Analytics and Optimization Lab, EPFL",
        period: 'February – July 2026',
        year: '2026',
        repo: 'https://github.com/Antoine444/master_project',
        repoLabel: 'Antoine444/master_project',
        oneLine:
            'Down-weighting stale market history makes a deep hedger more robust — but only where the drift actually matters for hedging and each block carries enough paths. Below that, it hurts.',
        tags: ['PyTorch', 'Pyomo', 'Ipopt', 'DRO', 'CVaR', 'Heston'],
        claims: [
            {
                figure: '−35 to −50%',
                metric: 'test CVaR₉₅, with the Sharpe ratio up',
                condition: 'drift is hedging-relevant (volatility, joint, or large price) and ≥ 5k paths per block',
                tone: 'positive',
            },
            {
                figure: 'worse',
                metric: 'than uniform weighting, across every drift type',
                condition: 'only 1k paths per block',
                tone: 'adverse',
            },
            {
                figure: 'flat',
                metric: 'mean PnL — flat to marginally worse in every regime',
                condition: 'the improvement is in dispersion and tail risk, never in return',
                tone: 'neutral',
            },
        ],
        body: () => (
            <>
                <H>The problem</H>
                <p>
                    Deep hedging learns a trading strategy directly from simulated market paths,
                    which is what lets it work in incomplete markets with stochastic volatility and
                    transaction costs. Its weakness is distributional: the learned policy is only
                    as good as the distribution it trained on, so it degrades when market regimes
                    drift away from that distribution.
                </p>
                <p>
                    I studied two Wasserstein-based robustness mechanisms against that failure.
                    The first is <strong>distributional adversarial training</strong> — PGD
                    perturbation of paths within a Wasserstein ball. The second is{' '}
                    <strong>non-uniform temporal weighting</strong>, which down-weights stale
                    historical blocks according to a trade-off between how far a block has drifted
                    and how much effective sample size discarding it would cost.
                </p>

                <H>What I built</H>
                <ul>
                    <li>
                        The optimal block weights are the solution to a <strong>non-convex
                        nonlinear program</strong>, solved in Pyomo with the Ipopt backend using
                        exact analytic gradients and Hessians supplied through the AMPL interface.
                    </li>
                    <li>
                        The whole research stack is PyTorch: Heston path simulators with controlled
                        parameter drift, four hedger architectures, the adversarial training loop,
                        and evaluation and reporting — a <strong>7,693-line package</strong> driven
                        entirely by CLI flags.
                    </li>
                    <li>
                        <strong>83 pytest cases</strong>, including a{' '}
                        <strong>no-look-ahead causality guard</strong> that perturbs inputs after
                        time <code>t</code> and asserts every output up to <code>t</code> is
                        bit-for-bit unchanged. A hedger that can see the future is the easiest way
                        to accidentally report a good number.
                    </li>
                    <li>
                        Architecture came first: MLP, LSTM and Transformer hedgers benchmarked on a{' '}
                        <strong>stationary</strong> Heston market. A simple shared MLP matched the
                        reference per-date network and the more expressive models did not beat it,
                        so every robustness experiment then used that reference MLP. Spending the
                        comparison budget up front meant the robustness results were not
                        confounded by architecture.
                    </li>
                </ul>

                <H>Results — the answer is conditional</H>
                <p>
                    This is the part that matters. Non-uniform weighting is not a general
                    improvement. It helps in a specific quadrant, does nothing in another, and is
                    actively harmful in a third.
                </p>
                <ConditionalityMatrix />
                <p>
                    Where the drift is hedging-relevant — volatility drift, joint drift, or a large
                    price drift — and per-block sample size is adequate at 5k paths or more,
                    non-uniform weighting cut test CVaR₉₅ by roughly 35–50% and raised the Sharpe
                    ratio. At 1k paths per block it{' '}
                    <strong>worsens performance across all drift types</strong>, and it is neutral
                    for small price drift. In every regime, mean PnL is flat to marginally worse:
                    the improvement is in dispersion and tail risk, not in return.
                </p>
                <p>
                    Stacking weighting on top of adversarial training, on the volatility-drift
                    slice, compounds the effect.
                </p>
                <StackingResult />
                <p>
                    Everything above is validated over 10 seeds with 95% confidence intervals, and
                    hyperparameters were selected on validation data, so no test data informed the
                    choice.
                </p>
            </>
        ),
    },

    /* ------------------------------------------------------------------ */
    {
        slug: 'distributed-building-blocks',
        title: 'Distributed system building blocks',
        venue: 'Distributed Algorithms (CS-451), EPFL',
        period: 'September 2025 – January 2026',
        year: '2025',
        repo: 'https://github.com/Antoine444/CS451-project',
        repoLabel: 'Antoine444/CS451-project',
        oneLine:
            'Fair-loss links up to lattice agreement in C++17 over raw UDP — each layer consuming the guarantee below it and providing a stronger one.',
        tags: ['C++17', 'UDP', 'Concurrency', 'Consensus'],
        claims: [
            {
                figure: 'f = (n−1)/2',
                metric: 'crash faults tolerated by uniform reliable broadcast',
                condition: 'delivery requires acknowledgement by more than n/2 processes',
                tone: 'neutral',
            },
            {
                figure: '128',
                metric: 'processes, 100k in-flight messages per link',
                condition: 'messages batched 8 per datagram',
                tone: 'neutral',
            },
            {
                figure: '50',
                metric: 'lattice agreement slots running in parallel',
                condition: 'so one slow slot does not stall the pipeline',
                tone: 'neutral',
            },
        ],
        body: () => (
            <>
                <H>The stack</H>
                <p>
                    A layered implementation of the abstractions a decentralised system is built
                    from, written from scratch in C++17 on top of a raw UDP socket. Each layer is a
                    self-contained module that takes the guarantee beneath it and hands a stronger
                    one upward, so the whole stack is a chain of increasingly strong delivery
                    promises resting on an unreliable datagram.
                </p>
                <LayerStack />

                <H>Perfect links</H>
                <p>
                    Turning "may drop, may duplicate, may reorder" into exactly-once delivery takes
                    retransmission until acknowledged plus per-sender delivery deduplication. Three
                    things then make it fast rather than merely correct:
                </p>
                <ul>
                    <li>
                        <strong>8 messages batched per datagram</strong>, so an acknowledgement
                        storm does not become a packet storm.
                    </li>
                    <li>
                        <strong>Timestamped selective retransmission</strong> — each pending message
                        carries its last-sent timestamp and the resend loop skips anything sent
                        within the last 2 ticks. Without it, every sweep re-sends the entire
                        in-flight window and the link collapses under its own traffic.
                    </li>
                    <li>
                        <strong>Socket I/O issued outside the mutex.</strong> The resend loop builds
                        its batches under the lock, releases it, and only then touches the socket.
                        Holding a lock across a syscall serialises every sender thread behind the
                        slowest send.
                    </li>
                </ul>

                <H>Broadcast and agreement</H>
                <ul>
                    <li>
                        <strong>Uniform reliable broadcast</strong> delivers on majority
                        acknowledgement, tolerating <code>f = (n−1)/2</code> crash faults. Each
                        process relays a message exactly once, tracked in a seen set, on a
                        dedicated thread fed by a condition-variable queue and batched 32 messages
                        at a time — which keeps the delivery path off the network path.
                    </li>
                    <li>
                        <strong>FIFO broadcast</strong> adds per-sender ordering with sequence
                        counters, an out-of-order buffer and a drain loop that releases successors
                        once the gap is filled.
                    </li>
                    <li>
                        <strong>Lattice agreement</strong> runs up to 50 slots in parallel.
                    </li>
                </ul>

                <H>Running it without deadlocking</H>
                <p>
                    Shutdown is two-phase: <code>interrupt()</code> unblocks any thread parked in a
                    socket call or a condition wait, and only then does <code>stop()</code> join.
                    Without the split, a clean shutdown deadlocks against a thread sitting in{' '}
                    <code>recvfrom</code>. Capacity is up to 128 processes with 100k in-flight
                    messages per link.
                </p>
                <p>
                    Validation used scripted network emulation injecting packet loss and delay,
                    plus a stress harness that crashes processes mid-run.
                </p>
            </>
        ),
    },

    /* ------------------------------------------------------------------ */
    {
        slug: 'tl2-stm',
        title: 'Software transactional memory — TL2',
        venue: 'Concurrent Computing (CS-453), EPFL',
        period: 'September – December 2025',
        year: '2025',
        repo: 'https://github.com/Antoine444/CS453-project',
        repoLabel: 'Antoine444/CS453-project',
        oneLine:
            'Transactional Locking II from scratch in 612 lines of C++17: one atomic per lock, a sampling sandwich for reads, and sorted acquisition as the deadlock-freedom argument.',
        tags: ['C++17', 'Atomics', 'Lock protocols', 'Shared object'],
        claims: [
            {
                figure: '2¹⁶',
                metric: 'versioned locks in a striped table',
                condition: 'memory is independent of region size; collisions cost false aborts, not correctness',
                tone: 'neutral',
            },
            {
                figure: '1 atomic',
                metric: 'load reads both the lock bit and the version',
                condition: 'version in the high bits, lock bit in the LSB of one uint64_t',
                tone: 'neutral',
            },
            {
                figure: '0 rollback',
                metric: 'work on abort — writes are deferred to commit',
                condition: 'speculative allocations are freed on abort, frees deferred to commit',
                tone: 'neutral',
            },
        ],
        body: () => (
            <>
                <H>The problem</H>
                <p>
                    A transactional memory lets several threads operate on shared memory as if each
                    thread's block of reads and writes happened atomically and in isolation — no
                    explicit locks in user code, no deadlocks to reason about. The library has to
                    provide that illusion while still allowing real parallelism, which means
                    detecting at commit time whether a transaction observed a state that never
                    actually existed, and aborting it if so.
                </p>
                <p>Two failure modes drive the entire design:</p>
                <ul>
                    <li>
                        <strong>Torn reads</strong> — a transaction reads word A, another thread
                        commits writes to A and B, then the first transaction reads B. Neither read
                        is individually wrong, but together they never existed as one memory state.
                    </li>
                    <li>
                        <strong>Deadlock</strong> — two transactions each holding a lock the other
                        needs at commit time.
                    </li>
                </ul>
                <p>
                    This is a from-scratch implementation in C++17, 612 lines, built as a shared
                    object that the grading harness loads at runtime.
                </p>

                <H>The versioned lock</H>
                <p>
                    Every word of shared memory maps into a striped table of 2¹⁶ versioned locks.
                    A versioned lock is a single <code>std::atomic&lt;uint64_t&gt;</code>, and the
                    packing is what makes the read protocol possible at all.
                </p>
                <LockWord />

                <H>Reading</H>
                <p>
                    A read cannot simply check the lock and then read the word — the two would
                    race. Instead it sandwiches the read between two samples of the same atomic.
                </p>
                <ReadProtocol />
                <p>
                    The acquire fence in the middle is load-bearing rather than decorative: without
                    it the compiler or the CPU may hoist the data read outside the two lock
                    samples, and the validation silently stops proving anything.
                </p>

                <H>Committing</H>
                <p>
                    Writes are purely local until commit — <code>tm_write</code> copies into the
                    transaction's write-set and shared memory is untouched. Commit then:
                </p>
                <ul>
                    <li>
                        <strong>Sorts the write-set locks by address and deduplicates them before
                        acquiring any.</strong> That ordering is the deadlock-freedom argument:
                        every transaction acquires in the same global order, so a cycle cannot
                        form.
                    </li>
                    <li>
                        Bumps the global version clock by 2 with <code>fetch_add</code>, keeping
                        the LSB clear so clock values stay directly comparable with lock versions.
                    </li>
                    <li>Revalidates the read-set, writes back, and releases each lock with a single
                        release-store that publishes the new version.</li>
                </ul>
                <p>
                    Because writes are deferred, an aborting transaction has nothing to roll back.
                    Speculative allocations are freed on abort and frees are deferred to commit.
                </p>
            </>
        ),
    },

    /* ------------------------------------------------------------------ */
    {
        slug: 'qwen-stem-tutor',
        title: 'QWEN STEM Tutor — LLM post-training pipeline',
        venue: 'Modern NLP (CS-552), EPFL',
        period: 'February – June 2025',
        year: '2025',
        repo: 'https://github.com/Antoine444/QWEN-STEM-Tutor',
        repoLabel: 'Antoine444/QWEN-STEM-Tutor',
        extraLinks: [{ label: '17 models on Hugging Face', href: 'https://huggingface.co/antoine-444' }],
        oneLine:
            'SFT then DPO on Qwen3-0.6B-Base, with a FAISS retrieval layer and QLoRA quantisation — 17 models published publicly.',
        tags: ['Transformers', 'TRL/PEFT', 'DPO', 'RAG', 'FAISS', 'QLoRA'],
        claims: [
            {
                figure: '64.5% → 81.97%',
                metric: 'STEM multiple-choice accuracy',
                condition: 'Qwen3-0.6B-Base taken through SFT then DPO',
                tone: 'positive',
            },
            {
                figure: '0.84',
                metric: 'retrieval F1 over a 49K-passage corpus',
                condition: 'FAISS-indexed RAG layer',
                tone: 'positive',
            },
            {
                figure: '−75%',
                metric: 'memory, retaining 96.2% of full-precision performance',
                condition: 'QLoRA quantisation',
                tone: 'positive',
            },
        ],
        body: () => (
            <>
                <H>The pipeline</H>
                <p>
                    A post-training pipeline that takes a small base checkpoint and specialises it
                    for STEM question answering, then measures what each stage actually bought.
                </p>
                <QwenPipeline />

                <H>Per-benchmark results</H>
                <div className="scroll-x card my-6">
                    <table className="w-full min-w-[22rem] text-sm">
                        <caption className="sr-only">
                            Accuracy of the tuned model on three multiple-choice benchmarks
                        </caption>
                        <thead>
                            <tr className="border-b border-rule">
                                <th scope="col" className="px-4 py-2.5 text-left font-medium">Benchmark</th>
                                <th scope="col" className="px-4 py-2.5 text-right font-medium">Accuracy</th>
                            </tr>
                        </thead>
                        <tbody className="mono">
                            {[
                                ['AI2-ARC', '71.25%'],
                                ['MedMCQA', '58.33%'],
                                ['AQUA-RAT', '55.12%'],
                            ].map(([name, acc]) => (
                                <tr key={name} className="border-b border-rule last:border-0">
                                    <th scope="row" className="px-4 py-2.5 text-left font-normal">{name}</th>
                                    <td className="px-4 py-2.5 text-right">{acc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <H>Artifacts</H>
                <p>
                    The 17 checkpoints from this work are published publicly on Hugging Face rather
                    than living in a repository — the SFT variants, the DPO variants, the LoRA
                    adapter and the MCQA models, each downloadable and reproducible.
                </p>
            </>
        ),
    },

    /* ------------------------------------------------------------------ */
    {
        slug: 'global-tactical-fund',
        title: 'Global tactical fund simulator',
        venue: 'Investments (FIN-405), EPFL',
        period: 'February – June 2025',
        year: '2025',
        repo: 'https://github.com/Antoine444/global-tactical-fund-simulator',
        repoLabel: 'Antoine444/global-tactical-fund-simulator',
        oneLine:
            'An international multi-asset fund targeting 15% annual volatility, combining diversification across seven developed equity markets with four tactical overlays.',
        tags: ['Portfolio construction', 'Factor models', 'Momentum', 'FX carry'],
        claims: [
            {
                figure: '3.27',
                metric: 'gross Sharpe ratio on the momentum overlay',
                condition: 'gross of transaction costs',
                tone: 'positive',
            },
            {
                figure: '1.94%',
                metric: 'annualised alpha (p < 0.001) vs Fama-French 5 factors by OLS',
                condition: 'gross of transaction costs',
                tone: 'positive',
            },
            {
                figure: '15%',
                metric: 'annual volatility target for the blended fund',
                condition: 'the constraint the whole construction is built to hit',
                tone: 'neutral',
            },
        ],
        body: () => (
            <>
                <H>Construction</H>
                <p>
                    An international multi-asset fund targeting 15% annual volatility, built by
                    combining diversification across seven developed equity markets with tactical
                    overlays. Core portfolios use equal-weight, risk-parity and mean-variance
                    allocation, both hedged and unhedged.
                </p>
                <ul>
                    <li><strong>Momentum</strong> — 11-month lookback with a 1-month skip.</li>
                    <li><strong>Reversal</strong> — 5-year lagged.</li>
                    <li><strong>Currency carry</strong> — 3-month rate differentials.</li>
                    <li><strong>Dollar</strong> — long USD against a foreign basket.</li>
                </ul>

                <H>Results</H>
                <p>
                    The momentum overlay returned a <strong>3.27 gross Sharpe ratio</strong> with{' '}
                    <strong>1.94% annualised alpha</strong> (p &lt; 0.001), benchmarked against the
                    Fama-French 5 factors by OLS.
                </p>
                <p className="border-l-2 pl-4" style={{ borderColor: 'var(--mark-adverse)' }}>
                    <strong>Both figures are gross of transaction costs.</strong> A momentum
                    overlay rebalancing monthly across seven markets turns over a great deal, and
                    the net figures would be lower. I would rather state the number I measured than
                    imply one I did not.
                </p>
            </>
        ),
    },

    /* ------------------------------------------------------------------ */
    {
        slug: 'bitcoin-lob-forecasting',
        title: 'Bitcoin mid-price forecasting from the limit order book',
        venue: 'Machine Learning (CS-433), EPFL',
        period: 'September – December 2024',
        year: '2024',
        repo: 'https://github.com/Antoine444/Bitcoin-prediction',
        repoLabel: 'Antoine444/Bitcoin-prediction',
        oneLine:
            'Short-horizon mid-price direction from raw limit order book microstructure, benchmarking a CNN, a Bayesian neural network and B-TABL.',
        tags: ['PyTorch', 'Market microstructure', 'CNN', 'Bayesian NN'],
        body: () => (
            <>
                <H>The approach</H>
                <p>
                    Forecasting short-horizon mid-price moves directly from raw limit order book
                    microstructure — ask and bid levels, October 2024 data — with a ternary
                    up / down / stationary labelling at 10, 30 and 60-step horizons.
                </p>
                <p>
                    Three architectures were benchmarked against each other on RAO Lab
                    high-frequency data: a CNN, a Bayesian neural network, and B-TABL (the Bayesian
                    Temporal Attention-augmented Bilinear Network).
                </p>
                <p className="border-l-2 pl-4" style={{ borderColor: 'var(--mark-neutral)' }}>
                    This repository has no published results table, so there are no outcome numbers
                    here. Describing the approach is all the evidence supports.
                </p>
            </>
        ),
    },

    /* ------------------------------------------------------------------ */
    {
        slug: 'youtube-analysis',
        title: 'YouTube data analysis',
        venue: 'Applied Data Analysis (CS-401), EPFL',
        period: 'September – December 2024',
        year: '2024',
        repo: 'https://github.com/Antoine444/Youtube-analysis',
        repoLabel: 'Antoine444/Youtube-analysis',
        oneLine:
            'How YouTube professionalised over time, measured across 73M videos and 8.6B+ comments on a memory budget that would not hold the dataset.',
        tags: ['Pandas', 'Clustering', 'Out-of-core processing'],
        claims: [
            {
                figure: '73M',
                metric: 'videos, 2005–2019, from ~137K channels',
                condition: 'the corpus the analysis runs over',
                tone: 'neutral',
            },
            {
                figure: '14GB+',
                metric: 'metadata corpus processed within an 8–32GB RAM budget',
                condition: 'chunked-processing pipeline, never loading the corpus whole',
                tone: 'neutral',
            },
            {
                figure: '8.6B+',
                metric: 'comments clustered into category-level communities',
                condition: 'L1-normalised categories, Ward hierarchical clustering',
                tone: 'neutral',
            },
        ],
        body: () => (
            <>
                <H>The question</H>
                <p>
                    How YouTube professionalised over time — the shift from a casual video-sharing
                    site to a platform supporting full-time creators — examined across 73 million
                    videos published between 2005 and 2019 by roughly 137,000 channels.
                </p>

                <H>The engineering problem</H>
                <p>
                    The interesting constraint was not statistical, it was memory. The metadata
                    corpus is over 14GB and the available RAM budget was 8–32GB, so the pipeline
                    processes in chunks and never materialises the whole dataset. On top of that,
                    over 8.6 billion comments were clustered into category-level communities using
                    L1-normalised categories and Ward hierarchical clustering.
                </p>
            </>
        ),
    },

    /* ------------------------------------------------------------------ */
    {
        slug: 'credit-risk-modeling',
        title: 'Credit risk modelling',
        venue: 'Quantitative Risk Management (FIN-417), EPFL',
        period: 'September – December 2025',
        year: '2025',
        repo: 'https://github.com/Antoine444/credit-risk-modeling',
        repoLabel: 'Antoine444/credit-risk-modeling',
        oneLine:
            'Retail credit-default modelling where the non-linear model wins for a reason, then Monte Carlo on the lending strategy itself.',
        tags: ['scikit-learn', 'SVM', 'Monte Carlo', 'VaR', 'Expected Shortfall'],
        body: () => (
            <>
                <H>The work</H>
                <p>
                    A group project with{' '}
                    <strong>Matthias Wyss, William Jallot and Antoine Garin</strong>, modelling
                    retail credit default and then quantifying what a lending strategy built on
                    that model actually risks.
                </p>
                <ul>
                    <li>
                        Logistic regression compared against an SVM with an RBF kernel. The SVM won
                        where repayment probability depends non-linearly on a feature such as age —
                        which is the case worth reporting, because it says something about the data
                        rather than about the classifier.
                    </li>
                    <li>
                        Lending-strategy risk quantified by Monte Carlo simulation of PnL, 95%
                        Value-at-Risk and 95% Expected Shortfall.
                    </li>
                </ul>
            </>
        ),
    },
]

export const earlierProjects: EarlierProject[] = [
    {
        title: 'Impact of anonymisation on face detection',
        venue: "Bachelor research project · Computer Vision Lab (CVLab), EPFL",
        period: 'February – June 2024',
        repo: 'https://github.com/Antoine444/Bachelor-Project',
        repoLabel: 'Antoine444/Bachelor-Project',
        summary:
            'Implemented face-anonymisation algorithms and measured what they cost a detector, training Faster R-CNN and YOLOX through OpenMMDetection and evaluating on CrowdHuman and MOT17 with anonymised faces.',
        tags: ['Computer vision', 'OpenMMDetection', 'PyTorch'],
    },
    {
        title: 'GoMeet',
        venue: 'Software Enterprise project · six-person team',
        period: '2024',
        repo: 'https://github.com/SwEnt-Project-G18/GoMeet',
        repoLabel: 'SwEnt-Project-G18/GoMeet',
        summary:
            'An Android app for creating and joining events, using the Google Maps API for location. Built in Kotlin with Firebase and Android Jetpack, run as Scrum.',
        tags: ['Kotlin', 'Firebase', 'Android Jetpack'],
    },
]

export const projectBySlug = new Map(projects.map((p) => [p.slug, p]))
