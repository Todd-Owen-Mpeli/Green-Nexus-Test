"use client";

// Imports
import { FC, useEffect, useState } from "react";
import {IDashboardContext} from "@/context/types/Index";
import {DashboardContext} from "@/context/Dashboard";

// Firebase
import { Auth, getAuth } from "firebase/auth";
import { getUserDocument } from "@/firebase/backend/getUserDocument";
import { IFirebaseContext, IFirebaseUser } from "@/firebase/types/Index";
import { getUserItemsDocument } from "@/firebase/backend/getUserItemsDocument";

const DashboardContextProvider: FC<IDashboardContext.IDashboardContextProvider> = ({
	children
}) => {

	const [revealCreateItemModal, setRevealCreateItemModal] = useState(false);
	const [revealMediaFilesModal, setRevealMediaFilesModal] = useState(false);

	/* Hides or Displays Media Files Modal */
	const handleRevealMediaFilesModal = () => {
		setRevealMediaFilesModal(!revealMediaFilesModal);
	};
	/* Hides or Displays Create Item Modal */
	const handleRevealUserCreateItemModal = () => {
		setRevealCreateItemModal(!revealCreateItemModal);
	};

	/* Hides Create Item Modal */
	const handleCloseCreateItemModal = () => {
		setRevealCreateItemModal(false);
	};

	/* Hides Media Files Modal */
	const handleCloseMediaFilesModalHandler = () => {
		setRevealMediaFilesModal(false);
	};

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

	/* Check if user is SIGNED IN if 
	True Displays Signed In Navbar */
	useEffect(() => {
		if (!userData) {
			const unsubscribe = auth?.onAuthStateChanged(async (currentUser: any) => {
				if (currentUser) {
					setSignedInUser(true);
					setUserData(currentUser);

					/* Retrieves the current users Document Data 
					& Document Unique Identification */
					const userDoc = await getUserDocument(currentUser?.uid);
					const docID =
						currentUser?.providerData[0]?.providerId === "password"
							? currentUser?.uid
							: userDoc.docUid;

					setUserDocId(docID);

					/* Retrieves the current users 
					Items List Document Data */
					const itemsArray = await getUserItemsDocument(docID);
					setItemsCollection(itemsArray);

					/* Retrieves the current users 
					Media Files List Document Data */
					const mediaFilesArray = await getUserItemsDocument(docID);
					setMediaFilesCollection(mediaFilesArray);
				} else if (!currentUser) {
					setSignedInUser(false);
					setItemsCollection(null);
					setMediaFilesCollection(null);
				}
			});

			return () => {
				unsubscribe();
			};
		}
	},);
	

	return (
		<DashboardContext.Provider
			value={{
				itemsCollection: itemsCollection,
				mediaFilesCollection: mediaFilesCollection,
				revealMediaFilesModal: revealMediaFilesModal,
				revealCreateItemModal: revealCreateItemModal,
				handleCloseCreateItemModal: handleCloseCreateItemModal,
				handleRevealMediaFilesModal: handleRevealMediaFilesModal,
				handleRevealUserCreateItemModal: handleRevealUserCreateItemModal,
				handleCloseMediaFilesModalHandler: handleCloseMediaFilesModalHandler,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};

export default DashboardContextProvider;