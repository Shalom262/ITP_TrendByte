import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { employeeLogout } from "../../redux/employee/employeeSlice";
import { FiEye, FiTrash2, FiLogOut, FiUser, FiMail, FiPhone, FiHome } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

export default function ViewUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewUser = (id) => navigate(`/viewuserdetails/${id}`);
  
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      const response = await fetch(`/api/users/user/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError(err.message);
      console.error("Delete error:", err);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(employeeLogout());
    navigate("/employeeLogin");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-sm font-medium text-gray-700">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-sm font-medium text-red-600 p-4 bg-red-50 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-800 to-indigo-600 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white flex items-center">
            <FiUser className="mr-2" /> Employee Dashboard
          </h1>
          <button
            onClick={handleSignOut}
            className="flex items-center bg-white text-indigo-700 px-4 py-1.5 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-sm font-medium"
          >
            <FiLogOut className="mr-1.5" /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800 mb-3 md:mb-0">
            User Management
          </h1>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 text-sm" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FiUser className="mr-2" /> Username
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FiMail className="mr-2" /> Email
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FiPhone className="mr-2" /> Mobile
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FiHome className="mr-2" /> Address
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-indigo-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {user.username}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {user.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {user.mobile || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="max-w-[180px] truncate">
                          {user.address || "-"}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewUser(user._id)}
                            className="flex items-center text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded text-sm transition-colors"
                            title="View Details"
                          >
                            <FiEye className="mr-1" /> View
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="flex items-center text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded text-sm transition-colors"
                            title="Delete User"
                          >
                            <FiTrash2 className="mr-1" /> Delete
                          </button>
                          {user.deleteRequest && (
                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                              Delete Requested
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-3 text-center text-sm text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}