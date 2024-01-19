import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.tsx'
import { ShoppingCartProvider } from './context/ShoppingCartContext.tsx'
import { LoadingProvider } from './context/LoadingScreenContext.tsx'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <LoadingProvider>
      <ShoppingCartProvider>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
      </ShoppingCartProvider>
      </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>,
)
