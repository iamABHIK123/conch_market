// import React, { useState } from 'react';
// import { 
//   Box, Grid, Typography, Button, Rating, Card, CardContent, CardMedia 
// } from '@mui/material';

// const ProductDetails = ({ product }) => {
//   // Destructure product details from props
//   const { name, price, description, rating, mainImage, thumbnailImages, reviews, relatedProducts } = product;

//   // State to manage the selected image
//   const [selectedImage, setSelectedImage] = useState(mainImage);

//   return (
//     <Box sx={{ p: 4 }}>
//       <Grid container spacing={4}>
//         {/* Product Image Section */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardMedia
//               component="img"
//               height="400"
//               image={selectedImage}
//               alt="Product Image"
//             />
//           </Card>

//           {/* Thumbnails */}
//           <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
//             {thumbnailImages.map((img, index) => (
//               <Card key={index} sx={{ maxWidth: 80, cursor: 'pointer' }} onClick={() => setSelectedImage(img)}>
//                 <CardMedia
//                   component="img"
//                   height="80"
//                   image={img}
//                   alt={`Thumbnail ${index + 1}`}
//                 />
//               </Card>
//             ))}
//           </Box>
//         </Grid>

//         {/* Product Information Section */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h4" gutterBottom>
//             {name}
//           </Typography>
//           <Rating name="read-only" value={rating} readOnly size="large" />
//           <Typography variant="h5" sx={{ mt: 2, color: 'primary.main' }}>
//             ${price}
//           </Typography>
//           <Typography variant="body1" sx={{ mt: 2 }}>
//             {description}
//           </Typography>

//           <Box sx={{ mt: 4 }}>
//             <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
//               Add to Cart
//             </Button>
//             <Button variant="contained" color="secondary" size="large">
//               Buy Now
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>

//       {/* Reviews Section */}
//       <Box sx={{ mt: 6 }}>
//         <Typography variant="h5" gutterBottom>
//           Customer Reviews
//         </Typography>
//         {reviews.map((review, index) => (
//           <Box key={index} sx={{ mt: 3 }}>
//             <Typography variant="h6">{review.name}</Typography>
//             <Rating name="read-only" value={review.rating} readOnly />
//             <Typography variant="body2" sx={{ mt: 1 }}>
//               {review.comment}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       {/* Related Products Section */}
//       <Box sx={{ mt: 6 }}>
//         <Typography variant="h5" gutterBottom>
//           Related Products
//         </Typography>
//         <Grid container spacing={4} sx={{ mt: 2 }}>
//           {relatedProducts.map((relatedProduct, index) => (
//             <Grid key={index} item xs={12} sm={6} md={4}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={relatedProduct.image}
//                   alt={relatedProduct.name}
//                 />
//                 <CardContent>
//                   <Typography variant="h6">{relatedProduct.name}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     ${relatedProduct.price}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, Grid, Typography, Button, Card, CardContent, CardMedia, Rating 
} from '@mui/material';

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

  // Fetch product details by productId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/${productId}`);
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

          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
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
