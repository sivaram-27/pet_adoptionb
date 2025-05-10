import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CloudUpload } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const PetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    description: '',
    image: '',
    location: '',
    healthStatus: '',
    temperament: '',
    specialNeeds: '',
    adoptionFee: '',
    tags: [],
    isAvailable: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (id) {
      fetchPetDetails();
    }
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/pets/${id}`);
      if (!res.ok) throw new Error('Failed to fetch pet');
      const pet = await res.json();
      setFormData({ ...pet, tags: pet.tags || [] });
      setImagePreview(pet.image || '');
    } catch (err) {
      setError('Failed to fetch pet details.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      setFormData(prev => ({
        ...prev,
        image: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `http://localhost:8080/api/pets/${id}` : 'http://localhost:8080/api/pets';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
          adoptionFee: formData.adoptionFee ? Number(formData.adoptionFee) : null,
          tags: Array.isArray(formData.tags) ? formData.tags : formData.tags.split(',').map(t => t.trim()),
        })
      });
      if (!res.ok) throw new Error('Failed to save pet');
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to save pet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          {id ? 'Edit Pet' : 'Add New Pet'}
        </Typography>
        {error && (
          <Box sx={{ mb: 2 }}><Typography color="error">{error}</Typography></Box>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  label="Type"
                >
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Bird">Bird</MenuItem>
                  <MenuItem value="Rabbit">Rabbit</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Size</InputLabel>
                <Select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  label="Size"
                >
                  <MenuItem value="Small">Small</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Large">Large</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                fullWidth
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Grid>
            {imagePreview && (
              <Grid item xs={12}>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Pet preview"
                  sx={{
                    width: '100%',
                    maxHeight: 300,
                    objectFit: 'cover',
                    borderRadius: 1
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Status"
                  name="healthStatus"
                  value={formData.healthStatus}
                  onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
            <Button
                type="submit"
              variant="contained"
              color="primary"
                fullWidth
                disabled={loading || !formData.image}
                startIcon={loading ? <CircularProgress size={20} /> : null}
            >
                {loading ? 'Saving...' : id ? 'Update Pet' : 'Add Pet'}
            </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PetForm;
