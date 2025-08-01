import React, { useState } from "react";

const style = `
.edit-card {
  align-items: flex-start;
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem;
  position: relative;
  width: 30rem;
}
.edit-card .container {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}
.edit-card .title {
  align-self: stretch;
  color: #363636;
  font-family: "Aeonik TRIAL-Bold", Helvetica, Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
}
.edit-card .div {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
}
.edit-card .container-2 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 13.75rem;
  justify-content: center;
  width: 100%;
}
.edit-card .subtitle {
  align-self: stretch;
  color: #363636;
  font-family: "Aeonik TRIAL-Regular", Helvetica, Arial, sans-serif;
  font-size: 1.75rem;
  font-weight: 400;
}
.edit-card .profile-picture {
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  gap: 4rem;
}
.edit-card .ellipse {
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  object-fit: cover;
}
.edit-card .vector {
  height: 1.375rem;
  left: 4.25rem;
  position: absolute;
  top: 4.3rem;
  width: 1.56rem;
}
.edit-card .container-3 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.edit-card .text-wrapper {
  align-self: stretch;
  color: #363636;
  font-family: "Aeonik TRIAL-Regular", Helvetica, Arial, sans-serif;
  font-size: 1.75rem;
  font-weight: 400;
}
.edit-card .bio-container {
  align-items: flex-end;
  align-self: stretch;
  border-bottom: 1px solid #bfbfbf;
  display: flex;
  gap: 4rem;
  padding: 1rem 1rem 0.5rem;
  width: 100%;
}
.edit-card .bio-text {
  color: #b8b8b8;
  font-family: "Aeonik TRIAL-Regular", Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.045em;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}
.edit-card .button-container {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  gap: 1rem;
  width: 100%;
}
.edit-card .web-buttons-instance {
  border: 1px solid #b8b8b8 !important;
  flex: 1 1 0%;
  padding: 0.75rem 2.5rem !important;
  background: #fff;
  color: #b8b8b8;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.3s, color 0.3s;
}
.edit-card .web-buttons-instance:hover {
  border-color: #363636;
  color: #363636;
}
.edit-card .web-buttons-2 {
  flex: 1 1 0%;
  padding: 0.75rem 2.5rem !important;
  background: #f8894b;
  color: #fff !important;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}
.edit-card .web-buttons-2:hover {
  background: #d97706;
}
@media (max-width: 600px) {
  .edit-card {
    width: 100%;
    padding: 1rem;
    gap: 2rem;
  }
}
`;

export const EditCard = ({ student, onSave, onCancel }) => {
	const [bio, setBio] = useState(student?.bio || "");
	const [profilePicture, setProfilePicture] = useState(
		student?.profilePicture || ""
	);

	const handleSave = () => {
		if (onSave) onSave({ bio, profilePicture });
	};

	return (
		<>
			<style>{style}</style>
			<div className="edit-card">
				<div className="container">
					<div className="title">Edit Profile</div>
					<div className="div">
						<div className="container-3">
							<div className="text-wrapper">Set bio</div>
							<div className="bio-container">
								<input
									type="text"
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									className="bio-text"
									style={{
										width: "100%",
										fontSize: "1.2rem",
										color: "#363636",
										background: "none",
										border: "none",
										outline: "none",
									}}
								/>
							</div>
							<div style={{ marginTop: 18, width: "100%" }}>
								<label
									style={{ fontWeight: 500, color: "#363636", fontSize: 16 }}>
									Profile Picture Link
								</label>
								<input
									type="text"
									placeholder="Paste image URL..."
									value={profilePicture}
									onChange={(e) => setProfilePicture(e.target.value)}
									style={{
										width: "100%",
										fontSize: "1.1rem",
										marginTop: 6,
										padding: "0.5rem 1rem",
										borderRadius: 8,
										border: "1.5px solid #e0e0e0",
										color: "#363636",
										background: "#fafbfc",
									}}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="button-container">
					<button
						className="web-buttons-instance design-component-instance-node"
						onClick={onCancel}>
						Cancel
					</button>
					<button
						className="web-buttons-2 web-buttons-3"
						onClick={handleSave}>
						Save
					</button>
				</div>
			</div>
		</>
	);
};
