// Imports
import {FC} from "react";
import Link from "next/link";
import { ISignUp } from "@/components/SignUp/types/Index";

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
				backgroundImage: `url("/svg/backgroundSVG/stacked-waves-haikei-blue-pink-red-yellow.svg")`,
			}}
		>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.card}>
                        <FormIntro title={title} paragraph={paragraph} />
                        <SignInAuth />
                        <SignInDivider />
						<SignUpForm />
                        <div
							className={styles.bottomText}
						>
							<p className={styles.paragraph}>
								Already have an account?
								<Link
									href={`/sign-in`}
									rel="noopener noreferrer"
									className={styles.link}
								>
									Sign In here
								</Link>
							</p>
						</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;