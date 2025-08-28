
import { useState } from "react";

function PaymentForm({cart,subtotal }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
    const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "Cash on Delivery",
  });

  function handleChange (e) {
    setForm({
         ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

     const orderData = {
      ...form,    // 👈 name, email, address, phone, paymentMethod
      cart,       // passed from props
      subtotal,   // passed from props
    };
    alert("Order placed successfully ✅");

 try {
    const res = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();
    if (data.success) {
      alert("Order placed ✅ ID: " + data.orderId);
      // navigate("/order-success");  👈 redirect user to confirmation page
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong ❌");
  }

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Checkout Form
        </h2>

        {/* Customer Info */}
        <div className="space-y-4">
          <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
             type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
             type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Payment Method</h3>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Card Payment
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>
        </div>

        {/* Card Details (only if card selected) */}
        {paymentMethod === "card" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {/* <div className="flex gap-4">
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                className="w-1/2 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div> */}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
