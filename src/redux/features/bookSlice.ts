import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialState {
   searchTerm: string;
}
const initialState: IInitialState = {
   searchTerm: ''
};

const bookSlice = createSlice({
   name: 'book ',
   initialState,
   reducers: {
      changeSearchTerm: (state, action: PayloadAction<string>) => {
         return { ...state, searchTerm: action.payload };
      }
   },
});

export const {
   changeSearchTerm
} = bookSlice.actions;
export default bookSlice.reducer;