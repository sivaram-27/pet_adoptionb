import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  useTheme,
  Paper,
  Divider,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Pets,
  Favorite,
  LocationOn,
  Cake,
  Scale,
  Male,
  Female,
  ArrowBack,
  Share,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

function PetDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/pets/${id}`);
        if (!res.ok) throw new Error('Pet not found');
        const data = await res.json();
        setPet(data);
      } catch (err) {
        navigate('/browse');
      }
    };
    fetchPet();
  }, [id, navigate]);

  const handleAdopt = () => {
    navigate(`/adopt/${id}`);
  };

  const handleShare = () => {
    // Implement share functionality
    setShowSnackbar(true);
  };

  if (!pet) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/browse')}
          sx={{
            color: theme.palette.primary.main,
            '&:hover': {
              transform: 'translateX(-5px)',
            },
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          Back to Browse
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Pet Image */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'scale(1.02)',
              },
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <CardMedia
              component="img"
              height="500"
              image={pet.image}
              alt={pet.name}
              sx={{
                objectFit: 'cover',
              }}
            />
          </Card>
        </Grid>

        {/* Pet Information */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h2"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  mb: 1,
                }}
              >
                {pet.name}
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                {pet.breed} • {pet.species}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  icon={<Cake />}
                  label={pet.age}
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    color: 'white',
                  }}
                />
                <Chip
                  icon={pet.gender === 'Male' ? <Male /> : <Female />}
                  label={pet.gender}
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                    color: 'white',
                  }}
                />
              </Box>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light}15 100%)`,
              }}
            >
              <Typography variant="h6" gutterBottom>
                About {pet.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {pet.description}
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.secondary.light}15 100%)`,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Characteristics
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Array.isArray(pet.characteristics) && pet.characteristics.length > 0 ? (
                  pet.characteristics.map((trait, index) => (
                    <Chip
                      key={index}
                      label={trait}
                      sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: 'white',
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">N/A</Typography>
                )}
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.success.light}15 100%)`,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Health Information
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Array.isArray(pet.health) && pet.health.length > 0 ? (
                  pet.health.map((info, index) => (
                    <Chip
                      key={index}
                      label={info}
                      sx={{
                        backgroundColor: theme.palette.success.light,
                        color: 'white',
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">N/A</Typography>
                )}
              </Box>
            </Paper>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mt: 'auto',
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleAdopt}
                sx={{
                  flex: 1,
                  py: 2,
                  borderRadius: 4,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Adopt {pet.name}
              </Button>
              <IconButton
                onClick={() => setIsFavorite(!isFavorite)}
                sx={{
                  backgroundColor: isFavorite ? theme.palette.error.main : theme.palette.grey[200],
                  color: isFavorite ? 'white' : theme.palette.grey[700],
                  '&:hover': {
                    backgroundColor: isFavorite ? theme.palette.error.dark : theme.palette.grey[300],
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <Favorite />
              </IconButton>
              <IconButton
                onClick={handleShare}
                sx={{
                  backgroundColor: theme.palette.grey[200],
                  '&:hover': {
                    backgroundColor: theme.palette.grey[300],
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <Share />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default PetDetails; 