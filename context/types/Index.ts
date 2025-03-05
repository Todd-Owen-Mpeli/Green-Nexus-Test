export namespace IDashboardContext {
	
	export type IGlobal = {
		itemsCollection: any[] | null;
		mediaFilesCollection: any[] | null;
		revealMediaFilesModal: boolean;
		revealCreateItemModal: boolean;
		handleRevealMediaFilesModal: any;
		handleCloseCreateItemModal: any;
		handleRevealUserCreateItemModal: any;
		handleCloseMediaFilesModalHandler: any;
	};
	export type IDashboardContextProvider = {
		children: React.ReactNode;
	};
};