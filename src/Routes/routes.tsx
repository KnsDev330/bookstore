/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Resgister from '../Pages/Resgister';
import NotFound from '../Pages/NotFound';
import Layout from '../Pages/Layout';
import '../App.css';


const routes = createBrowserRouter([
   {
      path: '/',
      element: <Layout><Home /></Layout>
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
      path: '*',
      element: <Layout><NotFound /></Layout>,
   }
]);

export default routes;