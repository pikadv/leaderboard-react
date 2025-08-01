import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthChange } from "../auth";

const ProtectedRoute = ({ children }) => {
	const [checking, setChecking] = useState(true);
	const [allowed, setAllowed] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthChange((user) => {
			if (!user) {
				navigate("/login");
				return;
			}
			setAllowed(true);
			setChecking(false);
		});
		return () => unsubscribe();
	}, [navigate]);

	if (checking) {
		return (
			<div style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
				Checking access...
			</div>
		);
	}
	return allowed ? children : null;
};

export default ProtectedRoute;