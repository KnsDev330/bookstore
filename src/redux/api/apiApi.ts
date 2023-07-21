import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { SERVER_URL } from "../../config";

export const apiApi = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
   tagTypes: ['reviews'],
   endpoints: () => ({}),
});