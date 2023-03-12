import React, { useState } from "react";
import ErrorMsg from "./ErrorMsg";
import "./Signup.css";

const Signup = (props) => {
  const { currentUser, msg } = props;

  const [user, setUser] = useState(currentUser);

  function handleChange(event) {
    const fieldInput = event.target;
    const newUser = {
      ...user,
      [fieldInput.id]: fieldInput.value,
    };
    setUser(newUser);
  }

  return (
    <form
      className="signup"
      onSubmit={(event) => {
        event.preventDefault();
        return;
      }}
      validate="true"
    >
      <h1 className="signup__title">Sign Up</h1>
      <label htmlFor="username">Username*</label>
      <input
        type="text"
        id="username"
        className="signup__username"
        onChange={handleChange}
        value={user.username}
        required
      />
      <label htmlFor="password">Password*</label>
      <input
        type="text"
        id="password"
        className="signup__password"
        onChange={handleChange}
        value={user.password}
        required
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        className="signup__username"
        onChange={handleChange}
        value={user.name}
      />
      <label htmlFor="bio">Bio</label>
      <textarea
        name="bio"
        id="bio"
        cols="30"
        rows="10"
        className="submit_textarea"
        onChange={handleChange}
      >
        {user.bio}
      </textarea>
      <button type="submit" className="signup__button">
        Sign Up
      </button>
      {msg && <ErrorMsg msg={msg} />}
    </form>
  );
};

export default Signup;
