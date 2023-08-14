import { ReactNode } from "react";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import TopBar from "../components/shared/TopBar";

const PageLayout = ({ children }: { children: ReactNode }) => {
   return (
      <div className="flex flex-col min-h-screen">
         <TopBar />
         <Header />
         {children}
         <Footer />
      </div>
   );
};

export default PageLayout;