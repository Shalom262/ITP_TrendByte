import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    mobile: currentUser.mobile,
    address: currentUser.address,
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!/^[A-Za-z]+$/.test(formData.username)) {
      errors.username = "Username should contain only letters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number should be exactly 10 digits.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") {
      const filteredValue = value.replace(/[^A-Za-z]/g, "");
      setFormData({ ...formData, [id]: filteredValue });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/users/user/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/users/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleViewOrders = () => navigate(`/orderspage/${currentUser._id}`);
  const handleViewCart = () => navigate(`/cartpage/${currentUser._id}`);

  return (
    <div className="bg-[#d7dfed] min-h-screen">
      <div className="p-10">
        <div className="max-w-xl mx-auto p-8 bg-gradient-to-r from-gray-100 to-gray-200 shadow-2xl rounded-3xl mt-10">
          <h1 className="text-4xl font-bold text-center mb-8 text-[#660708]">
            Profile
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                placeholder="Enter your username"
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660708] w-full"
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.username}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660708] w-full"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-medium mb-2"
              >
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                value={formData.mobile}
                placeholder="Enter your mobile number"
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660708] w-full"
              />
              {formErrors.mobile && (
                <p className="text-red-500 text-sm mt-1">{formErrors.mobile}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-gray-700 font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                placeholder="Enter your address"
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660708] w-full"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your new password"
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660708] w-full"
              />
            </div>
            <button
              disabled={loading}
              className="bg-[#660708] text-white py-3 rounded-xl uppercase hover:bg-[#8b0d13] shadow-md transition duration-300"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </form>

          <button
            onClick={handleViewOrders}
            className="w-full bg-blue-600 text-white py-3 rounded-xl uppercase mt-5 hover:bg-blue-700 shadow-md transition duration-300"
          >
            View Orders
          </button>

          <button
            onClick={handleViewCart}
            className="w-full bg-green-600 text-white py-3 rounded-xl uppercase mt-5 hover:bg-green-700 shadow-md transition duration-300"
          >
            View Cart
          </button>

          <div className="flex justify-between mt-6 gap-4">
            <button
              onClick={async () => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete your account?"
                );
                if (confirmDelete) {
                  try {
                    const res = await fetch(
                      `/api/users/request-delete/${currentUser._id}`,
                      { method: "POST" }
                    );
                    const data = await res.json();
                    alert(
                      data.success
                        ? "Delete request sent successfully!"
                        : "Failed to send delete request."
                    );
                  } catch (error) {
                    alert(
                      "An error occurred while sending the delete request."
                    );
                  }
                }
              }}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-xl hover:bg-red-200 transition font-medium"
            >
              Delete Account
            </button>

            <button
              onClick={handleSignOut}
              className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl hover:bg-yellow-200 transition font-medium"
            >
              Sign Out
            </button>
          </div>

          {error && <p className="text-red-700 mt-4">{error}</p>}
          {updateSuccess && (
            <p className="text-green-700 mt-4">User updated successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
}
