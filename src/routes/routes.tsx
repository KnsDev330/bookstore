/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createBrowserRouter } from 'react-router-dom';
import '../App.css';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ResgisterPage from '../pages/ResgisterPage';
import BooksPage from '../pages/BooksPage';
import NotFoundPage from '../pages/NotFoundPage';
import DashboardPage from '../pages/DashboardPage';
import DashAddBook from '../components/Dash/DashAddBook';
import DashMyReadList from '../components/Dash/DashMyReadList';
import DashMyBooks from '../components/Dash/DashMyBooks';
import DashReviews from '../components/Dash/DashReviews';
import DashEditBook from '../components/Dash/DashEditBook';
import BookDetailsPage from '../pages/BookDetailsPage/BookDetailsPage';


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
      path: '/books/:id',
      element: <BookDetailsPage />,
   },
   {
      path: '/dash',
      element: <DashboardPage />,
      children: [
         {
            path: '',
            element: <DashMyReadList />
         },
         {
            path: 'reads',
            element: <DashMyReadList />
         },
         {
            path: 'books',
            element: <DashMyBooks />
         },
         {
            path: 'books/:id',
            element: <DashEditBook />
         },
         {
            path: 'add',
            element: <DashAddBook />
         },
         {
            path: 'reviews',
            element: <DashReviews />
         },
      ]
   },
   {
      path: '*',
      element: <NotFoundPage />,
   }
]);

export default routes;