import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Post from "./components/Post";

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

	return (
		<div className="App">
			<Post post={post} />
		</div>
	);
}

export default App;
