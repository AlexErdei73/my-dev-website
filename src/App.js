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

function App() {
  const URL = "http://localhost:5000/posts/63dbaf9412e514c68d95c4ba";

  const [post, setPost] = useState({
    title: "...Loading",
    content: [],
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(URL, { mode: "cors" });
      const json = await response.json();
      setPost(json.post);
    }
    fetchData();
  }, []);

  function onSubmit(loginForm) {
    const { username, password } = loginForm;
    console.log(`username: ${username} password: ${password}`);
  }

  return (
    <div className="App">
      <Router>
        <AppMenu />
        <Routes>
          <Route path="/" element={<Post post={post} />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<Login submit={onSubmit} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
