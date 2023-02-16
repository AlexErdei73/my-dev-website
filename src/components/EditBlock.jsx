import React from "react";

const EditBlock = (props) => {
  const { block, submit } = props;
  return (
    <form
      className="edit-block"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      {block.type === "subtitle" && (
        <input
          type="text"
          value={block.text}
          required="true"
          classname="edit-block__input"
        />
      )}
      {block.type !== "subtitle" && (
        <textarea className="edit-block__textarea">{block.text}</textarea>
      )}
      <button type="submit">Submit</button>
      <button type="button">Cancel</button>
    </form>
  );
};

export default EditBlock;
