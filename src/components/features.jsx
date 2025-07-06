import studentImage from "../assets/student-image.png";
import facultyImage from "../assets/faculty-image.png";

const Features = () => (
	<div id="features">
		<div className="section-container features-container">
			<h2 className="features-heading">Features</h2>
			<div className="features-grid">
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
							<h2 className="feature-title">
								Faculty Access, More Student Details
							</h2>
							<p className="feature-sub-title">
								Faculty members can access detailed student profiles, track
								progress, and provide personalized feedback.
							</p>
						</div>
						<a
							className="feature-cta cta btn"
							href="/blog.html">
							Learn more
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Features;
