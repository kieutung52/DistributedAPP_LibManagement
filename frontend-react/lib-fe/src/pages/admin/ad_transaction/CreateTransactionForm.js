import React, { useState } from 'react';
import { createTransaction } from '../../../apis/TransactionApi';

const CreateTransactionForm = ({ onTransactionCreated, onClose }) => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [borrowStatus, setBorrowStatus] = useState('pending');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTransaction = await createTransaction(userId, bookId, startDate, dueDate, status, borrowStatus);
      onTransactionCreated(newTransaction);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create transaction.");
    }
  };

  return (
    <>
    {error && <div className='text-red-500'>{error}</div>}
    <form onSubmit={handleSubmit} className="space-y-4">
    <div className='flex justify-between'>
          <h2 className="text-xl font-bold">Create Transaction</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID:</label>
        <input type="number" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">Book ID:</label>
        <input type="number" id="bookId" value={bookId} onChange={(e) => setBookId(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date:</label>
        <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="returned">Returned</option>
        </select>
      </div>
      <div>
        <label htmlFor='borrowStatus' className="block text-sm font-medium text-gray-700">Borrow Status</label>
        <select id="borrowStatus" value={borrowStatus} onChange={(e) => setBorrowStatus(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          <option value="pending">Pending</option>
          <option value="borrowing">Borrowing</option>
          <option value="returned">Returned</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Transaction</button>
    </form>
    </>
  );
};

export default CreateTransactionForm;