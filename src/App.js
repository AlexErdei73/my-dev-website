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
import NewPost from "./components/NewPost";
import Modal from "./components/Modal";
import ErrorMsg from "./components/ErrorMsg";
import {
  login,
  updatePost,
  updateBlock,
  getPosts,
  postPosts,
  deletePosts,
  createUser,
  updateUser,
} from "./backend/backend";
import ErrorDlg from "./components/ErrorDlg";

function App() {
  const ABOUT_ID = "6404bca2160e826767e36aa3";

  const [showModal, setShowModal] = useState(false);

  const [showErrorDlg, setShowErrorDlg] = useState(false);

  const [index, setIndex] = useState(0);

  const [edit, setEdit] = useState(false);

  const [posts, setPosts] = useState([
    {
      title: "...Loading",
      author: {
        username: "...Loading",
      },
      content: [],
    },
  ]);

  const [aboutPost, setAboutPost] = useState({
    title: "...Loading",
    author: {
      username: "...Loading",
    },
    content: [],
  });

  const [postErrors, setPostErrors] = useState([]);

  const [loginState, setLoginState] = useState({
    success: false,
    user: {
      username: "",
      password: "",
      isAdmin: false,
      name: "",
      jobTitle: "",
      bio: "",
    },
    token: "",
    msg: "",
  });

  const EMPTY_RESPONSE = {
    success: false,
    type: "POST",
    post: {
      author: "",
      title: "",
    },
    errors: [],
  };

  const [response, setResponse] = useState(EMPTY_RESPONSE);

  const [publishError, setPublishError] = useState({ msg: "" });

  const [signupErrors, setSignupErrors] = useState([]);

  useEffect(() => {
    getPosts().then((response) => {
      setPosts(response.posts);
      setAboutPost(response.posts.find((post) => post._id === ABOUT_ID));
    });
    //get loginState from localStorage
    const initialLoginState = JSON.parse(localStorage.getItem("loginState"));
    if (initialLoginState) setLoginState(initialLoginState);
  }, []);

  useEffect(() => {
    const { success, type, post, errors } = response;
    if (post.author === "" && post.title === "" && errors.length === 0) return;
    if (type === "POST" && success) {
      const newPosts = JSON.parse(JSON.stringify(posts));
      post.author = { ...loginState.user };
      newPosts.push(post);
      setPosts(newPosts);
    }
    if (type === "DELETE" && success) {
      const newPosts = JSON.parse(JSON.stringify(posts));
      newPosts.splice(index, 1);
      console.log(newPosts);
      setPosts(newPosts);
      setIndex(0);
      deleteResponse();
      closeModal();
    }
  }, [response]);

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
        newLoginState.user = { ...response.user };
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

  function handleUserErrors(user, errors) {
    user._id = "";
    user.isAdmin = false;
    setLoginState({
      success: false,
      user,
      errors: [],
    });
    setSignupErrors(errors);
  }

  async function submitUser(user) {
    try {
      const response = await createUser(user);
      logout();
      if (!response.success) {
        handleUserErrors(user, response.errors);
      } else {
        setSignupErrors([]);
        onSubmit(user);
      }
    } catch (error) {
      handleUserErrors(user, [{ msg: error.message }]);
    }
  }

  async function modifyUser(user) {
    try {
      const response = await updateUser(user, loginState.token);
      if (!response.success) {
        setSignupErrors(response.errors);
      } else {
        setSignupErrors([]);
        const newLoginState = JSON.parse(JSON.stringify(loginState));
        newLoginState.user = user;
        setLoginState(newLoginState);
      }
    } catch (error) {
      setSignupErrors([{ msg: error.message }]);
    }
  }

  function logout() {
    const newLoginState = {
      success: false,
      user: {
        _id: "",
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
    const newPost = { ...newPosts[index] };
    newPost.title = title;
    newPosts[index] = newPost;
    setPosts(newPosts);
    try {
      const response = await updatePost(newPost, loginState.token);
      setPostErrors(response.errors);
    } catch (error) {
      setPostErrors([{ msg: error.message }]);
    }
  }

  async function submitBlock(block) {
    const newPosts = JSON.parse(JSON.stringify(posts));
    const newPost = { ...newPosts[index] };
    const blockIndex = newPost.content.findIndex((bl) => bl._id === block._id);
    newPost.content[blockIndex] = { ...block };
    try {
      const response = await updateBlock(block, loginState.token);
      newPost.content[blockIndex].errors = response.errors;
    } catch (error) {
      newPost.content[blockIndex].errors = [{ msg: error.message }];
    } finally {
      setPosts(newPosts);
    }
  }

  async function createPost(post) {
    post.author = loginState.user._id;
    try {
      const response = await postPosts(post, loginState.token);
      // The next line will deal with unauthorized access when response do not have post
      if (!response.post) response.post = post;
      setResponse({
        ...response,
        type: "POST",
      });
    } catch (error) {
      setResponse({
        success: false,
        type: "POST",
        post,
        errors: [{ msg: error.message }],
      });
    }
  }

  async function erasePost(post) {
    try {
      const response = await deletePosts(post, loginState.token);
      setResponse({
        ...response,
        post,
        type: "DELETE",
      });
    } catch (error) {
      setResponse({
        success: false,
        type: "DELETE",
        post,
        errors: [{ msg: error.message }],
      });
    }
  }

  async function togglePublish(post) {
    post.published = !post.published;
    try {
      const response = await updatePost(post, loginState.token);
      if (response.success) {
        const newPosts = JSON.parse(JSON.stringify(posts));
        const newPost = newPosts.find((newPost) => newPost._id === post._id);
        newPost.published = post.published;
        setPosts(newPosts);
      } else {
        throw new Error(response.errors[0].msg);
      }
    } catch (error) {
      openErrorDlg({ msg: error.message });
    }
  }

  function deleteResponse() {
    setResponse(EMPTY_RESPONSE);
  }

  function deleteErrors() {
    setSignupErrors([]);
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function openErrorDlg(error) {
    setPublishError(error);
    setShowErrorDlg(true);
  }

  function closeErrorDlg() {
    setPublishError({ msg: "" });
    setShowErrorDlg(false);
  }

  return (
    <div className="App">
      <Router>
        <AppMenu loginSuccess={loginState.success} />
        <Routes>
          <Route
            path="/post"
            element={
              <Post
                post={posts[index]}
                submit={submitTitle}
                updateBlock={submitBlock}
                errors={postErrors}
                setPost={(newPost) => {
                  const modifiedPosts = [...posts];
                  modifiedPosts[index] = newPost;
                  setPosts(modifiedPosts);
                }}
                token={loginState.token}
                edit={
                  edit &&
                  loginState.user.username === posts[index].author.username
                }
              />
            }
          />
          <Route path="/about" element={<About post={aboutPost} />} />
          <Route
            path="/"
            element={
              <Posts
                posts={posts}
                setIndex={(ind) => {
                  setIndex(ind);
                  setEdit(false);
                }}
                admin={loginState.user.isAdmin}
                open={openModal}
                publish={togglePublish}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                submit={onSubmit}
                loginState={loginState}
                setLoginState={setLoginState}
                logout={logout}
                posts={posts}
                setPostIndex={setIndex}
                setEdit={setEdit}
                open={openModal}
                publish={togglePublish}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                currentUser={loginState.user}
                submit={submitUser}
                update={modifyUser}
                errors={signupErrors}
                loginSuccess={loginState.success}
                deleteErrors={deleteErrors}
              />
            }
          />
          <Route
            path="/new-post"
            element={
              <NewPost
                submit={createPost}
                response={response}
                deleteResponse={deleteResponse}
              />
            }
          />
        </Routes>
      </Router>

      <Modal
        show={showModal}
        variant="danger"
        header="Danger!"
        footer="Permanent data loss"
      >
        <div className="modal-body">
          {response.errors.length === 0 && (
            <p>You are going to delete the post permanently. Are you sure?</p>
          )}
          {response.errors.length !== 0 && (
            <ErrorMsg msg={response.errors[0].msg} />
          )}
          <div className="modal-body__button-container">
            <button
              type="button"
              onClick={() => erasePost(posts[index])}
              className="modal-body__button--delete"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                deleteResponse();
                closeModal();
              }}
              className="modal-body__button"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <ErrorDlg
        open={showErrorDlg}
        close={closeErrorDlg}
        error={publishError}
      />
    </div>
  );
}

export default App;
