import React from "react";
import Card from "./Card";
import "./Modal.css";

const Modal = (props) => {
  const { show, variant, children } = props;

  return (
    <div className={`modal ${show && "show"}`}>
      <Card
        variant={variant}
        headerText="Hello Alex!"
        footerTextLeft="Close me with the button!"
      >
        {children}
      </Card>
    </div>
  );
};

export default Modal;
