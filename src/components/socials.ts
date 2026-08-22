import { links } from '@/content/profile'
import { GitHubIcon, HuggingFaceIcon, LinkedInIcon, MailIcon } from './Icons'

/** The four places to reach Antoine, in the order they are worth clicking. */
export const SOCIALS = [
    { href: links.github, label: 'GitHub', Icon: GitHubIcon },
    { href: links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    { href: links.huggingface, label: 'Hugging Face', Icon: HuggingFaceIcon },
    { href: links.email, label: 'Email', Icon: MailIcon },
]
