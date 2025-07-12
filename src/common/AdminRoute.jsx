import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthChange, getAdminStatus } from "../auth";

// AdminRoute: Protects routes for admin only, shows loading while checking
const AdminRoute = ({ children }) => {
	const [checking, setChecking] = useState(true);
	const [allowed, setAllowed] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthChange(async (user) => {
			if (!user) {
				navigate("/login");
				return;
			}
			// Check admin status in Firestore
			const status = await getAdminStatus(user.uid);
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
				Checking admin access...
			</div>
		);
	}
	return allowed ? children : null;
};

export default AdminRoute;
