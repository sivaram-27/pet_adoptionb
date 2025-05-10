import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const initialPet = {
  name: '',
  species: '',
  breed: '',
  age: '',
  gender: '',
  description: '',
  image: '',
  size: '',
  healthStatus: '',
  temperament: '',
  specialNeeds: '',
  adoptionFee: '',
};

function SellerDashboard() {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);
  const [petForm, setPetForm] = useState(initialPet);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchMyPets();
  }, []);

  const fetchMyPets = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/pets/mine', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setPets(data);
    } catch (err) {
      setError('Failed to fetch pets');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:8080/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...petForm, age: Number(petForm.age), adoptionFee: Number(petForm.adoptionFee) })
      });
      if (!res.ok) throw new Error('Failed to add pet');
      setSuccess('Pet added successfully!');
      setPetForm(initialPet);
      fetchMyPets();
    } catch (err) {
      setError('Failed to add pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>Seller Dashboard</Typography>
      <Box component="form" onSubmit={handleAddPet} sx={{ mb: 4, p: 3, background: '#fff', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Add a New Pet</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" value={petForm.name} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Species" name="species" value={petForm.species} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Breed" name="breed" value={petForm.breed} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Age" name="age" value={petForm.age} onChange={handleChange} fullWidth required type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Gender" name="gender" value={petForm.gender} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Description" name="description" value={petForm.description} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Image URL" name="image" value={petForm.image} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Size" name="size" value={petForm.size} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Health Status" name="healthStatus" value={petForm.healthStatus} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Temperament" name="temperament" value={petForm.temperament} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Special Needs" name="specialNeeds" value={petForm.specialNeeds} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Adoption Fee" name="adoptionFee" value={petForm.adoptionFee} onChange={handleChange} fullWidth type="number" />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={loading}>
          {loading ? 'Adding...' : 'Add Pet'}
        </Button>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
      </Box>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>My Pets</Typography>
        <List>
          {pets.map((pet) => (
            <React.Fragment key={pet.id}>
              <ListItem>
                <ListItemText
                  primary={`${pet.name} (${pet.species}, ${pet.breed})`}
                  secondary={`Age: ${pet.age}, Gender: ${pet.gender}, Adoption Fee: ${pet.adoptionFee}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          {pets.length === 0 && <Typography>No pets added yet.</Typography>}
        </List>
      </Paper>
    </Container>
  );
}

export default SellerDashboard; 