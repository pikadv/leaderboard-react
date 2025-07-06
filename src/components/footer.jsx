import logo from "../assets/logo-1.png";

const Footer = () => (
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
			<div className="nav-container">
				<ul className="nav">
					<li className="nav-items">
						<a
							href="/#features"
							className="nav-links">
							Features
						</a>
					</li>
					<li className="nav-items">
						<a
							href="/#app"
							className="nav-links">
							App
						</a>
					</li>
					<li className="nav-items">
						<a
							href="/#reviews"
							className="nav-links">
							Reviews
						</a>
					</li>
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
			</div>
			<div className="cta-container">
				<a
					href="/#app"
					className="cta btn">
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

export default Footer;
