// firebase/firebase.ts
"use client";

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth, User } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { IFirebaseConfig } from "@/firebase/types/Index";

export const firebaseConfig: IFirebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
  measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let analytics: Analytics | undefined;
let performance: any | undefined;

export const initializeFirebase = () => {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    if (typeof window !== "undefined" && "measurementId" in firebaseConfig) {
      analytics = getAnalytics(app);
      performance = getPerformance(app);
    }
  }
  return { app, auth, db, analytics, performance };
};