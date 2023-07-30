import { IReadResponse, IReadsResponse } from "../../interfaces/ServerResponse";
import { EReadStates } from "../../interfaces/enums";
import { IReadListAllQuery } from "../features/interfaces";
import { apiApi } from "./apiApi";

export const readApi = apiApi.injectEndpoints({
   endpoints: (builder) => ({

      getReadById: builder.query<IReadResponse, { id: string }>({
         query: ({ id }) => ({
            url: `/reads/${id}`,
            method: `GET`,
            headers: { authorization: localStorage.getItem(`jwt`) as string }
         })
      }),

      getAllReads: builder.query<IReadsResponse, IReadListAllQuery>({
         query: ({ limit, page, sortBy, sortOrder, state }) => ({
            url: `/reads?limit=${limit || 25}&page=${page || 1}&sortBy=${sortBy || 'createdAt'}&sortOrder=${sortOrder || 'desc'}${state ? `&state=${state}` : ''}`,
            method: `GET`,
            headers: { authorization: localStorage.getItem(`jwt`) as string }
         })
      }),

      createRead: builder.mutation<IReadResponse, { bookId: string }>({
         query: (data) => ({
            url: '/reads',
            method: 'POST',
            body: data,
            headers: { authorization: localStorage.getItem(`jwt`) as string }
         })
      }),

      updateRead: builder.mutation<IReadResponse, { id: string, state: EReadStates }>({
         query: ({ id, state }) => ({
            url: `/reads/${id}`,
            method: 'PATCH',
            body: { state },
            headers: { authorization: localStorage.getItem(`jwt`) as string }
         })
      }),

   }),
});

export const {
   useGetReadByIdQuery,
   useGetAllReadsQuery,
   useCreateReadMutation,
   useUpdateReadMutation
} = readApi;