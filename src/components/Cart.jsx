import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import {
  Box, Grid, Card, CardContent, CardMedia, Typography,
  Button, IconButton, TextField, Divider, Container
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../features/counter/counterSlice'
const cartItemsEndpoint = "http://localhost:9090/cart/items";
const userEndpoint = "http://localhost:9090/users";
import { useThrottle } from "../utility/useThrottle"

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [productsDetails, setProductsDetails] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [quantityCart,setQuantityCart]= useState({});
  const deliveryCharges = 5;
  const [totalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tempQuantity, setTempQuantity] = useState(0);
  //const [debouncedQuantity, setDebouncedQuantity] = useState(tempQuantity);
  const count = useSelector((state) => state.counter.value);
  
  const dispatch = useDispatch();

  const addToCartEndpoint = "http://localhost:9090/cart/items";
  // API to store USER data 
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${userEndpoint}/${email}`);
        setUser(response.data);

        console.log('userId is in cart component-',response.data.id);
        setUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };
    fetchUserId();
  }, []);

  // Fetch cart items on initial render
  useEffect(() => { 
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(cartItemsEndpoint, { withCredentials: true });
        setCartItems(response.data);
        setQuantityCart(response.data);
        // add value into redux
        console.log(response.data?.length);
        dispatch(incrementByAmount(response.data?.length))
        
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [tempQuantity]);

  // Fetch product details whenever cart items change
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productIds = cartItems.map((item) => item.productId);
        
        console.log(cartItems);
        const productDetailsPromises = productIds.map(async (productId) => {
          const response = await axios.get(`http://localhost:9090/products/${productId}`);
          return response.data;
        });

        const productDetails = await Promise.all(productDetailsPromises);
        setProductsDetails(productDetails);
        
        // Calculate subtotal and total
        let subtotalAmount = 0;
        productDetails.forEach((product, index) => {
          subtotalAmount += product.price * cartItems[index].quantity;
        });

        setSubtotal(subtotalAmount);
        setTotalAmount(subtotalAmount + deliveryCharges);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchProductDetails();
    }
  }, [cartItems,quantityCart]);

  // Handle quantity update with throttling 
  const handleUpdateQuantity =  useThrottle(async (productId,quantity) => {
    console.log('handleUpdateQuantity details are-', productId,quantity,user);
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:9090/cart/items/quantity`, {
        productId,
        quantity,
        user
      },{
        headers: {Authorization:`Bearer ${token}`}
      });
      setTempQuantity(quantity);
      //TO DO: SMART ALERT 
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  },1000);

  const handleRemoveItem = async (productId) => {
    console.log("before remove", productId);
  
    try {
      const response = await axios.delete(`http://localhost:9090/cart/items/${productId}/${userId}`);
      if(response.status==204)console.log("CartItem deleted");
      
    } catch (error) {
      console.log("Error occurred:", error.response ? error.response.data : error.message);
    }
  
    // Update the state
    let updatedCart = cartItems?.filter((obj) => obj?.productId !== productId);
    setQuantityCart(updatedCart);
    setCartItems(updatedCart);
  
    console.log("after remove", updatedCart);
  }
  

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5",  }}>
      <Container maxWidth="100vw" >
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>

        {sessionStorage.getItem("email") == null || productsDetails.length === 0 ? (
          <Typography variant="h6">Your cart is empty.</Typography>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                {productsDetails?.map((product, index) => (
                  <Grid item xs={12} md={6} key={product.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={`../public/${product.category}/${product.imageUrl}`}
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography color="text.secondary">
                          Price: ${product?.price?.toFixed(2)}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <IconButton
                            onClick={() =>
                              cartItems[index] &&
                              handleUpdateQuantity(product.id, cartItems[index].quantity - 1)
                            }
                          >
                            <Remove />
                          </IconButton>

                          <TextField
                            value={cartItems[index]?.quantity || 0}
                            inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                            sx={{ width: 50, mx: 1 }}
                          />

                          <IconButton
                            onClick={() =>
                              cartItems[index] &&
                              handleUpdateQuantity(product.id, cartItems[index].quantity + 1)
                            }
                          >
                            <Add />
                          </IconButton>

                        </Box>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(product.id)}
                          sx={{ mt: 2 }}
                        >
                          <Delete /> Remove
                        </IconButton>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Subtotal: ${(product?.price * cartItems[index]?.quantity).toFixed(2)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6">Order Summary</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">Subtotal: ${subtotal.toFixed(2)}</Typography>
                <Typography variant="body1">Delivery Charges: ${deliveryCharges.toFixed(2)}</Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Total: ${totalAmount.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() =>
                    navigate("/checkoutForm", {
                      state: {
                        qty: cartItems.length,
                        items: subtotal,
                        deliveryFees: deliveryCharges,
                        total: totalAmount,
                      },
                    })
                  }
                >
                  Proceed to Checkout
                </Button>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
