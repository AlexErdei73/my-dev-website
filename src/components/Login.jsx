import React, { useState } from "react";
import "./Login.css";

const Login = (props) => {
  const { submit } = props;

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const name = event.target.id;
    const newState = {
      ...state,
      [name]: event.target.value,
    };
    setState(newState);
  }

  return (
    <form
      className="login"
      onSubmit={(event) => {
        event.preventDefault();
        submit(state);
      }}
    >
      <h1 className="login__title">Login</h1>
      <label htmlFor="username">Username*</label>
      <input
        type="text"
        id="username"
        className="login__username"
        onChange={handleChange}
        value={state.username}
      />
      <label htmlFor="password">Password*</label>
      <input
        type="text"
        id="password"
        className="login__password"
        onChange={handleChange}
        value={state.password}
      />
      <button type="submit" className="login__button">
        Login
      </button>
    </form>
  );
};

export default Login;
