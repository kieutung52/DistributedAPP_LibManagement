import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaUserCog, FaBookOpen, FaExchangeAlt, FaHandHolding, FaHome, FaBookReader, FaClipboardList } from 'react-icons/fa';
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const handleLogout = () => {
    logout();     
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <Link to={user?.data.role === "admin" ? "/dashboard" : "/home"} className="flex items-center text-3xl font-bold text-white no-underline">
          <FaBook className="mr-2 text-4xl" />
          Library Management
        </Link>
        <nav>
          <ul className="flex space-x-8">
            {!user ? ( 
              <>
                <li><Link to="/login" className="hover:text-gray-300 transition duration-300 flex items-center text-lg"><FaUserCog className="mr-1 text-xl" />Login</Link></li>
                <li><Link to="/register" className="hover:text-gray-300 transition duration-300 flex items-center text-lg">Register</Link></li>
              </>
            ) : user.data.role === "admin" ? (
              <>
                <li><Link to="/dashboard" className="hover:text-gray-300 transition duration-300 flex items-center text-lg"><FaHome className="mr-1 text-xl" />Dashboard</Link></li>
                <li><Link to="/usermanage" className="hover:text-gray-300 transition duration-300 flex items-center text-lg"><FaUserCog className="mr-1 text-xl"/>Users</Link></li>
                <li><Link to="/bookmanage" className="hover:text-gray-300 transition duration-300 flex items-center text-lg"><FaBookOpen className="mr-1 text-xl"/>Books</Link></li>
                <li><Link to="/transactionmanage" className="hover:text-gray-300 transition duration-300 flex items-center text-lg"> <FaExchangeAlt className="mr-1 text-xl"/>Transactions</Link></li>
                <li><Link to="/requestborrow" className="hover:text-gray-300 transition duration-300 flex items-center text-lg"><FaHandHolding className="mr-1 text-xl"/>Requests</Link></li>
              </>
            ) : user.data.role === "user" ? (
              <>
                <li><Link to="/home" className="hover:text-gray-300 transition duration-300 flex items-center text-lg"><FaHome className="mr-1 text-xl" />Home</Link></li>
                <li><Link to="/bookshelf" className="hover:text-gray-300 transition duration-300 flex items-center text-lg"><FaBookReader className="mr-1 text-xl" />Book Shelf</Link></li>
                <li><Link to="/bookborrowed" className="hover:text-gray-300 transition duration-300 flex items-center text-lg"><FaBookOpen className="mr-1 text-xl"/>Borrowed</Link></li>
                <li><Link to="/transaction" className="hover:text-gray-300 transition duration-300 flex items-center text-lg"> <FaClipboardList className="mr-1 text-xl"/>Transactions</Link></li>
              </>
            ) : null}

            {user && (
              <li className="flex items-center">
                <span className="mr-3 text-gray-300 text-lg">Hi, {user.data.name}</span>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 text-lg">
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;