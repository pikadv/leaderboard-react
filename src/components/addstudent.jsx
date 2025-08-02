// AddStudent.jsx
// Form for faculty to add a new student to the leaderboard
import React, { useState } from "react";
import { addStudent } from "../firebaseDb";

const AddStudent = () => {
	const [formData, setFormData] = useState({
		"student-name": "",
		"student-id": "",
		"student-department": "",
		"student-batch": "",
		"student-section": "",
		"student-result": "",
		"student-achievements": "",
		"student-cocurricular": "",
		"student-extracurricular": "",
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	// Handle input changes for all fields
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Handle form submission to add student
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setSuccess("");
		setError("");
		// Normalize batch, department, section to trimmed UPPERCASE for consistency
		const normalizedFormData = {
			...formData,
			"student-batch": formData["student-batch"].trim().toUpperCase(),
			"student-department": formData["student-department"].trim().toUpperCase(),
			"student-section": formData["student-section"].trim().toUpperCase(),
		};
		try {
			await addStudent(normalizedFormData);
			setSuccess("Student added successfully!");
			setFormData({
				"student-name": "",
				"student-id": "",
				"student-department": "",
				"student-batch": "",
				"student-section": "",
				"student-result": "",
				"student-achievements": "",
				"student-cocurricular": "",
				"student-extracurricular": "",
			});
		} catch (err) {
			setError("Error adding student.");
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
							id="add-form"
							onSubmit={handleSubmit}>
							<h2 className="hero-title">Add student</h2>
							<div className="input-box">
								{/* Input fields for all student data */}
								{Object.entries(formData).map(([key, value]) => (
									<div
										className="input-container"
										key={key}>
										<input
											type="text"
											name={key}
											placeholder={key
												.replace("student-", "")
												.replace(/-/g, " ")
												.replace(/\b\w/g, (l) => l.toUpperCase())}
											value={value}
											onChange={handleChange}
											required
											disabled={loading}
										/>
									</div>
								))}
								<button
									className="btn add-btn"
									type="submit"
									disabled={loading}>
									{loading ? "Adding..." : "Add Student"}
								</button>
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

export default AddStudent;
