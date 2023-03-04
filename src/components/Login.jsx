import React, { useState, useEffect } from "react";
import ErrorMsg from "./ErrorMsg";
import PostsView from "./PostsView";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const {
    submit,
    loginState,
    setLoginState,
    posts,
    logout,
    setPostIndex,
    setEdit,
    open,
    publish,
  } = props;
  const { user, msg } = loginState;

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (!loginState.success) return;
    const newUserPosts = posts.filter(
      (post) => post.author.username === loginState.user.username
    );
    setUserPosts(newUserPosts);
  }, [loginState, posts]);

  function handleChange(event) {
    const name = event.target.id;
    const newLoginState = JSON.parse(JSON.stringify(loginState));
    newLoginState.user[name] = event.target.value;
    setLoginState(newLoginState);
  }

  let jsx;
  if (loginState.success) {
    jsx = (
      <div className="logout">
        <h1 className="logout__title">Welcome {user.username}!</h1>
        <PostsView
          posts={userPosts}
          setIndex={(index) => {
            const postIndex = posts.findIndex(
              (post) => post._id === userPosts[index]._id
            );
            setPostIndex(postIndex);
            setEdit(true);
          }}
          edit={true}
          open={open}
          publish={publish}
        />

        <Link to="/new-post" className="logout__button--link">
          New Post
        </Link>

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
        {msg && <ErrorMsg msg={msg} />}
      </form>
    );
  return jsx;
};

export default Login;
