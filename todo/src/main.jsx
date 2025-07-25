import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Approutes from './Approutes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Approutes/>
  </StrictMode>,
)
