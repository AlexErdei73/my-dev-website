import React from "react";
import "./Card.css";

const Card = (props) => {
  const { headerText, footerTextLeft, footerTextRight, children } = props;

  return (
    <div className="card">
      <div className="card__header">
        <div>{headerText}</div>
      </div>
      {children}
      <div className="card__footer">
        <div>{footerTextLeft}</div>
        <div>{footerTextRight}</div>
      </div>
    </div>
  );
};

export default Card;
