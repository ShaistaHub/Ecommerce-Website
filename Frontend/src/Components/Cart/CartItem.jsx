// CartItem.js
import React from 'react';
import { ProductContext } from '../../Context/ProductContext';
import { useContext } from 'react';
import useCart from '../../Hooks/useCart';
import PaymentForm from '../Checkout/PaymentForm';
import { useNavigate } from 'react-router-dom';

const CartItem = () => {
  const { cart} = useContext(ProductContext);
      let { removeFromCart, updateQuantity } = useCart();  
      let navigate = useNavigate()

      const subtotal = cart.reduce((acc, item) => {
  return acc + item.productPrice * item.quantity;
}, 0);
  
  if (cart.length === 0) {
    return <div className="empty-cart">Your cart is empty</div>;
  }
  
  function CheckOut () {
    navigate("/PaymentForm")
  }

  return ( {subtotal},
 <div className="cart-page bg-gray-50 min-h-screen p-6">
  <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>

  <div className="cart-items space-y-4">
    {cart.map((item) => (
      <div
        key={item._id || item.id}
        className="cart-item flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
      >
        {/* Item Info */}
        <div className="item-info flex items-center gap-4">
          <img
            src={item.productImage}
            alt={item.productName}
            className="w-24 h-24 object-cover rounded-lg border"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.productName}
            </h3>
            <p className="text-gray-600">Price: PKR {item.productPrice}</p>
          </div>
        </div>

        {/* Quantity & Remove */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              className="rounded-lg border px-3 py-1 hover:bg-gray-200"
              onClick={() =>
                updateQuantity(item._id || item.id, item.quantity - 1)
              }
            >
              -
            </button>
            <span className="font-medium">{item.quantity}</span>
            <button
              className="rounded-lg border px-3 py-1 hover:bg-gray-200"
              onClick={() =>
                updateQuantity(item._id || item.id, item.quantity + 1)
              }
            >
              +
            </button>
          </div>

          {/* Item Total */}
          <div className="min-w-[100px] text-right font-semibold">
            PKR {item.productPrice * item.quantity}
          </div>

          {/* Remove Button */}
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Subtotal Section */}
  <div className="mt-8 flex items-center justify-between rounded-xl border bg-white shadow-md p-6">
    <div className="text-lg font-bold">Subtotal:</div>
    <div className="text-xl font-semibold text-blue-600">PKR {subtotal}</div>
  </div>

  {/* Checkout Button */}
  <div className="mt-6 flex justify-end">
    <button onClick={CheckOut} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
      Proceed to Checkout
    </button>
  </div>
</div>

  )
};

export default CartItem;