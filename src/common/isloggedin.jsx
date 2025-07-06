// isloggedin.jsx
// Custom React hook and utility for authentication state and navigation
import { onAuthChange } from "../auth";
import { useEffect, useState } from "react";

// Hook: returns { loggedIn, loading } for auth state
const useIsLoggedIn = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const unsubscribe = onAuthChange((user) => {
			setLoggedIn(!!user);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);
	return { loggedIn, loading };
};

export default useIsLoggedIn;

// Utility: handle navigation for "Check Now" CTA
export const handleCheckNow = (navigate, loggedIn) => (e) => {
	e.preventDefault();
	if (loggedIn) {
		navigate("/check");
	} else {
		navigate("/login");
	}
};
