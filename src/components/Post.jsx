import React from "react";
import Block from "./Block";
import PostTitle from "./PostTitle";
import "./Post.css";

const Post = (props) => {
  const { title, author, content, comments } = props.post;
  return (
    <article className="post">
      <PostTitle title={title} />
      {content.map((block) => (
        <Block key={block._id} block={block} />
      ))}
    </article>
  );
};

export default Post;
