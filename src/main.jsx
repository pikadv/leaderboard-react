import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// imported stylesheet
import "./style.css";

// main application component
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
