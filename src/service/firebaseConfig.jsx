// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9EApOIsyrF-5puBl3EhA_SjrIyQ36tj8",
  authDomain: "project1-1de1d.firebaseapp.com",
  projectId: "project1-1de1d",
  storageBucket: "project1-1de1d.firebasestorage.app",
  messagingSenderId: "855894688835",
  appId: "1:855894688835:web:9a9a1d008e48c9041100f6",
  measurementId: "G-43KBC83BRQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
// const analytics = getAnalytics(app);