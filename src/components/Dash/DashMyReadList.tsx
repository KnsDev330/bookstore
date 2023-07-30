import { useState } from "react";
import { useGetAllReadsQuery } from "../../redux/api/readApi";
import { EReadStates } from "../../interfaces/enums";
import Shimmer from "../components/shimmer";
import ErrorBox from "../shared/ErrorBox";
import { getErrors } from "../../utils/Utils";
import Pagination from "../components/Pagination";
import MyRead from "./MyReadList/MyRead";

const DashMyReadList = () => {

   const [page, setPage] = useState<number>(1);
   const [limit, setLimit] = useState<number>(3);
   const [state, setState] = useState<EReadStates>();

   const { data, isError, error, isFetching, refetch } = useGetAllReadsQuery({ page, limit, state }, { refetchOnFocus: true, refetchOnMountOrArgChange: true });

   return (
      <div className="shdow-lg w-[700px] max-w-[90%] my-5 md:px-5 pb-5 pt-0 rounded-lg mx-auto lg:ms-0">
         <div className="texts">
            <h2 className="text-xl font-medium">Your Read List</h2>
            <p className="text-sm">You can find the books in your read list here</p>
         </div>

         {isFetching ? (
            <div className="flex gap-3 flex-wrap">
               <Shimmer />
               <Shimmer />
               <Shimmer />
            </div>
         ) : (
            <>
               <div className={`mx-auto flex gap-5 mt-5`}>
                  <div className="flex gap-2 items-center">
                     <p className="text-xs">Filter</p>
                     <select className="outline-none ps-2 pe-1 rounded border border-gray-300 focus-within:border-gray-400 duration-300"
                        onChange={e => setState(e.target.value as EReadStates)} value={state}>
                        <option value="all">All</option>
                        <option value={EReadStates.ToRead}>{EReadStates.ToRead}</option>
                        <option value={EReadStates.CurrentlyReading}>{EReadStates.CurrentlyReading}</option>
                        <option value={EReadStates.AlreadyRead}>{EReadStates.AlreadyRead}</option>
                        <option value={EReadStates.Abandoned}>{EReadStates.Abandoned}</option>
                     </select>
                  </div>
               </div>

               {isError ? (
                  <div className="bg-white rounded-md shadow p-4 my-5">
                     <ErrorBox error={getErrors(error)} />
                  </div>
               ) : (
                  <div className="flex flex-col gap-3 my-5">
                     {data!.data.map((read) => <MyRead read={read} refetch={refetch} />)}
                  </div>
               )}

               <Pagination utils={{ page, limit, pages: data?.meta.pages, setLimit, setPage }} />
            </>
         )}

      </div>
   );
};


export default DashMyReadList;