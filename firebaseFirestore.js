// firebaseFirestore.js
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { firebaseApp } from "./firebaseConfig.js";

export const db = getFirestore(firebaseApp);

export async function addReflection(reflection) {
    return await addDoc(collection(db, "reflections"), reflection);
}

export async function getUserReflections(userId) {
    const q = query(collection(db, "reflections"), where("userId", "==", userId));
    return await getDocs(q);
}
