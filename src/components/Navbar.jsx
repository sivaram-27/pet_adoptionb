import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon, Pets } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleCloseNavMenu();
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: "'Quicksand', 'Comic Sans MS', cursive, sans-serif",
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="/Chopper1.jpg" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            Tony's Tribe
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={RouterLink} to="/browse" onClick={handleCloseNavMenu}>
                Browse Pets
              </MenuItem>
              {!(isAdmin && isAdmin()) && user && user.role !== 'SELLER' && (
                <>
                  <MenuItem component={RouterLink} to="/pet-match" onClick={handleCloseNavMenu}>
                    Find Your Pet Match
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/about" onClick={handleCloseNavMenu}>
                    About
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/contact" onClick={handleCloseNavMenu}>
                    Contact
                  </MenuItem>
                </>
              )}
              {user && user.role === 'SELLER' && (
                <MenuItem component={RouterLink} to="/seller/dashboard" onClick={handleCloseNavMenu}>
                  Seller Dashboard
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            onClick={handleCloseNavMenu}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: "'Quicksand', 'Comic Sans MS', cursive, sans-serif",
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="/Chopper1.jpg" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            Tony's Tribe
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={RouterLink}
              to="/browse"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Browse Pets
            </Button>
            {!(isAdmin && isAdmin()) && user && user.role !== 'SELLER' && (
              <>
                <Button
                  component={RouterLink}
                  to="/pet-match"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Find Your Pet Match
                </Button>
                <Button
                  component={RouterLink}
                  to="/about"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  About
                </Button>
                <Button
                  component={RouterLink}
                  to="/contact"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Contact
                </Button>
              </>
            )}
            {user && user.role === 'SELLER' && (
              <Button
                component={RouterLink}
                to="/seller/dashboard"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Seller Dashboard
              </Button>
            )}
            {isAdmin && isAdmin() && (
              <>
                <Button
                  component={RouterLink}
                  to="/admin/dashboard"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Admin Dashboard
                </Button>
                <Button
                  component={RouterLink}
                  to="/admin/applications"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Applications
                </Button>
              </>
            )}
          </Box>

          {/* Auth Buttons */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {user.username}
                </Typography>
                <Button
                  onClick={handleLogout}
                  sx={{ color: 'white' }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{ color: 'white', mr: 1 }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="outlined"
                  sx={{ 
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;