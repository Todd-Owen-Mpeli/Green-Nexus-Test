// Imports
import { createContext, useContext } from "react";
import {IDashboardContext} from "@/context/types/Index";


// Global Dashboard Context
export const DashboardGlobalContext = createContext<
	IDashboardContext.IGlobal | undefined
>(undefined);

// Dashboard Layout Context
export const DashboardLayoutContext = createContext<
	IDashboardContext.ILayout | undefined
    >(undefined);

export const useDashboardGlobalContext = () => {
	const content = useContext(DashboardGlobalContext);

	if (content === undefined) {
		throw new Error(`useDashboardContext must be used to render content.`);
	}

	return content;
};

export const useDashboardLayoutContext = () => {
	const content = useContext(DashboardLayoutContext);

	if (content === undefined) {
		throw new Error(
			`useDashboardLayoutContext must be used to render content.`
		);
	}

	return content;
};
