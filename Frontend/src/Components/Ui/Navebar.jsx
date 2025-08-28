import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // install lucide-react for icons

const NaveBar = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
 <nav className="bg-gray-800 sticky top-0 z-50 text-white px-6 py-4 shadow-md">
  <div className="flex items-center justify-evenly">

  {/* Logo / Title */}
  <h2 className="text-2xl font-extrabold tracking-wide">MyShop</h2>

  {/* Links desktop */}
  <div className="hidden md:flex gap-27">
    <Link to="/" className="hover:text-yellow-200 transition">Home</Link>
    <Link to="/CartItem" className="hover:text-yellow-200 transition">Cart</Link>
    <Link to="/UploadProduct" className="hover:text-yellow-200 transition">Upload</Link>
    <Link to="/RegisterPage" className="hover:text-yellow-200 transition">Register</Link>
  </div>

<div>
    {/* Mobile Menu Button */}
     <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

          {isOpen && (
            <div className="mt-4 flex flex-col gap-4 md:hidden bg-blue-700 rounded-lg p-4">
          <Link to="/" className="hover:text-blue-200 transition">Home</Link>
          <Link to="/CartItem" className="hover:text-blue-200 transition">Cart</Link>
          {/* <Link to="/ProductCard" className="hover:text-blue-200 transition">Products</Link> */}
          <Link to="/UploadProduct" className="hover:text-blue-200 transition">Upload</Link>
          <Link to="/RegisterPage" className="hover:text-blue-200 transition">Register</Link>
        </div>
      )}
      </div>
  </div>    
</nav>
</>
    )
}

export default NaveBar;


