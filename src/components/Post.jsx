import React from "react";
import Block from "./Block";

const Post = (props) => {
	const { title, author, content, comments } = props.post;
	return (
		<article>
			<h1>{title}</h1>
			{content.map((block) => (
				<Block key={block._id} block={block} />
			))}
		</article>
	);
};

export default Post;
