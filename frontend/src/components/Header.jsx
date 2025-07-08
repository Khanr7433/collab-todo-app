import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold hover:text-blue-400 transition-colors"
            >
              Collab Todo App
            </Link>
          </div>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/kanbanboard"
                className="hover:text-blue-400 transition-colors"
              >
                Kanban Board
              </Link>
              <Link
                to="/actionlog"
                className="hover:text-blue-400 transition-colors"
              >
                Action Logs
              </Link>
            </nav>
          )}

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">
                  Welcome, {user?.data?.user?.fullName}
                </span>
                <Link
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors"
                  to="/logout"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
                  to="/register"
                >
                  Register
                </Link>
                <Link
                  className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors"
                  to="/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-400 focus:outline-none focus:text-blue-400"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-700">
              {user && (
                <>
                  <Link
                    to="/kanbanboard"
                    className="block px-3 py-2 text-white hover:bg-gray-600 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Kanban Board
                  </Link>
                  <Link
                    to="/actionlog"
                    className="block px-3 py-2 text-white hover:bg-gray-600 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Action Logs
                  </Link>

                  <Link
                    to="/logout"
                    className="block px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Logout
                  </Link>
                </>
              )}
              {!user && (
                <>
                  <Link
                    to="/register"
                    className="block px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="block px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
