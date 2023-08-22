import { IReviewResponse, IReviewsResponse } from "../../interfaces/ServerResponse";
import { IPostReviewPayload } from "../../interfaces/interfaces";
import { IQuery } from "../features/interfaces";
import { apiApi } from "./apiApi";

export const reviewsApi = apiApi.injectEndpoints({
   endpoints: (builder) => ({

      getReviewById: builder.query<IReviewResponse, { id: string }>({
         query: ({ id }) => ({
            url: `/reviews?id=${id}`,
            method: `GET`
         })
      }),

      getAllReviews: builder.query<IReviewsResponse, { bookId?: string } & IQuery>({
         query: ({ limit, page, sortBy, sortOrder, bookId }) => ({
            url: `/reviews?limit=${limit || 10}&page=${page || 1}&sortBy=${sortBy || 'createdAt'}&sortOrder=${sortOrder || 'desc'}${bookId ? `&bookId=${bookId}` : ``}`,
            method: `GET`
         })
      }),

      createReview: builder.mutation<IReviewResponse, IPostReviewPayload>({
         query: (data) => ({
            url: '/reviews',
            method: 'POST',
            body: data,
            headers: { authorization: localStorage.getItem(`jwt`) as string }
         })
      }),

   }),
});

export const {
   useGetReviewByIdQuery,
   useGetAllReviewsQuery,
   useCreateReviewMutation
} = reviewsApi;