import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ProductProvider from './components/productContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ProductProvider>
        <App />
      </ProductProvider>
    </BrowserRouter>
)
