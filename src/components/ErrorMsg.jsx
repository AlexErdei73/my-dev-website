import React from "react";
import "./ErrorMsg.css";

const ErrorMsg = (props) => {
  const { msg } = props;
  return <p className="error-msg">{msg}</p>;
};

export default ErrorMsg;
