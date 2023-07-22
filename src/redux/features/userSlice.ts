/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserState } from './interfaces';
import MyAxios from '../../utils/MyAxios';
import { getErrors } from '../../utils/Utils';
import { ILoginResponse } from '../../interfaces/ServerResponse';


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

const userSlice = createSlice({
   name: 'user ',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createUser.pending, (state) => {
            state.user = null;
            state.isLoading = true;
            state.isError = false;
            state.error = null;
         })
         .addCase(createUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
         })
         .addCase(createUser.rejected, (state, action) => {
            state.user = null;
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message!;
         })
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.user = null;
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message!;
         });
   },
});


export default userSlice.reducer;