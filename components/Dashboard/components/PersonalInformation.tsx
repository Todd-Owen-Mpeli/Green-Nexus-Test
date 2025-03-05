"use client";

// Imports
import {FC} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import { initial, stagger, fadeInUp } from "@/animations/animations";

// Firebase
import { useFirebaseContext } from "@/firebase/context/Firebase";

// Styling
import styles from "@/components/Dashboard/styles/Dashboard.module.scss";

const PersonalInformation: FC = () => {
    const firebaseContext = useFirebaseContext();

	// Ensure userData is not null before using it in JSX
	if (!firebaseContext?.userData) {
		return <div>Loading...</div>; // or some other loading indicator
	}

    return (
        <div className={styles.personalInformation}>
            <Image
				width={1000}
				height={1000}
				className="object-cover object-center w-full h-full min-h-[175px] max-h-[175px] lg:min-h-[250px] lg:max-h-[250px]"
				src={"/svg/stacked-waves-haikei-orange-yellow.svg"}
				alt="profile hero image"
			/>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.item}>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.title}
						>
							Display Name
						</motion.h3>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.value}
						>
							{firebaseContext?.userData?.displayName}
						</motion.h3>
					</div>
					<div className={styles.item}>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.title}
						>
							Profile Picture
						</motion.h3>
						<Image
							width={500}
							height={500}
                            className={styles.photoURL}
							src={
								firebaseContext?.userData?.photoURL
									? firebaseContext?.userData?.photoURL
									: `/img/default-avatar-profile.jpg`
							}
							alt={`${firebaseContext?.userData?.displayName} profile image`}
						/>
					</div>
					<div className={styles.item}>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className="flex items-center gap-2"
						>
							<h3 className={styles.title}>
								Email Address
							</h3>
							<span
								className={
									firebaseContext?.userData?.emailVerified
										? styles.emailVerified + " bg-brightGreen"
										: styles.emailVerified + " bg-pinkRed"
								}
							>
								{firebaseContext?.userData?.emailVerified
									? "Verified"
									: "Not Verified"}
							</span>
						</motion.h3>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.value}
						>
							{firebaseContext?.userData?.email}
						</motion.h3>
					</div>
					<div className={styles.item}>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.title}
						>
							Member Role
						</motion.h3>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.value}
						>
							Owner
						</motion.h3>
					</div>
					<div className={styles.item}>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.title}
						>
							Joined
						</motion.h3>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.value}
						>
							{firebaseContext?.userData?.metadata?.creationTime}
						</motion.h3>
					</div>
					<div className={styles.item}>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.title}
						>
							Last Sign In
						</motion.h3>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.value}
						>
							{firebaseContext?.userData?.metadata?.lastSignInTime}
						</motion.h3>
					</div>
					<div className={styles.item}>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.title}
						>
							Phone Number
						</motion.h3>
						<motion.h3
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={styles.value}
						>
							{firebaseContext?.userData?.phoneNumber != null
								? firebaseContext?.userData?.phoneNumber
								: "none"}
						</motion.h3>
					</div>
                </div>
            </div>
        </div>
    );
}

export default PersonalInformation;