import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ErrorMsg from "./ErrorMsg";
import "./NewPost.css";

const NewPost = (props) => {
  const { submit, response, deleteResponse } = props;
  const { post, errors } = response;

  const [title, setTitle] = useState(post.title);

  const navigate = useNavigate();

  useEffect(() => {
    if (response.success) {
      deleteResponse();
      navigate("/login");
    } else {
      setTitle(response.post.title);
    }
  }, [response]);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function submitForm(event) {
    event.preventDefault();
    submit({ title: title });
  }

  return (
    <form onSubmit={submitForm} className="new-post">
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
      {errors.length > 0 && <ErrorMsg msg={errors[0].msg} />}
    </form>
  );
};

export default NewPost;
