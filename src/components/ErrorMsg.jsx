import React from "react";
import "./ErrorMsg.css";

const ErrorMsg = (props) => {
  const { msg } = props;
  return <div className="error-msg">{msg}</div>;
};

export default ErrorMsg;
