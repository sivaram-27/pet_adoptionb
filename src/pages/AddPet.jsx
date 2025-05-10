import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import PetUploadForm from '../components/PetUploadForm';

const AddPet = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom align="center">
                    Add a New Pet
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
                    Fill out the form below to add a new pet to our adoption platform
                </Typography>
                <PetUploadForm />
            </Box>
        </Container>
    );
};

export default AddPet; 