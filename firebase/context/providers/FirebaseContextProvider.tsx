// firebase/FirebaseUserProvider.tsx
"use client";

import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { initializeFirebase } from "@/firebase/firebase";
import { FirebaseContext } from "@/firebase/context/Firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { IFirebaseContext, IFirebaseUser } from "@/firebase/types/Index";

const FirebaseUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUserUser, setFirebaseUserUser] = useState<IFirebaseContext>({
    userData: null,
    userDocId: null,
    signedInUser: false,
  });
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const pathname = usePathname();

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
          emailVerified: user.emailVerified,
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
      setHasCheckedAuth(true); // Set after auth check
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (firebaseInitialized && hasCheckedAuth) {
      const publicPages: Array<string> = ["/", "/404", "/login"];
      const protectedPages: Array<string> = [
        "/dashboard",
        "/dashboard/items",
        "/dashboard/Media",
        "/dashboard/settings",
        "/dashboard/categories",
      ];

      const isPublicPage: boolean = publicPages.includes(pathname);
      const isProtectedPage: boolean = protectedPages.includes(pathname);

      if (isProtectedPage && !firebaseUserUser.signedInUser) {
        if (pathname !== "/login") {
          redirect("/login");
        }
      } else if (isPublicPage && firebaseUserUser.signedInUser && pathname === "/login") {
        redirect("/dashboard");
      }
    }
  }, [firebaseInitialized, firebaseUserUser.signedInUser, pathname, hasCheckedAuth]);

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