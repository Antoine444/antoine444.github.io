import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Layout } from '@/components/Layout'
import Home from '@/pages/Home'
import Project from '@/pages/Project'
import NotFound from '@/pages/NotFound'

/**
 * Scroll handling for a prerendered multi-page site: land on the hash when one
 * is present (the old site never did this, so external #projects links did
 * nothing), otherwise start at the top on a route change.
 */
function ScrollBehaviour() {
    const { pathname, hash } = useLocation()
    useEffect(() => {
        if (hash) {
            const el = document.getElementById(hash.slice(1))
            if (el) {
                el.scrollIntoView({ block: 'start' })
                return
            }
        }
        window.scrollTo(0, 0)
    }, [pathname, hash])
    return null
}

export default function App() {
    return (
        <Layout>
            <ScrollBehaviour />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<Project />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    )
}
