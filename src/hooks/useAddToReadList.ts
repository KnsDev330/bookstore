/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useEffect } from "react";
import { useCreateReadMutation } from "../redux/api/readApi";
import { toast } from "react-toastify";

const useAddToReadList = () => {
   const [postRead, { isError: READ_isError, isSuccess: READ_isSuccess, isLoading: READ_isLoading, error: READ_error, data: READ_data }] = useCreateReadMutation();
   const addToReadList = (bookId: string) => void postRead({ bookId });
   useEffect(() => {
      if (READ_isError) {
         toast.error((READ_error as any)?.data?.errors?.[0]?.message || 'Could not add to readlist');
         return;
      }
      if (READ_isSuccess) {
         toast.success(READ_data?.text || `Book added to readlist`);
         return;
      }
   }, [READ_error, READ_isSuccess, READ_isError, READ_data]);

   return { addToReadList, READ_isSuccess, READ_data, READ_error, READ_isError, READ_isLoading }
};

export default useAddToReadList;