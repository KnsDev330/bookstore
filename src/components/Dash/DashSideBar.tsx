import { FC, useEffect, useState } from 'react';
import { AiOutlineRead } from 'react-icons/ai';
import { PiBooksDuotone } from 'react-icons/pi';
import { BsJournalBookmark } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { BiCommentDetail } from 'react-icons/bi';

interface Props {
   className?: string;
}
const DashSideBar: FC<Props> = ({ className }): JSX.Element => {
   const cls = `hover:text-primary flex items-center gap-3 px-4 md:px-6 py-2  hover:bg-gray-100 duration-300 border-b`;
   const [now, setNow] = useState<string>('reads');
   const { pathname } = useLocation();

   useEffect(() => {
      if (pathname.includes('/dash/reads')) setNow('reads');
      if (pathname.includes('/dash/books')) setNow('books');
      if (pathname.includes('/dash/add')) setNow('add');
      if (pathname.includes('/dash/reviews')) setNow('reviews');
   }, [pathname]);
   return (
      <div
         className={`${className || ''} flex flex-col flex-grow w-[90%] max-w-[300px] bg-white/90 border-e py-5
            absolute
            md:relative
         `}
      >
         <Link to='reads' className={`${now === 'reads' ? 'text-primary cursor-not-allowed' : ''} ${cls}`}>
            <AiOutlineRead className='text-xl' /> My Read List
         </Link>
         <Link to='books' className={`${now === 'books' ? 'text-primary cursor-not-allowed' : ''} ${cls}`}>
            <PiBooksDuotone className='text-xl' /> My Books
         </Link>
         <Link to='add' className={`${now === 'add' ? 'text-primary cursor-not-allowed' : ''} ${cls}`}>
            <BsJournalBookmark className='text-lg' /> Add New Book
         </Link>
         <Link to='reviews' className={`${now === 'reviews' ? 'text-primary cursor-not-allowed' : ''} ${cls}`}>
            <BiCommentDetail className='text-[19px]' /> My Reviews
         </Link>
      </div>
   );
};


export default DashSideBar;