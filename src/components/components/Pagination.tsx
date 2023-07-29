/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
   className?: string;
   utils: {
      page?: number;
      pages?: number;
      limit?: number;
      setPage: Dispatch<SetStateAction<number>>;
      setLimit: Dispatch<SetStateAction<number>>;
   }
}
const Pagination: FC<Props> = ({ className, utils: { page, pages, limit, setLimit, setPage } }) => {
   return (
      <div className={`${className || ''} mx-auto flex gap-5 mt-5`}>
         <div className="flex gap-2 items-center">
            <p className="text-xs">Page</p>
            <select className="outline-none ps-2 pe-1 rounded border border-gray-300 focus-within:border-gray-400 duration-300"
               onChange={e => setPage(Number(e.target.value))} onClick={e => setPage(Number(e.currentTarget.value))} value={page}>
               {[...Array(pages || 0)].map((_e, i) => <option value={i + 1} key={i + 1}>{i + 1}</option>)}
            </select>
         </div>
         <div className="flex gap-2 items-center">
            <p className="text-xs">Limit</p>
            <select className="outline-none ps-2 pe-1 rounded border border-gray-300 focus-within:border-gray-400 duration-300"
               onChange={e => setLimit(Number(e.target.value))} defaultValue={limit || 10}>
               <option value="3" >3</option>
               <option value="5" >5</option>
               <option value="10" >10</option>
               <option value="20" >20</option>
               <option value="30" >30</option>
               <option value="40" >40</option>
               <option value="50" >50</option>
               <option value="100" >100</option>
            </select>
         </div>
      </div>
   );
};

export default Pagination;