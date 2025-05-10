import React, { useRef } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { petCardHover, petCardHoverOut, buttonClick, petImageHover } from '../utils/animations';

const PetCard = ({ pet }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    petCardHover(cardRef.current);
    petImageHover(imageRef.current);
  };

  const handleMouseLeave = () => {
    petCardHoverOut(cardRef.current);
  };

  const handleAdoptClick = (e) => {
    buttonClick(e.currentTarget);
    navigate(`/adopt/${pet.id}`);
  };

  return (
    <Card
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        maxWidth: 345,
        m: 2,
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <CardMedia
        ref={imageRef}
        component="img"
        height="200"
        image={pet.image}
        alt={pet.name}
        sx={{
          objectFit: 'cover',
          transition: 'transform 0.3s ease-in-out',
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pet.breed} • {pet.age} years old
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAdoptClick}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Adopt Me
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PetCard; 