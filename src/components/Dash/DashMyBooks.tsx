/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useState } from "react";
import { useGetMyAllBooksQuery } from "../../redux/api/bookApi";
import { getErrors } from "../../utils/Utils";
import BookHr from "../BookHr";
import ErrorBox from "../shared/ErrorBox";
import Pagination from "../components/Pagination";
import Shimmer from "../components/shimmer";
import { IBook } from "../../interfaces/interfaces";
import SortBy from "../components/SortBy";
import { ESortOrder } from "../../redux/features/interfaces";
import SuccessBox from "../shared/SuccessBox";

const DashMyBooks = () => {
   const [page, setPage] = useState<number>(1);
   const [limit, setLimit] = useState<number>(3);
   const [sortBy, setSortBy] = useState<string>('createdAt');
   const [sortOrder, setSortOrder] = useState<ESortOrder>(ESortOrder.desc);
   const { data, isError, error, isFetching, isSuccess } = useGetMyAllBooksQuery({ page, limit, sortBy, sortOrder }, { refetchOnFocus: true, refetchOnMountOrArgChange: true });

   const [books, setBooks] = useState<IBook[]>([]);
   useEffect(() => setBooks(data?.data ? data.data : []), [data]);
   useEffect(() => void isFetching && setBooks([]), [isFetching]);

   if (isFetching) return <div className="flex flex-wrap gap-5 p-5 h-[325px] mx-auto">{[...Array(5)].map((_e, i) => <Shimmer key={i} />)}</div>
   return (
      <div className="shdow-lg w-full max-w-[90%] my-5 md:px-5 pb-5 pt-0 rounded-lg mx-auto lg:ms-0">
         <div className="texts mb-5">
            <h2 className="text-xl font-medium">Your Books</h2>
            <p className="text-sm">You can find the books you have added here</p>
         </div>
         {
            isError ? (
               <ErrorBox error={getErrors(error)} />
            ) : (
               <>
                  <SortBy utils={{ sortBy, sortOrder, setSortBy, setSortOrder }} className="mb-3" />
                  {isSuccess && data.data.length === 0 && <SuccessBox message="No books found" />}
                  <div className="flex gap-5 justify-start flex-wrap">
                     {books.map(book => <BookHr book={book} key={book._id} showEdit />)}
                  </div>
                  <Pagination utils={{ pages: data?.meta.pages, page, limit, setLimit, setPage }} />
               </>
            )
         }
      </div>
   );
};

export default DashMyBooks;