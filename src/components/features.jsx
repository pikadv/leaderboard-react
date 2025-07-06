// Features.jsx
// Displays feature highlights for students and faculty
import studentImage from "../assets/student-image.png";
import facultyImage from "../assets/faculty-image.png";

const Features = () => (
	<div id="features">
		<div className="section-container features-container">
			<h2 className="features-heading">Features</h2>
			<div className="features-grid">
				{/* Student features */}
				<div className="feature-item">
					<div className="feature-box">
						<div className="feature-texts">
							<h2 className="feature-title">Explore the student rankings</h2>
							<p className="feature-sub-title">
								Our detailed ranking system provides insights into your
								strengths and areas for improvement.
							</p>
						</div>
						<a
							className="feature-cta cta btn"
							href="/blog.html">
							Learn more
						</a>
					</div>
					<div className="feature-box">
						<img
							className="feature-img"
							src={studentImage}
							alt="Students checking their rankings"
						/>
					</div>
				</div>
				{/* Faculty features */}
				<div className="feature-item">
					<div className="feature-box">
						<img
							className="feature-img"
							src={facultyImage}
							alt="Faculty member checking student rankings"
						/>
					</div>
					<div className="feature-box">
						<div className="feature-texts">
							<h2 className="feature-title">Faculty dashboard</h2>
							<p className="feature-sub-title">
								Faculty can manage student data and view analytics for better
								guidance.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Features;
