import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContextProvider } from './contexts/ToastContext.tsx'
import ToastNotification from './components/ToastNotification.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContextProvider>
      <ToastNotification />
      <App />
    </ToastContextProvider>
  </StrictMode>,
)
