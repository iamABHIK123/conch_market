import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import API from "../App";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = 'http://localhost:9090/users/getAll';
        const response = await API.get("/users/getAll");
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser({ firstName: '', lastName: '', email: '', password: '', roles: '' });
    setOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await API.delete(`/users/${userId}`);
      alert('User deleted successfully!');
      window.location.reload();
    } catch (error) {
      alert('Failed to delete user!');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedUser.id) {
        await API.put(`/users/${selectedUser.email}`, selectedUser);
      } else {
        await API.post('/users/create', selectedUser);
      }
      setOpen(false);
      window.location.reload();
    } catch (error) {
      alert('Failed to save user!');
    }
  };

  // Pagination handler
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  // Render loading, error, or the users table
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="users-table">
      <h2>Users List</h2>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add User
      </Button>

      <TableContainer sx={{ marginTop: '2rem' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>First Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Last Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created At</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Roles</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}.</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(user)}>
                     <EditIcon />
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(user.email)}>
                  <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for adding/editing a user */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            backgroundColor: 'white',
            marginTop: '5%',
          }}
        >
          <Typography variant="h5">{selectedUser && selectedUser.id ? 'Edit User' : 'Add User'}</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={selectedUser ? selectedUser.firstName : ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={selectedUser ? selectedUser.lastName : ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={selectedUser ? selectedUser.email : ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={selectedUser ? selectedUser.password : ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
            />
            <TextField
              label="Roles (comma separated)"
              variant="outlined"
              fullWidth
              margin="normal"
              value={selectedUser ? selectedUser.role: ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, roles: e.target.value  })}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button onClick={() => setOpen(false)} variant="outlined" color="secondary">
                Cancel
              </Button>
            </Box>
          </form>
        </Container>
      </Modal>
    </div>
  );
};

export default Users;
