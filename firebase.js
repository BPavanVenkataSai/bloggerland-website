// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS4Un-jqP5-BJgpSJHUAwseRBGpdYrY-Q",
  authDomain: "bloggerland-9b843.firebaseapp.com",
  projectId: "bloggerland-9b843",
  storageBucket: "bloggerland-9b843.firebasestorage.app",
  messagingSenderId: "188321591058",
  appId: "1:188321591058:web:3e2e69899012c8a3c8cdcb",
  measurementId: "G-JZYT8V6TWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);