
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



export const firebaseConfig = {
  apiKey: "AIzaSyADVmfY7uEN9ibaBMNh6GTadiXJipkxM7U",
  authDomain: "portfolio-eun.firebaseapp.com",
  projectId: "portfolio-eun",
  storageBucket: "portfolio-eun.appspot.com",
  messagingSenderId: "1085068797142",
  appId: "1:1085068797142:web:a8664d346e2a0eb19c1577",
  measurementId: "G-VLPQF2165G",
  databaseURL:"https://portfolio-eun-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
