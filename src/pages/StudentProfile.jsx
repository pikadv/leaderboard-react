import React, { useEffect, useRef, useState } from "react";
import {
	fetchStudentById,
	fetchLeaderboard,
	updateStudent,
} from "../firebaseDb";
import { EditCard } from "../components/EditCard";
import RandomChar from "../common/randomchar";
import { getCurrentUser, onAuthChange } from "../auth";
import {
	getCurrentStudentIdForUser,
	setCurrentStudentIdForUser,
} from "../userProfileDb";

// If you have these assets in your public folder, use process.env.PUBLIC_URL or just '/assets/...'
const assets = {
	logo: "/assets/logo.png",
	bell: "/assets/bell icon.svg",
	avatar: "/assets/avatar icon.png",
	menu: "/assets/Menu icon.svg",
	profile: "/assets/profile_image.svg",
	edit: "/assets/edit icon.svg",
	badge10: "/assets/10_percent.png",
	badge5: "/assets/05_percent.png",
	badge1: "/assets/01_percent.png",
};

const style = `
/*── Base & Reset ─────────────────────────────────────────────────*/
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 100%; max-width: 100vw; overflow-x: hidden; }
body { color: #363636; line-height: 1.5; background: #fff; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; width: 100%; box-sizing: border-box; }
h1, h2 { margin: 0; }
p { margin: 0; }
.icon-btn { background: none; border: none; padding: .5rem; cursor: pointer; }
.icon-btn .icon { width: 1.5rem; height: 1.5rem; display: block; filter: brightness(0) saturate(100%); }
.icon-btn svg { width: 1.5rem; height: 1.5rem; fill: currentColor; }
.page-header { border-bottom: 1px solid #e0e0e0; }
.header__inner { display: flex; align-items: center; justify-content: space-between; height: 80px; }
.header__actions { display: flex; align-items: center; gap: 1rem; }
.avatar { width: 2.5rem; height: 2.5rem; border-radius: 50%; }
.profile-top { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 2rem; padding: 2rem 0; border-bottom: 1px solid #e0e0e0; width: 100%; box-sizing: border-box; }
.profile-left { display: flex; flex-direction: column; align-items: center; gap: 1rem; flex: 0 0 auto; width: 100%; }
.profile-left .profile-photo { width: 10rem; height: 10rem; border-radius: 50%; object-fit: cover; }
.profile-left .edit-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #ccc; border-radius: 20px; background: #fff; cursor: pointer; }
.profile-left .edit-btn svg { width: 1rem; height: 1rem; fill: #363636; }
.profile-center { display: flex; flex-direction: column; gap: 0.5rem; flex: 1 1 200px; min-width: 0; width: 100%; box-sizing: border-box; }
.profile-center h1 { font-size: clamp(1.5rem, 5vw, 2.5rem); }
.profile-center .subtitle { color: #5f5f5f; font-size: 1rem; }
.profile-center .quick-stats { display: flex; gap: 2rem; list-style: none; flex-wrap: wrap; }
.profile-center .quick-stats li { display: flex; flex-direction: column; font-size: 0.9rem; }
.profile-center .quick-stats strong { margin-bottom: 0.25rem; color: #5f5f5f; }
.profile-stats { display: flex; gap: 2rem; flex: 0 0 auto; flex-wrap: wrap; align-self: center; width: 100%; box-sizing: border-box; }
.stat { text-align: center; min-width: 80px; }
.stat h2 { font-size: 1rem; margin-bottom: 0.5rem; }
.stat .value { font-size: clamp(1.25rem, 4vw, 2rem); color: #f8894b; }
@media (max-width: 900px) {
  .container { max-width: 100vw; padding: 0 1rem; }
  .profile-top { flex-direction: column; align-items: center; gap: 1.2rem; padding: 1.2rem 0; width: 100%; }
  .profile-left { width: 100%; align-items: center; }
  .profile-center, .profile-stats { width: 100%; justify-content: center; align-items: center; min-width: 0; }
  .profile-center h1 { font-size: 1.5rem; }
  .profile-center .quick-stats { gap: 1.2rem; justify-content: center; }
  .profile-stats { flex-direction: row; gap: 1.2rem; align-self: center; }
  .stat { min-width: 70px; }
}
@media (max-width: 600px) {
	* { min-width: 0 !important;}
  .container { max-width: 100vw; padding: 0 0.75rem; }
  .profile-top { gap: 0.7rem; padding: 0.7rem 0; width: 100%; }
  .profile-left .profile-photo, .profile-left > div { width: 6rem !important; height: 6rem !important; min-width: 0 !important; }
  .profile-center h1 { font-size: 1.1rem; }
  .profile-center .subtitle { font-size: 0.95rem; }
  .profile-center .quick-stats { gap: 0.7rem; }
  .stat h2 { font-size: 0.95rem; }
  .stat .value { font-size: 1.1rem; }
}
.subtitle { color: #5f5f5f; margin-bottom: 1rem; }
.edit-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #ccc; border-radius: 20px; background: #fff; color: #5f5f5f; cursor: pointer; transition: border-color 0.3s, color 0.3s, filter 0.3s; }
.edit-btn .edit-icon { width: 1rem; height: 1rem; filter: brightness(0) saturate(100%) opacity(0.5); transition: filter 0.3s; }
.edit-btn:hover { border-color: #000; color: #000; }
.edit-btn:hover .edit-icon { filter: brightness(0) saturate(100%) opacity(1); }
.edit-icon { width: 1rem; height: 1rem; filter: brightness(0) saturate(100%); }
.edit-btn svg { width: 1rem; height: 1rem; fill: #363636; }
.quick-stats { display: flex; gap: 2rem; flex-wrap: wrap; list-style: none; }
.quick-stats li { display: flex; flex-direction: column; font-size: .9rem; }
.quick-stats strong { margin-bottom: .25rem; color: #5f5f5f; }
.profile-stats { display: flex; gap: 2rem; flex-wrap: wrap; }
.stat { flex: 1 1 70px; text-align: center; }
.stat h2 { font-size: 1rem; margin-bottom: .5rem; }
.stat .value { font-size: clamp(1.25rem, 4vw, 2rem); color: #f8894b; }
.badges h3, .profile-lock h3 { font-size: clamp(1.5rem, 5vw, 2.5rem); margin-bottom: rem; }
.badges-section { display: flex; justify-content: space-between; align-items: center; padding: 2rem 0; border-bottom: 1px solid #e0e0e0; width: 100%; box-sizing: border-box; }
.badges-container { display: flex; justify-content: space-between; align-items: flex-start; width: 100%; gap: 4rem; box-sizing: border-box; }
.badges-list .badge { display: flex; flex-direction: column; align-items: center; text-align: center; }
.badges-list .badge img { margin-bottom: 0.5rem; }
.badges-wrapper { flex: 1; }
.badges-wrapper h2 { margin-bottom: 1rem; }
.badges { flex: 1 1 300px; margin-top: 1rem; width: 100%; }
.badges-list { display: flex; gap: 2rem; flex-wrap: wrap; }
.badge img { width: 6rem; height: 6rem; object-fit: contain; }
.badge span { display: block; margin-top: .5rem; font-size: .9rem; }
.lock-wrapper { display: flex; flex-direction: column; align-items: center; }
.lock-wrapper h2 { margin-bottom: 1rem; white-space: nowrap; }
.profile-lock { flex: 0 0 auto; display: flex; flex-direction: column; align-items: flex-start; }
.switch { position: relative; display: inline-block; width: 3rem; height: 1.5rem; margin-top: 2rem; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: #ccc; border-radius: 1.5rem; transition: .3s; }
.slider::before { content: ""; position: absolute; height: 1.25rem; width: 1.25rem; left: .125rem; bottom: .125rem; background: #fff; border-radius: 50%; transition: .3s; }
.switch input:checked+.slider { background: #4cd137; }
.switch input:checked+.slider::before { transform: translateX(1.5rem); }
@media (max-width: 900px) {
  .badges-section { flex-direction: column; align-items: stretch; gap: 1.2rem; padding: 1.2rem 0; width: 100%; }
  .badges-container { flex-direction: column; gap: 1.2rem; align-items: stretch; width: 100%; }
  .badges-list { flex-direction: row; gap: 1.2rem; justify-content: center; flex-wrap: wrap; }
  .badges { width: 100%; }
  .profile-lock { align-items: flex-start; margin-top: 1rem; }
}
@media (max-width: 700px) {
  .badges-container { flex-direction: column; align-items: center !important; gap: 1.5rem; }
  .profile-lock { margin-left: 0 !important; align-items: center !important; width: 100%; text-align: center; }
}
@media (max-width: 600px) {
  .badges-section { padding: 0.7rem 0; width: 100%; }
  .badges-list .badge img { width: 3.5rem; height: 3.5rem; }
  .badges-list { gap: 0.7rem; }
}
.others-section { padding: 2rem 0; width: 100%; box-sizing: border-box; }
.others-cards { display: grid; gap: 1rem; grid-template-columns: repeat(3, 1fr); width: 100%; box-sizing: border-box; }
@media (max-width: 992px) { .others-cards { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 900px) { .others-cards { grid-template-columns: 1fr; gap: 0.7rem; width: 100%; } }
@media (max-width: 600px) { .others-cards { grid-template-columns: 1fr; gap: 0.5rem; width: 100%; } }
.other-card { padding: 1.5rem; border-radius: 12px; color: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 8rem; width: 100%; box-sizing: border-box; }
.other-value { font-size: clamp(1.5rem, 5vw, 2.25rem); }
.other-label { font-size: 1rem; }
.other-card.green  { background: #2ecc71; }
.other-card.blue   { background: #3498db; }
.other-card.purple { background: #8e44ad; }
`;

// Helper to normalize boolean-like strings
function isTruthy(val) {
	if (typeof val === "string") {
		return ["yes", "true", "1"].includes(val.trim().toLowerCase());
	}
	return Boolean(val);
}

export default function StudentProfile() {
	const [studentId, setStudentId] = useState("");
	const [inputId, setInputId] = useState("");
	const [profileLocked, setProfileLocked] = useState(() => {
		return localStorage.getItem("profileLocked") === "true";
	});
	const [student, setStudent] = useState(null);
	const [allStudents, setAllStudents] = useState([]);
	const [calculatedRank, setCalculatedRank] = useState("-");
	const [calculatedPosition, setCalculatedPosition] = useState("-");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [bioInput, setBioInput] = useState("");
	const [showEditCard, setShowEditCard] = useState(false);
	const [saving, setSaving] = useState(false);
	const [saveError, setSaveError] = useState("");
	const [profilePicInput, setProfilePicInput] = useState("");
	const [showPicEdit, setShowPicEdit] = useState(false);
	const editBtnRef = useRef(null);
	const [user, setUser] = useState(null);
	const [userLoading, setUserLoading] = useState(true);
	const [initializing, setInitializing] = useState(true);
	const [mainRank, setMainRank] = useState(null);
	const [batchRank, setBatchRank] = useState(null);
	const [deptRank, setDeptRank] = useState(null);
	const [batchDeptRank, setBatchDeptRank] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthChange(async (u) => {
			setUser(u);
			setUserLoading(false);
			if (u && !studentId) {
				const dbStudentId = await getCurrentStudentIdForUser(u.uid);
				if (dbStudentId) {
					setStudentId(dbStudentId);
					setInputId(dbStudentId);
				} else {
					setInputId("");
				}
			}
			setInitializing(false);
		});
		return () => {
			if (unsubscribe) unsubscribe();
		};
	}, []);

	useEffect(() => {
		// Remove disabling of edit button when profile is locked
		localStorage.setItem("profileLocked", profileLocked);
	}, [profileLocked]);

	useEffect(() => {
		if (!studentId) return;
		setLoading(true);
		setError("");
		setStudent(null);
		fetchStudentById(studentId)
			.then((data) => {
				if (!data) {
					setError("Student not found.");
				} else {
					setStudent(data);
				}
			})
			.catch(() => setError("Error loading student."))
			.finally(() => setLoading(false));
	}, [studentId]);

	useEffect(() => {
		if (student && editMode) {
			setBioInput(student.bio || "");
		}
	}, [student, editMode]);

	useEffect(() => {
		if (student && typeof student.profileLocked !== "undefined") {
			setProfileLocked(!!student.profileLocked);
			localStorage.setItem("profileLocked", String(!!student.profileLocked));
		}
	}, [student]);

	// Calculate score for ranking
	function calcScore(s) {
		let score = 0;
		const cgpa = parseFloat(s["student-result"] || 0);
		const achievements = parseInt(s.achievements || 0);
		const extra = s.extraCurricular ? 1 : 0;
		const co = s.coCurricular ? 1 : 0;
		// Example: CGPA (weight 10), achievements (weight 2), extra/co (weight 1 each)
		score = cgpa * 10 + achievements * 2 + extra + co;
		return score;
	}

	// Fetch all students and calculate rank/position
	useEffect(() => {
		if (!student) return;
		fetchLeaderboard({ load_more: 1500 })
			.then((students) => {
				setAllStudents(students);
				// Overall rank
				const sorted = students.sort(
					(a, b) =>
						parseFloat(b["student-result"]) - parseFloat(a["student-result"])
				);
				const mainIdx = sorted.findIndex(
					(s) => s["student-id"] === student["student-id"]
				);
				setMainRank(mainIdx !== -1 ? mainIdx + 1 : null);
				// Batch + Department rank
				const batchDeptStudents = students.filter(
					(s) =>
						s["student-batch"] &&
						s["student-batch"].toUpperCase() ===
							student["student-batch"].toUpperCase() &&
						s["student-department"] &&
						s["student-department"].toUpperCase() ===
							student["student-department"].toUpperCase()
				);
				const batchDeptSorted = batchDeptStudents.sort(
					(a, b) =>
						parseFloat(b["student-result"]) - parseFloat(a["student-result"])
				);
				const batchDeptIdx = batchDeptSorted.findIndex(
					(s) => s["student-id"] === student["student-id"]
				);
				setBatchDeptRank(batchDeptIdx !== -1 ? batchDeptIdx + 1 : null);
			})
			.catch(() => {
				setMainRank(null);
				setBatchRank(null);
				setDeptRank(null);
				setBatchDeptRank(null);
			});
	}, [student]);

	const handleEditClick = () => {
		// Remove the profileLocked check so edit always opens
		setShowEditCard(true);
	};

	const handleEditCancel = () => {
		setShowEditCard(false);
	};

	const handleEditSave = async (updatedFields) => {
		setSaving(true);
		setSaveError("");
		try {
			await updateStudent(student.id, updatedFields);
			setStudent((prev) => ({ ...prev, ...updatedFields }));
			setShowEditCard(false);
		} catch (err) {
			setSaveError("Failed to save bio. Please try again.");
		} finally {
			setSaving(false);
		}
	};

	const handleLoadProfile = async () => {
		if (user && inputId.trim()) {
			await setCurrentStudentIdForUser(user.uid, inputId.trim());
			setStudentId(inputId.trim());
		}
	};

	const handleProfileLockToggle = async (checked) => {
		setProfileLocked(checked);
		if (student) {
			await updateStudent(student.id, { profileLocked: checked });
			setStudent((prev) => ({ ...prev, profileLocked: checked }));
		}
	};

	if (initializing) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "80vh",
				}}>
				<style>{style}</style>
				<p>Loading...</p>
			</div>
		);
	}

	if (!studentId) {
		if (userLoading) {
			return (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "60vh",
					}}>
					<style>{style}</style>
					<p>Loading user...</p>
				</div>
			);
		}
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "80vh",
					background: "#f7f7fa",
					width: "100vw",
					overflowX: "auto",
				}}>
				<style>{style}</style>
				<div
					style={{
						background: "#fff",
						borderRadius: 18,
						boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
						padding: "2rem 1rem",
						width: "100%",
						maxWidth: 370,
						boxSizing: "border-box",
						margin: "0 auto",
						// Responsive: allow up to 95vw on small screens
						"@media (max-width: 420px)": { maxWidth: "95vw" },
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "1.5rem",
					}}>
					<h2
						style={{
							fontSize: "2rem",
							fontWeight: 700,
							color: "#363636",
							marginBottom: 0,
						}}>
						Enter Student ID
					</h2>
					<p
						style={{
							color: "#888",
							fontSize: "1.08rem",
							marginBottom: 0,
							textAlign: "center",
						}}>
						To view your profile, please enter your Student ID below.
					</p>
					<input
						type="text"
						placeholder="Student ID"
						value={inputId}
						onChange={(e) => setInputId(e.target.value)}
						style={{
							padding: "0.85rem 1.2rem",
							fontSize: "1.08rem",
							borderRadius: 10,
							border: "1.5px solid #e0e0e0",
							marginBottom: 0,
							width: "100%",
							background: "#fafbfc",
							outline: "none",
							boxSizing: "border-box",
						}}
					/>
					<button
						style={{
							padding: "0.85rem 2.2rem",
							fontSize: "1.08rem",
							borderRadius: 10,
							background: user ? "#f8894b" : "#e0e0e0",
							color: user ? "#fff" : "#aaa",
							border: "none",
							cursor: user ? "pointer" : "not-allowed",
							opacity: user ? 1 : 0.7,
							fontWeight: 600,
							marginTop: 8,
							width: "100%",
							transition: "background 0.2s, color 0.2s",
						}}
						disabled={!inputId.trim() || !user}
						onClick={handleLoadProfile}>
						{user ? "Load Profile" : "Waiting for user..."}
					</button>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "60vh",
				}}>
				<style>{style}</style>
				<p>Loading student profile...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "60vh",
				}}>
				<style>{style}</style>
				<p style={{ color: "red" }}>{error}</p>
				<button
					onClick={() => {
						setStudentId("");
						setInputId("");
					}}>
					Try Another ID
				</button>
			</div>
		);
	}

	if (!student) return null;

	return (
		<div>
			<style>{style}</style>
			{showEditCard && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						background: "rgba(0,0,0,0.3)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1000,
					}}>
					<EditCard
						student={student}
						onCancel={handleEditCancel}
						onSave={handleEditSave}
					/>
					{saving && (
						<div
							style={{
								position: "absolute",
								top: 10,
								right: 10,
								background: "#fff",
								padding: "0.5rem 1rem",
								borderRadius: 6,
								boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
							}}>
							Saving...
						</div>
					)}
					{saveError && (
						<div
							style={{
								position: "absolute",
								top: 40,
								right: 10,
								color: "red",
								background: "#fff",
								padding: "0.5rem 1rem",
								borderRadius: 6,
								boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
							}}>
							{saveError}
						</div>
					)}
				</div>
			)}
			<main className="profile-page">
				<div className="container">
					{/* Unload Profile Button */}
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							marginTop: 16,
						}}>
						<button
							style={{
								padding: "0.5rem 1.5rem",
								fontSize: "1rem",
								borderRadius: 6,
								background: "#e74c3c",
								color: "#fff",
								border: "none",
								cursor: "pointer",
							}}
							onClick={async () => {
								if (user) await setCurrentStudentIdForUser(user.uid, "");
								setStudentId("");
								setInputId("");
							}}>
							Unload Profile
						</button>
					</div>

					{/* Profile Card */}
					<section
						className="profile-top enhanced-profile-card"
						style={{
							background: "#fff",
							borderRadius: 18,
							boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
							padding: "2rem 1rem",
							margin: "32px auto 24px auto",
							maxWidth: 700,
							border: "1px solid #f2f2f2",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							boxSizing: "border-box",
							left: 0,
							right: 0,
							marginLeft: "auto",
							marginRight: "auto",
						}}>
						{/* Left column: picture + edit button */}
						<div className="profile-left">
							<div
								style={{
									width: "10rem",
									height: "10rem",
									borderRadius: "50%",
									overflow: "hidden",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									background: "#f5f5f5",
									boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
								}}>
								{student && student.profilePicture ? (
									<img
										src={student.profilePicture}
										alt="Profile"
										style={{
											width: "100%",
											height: "100%",
											borderRadius: "50%",
											objectFit: "cover",
										}}
										onError={(e) => {
											e.target.onerror = null;
											e.target.src = undefined;
										}}
									/>
								) : (
									<RandomChar
										name={student ? student["student-name"] : ""}
										size={160}
										style={{ marginBottom: 8 }}
									/>
								)}
							</div>
							<button
								className="edit-btn"
								ref={editBtnRef}
								onClick={handleEditClick}>
								Edit
								<img
									src={assets.edit}
									alt="Edit"
									className="edit-icon"
								/>
							</button>
						</div>
						{/* Middle column: name, subtitle, quick stats */}
						<div
							className="profile-center"
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "100%",
							}}>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 4 }}>
									{student.profileLocked
										? "Anonymous"
										: student["student-name"] || "No Name"}
								</h1>
								<p
									className="subtitle"
									style={{ marginBottom: 12 }}>
									{student.bio || "No bio set."}
								</p>
								<ul
									className="quick-stats"
									style={{ marginBottom: 0 }}>
									<li>
										<strong>Department</strong>
										<span>{student["student-department"] || "-"}</span>
									</li>
									<li>
										<strong>Batch</strong>
										<span>{student["student-batch"] || "-"}</span>
									</li>
									<li>
										<strong>Section</strong>
										<span>{student["student-section"] || "-"}</span>
									</li>
								</ul>
							</div>
							{batchDeptRank !== null && (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										minWidth: 120,
									}}
									className="main-rank-beside">
									<span
										style={{
											fontSize: 64,
											fontWeight: 800,
											color: "#f8894b",
											lineHeight: 1,
										}}>
										#{batchDeptRank}
									</span>
									<span
										style={{
											fontSize: 16,
											color: "#888",
											fontWeight: 600,
											marginTop: 6,
										}}>
										Rank
									</span>
								</div>
							)}
						</div>
						{/* Stats grid */}
						<div
							className="profile-stats enhanced-profile-stats"
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
								gap: 18,
								background: "#f8fafc",
								borderRadius: 12,
								padding: "2rem 2rem 1.5rem 2rem",
								margin: "32px 0 0 0",
								border: "1px solid #e0e0e0",
								justifyItems: "center",
								alignItems: "center",
							}}>
							<div className="stat">
								<h2>Overall Rank</h2>
								<p className="value rank-badge main-rank">
									{mainRank !== null
										? `#${mainRank} / ${allStudents.length}`
										: "-"}
								</p>
							</div>
							<div className="stat">
								<h2>Department Rank (Batch wise)</h2>
								<p className="value rank-badge batch-dept-rank">
									{batchDeptRank !== null
										? `#${batchDeptRank} / ${
												allStudents.filter(
													(s) =>
														s["student-batch"] &&
														s["student-department"] &&
														student["student-batch"] &&
														student["student-department"] &&
														s["student-batch"].toUpperCase() ===
															student["student-batch"].toUpperCase() &&
														s["student-department"].toUpperCase() ===
															student["student-department"].toUpperCase()
												).length
										  }`
										: "-"}
								</p>
							</div>
							<div className="stat">
								<h2>CGPA</h2>
								<p className="value">
									{student["student-result"]
										? parseFloat(student["student-result"]).toFixed(2)
										: "-"}
								</p>
							</div>
						</div>
					</section>

					{/* Badges + Profile Lock */}
					<section
						className="badges-section"
						style={{
							background: "#f8fafc",
							borderRadius: 14,
							border: "1px solid #e0e0e0",
							margin: "0 auto 32px auto",
							padding: "2rem 2.5rem 1.5rem 2.5rem",
							maxWidth: 700,
						}}>
						<div
							className="badges-container"
							style={{ alignItems: "center" }}>
							<div className="badges">
								<h2 style={{ fontSize: 20, marginBottom: 10 }}>Badges</h2>
								<div className="badges-list">
									{(() => {
										const total = allStudents.length || 1;
										const rank = Number(mainRank);
										const badges = [];
										if (rank && rank <= total * 0.1) {
											badges.push(
												<div
													className="badge"
													key="10">
													<img
														src={assets.badge10}
														alt="Top 10%"
													/>
													<span>Top 10%</span>
												</div>
											);
										}
										if (rank && rank <= total * 0.05) {
											badges.push(
												<div
													className="badge"
													key="5">
													<img
														src={assets.badge5}
														alt="Top 5%"
													/>
													<span>Top 5%</span>
												</div>
											);
										}
										if (rank && rank <= total * 0.01) {
											badges.push(
												<div
													className="badge"
													key="1">
													<img
														src={assets.badge1}
														alt="Top 1%"
													/>
													<span>Top 1%</span>
												</div>
											);
										}
										if (badges.length === 0) {
											badges.push(<span key="none">No badge</span>);
										}
										return badges;
									})()}
								</div>
							</div>
							{/* right side: the profile-lock control */}
							<div
								className="profile-lock"
								style={{ marginLeft: 32 }}>
								<h2 style={{ fontSize: 18, marginBottom: 8 }}>Privacy Mode</h2>
								<label className="switch">
									<input
										type="checkbox"
										checked={profileLocked}
										onChange={(e) => handleProfileLockToggle(e.target.checked)}
									/>
									<span className="slider"></span>
								</label>
							</div>
						</div>
						<style>{`
  @media (max-width: 700px) {
    .badges-container { flex-direction: column; align-items: center !important; gap: 1.5rem; }
    .profile-lock { margin-left: 0 !important; align-items: center !important; width: 100%; text-align: center; }
  }
`}</style>
					</section>

					{/* Actions: Check LeaderBoard button */}
					<div
						className="profile-actions"
						style={{ margin: "1.5rem 0 2.5rem 0", textAlign: "center" }}>
						<a
							href="/leaderboard"
							className="btn btn-light"
							style={{
								fontWeight: 600,
								padding: "0.7rem 2rem",
								borderRadius: 20,
								fontSize: "1.1rem",
								background: "#f8894b",
								color: "#fff",
								border: "none",
								boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
								transition: "background 0.2s, color 0.2s",
								cursor: "pointer",
							}}>
							Check the LeaderBoard
						</a>
					</div>

					{/* Others */}
					<section
						className="others-section"
						style={{ maxWidth: 700, margin: "0 auto" }}>
						<h2>Others</h2>
						<div className="others-cards">
							<div className="other-card green">
								<p className="other-value">
									{Number.isFinite(parseInt(student["student-achievements"]))
										? parseInt(student["student-achievements"])
										: 0}
								</p>
								<p className="other-label">Achievements</p>
							</div>
							<div className="other-card blue">
								<p className="other-value">
									{isTruthy(student["student-extracurricular"]) ? "Yes" : "No"}
								</p>
								<p className="other-label">Extra Curricular</p>
							</div>
							<div className="other-card purple">
								<p className="other-value">
									{isTruthy(student["student-cocurricular"]) ? "Yes" : "No"}
								</p>
								<p className="other-label">Co-Curricular</p>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
