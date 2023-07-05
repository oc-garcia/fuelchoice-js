// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqrXmxPKTkrfLEyKSwl_IjoQAaqOVYG0M",
  authDomain: "fuelchoice.firebaseapp.com",
  projectId: "fuelchoice",
  storageBucket: "fuelchoice.appspot.com",
  messagingSenderId: "359085183300",
  appId: "1:359085183300:web:62e0c12272f993173f8711",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
