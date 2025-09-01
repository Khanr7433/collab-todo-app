import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authApi";
import toast from "react-hot-toast";

const Register = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser(userData);
      toast.success("Registration successful! Please login.");
      setUserData({ fullName: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm">
          Or{" "}
          <Link
            to="/login"
            className="font-medium hover:text-blue-600 transition-all"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border shadow-lg py-6 px-4 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-400"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={userData.fullName}
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
                  disabled={loading}
                  className="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-600 text-sm sm:text-base transition-all"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  disabled={loading}
                  className="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-600 text-sm sm:text-base transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  disabled={loading}
                  className="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-600 text-sm sm:text-base transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md hover:text-blue-600 hover:border-blue-600 focus:outline-none transition-all"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
