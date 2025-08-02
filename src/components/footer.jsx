// Footer.jsx
// Main footer with navigation and app download CTA
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-1.png";

const Footer = () => {
	const navigate = useNavigate();
	const handleNavClick = (hash) => (e) => {
		e.preventDefault();
		if (window.location.pathname !== "/") {
			navigate(`/${hash}`);
			setTimeout(() => {
				const el = document.getElementById(hash.replace("#", ""));
				if (el) el.scrollIntoView({ behavior: "smooth" });
			}, 100);
		} else {
			const el = document.getElementById(hash.replace("#", ""));
			if (el) el.scrollIntoView({ behavior: "smooth" });
		}
	};
	return (
		<footer id="footer">
			<div className="section-container footer-container">
				<a
					className="logo-container"
					href="/">
					<img
						className="logo-img"
						src={logo}
						alt="LeaderBoard Logo"
					/>
				</a>
				{/* Hide nav on mobile */}
				<nav className="nav-container">
					<ul className="nav">
						<li className="nav-items">
							<a
								href="/soon#contact"
								className="nav-links">
								Contact
							</a>
						</li>
						<li className="nav-items">
							<a
								href="/soon#support"
								className="nav-links">
								Support
							</a>
						</li>
					</ul>
				</nav>
				<div className="cta-container">
					<a
						href="/#app"
						className="cta btn"
						onClick={handleNavClick("#app")}>
						Get the app
					</a>
				</div>
			</div>
			<div className="section-container footer-tac">
				<p className="footer-text">
					&copy; 2023 LeaderBoard. All rights reserved.
				</p>
				<div className="tac-box">
					<a
						href="/soon"
						className="tac-link">
						Terms and Conditions
					</a>
					<a
						href="/soon"
						className="tac-link">
						Privacy Policy
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
