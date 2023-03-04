import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import EditBlock from "./EditBlock";
import "./Block.css";

const Block = (props) => {
  const { block, edit, submit, remove } = props;
  const { type, language, text, links, errors } = block;

  const [editing, setEditing] = useState(false);

  let jsx;
  const showEditing = editing || (errors && errors.length !== 0);
  switch (type) {
    case "paragraph":
      function addLinks(text, links) {
        let shift = 0; //Shift the position from the original with the combined lengths of the insertations
        links
          .map((link) => {
            return {
              text: `<a href="${link.url}">${link.description}</a>`,
              pos: link.position,
            };
          })
          .filter((link) => link.pos >= 0) //Filter out links with incorrect position to avoid unwanted behaviour
          .sort((link1, link2) => link1.pos - link2.pos) //Sort links to increasing position to avoid unwanted behaviour
          .forEach((link) => {
            //Insert links in text
            const position = link.pos + shift;
            const firstTextPart = text.slice(0, position) + " ";
            const lastTextPart = " " + text.slice(position, text.length + 1);
            text = firstTextPart + link.text + lastTextPart;
            shift = shift + link.text.length + 2;
          });
        return text;
      }
      const textWithLinks = addLinks(text, links);
      jsx = (
        <p
          className="block__p"
          dangerouslySetInnerHTML={{ __html: textWithLinks }}
        ></p>
      );
      break;
    case "subtitle":
      jsx = <h2 className="block__h2">{text}</h2>;
      break;
    case "code":
      jsx = (
        <div className="block__code">
          <SyntaxHighlighter language={language} style={vscDarkPlus}>
            {text}
          </SyntaxHighlighter>
        </div>
      );
      break;
    default:
      jsx = <></>;
  }
  return (
    <div className="block">
      {!showEditing && jsx}
      {edit && !showEditing && (
        <div className="block__edit-btns">
          <button
            type="button"
            className="block__button"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          {block._id && (
            <button
              type="button"
              className="block__button--delete"
              onClick={() => remove(block)}
            >
              Delete
            </button>
          )}
        </div>
      )}
      {showEditing && (
        <EditBlock
          block={block}
          submit={(block) => {
            setEditing(false);
            submit(block);
          }}
          cancel={() => setEditing(false)}
          className="edit-block"
        />
      )}
    </div>
  );
};

export default Block;
