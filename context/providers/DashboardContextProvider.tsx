"use client";

// Imports
import { FC, useState } from "react";
import {IDashboardContext} from "@/context/types/Index";
import {DashboardLayoutContext} from "@/context/Dashboard";

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

	return (
		<DashboardLayoutContext.Provider
			value={{
				handleCloseCreateItemModal,
				handleRevealMediaFilesModal,
				handleRevealUserCreateItemModal,
				handleCloseMediaFilesModalHandler,
				revealMediaFilesModal: revealMediaFilesModal,
				revealCreateItemModal: revealCreateItemModal,
			}}
		>
			{children}
		</DashboardLayoutContext.Provider>
	);
};

export default DashboardContextProvider;