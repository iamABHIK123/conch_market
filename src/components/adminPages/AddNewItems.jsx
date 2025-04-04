import React, { useState, useEffect } from "react";
import API from "../App"; // Adjust the import based on your project structure
import { Button, TextField, Alert, Card, CircularProgress } from "@mui/material";
import { Delete } from "@mui/icons-material";

const API_BASE_URL = "/new-items"; // Change this to your API URL

const AddNewItems = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing items from API
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await API.get(`${API_BASE_URL}`);
        setItems(response.data); // Assuming API returns an array of product IDs
      } catch (err) {
        setError("Failed to load items.");
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  // Add new item to backend
  const handleAddItem = async () => {
    if (inputValue.trim() === "" || items.includes(inputValue)) return;

    setLoading(true);
    try {
      const response = await API.post(`${API_BASE_URL}`, { productId: inputValue });
      setItems([...items, response.data.productId]); // Assuming response contains the added product ID
      setInputValue("");
    } catch (err) {
      setError("Failed to add item.");
    }
    setLoading(false);
  };

  // Remove item from backend
  const handleRemoveItem = async (id) => {
    setLoading(true);
    try {
      await API.delete(`${API_BASE_URL}/${id}`);
      setItems(items.filter((item) => item !== id));
    } catch (err) {
      setError("Failed to remove item.");
    }
    setLoading(false);
  };

  // Submit the final list
  const handleSubmit = async () => {
    if (items.length < 10) return;
    
    setLoading(true);
    try {
      await API.post(`${API_BASE_URL}/submit`, { items });
      alert("Items submitted successfully!");
    } catch (err) {
      setError("Failed to submit items.");
    }
    setLoading(false);
  };

  return (
    <Card sx={{ padding: 3, maxWidth: 400, margin: "auto", textAlign: "center" }}>
      <h2>New Items List</h2>

      {error && <Alert severity="error">{error}</Alert>}
      {items.length < 10 && (
        <Alert severity="warning">Minimum 10 items required. Currently: {items.length}</Alert>
      )}

      {loading && <CircularProgress />}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
            {item.id}
            <Button onClick={() => handleRemoveItem(item)} color="error" size="small">
              <Delete />
            </Button>
          </li>
        ))}
      </ul>

      <TextField
        label="Enter Product ID"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleAddItem}
        disabled={!inputValue.trim() || loading}
        sx={{ marginBottom: 2 }}
      >
        Add Product
      </Button>

      <Button
        variant="contained"
        color="primary"
        disabled={items.length < 10 || loading}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Card>
  );
};

export default AddNewItems;
