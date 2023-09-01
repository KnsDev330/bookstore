import { IBookResponse, IBooksResponse, IServerResponse } from "../../interfaces/ServerResponse";
import { IAddBookInput } from "../../interfaces/interfaces";
import { IQuery } from "../features/interfaces";
import { apiApi } from "./apiApi";

export const bookApi = apiApi.injectEndpoints({
   endpoints: (builder) => ({

      getBookById: builder.query<IBookResponse, { id: string }>({
         query: ({ id }) => ({
            url: `/books/${id}`,
            method: `GET`
         })
      }),

      getAllBooks: builder.query<IBooksResponse, { searchTerm?: string, genre?: string, dateRange: string } & IQuery>({
         query: ({ limit, page, sortBy, sortOrder, genre, dateRange, searchTerm }) => ({
            url: `/books?limit=${limit || 10}&page=${page || 1}&sortBy=${sortBy || 'createdAt'}&sortOrder=${sortOrder || 'desc'}${genre ? `&genre=${genre}` : ``}${searchTerm ? `&searchTerm=${searchTerm}` : ``}&dateRange=${dateRange}`,
            method: `GET`
         })
      }),

      getMyAllBooks: builder.query<IBooksResponse, IQuery>({
         query: ({ limit, page, sortBy, sortOrder }) => ({
            url: `/books/my?limit=${limit || 10}&page=${page || 1}&sortBy=${sortBy || 'createdAt'}&sortOrder=${sortOrder || 'desc'}`,
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
      }),

      updateBook: builder.mutation<IBookResponse, { id: string, data: IAddBookInput }>({
         query: ({ id, data }) => ({
            url: `/books/${id}`,
            method: 'PATCH',
            body: data,
            headers: { authorization: localStorage.getItem(`jwt`) as string }
         })
      }),

      deleteBook: builder.mutation<IBookResponse, { id: string }>({
         query: ({ id }) => ({
            url: `/books/${id}`,
            method: 'DELETE',
            headers: { authorization: localStorage.getItem(`jwt`) as string }
         })
      }),

   }),
});

export const {
   useGetBookByIdQuery,
   useGetAllBooksQuery,
   useGetMyAllBooksQuery,
   useCreateBookMutation,
   useUpdateBookMutation,
   useDeleteBookMutation
} = bookApi;