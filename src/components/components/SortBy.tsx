/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { ESortOrder } from "../../redux/features/interfaces";

interface Props {
   className?: string;
   utils: {
      sortBy: string;
      sortOrder: ESortOrder;
      setSortBy: Dispatch<SetStateAction<string>>;
      setSortOrder: Dispatch<SetStateAction<ESortOrder>>;
   }
}

const SortBy: FC<Props> = ({ className, utils: { sortBy, sortOrder, setSortBy, setSortOrder } }) => {

   const setValues = (e: ChangeEvent<HTMLSelectElement>): void => {
      const v = e.target.value.split("::");
      setSortBy(v[0]);
      setSortOrder(v[1] as ESortOrder);
   }

   return (
      <div className={`${className || ''} mx-auto flex gap-5 mt-5`}>
         <div className="flex gap-2 items-center">
            <p className="text-xs">Sort By</p>
            <select className="outline-none ps-2 pe-1 rounded border border-gray-300 focus-within:border-gray-400 duration-300"
               onChange={setValues} value={`${sortBy}::${sortOrder}`}>
               <option value="createdAt::desc">Time - New &gt; Old</option>
               <option value="createdAt::asc">Time - Old &gt; New</option>
            </select>
         </div>
      </div>
   );
};

export default SortBy;