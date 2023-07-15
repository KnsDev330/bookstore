import { AiOutlineHeart } from "react-icons/ai";
import Badge from "./Badge";
import { BsCart4 } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import VerticalLine from "./VerticalLine";

const Header = () => {

   return (
      <div className="sticky bg-white h-16 items-center flex text-accent">
         <div className="mcontainer flex justify-between     ">

            {/* logo */}
            <div className="logo">
               <img src="/logo-1.svg" alt="" />
            </div>

            {/* search */}
            <div className="search-section">
               <div className="search-container relative">
                  <input type="text"
                     id="homeBookSearchBar"
                     className="
                        w-80
                        bg-white border-b outline-none focus:border-primary duration-300
                     "
                     placeholder="Search books"
                  />
               </div>
            </div>

            {/* options */}
            <div className="utility-sections flex gap-4">

               <div className="wishlist-section relative cursor-pointer">
                  <AiOutlineHeart className='text-2xl' />
                  <Badge count={0} />
               </div>

               <VerticalLine />

               <div className="cart-section relative cursor-pointer">
                  <BsCart4 className='text-2xl' />
                  <Badge count={0} />
               </div>

               <VerticalLine />

               <div className="account-section relative cursor-pointer">
                  <MdOutlineAccountCircle className='text-2xl' />
               </div>

            </div>
         </div>
      </div>
   );
};

export default Header;