"use client";

// Imports
import Image from "next/image";
import {useRouter} from "next/navigation";
import { FC, Fragment, useState } from "react";
import {useFormik, Formik, Field, Form} from "formik";
import { INewCreatedItem } from "@/firebase/types/Index";
import { useDashboardContext } from "@/context/Dashboard";
import { useFirebaseContext } from "@/firebase/context/Firebase";
import {AnimatePresence, LazyMotion, domMax, motion} from "framer-motion";
import fadeInUp, {fadeIn, initial, stagger, initialTwo, arrayLoopStaggerChildren} from "@/animations/animations";

// Firebase
import { createUserItem } from "@/firebase/backend/createItem";

// Styling
import styles from "@/components/Dashboard/styles/Dashboard.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph/Index";

const FormikForm: FC = () => {

    const router: any = useRouter();
    const firebaseContext = useFirebaseContext();
    
    const userDocID: string | null = firebaseContext?.userDocId;
	const userDisplayName: string | undefined =
		firebaseContext?.userData?.displayName;

	// Loading, Send & Error Message States
	const [loading, setLoading] = useState(false);
	const [messageSent, setMessageSent] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);

	// A custom validation function. This must return an object
	// which keys are symmetrical to our values/initialValues
	const validate: any = (values: any) => {
		const errors: any = {};
		if (!values?.itemName) {
			errors.itemName = "Required*";
		} else if (values?.itemName.length >= 50) {
			errors.itemName = "Must be 15 characters or less";
		}

		return errors;
	};

	/* Create Item Form Fields
	And Initial Values */
	const formik: any = useFormik({
		initialValues: {
			itemName: "",
			description: "",
			value: "",
			quantity: "",
			category: "",
		},
		validate,
		onSubmit: async (values: INewCreatedItem) => {
			try {
				await createUserItem(userDocID, userDisplayName, values);
			} catch (error) {
				setErrorMessage(true);
				throw new Error(
					"Error Message: Something went wrong with creating your item. Please try again."
				);
			}
		},
	});

	// Form Submission
	const onFormSubmit = (event: any) => {
		event.preventDefault();
		setErrorMessage(false);
		try {
			if (userDocID) {
				setLoading(true);
				/* Create Item */
				formik.handleSubmit();
				setLoading(false);
				setMessageSent(true);
				setTimeout(() => {
					router.reload();
				}, 1000);
			}
		} catch (error) {
			setErrorMessage(true);
			throw new Error(
				"Error Message: Something went wrong with creating your item. Please try again."
			);
		}
    };
    
    return (
        <LazyMotion features={domMax}>
			<div className={styles.popupContent}>
				<div className={styles.popupWrapper}>
					<div className={styles.createItem}>
						<Formik
							onSubmit={formik?.onSubmit}
							onReset={formik?.initialValues}
							initialValues={formik?.initialValues}
						>
							<Form className={styles.form}>
								{loading ? (
									<motion.div
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: true}}
										className={styles.titleSection}
									>
										<h4 className={styles.pending}>
											Creating Task...
										</h4>
									</motion.div>
								) : messageSent ? (
									<motion.div
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: true}}
										className={styles.titleSection}
									>
										<h4 className={styles.created}>
											Task Created!
										</h4>
									</motion.div>
								) : errorMessage ? (
									<motion.div
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: true}}
										className={styles.titleSection}
									>
										<h4 className={styles.error}>
											Error Message: Something went wrong with creating your Task. Please try again.
										</h4>
									</motion.div>
								) : (
									<motion.h3
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: true}}
										className={styles.title}
									>
										Create a Task
									</motion.h3>
								)}
                                <div className={styles.formFieldsSection}>
                                    <div className={styles.fieldsSection}>
                                        <motion.div
                                            initial={initial}
                                            variants={stagger}
                                            whileInView="animate"
                                            viewport={{once: true}}
                                            className="flex flex-col flex-wrap items-center justify-center w-full gap-4 lg:justify-start lg:flex-row"
                                        >
                                            <motion.div
                                                initial={initialTwo}
                                                whileInView={fadeIn}
                                                viewport={{once: true}}
                                                className="flex flex-col w-full gap-2 lg:w-fit"
                                            >
                                                {formik?.touched?.itemName &&
                                                formik?.errors?.itemName ? (
                                                    <span className="py-1 text-left text-tiny text-darkBlue">
                                                        {formik?.errors?.itemName}
                                                    </span>
                                                ) : null}
                                                <label>Task Name</label>
                                                <Field
                                                    id="itemName"
                                                    name="itemName"
                                                    placeholder="Task Name"
                                                    onBlur={formik?.handleBlur}
                                                    onChange={formik?.handleChange}
                                                    value={formik?.values?.itemName}
                                                />
                                            </motion.div>
                                            <motion.div
                                                initial={initialTwo}
                                                whileInView={fadeIn}
                                                viewport={{once: true}}
                                                className="flex flex-col w-full gap-2"
                                            >
                                                {formik?.touched?.description &&
                                                formik?.errors?.description ? (
                                                    <span className="py-1 text-left text-tiny text-darkBlue font-[400]">
                                                        {formik?.errors?.description}
                                                    </span>
                                                ) : null}
                                                <label>Description</label>
                                                <textarea
                                                    rows={5}
                                                    id="description"
                                                    name="description"
                                                    placeholder="Description"
                                                    onBlur={formik?.handleBlur}
                                                    onChange={formik?.handleChange}
                                                    value={formik?.values?.description}
                                                />
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                    <motion.button
                                        role="button"
                                        type="button"
                                        initial={initial}
                                        whileInView={fadeInUp}
                                        onClick={onFormSubmit}
                                        viewport={{once: true}}
                                        aria-label="Submit Task"
                                        disabled={!formik?.values?.itemName}
                                        className={styles.button + " group"}
                                        style={{
                                            backgroundImage: `url("/svg/stacked-waves-haikei-blue-darkblue.svg")`,
                                        }}
                                    >
                                        <div
                                            className={styles.div + " group-hover:translate-x-full group-hover:scale-102"}
                                            style={{
                                                backgroundImage: `url("/svg/stacked-waves-haikei-orange-yellow.svg")`,
                                            }}
                                        />
                                        <span className={styles.span}>
                                            {loading
                                                ? "Creating Task..."
                                                : messageSent
                                                ? "Task Created!"
                                                : errorMessage
                                                ? "Creating Error!"
                                                : "Create Task"
                                            }
                                        </span>
                                    </motion.button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </LazyMotion>
    );
}

export default FormikForm;