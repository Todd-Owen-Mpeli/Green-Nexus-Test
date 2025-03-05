"use client";

import {FC} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import { ILogin } from "@/components/Login/types/Index";
import {stagger, initial, fadeInUp} from "@/animations/animations";

// Styling
import styles from "@/components/Login/styles/Login.module.scss";

// Components
import FormIntro from "@/components/Login/fragments/FormIntro";
import SignInAuth from "@/components/Login/fragments/SignInAuth";
import LoginForm from "@/components/Login/fragments/LoginForm";
import SignInDivider from "@/components/Login/fragments/SignInDivider";

const Login: FC<ILogin.IProps> = ({title, paragraph}) => {
    return (
        <section className={styles.login}
            style={{
				backgroundImage: `url("/svg/backgroundSVG/stacked-waves-haikei-blue-darkblue.svg")`,
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
					<LoginForm />
                    <motion.div
						initial={initial}
						viewport={{once: true}}
						whileInView={fadeInUp}
						className={styles.bottomText}
					>
						<p className={styles.paragraph}>
							Don&apos;t have an account?
							<Link
								href={`/`}
								rel="noopener noreferrer"
								className={styles.link}
							>
								Sign up here
							</Link>
						</p>
					</motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default Login;