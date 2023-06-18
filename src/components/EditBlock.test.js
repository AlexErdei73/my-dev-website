import React from "react";
import { screen, render, getByRole } from "@testing-library/react";
import EditBlock from "./EditBlock";

test("render paragraph with no link", () => {
	const block = {
		_id: "test-block-1",
		text: "This is a test paragraph.",
		type: "paragraph",
		links: [],
		errors: [],
	};
	const submit = jest.fn();
	const cancel = jest.fn();

	render(<EditBlock block={block} submit={submit} cancel={cancel} />);

	expect(screen.getByRole("textbox")).toHaveTextContent(block.text);
});
