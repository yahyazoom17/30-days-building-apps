import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS86P--egil8m-xSfJ2eSjJi-sbCSKin0",
  authDomain: "note-nest-554a2.firebaseapp.com",
  projectId: "note-nest-554a2",
  storageBucket: "note-nest-554a2.firebasestorage.app",
  messagingSenderId: "1072386294344",
  appId: "1:1072386294344:web:f1ae9a538c0b5643434e7d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
