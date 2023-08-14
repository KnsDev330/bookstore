import { FC } from "react";
import PageLayout from "./PageLayout";
import Login from "../components/auth/Login";

const LoginPage: FC = (): JSX.Element => {
   return (
      <PageLayout>
         <Login />
      </PageLayout>
   );
};

export default LoginPage;