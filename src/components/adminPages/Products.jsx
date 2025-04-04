// import React, { useEffect, useState } from 'react';
// import {
//   Modal,
//   Button,
//   TextField,
//   Box,
//   Typography,
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   IconButton,
//   Paper
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import API from "../App";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [refreshProducts, setRefreshProducts] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await API.get("/products");
//         setProducts(response.data);
//       } catch (err) {
//         setError("Failed to fetch products.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setOpen(true);
//   };

//   const handleAdd = () => {
//     setSelectedProduct({ name: '', description: '', price: '', category: '', imageData: null });
//     setOpen(true);
//   };

//   const handleDelete = async (productId) => {
//     try {
//       await API.delete(`/auth/admin/products/${productId}`);
//       setProducts(products.filter((product) => product.id !== productId));
//       alert('Product deleted successfully!');
//     } catch (error) {
//       alert('Failed to delete product!');
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("product", new Blob([JSON.stringify(selectedProduct)], { type: "application/json" }));
      
//       if (selectedProduct.imageData) {
//         formData.append("file", selectedProduct.imageData);
//       }

//       const config = {
//         headers: { "Content-Type": "multipart/form-data" }
//       };

//       if (selectedProduct.id) {
//         console.log(selectedProduct.id);
//         await API.put(`/auth/admin/products/updateProduct`, formData, config);
//       } else {
//         await API.post('/auth/admin/products', formData, config);
//       }
      
//       setOpen(false);
//       setRefreshProducts((prev) => !prev); // Trigger refetch
//     } catch (error) {
//       console.log(error);
//       alert('Failed to save product!');
//     }
//   };

//   return (
//     <div className="products-table">
//       <h2>Products List</h2>
//       <Button variant="contained" color="primary" onClick={handleAdd}>Add Product</Button>
      
//       <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell>{product.name}</TableCell>
//                 <TableCell>{product.description}</TableCell>
//                 <TableCell>{product.price}</TableCell>
//                 <TableCell>{product.category}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEdit(product)} color="primary">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(product.id)} color="secondary">
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           component="div"
//           count={products.length}
//           page={page}
//           onPageChange={(event, newPage) => setPage(newPage)}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
//         />
//       </TableContainer>
      
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Container maxWidth="sm" sx={{ padding: '2rem', backgroundColor: 'white', marginTop: '5%' }}>
//           <Typography variant="h5">{selectedProduct && selectedProduct.id ? 'Edit Product' : 'Add Product'}</Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField label="Name" fullWidth margin="normal" value={selectedProduct?.name || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} />
//             <TextField label="Description" fullWidth margin="normal" value={selectedProduct?.description || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })} />
//             <TextField label="Price" fullWidth margin="normal" type="number" value={selectedProduct?.price || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} />
//             <TextField label="Category" fullWidth margin="normal" value={selectedProduct?.category || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })} />
//             <Button variant="contained" component="label" sx={{ marginTop: '1rem' }}>
//               Upload Image
//               <input type="file" accept="image/*" hidden onChange={(e) => setSelectedProduct({ ...selectedProduct, imageData: e.target.files[0] })} />
//             </Button>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
//               <Button type="submit" variant="contained" color="primary">Save</Button>
//               <Button onClick={() => setOpen(false)} variant="outlined" color="secondary">Cancel</Button>
//             </Box>
//           </form>
//         </Container>
//       </Modal>
//     </div>
//   );
// };

// export default Products;

import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import API from "../App";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Changed from 5 to 10

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        console.log("Fetched products:", response.data); // Debugging line
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct({ name: '', description: '', price: '', category: '', imageData: null });
    setOpen(true);
  };

  const handleDelete = async (productId) => {
    try {
      await API.delete(`/auth/admin/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      alert('Failed to delete product!');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("product", new Blob([JSON.stringify(selectedProduct)], { type: "application/json" }));
      
      if (selectedProduct.imageData) {
        formData.append("file", selectedProduct.imageData);
      }

      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };

      if (selectedProduct.id) {
        console.log(selectedProduct.id);
        await API.put(`/auth/admin/products/updateProduct`, formData, config);
      } else {
        await API.post('/auth/admin/products', formData, config);
      }
      
      setOpen(false);
      setRefreshProducts((prev) => !prev); // Trigger refetch
    } catch (error) {
      console.log(error);
      alert('Failed to save product!');
    }
  };

  return (
    <div className="products-table">
      <h2>Products List</h2>
      <Button variant="contained" color="primary" onClick={handleAdd}>Add Product</Button>
      
      <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={products.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
          rowsPerPageOptions={[10, 25, 50, 100]} // Ensure valid options
        />
      </TableContainer>
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <Container maxWidth="sm" sx={{ padding: '2rem', backgroundColor: 'white', marginTop: '5%' }}>
          <Typography variant="h5">{selectedProduct && selectedProduct.id ? 'Edit Product' : 'Add Product'}</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Name" fullWidth margin="normal" value={selectedProduct?.name || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} />
            <TextField label="Description" fullWidth margin="normal" value={selectedProduct?.description || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })} />
            <TextField label="Price" fullWidth margin="normal" type="number" value={selectedProduct?.price || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} />
            <TextField label="Category" fullWidth margin="normal" value={selectedProduct?.category || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })} />
            <Button variant="contained" component="label" sx={{ marginTop: '1rem' }}>
              Upload Image
              <input type="file" accept="image/*" hidden onChange={(e) => setSelectedProduct({ ...selectedProduct, imageData: e.target.files[0] })} />
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Button type="submit" variant="contained" color="primary">Save</Button>
              <Button onClick={() => setOpen(false)} variant="outlined" color="secondary">Cancel</Button>
            </Box>
          </form>
        </Container>
      </Modal>
    </div>
  );
};

export default Products;