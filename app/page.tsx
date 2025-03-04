// Imports
import { Metadata } from "next";

// Components
import SignUp from "@/components/SignUp/Index";

// Home Page Generated Metadata
export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up to create an account",
};

const HomePage: any = async () => {

return (
  <>
      <SignUp
        title={`Sign Up today`}
        paragraph={`We kindly request you to enter your details.`}
      />
  </>
	);
};
  export default HomePage;