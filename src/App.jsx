import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BrowsePets from './pages/BrowsePets';
import PetDetails from './pages/PetDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdoptionForm from './pages/AdoptionForm';
import AdoptionSuccess from './pages/AdoptionSuccess';
import AddPet from './pages/AddPet';
import Dashboard from './pages/admin/Dashboard';
import PetForm from './pages/admin/PetForm';
import PetMatchQuiz from './pages/PetMatchQuiz';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { pageLoad, navMenuAnimation } from './utils/animations';
import AdminApplications from './pages/admin/AdminApplications';
import SellerDashboard from './pages/SellerDashboard';

const globalStyles = {
  body: {
    background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
    minHeight: '100vh',
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  '@keyframes wiggle': {
    '0%, 100%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(-5deg)' },
    '75%': { transform: 'rotate(5deg)' },
  },
  '@keyframes bounce': {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
  },
  '.floating': {
    animation: 'float 3s ease-in-out infinite',
  },
  '.wiggle': {
    animation: 'wiggle 2s ease-in-out infinite',
  },
  '.bounce': {
    animation: 'bounce 2s ease-in-out infinite',
  },
};

function App() {
  const navRef = useRef(null);

  useEffect(() => {
    // Run page load animation
    pageLoad();
    
    // Run navigation menu animation
    if (navRef.current) {
      navMenuAnimation(navRef.current);
    }
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <Router>
          <div className="App">
            <div ref={navRef}>
              <Navbar />
            </div>
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<BrowsePets />} />
                <Route path="/pet-match" element={<PetMatchQuiz />} />
                <Route path="/pets/:id" element={<PetDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/adopt/:id?" element={<AdoptionForm />} />
                <Route path="/adoption-success" element={<AdoptionSuccess />} />
                <Route path="/add-pet" element={<AddPet />} />
                
                {/* Protected Admin Routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute role="ADMIN">
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/pets/add" element={
                  <ProtectedRoute role="ADMIN">
                    <PetForm />
                  </ProtectedRoute>
                } />
                <Route path="/admin/pets/edit/:id" element={
                  <ProtectedRoute role="ADMIN">
                    <PetForm />
                  </ProtectedRoute>
                } />
                <Route path="/admin/applications" element={
                  <ProtectedRoute role="ADMIN">
                    <AdminApplications />
                  </ProtectedRoute>
                } />
                <Route path="/seller/dashboard" element={
                  <ProtectedRoute role="SELLER">
                    <SellerDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
