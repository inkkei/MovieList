import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDvxVnVhPl0fkOvOU1fKcCzXeiJhhn4uRM",
  authDomain: "check-your-movie-list.firebaseapp.com",
  projectId: "check-your-movie-list",
  storageBucket: "check-your-movie-list.appspot.com",
  messagingSenderId: "910129591247",
  appId: "1:910129591247:web:7c4d03f20d2e82a4c098ba",
  measurementId: "G-KEM8MENP5F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)