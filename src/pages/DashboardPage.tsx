import { FC } from 'react';
import TopBar from '../components/shared/TopBar';
import Header from '../components/shared/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import DashSideBar from '../components/Dash/DashSideBar';

const DashboardPage: FC = (): JSX.Element => {
   return (
      <div className='text-accent flex flex-col min-h-screen bg-gray-200'>
         <TopBar />
         <Header />
         <div className='dashboard flex flex-grow gap-5'>
            <DashSideBar />
            <Outlet />
         </div>
         <Footer />
      </div>
   );
};

export default DashboardPage;