import React from 'react';
import '../cssBase/Admin.css';
import Sidebar from './Sidebar';
import DashboardHeader from './DashBoardHeader'
import Dashboard from './Dashboard';

function Admin() {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <DashboardHeader />
        <Dashboard />
      </div>
    </div>
  );
}

export default Admin;
