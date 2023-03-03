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
import {
	login,
	updatePost,
	updateBlock,
	getPosts,
	postPosts,
} from "./backend/backend";

function App() {
	const [showModal, setShowModal] = useState(true);

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

	const EMPTY_RESPONSE = {
		success: false,
		post: {
			author: "",
			title: "",
		},
		errors: [],
	};

	const [createPostResponse, setCreatePostResponse] = useState(EMPTY_RESPONSE);

	useEffect(() => {
		getPosts().then((response) => {
			setPosts(response.posts);
		});
		//get loginState from localStorage
		const initialLoginState = JSON.parse(localStorage.getItem("loginState"));
		if (initialLoginState) setLoginState(initialLoginState);
	}, []);

	useEffect(() => {
		const { success, post, errors } = createPostResponse;
		if (post.author === "" && post.title === "" && errors.length === 0) return;
		if (success) {
			const newPosts = JSON.parse(JSON.stringify(posts));
			post.author = { ...loginState.user };
			newPosts.push(post);
			setPosts(newPosts);
		}
	}, [createPostResponse]);

	async function onSubmit(loginForm) {
		const { username, password } = loginForm;
		try {
			const response = await login(username, password);
			const newLoginState = JSON.parse(JSON.stringify(loginState));
			newLoginState.success = response.success;
			newLoginState.msg = response.msg;
			newLoginState.token = response.token;
			newLoginState.user._id = response.user._id;
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
		const newPost = JSON.parse(JSON.stringify(posts[index]));
		const blockIndex = newPost.content.findIndex((bl) => bl._id === block._id);
		newPost.content[blockIndex] = { ...block };
		try {
			const response = await updateBlock(block, loginState.token);
			newPost.content[blockIndex].errors = response.errors;
		} catch (error) {
			newPost.content[blockIndex].errors = [{ msg: error.message }];
		} finally {
			const newPosts = [...posts];
			newPosts[index] = newPost;
			setPosts(newPosts);
		}
	}

	async function createPost(post) {
		post.author = loginState.user._id;
		try {
			const response = await postPosts(post, loginState.token);
			setCreatePostResponse(response);
		} catch (error) {
			setCreatePostResponse({
				success: false,
				post,
				errors: [{ msg: error.message }],
			});
		}
	}

	function deleteResponse() {
		setCreatePostResponse(EMPTY_RESPONSE);
	}

	return (
		<div className="App">
			<Router>
				<AppMenu />
				<Routes>
					<Route
						path="/post"
						element={
							<Post
								post={posts[index]}
								submit={submitTitle}
								updateBlock={submitBlock}
								errors={postErrors}
								setPost={(newPost) => setPosts({ ...posts, [index]: newPost })}
								token={loginState.token}
								edit={
									edit &&
									loginState.user.username === posts[index].author.username
								}
							/>
						}
					/>
					<Route path="/about" element={<About />} />
					<Route
						path="/"
						element={
							<Posts
								posts={posts}
								setIndex={(ind) => {
									setIndex(ind);
									setEdit(false);
								}}
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
							/>
						}
					/>
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/new-post"
						element={
							<NewPost
								submit={createPost}
								response={createPostResponse}
								deleteResponse={deleteResponse}
							/>
						}
					/>
				</Routes>
			</Router>

			<Modal show={showModal}>
				<div className="modal-body">
					<p>This is my modal to see if it works fine. Let's see.</p>
					<button
						type="button"
						onClick={() => setShowModal(false)}
						className="button">
						Close
					</button>
				</div>
			</Modal>
		</div>
	);
}

export default App;
