// randomchar.jsx
// Displays a random anime character image from the Jikan API
import React, { useEffect, useState, useRef } from "react";

const RandomChar = () => {
	const [imageUrl, setImageUrl] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const fetchedRef = useRef(false); // Prevent double-fetch in Strict Mode

	// Fetch a random character image on mount
	useEffect(() => {
		if (fetchedRef.current) return;
		fetchedRef.current = true;
		const fetchCharacter = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch("https://api.jikan.moe/v4/top/characters");
				const data = await response.json();
				if (data && data.data && data.data.length > 0) {
					const randomIndex = Math.floor(Math.random() * data.data.length);
					const url = data.data[randomIndex]?.images?.jpg?.image_url;
					setImageUrl(url);
				} else {
					setError("No character data found.");
				}
			} catch (err) {
				setError("Failed to fetch character.");
			}
			setLoading(false);
		};
		fetchCharacter();
	}, []);

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
					width: "100%",
					minHeight: "6rem",
					minWidth: "6rem",
				}}>
				<span
					style={{
						fontSize: "0.95rem",
						color: "#888",
						textAlign: "center",
					}}>
					Loading random character...
				</span>
			</div>
		);
	}
	if (error) return <div>{error}</div>;
	return (
		<div>
			{imageUrl && (
				<img
					src={imageUrl}
					alt="Random Anime Character"
					style={{ maxWidth: "100%", height: "auto" }}
				/>
			)}
		</div>
	);
};

export default RandomChar;
