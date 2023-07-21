export interface IBook {
   _id: string;
   title: string;
   author: string;
   genre: string;
   rating: number;
   price: number;
   oldPrice?: number;
   image: string;
}