// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRVhVL7iODIw48_Jrez_a39D34x6-Ql1c",
  authDomain: "prepwise-6d70b.firebaseapp.com",
  projectId: "prepwise-6d70b",
  storageBucket: "prepwise-6d70b.appspot.com",  // ✅ corrected
  messagingSenderId: "274674159444",
  appId: "1:274674159444:web:3010c122d9ec17666dc2c1",
  measurementId: "G-MZCZRR0DHG"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Optional: Initialize Analytics if supported (only works in browser environments)
let analytics;
isAnalyticsSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export const auth = getAuth(app);
export const db = getFirestore(app);
