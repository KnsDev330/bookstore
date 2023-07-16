import { Link } from "react-router-dom";
import HorizontalLine from "../Shared/HorizontalLine";
import Button from "../Button";
import { BiChevronRight } from "react-icons/bi";
import { useState } from "react";
import { IBook } from "../../Types/Book";
import booksList from "../../Utils/DummyData/books";
import BookHr from "../BookHr";

const BestSellers = () => {
   const [books] = useState<IBook[]>(booksList);

   return (
      <>
         <div className="flex w-full justify-between items-center gap-10 my-10">
            <h1 className="font-heading text-heading">Best Sellers</h1>
            <HorizontalLine className="flex-grow" />
            <Link to='/best-sellers'><Button text='View All' variant='primary' iconRight={<BiChevronRight class="text-xl" />} /></Link>
         </div>
         <div className="books grid grid-cols-2 gap-5">
            {books.map((book: IBook) => <BookHr key={book.title} book={book} />)}
         </div>
      </>
   );
};

export default BestSellers;