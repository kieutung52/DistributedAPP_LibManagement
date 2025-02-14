import React, { useState, useEffect } from 'react';
import { editBookById } from '../../../apis/BookApi';

const EditBookForm = ({ book, onBookUpdated, onClose }) => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (book) {
      setIsbn(book.isbn);
      setTitle(book.title);
      setAuthor(book.author);
      setPublisher(book.publisher);
      setYear(book.year);
      setQuantity(book.quantity);
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = await editBookById(book.id, isbn, title, author, publisher, year, quantity);
      onBookUpdated(updatedBook);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update book.");
    }
  };

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className='flex justify-between'>
          <h2 className="text-xl font-bold">Edit Book</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">ISBN:</label>
          <input type="text" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author:</label>
          <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">Publisher:</label>
          <input type="text" id="publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year:</label>
          <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Update Book
        </button>
      </form>
    </>
  );
};

export default EditBookForm;