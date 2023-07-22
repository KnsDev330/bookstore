import IUser from "../../types/IUser";

export interface IUserState {
   user: IUser | null;
   isLoading: boolean;
   isError: boolean;
   error: string | null;
}

export interface ILoginCredential {
   email: string;
   password: string;
}

export interface ISignupCredential {
   name?: string;
   email?: string;
   password?: string;
}

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


export interface IModifiedError {
   title: string;
   errors: string[];
}