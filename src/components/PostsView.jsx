import React from "react";
import PostCard from "./PostCard";
import "./PostsView.css";

const PostsView = (props) => {
  const { posts } = props;

  return (
    <div className="posts-view">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostsView;
