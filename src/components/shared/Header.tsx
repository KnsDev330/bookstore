import Badge from "./Badge";
import { MdOutlineAccountCircle } from "react-icons/md";
import VerticalLine from "./VerticalLine";
import { Link } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineRead } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "../../redux/features/userSlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {

   const { user } = useAppSelector(state => state.user);
   const [showReadList, setShowReadtList] = useState<boolean>(false);
   const toggleSRL = () => setShowReadtList(!showReadList);

   /* LOAD USER DATA IF JWT FOUND IN  LOCALSTORAGE */
   const dispatch = useAppDispatch();
   useEffect(() => {
      if (!user && localStorage.getItem('jwt'))
         void dispatch(getUserFromLocalStorage())
   }, [user, dispatch]);


   return (
      <>
         <ToastContainer autoClose={2000} />
         <div className={`sticky top-0 h-16 items-center flex text-accent bg-white z-[1] border-b`}>
            <div className="mcontainer flex justify-between">

               {/* logo */}
               <div className="logo">
                  <Link to='/'><img src="/logo-1.svg" alt="" /></Link>
               </div>

               {/* search */}
               <div className="search-section hidden xs:block">
                  <div className="search-container relative">
                     <input type="text"
                        id="homeBookSearchBar"
                        className="
                           w-80
                           bg-inherit border-b outline-none focus:border-primary duration-300
                        "
                        placeholder="Search books"
                     />
                  </div>
               </div>

               {/* options */}
               <div className="utility-sections flex gap-4">

                  <div className="wishlist-section relative cursor-pointer" title="add new book">
                     <Link to={`${user ? `/dash/add` : `/login`}`}><BiAddToQueue className='text-2xl' /></Link>
                  </div>

                  <VerticalLine />

                  <div className="cart-section relative cursor-pointer" onClick={toggleSRL} title="my read list">
                     <AiOutlineRead className='text-2xl mt-[2px]' />
                     <Badge count={user?.counters.reads || 0} />
                  </div>

                  <VerticalLine />

                  <div className="account-section relative cursor-pointer" title={user ? 'my account' : 'login'}>
                     {!user ? <Link to='/login'><MdOutlineAccountCircle className='text-2xl' /></Link> :
                        <img src="/dps/1.svg" alt="" className="w-7 bg-white rounded-full border" draggable={false} />
                     }
                  </div>
               </div>
            </div>
         </div>
         <div className={`${!showReadList ? 'hidden' : ''} duration-700 fixed top-0 h-screen w-full backdrop-blur-sm z-[1] bg-black/50`} onClick={toggleSRL}>
         </div>
         <div className={`${showReadList ? 'right-0' : 'right-[-100vw]'} duration-300 fixed text-accent top-0 h-screen bg-white shadow-lg z-[1] py-10 px-10 w-[90%] max-w-[500px]`}
            onClick={e => e.stopPropagation()}>
            hidsiufgisdbvghsdvbh
         </div>
      </>
   );
};

export default Header;