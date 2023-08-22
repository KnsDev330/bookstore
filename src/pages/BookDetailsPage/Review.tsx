import Rating from "react-rating";
import { IReview } from "../../interfaces/interfaces";
import { FaRegStar, FaStar } from "react-icons/fa";
import { convertDate } from "../../utils/Utils";

const Review = ({ review }: { review: IReview }) => {
   return (
      <div className="flex flex-col gap-3 px-4 py-2 border border-gray-200 rounded">
         <div className="flex gap-5">
            <img src={review.userDp} alt={review.userName} className="user_image rounded-full border w-16 h-16 border-gray-200" draggable={false} />
            <div className="md:flex justify-between w-full">
               <div className="flex flex-col md:gap-2">
                  <h3 className="user_name">{review.userName}</h3>
                  <div className="flex items-center gap-3">
                     <p>{review.rating}.0</p>
                     <Rating readonly
                        fullSymbol={<FaStar className='fill-primary text-xl leading-none' />}
                        emptySymbol={<FaRegStar className='fill-gray-300 text-xl' />} fractions={10} initialRating={review.rating}
                     />
                  </div>
               </div>
               <div className="ms-auto">
                  <p className="text-gray-500 text-sm">{convertDate(review.createdAt)}</p>
               </div>
            </div>
         </div>
         <div>
            {review.comment}
         </div>
      </div>
   );
};

export default Review;