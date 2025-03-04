// Imports
import {createContext, useContext} from "react";
import {IFirebaseContext} from "@/firebase/types/Index";

export const FirebaseContext = createContext<IFirebaseContext | undefined>(
	undefined
);

export const useFirebaseContext = () => {
	const content = useContext(FirebaseContext);

	if (content === undefined) {
		throw new Error(`useFirebaseContext must be used to render content.`);
	}

	return content;
};
