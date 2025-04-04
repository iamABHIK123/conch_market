// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Conch Market</h2>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/users">Users</Link></li> {/* Updated Link */}
        <li><a href="#">Products</a></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
