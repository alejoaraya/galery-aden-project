import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { GalleryApp } from './GalleryApp'
import { StoreProvider } from './store/StoreProvider'

import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <GalleryApp />
    </StoreProvider>
  </StrictMode>,
)
