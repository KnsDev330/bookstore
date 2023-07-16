import { FC } from "react";
import { IBook } from "../Types/Book";
import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { VscEye } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";

interface Props {
   book: IBook;
}

const BookHr: FC<Props> = ({ book }): JSX.Element => {
   const cls = 'cursor-pointer hover:bg-primary hover:fill-white bg-white rounded-full text-4xl p-[7px] relative -right-20';

   return (
      <div className="flex gap-5 book">
         <div className="overflow-hidden group relative">
            <Link to={`/books/${book._id}`} className="">
               <img
                  className="w-[140px] md:w-[190px] aspect-[3/4] rounded-xl h-full group-hover:scale-110 duration-300"
                  src={book.image} alt={book.title} title='Show Details'
               />
            </Link>
            <div className="view-like-add-container absolute bottom-2 right-2 flex flex-col gap-2 drop-shadow-lg">
               <AiOutlineHeart className={`${cls} group-hover:right-0 duration-[200ms]`} title='Add to Read List' />
               <VscEye className={`${cls} group-hover:right-0 duration-[300ms]`} title='Show Details' />
               <CiEdit className={`${cls} group-hover:right-0 duration-[400ms]`} title='Edit' />
            </div>
         </div>
         <div className="details flex flex-col gap-2 w-1/2">
            <h3 className="title font-medium hover:underline hover:text-blue-600"><Link to={`/books/${book._id}`}>{book.title}</Link></h3>
            <div className="rating flex gap-3 text-xs sm:text-sm">
               <Rating
                  fractions={10}
                  initialRating={book.rating}
                  readonly={true}
                  emptySymbol={<BsStar className='fill-rating' />}
                  fullSymbol={<BsStarFill className="fill-rating" />}
               />
               {book.rating}
            </div>
            <h3 className="author text-lighter text-xs hover:underline hover:text-blue-600"><Link to={`/search/author/${book.author}`}>{book.author}</Link></h3>
            <div className="price-container flex gap-2 items-center">
               <h2 className={`price text-xl text-primary font-bold ${book.oldPrice ? 'text-green-600' : ''}`}>${book.price}</h2>
               <h2 className={`old-price text-sm  font-bold line-through ${!book.oldPrice ? 'hidden' : 'text-primary'}`}>${book.oldPrice}</h2>
            </div>
         </div>
      </div>
   );
};

export default BookHr;