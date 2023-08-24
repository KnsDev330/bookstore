import HorizontalLine from './HorizontalLine';
import { Link } from 'react-router-dom';
import Button from '../Button';
import { BiChevronRight } from 'react-icons/bi';

const NewListing = ({ className }: { className?: string }) => {
   return (
      <div className={`flex w-full justify-between items-center gap-10 ${className || ''}`}>
         <h1 className="font-medium md:font-heading md:text-heading">New Listings</h1>
         <HorizontalLine className="flex-grow" />
         <Link to='/books'><Button text='View All' variant='primary' className="!p-3 !h-8" iconRight={<BiChevronRight className="text-xl" />} /></Link>
      </div>
   );
};

export default NewListing;