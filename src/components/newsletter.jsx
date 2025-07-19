// Newsletter.jsx
// Newsletter section with call-to-action for checking ranking
import React from "react";
import { useNavigate } from "react-router-dom";
import isLoggedIn, { handleCheckNow } from "../common/isloggedin";

const Newsletter = () => {
	const navigate = useNavigate();

	return (
		<div id="newsletter">
			<div className="section-container newsletter-container">
				<h2 className="newsletter-heading">Check your ranking now!</h2>
				<a
					href="#"
					className="cta btn btn-light"
					onClick={handleCheckNow(navigate, isLoggedIn())}>
					Check Now
				</a>
			</div>
		</div>
	);
};

export default Newsletter;
