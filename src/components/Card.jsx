import React from "react";
import "./Card.css";

const Card = (props) => {
	const {
		variant,
		headerText,
		footerTextLeft,
		footerTextRight,
		children,
	} = props;

	return (
		<div className="card">
			<div className={`card__header ${variant && variant}`}>
				<div>{headerText}</div>
			</div>
			{children}
			<div className={`card__footer ${variant && `footer-${variant}`}`}>
				<div>{footerTextLeft}</div>
				<div>{footerTextRight}</div>
			</div>
		</div>
	);
};

export default Card;
