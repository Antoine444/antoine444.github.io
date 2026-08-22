import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// User site (antoine444.github.io) -> served from the domain root.
// `base` must stay '/' and BrowserRouter must stay without a basename.
export default defineConfig({
    base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: { '@': path.resolve(__dirname, './src') },
    },
    build: {
        target: 'es2022',
        cssCodeSplit: false,
    },
})
