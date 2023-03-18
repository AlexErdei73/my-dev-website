import React, { useState } from "react";
import Block from "./Block";
import PostTitle from "./PostTitle";
import Author from "./Author";
import { createBlock, deleteBlock } from "../backend/backend";
import "./Post.css";

const Post = (props) => {
  const { post, submit, updateBlock, errors, setPost, token, edit } = props;
  const { _id, title, author, content } = post;

  const NEW_EMPTY_BLOCK = {
    text: "New Block",
    type: "paragraph",
    links: [],
    language: " ",
    post: "",
    errors: [],
  };

  const [newBlock, setNewBlock] = useState(NEW_EMPTY_BLOCK);

  async function saveBlock(block) {
    const newBlock = JSON.parse(JSON.stringify(block));
    newBlock.post = _id;
    const newPost = JSON.parse(JSON.stringify(post));
    try {
      const response = await createBlock(newBlock, token);
      if (response.success) {
        newPost.content.push(response.block);
        setNewBlock(NEW_EMPTY_BLOCK);
        newBlock.errors = [];
      } else {
        newBlock.errors = response.errors;
      }
    } catch (error) {
      newBlock.errors = [{ msg: error.message }];
    } finally {
      if (newBlock.errors.length !== 0) setNewBlock(newBlock);
      setPost(newPost);
    }
  }

  async function remove(block) {
    const newBlock = JSON.parse(JSON.stringify(block));
    newBlock.post = _id;
    const newPost = JSON.parse(JSON.stringify(post));
    const index = newPost.content.findIndex(
      (block) => block._id === newBlock._id
    );
    try {
      const response = await deleteBlock(newBlock, token);
      if (response.success) newPost.content.splice(index, 1);
      else newBlock.errors = response.errors;
    } catch (error) {
      newBlock.errors = [{ msg: error.message }];
    } finally {
      if (newBlock.errors && newBlock.errors.length !== 0)
        newPost.content[index] = newBlock;
      setPost(newPost);
    }
  }

  return (
    <div className="post">
      <Author author={author} className="author" />
      <article>
        <PostTitle title={title} edit={edit} submit={submit} errors={errors} />
        {content.map((block) => (
          <Block
            key={block._id}
            block={block}
            edit={edit}
            submit={updateBlock}
            remove={remove}
          />
        ))}
        {edit && (
          <Block
            key="new-block"
            block={newBlock}
            edit={edit}
            submit={saveBlock}
          />
        )}
      </article>
    </div>
  );
};

export default Post;
