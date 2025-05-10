import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
  useTheme,
  Alert,
  Collapse,
} from '@mui/material';
import {
  Pets,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const MotionPaper = motion(Paper);
const MotionButton = motion(Button);
const MotionBox = motion(Box);

function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light}15 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <Pets
                sx={{
                  fontSize: 48,
                  color: theme.palette.primary.main,
                  mb: 1,
                }}
              />
            </motion.div>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Create Account
            </Typography>
          </Box>

          <Collapse in={!!error}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <TextField
              select
              fullWidth
              margin="normal"
              label="Register as"
              name="role"
              value={formData.role}
              onChange={handleChange}
              SelectProps={{ native: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
                mb: 2,
              }}
            >
              <option value="USER">User</option>
              <option value="SELLER">Seller</option>
            </TextField>

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <MotionButton
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
                },
              }}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </MotionButton>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Already have an account?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/login')}
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </MotionPaper>
    </Container>
  );
}

export default Register; 