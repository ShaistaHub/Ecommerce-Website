import CartItem from "../Components/Product/ProductCard";
import { ProductContext } from "../Context/ProductContext";
import { useContext } from "react";
import useCart from "../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import SearchBar from "../Components/Bar/SearchBar";

const Home = () => {
  
    let { product, setCart, loading } = useContext(ProductContext)
    let { addToCart } = useCart();
    const navigate = useNavigate();


    return (
<>    
<SearchBar />
   <h2 className="text-2xl font-bold text-center my-6"></h2>

  {loading && <p>loading....</p>}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
  {product.map((item) => (
    <div
      key={item._id || item.id}
      className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition"
    >
      <img
        src={item.productImage}
        alt={item.productName}
        className="w-48 h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800">{item.productName}</h2>
      <h3 className="text-gray-600 mb-3">${item.productPrice}</h3>

      <button
        onClick={() => {
          addToCart(item);
            toast.success("Added to cart!");
            setTimeout(() =>  navigate("/CartItem"),300)
        }}
        className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  ))}
</div>
</>
    )
}
export default Home;