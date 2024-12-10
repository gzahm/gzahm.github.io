// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCJFEoNrjyZNrvaMR9uKQYzWiQ7K3uNXkY",
    authDomain: "lezahm.firebaseapp.com",
    projectId: "lezahm",
    storageBucket: "lezahm.appspot.com",
    messagingSenderId: "792842956911",
    appId: "1:792842956911:web:6bf5f65694c221ff309d9a",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Add a new reflection to the database
export async function addReflection(reflection) {
    try {
        const docRef = await addDoc(collection(db, "reflections"), reflection);
        console.log("Reflection added with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding reflection:", error);
        throw error;
    }
}

// Retrieve all reflections for a specific user
export async function getUserReflections(userId) {
    try {
        const reflectionsQuery = query(collection(db, "reflections"), where("userId", "==", userId));
        const querySnapshot = await getDocs(reflectionsQuery);

        const reflections = [];
        querySnapshot.forEach((doc) => {
            reflections.push({ id: doc.id, ...doc.data() });
        });

        console.log("Retrieved reflections for user:", userId);
        return reflections;
    } catch (error) {
        console.error("Error retrieving reflections:", error);
        throw error;
    }
}

// Retrieve all reflections (for admin purposes or testing)
export async function getAllReflections() {
    try {
        const querySnapshot = await getDocs(collection(db, "reflections"));
        const reflections = [];
        querySnapshot.forEach((doc) => {
            reflections.push({ id: doc.id, ...doc.data() });
        });

        console.log("Retrieved all reflections");
        return reflections;
    } catch (error) {
        console.error("Error retrieving all reflections:", error);
        throw error;
    }
}
