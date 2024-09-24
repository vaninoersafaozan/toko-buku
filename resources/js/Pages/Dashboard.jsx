import React from 'react';
import Navbar from '@/Components/Navbar';

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10">
                <h1 className="text-3xl font-bold">Selamat Datang di Dashboard</h1>
            </div>
        </div>
    );
};

export default Dashboard;
