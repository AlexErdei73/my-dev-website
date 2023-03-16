import React from "react";
import "./Author.css";

const Author = (props) => {
  const { author, ...rest } = props;

  const { username, name, jobTitle, bio } = author;

  return (
    <article {...rest}>
      <h1>{name ? name : username}</h1>
      <h2>{jobTitle}</h2>
      <p>{bio}</p>
    </article>
  );
};

export default Author;
