import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  useTheme,
  Paper,
} from '@mui/material';
import {
  Pets,
  Favorite,
  Search,
  VolunteerActivism,
  Home as HomeIcon,
  ArrowForward,
  WhatsApp,
  Instagram,
  Facebook,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);
const MotionPaper = motion(Paper);

// Add animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const featuredPets = [
  {
    id: 1,
    name: 'Luna',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3',
  },
  {
    id: 2,
    name: 'Oliver',
    type: 'Cat',
    breed: 'Persian',
    age: '1 year',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3',
  },
  {
    id: 3,
    name: 'Max',
    type: 'Dog',
    breed: 'Husky',
    age: '3 years',
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3',
  },
];

const stats = [
  { icon: <Pets />, count: '500+', label: 'Pets Adopted' },
  { icon: <Favorite />, count: '1000+', label: 'Happy Families' },
  { icon: <VolunteerActivism />, count: '50+', label: 'Volunteers' },
  { icon: <HomeIcon />, count: '5+', label: 'Shelter Locations' },
];

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [pets, setPets] = useState(() => {
    const savedPets = localStorage.getItem('pets');
    return savedPets ? JSON.parse(savedPets) : [];
  });

  useEffect(() => {
    // Load pets from local storage on component mount
    const savedPets = localStorage.getItem('pets');
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    }
  }, []);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url("/OIP (1).jpg")',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#000',
              animation: 'zoomInOut 15s infinite alternate',
              filter: 'brightness(0.9)',
            },
          }}
        />

        {/* Add animation keyframes */}
        <Box
          sx={{
            '@keyframes zoomInOut': {
              '0%': {
                transform: 'scale(1)',
              },
              '100%': {
                transform: 'scale(1.05)',
              },
            },
          }}
        />

        {/* Dark Overlay with gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={8} textAlign="center">
              <MotionBox
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <MotionTypography
                  variant="h1"
                  component="h1"
                  variants={itemVariants}
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  Find Your Perfect
                  <br />
                  Furry Friend 🐾
                </MotionTypography>
                <MotionTypography
                  variant="h5"
                  sx={{ 
                    mb: 4,
                    color: 'rgba(255,255,255,0.9)',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    maxWidth: '800px',
                    margin: '0 auto',
                  }}
                  variants={itemVariants}
                >
                  Give a loving home to a pet in need.
                  Every adoption makes a difference! 
                </MotionTypography>
                <MotionBox 
                  variants={itemVariants}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <MotionButton
                    variant="contained"
                    size="large"
                    endIcon={<Search />}
                    onClick={() => navigate('/browse')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    Find a Pet
                  </MotionButton>
                  <MotionButton
                    variant="outlined"
                    size="large"
                    endIcon={<VolunteerActivism />}
                    onClick={() => navigate('/about')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Learn More
                  </MotionButton>
                </MotionBox>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <MotionPaper
                elevation={2}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light}15 100%)`,
                }}
              >
                <MotionBox
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  sx={{ color: theme.palette.primary.main, mb: 1 }}
                >
                  {stat.icon}
                </MotionBox>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {stat.count}
                </Typography>
                <Typography color="text.secondary">{stat.label}</Typography>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Pets Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <MotionTypography
              variant="h2"
              component="h2"
              fontWeight="bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Meet Our Adorable Friends
            </MotionTypography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              These lovely pets are waiting for their forever homes
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {featuredPets.map((pet, index) => (
              <Grid item xs={12} sm={6} md={4} key={pet.id}>
                <MotionCard
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: theme.shadows[5],
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={pet.image}
                    alt={pet.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div" gutterBottom>
                      {pet.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {pet.breed} • {pet.age}
                    </Typography>
                    <MotionButton
                      fullWidth
                      variant="contained"
                      endIcon={<ArrowForward />}
                      onClick={() => navigate(`/pets/${pet.id}`)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      sx={{
                        mt: 2,
                        borderRadius: 2,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                      }}
                    >
                      Meet {pet.name}
                    </MotionButton>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: 8,
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <MotionTypography
                variant="h3"
                component="h3"
                fontWeight="bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                sx={{ mb: 2 }}
              >
                Ready to Change a Life?
              </MotionTypography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Start your adoption journey today and give a pet a loving home.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <MotionButton
                variant="contained"
                size="large"
                onClick={() => navigate('/browse')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  py: 2,
                  px: 6,
                  borderRadius: 3,
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
              >
                Adopt Now
              </MotionButton>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Social Media Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h4" gutterBottom fontWeight="bold">
            Follow Us
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Stay updated with our latest adorable additions!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            {[
              { icon: <WhatsApp />, color: '#25D366' },
              { icon: <Instagram />, color: '#E4405F' },
              { icon: <Facebook />, color: '#1877F2' },
            ].map((social, index) => (
              <MotionBox
                key={index}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  sx={{
                    color: social.color,
                    bgcolor: `${social.color}20`,
                    '&:hover': {
                      bgcolor: `${social.color}30`,
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              </MotionBox>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Home; 