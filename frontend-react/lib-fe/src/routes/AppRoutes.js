import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/admin/Dashboard";
import BookManage from "../pages/admin/BookManage";
import TransactionManage from "../pages/admin/TransactionManage";
import UserManage from "../pages/admin/UserManage";
import RequestBorrowBook from "../pages/admin/RequestBorrowBook";
import BookShelf from "../pages/user/BookShelf";
import Home from "../pages/user/Home";
import Transaction from "../pages/user/Transaction";
import BookBorrowed from "../pages/user/BookBorrowed";
import BookDetails from "../pages/user/BookDetails";
import { useAuth } from "../contexts/AuthContext"; 

const AppRoutes = () => {
  const { user, loading } = useAuth(); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Route cho admin */}
      {user?.data.role === 'admin' && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usermanage" element={<UserManage />} />
          <Route path="/bookmanage" element={<BookManage />} />
          <Route path="/transactionmanage" element={<TransactionManage />} />
          <Route path="/requestborrow" element={<RequestBorrowBook />} />
        </>
      )}

      {/* Route cho user */}
      {user?.data.role === 'user' && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/bookshelf" element={<BookShelf />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/bookborrowed" element={<BookBorrowed />} />
          <Route path="/bookdetails" element={<BookDetails />} />
        </>
      )}

      {/* Redirect nếu chưa đăng nhập hoặc không đúng role */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                user
                  ? user.data.role === "admin"
                    ? "/dashboard"
                    : "/home"
                  : "/login"
              }
            />
          }
        />
    </Routes>
  );
};

export default AppRoutes;