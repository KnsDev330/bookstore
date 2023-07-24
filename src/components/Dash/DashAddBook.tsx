import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IAddBookInput } from "../../interfaces/interfaces";
import Button from "../Button";


const DashAddBook: FC = (): JSX.Element => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IAddBookInput>();

   const onSubmit = (data: IAddBookInput) => {
      console.log(data);
   };

   return (
      <div className="bg- shdow-lg w-full !max-w-[600px] my-5 py-5 pt-0 rounded-lg">
         <div className="texts">
            <h2 className="text-xl font-medium">Add New Book</h2>
            <p className="text-sm">You can add a new book here</p>
         </div>
         <div className="bg-white p-3 md:p-5 mt-5 rounded">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
               <div>
                  <p>Title</p>
                  <input className="bg-inherit border border-gray-200 focus:border-primary rounded outline-none duration-300 px-2 py-1 w-full" />
               </div>
               <div>
                  <p>Author</p>
                  <input className="bg-inherit border border-gray-200 focus:border-primary rounded outline-none duration-300 px-2 py-1 w-full" />
               </div>
               <div>
                  <p>Genre</p>
                  <input className="bg-inherit border border-gray-200 focus:border-primary rounded outline-none duration-300 px-2 py-1 w-full" />
               </div>
               <div>
                  <p>Published Year</p>
                  <input className="bg-inherit border border-gray-200 focus:border-primary rounded outline-none duration-300 px-2 py-1 w-full" />
               </div>

               <Button variant="primary" text="Submit" isLoading={false} className="my-2 mt-6 w-32" />
            </form>
         </div>
      </div>
   );
};

export default DashAddBook;