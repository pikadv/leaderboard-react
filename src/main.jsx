// main.jsx
// Entry point for the LeaderBoard React app
// Imports global styles and renders the main App component
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import global stylesheet
import "./style.css";

// Import main application component
import App from "./App.jsx";

// Render the app inside the root element
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
