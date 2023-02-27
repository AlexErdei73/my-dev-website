import React from "react";

const PostCard = (props) => {
  const { post } = props;

  const { title, author, createdAt, updatedAt } = post;

  return (
    <div className="post-card">
      <div className="post-card__header">By {author.name}</div>
      <div className="post-card__body">
        <h1 className="post-card__title">{title}</h1>
      </div>
      <div className="post-card__footer">
        <div>Created At:{createdAt}</div>
        <div>Updated At:{updatedAt}</div>
      </div>
    </div>
  );
};

export default PostCard;
