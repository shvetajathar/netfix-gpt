// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS859fAtstqD9A2ub-QuTelQmosLJCju4",
  authDomain: "netflix-b1dc6.firebaseapp.com",
  projectId: "netflix-b1dc6",
  storageBucket: "netflix-b1dc6.firebasestorage.app",
  messagingSenderId: "433903395816",
  appId: "1:433903395816:web:c89e308631de1d79723a5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();







//https://firebase.google.com/docs/reference/js/?hl=en&authuser=0