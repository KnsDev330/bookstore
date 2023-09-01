import { FC, useEffect, useState } from 'react';
import { AiOutlineRead, AiOutlineSearch } from 'react-icons/ai';
import { PiBooksDuotone } from 'react-icons/pi';
import { BsJournalBookmark } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { FaTimes } from 'react-icons/fa';
import { changeLeftNavPos } from '../../redux/features/leftNavSlice';
import Button from '../Button';
import { changeMobileSearchTerm } from '../../redux/features/bookSlice';

interface Props {
   className?: string;
}
const DashSideBar: FC<Props> = ({ className }): JSX.Element => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { pathname } = useLocation();

   const [now, setNow] = useState<string>('reads');
   const cls = `hover:text-primary flex items-center gap-3 px-4 md:px-6 py-2  hover:bg-gray-100 duration-300 border-b`;

   const { closed: leftNavClosed } = useAppSelector(state => state.leftNav);

   // update active nav
   useEffect(() => {
      if (pathname.includes('/dash/reads')) setNow('reads');
      if (pathname.includes('/dash/books')) setNow('books');
      if (pathname.includes('/dash/add')) setNow('add');
   }, [pathname]);

   // handle nav close action on mobile
   const handleClick = () => dispatch(changeLeftNavPos(!leftNavClosed));
   const handleSearchClick = () => {
      const leftNavSearchInput = document.getElementById('leftNavSearchInput') as HTMLInputElement;
      const val = leftNavSearchInput.value.trim();
      if (val.length < 1) return;
      dispatch(changeLeftNavPos(!leftNavClosed)); // close navbar
      dispatch(changeMobileSearchTerm(val)); // change mobile search term
      navigate(`/books`); // navigate to all books page
   }

   return (
      <>
         <div className={`
            ${className || ''} dash_links ${leftNavClosed ? '' : 'active'} flex flex-col flex-grow w-[90%] max-w-[300px] md:bg-white/90 border-e py-5 duration-300 absolute md:relative bg-white z-[5]
         `}>
            {
               !leftNavClosed &&
               <div className='close_button flex justify-end pe-5 mb-5 cursor-pointer md:hidden'
                  onClick={handleClick}><FaTimes className='text-3xl' />
               </div>
            }

            <Link onClick={handleClick} to='reads' className={`${now === 'reads' ? 'text-primary cursor-not-allowed' : ''} ${cls}`}>
               <AiOutlineRead className='text-xl' /> My Read List
            </Link>
            <Link onClick={handleClick} to='books' className={`${now === 'books' ? 'text-primary cursor-not-allowed' : ''} ${cls}`}>
               <PiBooksDuotone className='text-xl' /> My Books
            </Link>
            <Link onClick={handleClick} to='add' className={`${now === 'add' ? 'text-primary cursor-not-allowed' : ''} ${cls}`}>
               <BsJournalBookmark className='text-lg' /> Add New Book
            </Link>

            {
               <div className='flex md:hidden flex-col gap-3 px-4 my-5'>
                  <input placeholder='Search books' className='border-b duration-300 focus:border-primary outline-none' id="leftNavSearchInput" />
                  <Button text='Search' variant='primary' className='w-32 h-8' iconRight={<AiOutlineSearch className='' />}
                     onClick={handleSearchClick}
                  />
               </div>
            }
         </div>
         <div className={`${leftNavClosed ? 'hidden' : 'block'} md:!hidden absolute h-screen w-screen top-0 left-0 bg-[#00000010] backdrop-blur-sm z-[1]`} onClick={handleClick}></div>
      </>
   );
};


export default DashSideBar;