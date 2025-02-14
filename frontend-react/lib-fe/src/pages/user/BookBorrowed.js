import React, { useState, useEffect, useCallback } from 'react';
import { getAllTransaction, returnBook } from '../../apis/TransactionApi';
import { getBookById } from '../../apis/BookApi'; 
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BookBorrowed = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user.data.id : null;

  
  const fetchBorrowedBooks = useCallback(async () => {
    try {
      const allTransactions = await getAllTransaction();
      const userTransactions = allTransactions.filter(
        (transaction) =>
          transaction.userId === userId && transaction.borrowStatus !== 'NONE'
      );

      const booksPromises = userTransactions.map((transaction) =>
        getBookById(transaction.bookId)
      );
      const booksData = await Promise.all(booksPromises);

      const borrowedBooksData = userTransactions.map((transaction, index) => {
        return {
          ...booksData[index],
          transactionId: transaction.id,
          startDate: transaction.startDate,
          dueDate: transaction.dueDate,
          borrowStatus: transaction.borrowStatus,
        };
      });

      setBorrowedBooks(borrowedBooksData);
    } catch (err) {
      setError(err.message || "Failed to load borrowed books.");
    } finally {
      setLoading(false);
    }
  }, [userId]); 

  useEffect(() => {
    if (userId) {
      fetchBorrowedBooks();
    } else {
      setLoading(false);
    }
  }, [fetchBorrowedBooks, userId]); 

  const handleReturnBook = async (transactionId) => {
    if (window.confirm("Are you sure you want to return this book?")) {
      try {
        await returnBook(transactionId);
        fetchBorrowedBooks(); 
        alert("Book returned successfully!");
      } catch (error) {
        alert("Error returning book: " + error.message);
      }
    }
  };

  const getBorrowStatusColorClass = (borrowStatus) => {
    switch (borrowStatus) {
      case 'borrowing':
        return 'bg-blue-200 text-blue-800';
      case 'overdue':
        return 'bg-red-200 text-red-800';
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

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-500 text-xl">User is not logged in</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Borrowed Books</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {borrowedBooks.map((book) => (
              <div key={book.transactionId} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
                <p className="text-gray-600 mb-1">Author: {book.author}</p>
                <p className="text-gray-600 mb-1">Start Date: {book.startDate}</p>
                <p className="text-gray-600 mb-4">Due Date: {book.dueDate}</p>
                <p className="text-gray-700 mb-4">
                  Borrow Status: <span className={`px-2 py-1 rounded ${getBorrowStatusColorClass(book.borrowStatus)}`}>{book.borrowStatus}</span>
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleReturnBook(book.transactionId)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
                  >
                    Return Book
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

export default BookBorrowed;