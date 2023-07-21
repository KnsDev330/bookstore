import { IServerResponse } from "../features/interfaces";
import { apiApi } from "./apiApi";

export const bookApi = apiApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllBooks: builder.query<IServerResponse, void>({
         query: () => ({
            url: `/books`,
            method: `GET`
         })
      })
   }),
});

export const {
   useGetAllBooksQuery
} = bookApi;