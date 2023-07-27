import { FC } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { VscEye } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { IBook } from "../interfaces/interfaces";

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
                  src={`https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/33.jpg`} alt={book.title} title='Show Details'
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
            <h3 className="author text-lighter text-xs hover:underline hover:text-blue-600"><Link to={`/search/author/${book.author}`}>{book.author}</Link></h3>
         </div>
      </div>
   );
};

export default BookHr;