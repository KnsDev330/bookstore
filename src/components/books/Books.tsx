
import { Link } from "react-router-dom";
import HorizontalLine from "../shared/HorizontalLine";
import Button from "../Button";
import { BiChevronRight } from "react-icons/bi";
import { useEffect, useState } from "react";
import BookHr from "../BookHr";
import { useGetAllBooksQuery } from "../../redux/api/bookApi";
import { IBook } from "../../interfaces/interfaces";
import ErrorBox from "../shared/ErrorBox";
import { getErrors } from "../../utils/Utils";
import Shimmer from "../components/shimmer";
import { Slider } from "@mui/material";
import useGenres from "../../hooks/useGenres";

const Books = () => {

   const [genre, setGenre] = useState<string | undefined>();
   const [dateRange, setDateRange] = useState<[number, number]>([1950, 2023])
   const { data, isError, error, isFetching } = useGetAllBooksQuery({ genre, dateRange: `${dateRange[0]}-${dateRange[1]}` }, { refetchOnFocus: true, refetchOnMountOrArgChange: true });
   const { genres } = useGenres(data?.data as IBook[] || []);

   const [value, setValue] = useState<number[]>(dateRange);
   const [oldTimer, setOldTimer] = useState<number | undefined>();
   useEffect(() => {
      clearTimeout(oldTimer);
      const newTimer = setTimeout(() => {
         setDateRange(value as [number, number]);
      }, 700);
      setOldTimer(newTimer);
      return () => clearTimeout(newTimer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value]);

   const handleChange = (_e: Event, newValue: number | number[]) => {
      setValue(newValue as number[]);

   };
   return (
      <div className="flex flex-col my-10 bg-white">
         <div className="flex flex-col mb-10">
            <div className="flex w-full justify-between items-center gap-10">
               <h1 className="font-medium md:font-heading md:text-heading">New Listings</h1>
               <HorizontalLine className="flex-grow" />
               <Link to='/best-sellers'><Button text='View All' variant='primary' className="!p-3 !h-8" iconRight={<BiChevronRight className="text-xl" />} /></Link>
            </div>
            {
               data?.data && (
                  <div>
                     <small>Genre:</small>
                     <div className="filters-container flex flex-col gap-2">
                        <div className="genres flex items-center gap-2">
                           {!genre ? (
                              <select className="bg-white border border-gray-200 outline-none" value='select'
                                 onChange={(e) => setGenre(e.target.value)}
                              >
                                 <option value="select" disabled>Select ...</option>
                                 {genres.map(genres => <option value={genres} key={genres}>{genres}</option>)}
                              </select>
                           ) : (
                              <div className="bg-gray-100 border border-gray-200 gap-2 rounded-full text-gray-600 flex items-center px-2 py-1">
                                 Fiction <span className="text-lighter -mb-[1px] cursor-pointer" onClick={() => setGenre(undefined)}>X</span>
                              </div>
                           )}
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
                     </div>
                  </div>
               )
            }
         </div>
         <div className="books grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-8">
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
      </div>
   );
};

export default Books;