import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaBookOpen, FaBookReader, FaClipboardList, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to the Library!</h1>
          <p className="text-lg text-center text-gray-600 mb-10">Explore our collection and manage your borrowings.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Browse Books */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
              <FaBookOpen className="text-5xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Browse Books</h2>
              <Link to="/bookshelf" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                Go to Bookshelf <FaArrowRight className="inline-block ml-2" />
              </Link>
            </div>

            {/* Card 2: Borrowed Books */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
              <FaBookReader className="text-5xl text-green-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Borrowed Books</h2>
              <Link to="/bookborrowed" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                View Borrowed <FaArrowRight className="inline-block ml-2" />
              </Link>
            </div>

            {/* Card 3: Transactions */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
              <FaClipboardList className="text-5xl text-yellow-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transactions</h2>
              <Link to="/transaction" className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                View Transactions <FaArrowRight className="inline-block ml-2"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;