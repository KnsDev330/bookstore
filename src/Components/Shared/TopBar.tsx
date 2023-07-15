import { FC } from 'react';
import { Link } from 'react-router-dom'
import { LiaPhoneVolumeSolid } from 'react-icons/lia';
import { BiLogoFacebookCircle, BiLogoPinterest } from 'react-icons/bi';
import { AiOutlineTwitter, AiFillInstagram } from 'react-icons/ai';

const TopBar: FC = (): JSX.Element => {
   return (
      <div className='w-full bg-white border-b border-border'>
         <div className="mcontainer text-black h-10 flex items-center justify-between">
            <div className='flex items-center gap-5'>
               <p className='text-xs font-semibold underline'>
                  <Link to='/contact' className='duration-300 hover:text-primary'>Find a Book Store</Link>
               </p>
               <div className='items-center gap-2 hidden xs:flex group cursor-pointer'>
                  <LiaPhoneVolumeSolid className="text-primary duration-200 group-hover:scale-110" />
                  <a href="tel:+8801711111111" className='text-xs font-medium group-hover:underline'>+880 17xxxxxxxx</a>
               </div>
            </div>
            <div className='socials flex gap-3 md:gap-5 lg:gap-7'>
               <a href="#" target='_blank'><BiLogoFacebookCircle className='duration-300 hover:scale-90 hover:fill-primary' /></a>
               <a href="#" target='_blank'><AiOutlineTwitter className='duration-300 hover:scale-90 hover:fill-primary' /></a>
               <a href="#" target='_blank'><AiFillInstagram className='duration-300 hover:scale-90 hover:fill-primary' /></a>
               <a href="#" target='_blank'><BiLogoPinterest className='duration-300 hover:scale-90 hover:fill-primary' /></a>
            </div>
         </div>
      </div>
   );
};

export default TopBar;