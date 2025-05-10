import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Stepper,
  Step,
  StepLabel,
  Paper,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import { Pets, Favorite, Home, Work, FamilyRestroom, AccessTime } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const questions = [
  {
    question: "What's your living situation?",
    options: [
      { value: 'apartment', label: 'Apartment', icon: <Home /> },
      { value: 'house', label: 'House with Yard', icon: <Home /> },
      { value: 'condo', label: 'Condo', icon: <Home /> },
    ],
  },
  {
    question: "How much time can you spend with a pet daily?",
    options: [
      { value: 'lots', label: '4+ hours', icon: <AccessTime /> },
      { value: 'moderate', label: '2-4 hours', icon: <AccessTime /> },
      { value: 'limited', label: 'Less than 2 hours', icon: <AccessTime /> },
    ],
  },
  {
    question: "Do you have children or plan to have them?",
    options: [
      { value: 'yes', label: 'Yes', icon: <FamilyRestroom /> },
      { value: 'no', label: 'No', icon: <FamilyRestroom /> },
      { value: 'maybe', label: 'Maybe in the future', icon: <FamilyRestroom /> },
    ],
  },
  {
    question: "What's your activity level?",
    options: [
      { value: 'active', label: 'Very Active', icon: <Work /> },
      { value: 'moderate', label: 'Moderately Active', icon: <Work /> },
      { value: 'low', label: 'Not Very Active', icon: <Work /> },
    ],
  },
];

const petRecommendations = {
  dog: {
    title: "Dog",
    description: "Perfect for active individuals or families who can provide regular exercise and attention.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3",
    traits: ["Loyal", "Active", "Social", "Trainable"],
  },
  cat: {
    title: "Cat",
    description: "Ideal for people with busy schedules or living in smaller spaces.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3",
    traits: ["Independent", "Low Maintenance", "Quiet", "Clean"],
  },
  smallPet: {
    title: "Small Pet",
    description: "Great for first-time pet owners or those with limited space.",
    image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3",
    traits: ["Compact", "Easy to Care For", "Quiet", "Affordable"],
  },
};

function PetMatchQuiz() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [recommendedPet, setRecommendedPet] = useState(null);

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [activeStep]: value });
  };

  const handleNext = () => {
    if (activeStep < questions.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      calculateResult();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const calculateResult = () => {
    // Simple scoring system
    let score = {
      dog: 0,
      cat: 0,
      smallPet: 0,
    };

    // Calculate scores based on answers
    Object.values(answers).forEach((answer) => {
      switch (answer) {
        case 'house':
        case 'lots':
        case 'active':
          score.dog += 2;
          break;
        case 'apartment':
        case 'limited':
        case 'low':
          score.cat += 2;
          score.smallPet += 1;
          break;
        case 'condo':
        case 'moderate':
          score.cat += 1;
          score.dog += 1;
          break;
        case 'yes':
          score.dog += 1;
          break;
        case 'no':
          score.cat += 1;
          break;
      }
    });

    // Determine the highest score
    const maxScore = Math.max(...Object.values(score));
    const recommended = Object.keys(score).find(key => score[key] === maxScore);
    setRecommendedPet(petRecommendations[recommended]);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setActiveStep(0);
    setAnswers({});
    setShowResult(false);
    setRecommendedPet(null);
  };

  if (showResult) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              mb: 4,
            }}
          >
            Your Perfect Pet Match!
          </Typography>

          <MotionCard
            whileHover={{ scale: 1.02 }}
            sx={{
              mb: 4,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <Grid container>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  height="400"
                  image={recommendedPet.image}
                  alt={recommendedPet.title}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom>
                    {recommendedPet.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {recommendedPet.description}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Key Traits:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {recommendedPet.traits.map((trait, index) => (
                      <Paper
                        key={index}
                        sx={{
                          p: 1,
                          bgcolor: theme.palette.primary.light,
                          color: 'white',
                          borderRadius: 2,
                        }}
                      >
                        {trait}
                      </Paper>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={resetQuiz}
                    sx={{
                      mt: 2,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    }}
                  >
                    Take Quiz Again
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          </MotionCard>
        </MotionBox>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            mb: 4,
          }}
        >
          Find Your Perfect Pet Match
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {questions.map((question, index) => (
            <Step key={index}>
              <StepLabel>{`Question ${index + 1}`}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light}15 100%)`,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {questions[activeStep].question}
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
            <RadioGroup
              value={answers[activeStep] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
            >
              {questions[activeStep].options.map((option, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    },
                    ...(answers[activeStep] === option.value && {
                      bgcolor: theme.palette.primary.light,
                      color: 'white',
                    }),
                  }}
                  onClick={() => handleAnswer(option.value)}
                >
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {option.icon}
                        <Typography>{option.label}</Typography>
                      </Box>
                    }
                    sx={{ width: '100%', m: 0 }}
                  />
                </Paper>
              ))}
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ color: theme.palette.primary.main }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!answers[activeStep]}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              }}
            >
              {activeStep === questions.length - 1 ? 'See Results' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </MotionBox>
    </Container>
  );
}

export default PetMatchQuiz; 