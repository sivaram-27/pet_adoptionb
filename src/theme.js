import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6F61', // Warm coral color
    },
    secondary: {
      main: '#FFD700', // Golden color
    },
    background: {
      default: '#FFF5E1', // Soft cream color
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
    success: {
      main: '#81C784', // Green for success
    },
    error: {
      main: '#E57373', // Soft red for errors
    },
  },
  typography: {
    fontFamily: "'Comic Sans MS', cursive",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#5D4037',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#5D4037',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#5D4037',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#5D4037',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#5D4037',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#5D4037',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #FF9E80 30%, #FFB74D 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #FFB74D 30%, #FF9E80 90%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            '&:hover fieldset': {
              borderColor: '#FF9E80',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF9E80',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FF9E80 30%, #FFB74D 90%)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme; 