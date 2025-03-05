"use client";

// Imports
import Image from "next/image";
import { FC, useState } from "react";
import {motion} from "framer-motion";
import { initialTwo, fadeIn } from "@/animations/animations";
import {useFirebaseContext} from "@/firebase/context/Firebase";

// Styling
import styles from "@/components/Dashboard/styles/Dashboard.module.scss";

// Components
import SignOutModal from "@/components/Dashboard/fragments/SignOutModal";

const NavUserSignOut: FC = () => {
    const styling: string =
		"flex flex-col items-center justify-center gap-0 2xl:gap-2 2xl:gap-x-4 2xl:flex-row";
	const firebaseContext = useFirebaseContext();

	// Handles User Sign Out Modal
	const [revealSignOut, setRevealSignOut] = useState(false);

	const handleSignOut = () => {
		setRevealSignOut(true);
    };
    
    return (
        <div className={revealSignOut ? styling + " xl:justify-between" : styling + " xl:justify-start"}>
            <motion.button
				whileInView={fadeIn}
				initial={initialTwo}
                viewport={{ once: true }}
                onClick={handleSignOut}
                className={styles.avatarButton}
            >
                <Image
                    width={1000}
                    height={1000}
                    id="avatarButton"
                    className={styles.image}
                    data-dropdown-toggle="userDropdown"
                    data-dropdown-placement="bottom-start"
                    src={
                        firebaseContext?.userData?.photoURL
                            ? firebaseContext?.userData?.photoURL
                            : `/img/default-avatar-profile.jpg`
                    }
                    alt={`${firebaseContext?.userData?.displayName} profile image`}
                />
			</motion.button>
            <div className={styles.avatarContent}>
				<div className={revealSignOut ? styles.signOutModalSection : "hidden"}>
					<SignOutModal
						isOpen={revealSignOut}
						onClose={() => setRevealSignOut(false)}
					/>
				</div>
				<div className={revealSignOut ? "hidden" : styles.content}>
					<h3 className={styles.displayName}>
						{firebaseContext?.userData?.displayName
							? firebaseContext?.userData?.displayName.length > 25
								? firebaseContext?.userData?.displayName.substring(0, 25) +
								  "..."
								: firebaseContext?.userData?.displayName
							: ""}
					</h3>
					<span className={styles.email}>
						{firebaseContext?.userData?.email
							? firebaseContext?.userData?.email.length > 25
								? firebaseContext?.userData?.email.substring(0, 25) + "..."
								: firebaseContext?.userData?.email
							: ""}
					</span>
				</div>
            </div>
            <div
				className={
					revealSignOut
						? styles.signOutModalSection + " mt-8"
						: styles.signOutModalSection + " mt-0"
				}
			>
				<SignOutModal
					isOpen={revealSignOut}
					onClose={() => setRevealSignOut(false)}
				/>
			</div>
        </div>
    );
}

export default NavUserSignOut;