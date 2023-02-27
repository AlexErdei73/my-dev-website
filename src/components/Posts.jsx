import React from "react";
import "./Posts.css";
import PostsView from "./PostsView";

const Posts = (props) => {
  const { posts } = props;

  return (
    <div className="posts">
      <h1 className="posts__title">Posts</h1>;
      <PostsView posts={posts} />
    </div>
  );
};

export default Posts;
