import { IUser } from "../../interfaces/interfaces";

export interface IUserState {
   user: IUser | null;
   isLoading: boolean;
   isError: boolean;
   error: string | null;
}