import { FC } from "react";
import { useForm } from "react-hook-form";
import { IAddBookInput } from "../../interfaces/interfaces";
import Button from "../Button";
import { getErrors } from "../../utils/Utils";
import { useGetBookByIdQuery, useUpdateBookMutation } from "../../redux/api/bookApi";
import ErrorBox from "../shared/ErrorBox";
import SuccessBox from "../shared/SuccessBox";
import { useParams } from "react-router-dom";
import Shimmer from "../components/shimmer";


const DashEditBook: FC = (): JSX.Element => {
   const { id } = useParams();
   const cls = `bg-inherit border border-gray-200 focus:border-primary rounded outline-none duration-300 px-2 py-1 w-full opacity`;

   const { data: bookData, isFetching: isBookFetching, error: bookError } = useGetBookByIdQuery({ id: id! });
   const { register, handleSubmit, formState: { errors } } = useForm<IAddBookInput>();

   const [updateBook, { error, isError, isSuccess, data, isLoading }] = useUpdateBookMutation();

   const onSubmit = (data: IAddBookInput) => {
      console.log(data);
      void updateBook({ id: id!, data: { ...data, publicationDate: Number(data.publicationDate) } });
   };



   if (isBookFetching) return <div className="flex flex-wrap gap-5 p-5 h-[325px] mx-auto"><Shimmer /></div>
   return (
      <div className="shdow-lg w-[500px] max-w-[90%] my-5 md:px-5 pb-5 pt-0 rounded-lg mx-auto lg:ms-0">
         <div className="texts">
            <h2 className="text-xl font-medium">Edit Book</h2>
            <p className="text-sm">Please update the necessary information and submit</p>
         </div>
         <div className="bg-white p-3 md:p-5 mt-5 rounded">

            {bookData ? (
               <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                  <div>
                     <p className="opacity-75">Title</p>
                     <input className={`${cls}`} {...register('title', { required: `title is required` })} defaultValue={bookData.data.title} />
                     <p className="text-xs text-red-500">{errors.title?.message}</p>
                  </div>
                  <div>
                     <p className="opacity-75">Author</p>
                     <input className={`${cls}`} {...register('author', { required: `author is required` })} defaultValue={bookData.data.author} />
                     <p className="text-xs text-red-500">{errors.author?.message}</p>
                  </div>
                  <div>
                     <p className="opacity-75">Genre</p>
                     <input className={`${cls}`} {...register('genre', { required: `genre is required` })} defaultValue={bookData.data.genre} />
                     <p className="text-xs text-red-500">{errors.genre?.message}</p>
                  </div>
                  <div>
                     <p className="opacity-75">Published Year</p>
                     <input className={`${cls}`} {...register('publicationDate', { required: `publicationDate is required` })} defaultValue={bookData.data.publicationDate} />
                     <p className="text-xs text-red-500">{errors.publicationDate?.message}</p>
                  </div>
                  <div>
                     <p className="opacity-75">Image Link</p>
                     <input className={`${cls}`} {...register('image', { required: `image link is required` })} defaultValue={bookData.data.image} />
                     <p className="text-xs text-red-500">{errors.image?.message}</p>
                  </div>

                  {isError && <ErrorBox error={getErrors(error!)} />}
                  {isSuccess && <SuccessBox message={data?.text || ''} />}

                  <Button variant="primary" text="Submit" isLoading={isLoading} className="my-2 mt-3 w-32 mx-auto lg:ms-0" />
               </form>
            ) : (
               <ErrorBox error={getErrors(bookError!)} />
            )}


         </div>
      </div>
   );
};

export default DashEditBook;