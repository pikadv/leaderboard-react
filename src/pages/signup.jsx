import React, { useState } from "react";
import "../styles/global.css";
import { signUp } from "../auth";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/vector.svg";
import passwordIcon from "../assets/vector-1.svg";

const Signup = () => {
	const [form, setForm] = useState({
		username: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signUp(form.username, form.password);
			setSuccess(true);
			setTimeout(() => {
				navigate("/check");
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
