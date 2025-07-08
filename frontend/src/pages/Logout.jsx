import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authApi";
import toast from "react-hot-toast";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logoutUser();
      toast.success("Logged out successfully!");
      logout();
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Logout failed. Please try again.";
      toast.error(errorMessage);
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 rounded shadow-md bg-gray-900 w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4 text-white text-center">
            Logout
          </h1>
          <p className="text-gray-400 text-center mb-6">
            Are you sure you want to logout?
          </p>

          <div className="space-y-3">
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`w-full ${
                loading ? "bg-red-700" : "bg-red-600"
              } text-white p-2 rounded-md hover:bg-red-700 transition-colors`}
            >
              {loading ? "Logging out..." : "Yes, Logout"}
            </button>

            <button
              onClick={handleCancel}
              disabled={loading}
              className="w-full bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
