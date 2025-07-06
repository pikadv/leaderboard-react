import React, { useState } from "react";
import { fetchStudentById, deleteStudent } from "../firebaseDb";

const DeleteStudent = () => {
	const [studentId, setStudentId] = useState("");
	const [department, setDepartment] = useState("");
	const [student, setStudent] = useState(null);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	const handleFetch = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setStudent(null);
		setLoading(true);
		try {
			const found = await fetchStudentById(studentId);
			if (found && found["student-department"] === department) {
				setStudent(found);
			} else {
				setError("No student found with the provided ID and department.");
			}
		} catch (err) {
			setError("Error fetching student info.");
		}
		setLoading(false);
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setLoading(true);
		try {
			await deleteStudent(student.id);
			setSuccess("Student deleted successfully.");
			setStudent(null);
			setStudentId("");
			setDepartment("");
		} catch (err) {
			setError("Error deleting student.");
		}
		setLoading(false);
	};

	return (
		<main id="main">
			<div id="hero">
				<div className="section-container hero-container">
					<div className="hero-main">
						<form
							className="signup-container"
							onSubmit={handleFetch}>
							<h2 className="hero-title">Delete student info</h2>
							<div className="input-box">
								<div className="input-container">
									<input
										type="text"
										id="student-id"
										name="student-id"
										placeholder="Enter student ID"
										value={studentId}
										onChange={(e) => setStudentId(e.target.value)}
										required
									/>
								</div>
								<div className="input-container">
									<input
										type="text"
										id="student-department"
										name="student-department"
										placeholder="Enter department"
										value={department}
										onChange={(e) => setDepartment(e.target.value)}
										required
									/>
								</div>
							</div>
							<button
								className="btn fetch-btn"
								type="submit"
								disabled={loading}>
								{loading ? "Fetching..." : "Fetch"}
							</button>
							<br />
						</form>
						{error && (
							<div style={{ color: "red", margin: "1em 0" }}>{error}</div>
						)}
						{success && (
							<div style={{ color: "green", margin: "1em 0" }}>{success}</div>
						)}
						{student && (
							<div
								id="student-info"
								className="info-container">
								<h3>Student Information</h3>
								<p id="student-details">
									Name: {student["student-name"]}
									<br />
									ID: {student["student-id"]}
									<br />
									Department: {student["student-department"]}
									<br />
									Batch: {student["student-batch"]}
									<br />
									Section: {student["student-section"]}
									<br />
									CGPA: {student["student-result"]}
									<br />
									Achievements: {student["student-achievements"]}
									<br />
									Co-curricular: {student["student-cocurricular"]}
									<br />
									Extra-curricular: {student["student-extracurricular"]}
								</p>
								<form onSubmit={handleDelete}>
									<input
										type="hidden"
										name="student-id"
										value={student["student-id"]}
									/>
									<input
										type="hidden"
										name="student-department"
										value={student["student-department"]}
									/>
									<button
										className="btn delete-btn"
										type="submit"
										disabled={loading}>
										{loading ? "Deleting..." : "Delete"}
									</button>
								</form>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default DeleteStudent;
