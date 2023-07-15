import { ReactNode } from "react";
import Footer from "../Components/Shared/Footer";
import Header from "../Components/Shared/Header";
import TopBar from "../Components/Shared/TopBar";

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <div className="flex flex-col min-h-screen">
         <TopBar />
         <Header />
         {children}
         <Footer />
      </div>
   );
};

export default Layout;