/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetBookByIdQuery } from "../../redux/api/bookApi";
import ErrorBox from "../../components/shared/ErrorBox";
import { getErrors } from "../../utils/Utils";
import Loading from "./Loading";
import Layout from "./Layout";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { LuEdit } from "react-icons/lu";
import HorizontalLine from "../../components/shared/HorizontalLine";
import { BsBookmarkCheckFill, BsFacebook, BsPinterest } from "react-icons/bs";
import { Button } from "@mui/material";
import { AiFillTwitterCircle } from "react-icons/ai";
import WriteReview from "./WriteReview";
import Reviews from "./Reviews";
import useAddToReadList from "../../hooks/useAddToReadList";
import { useAppSelector } from "../../redux/hook";
import useIsDisabled from "../../hooks/useIsDisabled";

const BookDetailsPage = () => {

   // STATES
   const { user } = useAppSelector(state => state.user);
   // STATES

   const { id } = useParams();
   useEffect(() => console.log('id', id), [id]);
   const [curretTab, setCurrentTab] = useState<'reviews' | 'writeReview'>('reviews');

   const { data, isFetching, isError, isSuccess, error, refetch } = useGetBookByIdQuery({ id: id! }, { refetchOnMountOrArgChange: false, refetchOnFocus: true });

   // handle add to readlist
   const { addToReadList, READ_isLoading } = useAddToReadList();

   // handle button disabling
   const editBtnDisabled = useIsDisabled(!user?._id || user._id !== data?.data.userId);

   // handle loading / error
   if (isFetching) return <Loading />;
   if (isError) return <Layout><ErrorBox error={getErrors(error)} /></Layout>;
   if (!isSuccess) return <Layout><ErrorBox error="Could not load data from server" /></Layout>;

   // common classes
   const commonCls = `inline-block rounded px-5 py-2 cursor-pointer border duration-300 select-none`;
   const cls = `${commonCls} text-gray-600 bg-white hover:bg-gray-100`;
   const activeCls = `${commonCls} text-white bg-primary`;

   return (
      <Layout>
         <div className="flex flex-col md:flex-row gap-5">
            <div className="md:w-[40%] p-4 border rounded-xl ">
               <div className="book-img overflow-hidden aspect-[4/5]">
                  <img src={data.data.image} alt={data.data.title} className="hover:scale-110 duration-300" />
               </div>
            </div>
            <div className="md:w-[60%] p-4 border rounded-xl">
               <p className="bg-green-100 text-green-500 inline-block px-2 py-[1px] text-sm">{data.data.genre}</p>
               <h2 className="text-4xl font-bold my-4">{data.data.title}</h2>
               <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  <small className="text-lighter">Author: <span className="text-accent">{data.data.author}</span></small>
                  <RxDividerVertical className="text-lighter text-xl hidden md:block" />
                  <div className="flex items-center gap-2  leading-none" title="rating">
                     <Rating readonly
                        fullSymbol={<FaStar className='fill-primary text-xl leading-none' />}
                        emptySymbol={<FaRegStar className='fill-gray-300 text-xl' />} fractions={10} initialRating={data.data.rating}
                     />
                     {data.data.rating.toFixed(1)}
                     <p className="opacity-60 text-sm leading-none" title="reviews">({data.data.reviews || 'no'} reviews)</p>
                  </div>
               </div>
               <HorizontalLine className="my-4" />
               <div>
                  <p className="font-light mb-4">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio hic ratione quasi, numquam nulla quis optio, molestias, unde expedita veritatis similique? Quam at pariatur in dolor accusantium consectetur quaerat sapiente!
                  </p>
                  <div className="flex gap-4">
                     <Button
                        variant="contained" startIcon={<BsBookmarkCheckFill />}
                        disabled={READ_isLoading} onClick={() => addToReadList(id!)}
                        className="ctt"
                     >
                        <span className="cttt">{!user?._id ? 'you need to be logged in' : 'add the book to your read list'}</span>
                        {READ_isLoading ? `Please Wait...` : `Add to Read List`}
                     </Button>
                     <div className="ctt">
                        <span className="cttt">{
                           !user?._id ? (
                              'you need to be logged in to edit'
                           ) : (
                              user._id !== data.data.userId ? (
                                 'you can edit your added books only'
                              ) : (
                                 'edit the book details'
                              )
                           )
                        }</span>
                        <Button variant="outlined" startIcon={<LuEdit />} disabled={editBtnDisabled} className="ctt">
                           Edit
                        </Button>

                     </div>
                  </div>
               </div>
               <HorizontalLine className="my-4" />
               <small className="text-lighter">Genre: <span className="text-accent">{data.data.genre}</span></small>
               <div className="share-container">
                  <small className="text-lighter">Share the book with friends:</small>
                  <div className="my-2 gap-3 flex items-center">
                     <Link to={`https://www.facebook.com/sharer.php?u=${window.location.href}&display=page`} target="_blank" className="group">
                        <BsFacebook className="text-lighter group-hover:text-facebook duration-300 w-[40px] h-[40px]" />
                     </Link>
                     <Link to={`https://twitter.com/home?status=${window.location.href}`} target="_blank" className="group">
                        <AiFillTwitterCircle className="text-lighter group-hover:text-twitter duration-300 w-[46px] h-[46px]" />
                     </Link>
                     <Link to={`https://pinterest.com/pin/create/button/?url=${window.location.href}&description=${data.data.title}`} target="_blank" className="group">
                        <BsPinterest className="text-lighter group-hover:text-pinterest duration-300 w-[40px] h-[40px]" />
                     </Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="my-10">
            <div className="flex gap-3 mb-5">
               <div onClick={() => setCurrentTab('reviews')} className={curretTab === 'reviews' ? activeCls : cls}>Reviews ({data.data.reviews})</div>
               <div onClick={() => setCurrentTab('writeReview')} className={curretTab === 'writeReview' ? activeCls : cls}>Write Review</div>
            </div>
            <Reviews bookId={id!} className={`${curretTab === 'reviews' ? `` : `hidden`}`} />
            <WriteReview bookId={id!} refetch={refetch} className={`${curretTab === 'writeReview' ? `` : `hidden`}`} />
         </div>
      </Layout>
   );
};

export default BookDetailsPage;