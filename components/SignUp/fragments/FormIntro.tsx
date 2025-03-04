// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import { ISignUp } from "@/components/SignUp/types/Index";
import {initial, stagger, fadeInUp} from "@/animations/animations";

// Styling
import styles from "@/components/SignUp/styles/SignUp.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph/Index";
	
const FormIntro: FC<ISignUp.IFormIntro> = ({title, paragraph}) => {
	return (
		<motion.div
			className={styles.formIntro}
		>
			<motion.h3
				initial={initial}
				whileInView={fadeInUp}
				viewport={{once: true}}
				className={styles.title}
			>
				{title}
			</motion.h3>
			<Paragraph
				content={paragraph}
				className={styles.paragraph}
			/>
		</motion.div>
	);
};

export default FormIntro;
