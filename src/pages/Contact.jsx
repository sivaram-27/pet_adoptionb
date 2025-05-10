import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  useTheme,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Send,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

function Contact() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:hemanthvhb@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 'bold',
              }}
            >
              Get in Touch
            </Typography>
            <Typography variant="body1" paragraph>
              We'd love to hear from you! Whether you have a question about adoption,
              want to volunteer, or just want to say hello, we're here to help.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ color: theme.palette.primary.main, mr: 2 }} />
                <Typography>contact@pawsandtails.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone sx={{ color: theme.palette.primary.main, mr: 2 }} />
                <Typography>+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ color: theme.palette.primary.main, mr: 2 }} />
                <Typography>123 Pet Street, Animal City, AC 12345</Typography>
              </Box>
            </Box>
          </MotionBox>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <MotionPaper
            component="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            elevation={3}
            sx={{
              p: 4,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light}15 100%)`,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<Send />}
                  sx={{
                    mt: 2,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
                    },
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </MotionPaper>
        </Grid>
      </Grid>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Contact; 