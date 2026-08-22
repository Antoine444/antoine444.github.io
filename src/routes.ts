import { projects } from './content/projects'

export interface RouteMeta {
    /** URL path. Trailing slash on nested routes so they emit <path>/index.html. */
    path: string
    title: string
    description: string
}

const SITE = 'https://antoine444.github.io'

export const siteUrl = SITE

export const routes: RouteMeta[] = [
    {
        path: '/',
        title: 'Antoine Garin - Portfolio',
        description:
            'MSc Computer Science at EPFL, graduating November 2027. Concurrent and distributed systems, machine learning post-training, and quantitative finance.',
    },
    ...projects.map((p) => ({
        path: `/projects/${p.slug}/`,
        title: `${p.title} — Antoine Garin`,
        description: p.oneLine.length > 180 ? `${p.oneLine.slice(0, 177)}…` : p.oneLine,
    })),
]

/** Rendered to dist/404.html; GitHub Pages serves it for unknown paths. */
export const notFoundMeta: RouteMeta = {
    path: '/404',
    title: 'Page not found — Antoine Garin',
    description: 'That page does not exist on antoine444.github.io.',
}
