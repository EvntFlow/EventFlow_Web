import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogTitle, TextField, Box, Typography, 
  Button, IconButton, Checkbox, FormControlLabel, Divider, Link
} from '@mui/material';
import { ArrowBack, KeyboardArrowRight } from '@mui/icons-material';

const AttendeeDetailsForm = ({ open, onClose, onContinue, ticketDetails, totalQuantity, totalPrice }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'acceptTerms' ? checked : value
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms of service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onContinue(formData);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ 
        sx: { 
          borderRadius: 1,
          maxHeight: '90vh'
        } 
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <IconButton edge="start" onClick={onClose} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Attendee Details</Typography>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0, bgcolor: 'grey.50' }}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Event Name</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ mr: 0.5 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Box>
              <Typography variant="body2">Saturday, 2 December 2023</Typography>
            </Box>
          </Box>
          
          <Typography 
            variant="subtitle2" 
            sx={{ 
              p: 1.5, 
              borderBottom: '2px solid', 
              borderColor: 'primary.main', 
              bgcolor: 'white',
              mb: 2
            }}
          >
            {ticketDetails.map(t => `${t.type}: ${t.quantity}`).join(', ')}
          </Typography>
          
          <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Full Name</Typography>
            <TextField
              fullWidth
              placeholder="Enter Attendee's full name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
            
            <Typography variant="subtitle1" gutterBottom>Email</Typography>
            <TextField
              fullWidth
              placeholder="Enter your email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
            
            <Typography variant="subtitle1" gutterBottom>Phone number</Typography>
            <TextField
              fullWidth
              placeholder="Enter your phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              variant="outlined"
              size="small"
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  name="acceptTerms" 
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  size="small"
                />
              }
              label={
                <Typography variant="body2" sx={{ color: errors.acceptTerms ? 'error.main' : 'inherit' }}>
                  I accept the <Link href="#" color="primary">Terms of Service</Link> and have read the <Link href="#" color="primary">Privacy Policy</Link>
                </Typography>
              }
            />
          </Box>
        </Box>
        
        <Divider />
        
        <Box sx={{ p: 2, bgcolor: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Qty: {totalQuantity}</Typography>
              <Typography>
                Total: <Box component="span" color="primary.main">${totalPrice.toFixed(0)}</Box>
              </Typography>
          </Box>
          
          <Button
            variant="contained"
            fullWidth
            endIcon={<KeyboardArrowRight />}
            onClick={handleSubmit}
            sx={{ py: 1.5 }}
          >
            Continue to Checkout
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AttendeeDetailsForm;