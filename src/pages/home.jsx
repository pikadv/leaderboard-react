// Home.jsx
// Main landing page with hero, features, app, reviews, and newsletter sections
import Hero from "../components/hero";
import Newsletter from "../components/newsletter";
import Reviews from "../components/reviews";
import Features from "../components/features";
import App from "../components/app";

function Home() {
	return (
		<div className="home">
			<Hero />
			<Features />
			<App />
			<Reviews />
			<Newsletter />
		</div>
	);
}

export default Home;
