"use client";

// Imports
import { FC} from "react";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";
import { useDashboardContext } from "@/context/Dashboard";

// Styling
import styles from "@/components/Dashboard/styles/Dashboard.module.scss";

// Components
import FormikForm from "@/components/Dashboard/components/CreateItem/form/FormikForm";

const CreateItem: FC = () => {
    
    const dashboardContext = useDashboardContext();
    
    return (
        <AnimatePresence>
			{dashboardContext?.revealCreateItemModal && (
				<div className={styles.createItem}>
					<motion.div
						exit={{opacity: 0}}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						className={styles.divider}
					/>
					<div className={styles.mainContent}>
						<div className={styles.wrapper}>
							{/* Close Modal */}
							<motion.button
								exit={{opacity: 0}}
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								className={styles.button}
								onClick={dashboardContext?.handleCloseCreateItemModal}
							>
								<Image
									width={500}
									height={500}
									src="/svg/cross.svg"
									className={styles.image}
									alt="White arrow in a gold circle"
								/>
                            </motion.button>
                            <FormikForm />
						</div>
					</div>
				</div>
			)}
		</AnimatePresence>
    );
}

export default CreateItem;