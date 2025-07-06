import { onAuthChange } from "../auth";
import { useEffect, useState } from "react";

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

export const handleCheckNow = (navigate, loggedIn) => (e) => {
	e.preventDefault();
	if (loggedIn) {
		navigate("/check");
	} else {
		navigate("/login");
	}
};
