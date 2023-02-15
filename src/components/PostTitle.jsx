import React from "react";
import "./PostTitle.css";

const PostTitle = (props) => {
  const { title } = props;
  return <h1 className="post-title__title">{title}</h1>;
};

export default PostTitle;
