// Imports
import { Metadata } from "next";

// Login renamed to SignIn Component
import SignIn from "@/components/Login/Index";

// Home Page Generated Metadata
export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const Login: any = async () => {

return (
  <SignIn
        title={`Login in to your account`}
        paragraph={`Welcome Back! We kindly request you to enter your details.`}
      />
	);
};
  export default Login;