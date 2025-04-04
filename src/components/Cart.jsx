import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Box, Container, Typography, Button, IconButton, TextField, Divider, Card, CardContent, CardMedia 
} from "@mui/material";
import { Add, Remove, Delete, RemoveShoppingCart } from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux';
import { incrementByAmount } from '../features/counter/counterSlice'
import API from "./App";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [productsDetails, setProductsDetails] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const deliveryCharges = 5;
  const [totalAmount, setTotalAmount] = useState(0);
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      API.get(`/users/${email}`).then(response => {
        setUserId(response.data.id);
      }).catch(error => console.error("Error fetching userId:", error));
    }
  }, []);

  useEffect(() => { 
    API.get("/cart/items", { withCredentials: true }).then(response => {
      setCartItems(response.data);
      dispatch(incrementByAmount(response.data?.length))
    }).catch(error => console.error("Error fetching cart items:", error));
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      const fetchProductDetails = async () => {
        const productDetails = await Promise.all(
          cartItems.map(async (item) => {
            const response = await API.get(`/products/${item.productId}`);
            return response.data;
          })
        );
        setProductsDetails(productDetails);

        let subtotalAmount = 0;
        productDetails.forEach((product, index) => {
          subtotalAmount += product.price * cartItems[index].quantity;
        });

        setSubtotal(subtotalAmount);
        setTotalAmount(subtotalAmount + deliveryCharges);
      };
      fetchProductDetails();
    }
  }, [cartItems]);

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await API.post(`/cart/items/quantity`, { productId, quantity, userId });
      setCartItems(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await API.delete(`/cart/items/${productId}/${userId}`);
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", p: 3 }}>
      <Container>
        <Typography variant="h4" gutterBottom>Your Cart</Typography>
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <RemoveShoppingCart sx={{ fontSize: 100, color: "gray" }} />
            <Typography variant="h6">Your cart is empty.</Typography>
          </Box>
        ) : (
          <>
            {productsDetails.map((product, index) => (
              <Card key={product.id} sx={{ display: "flex", alignItems: "center", mb: 2, p: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120, borderRadius: 2 }}
                  image={`${product.imageUrl}`}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="text.secondary">Price: ${product.price.toFixed(2)}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton onClick={() => handleUpdateQuantity(product.id, cartItems[index].quantity - 1)}>
                      <Remove />
                    </IconButton>
                    <TextField
                      value={cartItems[index]?.quantity || 0}
                      inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                      sx={{ width: 50, mx: 1 }}
                    />
                    <IconButton onClick={() => handleUpdateQuantity(product.id, cartItems[index].quantity + 1)}>
                      <Add />
                    </IconButton>
                  </Box>
                  <IconButton color="error" onClick={() => handleRemoveItem(product.id)} sx={{ mt: 2 }}>
                    <Delete /> Remove
                  </IconButton>
                </CardContent>
              </Card>
            ))}
            <Card sx={{ p: 2, mt: 3 }}>
              <Typography variant="h6">Order Summary</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">Subtotal: ${subtotal.toFixed(2)}</Typography>
              <Typography variant="body1">Delivery Charges: ${deliveryCharges.toFixed(2)}</Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>Total: ${totalAmount.toFixed(2)}</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={() => navigate("/checkoutForm", {
                  state: {
                    qty: cartItems.length,
                    items: subtotal,
                    deliveryFees: deliveryCharges,
                    total: totalAmount,
                  },
                })}
              >
                Proceed to Checkout
              </Button>
            </Card>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
