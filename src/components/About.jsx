import React from "react";
import Post from "./Post";

const About = (props) => {
  const { post } = props;

  return <Post post={post} edit={false} errors={[]} />;
};

export default About;
