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
	const [count, setCount] = useState(0);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/check"
					element={<CheckPage />}
				/>{" "}
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
				<Route
					path="/profile"
					element={<Profile />}
				/>
				<Route
					path="/profile/:id"
					element={<Profile />}
				/>
				<Route
					path="/placement"
					element={<Placement />}
				/>
				<Route
					path="/placement/:studentId"
					element={<Placement />}
				/>
				<Route
					path="/leaderboard"
					element={<Leaderboard />}
				/>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
