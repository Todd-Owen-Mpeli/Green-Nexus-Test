"use client";

// Imports
import {FC} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import { IDashboard } from "@/components/Dashboard/types/Index";
import { stagger, initial, fadeInUp } from "@/animations/animations";

// Styling
import styles from "@/components/Dashboard/styles/Dashboard.module.scss";

// Firebase
import {useFirebaseContext} from "@/firebase/context/Firebase";
import { useDashboardLayoutContext } from "@/context/Dashboard";

const Navigation: FC = () => {

    const firebaseContext = useFirebaseContext();
	const dashboardLayoutContext = useDashboardLayoutContext();

    // Ensure userData is not null before using it in JSX
	if (!firebaseContext?.userData) {
		return <div>Loading...</div>; // or some other loading indicator
    }
    
    return (
        <nav className={styles.navigation}>
            Enter
        </nav>
    );
}

export default Navigation;