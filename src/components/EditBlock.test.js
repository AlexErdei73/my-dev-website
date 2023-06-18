import React from "react";
import { screen, render, getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("render paragraph with links", () => {
	const block = {
		_id: "test-block-1",
		text: "This is a test paragraph.",
		type: "paragraph",
		links: [
			{
				url: "https://testlink.com",
				description: "testlink",
				position: 0,
			},
			{
				url: "https://testlink-2.com",
				description: "secondtestlink",
				position: 10,
			},
		],
		errors: [],
	};
	const submit = jest.fn();
	const cancel = jest.fn();

	render(<EditBlock block={block} submit={submit} cancel={cancel} />);

	expect(screen.getByRole("textbox")).toHaveTextContent(
		"[testlink](https://testlink.com)This is a [secondtestlink](https://testlink-2.com)test paragraph."
	);
});

test("click cancel calls cancel", () => {
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
	userEvent.click(screen.getByRole("button", { name: "Cancel" }));

	expect(cancel).toBeCalled();
	expect(screen.getByRole("textbox")).toHaveTextContent(block.text);
});
