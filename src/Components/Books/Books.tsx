import { Link, useNavigate } from "react-router-dom";
import HorizontalLine from "../Shared/HorizontalLine";
import Button from "../Button";
import { BiChevronRight } from "react-icons/bi";
import { useState } from "react";
import { IBook } from "../../Types/Book";
import booksList from "../../Utils/DummyData/books";
import BookHr from "../BookHr";

const Books = () => {
   const [books] = useState<IBook[]>(booksList);
   const navigate = useNavigate();

   return (
      <div className="flex flex-col my-10 mcontainer bg-white">
         <div className="flex flex-col mb-10">
            <div className="flex w-full justify-between items-center gap-10">
               <h1 className="font-heading text-heading">New Listings</h1>
               <HorizontalLine className="flex-grow" />
               <Link to='/best-sellers'><Button text='View All' variant='primary' iconRight={<BiChevronRight class="text-xl" />} /></Link>
            </div>
            <div>
               <h2>Filters:</h2>
               <div className="filters-container">
                  <div className="author">
                     <select onChange={(e) => navigate(e.target.value)}></select>
                  </div>
               </div>
            </div>
         </div>
         <div className="books grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-8">
            {books.map((book: IBook) => <BookHr key={book.title} book={book} />)}
         </div>
      </div>
   );
};

export default Books;