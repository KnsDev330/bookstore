import { IServerResponse } from "../../interfaces/ServerResponse";
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
   useCreateBookMutation
} = bookApi;