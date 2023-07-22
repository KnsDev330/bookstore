import { FC } from 'react';
import { BeatLoader } from 'react-spinners'

interface Props {
   text: string;
   variant: "primary";
   iconRight?: JSX.Element;
   className?: string;
   isLoading?: boolean;
}

const Button: FC<Props> = ({ text, variant, iconRight, className, isLoading }): JSX.Element => {
   return (
      <button
         disabled={isLoading}
         className={` ${className || ''}
         flex items-center justify-center px-5 py-3 rounded-full text-white font-medium text-sm duration-300 relative group h-11
         ${variant === 'primary' ? 'bg-primary hover:bg-primary-hover' : ''}
         ${isLoading ? 'cursor-not-allowed' : ''}
      `}>
         {isLoading ? <BeatLoader color="#fff" speedMultiplier={0.7} size={'5px'} className='me-2' /> : text}
         {iconRight ? <span className='relative duration-300 -right-1 group-hover:-right-2'>{iconRight}</span> : ''}
      </button>
   );
};

export default Button;