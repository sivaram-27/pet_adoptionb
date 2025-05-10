import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  InputAdornment,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import PetsIcon from '@mui/icons-material/Pets';

function BrowsePets() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    species: '',
    gender: '',
    size: '',
  });
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/pets');
      if (!res.ok) throw new Error('Failed to fetch pets');
      const data = await res.json();
      setPets(data);
    } catch (err) {
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      species: '',
      gender: '',
      size: '',
    });
    setSearchTerm('');
  };

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = !filters.species || pet.species === filters.species;
    const matchesGender = !filters.gender || pet.gender === filters.gender;
    const matchesSize = !filters.size || pet.size === filters.size;
    return matchesSearch && matchesSpecies && matchesGender && matchesSize;
  });

  const handleLearnMore = (petId) => {
    navigate(`/pets/${petId}`);
  };

  const handleAdopt = (petId) => {
    navigate(`/adopt/${petId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <PetsIcon sx={{ fontSize: 35 }} className="wiggle" />
          Find Your Perfect Pet
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name or breed"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover': {
                    '& > fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  name="species"
                  value={filters.species}
                  label="Type"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Dog">Dogs</MenuItem>
                  <MenuItem value="Cat">Cats</MenuItem>
                  <MenuItem value="Bird">Birds</MenuItem>
                  <MenuItem value="Rabbit">Rabbits</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={filters.gender}
                  label="Gender"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Size</InputLabel>
                <Select
                  name="size"
                  value={filters.size}
                  label="Size"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Small">Small</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Large">Large</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                onClick={clearFilters}
                startIcon={<FilterListIcon />}
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                  transition: 'transform 0.2s ease-in-out',
                }}
              >
                Clear Filters
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Active Filters */}
      {(filters.species || filters.gender || filters.size) && (
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {filters.species && (
              <Chip 
                label={`Type: ${filters.species}`} 
                onDelete={() => handleFilterChange({ target: { name: 'species', value: '' } })}
                sx={{
                  backgroundColor: theme.palette.primary.light,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              />
            )}
            {filters.gender && (
              <Chip 
                label={`Gender: ${filters.gender}`} 
                onDelete={() => handleFilterChange({ target: { name: 'gender', value: '' } })}
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              />
            )}
            {filters.size && (
              <Chip 
                label={`Size: ${filters.size}`} 
                onDelete={() => handleFilterChange({ target: { name: 'size', value: '' } })}
                sx={{
                  backgroundColor: theme.palette.primary.light,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              />
            )}
          </Stack>
        </Box>
      )}

      {/* Results Count */}
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3,
          color: theme.palette.text.secondary,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <PetsIcon className="bounce" />
        {filteredPets.length} pets found
      </Typography>

      {/* Pets Grid */}
      <Grid container spacing={4}>
        {filteredPets.map((pet) => (
          <Grid item key={pet.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="260"
                image={pet.image}
                alt={pet.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  {pet.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {pet.breed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pet.age} • {pet.gender} • {pet.size}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="large"
                  onClick={() => handleLearnMore(pet.id)}
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light + '20',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Learn More
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => handleAdopt(pet.id)}
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    color: 'white',
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Adopt
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results Message */}
      {filteredPets.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No pets found matching your criteria
          </Typography>
          <Button
            variant="contained"
            onClick={clearFilters}
            sx={{
              mt: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Clear All Filters
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default BrowsePets; 