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
import { login } from "./backend/backend";

function App() {
  const URL = "http://localhost:5000/posts/63dbaf9412e514c68d95c4ba";

  const [post, setPost] = useState({
    title: "...Loading",
    content: [],
  });

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
    async function fetchData() {
      const response = await fetch(URL, { mode: "cors" });
      const json = await response.json();
      setPost(json.post);
    }
    fetchData();
    //get loginState from localStorage
    const initialLoginState = JSON.parse(localStorage.getItem("loginState"));
    if (initialLoginState) setLoginState(initialLoginState);
  }, []);

  async function onSubmit(loginForm) {
    const { username, password } = loginForm;
    try {
      const response = await login(username, password);
      const newLoginState = JSON.parse(JSON.stringify(loginState));
      newLoginState.success = response.success;
      newLoginState.msg = response.msg;
      newLoginState.user.username = response.user.username;
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

  return (
    <div className="App">
      <Router>
        <AppMenu />
        <Routes>
          <Route path="/" element={<Post post={post} />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts />} />
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
