import React from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="flex flex-col max-w-7xl mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
