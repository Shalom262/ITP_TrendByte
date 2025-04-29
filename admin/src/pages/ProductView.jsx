import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductView() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/api/product/details/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`/api/feedback/product/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch feedback");
        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) setQuantity(value);
  };

  const handleAddToCart = async () => {
    if (!currentUser) {
      alert("Please sign in to add products to your cart.");
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: product._id, quantity, userId: currentUser._id }),
      });

      if (response.ok) {
        alert("Product added to cart successfully!");
        navigate(`/cartpage/${currentUser._id}`);
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  if (loading) return <div className="text-center mt-8 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!product) return <div className="text-center mt-8">Product not found.</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10 bg-white p-8 rounded-3xl shadow-2xl">
        {/* Enlarged Product Image */}
        <div className="lg:w-1/2 w-full h-full">
          <img
            src={`http://localhost:3000/uploads/${product.image}`}
            alt={product.productName}
            className="w-full h-[600px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">{product.productName}</h2>
            <p className="text-2xl text-[#b10032] font-semibold mb-4">${product.price}</p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.description}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-32 p-2 border border-gray-300 rounded-lg text-gray-800 shadow-sm"
            />
            <button
              onClick={handleAddToCart}
              className="bg-[#660708] text-white px-10 py-3 rounded-lg hover:bg-[#7f0a10] transition duration-300 shadow-md"
            >
              Add to Cart
            </button>
          </div>

          {/* Feedback Section */}
          {feedback.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customer Feedback</h3>
              <div className="space-y-4">
                {feedback.map((fb) => (
                  <div key={fb._id} className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200">
                    <p className="font-semibold text-gray-800">
                      {fb.userId?.username || "Anonymous"} says:
                    </p>
                    <p className="text-gray-600 mt-1">{fb.feedback}</p>
                    <div className="flex items-center mt-2 text-yellow-500 font-medium">
                      ★ <span className="ml-1">{fb.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
