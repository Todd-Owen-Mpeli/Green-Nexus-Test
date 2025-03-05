// Imports
import type { Metadata } from "next";

// Components
import Dashboard from "@/components/Dashboard/Index";
import DashboardContextProvider from "@/context/providers/DashboardContextProvider";

// Dynamic Pages Generated Metadata
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page",
};

const DashboardPage: any = async () => {

	return (
		<DashboardContextProvider>
			<Dashboard />
		</DashboardContextProvider>
		
	);
};

export default DashboardPage;
