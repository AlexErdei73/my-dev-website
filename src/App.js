import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Block from "./components/Block";

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
			{post.content.length > 0 && <Block block={post.content[0]} />}
		</div>
	);
}

export default App;
