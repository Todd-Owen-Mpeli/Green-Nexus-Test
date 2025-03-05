"use client";

// Imports
import {FC} from "react";
import { IDashboard } from "@/components/Dashboard/types/Index";

// Components
import Tables from "@/components/Dashboard/components/Tables/Index";

const Dashboard: FC<IDashboard.IProps> = () => {
    return (
        <div className="p-4">
            <Tables />
        </div>
    );
}

export default Dashboard;