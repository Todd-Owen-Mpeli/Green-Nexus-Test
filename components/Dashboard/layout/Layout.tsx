"use client";

// Imports
import {FC} from "react";
import { IDashboard } from "@/components/Dashboard/types/Index";

// Styling
import styles from "@/components/Dashboard/styles/Dashboard.module.scss";

// Components
import TopNavbar from "@/components/Dashboard/components/TopNavbar";
import Navigation from "@/components/Dashboard/components/Navigation";
import CreateItem from "@/components/Dashboard/components/CreateItem/Index";

const Layout: FC<IDashboard.ILayout> = ({children}) => {
    return (
        <section className={styles.dashboard}>
            <Navigation />
            <div className={styles.mainContainer}>
                <TopNavbar />
                <div className={styles.main}>
                    <CreateItem />
                    {children}
                </div>
            </div>
        </section>
    );
}

export default Layout;