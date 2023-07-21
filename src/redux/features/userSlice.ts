import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILoginCredential, ISignupCredential, IUserState } from './interfaces';
import MyAxios from '../../utils/MyAxios';
import { getErrors } from '../../utils/Utils';
import IUser from '../../types/IUser';

const initialState: IUserState = {
   user: null,
   isLoading: false,
   isError: false,
   error: null,
};

export const createUser = createAsyncThunk(
   'user/createUser',
   async ({ name, email, password }: ISignupCredential) => {
      const data = await MyAxios.post(`/auth/signup`, null, { name, email, password });
      if (!data?.code) throw new Error(`No response found from server`);
      if (!data.ok) throw new Error(getErrors(data));
      return data.data as IUser;
   }
);

export const loginUser = createAsyncThunk(
   'user/loginUser',
   async ({ email, password }: ILoginCredential) => {
      const data = await MyAxios.post(`/auth/login`, null, { email, password });
      if (!data?.code) throw new Error(`No response found from server`);
      if (!data.ok) throw new Error(getErrors(data));
      return data.data as IUser;
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