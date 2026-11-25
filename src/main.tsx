import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from './context/AuthProvider.tsx'
import './style.js'
import './App.css'
import { ToastContainer } from './component/toast/Toast.tsx'
import { LoadingProvider } from './component/Loading.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <ToastContainer/>
        <App />
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>,
)
