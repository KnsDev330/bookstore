import { IUser } from "../../interfaces/interfaces";

export interface IUserState {
   user: IUser | null;
   isLoading: boolean;
   isError: boolean;
   error: string | null;
}

export interface IQuery {
   limit?: number;
   page?: number;
   sortBy?: string;
   sortOrder?: "desc" | "asc";
}

export interface IReadListAllQuery extends IQuery { state?: string; }

export enum ESortOrder {
   desc = "desc",
   asc = "asc",
}