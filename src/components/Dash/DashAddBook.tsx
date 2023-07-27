/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IAddBookInput, IBook } from "../../interfaces/interfaces";
import Button from "../Button";
import booksList from "../../utils/dummyData/books";
import { getErrors, randInt } from "../../utils/Utils";
import { useCreateBookMutation } from "../../redux/api/bookApi";
import ErrorBox from "../shared/ErrorBox";
import SuccessBox from "../shared/SuccessBox";


const DashAddBook: FC = (): JSX.Element => {
   const cls = `bg-inherit border border-gray-200 focus:border-primary rounded outline-none duration-300 px-2 py-1 w-full opacity`;

   const { setValue, register, handleSubmit, formState: { errors } } = useForm<IAddBookInput>();
   const [postBook, { isLoading, isError, error, isSuccess, data }] = useCreateBookMutation();
   useEffect(() => console.log('data', data), [data]);
   useEffect(() => console.log('error', error), [error]);

   const onSubmit = (data: IAddBookInput) => {
      console.log(data);
      void postBook({ ...data, publicationDate: Number(data.publicationDate) });
   };


   /* DUMMY DATA */
   const [books, setBooks] = useState<IBook[]>([]);
   useEffect(() => setBooks(booksList as IBook[]), []);
   const LoadDummyBook = () => {
      const book = books[randInt(0, 29)];
      setValue('title', book.title);
      setValue('author', book.author);
      setValue('genre', book.genre);
      setValue('publicationDate', book.publicationDate);
      setValue('image', book.image);
   }
   /* DUMMY DATA */

   return (
      <div className="shdow-lg w-[500px] max-w-[90%] my-5 md:px-5 pb-5 pt-0 rounded-lg mx-auto lg:ms-0">
         <div className="texts">
            <h2 className="text-xl font-medium">Add New Book</h2>
            <p className="text-sm">You can add a new book here</p>
         </div>
         <div className="bg-white p-3 md:p-5 mt-5 rounded">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
               <div>
                  <p className="opacity-75">Title</p>
                  <input className={`${cls}`} {...register('title', { required: `title is required` })} />
                  <p className="text-xs text-red-500">{errors.title?.message}</p>
               </div>
               <div>
                  <p className="opacity-75">Author</p>
                  <input className={`${cls}`} {...register('author', { required: `author is required` })} />
                  <p className="text-xs text-red-500">{errors.author?.message}</p>
               </div>
               <div>
                  <p className="opacity-75">Genre</p>
                  <input className={`${cls}`} {...register('genre', { required: `genre is required` })} />
                  <p className="text-xs text-red-500">{errors.genre?.message}</p>
               </div>
               <div>
                  <p className="opacity-75">Published Year</p>
                  <input className={`${cls}`} {...register('publicationDate', { required: `publicationDate is required` })} />
                  <p className="text-xs text-red-500">{errors.publicationDate?.message}</p>
               </div>
               <div>
                  <p className="opacity-75">Image Link</p>
                  <input className={`${cls}`} {...register('image', { required: `image link is required` })} />
                  <p className="text-xs text-red-500">{errors.image?.message}</p>
               </div>

               {isError && <ErrorBox error={getErrors(error!)} />}
               {isSuccess && <SuccessBox message={data?.text || ''} />}

               <Button variant="primary" text="Submit" isLoading={isLoading} className="my-2 mt-3 w-32 mx-auto lg:ms-0" />

            </form>

            {/* DUMMY DATA */}
            <button className="mx-auto lg:ms-0 block border" onClick={LoadDummyBook}>load dummy data</button>
            {/* DUMMY DATA */}

         </div>
      </div>
   );
};

export default DashAddBook;