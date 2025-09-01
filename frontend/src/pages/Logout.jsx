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
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border shadow-lg py-6 px-4 sm:rounded-lg sm:px-10">
          <h1 className="text-2xl font-bold mb-4 text-center">Logout</h1>
          <p className="text-center mb-6">Are you sure you want to logout?</p>

          <div className="space-y-3">
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full py-2 px-4 border rounded-md text-sm font-medium hover:text-blue-600 hover:border-blue-600 focus:outline-none transition-all"
            >
              {loading ? "Logging out..." : "Yes, Logout"}
            </button>

            <button
              onClick={handleCancel}
              disabled={loading}
              className="w-full py-2 px-4 border rounded-md text-sm font-medium hover:text-blue-600 hover:border-blue-600 focus:outline-none transition-all"
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
