// Header.jsx
// Main navigation header with user authentication and role-based navigation
import logo from "../assets/logo-1.png";
import { useNavigate } from "react-router-dom";
import { handleCheckNow } from "../common/isloggedin";
import useIsLoggedIn from "../common/isloggedin";
import { logOut, getCurrentUser, getFacultyStatus } from "../auth";
import { useEffect, useState } from "react";

const Header = () => {
	const navigate = useNavigate();
	const { loggedIn, loading } = useIsLoggedIn();
	const [email, setEmail] = useState("");
	const [faculty, setFaculty] = useState(null);

	// Fetch user and faculty status on login state change
	useEffect(() => {
		if (loggedIn) {
			const user = getCurrentUser();
			setEmail(user?.email || "");
			if (user) {
				getFacultyStatus(user.uid).then((status) => setFaculty(status));
			}
		} else {
			setEmail("");
			setFaculty(null);
		}
	}, [loggedIn]);

	// Handle logout and redirect
	const handleLogout = async () => {
		await logOut();
		navigate("/login");
	};

	// Handle welcome click based on user role
	const handleWelcomeClick = () => {
		if (faculty === "yes") {
			navigate("/faculty");
		} else {
			navigate("/check");
		}
	};

	return (
		<div className="container">
			<header id="header">
				<div className="section-container header-container">
					{/* Logo */}
					<a
						className="logo-container"
						href="/">
						<img
							className="logo-img"
							src={logo}
							alt="LeaderBoard Logo"
						/>
					</a>
					{/* Navigation links */}
					<div className="nav-container">
						<ul className="nav">
							<li className="nav-items">
								<a
									href="/#hero"
									className="nav-links">
									Home
								</a>
							</li>
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
						</ul>
					</div>
					{/* Call-to-action and user controls */}
					<div className="cta-container">
						{/* Show welcome and role-based navigation if logged in */}
						{loggedIn && email && (
							<span
								className="welcome-email clickable"
								onClick={handleWelcomeClick}
								style={{ cursor: "pointer" }}>
								Welcome, {email}
							</span>
						)}
						{/* Always show Check Now CTA */}
						<a
							href="#"
							className="cta btn"
							onClick={handleCheckNow(navigate, loggedIn)}>
							Check Now
						</a>
						{/* Show Sign Out or Login depending on auth state */}
						{!loading &&
							(loggedIn ? (
								<button
									className="btn"
									onClick={handleLogout}
									style={{ marginLeft: 8 }}>
									Sign Out
								</button>
							) : (
								<a
									className="btn"
									href="/login"
									style={{ marginLeft: 8 }}>
									Login
								</a>
							))}
					</div>
				</div>
			</header>
		</div>
	);
};

export default Header;
