// Faculty.jsx
// Faculty dashboard page with navigation to student management and leaderboard
import { Link } from "react-router-dom";

const FacultyPage = () => {
	return (
		<div id="hero">
			<div
				className="section-container hero-container"
				style={{ maxWidth: "25rem", margin: "0 auto" }}>
				<div className="hero-main">
					<h2 className="hero-title">Faculty Page</h2>
				</div>
				{/* Student management actions */}
				<div className="hero-cta">
					<Link
						to="/add-student"
						className="hero-btn btn">
						Add a student
					</Link>
					<Link
						to="/update-student"
						className="hero-btn btn">
						Update student info
					</Link>
					<Link
						to="/delete-student"
						className="hero-btn btn">
						Delete a student
					</Link>
				</div>
				{/* Leaderboard navigation */}
				<div className="hero-cta">
					<Link
						to="/leaderboard"
						className="hero-btn btn btn-light">
						Check the LeaderBoard
					</Link>
				</div>
				<p className="hero-text">More features coming soon!</p>
			</div>
		</div>
	);
};

export default FacultyPage;
