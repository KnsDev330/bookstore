import { EReadStates, EUserRoles } from "./enums";

export interface IBook {
   _id: string;
   user: string;
   title: string;
   author: string;
   genre: string;
   publicationDate: number;
   createdAt: string;
   updatedAt: string;
}

export interface IUser {
   _id: string;
   role: EUserRoles;
   name: string;
   email: string;
   dp: string;
   createdAt: string;
   updatedAt: string;
}

export interface IReview {
   _id: string;
   user: string;
   book: string;
   userName: string;
   userDp: string;
   rating: number;
   comment: string | null;
   createdAt: string;
   updatedAt: string
}

export interface IRead {
   _id: string;
   user: string;
   book: string;
   state: EReadStates;
   createdAt: string;
   updatedAt: string
}