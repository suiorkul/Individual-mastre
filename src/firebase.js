import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADogXFiy7QHk2no8ZkuDhMqgi-C5ob6Cw",
  authDomain: "individual-hackaton.firebaseapp.com",
  projectId: "individual-hackaton",
  storageBucket: "individual-hackaton.appspot.com",
  messagingSenderId: "788837281496",
  appId: "1:788837281496:web:b3b3a8b74baa995d33b1ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
