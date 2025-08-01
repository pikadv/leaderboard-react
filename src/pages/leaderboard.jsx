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
	const [expandedRow, setExpandedRow] = useState(null);

	// Helper to normalize filter values for Firestore (trim and uppercase)
	const normalizeFirestore = (val) => val.trim().toUpperCase();
	// Helper to normalize for client-side (trim and lowercase)
	const normalizeClient = (val) => val.trim().toLowerCase();

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
		const batchValClient = normalizeClient(batch);
		const departmentValClient = normalizeClient(department);
		const sectionValClient = normalizeClient(section);

		// If all filters are empty, fetch all and show top N
		if (!batchValClient && !departmentValClient && !sectionValClient) {
			const allData = await fetchLeaderboard({
				batch: "",
				department: "",
				section: "",
				load_more: 1000,
			});
			setStudents(allData.slice(0, limit));
			setLoading(false);
			return;
		}

		// If any filter is set, fetch all and filter on client (partial/case-insensitive)
		const allData = await fetchLeaderboard({
			batch: "",
			department: "",
			section: "",
			load_more: 1000,
		});
		const filtered = filterStudents(
			allData,
			batchValClient,
			departmentValClient,
			sectionValClient
		);
		setStudents(filtered.slice(0, limit));
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
											placeholder="221 | 222 | 223 | etc."
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
											placeholder="CSE | NFE | EEE | etc."
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
											placeholder="A | B | C | etc."
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

					{/* Desktop Table - always rendered, hidden on mobile by CSS */}
					<table
						className="ranking-table desktop-leaderboard"
						style={{ marginTop: 32 }}>
						<thead>
							<tr>
								<th>Rank</th>
								<th>Name</th>
								<th>CGPA</th>
								<th className="hide-mobile">Achievements</th>
								<th className="hide-mobile">Co C.</th>
								<th className="hide-mobile">Extra C.</th>
								<th className="show-mobile"></th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan={7}>Loading...</td>
								</tr>
							) : students.length === 0 ? (
								<tr>
									<td colSpan={7}>No data found.</td>
								</tr>
							) : (
								students.map((student, idx) => (
									<React.Fragment key={student.id || idx}>
										<tr>
											<td>
												<p>{idx + 1}</p>
											</td>
											<td>
												<p>
													<a
														className="profile-link"
														href={`/profile/${student.id}`}>
														{student.profileLocked
															? "Anonymous"
															: student["student-name"]}
													</a>
												</p>
											</td>
											<td>
												<p>{student["student-result"]}</p>
												<p>/4.00</p>
											</td>
											<td className="hide-mobile">
												<p>{student["student-achievements"]}</p>
											</td>
											<td className="hide-mobile">
												<p>{student["student-cocurricular"]}</p>
											</td>
											<td className="hide-mobile">
												<p>{student["student-extracurricular"]}</p>
											</td>
											<td className="show-mobile">
												<button
													type="button"
													className="btn btn-light more-btn"
													onClick={() =>
														setExpandedRow(expandedRow === idx ? null : idx)
													}
													aria-label="Show more details">
													{expandedRow === idx ? "Less" : "More"}
												</button>
											</td>
										</tr>
										{expandedRow === idx && (
											<tr className="expand-row show-mobile">
												<td colSpan={7}>
													<div className="expand-details">
														<div>
															<strong>Achievements:</strong>{" "}
															{student["student-achievements"]}
														</div>
														<div>
															<strong>Co C.:</strong>{" "}
															{student["student-cocurricular"]}
														</div>
														<div>
															<strong>Extra C.:</strong>{" "}
															{student["student-extracurricular"]}
														</div>
													</div>
												</td>
											</tr>
										)}
									</React.Fragment>
								))
							)}
						</tbody>
					</table>

					{/* Mobile Card Layout - always rendered, hidden on desktop by CSS */}
					<div
						className="mobile-leaderboard-list"
						style={{ marginTop: 32 }}>
						{loading ? (
							<div className="centered-message">Loading...</div>
						) : students.length === 0 ? (
							<div className="centered-message">No data found.</div>
						) : (
							students.map((student, idx) => (
								<div
									key={student.id || idx}
									className={`mobile-leaderboard-card${
										expandedRow === idx ? " expanded" : ""
									}`}
									style={{
										marginBottom: 16,
										border: "1px solid #eee",
										borderRadius: 12,
										padding: 16,
										background: expandedRow === idx ? "#f8f8f8" : "#fff",
									}}>
									<div className="mobile-leaderboard-card-row">
										<div style={{ fontWeight: "bold", fontSize: 18 }}>
											#{idx + 1}
										</div>
										<div style={{ fontWeight: "bold" }}>
											<a
												className="profile-link"
												href={`/profile/${student.id}`}>
												{student.profileLocked
													? "Anonymous"
													: student["student-name"]}
											</a>
										</div>
										<div style={{ fontWeight: "bold", color: "#ff9800" }}>
											{student["student-result"]}{" "}
											<span style={{ fontWeight: "normal", color: "#888" }}>
												/4.00
											</span>
										</div>
									</div>
									<button
										type="button"
										className="btn btn-light more-btn"
										onClick={() =>
											setExpandedRow(expandedRow === idx ? null : idx)
										}
										aria-label="Show more details"
										style={{ width: "100%", marginTop: 12 }}>
										{expandedRow === idx ? "Less" : "More"}
									</button>
									{expandedRow === idx && (
										<div
											className="expand-details"
											style={{ marginTop: 12 }}>
											<div>
												<strong>Achievements:</strong>{" "}
												{student["student-achievements"]}
											</div>
											<div>
												<strong>Co C.:</strong>{" "}
												{student["student-cocurricular"]}
											</div>
											<div>
												<strong>Extra C.:</strong>{" "}
												{student["student-extracurricular"]}
											</div>
										</div>
									)}
								</div>
							))
						)}
					</div>

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
