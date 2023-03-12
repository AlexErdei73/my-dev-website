import React, { useState, useEffect } from "react";
import ErrorMsg from "./ErrorMsg";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = (props) => {
  const { currentUser, submit, errors, loginSuccess } = props;

  const [user, setUser] = useState(currentUser);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loginSuccess) return;
    setSuccess(true);
  }, [loginSuccess]);

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
        submit(user);
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
      >
        {user.bio}
      </textarea>
      <button type="submit" className="signup__button">
        Sign Up
      </button>
      {errors &&
        errors.length !== 0 &&
        errors.map((error) => <ErrorMsg msg={error.msg} />)}
    </form>
  );
};

export default Signup;
