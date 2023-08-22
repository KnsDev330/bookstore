import { useForm } from "react-hook-form";
import ErrorBox from "../../components/shared/ErrorBox";
import { useAppSelector } from "../../redux/hook";
import { useCreateReviewMutation } from "../../redux/api/reviewsApi";
import { IPostReviewPayload } from "../../interfaces/interfaces";
import { useEffect, useState } from "react";
import { getErrors } from "../../utils/Utils";
import SuccessBox from "../../components/shared/SuccessBox";
import Button from "../../components/Button";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import { bookApi } from "../../redux/api/bookApi";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { IBookResponse } from "../../interfaces/ServerResponse";

interface Props {
   className: string;
   bookId: string;
   refetch: () => QueryActionCreatorResult<QueryDefinition<{
      id: string;
   }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, unknown, FetchBaseQueryMeta>, "reviews", IBookResponse, "api">>;
}

const WriteReview = ({ className, bookId, refetch }: Props) => {
   const cls = `bg-inherit border border-gray-200 focus:border-primary rounded outline-none duration-300 px-2 py-1 w-full opacity`;
   const { user } = useAppSelector(state => state.user);
   const [postReview, { isLoading, isError, error, isSuccess, data }] = useCreateReviewMutation();
   const { setValue, register, handleSubmit, formState: { errors }, reset } = useForm<IPostReviewPayload>();

   const onSubmit = (data: IPostReviewPayload) => {
      data.bookId = bookId;
      void postReview({ ...data, rating: Number(data.rating) });
   };
   useEffect(() => {
      if (isSuccess) {
         reset();
         bookApi.util.resetApiState();
         void refetch();
      }
   }, [isSuccess, reset, refetch]);
   const [rating, setRating] = useState<number>(5);

   return (
      <div className={`${className}`}>
         <h4>Write a Review about this book!</h4>

         {
            !user ? (
               <ErrorBox error="You must be logged in to leave a review" className="inline-block" />
            ) : (
               <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 border p-2 my-5">


                  <div>
                     <p className="opacity-75">Rating</p>
                     <Rating
                        fullSymbol={<FaStar className='fill-primary leading-none text-4xl' />} emptySymbol={<FaRegStar className='fill-gray-300 text-4xl' />}
                        fractions={1} initialRating={rating}
                        onChange={(value) => { setValue('rating', value); setRating(value) }}
                     />
                     <input value={rating} {...register('rating', { required: `rating is required` })} hidden />
                     <p className="text-xs text-red-500">{errors.rating?.message}</p>
                  </div>

                  <div>
                     <p className="opacity-75">Comment</p>
                     <textarea className={`${cls}`} {...register('comment', { required: `comment is required` })} placeholder="Enter a comment" />
                     <p className="text-xs text-red-500">{errors.comment?.message}</p>
                  </div>

                  {isError && <ErrorBox error={getErrors(error!)} />}
                  {isSuccess && <SuccessBox message={data?.text || ''} className="!mt-0" />}

                  <Button variant="primary" text="Submit" isLoading={isLoading} className="my-2 mt-3 w-32 mx-auto lg:ms-0" />

               </form>
            )
         }
      </div>
   );
};

export default WriteReview;