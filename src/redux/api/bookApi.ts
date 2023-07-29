import { IBooksResponse, IServerResponse } from "../../interfaces/ServerResponse";
import { IAddBookInput } from "../../interfaces/interfaces";
import { apiApi } from "./apiApi";

export const bookApi = apiApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllBooks: builder.query<IServerResponse, void>({
         query: () => ({
            url: `/books`,
            method: `GET`
         })
      }),

      getMyAllBooks: builder.query<IBooksResponse, { limit?: number, page?: number }>({
         query: ({ limit, page }) => ({
            url: `/books/my?limit=${limit || 10}&page=${page || 1}`,
            method: `GET`,
            headers: { authorization: localStorage.getItem('jwt') || '' },
         })
      }),

      createBook: builder.mutation<IServerResponse, any>({
         query: (data: IAddBookInput) => ({
            url: '/books',
            method: 'POST',
            body: data,
            headers: { authorization: localStorage.getItem(`jwt`) as string }
         })
      })
   }),
});

export const {
   useGetAllBooksQuery,
   useGetMyAllBooksQuery,
   useCreateBookMutation
} = bookApi;