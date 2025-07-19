// Login.jsx
// Login page for user authentication with feedback and navigation
import React, { useState } from "react";
import "../styles/global.css";
import userIcon from "../assets/vector.svg";
import passwordIcon from "../assets/vector-1.svg";
import { signIn } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	// Handle login form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target.username.value;
		const password = e.target.password.value;
		try {
			const userCredential = await signIn(email, password);
			setSuccess(true);
			// Check faculty and admin status and redirect accordingly
			const { getFacultyStatus, getAdminStatus } = await import("../auth");
			const facultyStatus = await getFacultyStatus(userCredential.user.uid);
			const adminStatus = await getAdminStatus(userCredential.user.uid);
			setTimeout(() => {
				if (
					adminStatus === "yes" ||
					(adminStatus === "yes" && facultyStatus === "yes")
				) {
					navigate("/admin");
				} else if (facultyStatus === "yes") {
					navigate("/faculty");
				} else {
					navigate("/student-profile");
				}
			}, 1200);
		} catch (err) {
			setError("Invalid credentials");
		}
	};

	return (
		<main id="main">
			<div
				id="hero"
				className="auth-bg auth-center">
				<div className="section-container hero-container auth-fullwidth">
					<div className="hero-main">
						<form
							className="login-container"
							onSubmit={handleSubmit}>
							<h2 className="hero-title">Login</h2>
							<div className="input-box">
								<div className="input-container">
									<input
										type="text"
										id="username"
										name="username"
										placeholder="Username (Email)"
										required
									/>
									<img
										src={userIcon}
										alt="User Icon"
										className="input-icon btn btn-blank"
									/>
								</div>
								<div className="input-container">
									<input
										type={showPassword ? "text" : "password"}
										id="password"
										name="password"
										placeholder="Password"
										required
									/>
									<img
										src={passwordIcon}
										alt="Password Icon"
										className="input-icon btn btn-blank"
										onClick={() => setShowPassword((v) => !v)}
										style={{ cursor: "pointer" }}
									/>
								</div>
							</div>
							{success && (
								<div className="success-message">Login successful!</div>
							)}
							{error && <div className="error-message">{error}</div>}
							<button
								className="btn login-btn"
								type="submit">
								Login
							</button>
							<p className="login-cta-text">
								Don't have an account?{" "}
								<a
									className="login-cta underline"
									href="/signup"
									onClick={(e) => {
										e.preventDefault();
										navigate("/signup");
									}}>
									Sign up
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Login;
