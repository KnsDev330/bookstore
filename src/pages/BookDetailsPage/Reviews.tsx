import { useEffect } from "react";
import ErrorBox from "../../components/shared/ErrorBox";
import { useGetAllReviewsQuery } from "../../redux/api/reviewsApi";
import { getErrors } from "../../utils/Utils";
import Review from "./Review";


const Reviews = ({ className, bookId }: { className: string, bookId: string }) => {

   const { data, isError, isSuccess, error, refetch } = useGetAllReviewsQuery({ bookId }, { refetchOnFocus: true, refetchOnMountOrArgChange: true });
   useEffect(() => void refetch(), [refetch]);

   if (isError) return <ErrorBox error={getErrors(error)} />;
   if (!isSuccess) return <ErrorBox error="Could not load reviews" />;
   return (
      <div className={`${className}`}>
         <h4>Read what others have to say about this book</h4>
         <div className="reviews flex flex-col gap-5 mt-5">
            {data.data.map(review => <Review review={review} key={review._id} />)}
         </div>
      </div>
   );
};

export default Reviews;