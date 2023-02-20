import React, { useState } from "react";
import Block from "./Block";
import PostTitle from "./PostTitle";
import { createBlock } from "../backend/backend";
import "./Post.css";

const Post = (props) => {
  const { post, submit, updateBlock, errors, setPost, token } = props;
  const { _id, title, author, content, comments } = post;

  const NEW_EMPTY_BLOCK = {
    text: "",
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
    try {
      const response = await createBlock(newBlock, token);
      if (response.success) {
        const newPost = JSON.parse(JSON.stringify(post));
        newPost.content.push(response.block);
        setPost(newPost);
        setNewBlock(NEW_EMPTY_BLOCK);
      } else {
        newBlock.errors = response.errors;
      }
    } catch (error) {
      newBlock.errors = [{ msg: error.message }];
    } finally {
      if (newBlock.errors.length !== 0) setNewBlock(newBlock);
    }
  }

  return (
    <article className="post">
      <PostTitle title={title} edit={true} submit={submit} errors={errors} />
      {content.map((block) => (
        <Block key={block._id} block={block} edit={true} submit={updateBlock} />
      ))}
      <Block key="new-block" block={newBlock} edit={true} submit={saveBlock} />
    </article>
  );
};

export default Post;
