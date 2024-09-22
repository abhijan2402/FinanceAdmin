import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyD899JBLbR8LCgz_8WR0kCRGYPLHblW6gE",
    authDomain: "financeapp-1a8fd.firebaseapp.com",
    projectId: "financeapp-1a8fd",
    storageBucket: "financeapp-1a8fd.appspot.com",
    messagingSenderId: "1051011152495",
    appId: "1:1051011152495:web:b738cdb60b03810259ab9a"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);