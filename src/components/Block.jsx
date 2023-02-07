import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./Block.css";

const Block = (props) => {
	const block = props.block;
	const { type, language, text } = block;
	let jsx;
	switch (type) {
		case "paragraph":
			jsx = <p className="block__p">{text}</p>;
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
	}
	return jsx;
};

export default Block;
