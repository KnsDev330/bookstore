import { FC } from "react";
import { useForm } from "react-hook-form";
import { IAddBookInput } from "../../interfaces/interfaces";


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
            <form onSubmit={handleSubmit(onSubmit)}>

            </form>
         </div>
      </div>
   );
};

export default DashAddBook;