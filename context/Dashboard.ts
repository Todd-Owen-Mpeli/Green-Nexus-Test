// Imports
import { createContext, useContext } from "react";
import {IDashboardContext} from "@/context/types/Index";


// Dashboard Global Context
export const DashboardContext = createContext<
	IDashboardContext.IGlobal | undefined
    >(undefined);


export const useDashboardContext = () => {
	const content = useContext(DashboardContext);

	if (content === undefined) {
		throw new Error(
			`useDashboardContext must be used to render content.`
		);
	}

	return content;
};
