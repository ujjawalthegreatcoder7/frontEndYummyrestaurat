import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCW7WqfysX985wlfFjZY6fs3Dh7G3EhNDM",
  authDomain: "restaurant-1e4cf.firebaseapp.com",
  projectId: "restaurant-1e4cf",
  storageBucket: "restaurant-1e4cf.firebasestorage.app",
  messagingSenderId: "384654223687",
  appId: "1:384654223687:web:9f9e4f596395f1e2658462",
  measurementId: "G-HJEKXEQX5B"
};

const app = initializeApp(firebaseConfig);

// 🔥 AUTH SETUP (IMPORTANT)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();