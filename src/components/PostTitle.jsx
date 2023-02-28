import React, { useState, useEffect } from "react";
import ErrorMsg from "./ErrorMsg";
import "./PostTitle.css";

const PostTitle = (props) => {
  const { title, edit, submit, errors } = props;

  const [editing, setEditing] = useState(errors.length !== 0);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    setNewTitle(title);
    setEditing(errors.length !== 0);
  }, [title, errors]);

  function handleChange(event) {
    setNewTitle(event.target.value);
  }

  function cancel() {
    setNewTitle(title);
    setEditing(false);
  }

  return (
    <div className="post-title">
      {!editing && <h1 className="post-title__title">{title}</h1>}
      {!editing && edit && (
        <button
          type="button"
          className="post-title__btn-edit"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      )}
      {editing && (
        <>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setEditing(false);
              submit(newTitle);
            }}
            className="post-title__form"
          >
            <input
              type="text"
              value={newTitle}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
            {errors.length === 0 && (
              <button type="button" onClick={cancel}>
                Cancel
              </button>
            )}
            <div className="post-title__errors">
              {errors.map((error, index) => (
                <ErrorMsg key={index} msg={error.msg} />
              ))}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default PostTitle;
