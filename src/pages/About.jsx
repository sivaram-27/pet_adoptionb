import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Pets,
  Favorite,
  VolunteerActivism,
  EmojiEvents,
  Groups,
} from '@mui/icons-material';

function About() {
  const theme = useTheme();

  const stats = [
    {
      icon: <Pets className="bounce" sx={{ fontSize: 40 }} />,
      title: 'Pets Adopted',
      value: '1000+',
      description: 'Happy tails wagging in new homes',
    },
    {
      icon: <Favorite className="bounce" sx={{ fontSize: 40 }} />,
      title: 'Volunteers',
      value: '200+',
      description: 'Dedicated animal lovers helping out',
    },
    {
      icon: <VolunteerActivism className="bounce" sx={{ fontSize: 40 }} />,
      title: 'Years Active',
      value: '10+',
      description: 'Making a difference in pets lives',
    },
    {
      icon: <EmojiEvents className="bounce" sx={{ fontSize: 40 }} />,
      title: 'Success Rate',
      value: '98%',
      description: 'Perfect matches made every day',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          className="floating"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 'bold',
          }}
        >
          Our Story 🐾
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
        >
          We're a passionate team of animal lovers dedicated to finding forever homes
          for our furry friends. Every pet deserves a loving family, and we're here
          to make that happen!
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box sx={{ mb: 8 }}>
        <Card
          sx={{
            p: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
            color: 'white',
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Our Mission
            </Typography>
            <Typography variant="body1" align="center" sx={{ fontSize: '1.2rem' }}>
              To create a world where every pet has a loving home and every home has
              a happy pet. We believe in responsible pet ownership and work tirelessly
              to match pets with their perfect families.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 80,
                  height: 80,
                  mb: 2,
                }}
              >
                {stat.icon}
              </Avatar>
              <Typography variant="h4" component="div" gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {stat.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          Meet Our Team
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
        >
          Our team consists of dedicated professionals who share a common love for
          animals. From veterinarians to adoption specialists, we work together to
          ensure the best care for our pets.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: theme.palette.primary.main,
                }}
              >
                <Groups sx={{ fontSize: 60 }} />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                Adoption Specialists
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our experts help match pets with their perfect families through
                careful screening and personalized recommendations.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          textAlign: 'center',
          p: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.light} 100%)`,
          color: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Join Our Mission
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Whether you want to adopt, volunteer, or donate, there are many ways to
          help us make a difference in the lives of pets.
        </Typography>
      </Box>
    </Container>
  );
}

export default About; 