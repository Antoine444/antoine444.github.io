import { projects } from '@/content/projects'

/**
 * The project the hero presents in full.
 *
 * Work reads this to suppress that project's claims in the list, so a finding
 * and its condition are never stated twice on the same page. Falls back to the
 * first entry if the slug is ever renamed, which keeps the hero populated
 * rather than blank.
 */
export const leadProject = projects.find((p) => p.slug === 'deep-hedging-dro') ?? projects[0]
