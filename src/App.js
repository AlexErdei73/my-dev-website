import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Block from "./components/Block";

function App() {
  const URL =
    "http://localhost:5000/posts/63dbaf9412e514c68d95c4ba/blocks/63df747cbffb7cf2db872b85";

  const [block, setBlock] = useState({
    type: "subtitle",
    text: "...Loading",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(URL, { mode: "cors" });
      const json = await response.json();
      return json;
    }
    const res = fetchData();
    res.then((res) => {
      setBlock(res.block);
    });
  }, []);

  return (
    <div className="App">
      <Block block={block} />
    </div>
  );
}

export default App;
