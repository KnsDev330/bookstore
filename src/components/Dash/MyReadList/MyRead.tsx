import { BeatLoader } from "react-spinners";
import { IRead } from "../../../interfaces/interfaces";
import { useUpdateReadMutation } from "../../../redux/api/readApi";
import { ChangeEvent, useEffect } from "react";
import { EReadStates } from "../../../interfaces/enums";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { IReadListAllQuery } from "../../../redux/features/interfaces";
import { IReadsResponse } from "../../../interfaces/ServerResponse";
import { toast } from "react-toastify";

interface Props {
   read: IRead;
   refetch: () => QueryActionCreatorResult<QueryDefinition<IReadListAllQuery, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, unknown, FetchBaseQueryMeta>, "reviews", IReadsResponse, "api">>
}

const MyRead = ({ read, refetch }: Props) => {
   const [patchRead, { isSuccess, isError, data, isLoading }] = useUpdateReadMutation();

   useEffect(() => {
      if (isError) {
         toast.error(data?.errors?.[0]?.message || `Could not update`);
         return;
      }
      if (isSuccess) {
         toast.success(data?.text || `Success`);
         void refetch();
         return;
      }
   }, [isError, isSuccess, refetch, data]);

   const updateState = (e: ChangeEvent<HTMLSelectElement>) => {
      const state = e.target.value as EReadStates;
      void patchRead({ id: read._id, state });
   }

   return <div className="flex gap-3 bg-white p-2 rounded" key={read._id}>
      <img src={read.bookId.image} className="w-20" alt="" />
      <div className="flex flex-col gap-2">
         <p>{read.bookId.title}</p>
         <small className="text-lighter">status: <strong className="font-medium text-accent">{read.state}</strong></small>
         <small>
            {!isLoading ? (
               <>
                  <span className="text-lighter">update:</span>
                  <select onChange={updateState} value={read.state} className="outline-none border border-gray-200 mx-2">
                     <option value={EReadStates.ToRead}>{EReadStates.ToRead}</option>
                     <option value={EReadStates.CurrentlyReading}>{EReadStates.CurrentlyReading}</option>
                     <option value={EReadStates.AlreadyRead}>{EReadStates.AlreadyRead}</option>
                     <option value={EReadStates.Abandoned}>{EReadStates.Abandoned}</option>
                  </select>
               </>
            ) : (
               <BeatLoader color="#36d7b7" />
            )}
         </small>
      </div>
   </div>
}

export default MyRead;