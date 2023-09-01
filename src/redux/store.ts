import { configureStore } from '@reduxjs/toolkit'
import { apiApi } from './api/apiApi';
import userReducer from './features/userSlice';
import bookReducer from './features/bookSlice';
import leftNavReducer from './features/leftNavSlice';

export const store = configureStore({
   reducer: {
      user: userReducer,
      book: bookReducer,
      leftNav: leftNavReducer,
      [apiApi.reducerPath]: apiApi.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(apiApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;