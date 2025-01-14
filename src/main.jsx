import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './components/App.jsx'
import {LoadScript } from '@react-google-maps/api'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadScript googleMapsApiKey="AIzaSyDwxyCrcshK6kl2ICi5UCtepIqNgPz36T4">
      <App />
    </LoadScript>
  </StrictMode>,
)
