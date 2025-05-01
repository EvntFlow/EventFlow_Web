import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Divider,
  Grid,
  Container,
  Alert,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  InputAdornment,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import SuccessOverlay from './SuccessOverlay';
import TicketCard from './TicketCard';
import { getApiUrl } from '../api';

const PaymentPage = ({ orderData, onBackToOverlay }) => {
  const [paymentMethod, setPaymentMethod] = useState('DebitCard');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Card input states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardDisplayName, setCardDisplayName] = useState('');

  // Form validation
  const [formErrors, setFormErrors] = useState({});

  // Get the returnUrl if needed
  const urlParams = new URLSearchParams(window.location.search);
  const returnUrl = urlParams.get("returnUrl") || "/events";

  const validateForm = () => {
    const errors = {};
    
    if (!cardName.trim()) {
      errors.name = "Cardholder name is required";
    }
    
    if (!cardNumber.trim()) {
      errors.number = "Card number is required";
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      errors.number = "Please enter a valid 16-digit card number";
    }
    
    if (!cardExpiry.trim()) {
      errors.expiry = "Expiration date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
      errors.expiry = "Please use MM/YY format";
    }
    
    if (!cardCVV.trim()) {
      errors.cvv = "Security code is required";
    } else if (!/^\d{3,4}$/.test(cardCVV)) {
      errors.cvv = "CVV must be 3 or 4 digits";
    }
    
    if (!cardDisplayName.trim()) {
      errors.displayName = "Card nickname is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayNowButtonClick = (e) => {
    if (paymentMethod === 'DebitCard') {
      // Validate the form before submission
      if (!validateForm()) {
        e.preventDefault();
        return;
      }
    }
    
    setIsSubmitting(true);
    // The form will be submitted naturally
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onBackToOverlay(); // Go back to TicketOverlay or wherever you need
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const cleanValue = value.replace(/[^\d]/g, '');
    if (cleanValue.length <= 2) {
      return cleanValue;
    }
    return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
  };

  // Handle form submit errors or success
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMsg = urlParams.get("error");
    const success = urlParams.get("success");
    
    if (errorMsg) {
      setError(errorMsg);
      setIsSubmitting(false);
    }
    
    if (success === 'true') {
      setShowSuccess(true);
    }
  }, []);

  const subtotal = orderData?.totalPrice || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Container maxWidth="md">
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>PAYMENT METHOD</Typography>

            {error && (
              <Alert 
                severity="error" 
                sx={{ mb: 3 }}
              >
                {error}
              </Alert>
            )}

            <FormControl component="fieldset" sx={{ width: '100%', mb: 2 }}>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    mb: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    border: '1px solid #e0e0e0',
                    cursor: 'pointer'
                  }}
                  onClick={() => setPaymentMethod('Google')}
                >
                  <FormControlLabel 
                    value="Google" 
                    control={<Radio />} 
                    label="Google Pay" 
                    sx={{ flexGrow: 1 }}
                  />
                  {paymentMethod === 'Google' ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                </Paper>

                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    mb: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    border: '1px solid #e0e0e0',
                    cursor: 'pointer'
                  }}
                  onClick={() => setPaymentMethod('DebitCard')}
                >
                  <FormControlLabel 
                    value="DebitCard" 
                    control={<Radio />} 
                    label="Debit/Credit Card" 
                    sx={{ flexGrow: 1 }}
                  />
                  {paymentMethod === 'DebitCard' ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                </Paper>
              </RadioGroup>
            </FormControl>

            {paymentMethod === 'DebitCard' && (
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3 }}>Enter Card Details</Typography>
                  
                  <Box 
                    component="form"
                    id="payment-form"
                    method="post"
                    encType="multipart/form-data"
                    action={getApiUrl("Payment/Card", { returnUrl: returnUrl})}
                  >
                    <Grid container spacing={2}>
                      {/* Card Nickname */}
                      <Grid item xs={12}>
                        <TextField
                          label="Card Nickname (for your reference)"
                          variant="outlined"
                          fullWidth
                          name="displayName"
                          value={cardDisplayName}
                          onChange={(e) => setCardDisplayName(e.target.value)}
                          error={!!formErrors.displayName}
                          helperText={formErrors.displayName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CreditCardIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      
                      {/* Card Number */}
                      <Grid item xs={12}>
                        <TextField
                          label="Card Number"
                          variant="outlined"
                          fullWidth
                          name="number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          error={!!formErrors.number}
                          helperText={formErrors.number}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CreditCardIcon />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="1234 5678 9012 3456"
                        />
                      </Grid>
                      
                      {/* Expiry Date and CVV */}
                      <Grid item xs={6}>
                        <TextField
                          label="Expiry Date"
                          variant="outlined"
                          fullWidth
                          name="expiry"
                          value={cardExpiry}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value);
                            if (formatted.length <= 5) {
                              setCardExpiry(formatted);
                            }
                          }}
                          error={!!formErrors.expiry}
                          helperText={formErrors.expiry}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarTodayIcon />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="MM/YY"
                        />
                      </Grid>
                      
                      <Grid item xs={6}>
                        <TextField
                          label="CVV"
                          variant="outlined"
                          fullWidth
                          name="cvv"
                          value={cardCVV}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 4) {
                              setCardCVV(value);
                            }
                          }}
                          error={!!formErrors.cvv}
                          helperText={formErrors.cvv}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SecurityIcon />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="123"
                        />
                      </Grid>
                      
                      {/* Cardholder Name */}
                      <Grid item xs={12}>
                        <TextField
                          label="Cardholder Name"
                          variant="outlined"
                          fullWidth
                          name="name"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          error={!!formErrors.name}
                          helperText={formErrors.name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="John Doe"
                        />
                      </Grid>
                    </Grid>

                    {/* Hidden fields for order info */}
                    <input type="hidden" name="subtotal" value={subtotal.toFixed(2)} />
                    <input type="hidden" name="tax" value={tax.toFixed(2)} />
                    <input type="hidden" name="total" value={total.toFixed(2)} />
                    
                    {/* Attendee details */}
                    <input type="hidden" name="email" value={orderData.attendee?.email || 'email@example.com'} />
                    <input type="hidden" name="address" value={orderData.attendee?.address || '12, WLS Regancy'} />
                    
                    {/* Ticket details */}
                    {orderData?.tickets?.map((ticket, idx) => (
                      <React.Fragment key={`ticket-${idx}`}>
                        <input type="hidden" name="ticketType" value={ticket.type} />
                        <input type="hidden" name="ticketPrice" value={ticket.price} />
                      </React.Fragment>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}

            {paymentMethod === 'Google' && (
              <Box 
                component="form"
                id="payment-form"
                method="post"
                encType="multipart/form-data"
              >
                <Card variant="outlined" sx={{ mb: 3, p: 3 }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    You'll be redirected to Google Pay to complete your payment securely.
                  </Typography>
                  
                  {/* Hidden fields for Google Pay */}
                  <input type="hidden" name="paymentMethod" value="Google" />
                  <input type="hidden" name="subtotal" value={subtotal.toFixed(2)} />
                  <input type="hidden" name="tax" value={tax.toFixed(2)} />
                  <input type="hidden" name="total" value={total.toFixed(2)} />
                  
                  {/* Attendee details */}
                  <input type="hidden" name="email" value={orderData.attendee?.email || 'email@example.com'} />
                  <input type="hidden" name="address" value={orderData.attendee?.address || '12, WLS Regancy'} />
                  
                  {/* Ticket details */}
                  {orderData?.tickets?.map((ticket, idx) => (
                    <React.Fragment key={`ticket-${idx}`}>
                      <input type="hidden" name="ticketType" value={ticket.type} />
                      <input type="hidden" name="ticketPrice" value={ticket.price} />
                    </React.Fragment>
                  ))}
                </Card>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={12}>
            {orderData?.tickets?.map((ticket, idx) => (
              <TicketCard
                key={idx}
                title={ticket.type}
                email={orderData.attendee?.email || 'email@example.com'}
                price={ticket.price}
              />
            ))}

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Payment Details</Typography>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Payment Details</Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Order</Typography><Typography>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Order</Typography><Typography>${subtotal.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Tax</Typography><Typography>${tax.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Tax</Typography><Typography>${tax.toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />
              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography fontWeight="bold">Total</Typography><Typography fontWeight="bold">${total.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography fontWeight="bold">Total</Typography><Typography fontWeight="bold">${total.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography>Address</Typography>
                <Typography>{orderData.attendee?.address || '12, WLS Regancy'}</Typography>
              </Box>

              <Button 
                variant="contained" 
                fullWidth 
                onClick={handlePayNowButtonClick}
                disabled={isSubmitting}
                type="submit"
                form="payment-form"
                sx={{ 
                  bgcolor: '#4a7dff', 
                  color: 'white', 
                  py: 1.5, 
                  textTransform: 'none', 
                  '&:hover': { bgcolor: '#3a6df0' } 
                }}
              >
                {isSubmitting ? 'Processing...' : 'Pay Now'}
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <SuccessOverlay open={showSuccess} onClose={handleSuccessClose} />
      </Box>
    </Container>
  );
};

export default PaymentPage;