import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { employeeLogout } from "../../redux/employee/employeeSlice";
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiHome, FiTrash2, FiLogOut } from "react-icons/fi";


export default function ViewUserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!id) {
        setError("User ID is undefined");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/users/user/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user details");
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleBack = () => navigate("/viewuser");
  
  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(employeeLogout());
    navigate("/employeeLogin");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Error</div>
          <div className="text-gray-600">{error}</div>
          <button
            onClick={handleBack}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-lg font-medium mb-2">User Not Found</div>
          <button
            onClick={handleBack}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-indigo-600 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center text-white hover:text-gray-200 transition"
          >
            <FiArrowLeft className="mr-2" /> Back to Users
          </button>
          <h1 className="text-xl font-bold text-white">Employee Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center bg-white text-indigo-700 px-4 py-1 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
          >
            <FiLogOut className="mr-1.5" /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FiUser className="mr-2 text-indigo-600" /> User Details
          </h1>

          {/* User details card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="p-6 space-y-6">
              {/* Username */}
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Username</div>
                <div className="text-lg text-gray-800">{user.username}</div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                  <FiMail className="mr-2 text-indigo-500" /> Email
                </div>
                <div className="text-lg text-gray-800">{user.email}</div>
              </div>

              {/* Mobile */}
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                  <FiPhone className="mr-2 text-indigo-500" /> Mobile
                </div>
                <div className="text-lg text-gray-800">{user.mobile || "Not provided"}</div>
              </div>

              {/* Address */}
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                  <FiHome className="mr-2 text-indigo-500" /> Address
                </div>
                <div className="text-lg text-gray-800">{user.address || "Not provided"}</div>
              </div>

              {/* Delete Request */}
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                  <FiTrash2 className="mr-2 text-indigo-500" /> Delete Request
                </div>
                <div className="text-lg text-gray-800">
                  {user.deleteRequest ? (
                    <span className="text-red-600">Yes</span>
                  ) : (
                    <span className="text-green-600">No</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}