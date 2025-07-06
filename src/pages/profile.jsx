// Profile.jsx
// Displays student profile details, handles authentication and data fetching
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RandomChar from "../common/randomchar";
import useIsLoggedIn from "../common/isloggedin";
import { fetchStudentById } from "../firebaseDb";

const Profile = () => {
	const { id } = useParams();
	const [studentData, setStudentData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
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
							<div className="profile-container">
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}>
									<div className="profile-picture-wrapper">
										<RandomChar />
									</div>
								</div>
								<div className="profile-details">
									<p className="profile-item">
										<span>Name:</span>
										<span> {studentData["student-name"]}</span>
									</p>
									<p className="profile-item">
										<span>ID:</span>
										<span> {studentData["student-id"]}</span>
									</p>
									<p className="profile-item">
										<span>Batch:</span>
										<span> {studentData["student-batch"]}</span>
									</p>
									<p className="profile-item">
										<span>Section:</span>
										<span> {studentData["student-section"]}</span>
									</p>
									<p className="profile-item">
										<span>Department:</span>
										<span> {studentData["student-department"]}</span>
									</p>
									<p className="profile-item">
										<span>CGPA:</span>
										<span> {studentData["student-result"]}</span>
									</p>
									<p className="profile-item">
										<span>Achievements:</span>
										<span> {studentData["student-achievements"]}</span>
									</p>
									<p className="profile-item">
										<span>Co Curriculum:</span>
										<span> {studentData["student-cocurricular"]}</span>
									</p>
									<p className="profile-item">
										<span>Extra Curriculum:</span>
										<span> {studentData["student-extracurricular"]}</span>
									</p>
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
		</main>
	);
};

export default Profile;
