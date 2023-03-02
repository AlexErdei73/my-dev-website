import React from "react";
import "./Card.css";

const Card = (props) => {
  const {
    headerText,
    mainText,
    footerTextLeft,
    footerTextRight,
    onClick,
  } = props;

  return (
    <div className="card">
      <div className="card__header">
        <div>{headerText}</div>
      </div>
      <div className="card__body">
        <div className="card__title">
          <h2 className="card__title">{mainText}</h2>
        </div>
        <div className="card__button-container">
          <button className="card__button" onClick={onClick}>
            View
          </button>
          <button className="card__button--delete-lg">Delete</button>
        </div>
      </div>
      <div className="card__footer">
        <div>{footerTextLeft}</div>
        <div>{footerTextRight}</div>
      </div>
    </div>
  );
};

export default Card;
