// firebase.js
// Firebase app initialization and exports for LeaderBoard
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCV7UUWt9ZzY1rMeCX0-St7Dd3qNfCFju8",
	authDomain: "leaderboard-react-ark.firebaseapp.com",
	projectId: "leaderboard-react-ark",
	storageBucket: "leaderboard-react-ark.firebasestorage.app",
	messagingSenderId: "767719427675",
	appId: "1:767719427675:web:7dbf6456455431e7d6797e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default app;
export { db, auth };
