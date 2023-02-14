import React from "react";
import "./Login.css";

const Login = (props) => {
  const { submit, loginState, setLoginState, logout } = props;
  const { user, msg } = loginState;

  function handleChange(event) {
    const name = event.target.id;
    const newLoginState = JSON.parse(JSON.stringify(loginState));
    newLoginState.user[name] = event.target.value;
    setLoginState(newLoginState);
  }

  let jsx;
  if (loginState.success) {
    console.log("username: ", user.username);
    jsx = (
      <div className="logout">
        <h1 className="logout__title">Welcome {user.username}!</h1>
        <p>You are currently logged in.</p>
        <button type="button" onClick={logout} className="logout__button">
          Logout
        </button>
      </div>
    );
  } else
    jsx = (
      <form
        className="login"
        onSubmit={(event) => {
          event.preventDefault();
          submit(loginState.user);
        }}
        validate="true"
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
        {msg && <div className="login__message">{msg}</div>}
      </form>
    );
  return jsx;
};

export default Login;
