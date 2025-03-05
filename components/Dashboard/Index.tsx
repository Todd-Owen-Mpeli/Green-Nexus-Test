"use client";

// Imports
import {FC} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import { IDashboard } from "@/components/Dashboard/types/Index";
import {stagger, initial, fadeInUp} from "@/animations/animations";

// Styling
import styles from "@/components/Dashboard/styles/Dashboard.module.scss";

// Components
import Tables from "@/components/Dashboard/components/Tables/Index";
import TopNavbar from "@/components/Dashboard/components/TopNavbar";
import Navigation from "@/components/Dashboard/components/Navigation";

const Dashboard: FC<IDashboard.IProps> = () => {
    return (
        <section className={styles.dashboard}>
            <Navigation />
            <div className={styles.mainContainer}>
                <TopNavbar />
                <div className={styles.main}>
                    <Tables />
                </div>
            </div>
        </section>
    );
}

export default Dashboard;