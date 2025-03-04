
import React, { useState, useEffect } from 'react';
import '../cssBase/Header.css';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Badge, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; 
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from "axios";
import API from "./App";

const Header = () => {
  const count = useSelector((state) => state.counter.value);
  const [auth, setAuth] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null); // Added for mobile dropdown state
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:770px)');

  const menuOptions = [
    { label: "Home", options: [] },
    { label: 'Shakha Pola', options: ["Daily Use Sakha", "Narrow Sakha", "Bracelet Sakha Pola"] },
    { label: 'Sankh', options: ['Jol Shankh', 'Blowing Shankh'] },
    { label: 'HandCraft', options: ['Our Story', 'Team', 'Careers'] },
    { label: "Worship Items", options: ["Daily Essentials Puja Items", "Musical Instruments"] },
    { label: 'More', options: ['x', 'y', 'z'] },
  ];

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMobileDropdownToggle = (index) => { // Function for toggling mobile menu dropdown
    setActiveMobileDropdown(activeMobileDropdown === index ? null : index);
  };

  useEffect(() => {
    setAuth(sessionStorage.getItem('email') == null);
  }, []);

   // Logout API call function
   const handleLogout = async () => {
    try {
      const email = sessionStorage.getItem('email'); // You should fetch the actual logged-in user's email from session storage or state

      //delete axios.defaults.headers['Authorization'];
      // Send a POST request to the backend for logging out the user
      const response = await API.post('auth/logout', { email });

      if (response.status === 200) {
        // On successful logout, clear session storage and update authentication state
        sessionStorage.clear();
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
  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shri Radha Shankha Mahal
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') console.log('Search triggered');
              }}
              sx={{ width: '200px', marginRight: '16px' }}
            />

            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (auth) navigate('/login');
                else {
                  handleLogout();
                }
              }}
              sx={{ marginRight: '16px' }}
            >
              {auth ? 'Login' : 'Logout'}
            </Button>

            <IconButton onClick={() => navigate('/cart')}>
              <Badge badgeContent={count} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton size="large" onClick={() => navigate('/account')} color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: isSmallScreen ? 'none' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          backgroundColor: '#f4f4f4',
          padding: '8px',
        }}
      >
        {menuOptions.map((menu, index) => (
          <Box key={menu.label} sx={{ margin: '0 16px', position: 'relative' }}>
            <Button
              variant="text"
              color="primary"
              onClick={() => {
                if (menu.options.length === 0) {
                  navigate('/');
                } else {
                  handleDropdownToggle(index);
                }
              }}
            >
              {menu.label}
              {menu.options.length > 0 && (
                <ArrowDropDownIcon sx={{ marginLeft: '8px', fontSize: '18px' }} />
              )}
            </Button>
            {activeDropdown === index && menu.options.length > 0 && (
              <Box sx={{ position: 'absolute', background: '#fff', boxShadow: 1, borderRadius: 1, zIndex:999 }}>
                {menu.options.map((option, optionIndex) => (
                  <Box
                    key={optionIndex}
                    sx={{ padding: '8px', cursor: 'pointer', '&:hover': { background: '#ddd' } }}
                    onClick={() => {
                      navigate('/categories', { state: { categoryName: option } });
                      setActiveDropdown(null);
                    }}
                  >
                    {option}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* {isSmallScreen && (
        <IconButton sx={{ position: 'fixed', top: 8, left: 8, zIndex: 1000 }} onClick={toggleMenu}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )} */}

{isSmallScreen && (
  <IconButton 
    sx={menuOpen ?  { 
      position: 'relative', 
      left: '11.25rem',  // Converted from 180px
      top: '-7.5rem',    // Converted from -120px
      zIndex: 1000 
    }:{ position: 'fixed', top: 8, left: 8, zIndex: 1000 } }  
    onClick={toggleMenu}
  >
    {menuOpen ? <CloseIcon /> : <MenuIcon />}
  </IconButton>
)}


      {menuOpen && isSmallScreen && (
        <Box
          sx={{
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '45%', // Changed width to fit the menu better on small screens
            zIndex: 999,
            height: '100%',
            flexDirection: 'column',
            backgroundColor: '#f4f4f4',
            padding: '8px',
          }}
        >
          {menuOptions.map((menu, index) => (
            <Box key={menu.label} sx={{ margin: '0 16px' }}>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  if (menu.options.length === 0) {
                    navigate('/');
                    setMenuOpen(false);
                  } else {
                    handleMobileDropdownToggle(index); // Toggle mobile dropdown
                  }
                }}
              >
                {menu.label}
                {menu.options.length > 0 && (
                <ArrowDropDownIcon sx={{ marginLeft: '8px', fontSize: '18px' }} />
              )}
              </Button>
              {activeMobileDropdown === index && menu.options.length > 0 && (
                <Box sx={{ background: '#fff', boxShadow: 1, borderRadius: 1, zIndex:999 }}>
                  {menu.options.map((option, optionIndex) => (
                    <Box
                      key={optionIndex}
                      sx={{ padding: '8px', cursor: 'pointer', '&:hover': { background: '#ddd' } }}
                      onClick={() => {
                        navigate('/categories', { state: { categoryName: option } });
                        setMenuOpen(false);
                        setActiveMobileDropdown(null); // Close mobile dropdown after selection
                      }}
                    >
                      {option}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Header;

