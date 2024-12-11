// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,EmailAuthProvider} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdXjg4vO6eAfKxyho38jnreyeoXsz_YoA",
  authDomain: "fes-stamp-campaign.firebaseapp.com",
  projectId: "fes-stamp-campaign",
  storageBucket: "fes-stamp-campaign.firebasestorage.app",
  messagingSenderId: "542964454661",
  appId: "1:542964454661:web:23cd677c62b41068a3d36c",
  measurementId: "G-CK0Y336QKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new EmailAuthProvider();
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export {auth,provider,db};