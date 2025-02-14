import React, { useState, useEffect } from 'react';
import { getAllTransaction, deleteTransactionById } from '../../apis/TransactionApi';
import CreateTransactionForm from './ad_transaction/CreateTransactionForm';
import EditTransactionForm from './ad_transaction/EditTransactionForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const TransactionManage = () => {
  const [transactions, setTransactions] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTransactions = async () => {
    try {
      const transactionData = await getAllTransaction();
      setTransactions(transactionData);
    } catch (err) {
      setError(err.message || "Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleDelete = async (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransactionById(transactionId);
        loadTransactions(); 
        alert("Transaction deleted successfully!");
      } catch (error) {
        alert("Error deleting transaction: " + error.message);
      }
    }
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setShowEditForm(true);
  };

  const handleCreateSuccess = (newTransaction) => {
    setShowCreateForm(false);
    loadTransactions(); 
    alert("Transaction created successfully!");
  };

  const handleEditSuccess = (updatedTransaction) => {
    setShowEditForm(false);
    loadTransactions(); 
    alert("Transaction updated successfully");
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'approved':
        return 'bg-green-200 text-green-800';
      case 'rejected':
        return 'bg-red-200 text-red-800';
      case 'returned':
        return 'bg-blue-200 text-blue-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };
  const getBorrowStatusColorClass = (borrowStatus) => {
        switch (borrowStatus) {
            case 'pending':
                return 'bg-yellow-200 text-yellow-800'; 
            case 'borrowing':
                return 'bg-blue-200 text-blue-800';   
            case 'returned':
                return 'bg-green-200 text-green-800';  
            case 'overdue':
                return 'bg-red-200 text-red-800';    
            case 'cancelled':
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Transaction Management</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out mb-4"
          >
            Add New Transaction
          </button>

          {showCreateForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
              <div className="relative p-8 border w-full max-w-md shadow-lg rounded-xl bg-white">
                <CreateTransactionForm onTransactionCreated={handleCreateSuccess} onClose={() => setShowCreateForm(false)} />
              </div>
            </div>
          )}

          {showEditForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
              <div className="relative p-8 border w-full max-w-md shadow-lg rounded-xl bg-white">
                <EditTransactionForm transaction={selectedTransaction} onTransactionUpdated={handleEditSuccess} onClose={() => setShowEditForm(false)} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl flex justify-between items-center">
                <div>
                  <p className="text-gray-700 mb-1">User ID: {transaction.userId}</p>
                  <p className="text-gray-700 mb-1">Book ID: {transaction.bookId}</p>
                  <p className="text-gray-700 mb-1">Start Date: {transaction.startDate}</p>
                  <p className="text-gray-700 mb-1">Due Date: {transaction.dueDate}</p>
                  <p className="text-gray-700 mb-1">
                    Status: <span className={`px-2 py-1 rounded ${getStatusColorClass(transaction.status)}`}>{transaction.status}</span>
                  </p>
                  <p className="text-gray-700 mb-4">
                    Borrow Status: <span className={`px-2 py-1 rounded ${getBorrowStatusColorClass(transaction.borrowStatus)}`}>{transaction.borrowStatus}</span>
                  </p>
                </div>
                <div className="flex justify-end space-x-3">
                  <button onClick={() => handleEdit(transaction)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">Edit</button>
                  <button onClick={() => handleDelete(transaction.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TransactionManage;