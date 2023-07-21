import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook } from '../../types/Book';


export const booksApi = createApi({
   reducerPath: 'booksApi',
   baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3031/api/v1` }),
   endpoints: (builder) => ({
      getAllBooks: builder.query<IBook[], undefined>({
         query: () => `/books`,
      })
   })
});


export const {
   useGetAllBooksQuery
} = booksApi;