// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsFcQ3DwMaHp-IJoOCntKYqzgnEKq9iKw",
  authDomain: "jamconnect-d6109.firebaseapp.com",
  projectId: "jamconnect-d6109",
  storageBucket: "jamconnect-d6109.appspot.com",
  messagingSenderId: "635400773610",
  appId: "1:635400773610:web:abce4cceaffae560691c93",
  measurementId: "G-BNBH8YTDM3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;

export { storage };