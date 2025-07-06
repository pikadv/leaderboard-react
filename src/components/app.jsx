// App.jsx
// App section for mobile app promotion and download links
import iphoneImg from "../assets/iphone-13.png";
import appStoreImg from "../assets/app-store.svg";
import googlePlayImg from "../assets/google-play.svg";

const App = () => (
	<div id="app">
		<div className="section-container app-container">
			<div className="app-box app-section-dark">
				<h2 className="app-heading">Faster</h2>
			</div>
			<div className="app-box app-section-logo">
				<img
					className="app-img"
					src={iphoneImg}
					alt="LeaderBoard app running on iPhone"
				/>
			</div>
			<div className="app-box app-section-light">
				<h2 className="app-heading">With App</h2>
				<div className="app-sub-box">
					<p className="app-description">
						Our app is designed to be faster and more efficient.
					</p>
					<div className="app-socials">
						<a
							href="/soon"
							className="social-link">
							<img
								src={appStoreImg}
								alt="Download on the App Store"
							/>
						</a>
						<a
							href="/soon"
							className="social-link">
							<img
								src={googlePlayImg}
								alt="Get it on Google Play"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default App;
