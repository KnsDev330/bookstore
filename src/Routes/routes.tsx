/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createBrowserRouter } from 'react-router-dom';
import '../App.css';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import ResgisterPage from '../Pages/ResgisterPage';
import BooksPage from '../Pages/BooksPage';
import NotFoundPage from '../Pages/NotFoundPage';


const routes = createBrowserRouter([
   {
      path: '/',
      element: <HomePage />
   },
   {
      path: '/login',
      element: <LoginPage />,
   },
   {
      path: '/register',
      element: <ResgisterPage />,
   },
   {
      path: '/books',
      element: <BooksPage />,
   },
   {
      path: '*',
      element: <NotFoundPage />,
   }
]);

export default routes;