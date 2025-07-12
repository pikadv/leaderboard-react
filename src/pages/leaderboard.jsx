// Leaderboard.jsx
// Displays the leaderboard with filtering and loading states
import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "../firebaseDb";

const Leaderboard = () => {
	// State for filters and leaderboard data
	const [batch, setBatch] = useState("");
	const [department, setDepartment] = useState("");
	const [section, setSection] = useState("");
	const [students, setStudents] = useState([]);
	const [loadLimit, setLoadLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const [showFilters, setShowFilters] = useState(false);

	// Helper to normalize and lowercase filter values
	const normalize = (val) => {
		const v = val.trim().toLowerCase();
		return v === "all" || v === "" ? "" : v;
	};

	// Filter students by batch, department, and section
	const filterStudents = (data, batchVal, departmentVal, sectionVal) => {
		return data.filter(
			(student) =>
				(!batchVal ||
					(student["student-batch"] &&
						student["student-batch"].toLowerCase().includes(batchVal))) &&
				(!departmentVal ||
					(student["student-department"] &&
						student["student-department"]
							.toLowerCase()
							.includes(departmentVal))) &&
				(!sectionVal ||
					(student["student-section"] &&
						student["student-section"].toLowerCase().includes(sectionVal)))
		);
	};

	// Handle leaderboard search
	const handleSearch = async (limit) => {
		setLoading(true);
		const batchVal = normalize(batch);
		const departmentVal = normalize(department);
		const sectionVal = normalize(section);

		const usePartial = [batchVal, departmentVal, sectionVal].some(
			(v) => v && v.length < 2
		);
		if (usePartial) {
			const allData = await fetchLeaderboard({
				batch: "",
				department: "",
				section: "",
				load_more: 1000,
			});
			const filtered = filterStudents(
				allData,
				batchVal,
				departmentVal,
				sectionVal
			);
			setStudents(filtered.slice(0, limit));
		} else {
			const data = await fetchLeaderboard({
				batch: batchVal,
				department: departmentVal,
				section: sectionVal,
				load_more: limit,
			});
			setStudents(data || []);
		}
		setLoading(false);
	};

	// Fetch all students on mount
	useEffect(() => {
		setHasSearched(true);
		handleSearch(loadLimit);
		// eslint-disable-next-line
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newLimit = 10;
		setLoadLimit(newLimit);
		setHasSearched(true);
		await handleSearch(newLimit);
		setShowFilters(false);
	};

	const handleLoadMore = async () => {
		const newLimit = loadLimit + 10;
		setLoadLimit(newLimit);
		await handleSearch(newLimit);
	};

	return (
		<main id="main">
			<div id="hero">
				<div className="section-container hero-container leaderboard-container">
					<button
						className="btn btn-light"
						onClick={() => setShowFilters((prev) => !prev)}
						style={{ marginBottom: 16 }}>
						{showFilters ? "Hide Filters" : "Filter"}
					</button>
					{showFilters && (
						<form
							className="hero-main ranking-main"
							onSubmit={handleSubmit}
							style={{ marginBottom: 24 }}>
							<div className="ranking-header underline">
								<p className="form-title">Rankings</p>
							</div>
							<div className="ranking-input-section">
								<div className="input-group">
									<label htmlFor="batch">Batch:</label>
									<div className="input-container">
										<input
											type="text"
											id="batch"
											name="batch"
											placeholder="e.g. 61 (Batch Number)"
											value={batch}
											onChange={(e) => setBatch(e.target.value)}
										/>
									</div>
								</div>
								<div className="input-group">
									<label htmlFor="department">Department:</label>
									<div className="input-container">
										<input
											type="text"
											id="department"
											name="department"
											placeholder="e.g. Computer Science & Engineering"
											value={department}
											onChange={(e) => setDepartment(e.target.value)}
										/>
									</div>
								</div>
								<div className="input-group">
									<label htmlFor="section">Section:</label>
									<div className="input-container">
										<input
											type="text"
											id="section"
											name="section"
											placeholder="e.g. All (or A, B, etc.)"
											value={section}
											onChange={(e) => setSection(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className="ranking-button-section">
								<button
									type="submit"
									className="btn">
									Search
								</button>
							</div>
						</form>
					)}
					<table
						className="ranking-table"
						style={{ marginTop: 32 }}>
						<thead>
							<tr>
								<th>Rank</th>
								<th>Name</th>
								<th>CGPA</th>
								<th>Achievements</th>
								<th>Co C.</th>
								<th>Extra C.</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan={6}>Loading...</td>
								</tr>
							) : students.length === 0 ? (
								<tr>
									<td colSpan={6}>No data found.</td>
								</tr>
							) : (
								students.map((student, idx) => (
									<tr key={student.id || idx}>
										<td>
											<p>{idx + 1}</p>
										</td>
										<td>
											<p>
												<a
													className="profile-link"
													href={`/profile/${student.id}`}>
													{student["student-name"]}
												</a>
											</p>
										</td>
										<td>
											<p>{student["student-result"]}</p>
											<p>/4.00</p>
										</td>
										<td>
											<p>{student["student-achievements"]}</p>
										</td>
										<td>
											<p>{student["student-cocurricular"]}</p>
										</td>
										<td>
											<p>{student["student-extracurricular"]}</p>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
					<div className="ranking-button-section">
						<button
							className="btn btn-light"
							onClick={handleLoadMore}
							disabled={loading}
							style={{ marginTop: 16 }}>
							Load more
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Leaderboard;
