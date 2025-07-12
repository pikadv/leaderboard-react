// auth.js
// Authentication and user management utilities for LeaderBoard
import { auth } from "./firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { db } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { collection, getDocs, updateDoc } from "firebase/firestore";

// Sign up with email and password
export async function signUp(email, password) {
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);
	// After signup, create a user entry in 'users' collection with faculty: 'no', admin: 'no'
	await setDoc(doc(db, "users", userCredential.user.uid), {
		faculty: "no",
		admin: "no",
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

// Check admin status for a user
export async function getAdminStatus(uid) {
	const userDoc = await getDoc(doc(db, "users", uid));
	if (userDoc.exists()) {
		return userDoc.data().admin;
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

// Get all users from users collection
export async function getAllUsers() {
	const querySnapshot = await getDocs(collection(db, "users"));
	return querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
}

// Set faculty status for a user
export async function setFacultyStatus(uid, status) {
	await updateDoc(doc(db, "users", uid), { faculty: status });
}
