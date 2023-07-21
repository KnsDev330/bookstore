import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../types/Book";

interface IinitialState {
   user:
}

const initialState: IinitialState = {
   booksToRead: [],
   alreadyRead: [],
}

const toReadSlice = createSlice({
   name: 'toReadSlice',
   initialState,
   reducers: {}
});


export 