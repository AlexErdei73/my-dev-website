import React, { useState } from "react";
import "./EditBlock.css";

const EditBlock = (props) => {
  const { block, submit, cancel } = props;

  const [newBlock, setNewBlock] = useState(block);

  function numberOfLines(text) {
    return text.split("\n").length;
  }

  function textWithLinks(block) {
    const text = [];
    let previousPosition = 0;
    block.links.forEach((link) => {
      const nextTextPiece = block.text.slice(previousPosition, link.position);
      if (nextTextPiece) text.push(nextTextPiece);
      text.push(`[${link.description}](${link.url})`);
      previousPosition = link.position;
    });
    const nextTextPiece = block.text.slice(previousPosition, block.text.length);
    if (nextTextPiece) text.push(nextTextPiece);
    return text.join("");
  }

  function separateLinksFromText(textInput) {
    const textPieces = textInput.split("](");
    const links = [];
    let position = 0;
    textPieces.forEach((piece, index) => {
      const previousPiece = textPieces[index - 1];
      if (previousPiece && previousPiece.indexOf("[") !== -1) {
        const pieces = previousPiece.split("[");
        textPieces[index - 1] = pieces[0];
        position += pieces[0].length;
        links.push({ description: pieces[1] });
      }
      if (piece.indexOf(")") !== -1) {
        const pieces = piece.split(")");
        const link = links.pop();
        if (link) {
          link.url = pieces[0];
          link.position = position;
          links.push(link);
          textPieces[index] = pieces[1];
        }
      }
    });
    return { links: links, text: textPieces.join("") };
  }

  function handleChange(event) {
    const id = event.target.id;
    const copyBlock = { ...newBlock };
    if (id === "text" && newBlock.type === "paragraph") {
      const output = separateLinksFromText(event.target.value);
      copyBlock.text = output.text;
      copyBlock.links = output.links;
    } else {
      copyBlock[id] = event.target.value;
    }
    setNewBlock(copyBlock);
  }

  return (
    <form
      className="edit-block"
      onSubmit={(event) => {
        event.preventDefault();
        submit(newBlock);
      }}
    >
      <div className="input-container">
        {block.type === "subtitle" && (
          <input
            type="text"
            value={newBlock.text}
            onChange={handleChange}
            id="text"
            required="true"
            classname="edit-block__input"
          />
        )}
        {block.type !== "subtitle" && (
          <textarea
            className="edit-block__textarea"
            rows={numberOfLines(textWithLinks(newBlock))}
            value={textWithLinks(newBlock)}
            onChange={handleChange}
            id="text"
          ></textarea>
        )}
        <div className="type-area">
          <select
            name="type"
            id="type"
            value={newBlock.type}
            onChange={handleChange}
          >
            <option value="paragraph">Paragraph</option>
            <option value="subtitle">Subtitle</option>
            <option value="code">Code</option>
          </select>
          {block.type === "code" && (
            <select
              name="language"
              id="language"
              value={newBlock.language}
              onChange={handleChange}
            >
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
            </select>
          )}
        </div>
      </div>
      <div className="button-container">
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => {
            setNewBlock(block);
            cancel();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBlock;
