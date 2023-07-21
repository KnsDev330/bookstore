/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={routes} />
      </Provider>
   </React.StrictMode>
);
