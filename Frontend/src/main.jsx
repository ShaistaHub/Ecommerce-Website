import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductContextProvider from "./Context/ProductContext.jsx";
import  AuthContextProvider  from "./Context/AuthContext.jsx"; // Remove .jsx extension


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
