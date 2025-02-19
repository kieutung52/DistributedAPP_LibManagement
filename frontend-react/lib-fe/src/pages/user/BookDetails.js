import React, { useState } from 'react';
import { createTransaction } from '../../apis/TransactionApi';

const BookDetails = ({ book, onClose, setBorrowError }) => { 

  const [borrowDuration, setBorrowDuration] = useState(7);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user.data.id : null;

  const handleBorrow = async () => {
    if (!userId) {
      setBorrowError("User not logged in."); 
      return;
    }

    const today = new Date();
    const startDate = today.toLocaleDateString('en-GB');  

    const dueDateObj = new Date(today);
    dueDateObj.setDate(today.getDate() + borrowDuration);
    const dueDate = dueDateObj.toLocaleDateString('en-GB'); 

    try {
      const newTransaction = await createTransaction(userId, book.id, startDate, dueDate, "PENDING", 'NONE');
      alert(`Book "${book.title}" borrowed successfully! Transaction ID: ${newTransaction.id}`);
      onClose();
      setBorrowError(null); 
    } catch (err) {
      setBorrowError("Failed to borrow book: " + err.message); 
    }
  };

  return (
    <>
      <div className='flex justify-between'>
        <h2 className="text-xl font-bold">Create Transaction</h2>
        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{book.title}</h2>
        <p className="text-gray-700 mb-2">Author: {book.author}</p>
        <p className="text-gray-700 mb-2">Publisher: {book.publisher}</p>
        <p className="text-gray-700 mb-2">Year: {book.year}</p>
        <p className="text-gray-700 mb-4">Quantity: {book.quantity}</p>

        <div className="mb-4">
          <label htmlFor="borrowDuration" className="block text-sm font-medium text-gray-700">Borrow Duration:</label>
          <select
            id="borrowDuration"
            value={borrowDuration}
            onChange={(e) => setBorrowDuration(parseInt(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={7}>7 days</option>
            <option value={10}>10 days</option>
            <option value={14}>14 days</option>
            <option value={20}>20 days</option>
          </select>
        </div>

        <button
          onClick={handleBorrow}
          disabled={book.quantity <= 0}
          className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ${book.quantity <= 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          Borrow Book
        </button>
      </div>
    </>
  );
};

export default BookDetails;