export type IFirebaseContext = {
	signedInUser: boolean;
	userDocId: string | null;
	userData: IFirebaseUser | null;
};

export type IFirebaseContextProvider = {
	children: React.ReactNode;
};
// Firebase
export type IFirebaseUser = {
	uid: string;
	email: string;
	photoURL: string;
	providerId: string;
	phoneNumber: string;
	displayName: string;
	accessToken: string;
	emailVerified: boolean;
	metadata: {
		creationTime: string | undefined;
		lastSignInTime: string | undefined;
	};
};
export type IFirebaseConfig = {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
};
// Create Item Functions
export type INewCreatedItem = {
	value: string;
	quantity: string;
	itemName: string;
	category: string;
	description: string;
};
