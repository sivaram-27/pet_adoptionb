import React, { useEffect, useRef } from 'react';
import { Container, Paper, Typography, Button, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PetsIcon from '@mui/icons-material/Pets';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { successMessage } from '../utils/animations';

const AdoptionSuccess = () => {
  const navigate = useNavigate();
  const successRef = useRef(null);

  useEffect(() => {
    if (successRef.current) {
      successMessage(successRef.current);
    }
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          bgcolor: 'background.paper',
          borderRadius: 2
        }}
      >
        <Box sx={{ mb: 4 }}>
          <CheckCircleOutlineIcon 
            sx={{ 
              fontSize: 80, 
              color: 'success.main', 
              mb: 2,
              animation: 'bounce 1s ease-in-out'
            }} 
          />
          
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Application Submitted Successfully!
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ color: 'text.primary' }}>
            Thank you for taking the first step towards giving a pet a forever home.
            Our team will carefully review your application and get back to you within 24-48 hours.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ my: 4, textAlign: 'left' }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
            What happens next?
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              You'll receive a confirmation email shortly
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              Our adoption team will call you to discuss next steps
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PetsIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              We'll schedule a meet-and-greet with your potential new family member
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
            Have questions while you wait? Feel free to contact us!
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/browse')}
              startIcon={<PetsIcon />}
            >
              Browse More Pets
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/contact')}
              startIcon={<EmailIcon />}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

// Add bounce animation
const styles = `
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}
`;

// Add styles to document head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default AdoptionSuccess; 