import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
