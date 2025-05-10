import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/pets');
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handleEdit = (petId) => {
    navigate(`/admin/pets/edit/${petId}`);
  };

  const handleDelete = async (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await fetch(`http://localhost:8080/api/pets/${petId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        fetchPets(); // Refresh the list
      } catch (error) {
        console.error('Error deleting pet:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Pet Management Dashboard
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/admin/pets/add')}
        >
          Add New Pet
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Breed</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.species}</TableCell>
                <TableCell>{pet.breed}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>{pet.isAvailable ? 'Available' : 'Adopted'}</TableCell>
                <TableCell>
                  <Button 
                    size="small" 
                    onClick={() => handleEdit(pet.id)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(pet.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
