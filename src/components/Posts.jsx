import React from "react";
import "./Posts.css";
import PostsView from "./PostsView";

const Posts = (props) => {
  const { posts, setIndex, open, user, like } = props;

  return (
    <div className="posts">
      <h1 className="posts__title">Posts</h1>
      <PostsView
        posts={posts}
        setIndex={setIndex}
        open={open}
        user={user}
        like={like}
      />
    </div>
  );
};

export default Posts;
