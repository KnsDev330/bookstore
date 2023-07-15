import { FC } from 'react';

const Badge: FC<{ count: number }> = ({ count }): JSX.Element => {
   return (
      <div className='absolute -top-1 -right-1 bg-primary-light text-primary text-xs ps-[2px] pe-[1px] rounded-lg'>
         {count}
      </div>
   );
};

export default Badge;