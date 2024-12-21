import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../page/Footer/Footer';

const Layout = () => {
    return (
        <div className='bg-gray-100'>
            <div className='bg-gray-50'>
                <Navbar></Navbar>
            </div>
            <div className='bg-gray-100'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;