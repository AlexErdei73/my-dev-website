import React from "react";
import Block from "./Block";
import "./Post.css";

const Post = (props) => {
  const { title, author, content, comments } = props.post;
  return (
    <article className="post">
      <h1 className="post__title">{title}</h1>
      {content.map((block) => (
        <Block key={block._id} block={block} />
      ))}
    </article>
  );
};

export default Post;
