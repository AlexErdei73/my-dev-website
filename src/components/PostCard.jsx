import React from "react";
import "./PostCard.css";

const PostCard = (props) => {
  const { post, onClick, edit } = props;

  const { title, author, createdAt, updatedAt } = post;

  return (
    <div className="post-card">
      <div className="post-card__header">
        <div className="post-card__header-text">
          <div>By {author.username}</div>
        </div>
        {edit && (
          <button type="button" className="post-card__button--delete">
            X
          </button>
        )}
      </div>
      <div className="post-card__body">
        <div className="post-card__title">
          <h2 className="post-card__title">{title}</h2>
        </div>
        <button className="post-card__button" onClick={() => onClick(post)}>
          View
        </button>
      </div>
      <div className="post-card__footer">
        <div>Created:{createdAt && createdAt.slice(0, 10)}</div>
        <div>Updated:{updatedAt && updatedAt.slice(0, 10)}</div>
      </div>
    </div>
  );
};

export default PostCard;
