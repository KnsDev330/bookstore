/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createBrowserRouter } from 'react-router-dom';
import '../App.css';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ResgisterPage from '../pages/ResgisterPage';
import BooksPage from '../pages/BooksPage';
import NotFoundPage from '../pages/NotFoundPage';


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