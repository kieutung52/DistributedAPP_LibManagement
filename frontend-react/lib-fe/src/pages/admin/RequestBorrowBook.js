import React, { useState, useEffect } from 'react';
import { getAllTransaction, acceptTransaction, cancelTransaction } from '../../apis/TransactionApi';
import { getUserById } from '../../apis/UserApi';
import { getBookById } from '../../apis/BookApi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorMessage from '../../components/ErrorMessage';

const RequestBorrowBook = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptError, setAcceptError] = useState({}); 
  const [rejectError, setRejectError] = useState({}); 

  const loadRequests = async () => {
    try {
      const allTransactions = await getAllTransaction();
      const pendingRequests = allTransactions.filter(t => t.status === 'PENDING');

      const requestsWithDetails = await Promise.all(
        pendingRequests.map(async (req) => {
          const [user, book] = await Promise.all([
            getUserById(req.userId),
            getBookById(req.bookId)
          ]);
          return {
            ...req,
            userName: user.name,
            bookTitle: book.title,
            borrowStatus: req.borrowStatus,
          };
        })
      );

      setRequests(requestsWithDetails);
      setError(null);
    } catch (err) {
      setError("Failed to load requests: "+ err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAccept = async (transactionId) => {
    try {
      await acceptTransaction(transactionId);
      loadRequests();
      alert("Request accepted successfully!");
      setAcceptError({ ...acceptError, [transactionId]: null });
    } catch (error) {
      setAcceptError({ ...acceptError, [transactionId]: "Failed to accept request: " + error.message });
    }
  };

  const handleReject = async (transactionId) => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      try {
        await cancelTransaction(transactionId);
        loadRequests();
        alert("Request rejected successfully!");
        setRejectError({ ...rejectError, [transactionId]: null });
      } catch (error) {
        setRejectError({ ...rejectError, [transactionId]: "Failed to reject request: "+ error.message });
      }
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

  return (
    <>
      <Header />
      <div className="flex-grow">
        {error && <ErrorMessage message={error} />}
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Borrow Requests</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <p className="text-lg font-semibold text-gray-800 mb-2">User: {request.userName}</p>
                <p className="text-gray-700 mb-1">Book: {request.bookTitle}</p>
                <p className="text-gray-700 mb-1">Start Date: {request.startDate}</p>
                <p className="text-gray-700 mb-1">Due Date: {request.dueDate}</p>
                <p className="text-gray-700 mb-4">
                    Borrow Status: <span className={`px-2 py-1 rounded ${getBorrowStatusColorClass(request.borrowStatus)}`}>{request.borrowStatus}</span>
                  </p>
                {acceptError[request.id] && <ErrorMessage message={acceptError[request.id]} />}
                {rejectError[request.id] && <ErrorMessage message={rejectError[request.id]} />}

                <div className="flex justify-end space-x-3">

                  <button
                    onClick={() => handleAccept(request.id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                  >
                    Reject
                  </button>
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

export default RequestBorrowBook;