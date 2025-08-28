import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css'
import UploadProduct from './Pages/UploadProduct.jsx'
import CartItem from './Components/Cart/CartItem.jsx'
import ProductCard from './Components/Product/ProductCard.jsx'
import Home from './Pages/HomePage.jsx';
import Layout from './Components/Ui/Layout.jsx';
import Footer from './Components/Ui/Footer.jsx'
import RegisterPage from "./Components/auth/Register.jsx";
import Login from "./Components/auth/Login.jsx";
import PaymentForm from "./Components/Checkout/PaymentForm.jsx";
function App() {
  
  return (
    <>
    <BrowserRouter>
    <Layout />
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/CartItem' element={<CartItem />}/>
      <Route path='/ProductCard' element={<ProductCard/>}/>
      <Route path="/UploadProduct" element={<UploadProduct />}/>
      <Route path="/RegisterPage" element={<RegisterPage />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/Home/:id" element={<Home />} />
      <Route path="/PaymentForm" element={<PaymentForm />} />
     </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
