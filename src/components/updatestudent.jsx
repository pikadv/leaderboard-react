// UpdateStudent.jsx
// Form for faculty to fetch and update student details
import React, { useState } from "react";
import { fetchStudentById, updateStudent } from "../firebaseDb";

const UpdateStudent = () => {
	// Form state for all student fields
	const [form, setForm] = useState({
		studentId: "",
		department: "",
		name: "",
		batch: "",
		section: "",
		result: "",
		achievements: "",
		cocurricular: "",
		extracurricular: "",
	});
	const [fetching, setFetching] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// Handle input changes for all fields
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	// Fetch student details by ID and department
	const handleFetch = async (e) => {
		e.preventDefault();
		setFetching(true);
		setError("");
		setSuccess("");
		try {
			const found = await fetchStudentById(form.studentId);
			if (found && found["student-department"] === form.department) {
				setForm({
					studentId: found.id,
					department: found["student-department"] || "",
					name: found["student-name"] || "",
					batch: found["student-batch"] || "",
					section: found["student-section"] || "",
					result: found["student-result"] || "",
					achievements: found["student-achievements"] || "",
					cocurricular: found["student-cocurricular"] || "",
					extracurricular: found["student-extracurricular"] || "",
				});
			} else {
				setError("Student not found or department mismatch.");
			}
		} catch (err) {
			setError("Error fetching student details.");
		}
		setFetching(false);
	};

	// Update student details in database
	const handleUpdate = async (e) => {
		e.preventDefault();
		setUpdating(true);
		setError("");
		setSuccess("");
		try {
			await updateStudent(form.studentId, {
				"student-name": form.name,
				"student-batch": form.batch,
				"student-section": form.section,
				"student-result": form.result,
				"student-achievements": form.achievements,
				"student-cocurricular": form.cocurricular,
				"student-extracurricular": form.extracurricular,
			});
			setSuccess("Student updated successfully.");
		} catch (err) {
			setError("Error updating student.");
		}
		setUpdating(false);
	};

	return (
		<main id="main">
			<div id="hero">
				<div className="section-container hero-container">
					<div className="hero-main">
						<form
							className="signup-container"
							id="update-form">
							<h2 className="hero-title">Update student info</h2>
							{/* Student ID and department for fetch */}
							<div className="input-box">
								<div className="input-container">
									<input
										type="text"
										id="student-id"
										name="studentId"
										placeholder="Enter student ID"
										value={form.studentId}
										onChange={handleChange}
										required
										disabled={updating}
									/>
								</div>
								<div className="input-container">
									<input
										type="text"
										id="student-department"
										name="department"
										placeholder="Enter department"
										value={form.department}
										onChange={handleChange}
										required
										disabled={updating}
									/>
								</div>
								<button
									className="btn fetch-btn"
									type="button"
									onClick={handleFetch}
									disabled={fetching || updating}>
									{fetching ? "Fetching..." : "Fetch Details"}
								</button>
								{/* Student details for update */}
								<div className="info-container">
									<div className="input-container">
										<input
											type="text"
											id="student-name"
											name="name"
											placeholder="Enter student name"
											value={form.name}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="input-container">
										<input
											type="text"
											id="student-batch"
											name="batch"
											placeholder="Enter batch"
											value={form.batch}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="input-container">
										<input
											type="text"
											id="student-section"
											name="section"
											placeholder="Enter section"
											value={form.section}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="input-container">
										<input
											type="text"
											id="student-result"
											name="result"
											placeholder="Enter CGPA"
											value={form.result}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="input-container">
										<input
											type="text"
											id="student-achievements"
											name="achievements"
											placeholder="Enter achievements"
											value={form.achievements}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="input-container">
										<input
											type="text"
											id="student-cocurricular"
											name="cocurricular"
											placeholder="Set co-curricular - 'Yes/No'"
											value={form.cocurricular}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="input-container">
										<input
											type="text"
											id="student-extracurricular"
											name="extracurricular"
											placeholder="Set extra-curricular - 'Yes/No'"
											value={form.extracurricular}
											onChange={handleChange}
											required
										/>
									</div>
									<button
										className="btn update-btn"
										type="button"
										onClick={handleUpdate}
										disabled={updating}>
										{updating ? "Updating..." : "Update"}
									</button>
									<br />
									{/* Success and error messages */}
									{success && <div style={{ color: "green" }}>{success}</div>}
									{error && <div style={{ color: "red" }}>{error}</div>}
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default UpdateStudent;
