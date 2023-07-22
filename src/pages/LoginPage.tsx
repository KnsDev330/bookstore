import { FC } from "react";
import Layout from "./Layout";
import Login from "../components/auth/Login";

const LoginPage: FC = (): JSX.Element => {
   return (
      <Layout>
         <Login />
      </Layout>
   );
};

export default LoginPage;