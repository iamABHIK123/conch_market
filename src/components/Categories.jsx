import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../cssBase/Categories.css";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from '@mui/icons-material/Upload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { Modal, Box, Typography, Button } from "@mui/material";

const apiEndpoint = "http://localhost:9090/products";
const addToCartEndpoint = "http://localhost:9090/cart/items";
const userEndpoint = "http://localhost:9090/users";

export default function Categories() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const token=sessionStorage.getItem("token");

  const [openUploader, setOpenUploader] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenUploader = () => setOpenUploader(true);
  const handleCloseUploader = () => setOpenUploader(false);

  const location = useLocation();
  const { categoryName } = location.state || {};
  console.log('category name redirected-', categoryName);
  // Fetch User ID on Mount
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${userEndpoint}/${email}`);
        setUser(response.data);
        console.log('userId is-', response.data.id);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };
    fetchUserId();
  }, []);

  // Fetch Products and Extract Categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get(apiEndpoint);
        console.log('category name redirected INSIDE LOOP-', categoryName);
        const response = await axios.get(`${apiEndpoint}/category/${categoryName.replace(/\s+/g, '').toLowerCase()}`);

        console.log('fetchData is called', response.data);
        setProducts(response.data);
        setCategories([...new Set(response.data.map((product) => product.category))]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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

  // Add Product to Cart
  const handleAddToCart = async (product) => {
    try {
      console.log(product);
      const quantity = quantities[product.id] || 1;
      const response = await axios.post(addToCartEndpoint, {
        productId: product.id,
        quantity,
        user
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // Attach JWT token
        }});
      //TO DO: SMART ALERT 
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  // Below method is wrong,fix it
  const handleRemoveItem = async (productId) => {
    try {
      console.log("ID will be deleted:", productId, user.id);

      const response = await axios.delete(`http://localhost:9090/cart/items/${productId}/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response data of handleRemoveItem:", response.data);
    } catch (error) {
      console.error(
        "Error in handleRemoveItem:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const handleSearch = async () => {
    if (searchText.trim()) {
      try {
        // Make an API call with the search text
        const response = await axios.get(`${apiEndpoint}/name/${searchText}`);
        console.log("Response data", response);
        const productId = response.data.id;
        if (productId > 0) {
          // const item = response.data[0]; // Assume API returns an array of items
          // console.log("navigateToDetails is called with productId:", productId);

          navigate("/productDetails", { state: { productId } });
          console.log("Enter into the main loop");
        } else {
          alert("Item not found!");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        alert("An error occurred while searching.");
      }
    }
  };

  // Navigate to Product Details Page with Product ID
  const navigateToDetails = (productId) => {
    -
    console.log("navigateToDetails is called with productId:", productId);
    navigate("/productDetails", { state: { productId } });
    //navigate(`/productDetails?productId=${product.id}`);
  };


  //-----------------------------------------------UPLOAD MAIN MODAL-------------------------------------------------------


  const [open, setOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [fileUrl, setFileUrl] = useState(null);

  const handleOpen = () => {
    console.log('handle open fun is called');
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      price: "",
    })
  };

  const [idToUpdate, setIdToUpdate] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    console.log(`Changing ${name} to ${value}`); // Debug log
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("---MODAL DATA---",formData);
    if (formName === "productForm") {
      // Add Product Logic
      const productData = {
        ...formData,
        // imageUrl: "d1.jpg", // Default value as per the Product class
        category: "dailyusesakha",
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        discountId: 1,
      };

      const formData1 = new FormData();
      console.log(formData1);
      // Append the file
      formData1.append("file", selectedImage); // 'file' matches the backend parameter name
      // Append the JSON data as a separate part
      console.log('first----', formData1.get("file"));

      formData1.append(
        "product",
        new Blob([JSON.stringify(productData)], { type: "application/json" })
      );
      
      console.log('first----', formData1.get("product"));
     // console.log('first----',formData1);
      // Send the request using axios
      try {
        console.log(formData1);
        const response = await axios.post("http://localhost:9090/products", formData1, {
          headers: {
            "Content-Type": "multipart/form-data", // Ensures correct boundary generation
          },
        });
        console.log("Product added successfully:", response.data);
        handleClose();
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      const productData = {
        id: idToUpdate,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category || "dailyusesakha",
        imageUrl: formData.imageUrl || "d1.jpg",
        createdAt: formData.createdAt || new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        discountId: formData.discountId || 1,
      };

      console.log("Payload being sent to backend:", productData);

      try {
        const response = await axios.post(
          "http://localhost:9090/products/updateProduct",
          productData
        );
        console.log("Product updated successfully:", response.data);
        setIdToUpdate(null);
        handleClose();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };



  const handleUpdation = async (product) => {
    // Populate the form with the product's data
    setFormData({
      name: product.name, // Assign product's name directly
      description: product.description, // Assign product's description directly
      price: product.price, // Assign product's price directly
      imageUrl: product.imageUrl
    });

    // Open the modal
    handleOpen();
  };

  const handleAddition = async () => {
    setFormName("AddFrom");

  }
  //deletion function (discoutn,order)
  const handleDeletion = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:9090/products/${productId}`);
      console.log("Product deleted successfully:", response.data);

      // Optionally, you can update your UI here
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting the product:", error);

      // Handle the error (e.g., display a message to the user)
      alert("Failed to delete the product. Please try again.");
    }
  };
  //----------------------------------------------------------------------------------------------


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      console.log("Uploading:", selectedImage);

      // Set the image URL directly in formData
      setFormData((prev) => ({
        ...prev,
        imageUrl: selectedImage.name, // Store the uploaded file name in formData
      }));

      handleCloseUploader();
    } else {
      alert("Please select an image to upload.");
    }
  };

  //----------------------------------------------------------------------------------------------
  // If no category is selected, show category cards; otherwise, show product cards.
  return (
    <div className="container-fluid mt-4">
      <h1>{selectedCategory ? selectedCategory : "Categories"}</h1>

      <div className="row">
        {products
          .map((product) => (
            <div key={product.id} className="col-6 col-md-4 mb-3">
              <div className="card">
                <img
                  src={`../public/${product.category}/${product.imageUrl}`}
                  className="card-img-top card-img-custom"
                  alt={product.name}
                />
                <div onClick={() => handleDeletion(product.id)}><DeleteForeverIcon /></div>
                <div onClick={() => { setFormName("UpdateFrom"); setIdToUpdate(product.id); handleUpdation(product); }}>Update</div>
                <div
                  className="card-body"
                  onClick={() => navigateToDetails(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: ${product.price.toFixed(2)}</p>
                </div>
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
                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        }

      </div>
      {/* ----------------------------------------ADDING NEW PRODUCTS--------------------------------------------*/}
      <div onClick={() => { 
        setFormName("productForm"); 
        handleOpen();
       }} 
        style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
        <AddIcon fontSize="large" style={{ color: "green" }} />
        <Typography variant="subtitle1" style={{ marginLeft: "8px" }}>
          Add Product
        </Typography>
      </div>

{/*------------------------------------------ Modal for adding a product ------------------------------------------------------*/}
      <Modal open={open} onClose={handleClose} aria-labelledby="add-product-modal">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 500,
            margin: "auto",
            marginTop: "10%",
            padding: 3,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {(formName === "productForm") ? "Add new Product" : "Update Product"}
          </Typography>

          <TextField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            required
          />
          <TextField
            label="Upload Image"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" onClick={handleOpenUploader} style={{ cursor: "pointer" }}>
                  <UploadIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
          />

          <Box display="flex" justifyContent="space-between">
            <Button onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </Button>

            <Button type="submit" variant="contained" color="primary">
              {(formName === "productForm") ? "Add Product" : "Update Product"}
            </Button>

          </Box>
        </Box>
      </Modal>

      {/* -------------------------------------------------------UPLOAD IMAGE MODAL----------------------------------------------------------- */}

      <Modal open={openUploader} onClose={handleCloseUploader}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Upload an Image
          </Typography>
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleFileChange}
            fullWidth
          />
          {selectedImage && (
            <Typography variant="body2" mt={2}>
              Selected file: {selectedImage.name}
            </Typography>
          )}
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={handleCloseUploader} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpload}>
              Upload
            </Button>
          </Box>
        </Box>
      </Modal>

    </div>
  );
}

