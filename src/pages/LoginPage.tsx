/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { FC, useEffect } from "react";
import Layout from "./Layout";
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { loginUser } from "../redux/features/userSlice";
import ErrorBox from "../components/shared/ErrorBox";

interface LoginFormInputs {
   email: string;
   password: string;
}
interface Props {
   className?: string;
}
const LoginPage: FC<Props> = ({ className }): JSX.Element => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormInputs>();

   const { user, isLoading, error } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

   const navigate = useNavigate();
   const onSubmit = (data: LoginFormInputs) => {
      console.log(data);
      dispatch(loginUser({ email: data.email, password: data.password }))
   };

   useEffect(() => {
      (user?.email && !isLoading) && navigate('/');
   }, [user?.email, isLoading, navigate]);
   return (
      <Layout>
         <div className={`${className || ''} bg-white flex-grow w-full`}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[600px] w-[90%] mx-auto bg-gray-200 p-5 md:p-7 lg:p-10 rounded-lg my-10 shadow text-accent">
               <div className="grid gap-2">
                  <div className="grid gap-1">
                     Email
                     <input
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        defaultValue='me7@kns.dev'
                        className="outline-none rounded h-10 border focus:border-primary duration-300 px-3"
                        {...register('email', { required: 'Email is required' })}
                     />
                     {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

                     <div></div>
                     Password
                     <input
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        defaultValue='12345678'
                        className="outline-none rounded h-10 border focus:border-primary duration-300 px-3"
                        {...register('password', { required: 'Password is required' })}
                     />
                     {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                  </div>

                  {error && <ErrorBox error={error} />}
                  <Button text="Login" className="w-40 mx-auto mt-6" variant="primary" isLoading={isLoading} />

                  <div className="flex flex-col justify-center items-center mt-5">
                     <Link to='/register' className="group text-xs">New here? <span className="group-hover:underline text-blue-500">Register</span></Link>
                     <Link to='/reset' className="group text-xs">Forgot password? <span className="group-hover:underline text-blue-500">Reset</span></Link>
                  </div>
               </div>
            </form>
         </div>
      </Layout>
   );
};

export default LoginPage;