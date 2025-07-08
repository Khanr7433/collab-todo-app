import React from "react";

const Header = () => {
  return (
    <header className="header flex justify-between align-center w-full max-w-7xl mx-auto p-4">
      <div className="container flex justify-between align-center w-full">
        <div className="logo">
          <h1>
            <a href="/">Collab Todo App</a>
          </h1>
        </div>

        <nav className="navigation flex justify-between align-center">
          <ul className="flex">
            <li className="mx-2">
              <a href="/kanbanboard">Kanban Board</a>
            </li>
            <li className="mx-2">
              <a href="/actionlog">Action Logs</a>
            </li>
          </ul>
        </nav>

        <div className="flex justify-between align-center gap-1">
          {/* <div className="username">
            <i className="fa fa-user"></i>
            <span className="username">Rashid Khan</span>
          </div> */}
          <div className="user-info flex items-center gap-2">
            <a className="button" href="/register">
              Register
            </a>
            <a className="button" href="/login">
              Login
            </a>
            <a className="button" href="/logout">
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
