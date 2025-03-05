// Imports
import type {AppProps} from "next/app";

// Global Styling
import "@/styles/globals.scss";

// Context Providers
import FirebaseUserProvider from "@/firebase/context/providers/FirebaseContextProvider";

// Components
import SmoothScrolling from "@/components/Global/SmoothScrolling";
import BlurryCursorMouse from "@/components/BlurryCursorMouse/Index";

const App = async ({children}: AppProps | any) => {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          <FirebaseUserProvider>
            {children}
            <BlurryCursorMouse />
          </FirebaseUserProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}

export default App;
