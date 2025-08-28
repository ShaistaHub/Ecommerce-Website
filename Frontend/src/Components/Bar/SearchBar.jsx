import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState([]);
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  let useRefTarget = useRef(null)
  
  const handleChange = async (e) => {
    let getValue= e.target.value
    setSearch(getValue)
    let fetchData = await fetch(`http://localhost:3000/api/products/search?q=${getValue}`);
    let data = await fetchData.json()
    setResult(data)
    
  }
  function handleClick (item) { 
    setSearch("")
    setResult([])
    navigate(`/Home/${item._id}`);
  }
  
  useEffect(()=>{
    function handleClickEvent (event) {
     if (useRefTarget.current && !useRefTarget.current.contains(event.target)){
       setResult([])
     }
    }
   document.addEventListener("mousedown", handleClickEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickEvent);
    };
  },[])

return (
<>
{/* Secondary Navbar (Search Bar Section) */}
<div className="bg-gray-100 shadow-md w-full px-6 py-3 flex items-center justify-center">
  {/* Search Box + Dropdown inside one relative container */}
  <div ref={useRefTarget} className="relative w-full max-w-xl">
    {/* Search Input */}
    <div className="bg-white flex items-center h-12 rounded-lg shadow-md px-3">
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/fluency-systems-regular/40/search--v1.png"
        alt="search"
        className="mr-2"
      />
      <input
        type="text"
        placeholder="Search products..."
        autoComplete="on"
        value={search}
        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
        onChange={handleChange}
      />
      <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Search
      </button>
    </div>

    {/* Dropdown Results */}
    {result.length > 0 && (
      <ul className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
        {result.map((item) => (
          <li
            key={item._id}
            onClick={() => handleClick(item._id)}
            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-10 h-10 object-cover rounded"
            />
            <div>
              <p className="font-medium text-gray-800">{item.productName}</p>
              <p className="text-sm text-gray-500">PKR {item.productPrice}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
</>
    )
}

export default SearchBar;