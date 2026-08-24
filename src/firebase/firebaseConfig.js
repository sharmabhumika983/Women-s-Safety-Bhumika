// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1JTWM7r0EV82pc99FLnGgadMfN49_ds8",
  authDomain: "fir-b5747.firebaseapp.com",
  projectId: "fir-b5747",
  storageBucket: "fir-b5747.firebasestorage.app",
  messagingSenderId: "488260240656",
  appId: "1:488260240656:web:5c5d93b2e6f75115cd5195"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;