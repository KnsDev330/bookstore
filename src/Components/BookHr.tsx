import { FC } from "react";
import { IBook } from "../Types/Book";
import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";

interface Props {
   book: IBook;
}

const BookHr: FC<Props> = ({ book }): JSX.Element => {
   return (
      <div className="flex gap-5 book">
         <div className="book-image w-[190px] h-[266px] rounded-xl overflow-hidden">
            <img
               className="w-full h-full"
               src={book.image} alt={book.title}
            />
         </div>
         <div className="book-details flex flex-col gap-2">
            <h3>{book.title}</h3>
            <div className="book-rating">
               <Rating
                  fractions={5}
                  initialRating={book.rating}
                  readonly={true}
                  emptySymbol={<BsStar className='fill-rating' />}
                  fullSymbol={<BsStarFill className="fill-rating" />}
               />
               {book.rating}
            </div>
         </div>
      </div>
   );
};

export default BookHr;