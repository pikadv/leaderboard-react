import useIsLoggedIn from "../common/isloggedin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckPage = () => {
	const { loggedIn, loading } = useIsLoggedIn();
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && !loggedIn) {
			navigate("/login");
		}
	}, [loggedIn, loading, navigate]);

	if (loading) return null;

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
							src="/src/assets/check-student-placement.png"
							alt="Check Student placement"
						/>
					</div>
					<div className="hero-input-section">
						<form
							className="input-container"
							onSubmit={handleSubmit}>
							<input
								type="text"
								name="student-id"
								id="student-id"
								placeholder="Enter Student ID"
							/>
							<button
								type="submit"
								className="hero-btn btn">
								<img
									src="/src/assets/search-icon.svg"
									alt="Search Icon"
								/>
							</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CheckPage;
