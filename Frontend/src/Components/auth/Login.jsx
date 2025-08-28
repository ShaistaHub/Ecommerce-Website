import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";

function Login () {
 let { user, setUser } = useContext(AuthContext)
    const [loginUser, setLoginUser] = useState({
    email: '',
    password: ''
    });


     const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        email: loginUser.email,
        password: loginUser.password
      })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      // Handle successful login (store token, redirect etc.)
      setUser(loginUser)
    } catch (error) {
      console.error('Login error:', error);
    }
}

    return (
        <>
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">  
        <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="username"
          value={loginUser.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="email"
          name="email"
          value={loginUser.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="password"
          name="password"
          value={loginUser.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200"
      type="submit">Login</button>
      </form>
    </div>  
    </div>
  </>
    )
}
export default Login;