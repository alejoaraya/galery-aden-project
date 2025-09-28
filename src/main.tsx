import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { GaleryApp } from './GaleryApp'
import { StoreProvider } from './store/StoreProvider'

import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <GaleryApp />
    </StoreProvider>
  </StrictMode>,
)
