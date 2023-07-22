import { IBook, IReview, IUser } from "./interfaces";

export interface IServerResponse {
   code: number;
   ok: boolean;
   text: string;
   data: any;
   errors: { path: string, message: string }[];
   stack: any;
   meta: {
      page: number;
      limit: number;
      total: number;
   }
}

export interface ILoginResponse extends IServerResponse { data: { user: IUser; accessToken: string; } }
export interface IBooksResponse extends IServerResponse { data: IBook[] }
export interface IReviewsResponse extends IServerResponse { data: IReview[] }
export interface IGetUserResponse extends IServerResponse { data: IUser }
