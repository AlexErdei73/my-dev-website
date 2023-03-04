import React from "react";
import Card from "./Card";
import "./Modal.css";

const Modal = (props) => {
	const { show, variant, header, footer, children } = props;

	return (
		<div className={`modal ${show && "show"}`}>
			<Card variant={variant} headerText={header} footerTextLeft={footer}>
				{children}
			</Card>
		</div>
	);
};

export default Modal;
