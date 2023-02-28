import React, { useState } from "react";
import "./NewPost.css";

const NewPost = (props) => {
  const { submit } = props;

  const [title, setTitle] = useState("");

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  return (
    <form submit={submit} className="new-post">
      <h1 className="new-post__title">New Post</h1>
      <label htmlFor="title">Title*</label>
      <input
        type="text"
        id="title"
        required
        onChange={handleTitleChange}
        value={title}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewPost;
