import { ReactNode } from "react";
import Footer from "../Components/Shared/Footer";
import Header from "../Components/Shared/Header";
import TopBar from "../Components/Shared/TopBar";

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <>
         <TopBar />
         <Header />
         {children}
         <Footer />
      </>
   );
};

export default Layout;