"use client"

// Imports
import Link from "next/link";
import {FC, useState} from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import {Field, Form, Formik, useFormik} from "formik";
import {initial, stagger, fadeInUp} from "@/animations/animations";

// Firebase
import {getAuth} from "firebase/auth";
import {signInUserWithEmailAndPassword} from "@/firebase/backend/signInWithEmailAndPassword";
import {createNewUserWithEmailAndPassword} from "@/firebase/backend/createNewUserWithEmailAndPassword";

// Styling
import styles from "@/components/SignUp/styles/SignUp.module.scss";

const SignUpForm: FC = () => {
	const auth = getAuth();
	const router:any = useRouter();

	// Loading, Send & Error Message States
	const [errorMessage, setErrorMessage] = useState(false);
	const [errorEmailMessage, setErrorEmailMessage] = useState(false);
	const [errorPasswordMessage, setErrorPasswordMessage] = useState(false);
	const [errorEmailExistsMessage, setErrorEmailExistsMessage] = useState(false);

	// A custom validation function. This must return an object
	// which keys are symmetrical to our values/initialValues
	const validate: any = (values: any) => {
		const errors: any = {};
		if (!values?.fullName) {
			errors.fullName = "Required*";
		} else if (values?.fullName.length >= 16) {
			errors.fullName = "Must be 15 characters or less";
		}

		if (!values?.email) {
			errors.email = "Required*";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values?.email)
		) {
			errors.email = "Invalid email address";
		}

		if (!values.password) {
			errors.password = "Required*";
		} else if (values.password.length <= 7) {
			errors.password = "Must be 8 characters or more";
		}

		return errors;
	};

	// Google ReCaptcha Validation
	const [reCaptchaResult, setReCaptchaResult] = useState(null);
	const googleReCaptchaValidate = (value: any) => {
		return value;
	};

	const handleReCaptchaChange = (response: any) => {
		const result = googleReCaptchaValidate(response);
		setReCaptchaResult(result);
	};

	/* Contact Form Fields
	And Initial Values */
	const formik: any = useFormik({
		initialValues: {
			fullName: "",
			email: "",
			password: "",
		},
		validate,
		onSubmit: async (values: {
			fullName: string;
			email: string;
			password: string;
		}) => {
			if (reCaptchaResult) {
				try {
					const signInStatus = await signInUserWithEmailAndPassword(
						auth,
						values
					);

					if (signInStatus) {
						if (signInStatus.wrongEmail) {
							setErrorEmailMessage(true);
						} else if (signInStatus.wrongPassword) {
							setErrorPasswordMessage(true);
							setErrorEmailExistsMessage(true);
						} else if (signInStatus.userNotFound) {
							console.log(`Created new user ${values?.fullName}`);
							createNewUserWithEmailAndPassword(auth, values);
							setTimeout(() => {
								router.push(`/payment`)?.catch(console.error);
							}, 1000);
						} else if (signInStatus.userDisabled) {
							setErrorMessage(true);
						} else {
							// Send user to the dashboard
							router.push(`/dashboard`)?.catch(console.error);
						}
					}
				} catch (error) {
					setErrorMessage(true);
					throw new Error(
						`Error Message: Sorry ${values?.fullName} Something went wrong creating your account. Please try again.`
					);
				}
			} else {
				throw new Error(
					"Error Message: Something went wrong with your Google Recaptcha validation. Please try again."
				);
			}
		},
	});
	// Form Submission
	const onFormSubmit = (event: any) => {
		event.preventDefault();
		setErrorMessage(false);
		if (reCaptchaResult) {
			try {
				/* Send Form Content */
				formik.handleSubmit();
			} catch (error) {
				setErrorMessage(true);
				throw new Error(
					"Error Message: Something went wrong with Sending your Message. Please try again."
				);
			}
		} else {
			throw new Error(
				"Error Message: Something went wrong with your Google Recaptcha validation. Please try again."
			);
		}
	};

	return (
		<Formik onSubmit={formik?.onSubmit} initialValues={formik?.initialValues}>
			<Form className={styles.signUpForm}>
				<div className={styles.content}>
					{/* First Name */}
					<div className={styles.firstNameField}>
						<div className={styles.div}>
							<label
								htmlFor="First Name"
								className={styles.label}
							>
								First Name
							</label>
							{formik?.touched?.fullName && formik?.errors?.fullName ? (
								<span className={styles.error}>
									{formik?.errors?.fullName}
								</span>
							) : null}
						</div>
						<Field
							type="text"
							id="fullName"
							name="fullName"
							className={styles.field}
							onBlur={formik?.handleBlur}
							placeholder="Olivia Anderson"
							onChange={formik?.handleChange}
							value={formik?.values?.fullName}
						/>
					</div>
					{/* Email address */}
					<div className={styles.emailAddressField}>
						<div className={styles.div}>
							<label
								htmlFor="email"
								className={styles.label}
							>
								Email address
							</label>
							<div className={styles.errorWrapper}>
								{formik?.touched?.email && formik?.errors?.email ? (
									<span className={styles.error}>
										{formik?.errors?.email}
									</span>
								) : null}
								<span
									className={
										errorEmailMessage
											? styles.invalid
											: "hidden"
									}
								>
									Invalid email address
								</span>
								<span
									className={
										errorEmailExistsMessage
											? styles.valid
											: "hidden"
									}
								>
									Valid email address
								</span>
							</div>
						</div>
						<Field
							id="email"
							type="email"
							name="email"
							className={styles.field}
							onBlur={formik?.handleBlur}
							value={formik?.values?.email}
							onChange={formik?.handleChange}
							placeholder="oliviaanderson@gmail.com"
						/>
					</div>
					{/* Password */}
					<div className={styles.field}>
						<div className={styles.div}>
							<span className={styles.span}>
								<label
									htmlFor="Password"
									className={styles.label}
								>
									Password
								</label>
								<div className={styles.errorWrapper}>
									{formik?.touched?.password && formik?.errors?.password ? (
										<span className={styles.error}>
											{formik?.errors?.password}
										</span>
									) : null}
									<span
										className={
											errorPasswordMessage
												? styles.errorPasswordMessage
												: "hidden"
										}
									>
										Invalid Password
									</span>
								</div>
							</span>
							<Link
								href="#"
								className={styles.link}
								rel="noopener noreferrer"
							>
								Forgot password?
							</Link>
						</div>
						<Field
							id="password"
							type="password"
							name="password"
							placeholder="**********"
							className={styles.field}
							onBlur={formik?.handleBlur}
							onChange={formik?.handleChange}
							value={formik?.values?.password}
						/>
					</div>
					<ReCAPTCHA
						sitekey={`6LeJJqwlAAAAAByEDQJTbNFkPL9DSjMBwnE7smkU`}
						onChange={handleReCaptchaChange}
					/>
				</div>
				<button
					role="button"
					type="button"
					onClick={onFormSubmit}
					className={styles.button}
					aria-label="Sign Up with Form"
					disabled={
						!formik?.values?.fullName ||
						!formik?.values?.email ||
						!formik?.values?.password ||
						reCaptchaResult === null ||
						reCaptchaResult === undefined
					}
					style={{
						backgroundImage: `url("/svg/backgroundSVG/stacked-waves-haikei-primary-default-primary-dark.svg")`,
					}}
				>
					<div
						className={styles.div + " group group-hover:translate-x-full group-hover:scale-102"}
						style={{
							backgroundImage: `url("/svg/backgroundSVG/stacked-waves-haikei-orange-yellow.svg")`,
						}}
					/>
					<span className={styles.span}>Sign up</span>
				</button>
			</Form>
		</Formik>
	);
};

export default SignUpForm;
