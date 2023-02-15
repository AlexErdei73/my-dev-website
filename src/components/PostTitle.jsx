import React from "react";
import "./PostTitle.css";

const PostTitle = (props) => {
  const { title, edit } = props;
  return (
    <div className="post-title">
      <h1 className="post-title__title">{title}</h1>
      {edit && (
        <button type="button" className="post-title__btn-edit">
          Edit
        </button>
      )}
    </div>
  );
};

export default PostTitle;
