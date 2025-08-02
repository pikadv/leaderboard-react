// Placement.jsx
// Displays student placement details by ID, with loading and error handling
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import progressCircle from "../assets/progress.svg";
import progressBackground from "../assets/background.svg";
import { fetchStudentById, fetchLeaderboard } from "../firebaseDb";

const Placement = () => {
	const { studentId } = useParams();
	const navigate = useNavigate();
	const [student, setStudent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [ranking, setRanking] = useState(null);
	const [batchDeptRank, setBatchDeptRank] = useState(null);

	// Fetch student data and ranking on mount or when studentId changes
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
					setLoading(false);
				} else {
					setStudent(data);
					// Fetch leaderboard to calculate ranking
					fetchLeaderboard({ all: true }).then((students) => {
						// Overall rank
						const sorted = students.sort(
							(a, b) =>
								parseFloat(b["student-result"]) -
								parseFloat(a["student-result"])
						);
						const mainIdx = sorted.findIndex(
							(s) => s["student-id"] === data["student-id"]
						);
						setRanking(mainIdx !== -1 ? mainIdx + 1 : null);

						// Batch + Department rank
						const batchDeptStudents = students.filter(
							(s) =>
								s["student-batch"] &&
								s["student-batch"].toUpperCase() ===
									data["student-batch"].toUpperCase() &&
								s["student-department"] &&
								s["student-department"].toUpperCase() ===
									data["student-department"].toUpperCase()
						);
						const batchDeptSorted = batchDeptStudents.sort(
							(a, b) =>
								parseFloat(b["student-result"]) -
								parseFloat(a["student-result"])
						);
						const batchDeptIdx = batchDeptSorted.findIndex(
							(s) => s["student-id"] === data["student-id"]
						);
						setBatchDeptRank(batchDeptIdx !== -1 ? batchDeptIdx + 1 : null);
						setLoading(false);
					});
				}
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
									<span className="rank-current">
										{batchDeptRank !== null ? batchDeptRank : "-"}
									</span>
								</p>
								<div className="rank-details">
									<p className="rank-text">
										<span className="span-light">CGPA: </span>
										<span className="span-accent">
											{parseFloat(student["student-result"]).toFixed(2)}
											<span style={{ fontSize: "0.9em", color: "#888" }}>
												{" "}
												/ 4.00
											</span>
										</span>
									</p>
									<p className="rank-text">
										<span className="span-light">Overall Rank:</span>{" "}
										<span className="rank-badge batch-dept-rank">
											{ranking !== null ? `#${ranking}` : "-"}
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
