import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";

    function RegisterPage () {
    let { user, setUser } = useContext(AuthContext)
    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
    });
        // console.log(user)
        
        const handleChange = (e) => {
          let {name, value} = e.target
          setFormData(prev => ({...prev, [name]: value}))
        }
        
        async function handleSubmit (e) {
          e.preventDefault();
 try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();

    setUser(formData)
    if (response.ok) {
      // Save token and redirect
      // localStorage.setItem('token', data.token);
      // navigate('/dashboard');
    } else {
      // setError(data.error);
    }
  } catch (err) {
    // setError('Registration failed');
    console.log(err)
  }
    }

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h1>
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button 
        type="submit" 
        className="w-full py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-200"
      >
        Register
      </button>
    </form>

    <p className="text-center text-gray-600 mt-4">
      Already have an account?{" "}
      <Link to="/Login" className="text-blue-600 hover:underline">
        Login here
      </Link>
    </p>
  </div>
</div>
  );
}
export default RegisterPage;