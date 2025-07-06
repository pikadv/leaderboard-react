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

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setSuccess("");
		setError("");
		try {
			await addStudent(formData);
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
							onSubmit={handleSubmit}>
							<h2 className="hero-title">Add student info</h2>
							<div className="input-box">
								<div className="input-container">
									<input
										type="text"
										id="student-name"
										name="student-name"
										placeholder="Enter student name"
										required
										value={formData["student-name"]}
										onChange={handleChange}
									/>
								</div>
								<div className="input-container">
									<input
										type="text"
										id="student-id"
										name="student-id"
										placeholder="Enter student ID"
										required
										value={formData["student-id"]}
										onChange={handleChange}
									/>
								</div>
								<div className="input-container">
									<input
										type="text"
										id="student-department"
										name="student-department"
										placeholder="Enter department"
										required
										value={formData["student-department"]}
										onChange={handleChange}
									/>
								</div>
								<div className="input-container">
									<input
										type="text"
										id="student-batch"
										name="student-batch"
										placeholder="Enter batch"
										required
										value={formData["student-batch"]}
										onChange={handleChange}
									/>
								</div>
								<div className="input-container">
									<input
										type="text"
										id="student-section"
										name="student-section"
										placeholder="Enter section"
										required
										value={formData["student-section"]}
										onChange={handleChange}
									/>
								</div>
								<div className="input-container">
									<input
										type="text"
										id="student-result"
										name="student-result"
										placeholder="Enter CGPA"
										required
										value={formData["student-result"]}
										onChange={handleChange}
									/>
								</div>
								<div className="input-container">
									<input
										type="text"
										id="student-achievements"
										name="student-achievements"
										placeholder="Enter achievements"
										value={formData["student-achievements"]}
										onChange={handleChange}
									/>
								</div>
								<div className="input-container">
									<input
										type="text"
										id="student-cocurricular"
										name="student-cocurricular"
										placeholder='Set co-curricular - "Yes/No"'
										value={formData["student-cocurricular"]}
										onChange={handleChange}
									/>
								</div>
								<div className="input-container">
									<input
										type="text"
										id="student-extracurricular"
										name="student-extracurricular"
										placeholder='Set extra-curricular - "Yes/No"'
										value={formData["student-extracurricular"]}
										onChange={handleChange}
									/>
								</div>
							</div>
							<button
								className="btn add-btn"
								type="submit"
								disabled={loading}>
								{loading ? "Adding..." : "Add"}
							</button>
							<br />
							{success && <div style={{ color: "green" }}>{success}</div>}
							{error && <div style={{ color: "red" }}>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default AddStudent;
