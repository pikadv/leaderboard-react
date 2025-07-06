// DeleteStudent.jsx
// Form for faculty to fetch and delete a student by ID and department
import React, { useState } from "react";
import { fetchStudentById, deleteStudent } from "../firebaseDb";

const DeleteStudent = () => {
	const [studentId, setStudentId] = useState("");
	const [department, setDepartment] = useState("");
	const [student, setStudent] = useState(null);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	// Fetch student details by ID and department
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

	// Delete student by Firestore doc ID
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
							id="delete-form">
							<h2 className="hero-title">Delete student</h2>
							<div className="input-box">
								<div className="input-container">
									<input
										type="text"
										id="student-id"
										name="studentId"
										placeholder="Enter student ID"
										value={studentId}
										onChange={(e) => setStudentId(e.target.value)}
										required
										disabled={loading}
									/>
								</div>
								<div className="input-container">
									<input
										type="text"
										id="student-department"
										name="department"
										placeholder="Enter department"
										value={department}
										onChange={(e) => setDepartment(e.target.value)}
										required
										disabled={loading}
									/>
								</div>
								<button
									className="btn fetch-btn"
									type="button"
									onClick={handleFetch}
									disabled={loading}>
									{loading ? "Fetching..." : "Fetch Student"}
								</button>
								{/* Show student details if found */}
								{student && (
									<div className="info-container">
										<p>Name: {student["student-name"]}</p>
										<p>Batch: {student["student-batch"]}</p>
										<p>Section: {student["student-section"]}</p>
										<p>CGPA: {student["student-result"]}</p>
										<button
											className="btn delete-btn"
											type="button"
											onClick={handleDelete}
											disabled={loading}>
											{loading ? "Deleting..." : "Delete"}
										</button>
									</div>
								)}
								{/* Success and error messages */}
								{success && <div style={{ color: "green" }}>{success}</div>}
								{error && <div style={{ color: "red" }}>{error}</div>}
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default DeleteStudent;
