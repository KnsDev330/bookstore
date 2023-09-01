/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscEye } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IBook } from "../interfaces/interfaces";
import Rating from "react-rating";
import { BiBookBookmark } from "react-icons/bi";
import { useCreateReadMutation } from "../redux/api/readApi";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

interface Props {
   className?: string;
   book: IBook;
   showEdit?: boolean;
}

const BookHr: FC<Props> = ({ book, showEdit, className }): JSX.Element => {
   const navigate = useNavigate();
   const cls = 'cursor-pointer hover:bg-primary hover:fill-white bg-white rounded-full text-4xl p-[7px] relative -right-20 group-hover:right-0';

   // handle add to readlist
   const createRead = () => void postRead({ bookId: book._id });
   const [postRead, { isError, isSuccess, isLoading, error, data }] = useCreateReadMutation();
   useEffect(() => {
      if (isError) {
         toast.error((error as any)?.data?.errors?.[0]?.message || 'Could not add to readlist');
         return;
      }
      if (isSuccess) {
         toast.success(data?.text || `Book added to readlist`);
         return;
      }
   }, [error, isSuccess, isError, data]);


   return (
      <div className={`${className || ''} flex gap-3 book bg-white rounded-xl overflow-hidden w-full max-w-[390px] border`}>
         <div className="overflow-hidden group relative w-[45%]">
            <Link to={`/books/${book._id}`} className="">
               <img draggable={false}
                  className="w-[140px] md:w-[190px] aspect-[3/4] rounded-s-xl h-full group-hover:scale-110 duration-300"
                  src={book.image} alt={book.title} title='Show Details'
               />
            </Link>
            <div className="view-like-add-container absolute bottom-2 right-2 flex flex-col gap-2 drop-shadow-lg">

               {isLoading ? <BeatLoader color="#fff" speedMultiplier={0.7} size={'5px'} className={`${cls} duration-[200ms]`} /> :
                  <BiBookBookmark className={`${cls} duration-[200ms] ${isLoading ? 'cursor-not-allowed' : ''}`} title='Add to Read List' onClick={createRead} />
               }

               <VscEye className={`${cls} duration-[300ms]`} title='Show Details' onClick={() => navigate(`/books/${book._id}`)} />
               {showEdit && <Link to={book._id}><CiEdit className={`${cls} duration-[400ms]`} title='Edit' /></Link>}
            </div>
         </div>
         <div className="details flex flex-col gap-1 w-1/2 me-3 py-3 w-[55%]">
            <h3 className="title font-medium">
               <Link to={`/books/${book._id}`} className="hover:underline">
                  <p title='book title'>{book.title}</p>
               </Link>
            </h3>
            <h3 className="author text-lighter text-xs">
               <p title='book author'>{book.author}</p>
            </h3>
            <p className="inline-block bg-green-100 text-green-600 w-fit px-3 text-sm" title='book genre'>{book.genre}</p>
            <div className="flex items-start items-center gap-2 leading-none" title="rating">
               <Rating readonly
                  fullSymbol={<FaStar className='fill-primary text-xl leading-none' />}
                  emptySymbol={<FaRegStar className='fill-gray-300 text-xl' />} fractions={10} initialRating={book.rating}
               />
               <p className="opacity-60 text-sm leading-none" title="reviews">({book.reviews || 'no'} reviews)</p>
            </div>

            <p className="book-content text-sm md:text-base text-gray-700">
               {/* TODO: add book start lines to db schema */}
               Lorem ipsum dolor sit amet consectetur, adipis...
            </p>

            <p className="text-gray-500" title='publication year'>Published: {book.publicationDate}</p>
         </div>
      </div>
   );
};

export default BookHr;