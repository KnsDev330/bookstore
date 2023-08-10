import { useEffect, useState } from "react";
import { IBook } from "../interfaces/interfaces";

const useGenres = (books: IBook[]): { genres: string[] } => {
   const [genres, setGenres] = useState<string[]>([]);

   useEffect(() => {
      const uniqueGenres = books.reduce((unique: string[], book) => {
         if (!unique.includes(book.genre)) unique.push(book.genre);
         return unique;
      }, []);
      setGenres(uniqueGenres);
   }, [books]);

   return { genres };
}

export default useGenres;