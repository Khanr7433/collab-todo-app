import React from "react";

const Header = () => {
  return (
    <header className="header flex justify-between align-center w-full max-w-7xl mx-auto p-4">
      <div className="container flex justify-between align-center w-full">
        <div className="logo">
          <h1>Collab Todo App</h1>
        </div>

        <nav className="navigation flex justify-between align-center">
          <ul className="flex">
            <li className="mx-2">Kanban Board</li>
            <li className="mx-2">Action Logs</li>
          </ul>
        </nav>

        <div className="flex justify-between align-center gap-1">
          <div className="username">
            <i className="fa fa-user"></i>
            <span className="username">Rashid Khan</span>
          </div>
          <button className="logout-button">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
