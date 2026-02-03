import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContextProvider } from './contexts/ToastContext.tsx'
import ToastNotification from './components/ToastNotification.tsx'
import ReactQueryProvider from './contexts/ReactQueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ToastContextProvider>
        <ToastNotification />
        <App />
      </ToastContextProvider>
    </ReactQueryProvider>
  </StrictMode>,
)
