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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target.username.value;
		const password = e.target.password.value;
		try {
			const userCredential = await signIn(email, password);
			setSuccess(true);
			// Check faculty status
			const { getFacultyStatus } = await import("../auth");
			const facultyStatus = await getFacultyStatus(userCredential.user.uid);
			setTimeout(() => {
				if (facultyStatus === "yes") {
					navigate("/faculty");
				} else {
					navigate("/check");
				}
			}, 1200);
		} catch (err) {
			setError("Invalid credentials");
		}
	};

	const handleSignupRedirect = (e) => {
		e.preventDefault();
		window.location.href = "/signup";
	};

	return (
		<main
			id="main"
			style={{ minHeight: "100vh", background: "#f8f9fa" }}>
			<div id="hero">
				<div className="section-container hero-container">
					<div className="hero-main">
						<form
							className="login-container"
							onSubmit={handleSubmit}>
							<h2
								className="hero-title"
								style={{ textAlign: "center" }}>
								Login
							</h2>
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
										className="input-icon btn"
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
										className="input-icon btn"
										onClick={() => setShowPassword((v) => !v)}
										style={{ cursor: "pointer" }}
									/>
								</div>
							</div>
							{success && (
								<div
									style={{
										color: "green",
										textAlign: "center",
										marginBottom: 8,
									}}>
									Login successful!
								</div>
							)}
							{error && (
								<div style={{ color: "red", textAlign: "center" }}>{error}</div>
							)}
							<button
								className="btn login-btn"
								type="submit"
								style={{ width: "100%" }}>
								Login
							</button>
							<p
								className="login-cta-text"
								style={{ textAlign: "center", marginTop: 16 }}>
								Don't have an account?{" "}
								<a
									className="login-cta underline"
									href="/signup"
									onClick={handleSignupRedirect}>
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
