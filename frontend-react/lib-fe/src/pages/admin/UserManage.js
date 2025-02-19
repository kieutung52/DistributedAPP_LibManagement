import React, { useState, useEffect } from 'react';
import { getAllUser, deleteUserById } from '../../apis/UserApi';
import CreateUserForm from './ad_user/CreateUserForm';
import EditUserForm from './ad_user/EditUserForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorMessage from '../../components/ErrorMessage'; 

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);
  const [editError, setEditError] = useState(null);

  const loadUsers = async () => {
    try {
      const userData = await getAllUser();
      setUsers(userData);
      setError(null);
    } catch (err) {
      setError("Failed to load users: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserById(userId);
        loadUsers();
        alert("User deleted successfully!");
        setDeleteError(null);
      } catch (error) {
        setDeleteError("Failed to delete user: " + error.message);
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditForm(true);
    setEditError(null);
  };

  const handleCreateSuccess = (newUser) => {
    setShowCreateForm(false);
    loadUsers();
    alert("User created successfully!");
    setCreateError(null);
  };

    const handleCreateClose = () => {
        setShowCreateForm(false);
        setCreateError(null);
    }
      const handleEditClose = () => {
        setShowEditForm(false);
        setEditError(null);
    }

  const handleEditSuccess = (updatedUser) => {
    setShowEditForm(false);
    loadUsers();
    alert("User updated successfully");
    setEditError(null);
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
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">User Management</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out mb-4"
          >
            Add New User
          </button>

          {showCreateForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
              <div className="relative p-8 border w-full max-w-md shadow-lg rounded-xl bg-white">
                <CreateUserForm onUserCreated={handleCreateSuccess} onClose={handleCreateClose} setCreateError={setCreateError}/>
                {createError && <ErrorMessage message={createError} />}
              </div>
            </div>
          )}

          {showEditForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
              <div className="relative p-8 border w-full max-w-md shadow-lg rounded-xl bg-white">
                <EditUserForm user={selectedUser} onUserUpdated={handleEditSuccess} onClose={handleEditClose} setEditError={setEditError}/>
                {editError && <ErrorMessage message={editError} />}
              </div>
            </div>
          )}

           {deleteError && <ErrorMessage message={deleteError} />}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
                <p className="text-xl font-semibold text-gray-800 mb-2">{user.name}</p>
                <p className="text-gray-600 mb-1">Username: {user.username}</p>
                <p className="text-gray-600 mb-1">Email: {user.email}</p>
                <p className="text-gray-600 mb-4">Role: {user.role}</p>
                <div className="flex justify-end space-x-3">
                  <button onClick={() => handleEdit(user)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">Delete</button>
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

export default UserManage;