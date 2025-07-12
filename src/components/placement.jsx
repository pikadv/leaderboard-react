// Placement.jsx
// Displays student placement details by ID, with loading and error handling
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import progressCircle from "../assets/progress.svg";
import progressBackground from "../assets/background.svg";
import { fetchStudentById } from "../firebaseDb";

const Placement = () => {
	const { studentId } = useParams();
	const navigate = useNavigate();
	const [student, setStudent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Fetch student data on mount or when studentId changes
	useEffect(() => {
		if (!studentId) {
			setError("ID does not Match.");
			setLoading(false);
			return;
		}
		fetchStudentById(studentId)
			.then((data) => {
				if (!data) {
					setError("Student not found.");
				} else {
					setStudent(data);
				}
				setLoading(false);
			})
			.catch(() => {
				setError("Error fetching student data.");
				setLoading(false);
			});
	}, [studentId]);

	if (loading) return <div className="centered-message">Loading...</div>;
	if (error) return <div className="centered-message">{error}</div>;

	return (
		<main id="main">
			<div id="hero">
				<div className="section-container hero-container">
					<div className="hero-main">
						<div className="progress-section">
							<img
								className="progress-circle"
								src={progressCircle}
								alt="Shows progress"
								draggable={false}
							/>
							<img
								className="progress-background-circle"
								src={progressBackground}
								alt="Shows background progress circle"
								draggable={false}
							/>
							<div className="progress-ranking">
								<p className="rank-number">
									<span className="rank-current">{student["student-id"]}</span>
								</p>
								<div className="rank-details">
									<p className="rank-text">
										<span className="span-light">CGPA: </span>
										<span className="span-accent">
											{student["student-result"]}
										</span>
									</p>
									<Link
										className="rank-profile-link"
										to={`/profile/${student["student-id"]}`}>
										See Details
									</Link>
								</div>
							</div>
						</div>
						<Link
							className="btn btn-light"
							to="/">
							Go Home
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Placement;
