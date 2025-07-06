// Soon.jsx
// Simple coming soon page with a link back to home
import { Link } from "react-router-dom";

const Soon = () => (
	<main id="main">
		<div id="hero">
			<div className="section-container hero-container">
				<div className="hero-main">
					<h2 className="hero-title">Coming Soon...</h2>
					<p>
						<Link
							className="underline"
							to="/">
							Click here
						</Link>
						{" to return to the home page."}
					</p>
				</div>
			</div>
		</div>
	</main>
);

export default Soon;
