import { useEffect, useState } from "react";
import { IBook } from "../interfaces/interfaces";

const useAuthors = (books: IBook[]): { authors: string[] } => {
   const [authors, setAuthors] = useState<string[]>([]);

   useEffect(() => {
      const uniqueAuthors = books.reduce((unique: string[], book) => {
         if (!unique.includes(book.author)) unique.push(book.author);
         return unique;
      }, []);
      setAuthors(uniqueAuthors);
   }, [books]);

   return { authors };
}

export default useAuthors;