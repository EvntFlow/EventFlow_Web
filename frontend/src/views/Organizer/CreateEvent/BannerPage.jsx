import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  TextField, 
  Box, 
  Button,
  FormLabel,
  Stack,
  IconButton,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload, Delete } from '@mui/icons-material';
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
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden'
}));

const PlaceholderContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.palette.grey[400]
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImageActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  display: 'flex',
  gap: theme.spacing(1)
}));

const BannerPage = () => {
  const navigate = useNavigate();
  const { eventData, setEventData } = useContext(EventContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

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
    navigate('/create-event');
  };

  const handleImageClick = () => {
    if (!eventData.bannerUri) {
      fileInputRef.current?.click();
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Convert image to base64 URI
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setEventData({
          ...eventData,
          bannerUri: base64String
        });
        setIsLoading(false);
      };
      reader.onerror = () => {
        setError('Failed to read the image file');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to upload image');
      setIsLoading(false);
      console.error('Image upload error:', err);
    }
  };

  const handleRemoveImage = () => {
    setEventData({
      ...eventData,
      bannerUri: ''
    });
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
          <ImagePlaceholder onClick={handleImageClick}>
            {isLoading ? (
              <CircularProgress />
            ) : eventData.bannerUri ? (
              <>
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
                <ImageActions>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    <Delete />
                  </IconButton>
                </ImageActions>
              </>
            ) : (
              <PlaceholderContent>
                <CloudUpload sx={{ fontSize: 48 }} />
                <Typography sx={{ mt: 1 }}>Click to upload banner image</Typography>
              </PlaceholderContent>
            )}
          </ImagePlaceholder>
          
          <VisuallyHiddenInput
            ref={fileInputRef}
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
          />
          
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          
          <FormLabel component="label" sx={{ display: 'block', mb: 1, mt: 3 }}>
            Or enter banner image URL
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
            Upload an image or enter a URL for your event banner
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