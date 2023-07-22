import { FC, useEffect, useState } from "react";

const ErrorBox: FC<{ error: string }> = ({ error }): JSX.Element => {
   const [title, setTitle] = useState<string>('');
   const [errors, setErrors] = useState<string[]>([]);

   useEffect(() => {
      const n = error.split("$$$");
      if (n[0] === 'myError') {
         setTitle(n[1]);
         const errs = n[2].split("::");
         setErrors(errs);
      }
      else
         setTitle(error);
   }, [error]);
   return (
      <div className="errors bg-red-100 mt-4 text-red-500 px-3 py-2 rounded border border-red-200">
         <span className="text-sm">{title}</span>
         <ul className="text-xs list-disc list-inside">{errors.map(e => <li key={e}>{e}</li>)}</ul>
      </div>
   );
};

export default ErrorBox;