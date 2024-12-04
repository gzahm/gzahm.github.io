// public/js/auth.js
import { auth } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Register User
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Registration successful!");
    console.log("User created:", userCredential.user);
  } catch (error) {
    console.error("Error registering:", error.message);
    alert("Error: " + error.message);
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    console.log("User signed in:", userCredential.user);
  } catch (error) {
    console.error("Error logging in:", error.message);
    alert("Error: " + error.message);
  }
};

// Reset Password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (error) {
    console.error("Error sending reset email:", error.message);
    alert("Error: " + error.message);
  }
};
