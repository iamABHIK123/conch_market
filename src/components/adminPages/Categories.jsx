import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Edit, Delete, ExpandMore, ExpandLess, Add } from "@mui/icons-material";
import API from "../App"

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: null, name: "", categoryId: null, type: "category" }); // type can be "category" or "subcategory"
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  // Fetch categories and subcategories from the backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.get("/api/categories");
      setCategories(response.data);
      console.log(response.data);
    //  console.log('categories are-', response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await API.get(`/api/subcategories/category/${categoryId}`);
      console.log('subcategories are-', response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      return [];
    }
  };

  // Handle dialog open/close
  const handleDialogOpen = (item = { id: null, name: "", categoryId: null, type: "category" }) => {
    setCurrentItem(item);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentItem({ id: null, name: "", categoryId: null, type: "category" });
  };

  // Handle form submission (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentItem.type === "category") {
        if (currentItem.id) {
          // Update existing category
          await API.put(`/api/categories/${currentItem.id}`, {
            name: currentItem.name,
          });
        } else {
          // Create new category
          await API.post("/api/categories", { name: currentItem.name });
        }
      } else if (currentItem.type === "subcategory") {
        if (currentItem.id) {
          // Update existing subcategory
          await API.put(`/api/subcategories/${currentItem.id}`, {
            name: currentItem.name,
            categoryId: currentItem.categoryId,
          });
        } else {
          // Create new subcategory

          await API.post("/api/subcategories", {
            name: currentItem.name,
             categoryId: currentItem.categoryId // Send the category object
          });
        }
      }
      fetchCategories(); // Refresh the list
      handleDialogClose();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  // Handle delete category or subcategory
  const handleDelete = async (id, type) => {
    try {
      if (type === "category") {
        await API.delete(`/api/categories/${id}`);
      } else if (type === "subcategory") {
        await API.delete(`/api/subcategories/${id}`);
      }
      fetchCategories(); // Refresh the list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Toggle expand/collapse for subcategories
  const toggleExpand = async (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      const subCategories = await fetchSubCategories(categoryId);
      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? { ...category, subCategories } : category
      );
      setCategories(updatedCategories);
      setExpandedCategoryId(categoryId);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleDialogOpen()}
        sx={{ mb: 2 }}
      >
        Add Category
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <React.Fragment key={category.id}>
                <TableRow>
                  <TableCell>
                    <IconButton onClick={() => toggleExpand(category.id)}>
                      {expandedCategoryId === category.id ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        handleDialogOpen({
                          id: category.id,
                          name: category.name,
                          type: "category",
                        })
                      }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(category.id, "category")}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDialogOpen({
                          categoryId: category.id,
                          type: "subcategory",
                        })
                      }
                    >
                      <Add />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={3}
                  >
                    <Collapse
                      in={expandedCategoryId === category.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          Subcategories
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {category.subCategories?.map((subCategory) => (
                              <TableRow key={subCategory.id}>
                                <TableCell>{subCategory.name}</TableCell>
                                <TableCell>
                                  <IconButton
                                    onClick={() =>
                                      handleDialogOpen({
                                        id: subCategory.id,
                                        name: subCategory.name,
                                        categoryId: category.id,
                                        type: "subcategory",
                                      })
                                    }
                                  >
                                    <Edit />
                                  </IconButton>
                                  <IconButton
                                    onClick={() =>
                                      handleDelete(subCategory.id, "subcategory")
                                    }
                                  >
                                    <Delete />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog
  open={openDialog}
  onClose={handleDialogClose}
  aria-labelledby="dialog-title"
>
  <DialogTitle id="dialog-title">
    {currentItem.id ? `Edit ${currentItem.type}` : `Add ${currentItem.type}`}
  </DialogTitle>
  <DialogContent>
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        margin="dense"
        label={`${currentItem.type === "category" ? "Category" : "Subcategory"} Name`}
        fullWidth
        value={currentItem.name || ""} // Provide a fallback value
        onChange={(e) =>
          setCurrentItem({ ...currentItem, name: e.target.value })
        }
      />
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose}>Cancel</Button>
    <Button onClick={handleSubmit} variant="contained">
      {currentItem.id ? "Update" : "Add"}
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default Categories;