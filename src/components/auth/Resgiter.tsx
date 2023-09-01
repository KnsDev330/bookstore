/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../redux/features/userSlice";
import ErrorBox from "../shared/ErrorBox";
import Button from "../Button";

interface RegisterFormInputs {
   name: string;
   email: string;
   password: string;
}
interface Props {
   className?: string;
}

const Register: FC<Props> = ({ className }) => {

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterFormInputs>();

   const { user, isLoading, error } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

   const navigate = useNavigate();
   const onSubmit = ({ name, email, password }: RegisterFormInputs) => {
      dispatch(createUser({ name, email, password }))
   };

   useEffect(() => {
      (user?.email && !isLoading) && navigate('/');
   }, [user?.email, isLoading, navigate]);

   return (
      <div className={`${className || ''} bg-gray-100 flex-grow w-full`}>
         <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] w-[90%] mx-auto bg-white/80 p-5 md:p-7 lg:p-10 rounded-lg my-10 shadow text-accent">
            <div className="grid gap-2">
               <div className="grid gap-1">
                  Name
                  <input
                     type="text"
                     autoCapitalize="none"
                     autoComplete="name"
                     autoCorrect="off"
                     className="outline-none rounded h-10 border focus:border-primary duration-300 px-3 bg-inherit"
                     {...register('name', { required: 'Name is required' })}
                     title="Enter your name"
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  <div /><div /><div />
                  Email
                  <input
                     type="email"
                     autoCapitalize="none"
                     autoComplete="email"
                     autoCorrect="off"
                     className="outline-none rounded h-10 border focus:border-primary duration-300 px-3 bg-inherit"
                     {...register('email', { required: 'Email is required' })}
                     title="Enter your email address"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  <div /><div /><div />
                  Password
                  <input
                     type="password"
                     autoCapitalize="none"
                     autoComplete="password"
                     className="outline-none rounded h-10 border focus:border-primary duration-300 px-3 bg-inherit"
                     {...register('password', { required: 'Password is required' })}
                     title="Enter a strong password"
                  />
                  {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
               </div>

               {error && <ErrorBox error={error} />}
               <Button text="Register" className="w-40 mx-auto mt-6" variant="primary" isLoading={isLoading} />

               <div className="flex flex-col justify-center items-center mt-5">
                  <p className="text-xs">Have account? <Link to='/login' className="ahover">Login</Link></p>
               </div>
            </div>
         </form>
      </div>
   );
};

export default Register;