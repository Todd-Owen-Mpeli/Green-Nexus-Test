// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {initialTwo, fadeIn} from "@/animations/animations";

// Styling
import styles from "@/components/Dashboard/styles/Dashboard.module.scss";

// Components
import TableCard from "@/components/Dashboard/components/Tables/TableCard";

const Tables: FC = () => {
    return (
        <div className={styles.tables}>
            <motion.h3
				initial={initialTwo}
				whileInView={fadeIn}
				viewport={{once: true}}
				className={styles.title}
			>
				Created Items
            </motion.h3>
            <div className={styles.tableContainer}>
                <table className={styles.tableGrid}>
                    <thead>
						<tr className={styles.thead}>
							<th className={styles.th}>
                                <span className={styles.span}>
                                    Name
                                </span>
							</th>
							<th className={styles.th}>
								<span className={styles.span}>
									Description
								</span>
							</th>
							<th className={styles.th}>
								<span className={styles.span}>
									Quantity
								</span>
							</th>
							<th className={styles.th}>
								<span className={styles.span}>
									Value
								</span>
							</th>
							<th className={styles.th}>
                                <span className={styles.span}>
                                    Edit
                                </span>
							</th>
						</tr>
                    </thead>
                    <TableCard />
                </table>
            </div>
        </div>
    );
}

export default Tables;