import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC4vUa78mWuYoxAxYvoGigH-jQHRkpoDdk",
    authDomain: "utopia-orders.firebaseapp.com",
    projectId: "utopia-orders",
    storageBucket: "utopia-orders.firebasestorage.app",
    messagingSenderId: "161713464227",
    appId: "1:161713464227:web:ab3ce1d6828ff5620cf016",
    measurementId: "G-E12ME6SXVM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);