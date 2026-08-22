import { Hero, ThroughLine } from '@/sections/Hero'
import { Work } from '@/sections/Work'
import { Experience } from '@/sections/Experience'
import { Education } from '@/sections/Education'
import { Skills } from '@/sections/Skills'
import { Contact } from '@/sections/Contact'

export default function Home() {
    return (
        <>
            <Hero />
            <ThroughLine />
            <Work />
            <Experience />
            <Education />
            <Skills />
            <Contact />
        </>
    )
}
