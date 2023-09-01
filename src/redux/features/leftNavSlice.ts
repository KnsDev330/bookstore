import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialState {
   closed: boolean;
}
const initialState: IInitialState = {
   closed: true
};

const leftNavSlice = createSlice({
   name: 'leftNav',
   initialState,
   reducers: {
      changeLeftNavPos: (state, action: PayloadAction<boolean>): IInitialState => {
         return { ...state, closed: action.payload };
      }
   },
});

export const {
   changeLeftNavPos
} = leftNavSlice.actions;
export default leftNavSlice.reducer;