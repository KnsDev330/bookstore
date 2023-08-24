/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserState } from './interfaces';
import MyAxios from '../../utils/MyAxios';
import { getErrors } from '../../utils/Utils';
import { IGetUserResponse, ILoginResponse } from '../../interfaces/ServerResponse';
import { IUser } from '../../interfaces/interfaces';


export interface ILoginCredential {
   email: string;
   password: string;
}
export interface ISignupCredential {
   name?: string;
   email?: string;
   password?: string;
}

const initialState: IUserState = {
   user: null,
   isLoading: false,
   isError: false,
   error: null,
};

export const createUser = createAsyncThunk(
   'user/createUser',
   async ({ name, email, password }: ISignupCredential) => {
      const data = await MyAxios.post<ILoginResponse>(`/auth/signup`, null, { name, email, password });
      if (!data?.code) throw new Error(`No response found from server`);
      if (!data.ok) throw new Error(getErrors(data));
      if (!data.data?.user || !data.data?.accessToken)
         throw new Error(`User data or Access token not found in response`);
      localStorage.setItem('jwt', data.data.accessToken);
      return data.data.user;
   }
);

export const loginUser = createAsyncThunk(
   'user/loginUser',
   async ({ email, password }: ILoginCredential) => {
      const data = await MyAxios.post<ILoginResponse>(`/auth/login`, null, { email, password });
      if (!data?.code) throw new Error(`No response found from server`);
      if (!data.ok) throw new Error(getErrors(data));
      if (!data.data?.user || !data.data?.accessToken)
         throw new Error(`User data or Access token not found in response`);
      localStorage.setItem('jwt', data.data.accessToken);
      return data.data.user;
   }
);

export const getUserFromLocalStorage = createAsyncThunk(
   'user/getUserFromLocalStorage',
   async () => {
      const data = await MyAxios.get<IGetUserResponse>(`/users/me`);
      if (!data?.code) throw new Error(`No response found from server`);
      if (!data.ok) throw new Error(getErrors(data));
      if (!data.data) throw new Error(`User data not found in response`);
      return data.data;
   }
);



const userSlice = createSlice({
   name: 'user ',
   initialState,
   reducers: {
      logoutUser: () => {
         localStorage.removeItem('jwt');
         return initialState;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getUserFromLocalStorage.pending, (state) => PendingState(state))
         .addCase(getUserFromLocalStorage.fulfilled, (state, action) => FullfilledState(state, action))
         .addCase(getUserFromLocalStorage.rejected, (state, action) => RejectedState(state, action))

         .addCase(createUser.pending, (state) => PendingState(state))
         .addCase(createUser.fulfilled, (state, action) => FullfilledState(state, action))
         .addCase(createUser.rejected, (state, action) => RejectedState(state, action))

         .addCase(loginUser.pending, (state) => PendingState(state))
         .addCase(loginUser.fulfilled, (state, action) => FullfilledState(state, action))
         .addCase(loginUser.rejected, (state, action) => RejectedState(state, action))
   },
});

function PendingState(state: IUserState) {
   state.user = null;
   state.isLoading = true;
   state.isError = false;
   state.error = null;
}
function FullfilledState(state: IUserState, action: PayloadAction<IUser>) {
   state.user = action.payload;
   state.isLoading = false;
   state.isError = false;
   state.error = null;
}
function RejectedState(state: IUserState, action: any) {
   state.user = null;
   state.isLoading = false;
   state.isError = true;
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
   state.error = action.error.message!;
   // if (action?.error?.message?.includes('jwt expired')) {
   localStorage.removeItem('jwt');
   // }
}

export const {
   logoutUser
} = userSlice.actions;
export default userSlice.reducer;