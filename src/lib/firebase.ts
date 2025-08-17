import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE_96ekvEDH8d9u9kGg6V6lxmyNiKwGhE",
  authDomain: "daily-crunch.firebaseapp.com",
  projectId: "daily-crunch",
  storageBucket: "daily-crunch.firebasestorage.app",
  messagingSenderId: "646365318747",
  appId: "1:646365318747:web:361c5847be0b7b0bd6397e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;