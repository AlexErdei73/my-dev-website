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
} from "./backend/backend";

function App() {
	const [showModal, setShowModal] = useState(false);

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
		type: "POST",
		post: {
			author: "",
			title: "",
		},
		errors: [],
	};

	const [response, setResponse] = useState(EMPTY_RESPONSE);

	useEffect(() => {
		getPosts().then((response) => {
			setPosts(response.posts);
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
				newLoginState.user._id = response.user._id;
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

	function deleteResponse() {
		setResponse(EMPTY_RESPONSE);
	}

	function openModal() {
		setShowModal(true);
	}

	function closeModal() {
		setShowModal(false);
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
								open={openModal}
							/>
						}
					/>
					<Route path="/signup" element={<Signup />} />
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
				footer="Permanent data loss">
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
							className="modal-body__button--delete">
							Delete
						</button>
						<button
							type="button"
							onClick={() => {
								deleteResponse();
								closeModal();
							}}
							className="modal-body__button">
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default App;
