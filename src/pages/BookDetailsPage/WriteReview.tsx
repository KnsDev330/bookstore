import ErrorBox from "../../components/shared/ErrorBox";
import { useAppSelector } from "../../redux/hook";

const WriteReview = ({ className }: { className: string }) => {
   const { user } = useAppSelector(state => state.user);
   return (
      <div className={`${className}`}>
         <h4>Write a Review about this book!</h4>

         {
            !user && <ErrorBox error="You must be logged in to leave a review" className="inline-block" />
         }
      </div>
   );
};

export default WriteReview;