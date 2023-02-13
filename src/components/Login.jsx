import React from "react";
import "./Login.css";

const Login = (props) => {
  const { submit, loginState, setLoginState } = props;
  const { user } = loginState;

  function handleChange(event) {
    const name = event.target.id;
    const newLoginState = JSON.parse(JSON.stringify(loginState));
    newLoginState.user[name] = event.target.value;
    setLoginState(newLoginState);
  }

  let jsx;
  if (loginState.success)
    jsx = (
      <h1 className="login">{`${loginState.user.username} is logged in!`}</h1>
    );
  else
    jsx = (
      <form
        className="login"
        onSubmit={(event) => {
          event.preventDefault();
          submit(loginState.user);
        }}
        validate
      >
        <h1 className="login__title">Login</h1>
        <label htmlFor="username">Username*</label>
        <input
          type="text"
          id="username"
          className="login__username"
          onChange={handleChange}
          value={user.username}
          required
        />
        <label htmlFor="password">Password*</label>
        <input
          type="text"
          id="password"
          className="login__password"
          onChange={handleChange}
          value={user.password}
          required
        />
        <button type="submit" className="login__button">
          Login
        </button>
      </form>
    );
  return jsx;
};

export default Login;
