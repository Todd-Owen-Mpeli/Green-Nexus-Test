"use client";

// Imports
import {FC} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import { ISignUp } from "@/components/SignUp/types/Index";
import {stagger, initial, fadeInUp} from "@/animations/animations";

// Styling
import styles from "@/components/SignUp/styles/SignUp.module.scss";

// Components
import FormIntro from "@/components/SignUp/fragments/FormIntro";
import SignInAuth from "@/components/SignUp/fragments/SignInAuth";
import SignUpForm from "@/components/SignUp/fragments/SignUpForm";
import SignInDivider from "@/components/SignUp/fragments/SignInDivider";

const SignUp: FC<ISignUp.IProps> = ({title, paragraph}) => {
    return (
        <section className={styles.signUp}
            style={{
				backgroundImage: `url("/svg/stacked-waves-haikei-orange-secondary-default.svg")`,
			}}
		>
            <div className={styles.container}>
                <motion.div
					initial={initial}
					variants={stagger}
					whileInView="animate"
					className={styles.card}
					viewport={{ once: true }}
				>
                    <FormIntro title={title} paragraph={paragraph} />
                    <SignInAuth />
                    <SignInDivider />
					<SignUpForm />
                    <motion.div
						initial={initial}
						viewport={{once: true}}
						whileInView={fadeInUp}
						className={styles.bottomText}
					>
						<p className={styles.paragraph}>
							Already have an account?
							<Link
								href={`/login`}
								rel="noopener noreferrer"
								className={styles.link}
							>
								Sign In here
							</Link>
						</p>
					</motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default SignUp;