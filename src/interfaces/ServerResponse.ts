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
      pages: number;
      limit: number;
      total: number;
   }
}

export interface ILoginResponse extends IServerResponse { data: { user: IUser; accessToken: string; } }
export interface IBookResponse extends IServerResponse { data: IBook }
export interface IBooksResponse extends IServerResponse { data: IBook[] }
export interface IReviewResponse extends IServerResponse { data: IReview }
export interface IReviewsResponse extends IServerResponse { data: IReview[] }
export interface IGetUserResponse extends IServerResponse { data: IUser }
