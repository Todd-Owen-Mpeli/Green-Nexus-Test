// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {initial, fadeInUp} from "@/animations/animations";

// Styling
import styles from "@/components/SignUp/styles/SignUp.module.scss";

const SignInDivider: FC = () => {
	return (
		<div className={styles.signInDivider}>
			<div className={styles.dividers} />
			<span className={styles.text}>Or</span>
			<div className={styles.dividers} />
		</div>
	);
};

export default SignInDivider;
