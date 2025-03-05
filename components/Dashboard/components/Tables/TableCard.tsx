"use client";

// Imports
import Image from "next/image";
import {motion} from "framer-motion";
import {FC, Fragment, useState} from "react";
import { useDashboardContext } from "@/context/Dashboard";
import { useFirebaseContext } from "@/firebase/context/Firebase";
import {fadeIn, initial, stagger, initialTwo, arrayLoopStaggerChildren} from "@/animations/animations";

// Styling
import styles from "@/components/Dashboard/styles/Dashboard.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph/Index";

const TableCard: FC = () => {

    const firebaseContext = useFirebaseContext();
	const dashboardContext = useDashboardContext();
	const [currentPage, setCurrentPage] = useState(1);
	const [editFields, setEditFields] = useState(false);

    const itemsPerPage = 10;
	const startIndex: number = (currentPage - 1) * itemsPerPage;
	const endIndex: number = startIndex + itemsPerPage;

	const totalItems: number | undefined | any =
		dashboardContext?.itemsCollection?.length;
	const itemsToRender: any[] | undefined =
		dashboardContext?.itemsCollection?.slice(startIndex, endIndex);

	// Hides or Displays User dropdown
	const handleEditFields = () => {
		setEditFields(!editFields);
    };
    
    return (
		<tbody className={styles.tbody}>
			{itemsToRender && itemsToRender.length > 0 ? (
				itemsToRender?.map((item: any, index: number) => (
					<Fragment key={index}>
						<motion.div
							custom={index}
							initial={initial}
							whileInView="animate"
							viewport={{once: true}}
							className={styles.wrapper}
							variants={arrayLoopStaggerChildren}
						>
							<td className={styles.td}>
									<div className={styles.photoURLItemNameCategory}>
										<div className={styles.innerContent}>
											<div className={styles.top}>
												<span className={styles.startIndex}>
													00{startIndex + index}
												</span>
												<Image
													width={500}
													height={500}
													src={
														firebaseContext?.userData?.photoURL
															? firebaseContext?.userData?.photoURL
															: `/img/default-avatar-profile.jpg`
													}
													alt={`${firebaseContext?.userData?.displayName} profile image`}
													className={styles.photoURL}
												/>
											</div>
											<div className={styles.bottom}>
												<span className={styles.itemName}>
													{item?.itemName.length < 25
														? item?.itemName
														: item?.itemName.substring(0, 25) + "..."}
												</span>
												<span className={styles.category}>
													{item?.category.length < 25
														? item?.category
														: item?.category.substring(0, 25) + "..."}
												</span>
											</div>
										</div>
									</div>
							</td>
							<td className={styles.td}>
									<div className={styles.description}>
										{item?.description.length < 250
											? item?.description
											: item?.description.substring(0, 250) + "..."}
									</div>
							</td>
							<td className={styles.td}>
								<div className={styles.editFields}>
									<button
										onClick={handleEditFields}
										className={styles.button}
									>
										<span className={styles.divs}></span>
										<span className={styles.divMiddle}></span>
										<span className={styles.divs}></span>
									</button>
								</div>
							</td>
						</motion.div>
					</Fragment>
				))
			) : (
				<></>
			)}
			<tr>
				<motion.div
					initial={initial}
                    variants={stagger}
                    whileInView="animate"
                    viewport={{once: true}}
					className={styles.pagination}
				>
					{/* Pagination */}
					<motion.div
						initial={initial}
						variants={stagger}
						whileInView="animate"
						viewport={{once: true}}
						className={styles.paginationContainer}
					>
						{/* Previous */}
						<motion.button
							initial={initialTwo}
							whileInView={fadeIn}
							viewport={{once: true}}
							className={styles.previous}
							disabled={currentPage === 1}
							onClick={() => setCurrentPage(currentPage - 1)}
						>
							Previous
						</motion.button>
						<motion.span
							initial={initialTwo}
							whileInView={fadeIn}
							viewport={{once: true}}
							className={styles.text}
						>
							{currentPage}
						</motion.span>
						{/* Next */}
						<motion.button
							initial={initialTwo}
							whileInView={fadeIn}
							viewport={{once: true}}
							className={styles.next}
							disabled={endIndex >= totalItems}
							onClick={() => setCurrentPage(currentPage + 1)}
						>
							Next
						</motion.button>
					</motion.div>
					<motion.div
						initial={initialTwo}
						whileInView={fadeIn}
						viewport={{once: true}}
					>
						<Paragraph
							className={styles.totalItems}
							content={`Showing ${totalItems > 10 ? "10" : totalItems } out of ${totalItems} results`}
						/>
					</motion.div>
				</motion.div>
			</tr>
			
		</tbody>
    );
}

export default TableCard;