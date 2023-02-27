import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Post from "./components/Post";
import AppMenu from "./components/AppMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Posts from "./components/Posts";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {
  login,
  updatePost,
  updateBlock,
  getPost,
  getPosts,
} from "./backend/backend";

function App() {
  const ID = "63dbaf9412e514c68d95c4ba";

  const [posts, setPosts] = useState([
    {
      title: "...Loading",
      author: {
        username: "...Loading",
      },
      content: [],
    },
  ]);

  const [postErrors, setPostErrors] = useState([]);

  const [loginState, setLoginState] = useState({
    success: false,
    user: {
      username: "",
      password: "",
    },
    token: "",
    msg: "",
  });

  useEffect(() => {
    getPosts().then((response) => {
      setPosts(response.posts);
    });
    //get loginState from localStorage
    const initialLoginState = JSON.parse(localStorage.getItem("loginState"));
    if (initialLoginState) setLoginState(initialLoginState);
  }, []);

  useEffect(() => {
    console.log(postErrors);
  }, [postErrors]);

  async function onSubmit(loginForm) {
    const { username, password } = loginForm;
    try {
      const response = await login(username, password);
      const newLoginState = JSON.parse(JSON.stringify(loginState));
      newLoginState.success = response.success;
      newLoginState.msg = response.msg;
      newLoginState.token = response.token;
      if (response.success) {
        //user logged in successfully
        newLoginState.user.password = ""; //Do not store password as it is sensitive information!!!
        //Store newLoginState, which contains the token, in localStorage
        localStorage.setItem("loginState", JSON.stringify(newLoginState));
      }
      setLoginState(newLoginState);
    } catch (error) {
      console.error(error);
      const newLoginState = { ...loginState };
      newLoginState.msg = error.message;
      setLoginState(newLoginState);
    }
  }

  function logout() {
    const newLoginState = {
      success: false,
      user: {
        username: "",
        password: "",
      },
      token: "",
      msg: "",
    };
    localStorage.removeItem("loginState");
    setLoginState(newLoginState);
  }

  async function submitTitle(title) {
    const newPosts = [...posts];
    const newPost = { ...newPosts[0] };
    newPost.title = title;
    newPosts[0] = newPost;
    setPosts(newPosts);
    try {
      const response = await updatePost(newPost, loginState.token);
      setPostErrors(response.errors);
    } catch (error) {
      setPostErrors([{ msg: error.message }]);
    }
  }

  async function submitBlock(block) {
    const newPost = JSON.parse(JSON.stringify(posts[0]));
    const index = newPost.content.findIndex((bl) => bl._id === block._id);
    newPost.content[index] = { ...block };
    try {
      const response = await updateBlock(block, loginState.token);
      newPost.content[index].errors = response.errors;
    } catch (error) {
      newPost.content[index].errors = [{ msg: error.message }];
    } finally {
      const newPosts = [...posts];
      newPosts[0] = newPost;
      setPosts(newPosts);
    }
  }

  return (
    <div className="App">
      <Router>
        <AppMenu />
        <Routes>
          <Route
            path="/"
            element={
              <Post
                post={posts[0]}
                submit={submitTitle}
                updateBlock={submitBlock}
                errors={postErrors}
                setPost={(newPost) => setPosts({ ...posts, [0]: newPost })}
                token={loginState.token}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts posts={posts} />} />
          <Route
            path="/login"
            element={
              <Login
                submit={onSubmit}
                loginState={loginState}
                setLoginState={setLoginState}
                logout={logout}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
