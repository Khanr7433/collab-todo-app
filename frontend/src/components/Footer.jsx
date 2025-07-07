import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex justify-center align-center w-full max-w-7xl mx-auto p-4">
      <div className="container flex justify-center align-center w-full">
        <p>&copy; {year} Collab Todo App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
