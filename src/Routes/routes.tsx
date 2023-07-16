/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../Pages/Home';
import Login from '../Pages/Login';
import Resgister from '../Pages/Resgister';
import NotFound from '../Pages/NotFound';
import Layout from '../Pages/Layout';
import '../App.css';
import Books from '../Components/Books/Books';


const routes = createBrowserRouter([
   {
      path: '/',
      element: <Layout><HomePage /></Layout>
   },
   {
      path: '/login',
      element: <Layout><Login /></Layout>,
   },
   {
      path: '/register',
      element: <Layout><Resgister /></Layout>,
   },
   {
      path: '/books',
      element: <Layout><Books /></Layout>,
   },
   {
      path: '*',
      element: <Layout><NotFound /></Layout>,
   }
]);

export default routes;