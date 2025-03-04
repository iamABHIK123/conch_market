import React from 'react';
import { Box, Typography, Link, List, ListItem } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';

const SellerDetails = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection:"column",
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: '20px 10px',
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #ddd',
        fontSize: '15px'
      }}
    >
      <div style={{ display: 'flex',
        flexDirection:"row",justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: '20px 10px',
        paddingLeft: '6.30rem'}}>
      {/* Section 1: About */}
      <Box sx={{ width: '30%', paddingLeft: '2%' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Welcome to P K Sons Enterprise
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          PK Sons® is the Manufacturer of the shakha, sankh. Shakha is the traditional set for Bengali culture. Latest design and unique collection.
        </Typography>
        <List>
          <ListItem>
            Email: <Link href="mailto:p.ksons.enterprises@gmail.com">p.ksons.enterprises@gmail.com</Link>
          </ListItem>
          <ListItem>
            Phone No.: <Link href="tel:9609897989">9609897989</Link>
          </ListItem>
        </List>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <FacebookIcon color="primary" />
          <YouTubeIcon sx={{ color: '#FF0000' }} />
          <PinterestIcon sx={{ color: '#BD081C' }} />
        </Box>
      </Box>

      {/* Section 2: Services */}
      <Box >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Services
        </Typography>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1, // Reduce the gap between list items
            padding: 0, // Remove default padding
            margin: 0,  // Remove default margin
          }}
        >
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>FAQs</ListItem>
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>Contact Us</ListItem>
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>Location</ListItem>
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>Return & Refund</ListItem>
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>Shipping Policies</ListItem>
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>Privacy Policy</ListItem>
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>Terms & Conditions</ListItem>
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>About Us</ListItem>
        </List>
      </Box>

      {/* Section 3: Quick Links */}
      <Box >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Quick Links
        </Typography>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1, // Reduce the gap between list items
            padding: 0, // Remove default padding
            margin: 0,  // Remove default margin
          }}>
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>My Account</ListItem>
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>My Order</ListItem>
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>My Wishlist</ListItem>
          <ListItem sx={{ padding: 0, listStyle: 'none' }}>My Address</ListItem>
        </List>
      </Box>
     </div>
      {/* Copyright */}
      <div style={{paddingLeft:"12rem"}}>
      <Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          © Copyright 2020-2024 All rights reserved by PK Sons®
        </Typography>
      </Box>
      </div>
    </Box>
  );
};

export default SellerDetails;
