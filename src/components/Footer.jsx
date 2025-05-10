import React from 'react';
import { Box, Container, Typography, IconButton, Link } from '@mui/material';
import { Pets, Facebook, Twitter, Instagram, Email } from '@mui/icons-material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Pets className="bounce" sx={{ fontSize: 40 }} />
            <Typography variant="h6" component="div">
              Tony's Tribe
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              color="inherit"
              component={Link}
              href="https://facebook.com"
              target="_blank"
              className="wiggle"
            >
              <Facebook />
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              href="https://twitter.com"
              target="_blank"
              className="wiggle"
            >
              <Twitter />
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              href="https://instagram.com"
              target="_blank"
              className="wiggle"
            >
              <Instagram />
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              href="mailto:contact@pawsandtails.com"
              className="wiggle"
            >
              <Email />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" align="center">
            🐾 Made with love for our furry friends 🐾
          </Typography>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Tony's Tribe
          </Typography>
        </Box>

        {/* Decorative paw prints */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            opacity: 0.1,
          }}
        >
          {[...Array(20)].map((_, i) => (
            <Pets
              key={i}
              sx={{
                position: 'absolute',
                fontSize: 24,
                transform: `rotate(${Math.random() * 360}deg)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 