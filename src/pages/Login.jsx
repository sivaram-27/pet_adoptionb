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
  Person,
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

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(formData.email, formData.password);

      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
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
              mb: 3,
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
              Welcome Back! Please Sign In
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
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: theme.palette.primary.main }} />
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
              {isLoading ? 'Logging in...' : 'Login'}
            </MotionButton>
          </form>
        </Box>
      </MotionPaper>
    </Container>
  );
}

export default Login;