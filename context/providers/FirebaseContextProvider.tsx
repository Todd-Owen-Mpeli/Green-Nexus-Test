// firebase/FirebaseUserProvider.tsx
"use client";

import { useEffect, useState } from "react";
import { initializeFirebase } from "@/firebase/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FirebaseContext } from "@/context/Firebase";
import { IFirebaseContext, IFirebaseUser } from "@/firebase/types/Index";

const FirebaseUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUserUser, setFirebaseUserUser] = useState<IFirebaseContext>({
    userData: null,
    userDocId: null,
    signedInUser: false,
  });
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    initializeFirebase();
    const { auth } = initializeFirebase();
    setFirebaseInitialized(true);

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const userData: IFirebaseUser = {
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
            providerId: user.providerData[0]?.providerId || "",
            phoneNumber: user.phoneNumber || "",
            metadata: {
                creationTime: user.metadata.creationTime,
                lastSignInTime: user.metadata.lastSignInTime,
            },
            accessToken: "",
            emailVerified: user.emailVerified
        };
        setFirebaseUserUser({
          userData: userData,
          userDocId: userData.uid,
          signedInUser: true,
        });
      } else {
        setFirebaseUserUser({
          userData: null,
          userDocId: null,
          signedInUser: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        userData: firebaseUserUser?.userData,
        userDocId: firebaseUserUser?.userDocId,
        signedInUser: firebaseUserUser?.signedInUser,
      }}
    >
      {firebaseInitialized ? children : <div>Loading...</div>}
    </FirebaseContext.Provider>
  );
};

export default FirebaseUserProvider;