import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

const appLabel = import.meta.env.VITE_CODESPACE_NAME?.trim() || import.meta.env.VITE_bookish_funicular?.trim()
document.title = appLabel ? `OctoFit Tracker • ${appLabel}` : 'OctoFit Tracker'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}
