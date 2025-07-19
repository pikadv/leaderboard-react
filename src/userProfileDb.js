// userProfileDb.js
// Utilities to bind loaded student profile to the logged-in user in Firestore
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Get the current loaded studentId for a user
export async function getCurrentStudentIdForUser(uid) {
	const userDoc = await getDoc(doc(db, "users", uid));
	if (userDoc.exists()) {
		return userDoc.data().currentStudentId || "";
	}
	return "";
}

// Set the current loaded studentId for a user
export async function setCurrentStudentIdForUser(uid, studentId) {
	await updateDoc(doc(db, "users", uid), { currentStudentId: studentId });
}
