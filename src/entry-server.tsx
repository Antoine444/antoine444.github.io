import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export { routes, notFoundMeta, siteUrl } from './routes'

export function render(url: string): string {
    return renderToString(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>
    )
}
