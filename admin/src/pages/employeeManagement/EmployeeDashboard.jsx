import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { employeeLogout } from "../../redux/employee/employeeSlice";
import { FiUsers, FiPackage, FiShoppingCart, FiCreditCard, FiMessageSquare, FiLogOut } from "react-icons/fi";
import { FaUserCog, FaBoxes, FaClipboardList, FaMoneyBillWave, FaComments } from "react-icons/fa";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(employeeLogout());
    navigate("/employeeLogin");
  };

  const dashboardCards = [
    {
      title: "User Management",
      description: "Manage and view user details",
      icon: <FaUserCog className="text-3xl text-indigo-600" />,
      path: "/viewuser",
      color: "bg-indigo-50",
      hoverColor: "hover:bg-indigo-100"
    },
    {
      title: "Product Management",
      description: "Add, edit, or view products",
      icon: <FaBoxes className="text-3xl text-emerald-600" />,
      path: "/viewproducts",
      color: "bg-emerald-50",
      hoverColor: "hover:bg-emerald-100"
    },
    {
      title: "Order Management",
      description: "View and manage customer orders",
      icon: <FaClipboardList className="text-3xl text-amber-600" />,
      path: "/viewcheckouts",
      color: "bg-amber-50",
      hoverColor: "hover:bg-amber-100"
    },
    {
      title: "Payment Management",
      description: "Manage payment details and transactions",
      icon: <FaMoneyBillWave className="text-3xl text-blue-600" />,
      path: "/viewcheckouts",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      title: "Feedback Management",
      description: "View and manage customer feedback",
      icon: <FaComments className="text-3xl text-purple-600" />,
      path: "/viewfeedback",
      color: "bg-purple-50",
      hoverColor: "hover:bg-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-indigo-600 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <FiUsers className="mr-3" /> Employee Dashboard
          </h1>
          <button
            onClick={handleSignOut}
            className="flex items-center bg-white text-indigo-700 px-6 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700 transition-all font-medium"
          >
            <FiLogOut className="mr-2" /> Sign Out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Console</h2>
          <p className="text-gray-600">Manage all aspects of your e-commerce platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className={`${card.color} ${card.hoverColor} p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer border border-gray-100`}
              onClick={() => navigate(card.path)}
            >
              <div className="flex items-start">
                <div className="mr-4">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-sm font-medium text-gray-500 hover:text-gray-700 transition">
                  View details →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-500 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-indigo-600">1,248</p>
            <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-500 mb-2">Active Products</h3>
            <p className="text-3xl font-bold text-emerald-600">356</p>
            <p className="text-sm text-green-600 mt-1">↑ 5 new this week</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-500 mb-2">Pending Orders</h3>
            <p className="text-3xl font-bold text-amber-600">24</p>
            <p className="text-sm text-red-600 mt-1">↓ 3% from yesterday</p>
          </div>
        </div>
      </main>
    </div>
  );
}