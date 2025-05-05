import {
  Box,
  Button,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../../../components/Stepper';
import { EventContext } from './EventContext';

const FormSectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(3)
}));

const RequiredLabel = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: theme.spacing(0.5)
}));

const EditDetailsPage = () => {
  const navigate = useNavigate();
  const { eventData, setEventData } = useContext(EventContext);
  const [errors, setErrors] = useState({});

  const categories = ['Conference', 'Workshop', 'Concert', 'Exhibition', 'Party', 'Other'];
  const locations = ['Wollongong', 'Sydney', 'Dapto', 'Shell Harbour', 'Albion', 'Kiama'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!eventData.name) newErrors.name = 'Event title is required';
    if (!eventData.category) newErrors.category = 'Event category is required';
    if (!eventData.startDate) newErrors.startDate = 'Start date is required';
    if (!eventData.endDate) newErrors.endDate = 'End date is required';
    if (!eventData.location) newErrors.location = 'Location is required';
    if (!eventData.description) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate('/banner');
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" component="h1" fontWeight="700" gutterBottom sx={{ mb: 4 }}>
        CREATE A NEW EVENT
      </Typography>

      {/* Stepper */}
      <Stepper currentStep={0} />

      {/* Event Details Section */}
      <Box component="section" sx={{ mb: 6 }}>
        <FormSectionTitle variant="h5">
          Event Details
        </FormSectionTitle>

        <Box sx={{ mb: 3 }}>
          <FormLabel component="label" sx={{ display: 'block', mb: 1 }}>
            Event Title <RequiredLabel>*</RequiredLabel>
          </FormLabel>
          <TextField
            fullWidth
            required
            name="name"
            placeholder="Enter the name of your event"
            value={eventData.name || ''}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            variant="outlined"
            size="medium"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormLabel component="label" sx={{ display: 'block', mb: 1 }}>
            Event Category <RequiredLabel>*</RequiredLabel>
          </FormLabel>
          <TextField
            select
            fullWidth
            required
            name="category"
            value={eventData.category || ''}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category}
            variant="outlined"
            size="medium"
            placeholder="Please select one"
          >
            <MenuItem value="" disabled>Please select one</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      {/* Date & Time Section */}
      <Box component="section" sx={{ mb: 6 }}>
        <FormSectionTitle variant="h5">
          Date & Time
        </FormSectionTitle>

        <Box sx={{ mb: 2 }}>
          <FormLabel component="label" sx={{ display: 'block', mb: 1 }}>
            Session(s) <RequiredLabel>*</RequiredLabel>
          </FormLabel>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormLabel component="label" sx={{ display: 'block', mb: 1 }}>
              Start Date <RequiredLabel>*</RequiredLabel>
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker fullWidth
                              required
                              disablePast
                              name="startDate"
                              value={eventData.startDate ? dayjs(eventData.startDate) : null}
                              format="DD/MM/YYYY HH:mm"
                              ampm={false}
                              onChange={(val) => setEventData({ ...eventData, "startDate": val.toString() }) }
                              helperText={errors.startDate}
                              slotProps={{
                                field: { openPickerButtonPosition: "start" },
                                textField: {
                                  error: !!errors.startDate,
                                  helperText: errors.startDate,
                                  onChange: () => setErrors({ ...errors, "startDate": null })
                                }
                              }} />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel component="label" sx={{ display: 'block', mb: 1 }}>
              End Date <RequiredLabel>*</RequiredLabel>
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker fullWidth
                              required
                              disablePast
                              name="endDate"
                              value={eventData.endDate ? dayjs(eventData.endDate) : null}
                              format="DD/MM/YYYY HH:mm"
                              ampm={false}
                              onChange={(val) => setEventData({ ...eventData, "endDate": val.toString() })}
                              slotProps={{
                                field: { openPickerButtonPosition: "start" },
                                textField: {
                                  error: !!errors.endDate,
                                  helperText: errors.endDate,
                                  onChange: () => setErrors({ ...errors, "startDate": null })
                                }
                              }} />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>

      {/* Location Section */}
      <Box component="section" sx={{ mb: 6 }}>
        <FormSectionTitle variant="h5">
          Location
        </FormSectionTitle>

        <Box sx={{ mb: 3 }}>
          <FormLabel component="label" sx={{ display: 'block', mb: 1 }}>
            Where will your event take place? <RequiredLabel>*</RequiredLabel>
          </FormLabel>
          <TextField
            select
            fullWidth
            required
            name="location"
            value={eventData.location || ''}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
            variant="outlined"
            size="medium"
          >
            <MenuItem value="" disabled>Please select one</MenuItem>
            {locations.map((location) => (
              <MenuItem key={location} value={location}>{location}</MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      {/* Additional Information Section */}
      <Box component="section" sx={{ mb: 6 }}>
        <FormSectionTitle variant="h5">
          Additional Information
        </FormSectionTitle>

        <Box sx={{ mb: 3 }}>
          <FormLabel component="label" sx={{ display: 'block', mb: 1 }}>
            Event Description <RequiredLabel>*</RequiredLabel>
          </FormLabel>
          <TextField
            fullWidth
            multiline
            rows={6}
            name="description"
            placeholder="Describe what's special about your event & other important details."
            value={eventData.description || ''}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Submit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          size="large"
          sx={{
            py: 1,
            px: 4,
            borderRadius: 1,
            backgroundColor: '#4285f4'
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default EditDetailsPage;
