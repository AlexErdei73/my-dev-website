import "./AppMenu.css";
import { Link } from "react-router-dom";
import React from "react";

const AppMenu = (props) => {
  const LOGO = "Alex73 DEV";

  const { loginSuccess } = props;

  return (
    <nav className="nav">
      <ul>
        <li className="nav__logo">
          <Link to="/">{LOGO}</Link>
        </li>
        <li className="nav__item">
          <Link to="/about">About</Link>
        </li>
        <li className="nav__item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav__item">
          <Link to="/post">Post</Link>
        </li>
        <li className="nav__item">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav__item">
          <Link to="/signup">{loginSuccess ? "Update User" : "Sign Up"}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppMenu;
