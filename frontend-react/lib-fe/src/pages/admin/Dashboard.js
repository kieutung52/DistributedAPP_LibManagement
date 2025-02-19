import React, { useState, useEffect } from 'react';
import { getAllUser } from '../../apis/UserApi';
import { getAllBook} from '../../apis/BookApi';
import { getAllTransaction } from '../../apis/TransactionApi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorMessage from '../../components/ErrorMessage';
import { FaUsers, FaBook, FaExchangeAlt } from 'react-icons/fa';


const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userError, setUserError] = useState(null);
  const [bookError, setBookError] = useState(null);
  const [transactionError, setTransactionError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const users = await getAllUser().catch(err => {
              setUserError(err.message);
              return []; 
          });
          const books = await getAllBook().catch(err => {
              setBookError(err.message);
              return [];
          });
          const transactions = await getAllTransaction().catch(err => {
              setTransactionError(err.message);
              return [];
          });
  
          setUserCount(users.length);
          setBookCount(books.length);
          setTransactionCount(transactions.length);
        } catch (err) {
          setError(err.message || "An error occurred.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

   if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>;
    }

    if (error) {
      return (
        <>
            <Header />
            <div className="flex-grow flex items-center justify-center">
              <ErrorMessage message="The system is experiencing issues. We will fix it soon." />
            </div>
            <Footer />
        </>
      );
    }

    return (
      <>
        <Header />
        <div className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Admin Dashboard</h1>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center hover:shadow-2xl transition duration-300">
                <div className="p-4 bg-blue-100 rounded-full mr-4">
                  <FaUsers className="text-blue-600 text-3xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Users</h2>
                  {userError ? (
                    <p className="text-red-500">Error loading data</p>
                  ) : (
                    <p className="text-5xl font-bold text-blue-700">{userCount}</p>
                  )}
                </div>
              </div>
  
              <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center hover:shadow-2xl transition duration-300">
                <div className="p-4 bg-green-100 rounded-full mr-4">
                  <FaBook className="text-green-600 text-3xl"/>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Books</h2>
                  {bookError ? (
                    <p className="text-red-500">Error loading data</p>
                  ) : (
                    <p className="text-5xl font-bold text-green-700">{bookCount}</p>
                  )}
                </div>
              </div>
  
              <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center hover:shadow-2xl transition duration-300">
                <div className="p-4 bg-yellow-100 rounded-full mr-4">
                  <FaExchangeAlt className="text-yellow-600 text-3xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Transactions</h2>
                  {transactionError ? (
                    <p className="text-red-500">Error loading data</p>
                  ) : (
                    <p className="text-5xl font-bold text-yellow-700">{transactionCount}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
        <Footer />
      </>
    );
  };
  
  export default Dashboard;