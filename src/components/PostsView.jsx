import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import "./PostsView.css";
import { useNavigate } from "react-router-dom";

const PostsView = (props) => {
  const { posts, setIndex } = props;
  const navigate = useNavigate();

  const [postIndex, setPostIndex] = useState(-1);

  function handleView(viewedPost) {
    const index = posts.findIndex((post) => post._id === viewedPost._id);
    setPostIndex(index);
  }

  useEffect(() => {
    if (postIndex === -1) return;
    setIndex(postIndex);
    navigate("/post");
  }, [postIndex]);

  return (
    <div className="posts-view">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onClick={handleView} />
      ))}
    </div>
  );
};

export default PostsView;
