import React, { useState, useEffect } from 'react';
import { getAllBook } from '../../apis/BookApi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookDetails from './BookDetails';

const BookShelf = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null); 
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookData = await getAllBook();
        setBooks(bookData);
      } catch (err) {
        setError(err.message || "Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);
  const handleBookClick = (book) => {
        setSelectedBook(book);
        setShowDetails(true);
    };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (error) {
     return <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-red-500 text-xl">Error: {error}</div>
        </div>;
  }

  return (
    <>
      <Header />
        <div className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Book Shelf</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow-md p-6 relative transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
                  <p className="text-gray-600 mb-1">Author: {book.author}</p>
                  <p className="text-gray-600 mb-4">Publisher: {book.publisher}</p>
                  {/* <Link to={`/bookdetails/${book.id}`} className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                      Book Details
                  </Link> */}
                  <button onClick={() => handleBookClick(book)}  className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                    Book Details
                  </button>
                </div>
              ))}
            </div>
          </div>
          {showDetails && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="relative p-8 border w-full max-w-md shadow-lg rounded-xl bg-white">
                         <BookDetails book={selectedBook} onClose={() => setShowDetails(false)} />
                    </div>
                </div>
            )}
        </div>
      <Footer />
    </>
  );
};

export default BookShelf;