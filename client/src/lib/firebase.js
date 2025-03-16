// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogapp-bfb13.firebaseapp.com",
  projectId: "blogapp-bfb13",
  storageBucket: "blogapp-bfb13.firebasestorage.app",
  messagingSenderId: "654232133415",
  appId: "1:654232133415:web:9dbdf5ddf9bcd0dc5f1302",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
