import { useState } from "react";

/* TODO: make genres dynamic */
const useGenres = (): { genres: string[] } => {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [genres, _setGenres] = useState<string[]>([
      'Romance',
      'Horror',
      'Historical Fiction',
      'Adventure',
      'Fiction',
      'Philosophical Fiction',
      'Fantasy'
   ]);

   return { genres };
}

export default useGenres;