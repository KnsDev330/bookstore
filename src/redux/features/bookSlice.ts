import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialState {
   searchTerm: string;
   mobileSearchTerm: string;
}
const initialState: IInitialState = {
   searchTerm: '',
   mobileSearchTerm: '',
};

const bookSlice = createSlice({
   name: 'book',
   initialState,
   reducers: {
      changeSearchTerm: (state, action: PayloadAction<string>): IInitialState => {
         return { ...state, searchTerm: action.payload };
      },
      changeMobileSearchTerm: (state, action: PayloadAction<string>): IInitialState => {
         return { ...state, mobileSearchTerm: action.payload };
      }
   },
});

export const {
   changeSearchTerm,
   changeMobileSearchTerm
} = bookSlice.actions;
export default bookSlice.reducer;