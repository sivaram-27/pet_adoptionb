import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Alert,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

function AdoptionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Living Situation
    housingType: '',
    hasYard: '',
    rentOrOwn: '',
    landlordContact: '',
    
    // Pet Experience
    hasPets: '',
    currentPets: '',
    previousPets: '',
    veterinarianContact: '',
    
    // Lifestyle
    hoursAway: '',
    exercise: '',
    activities: '',
    
    // Agreement
    agreeToHome: false,
    agreeToFollow: false,
    agreeToFinancial: false,
  });
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const steps = ['Personal Information', 'Living Situation', 'Pet Experience', 'Lifestyle', 'Agreement'];

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: event.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setShowConfirm(true);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleConfirmAdoption = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petId: id,
          ...formData,
          agreeToHome: !!formData.agreeToHome,
          agreeToFollow: !!formData.agreeToFollow,
          agreeToFinancial: !!formData.agreeToFinancial,
        })
      });
      if (res.ok) {
        setShowConfirm(false);
        navigate('/adoption-success');
      } else {
        setError('Failed to submit adoption request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting adoption form:', error);
      setError('Failed to submit adoption request. Please try again.');
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label="ZIP Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel>Housing Type</FormLabel>
                <RadioGroup
                  name="housingType"
                  value={formData.housingType}
                  onChange={handleChange}
                >
                  <FormControlLabel value="house" control={<Radio />} label="House" />
                  <FormControlLabel value="apartment" control={<Radio />} label="Apartment" />
                  <FormControlLabel value="condo" control={<Radio />} label="Condo" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel>Do you have a yard?</FormLabel>
                <RadioGroup
                  name="hasYard"
                  value={formData.hasYard}
                  onChange={handleChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel>Do you rent or own?</FormLabel>
                <RadioGroup
                  name="rentOrOwn"
                  value={formData.rentOrOwn}
                  onChange={handleChange}
                >
                  <FormControlLabel value="rent" control={<Radio />} label="Rent" />
                  <FormControlLabel value="own" control={<Radio />} label="Own" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {formData.rentOrOwn === 'rent' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Landlord Contact Information"
                  name="landlordContact"
                  value={formData.landlordContact}
                  onChange={handleChange}
                  helperText="Please provide your landlord's name and phone number"
                />
              </Grid>
            )}
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel>Do you currently have any pets?</FormLabel>
                <RadioGroup
                  name="hasPets"
                  value={formData.hasPets}
                  onChange={handleChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {formData.hasPets === 'yes' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Please list your current pets"
                  name="currentPets"
                  value={formData.currentPets}
                  onChange={handleChange}
                  helperText="Include species, breed, age, and how long you've had them"
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Previous Pet Experience"
                name="previousPets"
                value={formData.previousPets}
                onChange={handleChange}
                helperText="Please describe any previous experience with pets"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Veterinarian Contact"
                name="veterinarianContact"
                value={formData.veterinarianContact}
                onChange={handleChange}
                helperText="If you have a current veterinarian, please provide their contact information"
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Hours away from home per day"
                name="hoursAway"
                value={formData.hoursAway}
                onChange={handleChange}
                helperText="On average, how many hours will the pet be alone?"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Exercise Plans"
                name="exercise"
                value={formData.exercise}
                onChange={handleChange}
                helperText="How do you plan to exercise and play with your pet?"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Activities"
                name="activities"
                value={formData.activities}
                onChange={handleChange}
                helperText="What activities do you plan to do with your pet?"
              />
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Adoption Agreement
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreeToHome}
                      onChange={handleChange}
                      name="agreeToHome"
                    />
                  }
                  label="I agree to a home visit and inspection"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreeToFollow}
                      onChange={handleChange}
                      name="agreeToFollow"
                    />
                  }
                  label="I agree to follow up visits and check-ins"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreeToFinancial}
                      onChange={handleChange}
                      name="agreeToFinancial"
                    />
                  }
                  label="I understand and can manage the financial responsibilities of pet ownership"
                />
              </FormGroup>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 0:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 1:
        return formData.housingType && formData.hasYard && formData.rentOrOwn;
      case 2:
        return formData.hasPets !== '';
      case 3:
        return formData.hoursAway && formData.exercise && formData.activities;
      case 4:
        return formData.agreeToHome && formData.agreeToFollow && formData.agreeToFinancial;
      default:
        return false;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Pet Adoption Application
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ py: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {renderStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepComplete(activeStep)}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Your Adoption Application</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>Review your information before confirming:</Typography>
          <Box sx={{ my: 2 }}>
            <Typography><b>Name:</b> {formData.firstName} {formData.lastName}</Typography>
            <Typography><b>Email:</b> {formData.email}</Typography>
            <Typography><b>Phone:</b> {formData.phone}</Typography>
            <Typography><b>Address:</b> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</Typography>
            <Typography><b>Housing Type:</b> {formData.housingType}</Typography>
            <Typography><b>Has Yard:</b> {formData.hasYard}</Typography>
            <Typography><b>Rent or Own:</b> {formData.rentOrOwn}</Typography>
            {formData.rentOrOwn === 'rent' && (
              <Typography><b>Landlord Contact:</b> {formData.landlordContact}</Typography>
            )}
            <Typography><b>Current Pets:</b> {formData.hasPets === 'yes' ? formData.currentPets : 'None'}</Typography>
            <Typography><b>Previous Pet Experience:</b> {formData.previousPets}</Typography>
            <Typography><b>Veterinarian Contact:</b> {formData.veterinarianContact}</Typography>
            <Typography><b>Hours Away:</b> {formData.hoursAway}</Typography>
            <Typography><b>Exercise Plans:</b> {formData.exercise}</Typography>
            <Typography><b>Activities:</b> {formData.activities}</Typography>
            <Typography><b>Agreements:</b> {formData.agreeToHome && 'Home Visit, '} {formData.agreeToFollow && 'Follow Up, '} {formData.agreeToFinancial && 'Financial Responsibility'}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleConfirmAdoption}>Confirm Adoption</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdoptionForm; 