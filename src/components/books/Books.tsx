import { useEffect, useState } from "react";
import BookHr from "../BookHr";
import { useGetAllBooksQuery } from "../../redux/api/bookApi";
import { IBook } from "../../interfaces/interfaces";
import ErrorBox from "../shared/ErrorBox";
import { getErrors } from "../../utils/Utils";
import Shimmer from "../components/shimmer";
import { Slider } from "@mui/material";
import useGenres from "../../hooks/useGenres";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { changeMobileSearchTerm, changeSearchTerm } from "../../redux/features/bookSlice";
import Pagination from "../components/Pagination";
import { HiChevronDown } from 'react-icons/hi'

const Books = () => {
   const dispatch = useAppDispatch();

   // states
   const { searchTerm, mobileSearchTerm } = useAppSelector(state => state.book);
   useEffect(() => void dispatch(changeSearchTerm('')), [dispatch]);

   // if mobile search is present, set it to search term and clear it
   useEffect(() => {
      if (mobileSearchTerm) {
         dispatch(changeSearchTerm(mobileSearchTerm));
         dispatch(changeMobileSearchTerm(''));
      }
   }, [dispatch, mobileSearchTerm]);

   const [genre, setGenre] = useState<string | undefined>();
   const [dateRange, setDateRange] = useState<[number, number]>([1950, 2023])
   const [limit, setLimit] = useState<number>(10);
   const [page, setPage] = useState<number>(1);
   const [sortBy, setSortBy] = useState<'createdAt'>('createdAt');
   const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
   const { data, isError, error, isFetching } = useGetAllBooksQuery({ limit, sortBy, sortOrder, page, searchTerm, genre, dateRange: `${dateRange[0]}-${dateRange[1]}` }, { refetchOnFocus: true, refetchOnMountOrArgChange: true });
   const { genres } = useGenres();

   // handle sorting
   const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value.split("-");
      setSortBy(val[0] as "createdAt");
      setSortOrder(val[1] as 'desc' | 'asc');
   }

   // handle date range change
   const [value, setValue] = useState<number[]>(dateRange);
   const [oldTimer, setOldTimer] = useState<number | undefined>();
   useEffect(() => {
      clearTimeout(oldTimer);
      const newTimer = setTimeout(() => setDateRange(value as [number, number]), 700);
      setOldTimer(newTimer);
      return () => clearTimeout(newTimer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value]);

   // show hide filters
   const [showFilters, setShowFilters] = useState<boolean>(false);

   const handleChange = (_e: Event, newValue: number | number[]) => setValue(newValue as number[]);
   return (
      <div className="flex flex-col mb-10 mt-5 bg-white">
         <div className="flex flex-col mb-5">
            {
               data?.data && (
                  <div>
                     <div className="filters-container flex flex-col gap-2">

                        {searchTerm &&
                           <span className={`inline-block bg-gray-100 border border-gray-200 w-fit mt-2 px-4 py-1 rounded-full`}>
                              {searchTerm}
                              <span className="text-gray-400 ms-3 cursor-pointer" onClick={() => dispatch(changeSearchTerm(''))}>X</span>
                           </span>
                        }
                        <small className={`cursor-pointer mt-1 flex gap-2 items-center underline`} onClick={() => setShowFilters(!showFilters)}>
                           {showFilters ? 'Hide' : 'Show'} Filters
                           <HiChevronDown className={`text-2xl mb-1 duration-300 ${showFilters ? 'rotate-[0deg]' : 'rotate-[-90deg]'}`} />
                        </small>
                        {
                           showFilters && <>
                              <div className="flex flex-col md:flex-row gap-2 md:gap-10 items-start md:items-center">
                                 <div className="genres flex items-center gap-2">
                                    {!genre ? (
                                       <>
                                          <small className="w-12 md:w-auto">Genre:</small>
                                          <select className="bg-white border border-gray-200 outline-none" value='select'
                                             onChange={(e) => setGenre(e.target.value)}
                                          >
                                             <option value="select" disabled>Select ...</option>
                                             {genres.map(genre => <option value={genre} key={genre}>{genre}</option>)}
                                          </select>
                                       </>
                                    ) : (
                                       <div className="bg-gray-100 border border-gray-200 gap-2 rounded-full text-gray-600 flex items-center px-2 py-1">
                                          {genre} <span className="text-lighter -mb-[1px] cursor-pointer" onClick={() => setGenre(undefined)}>X</span>
                                       </div>
                                    )}
                                 </div>
                                 <div className="sort-container">
                                    <div className="genres flex items-center gap-2">
                                       <small className="w-12 md:w-auto">Sort:</small>
                                       <select className="bg-white border border-gray-200 outline-none" value={`${sortBy}-${sortOrder}`}
                                          onChange={handleSort}
                                       >
                                          <option value="select" disabled>Select ...</option>
                                          <option value='createdAt-desc'>Time - New &gt; Old</option>
                                          <option value='createdAt-asc'>Time - Old &gt; New</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <small className="released w-full max-w-[500px]">
                                 <p>Released Year</p>
                                 <Slider
                                    value={value}
                                    onChange={handleChange}
                                    step={1}
                                    min={1950}
                                    max={2023}
                                    valueLabelDisplay="auto"
                                    className="w-10"
                                 />
                              </small>
                           </>
                        }
                     </div>
                  </div>
               )
            }
         </div>
         <div className="books grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-4 md:gap-y-8">
            {
               isFetching ? (
                  <>
                     <Shimmer /><Shimmer /><Shimmer />
                  </>
               ) : (
                  isError ? (
                     <ErrorBox error={getErrors(error)} />
                  ) : (
                     <>
                        {(data?.data as IBook[] || []).map((book: IBook) => <BookHr key={book._id} book={book} />)}
                     </>
                  )
               )
            }
         </div>

         <Pagination utils={{ page: data?.meta.page, limit: data?.meta.limit, pages: data?.meta.pages, setLimit, setPage }} />
      </div>
   );
};

export default Books;