import { apiApi } from "./apiApi";

export const userApiSlice = apiApi.injectEndpoints({
   endpoints: (builder) => ({
      getProfile: builder.query({
         query: (jwt: string) => ({
            url: `/users/me`,
            method: `GET`,
            headers: { authorization: jwt },
         })
      })
   }),
});

export const {
   useGetProfileQuery
} = userApiSlice;