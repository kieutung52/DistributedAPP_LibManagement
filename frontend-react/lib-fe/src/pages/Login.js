import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../apis/UserApi';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await loginUser(username, password);
      login(user); 
      if (user.data.role === 'admin') {
            navigate('/dashboard');
        } else if (user.data.role === 'user') {
             navigate('/home');
        } else {
           setError('Invalid role');
        }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError(err.message);
    }
  };

  
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    <FaSignInAlt className="inline-block mr-2" /> {/* Icon */}
                    Login
                </h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                            <FaUser className="inline-block mr-2 text-gray-500" /> {/* Icon */}
                            Username
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            <FaLock className="inline-block mr-2 text-gray-500" /> {/* Icon */}
                            Password
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <Link to="/register" className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300">
                            Don't have account? Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;