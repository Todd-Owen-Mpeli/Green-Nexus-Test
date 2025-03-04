// Imports
import {FC} from "react";
import { ISignUp } from "@/components/SignUp/types/Index";
import {initial, fadeInUp} from "@/animations/animations";

// Styling
import styles from "@/components/SignUp/styles/SignUp.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph/Index";
	
const FormIntro: FC<ISignUp.IFormIntro> = ({title, paragraph}) => {
	return (
		<div className={styles.formIntro}>
			<h3 className={styles.title}>
				{title}
			</h3>
			<Paragraph
				content={paragraph}
				className={styles.paragraph}
			/>
		</div>
	);
};

export default FormIntro;
