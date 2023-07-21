import EUserRoles from "./EUserRoles";

export default interface IUser {
   _id: string;
   role: EUserRoles;
   name: string;
   email: string;
   dp: string;
   createdAt: string;
   updatedAt: string;
}