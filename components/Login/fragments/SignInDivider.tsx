// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {initial, fadeInUp} from "@/animations/animations";

// Styling
import styles from "@/components/Login/styles/Login.module.scss";

const SignInDivider: FC = () => {
	return (
		<motion.div
			initial={initial}
			viewport={{once: true}}
			whileInView={fadeInUp}
			className={styles.signInDivider}
		>
			<div className={styles.dividers} />
			<span className={styles.text}>Or</span>
			<div className={styles.dividers} />
		</motion.div>
	);
};

export default SignInDivider;