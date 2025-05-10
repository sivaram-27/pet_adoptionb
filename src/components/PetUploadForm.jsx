import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Alert,
    Chip,
    Stack
} from '@mui/material';
import { CloudUpload, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PetUploadForm = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        species: '',
        breed: '',
        age: '',
        gender: '',
        description: '',
        image: null,
        size: '',
        healthStatus: '',
        temperament: '',
        specialNeeds: '',
        adoptionFee: '',
        tags: [],
        isAvailable: true,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newTag, setNewTag] = useState('');
    const [imagePreview, setImagePreview] = useState('');

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

        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        // Check file size (max 5MB)
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

    const handleAddTag = () => {
        if (newTag && !formData.tags.includes(newTag)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        // Pre-submit validation for required fields
        if (!formData.location || formData.location.trim() === '') {
            setError('Location is required.');
            setLoading(false);
            return;
        }
        try {
            // Debug log: print formData and token before sending
            console.log('[PetUploadForm] Submitting:', formData);
            console.log('[PetUploadForm] Token:', token);
            const response = await fetch('http://localhost:8080/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    age: formData.age ? Number(formData.age) : null,
                    adoptionFee: formData.adoptionFee ? Number(formData.adoptionFee) : null,
                    tags: Array.isArray(formData.tags) ? formData.tags : [],
                    isAvailable: formData.isAvailable,
                    image: formData.image || ''
                })
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Failed to add pet');
            }
            setSuccess('Pet added successfully!');
            setFormData({
                name: '',
                species: '',
                breed: '',
                age: '',
                gender: '',
                description: '',
                image: null,
                size: '',
                healthStatus: '',
                temperament: '',
                specialNeeds: '',
                adoptionFee: '',
                tags: [],
                isAvailable: true,
            });
            setImagePreview('');
            setTimeout(() => {
                navigate('/browse');
            }, 2000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Add New Pet
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Pet Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Species</InputLabel>
                                <Select
                                    name="species"
                                    value={formData.species}
                                    onChange={handleChange}
                                    label="Species"
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
                                label="Age (years)"
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                required
                                inputProps={{ min: 0, step: 0.1 }}
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

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Health Status</InputLabel>
                                <Select
                                    name="healthStatus"
                                    value={formData.healthStatus}
                                    onChange={handleChange}
                                    label="Health Status"
                                >
                                    <MenuItem value="Healthy">Healthy</MenuItem>
                                    <MenuItem value="Needs Attention">Needs Attention</MenuItem>
                                    <MenuItem value="Special Needs">Special Needs</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Temperament"
                                name="temperament"
                                value={formData.temperament}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Special Needs"
                                name="specialNeeds"
                                value={formData.specialNeeds}
                                onChange={handleChange}
                                multiline
                                rows={2}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Adoption Fee"
                                name="adoptionFee"
                                type="number"
                                value={formData.adoptionFee}
                                onChange={handleChange}
                                required
                                inputProps={{ min: 0 }}
                            />
                        </Grid>

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

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="isAvailable"
                                    value={formData.isAvailable}
                                    onChange={e => setFormData(prev => ({ ...prev, isAvailable: e.target.value === 'true' }))}
                                    label="Status"
                                >
                                    <MenuItem value={true}>Available</MenuItem>
                                    <MenuItem value={false}>Adopted</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Tags
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                    <TextField
                                        size="small"
                                        label="Add Tag"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddTag();
                                            }
                                        }}
                                    />
                                    <Button
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={handleAddTag}
                                    >
                                        Add
                                    </Button>
                                </Stack>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {formData.tags.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            onDelete={() => handleRemoveTag(tag)}
                                        />
                                    ))}
                                </Box>
                            </Box>
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
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading || !formData.image}
                                startIcon={loading ? <CircularProgress size={20} /> : null}
                            >
                                {loading ? 'Creating...' : 'Create Pet'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default PetUploadForm; 