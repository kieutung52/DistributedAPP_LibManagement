import React, { useState, useEffect } from 'react';
import { getAllBook, deleteBookById } from '../../apis/BookApi';
import CreateBookForm from './ad_book/CreateBookForm';
import EditBookForm from './ad_book/EditBookForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BookManage = () => {
  const [books, setBooks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBooks = async () => {
    try {
      const bookData = await getAllBook();
      setBooks(bookData);
    } catch (err) {
      setError(err.message || "Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBookById(bookId);
        loadBooks();
        alert("Book deleted successfully!");
      } catch (error) {
        alert("Error deleting book: " + error.message);
      }
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowEditForm(true);
  };

  const handleCreateSuccess = (newBook) => {
    setShowCreateForm(false);
    loadBooks(); 
     alert("Book created successfully!");
  };

  const handleEditSuccess = (updatedBook) => {
    setShowEditForm(false);
    loadBooks();
     alert("Book updated successfully!");
  };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>;
    }

    if (error) {
        return <div  className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-red-500 text-xl">Error: {error}</div>
        </div>;
    }

  return (
    <>
      <Header />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Book Management</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out mb-4"
          >
            Add New Book
          </button>

          {showCreateForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
              <div className="relative p-8 border w-full max-w-md shadow-lg rounded-xl bg-white">
                <CreateBookForm onBookCreated={handleCreateSuccess} onClose={() => setShowCreateForm(false)} />
              </div>
            </div>
          )}

        {showEditForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative p-8 border w-full max-w-md shadow-lg rounded-xl bg-white">
            <EditBookForm book={selectedBook} onBookUpdated={handleEditSuccess} onClose={() => setShowEditForm(false)} />
            </div>
        </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
            <div key={book.id} className="bg-white rounded-xl shadow-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-1">Author: {book.author}</p>
            <p className="text-gray-600 mb-1">Publisher: {book.publisher}</p>
            <p className="text-gray-600 mb-4">Year: {book.year}</p>
            <div className="flex justify-end space-x-3">
                <button
                onClick={() => handleEdit(book)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                Edit
                </button>
                <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                Delete
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

export default BookManage;