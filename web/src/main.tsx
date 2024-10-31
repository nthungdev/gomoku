import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import SocketIoProvider from './components/providers/SocketIoProvider.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketIoProvider>
      <App />
    </SocketIoProvider>
  </StrictMode>
)
