// Profile.jsx
// Displays student profile details, handles authentication and data fetching
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RandomChar from "../common/randomchar";
import useIsLoggedIn from "../common/isloggedin";
import { fetchStudentById, fetchLeaderboard } from "../firebaseDb";

const Profile = () => {
	const { id } = useParams();
	const [studentData, setStudentData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [batchRank, setBatchRank] = useState(null);
	const [deptRank, setDeptRank] = useState(null);
	const [mainRank, setMainRank] = useState(null);
	const [batchDeptRank, setBatchDeptRank] = useState(null);
	const navigate = useNavigate();
	const { loggedIn, loading: authLoading } = useIsLoggedIn();

	// Fetch student data on mount or when id/auth changes
	useEffect(() => {
		if (authLoading) return;
		if (!loggedIn) {
			navigate("/login");
			return;
		}
		if (!id) {
			setError("ID does not Match.");
			setLoading(false);
			return;
		}
		fetchStudentById(id)
			.then((data) => {
				if (data) {
					setStudentData(data);
					// Fetch all students for ranking
					fetchLeaderboard({ all: true }).then((students) => {
						// Main rank
						const sorted = students.sort(
							(a, b) =>
								parseFloat(b["student-result"]) -
								parseFloat(a["student-result"])
						);
						const mainIdx = sorted.findIndex(
							(s) => s["student-id"] === data["student-id"]
						);
						setMainRank(mainIdx !== -1 ? mainIdx + 1 : null);

						// Batch-wise ranking
						const batchStudents = students.filter(
							(s) =>
								s["student-batch"] &&
								s["student-batch"].toUpperCase() ===
									data["student-batch"].toUpperCase()
						);
						const batchSorted = batchStudents.sort(
							(a, b) =>
								parseFloat(b["student-result"]) -
								parseFloat(a["student-result"])
						);
						const batchIdx = batchSorted.findIndex(
							(s) => s["student-id"] === data["student-id"]
						);
						setBatchRank(batchIdx !== -1 ? batchIdx + 1 : null);

						// Department-wise ranking
						const deptStudents = students.filter(
							(s) =>
								s["student-department"] &&
								s["student-department"].toUpperCase() ===
									data["student-department"].toUpperCase()
						);
						const deptSorted = deptStudents.sort(
							(a, b) =>
								parseFloat(b["student-result"]) -
								parseFloat(a["student-result"])
						);
						const deptIdx = deptSorted.findIndex(
							(s) => s["student-id"] === data["student-id"]
						);
						setDeptRank(deptIdx !== -1 ? deptIdx + 1 : null);

						// Batch + Department ranking
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
					});
				} else {
					setError("Student data not found.");
				}
				setLoading(false);
			})
			.catch(() => {
				setError("Error fetching student data.");
				setLoading(false);
			});
	}, [id, loggedIn, authLoading, navigate]);

	if (loading || authLoading)
		return (
			<main id="main">
				<div className="centered-message">Loading...</div>
			</main>
		);
	if (error)
		return (
			<main id="main">
				<div className="centered-message">{error}</div>
			</main>
		);

	return (
		<main id="main">
			<div id="hero">
				<div className="section-container hero-container">
					<div className="hero-main">
						{studentData ? (
							<div className="profile-container enhanced-profile-card">
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										marginBottom: 24,
									}}>
									<div className="profile-picture-wrapper enhanced-profile-pic">
										<RandomChar />
									</div>
									<h2
										style={{
											margin: "16px 0 0 0",
											fontWeight: 700,
											fontSize: 24,
										}}>
										{studentData.profileLocked
											? "Anonymous"
											: studentData["student-name"]}
									</h2>
									<span
										style={{ color: "#888", fontSize: 14, marginBottom: 8 }}>
										ID: {studentData["student-id"]}
									</span>
								</div>
								<div className="profile-details enhanced-profile-details">
									<div className="profile-columns">
										<div>
											<p className="profile-item">
												<span>Batch:</span>{" "}
												<span>{studentData["student-batch"]}</span>
											</p>
											<p className="profile-item">
												<span>Section:</span>{" "}
												<span>{studentData["student-section"]}</span>
											</p>
											<p className="profile-item">
												<span>Department:</span>{" "}
												<span>{studentData["student-department"]}</span>
											</p>
											<p className="profile-item">
												<span>Achievements:</span>{" "}
												<span>{studentData["student-achievements"]}</span>
											</p>
											<p className="profile-item">
												<span>Co Curriculum:</span>{" "}
												<span>{studentData["student-cocurricular"]}</span>
											</p>
											<p className="profile-item">
												<span>Extra Curriculum:</span>{" "}
												<span>{studentData["student-extracurricular"]}</span>
											</p>
										</div>
										<div>
											<p className="profile-item">
												<span>CGPA:</span>{" "}
												<span style={{ fontWeight: 600, color: "#2d8f5b" }}>
													{parseFloat(studentData["student-result"]).toFixed(2)}
													<span style={{ fontSize: "0.9em", color: "#888" }}>
														{" "}
														/ 4.00
													</span>
												</span>
											</p>
											<p className="profile-item">
												<span>Overall Rank:</span>{" "}
												<span className="rank-badge main-rank">
													{mainRank !== null ? `#${mainRank}` : "-"}
												</span>
											</p>
											<p className="profile-item">
												<span>Department Rank:</span>{" "}
												<span className="rank-badge dept-rank">
													{deptRank !== null ? `#${deptRank}` : "-"}
												</span>
											</p>
											<p className="profile-item">
												<span>Dept. Rank (Batch wise):</span>{" "}
												<span className="rank-badge batch-dept-rank">
													{batchDeptRank !== null ? `#${batchDeptRank}` : "-"}
												</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						) : (
							<p>Student data not found.</p>
						)}
						<button
							className="btn btn-light"
							onClick={() => navigate("/")}>
							Go Home
						</button>
					</div>
				</div>
			</div>
			{/* Add styles for enhanced design */}
			<style>{`
  .enhanced-profile-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    padding: 32px 24px;
    max-width: 600px;
    margin: 0 auto 32px auto;
    transition: box-shadow 0.2s;
  }
  .enhanced-profile-card:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.13);
  }
  .enhanced-profile-pic {
    border-radius: 50%;
    border: 4px solid #e0e0e0;
    width: 96px;
    height: 96px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    margin-bottom: 8px;
  }
  .enhanced-profile-details {
    margin-top: 16px;
  }
  .profile-columns {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
    margin: 0 4px;
  }
  .profile-columns > div {
    flex: 1 1 220px;
  }
  .profile-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 1rem;
    padding: 6px 0;
    border-bottom: 1px solid #f2f2f2;
  }
  .profile-item span:first-child {
    color: #888;
    font-weight: 500;
  }
  .rank-badge {
    display: inline-block;
    min-width: 36px;
    padding: 2px 10px;
    border-radius: 12px;
    font-weight: 700;
    background: #f2f6ff;
    color: #2d5b8f;
    text-align: center;
  }
  .main-rank { background: #ffe9e0; color: #d35400; }
  .batch-rank { background: #e0ffe9; color: #2d8f5b; }
  .dept-rank { background: #e0f0ff; color: #2d5b8f; }
  .batch-dept-rank { background: #f7e0ff; color: #8f2d8a; }
  @media (max-width: 600px) {
    .enhanced-profile-card { padding: 18px 12px !important; }
    .profile-columns { flex-direction: column; gap: 0; margin: 0 2px; }
  }
`}</style>
		</main>
	);
};

export default Profile;
