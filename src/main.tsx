/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './Redux/store.ts';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes/routes.tsx';

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={routes} />
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
)
