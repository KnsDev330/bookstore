import { FC } from 'react';

interface Props {
   text: string;
   variant: "primary";
   iconRight?: JSX.Element;
}

const Button: FC<Props> = ({ text, variant, iconRight }): JSX.Element => {
   return (
      <button className={`
         flex items-center px-5 py-3 rounded-full text-white font-medium text-sm duration-300 relative group
         ${variant === 'primary' ? 'bg-primary hover:bg-primary-hover' : ''}
      `}>
         {text}
         {iconRight ? <span className='relative duration-300 -right-1 group-hover:-right-2'>{iconRight}</span> : ''}
      </button>
   );
};

export default Button;