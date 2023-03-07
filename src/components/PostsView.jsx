import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import "./PostsView.css";
import { useNavigate } from "react-router-dom";

const PostsView = (props) => {
  const { posts, setIndex, edit, open, publish, admin } = props;
  const navigate = useNavigate();

  const [postIndex, setPostIndex] = useState(-1);

  function getIndex(searchedPost) {
    return posts.findIndex((post) => post._id === searchedPost._id);
  }

  function handleView(viewedPost) {
    setPostIndex(getIndex(viewedPost));
  }

  useEffect(() => {
    if (postIndex === -1) return;
    setIndex(postIndex);
    navigate("/post");
  }, [postIndex]);

  return (
    <div className="posts-view">
      {posts.map(
        (post) =>
          (post.published || edit) && (
            <PostCard
              key={post._id}
              post={post}
              onClick={handleView}
              edit={edit}
              open={() => {
                setIndex(getIndex(post));
                open();
              }}
              publish={publish}
              admin={admin}
            />
          )
      )}
    </div>
  );
};

export default PostsView;
