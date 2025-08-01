// Admin.jsx
// Admin dashboard page: lists all users, allows toggling faculty status
import React, { useEffect, useState } from "react";
import {
	getAllUsers,
	setFacultyStatus,
	getCurrentUser,
	getFacultyStatus as fetchFacultyStatus,
	getAdminStatus,
} from "../auth";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		getAllUsers()
			.then((data) => {
				setUsers(data);
				setLoading(false);
			})
			.catch(() => {
				setError("Failed to fetch users");
				setLoading(false);
			});
	}, []);

	const handleToggleFaculty = async (uid, currentStatus) => {
		try {
			await setFacultyStatus(uid, currentStatus === "yes" ? "no" : "yes");
			setUsers((prev) =>
				prev.map((u) =>
					u.uid === uid
						? { ...u, faculty: currentStatus === "yes" ? "no" : "yes" }
						: u
				)
			);
		} catch {
			setError("Failed to update faculty status");
		}
	};

	const handleGoToFaculty = async () => {
		const user = getCurrentUser();
		if (user) {
			const [faculty, admin] = await Promise.all([
				fetchFacultyStatus(user.uid),
				getAdminStatus(user.uid),
			]);
			if (faculty === "yes" && admin === "yes") {
				navigate("/faculty");
			} else {
				alert("No faculty access to this account.");
			}
		}
	};

	if (loading) return <div className="centered-message">Loading users...</div>;
	if (error) return <div className="centered-message">{error}</div>;

	return (
		<div id="hero">
			<div className="section-container hero-container">
				<div className="hero-main">
					<h2 className="hero-title">Admin Page</h2>
					<button
						className="btn"
						style={{ marginBottom: "1rem" }}
						onClick={handleGoToFaculty}>
						Go to Faculty Page
					</button>
					<input
						type="text"
						placeholder="Search by email..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						style={{
							marginBottom: 16,
							padding: 8,
							borderRadius: 6,
							border: "1px solid #ccc",
							width: 260,
						}}
					/>
				</div>
				<div className="hero-cta">
					<table className="admin-table-responsive ranking-table">
						<thead>
							<tr>
								<th>Email</th>
								<th>Faculty</th>
								<th>Admin</th>
								<th>Toggle Faculty</th>
							</tr>
						</thead>
						<tbody>
							{users
								.filter((user) =>
									user.email.toLowerCase().includes(search.toLowerCase())
								)
								.map((user) => (
									<tr key={user.uid}>
										<td data-label="Email">{user.email}</td>
										<td data-label="Faculty">{user.faculty}</td>
										<td data-label="Admin">{user.admin}</td>
										<td data-label="Toggle Faculty">
											<button
												className="btn"
												onClick={() =>
													handleToggleFaculty(user.uid, user.faculty)
												}>
												Toggle
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<p className="hero-text">Manage users and faculty status.</p>
			</div>
		</div>
	);
};

export default AdminPage;
