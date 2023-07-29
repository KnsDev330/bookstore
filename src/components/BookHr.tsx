import { FC } from "react";
import { Link } from "react-router-dom";
import { VscEye } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IBook } from "../interfaces/interfaces";
import Rating from "react-rating";
import { BiBookBookmark } from "react-icons/bi";

interface Props {
   className?: string;
   book: IBook;
   showEdit?: boolean;
}

const BookHr: FC<Props> = ({ book, showEdit, className }): JSX.Element => {
   const cls = 'cursor-pointer hover:bg-primary hover:fill-white bg-white rounded-full text-4xl p-[7px] relative -right-20 group-hover:right-0';

   return (
      <div className={`${className || ''} flex gap-3 book bg-white rounded-xl overflow-hidden w-full max-w-[390px]`}>
         <div className="overflow-hidden group relative">
            <Link to={`/books/${book._id}`} className="">
               <img
                  className="w-[140px] md:w-[190px] aspect-[3/4] rounded-s-xl h-full group-hover:scale-110 duration-300"
                  src={book.image} alt={book.title} title='Show Details'
               />
            </Link>
            <div className="view-like-add-container absolute bottom-2 right-2 flex flex-col gap-2 drop-shadow-lg">
               <BiBookBookmark className={`${cls} duration-[200ms] `} title='Add to Read List' />
               <VscEye className={`${cls} duration-[300ms]`} title='Show Details' />
               {showEdit && <CiEdit className={`${cls} duration-[400ms]`} title='Edit' />}
            </div>
         </div>
         <div className="details flex flex-col gap-2 w-1/2 me-3 mt-2">
            <h3 className="title font-medium"><Link className="hover:underline hover:text-blue-600" title={book.title} to={`/books/${book._id}`}>{book.title}</Link></h3>
            <h3 className="author text-lighter text-xs"><Link className="hover:underline hover:text-blue-600" title={book.author} to={`/search/author/${book.author}`}>{book.author}</Link></h3>
            <div className="flex items-start flex-col leading-none" title="rating">
               <Rating readonly fullSymbol={<FaStar className='fill-primary text-xl leading-none' />} emptySymbol={<FaRegStar className='fill-gray-300 text-xl' />} fractions={10} initialRating={book.rating} />
               <p className="opacity-60 text-sm leading-none" title="reviews">({book.reviews || 'no'} reviews)</p>
            </div>
         </div>
      </div>
   );
};

export default BookHr;