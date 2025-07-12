// Check.jsx
// Page for checking student placement by ID, with authentication and navigation
import useIsLoggedIn from "../common/isloggedin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkStudentPlacement from "../assets/check-student-placement.png";

const CheckPage = () => {
	const { loggedIn, loading } = useIsLoggedIn();
	const navigate = useNavigate();

	// Redirect to login if not authenticated
	useEffect(() => {
		if (!loading && !loggedIn) {
			navigate("/login");
		}
	}, [loggedIn, loading, navigate]);

	if (loading) return null;

	// Handle form submission for student ID
	const handleSubmit = (e) => {
		e.preventDefault();
		const studentId = e.target["student-id"].value.trim();
		if (studentId) {
			navigate(`/placement/${encodeURIComponent(studentId)}`);
		}
	};

	return (
		<main id="main">
			<div id="hero">
				<div className="section-container hero-container">
					<div className="hero-main">
						<img
							className="hero-title"
							src={checkStudentPlacement}
							alt="Check Student placement"
						/>
					</div>
					<div className="hero-input-section">
						<form
							className="input-container"
							onSubmit={handleSubmit}>
							<input
								type="text"
								id="student-id"
								name="student-id"
								placeholder="Enter Student ID"
								required
							/>
							<button
								className="btn btn-input"
								type="submit">
								Check Placement
							</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CheckPage;
