import { ReactNode } from "react";
import PageLayout from "../PageLayout";

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <PageLayout>
         <div className="mcontainer my-10">
            {children}
         </div>
      </PageLayout>
   );
};

export default Layout;