import React, { useState, useEffect } from 'react';
import {
  Box, Grid, TextField, Button, Typography, Container, Paper, Select, MenuItem,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const userEndpoint = "http://localhost:9090/users"; // Replace with your API endpoint

const CheckoutForm = () => {
  const [userId, setUserId] = useState(null);
  const location = useLocation();
  const { qty, items, deliveryFees, total } = location.state || {
    qty: 0, items: 0, deliveryFees: 0, total: 0
  };

  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    country: 'India', address: '', city: '', region: 'Bihar', postalCode: ''
  });

  // Fetch userId based on email from session storage
  useEffect(() => {
    const email = sessionStorage.getItem('email');
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${userEndpoint}/${email}`);
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };
    fetchUserId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userAddress = {
      phoneNo: formData.phone, country: formData.country, addressLine: formData.address,
      city: formData.city, region: formData.region, postalCode: formData.postalCode, userId: userId
    };

    try {
      const response = await axios.post("http://localhost:9090/api/addresses", userAddress);
      console.log("Address saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const orderPay = async () => {
    console.log("Order payment is called");
    try {
      const email = sessionStorage.getItem("email");
      const response = await axios.post("http://localhost:9090/create-order", {
        receipt: email,
        amount: total * 100, // amount in paise
      });
      
      // Check if the order creation was successful
      const { id: order_id } = response.data;
      console.log('Order response:', response.data);
      
      if (response.data.status === "created") {  // Use === for comparison
        const options = {
          key: "rzp_test_vlzU641yFwMRUx",  // Razorpay key
          amount: total * 100,
          currency: "INR",
          name: "Conch Market",
          description: "eCommerce Payment",
          order_id: order_id,
          handler: (paymentResponse) => {
            console.log(paymentResponse);
            swal("Payment is successful!");
          },
          prefill: { name: `${formData.firstName} ${formData.lastName}`, email: formData.email, contact: formData.phone },
          notes: { address: formData.address },
          theme: { color: "#3399cc" },
        };
        
        const rzp1 = new window.Razorpay(options);
  
        rzp1.on("Payment failed", function(paymentResponse) {
          console.log(paymentResponse);
          swal("Oops! Payment failed");
        });
  
        rzp1.open();
      }
  
    } catch (error) {
      console.error("Error processing payment:", error);
      swal("There was an error processing your payment. Please try again.");
    }
  };
  

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>Checkout Page</Typography>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Customer Details</Typography>
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                label="Email" name="email" value={formData.email}
                onChange={handleChange} fullWidth required sx={{ mb: 2 }}
              />
              <TextField
                label="First Name" name="firstName" value={formData.firstName}
                onChange={handleChange} fullWidth required sx={{ mb: 2 }}
              />
              <TextField
                label="Last Name" name="lastName" value={formData.lastName}
                onChange={handleChange} fullWidth required sx={{ mb: 2 }}
              />
              <TextField
                label="Phone" name="phone" value={formData.phone}
                onChange={handleChange} fullWidth required sx={{ mb: 2 }}
              />
            </form>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Delivery Details</Typography>
            <form onSubmit={handleSubmit}>
              <Select
                name="country" value={formData.country}
                onChange={handleChange} fullWidth required sx={{ mb: 2 }}
              >
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                <MenuItem value="Nepal">Nepal</MenuItem>
              </Select>
              <TextField
                label="Address" name="address" value={formData.address}
                onChange={handleChange} fullWidth required sx={{ mb: 2 }}
              />
              <TextField
                label="City" name="city" value={formData.city}
                onChange={handleChange} fullWidth required sx={{ mb: 2 }}
              />
              <TextField
                label="Region" name="region" value={formData.region}
                onChange={handleChange} fullWidth required sx={{ mb: 2 }}
              />
              <TextField
                label="Postal Code" name="postalCode" value={formData.postalCode}
                onChange={handleChange} fullWidth required sx={{ mb: 2 }}
              />
              {/* <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Continue</Button> */}
            </form>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>Order Summary ({qty} items)</Typography>
          <Typography>Items: ₹{items.toFixed(2)}</Typography>
          <Typography>Delivery: ₹{deliveryFees.toFixed(2)}</Typography>
          <Typography>Sales Tax: ₹0.00</Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>Total: ₹{total.toFixed(2)}</Typography>
          <Button onClick={orderPay} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Proceed to Payment
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CheckoutForm;
