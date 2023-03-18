import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ErrorMsg from "./ErrorMsg";
import "./Signup.css";

const Signup = (props) => {
  const { loginState, submit, update, response, deleteErrors } = props;

  const { user: currentUser, success: loginSuccess } = loginState;
  const { success, errors } = response;

  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    return () => deleteErrors();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!success) return;
    navigate("/login");
  }, [success]);

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
        loginSuccess ? update(user) : submit(user);
      }}
      validate="true"
    >
      <h1 className="signup__title">
        {loginSuccess ? "Update User" : "Sign Up"}
      </h1>
      <label htmlFor="username">Username*</label>
      <input
        type="text"
        id="username"
        className="signup__username"
        onChange={handleChange}
        value={user.username}
        required
      />
      {!loginSuccess && <label htmlFor="password">Password*</label>}
      {!loginSuccess && (
        <input
          type="text"
          id="password"
          className="signup__password"
          onChange={handleChange}
          value={user.password}
          required
        />
      )}
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        className="signup__name"
        onChange={handleChange}
        value={user.name}
      />
      <label htmlFor="jobTitle">Job Title</label>
      <input
        type="text"
        id="jobTitle"
        className="signup__job-title"
        onChange={handleChange}
        value={user.jobTitle}
      />
      <label htmlFor="bio">Bio</label>
      <textarea
        name="bio"
        id="bio"
        cols="30"
        rows="10"
        className="submit_bio"
        onChange={handleChange}
        value={user.bio}
      />
      <button type="submit" className="signup__button">
        Submit
      </button>
      {errors &&
        errors.length !== 0 &&
        errors.map((error, index) => <ErrorMsg msg={error.msg} key={index} />)}
    </form>
  );
};

export default Signup;
