import { Link } from "react-router-dom";

const FacultyPage = () => {
	return (
		<div id="hero">
			<div className="section-container hero-container">
				<div className="hero-main">
					<h2 className="hero-title">Faculty Page</h2>
				</div>
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
