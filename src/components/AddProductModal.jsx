// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Box,
//   Typography,
//   Modal,
//   IconButton,
// } from "@mui/material";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import UploadIcon from '@mui/icons-material/Upload';
// import axios from "axios";

// const AddProductModal = () => {
//   const [open, setOpen] = useState(false);
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     imageUrl: "d1.jpg",
//     category: "",
//     price: "",
//     createdAt: "",
//     modifiedAt: "",
//     discountId: "1",
//   });

//   const categories = ["Electronics", "Fashion", "Home Decor", "Books", "Sports"]; // Example categories

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:9090/products", product, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       alert("Product added successfully!");
//       console.log(response.data);
//       setProduct({
//         name: "",
//         description: "",
//         imageUrl: "d1.jpg",
//         category: "",
//         price: "",
//         createdAt: "",
//         modifiedAt: "",
//         discountId: "1",
//       });
//       handleClose(); // Close the modal after submission
//     } catch (error) {
//       console.error("Error adding product:", error.message);
//       alert("Failed to add product. Please try again.");
//     }
//   };

//   return (
//     <Box>
//       {/* Button to open the modal */}
//       <IconButton color="primary" onClick={handleOpen}>
//         <AddCircleIcon fontSize="large" />
//       </IconButton>

//       {/* Modal for the form */}
//       <Modal open={open} onClose={handleClose} aria-labelledby="add-product-modal">
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             maxWidth: 600,
//             margin: "auto",
//             marginTop: "10%",
//             backgroundColor: "white",
//             borderRadius: 2,
//             boxShadow: 3,
//             padding: 3,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Add New Product
//           </Typography>

//           <TextField
//             label="Product Name"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             required
//             fullWidth
//           />

//           <TextField
//             label="Description"
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             required
//             multiline
//             rows={3}
//             fullWidth
//           />

//           <TextField
//             label="Image URL"
//             name="imageUrl"
//             value={product.imageUrl}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             select
//             label="Category"
//             name="category"
//             value={product.category}
//             onChange={handleChange}
//             required
//             fullWidth
//           >
//             {categories.map((cat, index) => (
//               <MenuItem key={index} value={cat}>
//                 {cat}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             label="Price"
//             name="price"
//             type="number"
//             value={product.price}
//             onChange={handleChange}
//             required
//             fullWidth
//             InputProps={{ inputProps: { min: 0, step: 0.01 } }}
//           />

//           <TextField
//             label="Created At"
//             name="createdAt"
//             type="datetime-local"
//             value={product.createdAt}
//             onChange={handleChange}
//             required
//             fullWidth
//             InputLabelProps={{ shrink: true }}
//           />

//           <TextField
//             label="Modified At"
//             name="modifiedAt"
//             type="datetime-local"
//             value={product.modifiedAt}
//             onChange={handleChange}
//             fullWidth
//             InputLabelProps={{ shrink: true }}
//           />

//           <TextField
//             label="Discount ID"
//             name="discountId"
//             type="number"
//             value={product.discountId}
//             onChange={handleChange}
//             fullWidth
//           />

//           <Box display="flex" justifyContent="space-between">
//             <Button onClick={handleClose} color="secondary" variant="outlined">
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" color="primary">
//               Add Product
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default AddProductModal;
