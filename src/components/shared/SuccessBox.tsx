import { FC } from "react";

const SuccessBox: FC<{ message: string }> = ({ message }): JSX.Element => {
   return (
      <div className="errors bg-green-100 mt-4 text-green-500 px-3 py-2 rounded border border-green-200">
         <span className={'text-sm'}>{message}</span>
      </div>
   );
};

export default SuccessBox;