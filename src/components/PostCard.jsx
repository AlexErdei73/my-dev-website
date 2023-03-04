import React from "react";
import Card from "./Card";
import "./PostCard.css";

const PostCard = (props) => {
  const { post, onClick, edit, open } = props;

  const { title, author, createdAt, updatedAt } = post;

  return (
    <Card
      headerText={`By ${author.username}`}
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
          {edit && (
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
