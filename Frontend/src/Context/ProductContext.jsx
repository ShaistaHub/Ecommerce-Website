import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

export const ProductContext = createContext([]);

const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

     useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


   const fetchProducts = async () => {
    try {

      setLoading(true);
      // const response = await axios.get("https://product-website-9d1j.onrender.com/api/products");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      setProduct(response.data);
      // setCart(response.data)
      setLoading(false);
      
    } catch (err) {
      console.log(err)
      
    }
  };
  
  useEffect(() => {
    fetchProducts();
}, []);

    return (
    <ProductContext.Provider value={{ product: product, setProduct: setProduct, cart, setCart, fetchProducts, loading}}>
      {children}
    </ProductContext.Provider>
    )
}
 export default ProductContextProvider;