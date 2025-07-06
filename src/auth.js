import { auth } from "./firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { db } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

// Sign up with email and password
export async function signUp(email, password) {
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);
	// After signup, create a user entry in 'users' collection with faculty: 'no'
	await setDoc(doc(db, "users", userCredential.user.uid), {
		faculty: "no",
		email,
	});
	return userCredential;
}

// Sign in with email and password
export function signIn(email, password) {
	return signInWithEmailAndPassword(auth, email, password);
}

// Check faculty status for a user
export async function getFacultyStatus(uid) {
	const userDoc = await getDoc(doc(db, "users", uid));
	if (userDoc.exists()) {
		return userDoc.data().faculty;
	}
	return "no";
}

// Sign out
export function logOut() {
	return signOut(auth);
}

// Listen for auth state changes
export function onAuthChange(callback) {
	return onAuthStateChanged(auth, callback);
}

// Get current user
export function getCurrentUser() {
	return auth.currentUser;
}
