// firebaseDb.js
// Firestore database utilities for LeaderBoard (fetch, add, update, delete students)
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	doc,
	getDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
	orderBy,
	limit,
} from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

// Fetch leaderboard (with optional filters)
export async function fetchLeaderboard({
	batch,
	department,
	section,
	load_more = 10,
	all = false,
} = {}) {
	let q = collection(db, "students");
	let constraints = [];
	// Only add filters if the value is not empty
	if (batch && batch.trim() !== "")
		constraints.push(where("student-batch", "==", batch.trim()));
	if (department && department.trim() !== "")
		constraints.push(where("student-department", "==", department.trim()));
	if (section && section.trim() !== "")
		constraints.push(where("student-section", "==", section.trim()));
	constraints.push(orderBy("student-result", "desc"));
	if (!all) constraints.push(limit(load_more));
	q = query(q, ...constraints);
	const snapshot = await getDocs(q);
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Add a student
export async function addStudent(student) {
	const docRef = await addDoc(collection(db, "students"), student);
	return docRef.id;
}

// Fetch a student by ID (accepts either Firestore doc ID or student-id field)
export async function fetchStudentById(id) {
	// Try to fetch by Firestore document ID first
	const docRef = doc(db, "students", id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return { id: docSnap.id, ...docSnap.data() };
	}
	// If not found, try to fetch by student-id field
	const q = query(collection(db, "students"), where("student-id", "==", id));
	const snapshot = await getDocs(q);
	if (!snapshot.empty) {
		const docData = snapshot.docs[0];
		return { id: docData.id, ...docData.data() };
	}
	return null;
}

// Update a student by Firestore doc ID
export async function updateStudent(id, data) {
	const docRef = doc(db, "students", id);
	await updateDoc(docRef, data);
}

// Delete a student by Firestore doc ID
export async function deleteStudent(id) {
	const docRef = doc(db, "students", id);
	await deleteDoc(docRef);
}
