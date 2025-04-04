import React, { useState,useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Select, MenuItem, FormControl, InputLabel, Box, Typography } from "@mui/material";
import API from "../App";

const dataOptions = {
  today: [
    { name: "10 AM", orders: 5 },
    { name: "12 PM", orders: 8 },
    { name: "2 PM", orders: 3 },
    { name: "4 PM", orders: 7 },
    { name: "6 PM", orders: 6 },
  ],
  weekly: [
    { name: "Mon", orders: 50 },
    { name: "Tue", orders: 65 },
    { name: "Wed", orders: 40 },
    { name: "Thu", orders: 70 },
    { name: "Fri", orders: 55 },
    { name: "Sat", orders: 80 },
    { name: "Sun", orders: 60 },
  ],
  monthly: [
    { name: "Week 1", orders: 200 },
    { name: "Week 2", orders: 230 },
    { name: "Week 3", orders: 180 },
    { name: "Week 4", orders: 250 },
  ],
};

const OrderBarGraph = () => {
  const [timeFrame, setTimeFrame] = useState("today");
  const data = dataOptions[timeFrame];
const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
const [categoryCount, setCategoryCount] = useState(0);

  const fetchProductCount = async () => {
    const response = await API.get("/products/totalProducts"); 
    setProductCount(response.data);
  }

  const fetchUserCount = async () => {  
    const response = await API.get("/users/totalUsers");   
    setUserCount(response.data); 
  }

  const fetchCategoryCount = async () => {
    const response = await API.get("/products/totalCategories");
    setCategoryCount(response.data);  
  }

  useEffect(() => { 
    fetchProductCount();
    fetchUserCount();
    fetchCategoryCount();
  }, []);
  return (
    <Box sx={{ p: 3, bgcolor: "white", boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Orders Overview
      </Typography>
      <section className="dashboard-cards">
          <div className="card">
            <h3>Total Sales</h3>
            <p>$10,500</p>
          </div>
          <div className="card">
            <h3>Total Users</h3>
            <p>{userCount}</p>
          </div>
          <div className="card">
            <h3>Total Orders</h3>
            <p>1,200</p>
          </div>
          <div className="card">
            <h3>Total Products</h3>
            <p>{productCount}</p>
          </div>
          <div className="card">
            <h3>Total Categories</h3>
            <p>{categoryCount}</p>
          </div>
        </section>
      {/* Dropdown using MUI Select */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Time Frame</InputLabel>
        <Select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)} label="Time Frame">
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="#1976D2" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OrderBarGraph;
