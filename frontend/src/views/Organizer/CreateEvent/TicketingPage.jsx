import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  TextField, 
  Box, 
  Button,
  Stack,
  Grid,
  Paper,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { EventContext } from './EventContext';

// Custom Stepper component
import Stepper from '../../../components/Stepper';

// Styled components
const FormSectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(3)
}));

const OptionCard = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(3),
  border: '1px solid',
  borderColor: selected ? theme.palette.primary.main : theme.palette.grey[300],
  backgroundColor: selected ? 'rgba(66, 133, 244, 0.08)' : theme.palette.background.paper,
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    borderColor: selected ? theme.palette.primary.main : theme.palette.grey[400]
  }
}));

const FreeBadge = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: `2px solid ${theme.palette.grey[400]}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  fontWeight: 'bold'
}));

const TicketingPage = () => {
  const navigate = useNavigate();
  const { eventData, setEventData } = useContext(EventContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleTicketTypeSelect = (type) => {
    setEventData({
      ...eventData,
      isTicketed: type === 'ticketed'
    });
  };

  const handleNext = () => {
    navigate('/review');
  };

  const handleBack = () => {
    navigate('/banner');
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" component="h1" fontWeight="700" gutterBottom sx={{ mb: 4 }}>
        EDIT TICKETING
      </Typography>
      
      {/* Stepper */}
      <Stepper currentStep={2} />
      
      {/* Ticketing Options */}
      <Box component="section" sx={{ mb: 6 }}>
        <FormSectionTitle variant="h5">
          What type of event are you running?
        </FormSectionTitle>
        
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <OptionCard 
              selected={eventData.isTicketed === true} 
              onClick={() => handleTicketTypeSelect('ticketed')}
              elevation={0}
            >
              <ConfirmationNumberOutlined sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 0.5 }}>
                Ticketed Event
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                My event requires tickets for entry
              </Typography>
            </OptionCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <OptionCard 
              selected={eventData.isTicketed === false} 
              onClick={() => handleTicketTypeSelect('free')}
              elevation={0}
            >
              <FreeBadge>FREE</FreeBadge>
              <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 0.5 }}>
                Free Event
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                I'm running a free event
              </Typography>
            </OptionCard>
          </Grid>
        </Grid>
        
        {eventData.isTicketed && (
          <Box>
            <FormSectionTitle variant="h5">
              What tickets are you selling?
            </FormSectionTitle>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Typography component="label" sx={{ display: 'block', mb: 1 }}>
                  Ticket Name
                </Typography>
                <TextField
                  fullWidth
                  name="ticketName"
                  placeholder="Ticket Name e.g. General Admission"
                  value={eventData.ticketName || ''}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography component="label" sx={{ display: 'block', mb: 1 }}>
                  Ticket Price
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  name="ticketPrice"
                  placeholder="0.00"
                  value={eventData.ticketPrice || ''}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mb: 3 }}>
              <Typography component="label" sx={{ display: 'block', mb: 1 }}>
                Available Tickets
              </Typography>
              <TextField
                fullWidth
                type="number"
                name="ticketCount"
                placeholder="Number of tickets available"
                value={eventData.ticketCount || ''}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
          </Box>
        )}
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

export default TicketingPage;