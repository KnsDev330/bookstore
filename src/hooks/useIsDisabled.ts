import { useEffect, useState } from "react";

const useIsDisabled = (condition: boolean) => {
   const [disabled, setDisabled] = useState<boolean>(false);

   useEffect(() => {
      if (condition !== disabled) setDisabled(condition);
   }, [condition, disabled]);

   return disabled;
};

export default useIsDisabled;