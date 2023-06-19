import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditBlock from "./EditBlock";
import { act } from "react-dom/test-utils";

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
	const cancelBtn = screen.getByRole("button", { name: "Cancel" });
	act(() => {
		userEvent.click(cancelBtn);
	});

	expect(cancel).toBeCalledWith();
	expect(screen.getByRole("textbox")).toHaveTextContent(block.text);
});

test("click submit submits block", () => {
	const block = {
		_id: "test-block-1",
		text: "This is a test paragraph.",
		type: "paragraph",
		links: [],
		errors: [],
	};
	const link = {
		url: "https://testlink.com",
		description: "testlink",
		position: 25,
	};
	const submit = jest.fn();
	const cancel = jest.fn();

	render(<EditBlock block={block} submit={submit} cancel={cancel} />);
	const linkText = `[${link.description}](${link.url})`;
	act(() => {
		// [ and { special characters must be given double to work
		// see https://testing-library.com/docs/user-event/keyboard/
		userEvent.type(screen.getByRole("textbox"), "[" + linkText);
		userEvent.click(screen.getByRole("button", { name: "Submit" }));
	});

	block.links.push(link);
	expect(submit).toBeCalledWith(block);
	expect(screen.getByRole("textbox")).toHaveTextContent(block.text + linkText);
});
