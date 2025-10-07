import React from 'react';
import Sidebar from '../pages/Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router';

const DashRoot = () => {
    return (
        <div className="flex min-h-screen bg-[#f3f3f3] p-6 gap-6">
                {/* Sidebar Content */}
                <div>
                    <Sidebar />
                </div>
                {/* Main Content */}
                <div className='flex-1'>
                    <Outlet />
                </div>     
        </div>
    );
};

export default DashRoot;
