import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from './context/AuthProvider.tsx'
import './style.js'
import './App.css'
import { ToastContainer } from './component/toast/Toast.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer/>
      <App />
    </AuthProvider>
  </StrictMode>,
)
