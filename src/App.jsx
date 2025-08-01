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
import FacultyRoute from "./common/FacultyRoute";
import AdminRoute from "./common/AdminRoute";
import AdminPage from "./pages/admin.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
import ProtectedRoute from "./common/ProtectedRoute";

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
					element={
						<FacultyRoute>
							<FacultyPage />
						</FacultyRoute>
					}
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
				<Route
					path="/student-profile"
					element={<StudentProfile />}
				/>

				{/* Student management routes (faculty only) */}
				<Route
					path="/add-student"
					element={
						<FacultyRoute>
							<AddStudent />
						</FacultyRoute>
					}
				/>
				<Route
					path="/delete-student"
					element={
						<FacultyRoute>
							<DeleteStudent />
						</FacultyRoute>
					}
				/>
				<Route
					path="/update-student"
					element={
						<FacultyRoute>
							<UpdateStudent />
						</FacultyRoute>
					}
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

				{/* Leaderboard page (faculty only) */}
				<Route
					path="/leaderboard"
					element={
						<ProtectedRoute>
							<Leaderboard />
						</ProtectedRoute>
					}
				/>

				{/* Admin route */}
				<Route
					path="/admin"
					element={
						<AdminRoute>
							<AdminPage />
						</AdminRoute>
					}
				/>
			</Routes>
			{/* Main footer visible on all pages */}
			<Footer />
		</BrowserRouter>
	);
}

export default App;
