import { ProductContext } from "../Context/ProductContext";
import { useContext, useEffect } from "react";

export default function useCart  ()  {
 const { cart, setCart } = useContext(ProductContext)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

   useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (item) => {
   let filterItem =  cart.filter(removeItem => removeItem._id !== item)
   setCart(filterItem)
  };

  const updateQuantity = (item, newQuantity) =>{
    let updateQuantity = cart.map((qntItem) => qntItem._id === item ?  {  ...qntItem, quantity: newQuantity > 0 ? newQuantity : 1 }: qntItem)
    setCart(updateQuantity)
  }

const addToCart = (item) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      // Increase quantity if already in cart
      return prevCart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      // Add new item with quantity 1
      return [...prevCart, { ...item, quantity: 1 }];
    }
  });
};

    return  { addToCart,removeFromCart, cart, updateQuantity };
 }


