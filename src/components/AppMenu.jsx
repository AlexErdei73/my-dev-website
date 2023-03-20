import "./AppMenu.css";
import { Link } from "react-router-dom";
import React from "react";

const AppMenu = (props) => {
	const LOGO = "Alex73 DEV";

	const { loginSuccess } = props;

	return (
		<nav className="nav">
			<ul>
				<li className="nav__logo">
					<Link to="/my-dev-website/">{LOGO}</Link>
				</li>
				<li className="nav__item">
					<Link to="/my-dev-website/about">About</Link>
				</li>
				<li className="nav__item">
					<Link to="/my-dev-website/">Home</Link>
				</li>
				<li className="nav__item">
					<Link to="/my-dev-website/post">Post</Link>
				</li>
				<li className="nav__item">
					<Link to="/my-dev-website/login">Login</Link>
				</li>
				<li className="nav__item">
					<Link to="/my-dev-website/signup">
						{loginSuccess ? "User" : "Sign Up"}
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default AppMenu;
