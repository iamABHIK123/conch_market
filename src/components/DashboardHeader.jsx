// 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material'; // Import IconButton
import AccountCircle from '@mui/icons-material/AccountCircle'; // Import AccountCircle icon
import API from "./App";
import "../cssBase/DashboardHeader.css";

const DashboardHeader = () => {
  const [auth, setAuth] = useState(true); // State to track authentication status
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const email = localStorage.getItem('email'); // Fetch the logged-in user's email from localStorage

      // Send a POST request to the backend for logging out the user
      const response = await API.post('auth/logout', { email });

      if (response.status === 200) {
        // On successful logout, clear localStorage and update authentication state
        localStorage.clear();
        setAuth(true); // User is logged out
        navigate('/'); // Redirect user to the login page
      } else {
        // Handle error if the logout fails
        console.error('Logout request failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated (email exists in localStorage)
    setAuth(localStorage.getItem('email') == null);
  }, []);

  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h4><b>Lottery Shankha Bhandar </b>(Admin Dashboard)</h4>
      <div className="user-info">
        <span>Admin</span> |{' '}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            if (auth) navigate('/login'); // Redirect to login if not authenticated
            else handleLogout(); // Log out if authenticated
          }}
          sx={{ marginRight: '16px' }}
        >
          {auth ? 'Login' : 'Logout'}
        </Button>{' '}
        
        {/* <IconButton size="large" onClick={() => navigate('/account')} color="inherit">
          <AccountCircle /> 
        </IconButton>
         */}
      </div>
    </header>
  );
};

export default DashboardHeader;