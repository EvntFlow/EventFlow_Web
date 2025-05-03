import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  TextField, 
  Box, 
  Button,
  FormLabel,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ImageOutlined } from '@mui/icons-material';
import { EventContext } from './EventContext';

// Custom Stepper component with MUI
import Stepper from '../../../components/Stepper';

// Styled components
const FormSectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(3)
}));

const ImagePlaceholder = styled(Box)(({ theme }) => ({
  height: '192px',
  width: '100%',
  backgroundColor: theme.palette.grey[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius
}));

const PlaceholderContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.palette.grey[400]
}));

const BannerPage = () => {
  const navigate = useNavigate();
  const { eventData, setEventData } = useContext(EventContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleNext = () => {
    navigate('/ticketing');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" component="h1" fontWeight="700" gutterBottom sx={{ mb: 4 }}>
        CREATE A NEW EVENT
      </Typography>
      
      {/* Stepper */}
      <Stepper currentStep={1} />
      
      {/* Banner Section */}
      <Box component="section" sx={{ mb: 6 }}>
        <FormSectionTitle variant="h5">
          Event Banner
        </FormSectionTitle>
        
        <Box sx={{ mb: 4 }}>
          <ImagePlaceholder>
            {eventData.bannerUri ? (
              <Box
                component="img"
                src={eventData.bannerUri}
                alt="Banner Preview"
                sx={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 1
                }}
              />
            ) : (
              <PlaceholderContent>
                <ImageOutlined sx={{ fontSize: 48 }} />
                <Typography sx={{ mt: 1 }}>Upload Banner Image</Typography>
              </PlaceholderContent>
            )}
          </ImagePlaceholder>
          
          <FormLabel component="label" sx={{ display: 'block', mb: 1 }}>
            Banner Image URL
          </FormLabel>
          <TextField
            fullWidth
            name="bannerUri"
            placeholder="Enter banner image URL"
            value={eventData.bannerUri || ''}
            onChange={handleChange}
            variant="outlined"
            size="medium"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Enter a URL for your event banner image
          </Typography>
        </Box>
      </Box>
      
      {/* Navigation Buttons */}
      <Stack direction="row" justifyContent="space-between">
        <Button 
          variant="outlined" 
          onClick={handleBack}
          size="large"
          sx={{ 
            py: 1, 
            px: 3,
            borderRadius: 1,
            borderColor: 'grey.300',
            color: 'grey.700'
          }}
        >
          Back
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleNext}
          size="large"
          sx={{ 
            py: 1, 
            px: 3, 
            borderRadius: 1,
            backgroundColor: '#4285f4'
          }}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default BannerPage;