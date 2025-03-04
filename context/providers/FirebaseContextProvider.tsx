"use client";

// Imports
import {
	IFirebaseContext,
	IFirebaseContextProvider,
} from "@/firebase/types/Index";
import {FC, useState} from "react";

// Firebase
import {Auth, getAuth} from "firebase/auth";
import {FirebaseContext} from "@/context/Firebase";
import {IFirebaseUser} from "@/firebase/types/Index";
import {getUserDocument} from "@/firebase/backend/getUserDocument";
import {getUserItemsDocument} from "@/firebase/backend/getUserItemsDocument";

const DashboardContextProvider: FC<IFirebaseContextProvider> = ({children}) => {
	// Retrieving Firebase User Details
	const auth: Auth = getAuth();
	const [signedInUser, setSignedInUser] = useState(false);
	const [userData, setUserData] = useState<IFirebaseUser | null>(null);
	const [userDocId, setUserDocId] = useState<string | null>(null);
	const [itemsCollection, setItemsCollection] = useState<any[] | null>(null);
	const [mediaFilesCollection, setMediaFilesCollection] = useState<
		any[] | null
	>(null);
	const firebaseUser: IFirebaseContext = {
		userData: userData,
		userDocId: userDocId,
		signedInUser: signedInUser,
	};

	return (
		<FirebaseContext.Provider
			value={{
				userData: firebaseUser?.userData,
				userDocId: firebaseUser?.userDocId,
				signedInUser: firebaseUser?.signedInUser,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};

export default DashboardContextProvider;
