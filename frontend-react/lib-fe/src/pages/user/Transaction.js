import React, { useState, useEffect } from 'react';
import { getAllTransaction } from '../../apis/TransactionApi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorMessage from '../../components/ErrorMessage';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user.data.id : null;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const allTransactions = await getAllTransaction();
        const userTransactions = allTransactions.filter(t => t.userId === userId);
        setTransactions(userTransactions);
        setError(null);
      } catch (err) {
        setError("Failed to load transactions: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTransactions();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-200 text-yellow-800';
      case 'ACCEPT':
        return 'bg-green-200 text-green-800';
      case 'CANCELED':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getBorrowStatusColorClass = (borrowStatus) => {
    switch (borrowStatus) {
      case 'NONE':
        return 'bg-yellow-200 text-yellow-800';
      case 'ON_TIME':
        return 'bg-blue-200 text-blue-800';
      case 'DUE':
        return 'bg-green-200 text-green-800';
      case 'OVER_DUE':
        return 'bg-red-200 text-red-800';
      case 'RETURNED':
        return 'bg-gray-200 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <ErrorMessage message="User is not logged in."/>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex-grow">
        {error && <ErrorMessage message={error} />}
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">My Transactions</h1>
          <div className="grid grid-cols-1 gap-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-700 mb-1">Book ID: {transaction.bookId}</p>
                <p className="text-gray-700 mb-1">Start Date: {transaction.startDate}</p>
                <p className="text-gray-700 mb-1">Due Date: {transaction.dueDate}</p>
                <p className="text-gray-700 mb-1">
                  Status: <span className={`px-2 py-1 rounded ${getStatusColorClass(transaction.status)}`}>{transaction.status}</span>
                </p>
                <p className="text-gray-700">
                  Borrow Status: <span className={`px-2 py-1 rounded ${getBorrowStatusColorClass(transaction.borrowStatus)}`}>{transaction.borrowStatus}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transaction;