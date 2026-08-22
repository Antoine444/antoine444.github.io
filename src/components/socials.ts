import { links } from '@/content/profile'
import { GitHubIcon, HuggingFaceIcon, LinkedInIcon } from './Icons'

/** The places to reach Antoine, in the order they are worth clicking.
    No email: the address is deliberately absent from this site, including as
    a mailto href, which is exactly what scrapers harvest. */
export const SOCIALS = [
    { href: links.github, label: 'GitHub', Icon: GitHubIcon },
    { href: links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    { href: links.huggingface, label: 'Hugging Face', Icon: HuggingFaceIcon },
]
