import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthChange, getFacultyStatus } from "../auth";

// FacultyRoute: Protects routes for faculty only, shows loading while checking
const FacultyRoute = ({ children }) => {
	const [checking, setChecking] = useState(true);
	const [allowed, setAllowed] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthChange(async (user) => {
			if (!user) {
				navigate("/login");
				return;
			}
			// Check faculty status in Firestore
			const status = await getFacultyStatus(user.uid);
			if (status === "yes") {
				setAllowed(true);
			} else {
				navigate("/login");
			}
			setChecking(false);
		});
		return () => unsubscribe();
	}, [navigate]);

	if (checking) {
		return (
			<div
				style={{
					minHeight: "40vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "1.2rem",
				}}>
				Checking faculty access...
			</div>
		);
	}
	return allowed ? children : null;
};

export default FacultyRoute;
