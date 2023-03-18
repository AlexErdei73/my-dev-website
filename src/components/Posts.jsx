import React from "react";
import "./Posts.css";
import PostsView from "./PostsView";

const Posts = (props) => {
  const { posts, setIndex, open, user } = props;

  return (
    <div className="posts">
      <h1 className="posts__title">Posts</h1>
      <PostsView posts={posts} setIndex={setIndex} open={open} user={user} />
    </div>
  );
};

export default Posts;
