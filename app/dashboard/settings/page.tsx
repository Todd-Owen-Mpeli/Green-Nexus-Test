
// Imports
import type { Metadata } from "next";

// Components
import Layout from "@/components/Dashboard/layout/Layout";
import DashboardContextProvider from "@/context/providers/DashboardContextProvider";
import PersonalInformation from "@/components/Dashboard/components/PersonalInformation";

// Dynamic Pages Generated Metadata
export const metadata: Metadata = {
  title: "Settings",
  description: "Settings page",
};

const DashboardPage: any = async () => {

	return (
		<DashboardContextProvider>
			<Layout>
				<PersonalInformation />
				<></>
			</Layout>
		</DashboardContextProvider>
		
	);
};

export default DashboardPage;
