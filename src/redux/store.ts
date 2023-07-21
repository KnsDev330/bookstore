import { configureStore } from '@reduxjs/toolkit'
import { apiApi } from './api/apiApi';
import userReducer from './features/userSlice';

export const store = configureStore({
   reducer: {
      user: userReducer,
      [apiApi.reducerPath]: apiApi.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(apiApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;