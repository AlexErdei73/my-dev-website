import React from "react";
import Card from "./Card";
import "./PostCard.css";

const PostCard = (props) => {
  const { post, onClick, edit, open, publish, user, like } = props;

  const { title, author, createdAt, updatedAt, likes } = post;

  const admin = user ? user.isAdmin : false;

  const isPostLiked = user ? likes.indexOf(user._id) !== -1 : false;

  return (
    <Card
      headerTextLeft={`By ${author.username}`}
      headerTextRight={`Likes: ${likes.length}`}
      footerTextLeft={`Created:${createdAt && createdAt.slice(0, 10)}`}
      footerTextRight={`Updated:${updatedAt && updatedAt.slice(0, 10)}`}
    >
      <div className="post-card__body">
        <div className="post-card__title">
          <h2>{title}</h2>
        </div>
        <div className="post-card__button-container">
          <button className="post-card__button" onClick={() => onClick(post)}>
            View
          </button>
          {!edit && user && user._id && (
            <button
              className="post-card__button"
              onClick={() => like(post._id, user._id)}
            >
              {isPostLiked ? "Unlike" : "Like"}
            </button>
          )}
          {edit && (
            <button className="post-card__button" onClick={() => publish(post)}>
              {post.published ? "Hide" : "Publish"}
            </button>
          )}
          {(edit || admin) && (
            <button className="post-card__button--delete-lg" onClick={open}>
              Delete
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
