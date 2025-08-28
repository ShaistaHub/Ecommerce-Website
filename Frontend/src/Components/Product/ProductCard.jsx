import axios from "axios";
import { ProductContext } from "../../Context/ProductContext";
import { useContext } from "react";
// import axios from "axios";

const ProductItem = () => {
    let { cart } = useContext(ProductContext)

    let fetchProduct = async () => {
        // let getData = await axios.get("http://localhost:3000/api/Cards")

    }
    return (
        <>
        <h1>Product Cart</h1>
         <div>
            {
                cart.map((item)=>{
                    return (
                        <div key={item.id}>
                            <li>
                             {item.productName}  – ${item.productPrice}
                                <br />
            {item.productImage && (
              <img
                src={item.productImage} // 👈 to preview local file
                alt={item.productName}
                width="100"
              />
            )}
                            </li>
                        </div>
                    )
                })
            }
         </div>
        </>
    )
}
export default ProductItem;