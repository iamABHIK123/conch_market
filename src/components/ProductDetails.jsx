import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, Grid, Typography, Button, Card, CardContent, CardMedia, Rating 
} from '@mui/material';
import API from "./App";

const apiEndpoint = 'http://localhost:9090/products'; // API endpoint to get product details

const ProductDetails = () => {
  const { state } = useLocation(); // Get productId from the route state
  const productId = state?.productId;

//   const [searchParams] = useSearchParams();
// const productId = searchParams.get('productId');

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantities, setQuantities] = useState({});
  const [user, setUser] = useState(null);
   //console.log('category name redirected-', categoryName);
  // Fetch User ID on Mount
  useEffect(() => {
    const email = localStorage.getItem("email");
    console.log('product cart email is-', email);
    const fetchUserId = async () => {
      try {
       // console.log('user effect is called');
        const response = await API.get(`users/${email}`);
        console.log('user response is-', response.data);
        setUser(response.data);
        console.log("user value is-",user);
        //console.log('userId is-', response);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };
    fetchUserId();
  }, []);

  // Log user when it updates
useEffect(() => {
  console.log("Updated user state:", user);
}, [user]);
  // Fetch product details by productId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await API.get(`/products/${productId}`);
        setProduct(response.data);
        setSelectedImage(response.data.imageUrl); // Set the initial image
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details.');
        setLoading(false);
      }
    };

    if (productId) fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <Typography variant="h6">Loading product details...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const handleAddToCart = async (product) => {
    try {
      console.log(product);
      console.log("Product cart is called");
      const quantity = quantities[product.id] || 1;
      const response = await API.post("/cart/items", {
        productId: product.id,
        quantity,
        user
      });
      //TO DO: SMART ALERT 
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Increment Product Quantity
  const handleIncrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,
    }));
  };

  // Decrement Product Quantity
  const handleDecrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
    }));
  };

  // Destructure product details from the product object
  const { 
    name, 
    price, 
    description, 
    category, 
    discount, 
    imageUrl, 
    createdAt, 
    modifiedAt 
  } = product;

  const discountPercent = discount?.discountPercent || 0;
  const discountedPrice = price - (price * discountPercent) / 100;

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={`../public/${category}/${selectedImage}`}
              alt={name}
            />
          </Card>
        </Grid>

        {/* Product Information Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {name}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Category: {category}
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            Created At: {new Date(createdAt).toLocaleDateString()}
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            Last Modified: {new Date(modifiedAt).toLocaleDateString()}
          </Typography>

          <Typography variant="h5" sx={{ mt: 2, color: 'primary.main' }}>
            Price: ${discountPercent > 0 ? discountedPrice.toFixed(2) : price.toFixed(2)}{' '}
            {discountPercent > 0 && (
              <Typography
                component="span"
                variant="body2"
                sx={{ textDecoration: 'line-through', ml: 1 }}
              >
                ${price.toFixed(2)}
              </Typography>
            )}
          </Typography>

          {discountPercent > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Discount: {discount.name} - {discountPercent}%
            </Typography>
          )}

          <Typography variant="body1" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <div className="input-group mb-3">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleDecrement(product.id)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantities[product.id] || 1}
                    readOnly
                    className="form-control"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleIncrement(product.id)}
                  >
                    +
                  </button>
                </div>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }} onClick={() => handleAddToCart(product)}>
              Add to Cart
            </Button>
            <Button variant="contained" color="secondary" size="large">
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
