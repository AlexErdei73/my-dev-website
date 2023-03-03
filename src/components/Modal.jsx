import React, { useState } from "react";
import Card from "./Card";
import "./Modal.css";

const Modal = (props) => {
	const { show, children } = props;

	return (
		<div className={`modal ${show && "show"}`}>
			<Card headerText="Hello Alex!" footerTextLeft="Close me with the button!">
				{children}
			</Card>
		</div>
	);
};

export default Modal;
