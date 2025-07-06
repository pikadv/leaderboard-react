// App.jsx
// Main application component for routing and layout
// Imports React hooks, router, and all page/component dependencies
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import Home from "./pages/home.jsx";
import CheckPage from "./pages/check.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Soon from "./pages/soon.jsx";
import FacultyPage from "./pages/faculty.jsx";
import Profile from "./pages/profile.jsx";
import AddStudent from "./components/addstudent.jsx";
import DeleteStudent from "./components/deletestudent.jsx";
import UpdateStudent from "./components/updatestudent.jsx";
import Placement from "./components/placement.jsx";
import Leaderboard from "./pages/leaderboard.jsx";

function App() {
	// State for demonstration (can be extended or removed if unused)
	const [count, setCount] = useState(0);

	return (
		<BrowserRouter>
			{/* Main header visible on all pages */}
			<Header />
			<Routes>
				{/* Public routes */}
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/check"
					element={<CheckPage />}
				/>
				<Route
					path="/faculty"
					element={<FacultyPage />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/signup"
					element={<Signup />}
				/>
				<Route
					path="/soon"
					element={<Soon />}
				/>

				{/* Student management routes */}
				<Route
					path="/add-student"
					element={<AddStudent />}
				/>
				<Route
					path="/delete-student"
					element={<DeleteStudent />}
				/>
				<Route
					path="/update-student"
					element={<UpdateStudent />}
				/>

				{/* Profile routes (with and without ID) */}
				<Route
					path="/profile"
					element={<Profile />}
				/>
				<Route
					path="/profile/:id"
					element={<Profile />}
				/>

				{/* Placement routes (with and without studentId) */}
				<Route
					path="/placement"
					element={<Placement />}
				/>
				<Route
					path="/placement/:studentId"
					element={<Placement />}
				/>

				{/* Leaderboard page */}
				<Route
					path="/leaderboard"
					element={<Leaderboard />}
				/>
			</Routes>
			{/* Main footer visible on all pages */}
			<Footer />
		</BrowserRouter>
	);
}

export default App;
