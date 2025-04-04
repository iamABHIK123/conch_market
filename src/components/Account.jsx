import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import OrderIcon from '@mui/icons-material/ShoppingBag';
import CouponIcon from '@mui/icons-material/LocalOffer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import SellerDetails from './SellerDetails';
import API from "./App";
import { CenterFocusStrong } from '@mui/icons-material';
 // Import Footer component

export default function Account() {
  const [user, setUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (localStorage.getItem('email') !== null) {
        try {
          const email = localStorage.getItem('email');
          const token = localStorage.getItem('token');
          const response = await API.get(`/users/${email}`);
          if (response.status === 200) {
            const userData = {
              name: `${response.data.firstName} ${response.data.lastName}`,
              email: response.data.email,
              profilePicture: 'https://via.placeholder.com/150',
              address: '123 Main St, Springfield, USA',
            };
            setUser(userData);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }

        try {
          const response = await API.get(`/api/discounts`);
          if (response.status === 200 && Array.isArray(response.data)) {
            const fetchedCoupons = response.data.map((coupon) => ({
              id: coupon.id,
              code: coupon.name,
              discount: coupon.discountPercent,
            }));
            setCoupons(fetchedCoupons);
          } else {
            console.error('Failed to fetch discount data');
          }
        } catch (error) {
          console.error('Error fetching discount data:', error);
        }
      } else {
        const userData = {
          name: 'please sign in',
          email: 'please sign in',
          profilePicture: 'https://via.placeholder.com/150',
          address: '123 Main St, Springfield, USA',
        };
        setUser(userData);
      }
    };

    fetchUserDetails();
  }, []);

  const dummyOrderHistory = [
    { id: 1, total: 50.99 },
    { id: 2, total: 99.49 },
    { id: 3, total: 75.0 },
  ];

  useEffect(() => {
    setOrderHistory(dummyOrderHistory);
  }, []);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box display="flex" alignItems="center">
            <Avatar alt={user.name} src={user.profilePicture} sx={{ width: 56, height: 56, mr: 2 }} />
            <Box>
              <Typography variant="h5">{user.name}</Typography>
              <Typography color="textSecondary">{user.email}</Typography>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="order-history-header">
              <Typography variant="h6">Order History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {orderHistory.map((order) => (
                  <React.Fragment key={order.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <OrderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Order #${order.id}`} secondary={`Total: $${order.total}`} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="coupons-header">
              <Typography variant="h6">Coupons</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {coupons.map((coupon) => (
                  <React.Fragment key={coupon.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <CouponIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={coupon.code} secondary={`Discount: ${coupon.discount}%`} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Container>
      {/* <div style={{display:'flex',justifyContent:'CenterFocusStrong'}}> */}
        <SellerDetails /> {/* Add Footer here */}
      {/* </div> */}
     
    </>
  );
}
