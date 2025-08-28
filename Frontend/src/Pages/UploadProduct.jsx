import { useState } from "react";
import { useContext } from "react";
import {ProductContext} from "../Context/ProductContext.jsx"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const UploadProduct = () => {
      const navigate = useNavigate();
    const {product, setProduct} = useContext(ProductContext) 
    const [productData, setProductData] = useState({
        productName : "",
        productPrice : "",
        productImage : ""
    })

   function handleChange (e) {
      let {name, value, files } = e.target
       setProductData((prev) =>{

           return ({
               ...prev,
               [name]: files  ? files[0] : value, 
            })}); 
        }

async function handleSubmit (e) {
    e.preventDefault();
    setProduct(productData); // add new product globally

       try {
            // 1. Create FormData for file upload
            const formData = new FormData();
            formData.append('name', productData.productName);
            formData.append('price', productData.productPrice);
            formData.append('image', productData.productImage); // The actual file

            // 2. Send to backend
            const response = await axios.post("http://localhost:3000/api/products", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
              // 3. Update global state with response data
            setProduct((prev) => {
                let toArray = Array.isArray(prev) ? prev : [];
                return [...toArray, response.data]
            });
            // 4. Optional: Redirect to homepage
            navigate("/");            
            // 4. Reset form
            setProductData({
                productName: "",
                productPrice: "",
                productImage: ""
            });
            console.log("Product uploaded successfully:", response.data);
        } catch (error) {
            console.error("Upload failed:", error);
            // Add error handling (e.g., show toast notification)
        }

    }
    

    return (
        <>
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4"
  >
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
      Upload Product
    </h2>

    <input
      type="text"
      name="productName"
      placeholder="Product Name"
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />

    <input
      type="number"
      name="productPrice"
      placeholder="Product Price"
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />

    <input
      type="file"
      name="productImage"
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-600 cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
      required
    />

    <button
      type="submit"
      className="w-full py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-200"
    >
      Upload
    </button>
  </form>
</div>

        </>
    )
}

export default UploadProduct;