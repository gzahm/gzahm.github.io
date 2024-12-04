// firebaseAuth.js
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { firebaseApp } from "./firebaseConfig.js";

export const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export async function logInWithGoogle() {
    return await signInWithPopup(auth, provider);
}

export async function logOut() {
    return await signOut(auth);
}

export function observeAuthState(callback) {
    onAuthStateChanged(auth, callback);
}
