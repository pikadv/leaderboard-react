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
				</div>
				<div className="hero-cta">
					<table className="ranking-table">
						<thead>
							<tr>
								<th>Email</th>
								<th>Faculty</th>
								<th>Admin</th>
								<th>Toggle Faculty</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.uid}>
									<td>{user.email}</td>
									<td>{user.faculty}</td>
									<td>{user.admin}</td>
									<td>
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
