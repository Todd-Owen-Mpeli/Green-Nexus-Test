export namespace IDashboardContext {
	export type IGlobal = {
		pageTitle: string;
		itemsCollection: any[] | null;
		mediaFilesCollection: any[] | null;
	};
	export type ILayout = {
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