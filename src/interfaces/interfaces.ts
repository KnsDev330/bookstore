import { EReadStates, EUserRoles } from "./enums";

export interface IBook {
   _id: string;
   userId: string;
   title: string;
   author: string;
   genre: string;
   publicationDate: number;
   rating: number;
   reviews: number;
   image: string;
   createdAt: string;
   updatedAt: string;
}

export interface IAddBookInput {
   title: string;
   author: string;
   genre: string;
   publicationDate: number;
   image: string;
}

export interface IPostReviewPayload {
   bookId: string;
   rating: number;
   comment: string;
}

export interface IUser {
   _id: string;
   role: EUserRoles;
   name: string;
   email: string;
   dp: string;
   counters: {
      reads: number;
      books: number;
      reviews: number;
   }
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
   userId: string;
   bookId: {
      title: string;
      image: string;
   };
   state: EReadStates;
   createdAt: string;
   updatedAt: string
}