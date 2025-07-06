// Reviews.jsx
// Displays user reviews for the LeaderBoard app
import quoteIcon from "../assets/quote-1.svg";
import "../styles/global.css";

const reviews = [
	{
		text: `LeaderBoard has completely transformed the way I track my progress. The insights are invaluable!`,
		author: "Alex Johnson",
	},
	{
		text: `I love the app! It's so easy to use and helps me stay motivated to achieve my goals.`,
		author: "Maria Garcia",
	},
	{
		text: `The ranking system is fantastic. It really pushes me to improve and do better each day.`,
		author: "Liam Smith",
	},
	{
		text: `A must-have for anyone serious about tracking their progress. Highly recommend!`,
		author: "Emma Brown",
	},
];

export default function Reviews() {
	return (
		<div id="reviews">
			<div className="section-container reviews-container">
				<h2 className="reviews-heading">Reviews</h2>
				<div className="reviews-grid">
					{reviews.map((review, idx) => (
						<div
							className="review-item"
							key={idx}>
							<p className="review-text">
								<img
									className="quotation-icon"
									src={quoteIcon}
									alt="Big quotation"
								/>
								"{review.text}"
							</p>
							<p className="review-author">- {review.author}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
