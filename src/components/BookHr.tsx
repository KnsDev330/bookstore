/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { VscEye } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IBook } from "../interfaces/interfaces";
import Rating from "react-rating";
import { BiBookBookmark } from "react-icons/bi";
import { useCreateReadMutation } from "../redux/api/readApi";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { Button } from "@mui/material";
import { BsBookmarkCheckFill } from "react-icons/bs";
import useAddToReadList from "../hooks/useAddToReadList";
import { useAppSelector } from "../redux/hook";
import { LuEdit } from "react-icons/lu";
import useIsDisabled from "../hooks/useIsDisabled";

interface Props {
   className?: string;
   book: IBook;
   showEdit?: boolean;
}

const BookHr: FC<Props> = ({ book, showEdit, className }): JSX.Element => {
   const cls = 'cursor-pointer hover:bg-primary hover:fill-white bg-white rounded-full text-4xl p-[7px] relative -right-20 group-hover:right-0';


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

   const createRead = () => {
      void postRead({ bookId: book._id });
   }

   // handle add to readlist
   const { addToReadList, READ_isLoading } = useAddToReadList();

   // states
   const user = useAppSelector(state => state.user.user);

   // handle button disabling
   const editBtnDisabled = useIsDisabled(!user?._id || user._id !== data?.data.userId);

   return (
      <div className={`${className || ''} flex gap-3 book bg-white rounded-xl overflow-hidden w-full max-w-[390px] border`}>
         <div className="overflow-hidden group relative">
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

               <VscEye className={`${cls} duration-[300ms]`} title='Show Details' />
               {showEdit && <Link to={book._id}><CiEdit className={`${cls} duration-[400ms]`} title='Edit' /></Link>}
            </div>
         </div>
         <div className="details flex flex-col gap-2 w-1/2 me-3 py-3">
            <h3 className="title font-medium">
               <p title='book title'>{book.title}</p>
            </h3>
            <h3 className="author text-lighter text-xs">
               <p title='book author'>{book.author}</p>
            </h3>
            <div className="flex items-start flex-col leading-none" title="rating">
               <Rating readonly
                  fullSymbol={<FaStar className='fill-primary text-xl leading-none' />}
                  emptySymbol={<FaRegStar className='fill-gray-300 text-xl' />} fractions={10} initialRating={book.rating}
               />
               <p className="opacity-60 text-sm leading-none" title="reviews">({book.reviews || 'no'} reviews)</p>
            </div>
            <div className="flex flex-col gap-2 mt-2">
               <div className="ctt">
                  <span className="cttt">{!user?._id ? 'login first' : 'add to read list'}</span>
                  <Button
                     variant="contained" startIcon={<BsBookmarkCheckFill />}
                     disabled={READ_isLoading || !user} onClick={() => addToReadList(book._id)}
                     className="w-full"
                  >
                     {READ_isLoading ? `Adding...` : `Add`}
                  </Button>
               </div>
               <Button variant="outlined" startIcon={<LuEdit />} disabled={editBtnDisabled} className="ctt capitalize">
                  Edit
               </Button>
            </div>
         </div>
      </div>
   );
};

export default BookHr;