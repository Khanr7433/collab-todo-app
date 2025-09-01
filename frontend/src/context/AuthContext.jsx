import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored && stored !== "undefined") {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    cookies.set("token", userData.token, { path: "/", secure: true });
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    cookies.remove("token", { path: "/" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
