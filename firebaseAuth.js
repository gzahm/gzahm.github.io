import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

export async function registerUser(username, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save username in Firestore
        await setDoc(doc(db, "users", user.uid), { username, email });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function handleLogin(formId) {
    const form = document.getElementById(formId);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch the username
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const username = userDoc.exists() ? userDoc.data().username : "User";

            alert(`Welcome back, ${username}!`);
            window.location.href = "reflection.html";
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    });
}
