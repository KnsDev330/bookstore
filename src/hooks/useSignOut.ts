import { useAppSelector } from "../redux/hook";

const useSignOut = () => {
   const user = useAppSelector(state => state.user);
   const signOut = () => {
      localStorage.removeItem('jwt');
      user.isLoading = false;
      user.error = null;
      user.isError = false;
      user.user = null;
   }
   return signOut;
}

export default useSignOut;