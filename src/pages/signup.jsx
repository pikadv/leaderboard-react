// Signup.jsx
// Signup page for new users with form validation and feedback
import React, { useState } from "react";
import "../styles/global.css";
import { signUp } from "../auth";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/vector.svg";
import passwordIcon from "../assets/vector-1.svg";

const Signup = () => {
	// Form state for username and password
	const [form, setForm] = useState({ username: "", password: "" });
	// Error and success message state
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	// Password visibility toggle
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	// Handle input changes for form fields
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	// Handle form submission for signup
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signUp(form.username, form.password);
			setSuccess(true);
			setTimeout(() => {
				navigate("/student-profile");
			}, 1200);
		} catch (err) {
			setError("Signup failed: " + err.message);
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
							<h2 className="hero-title">Sign Up</h2>
							{/* Username input */}
							<div className="input-box">
								<div className="input-container">
									<input
										type="text"
										id="username"
										name="username"
										placeholder="Username (Email)"
										value={form.username}
										onChange={handleChange}
										required
									/>
									<img
										src={userIcon}
										alt="User Icon"
										className="input-icon btn"
									/>
								</div>
								{/* Password input with toggle */}
								<div className="input-container">
									<input
										type={showPassword ? "text" : "password"}
										id="password"
										name="password"
										placeholder="Password"
										value={form.password}
										onChange={handleChange}
										required
									/>
									<img
										src={passwordIcon}
										alt="Password Icon"
										className="input-icon btn"
										onClick={() => setShowPassword((v) => !v)}
										style={{ cursor: "pointer" }}
									/>
								</div>
							</div>
							{/* Success and error messages */}
							{success && (
								<div className="success-message">Signup successful!</div>
							)}
							{error && <div className="error-message">{error}</div>}
							<button
								className="btn login-btn"
								type="submit">
								Sign up
							</button>
							<p className="login-cta-text">
								Already have an account?{" "}
								<a
									className="login-cta underline"
									href="/login"
									onClick={(e) => {
										e.preventDefault();
										navigate("/login");
									}}>
									Login
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Signup;
