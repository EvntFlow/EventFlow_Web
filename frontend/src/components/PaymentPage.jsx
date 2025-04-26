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
  TextField,
  Container,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SuccessOverlay from './SuccessOverlay';
import PaymentMethodCard from './PaymentMethod';
import TicketCard from './TicketCard';

const PaymentPage = ({ orderData, onBackToOverlay }) => {
  const [selectedCard, setSelectedCard] = useState('4578');
  const [expandDebitCard, setExpandDebitCard] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  
  const [cardDetails, setCardDetails] = useState({
    displayName: '',
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  
  // Fetch existing payment methods when component mounts
  useEffect(() => {
    fetchPaymentInfo();
  }, []);
  
  const fetchPaymentInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://ishar.tail35ead.ts.net:8443/api/Payment', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Payment info:', data);
        setPaymentInfo(Array.isArray(data) ? data : [data]);
      } else {
        setNotification({
          open: true,
          message: 'Failed to retrieve payment methods',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error fetching payment info:', error);
      setNotification({
        open: true,
        message: 'Error connecting to payment service',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleAddCard = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!cardDetails.displayName || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
      setNotification({
        open: true,
        message: 'Please fill in all card details',
        severity: 'warning'
      });
      return;
    }
    
    setLoading(true);
    
    const formData = new FormData();
    formData.append('displayName', cardDetails.displayName);
    formData.append('number', cardDetails.number);
    formData.append('expiry', cardDetails.expiry);
    formData.append('cvv', cardDetails.cvv);
    formData.append('name', cardDetails.name);
    
    try {
      const response = await fetch('https://ishar.tail35ead.ts.net:8443/api/Payment/Card?returnUrl=https://ef.trungnt2910.com/return', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Card added:', data);
        // Reset form
        setCardDetails({
          displayName: '',
          number: '',
          expiry: '',
          cvv: '',
          name: ''
        });
        
        setNotification({
          open: true,
          message: 'Card added successfully',
          severity: 'success'
        });
        
        setShowAddCard(false);
        
        // Refresh payment methods
        fetchPaymentInfo();
      } else {
        const errorData = await response.json();
        console.error('Error adding card:', errorData);
        setNotification({
          open: true,
          message: 'Failed to add card',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error adding card:', error);
      setNotification({
        open: true,
        message: 'Error connecting to payment service',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePayNow = () => {
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onBackToOverlay();
  };
  
  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const subtotal = orderData?.totalPrice || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 2, p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>PAYMENT METHOD</Typography>

            <Paper elevation={0} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid #e0e0e0' }}>
              <Typography variant="body1">Google</Typography>
              <KeyboardArrowRightIcon />
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
              onClick={() => setExpandDebitCard(!expandDebitCard)}
            >
              <Typography variant="body1">Debit Card</Typography>
              {expandDebitCard ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </Paper>

            {expandDebitCard && (
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Debit Card</Typography>
                  
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    <>
                      {paymentInfo.length > 0 ? (
                        paymentInfo.map((card, index) => (
                          <PaymentMethodCard
                            key={card.id || index}
                            logo={<Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" sx={{ width: 40 }} />}
                            bankName={card.displayName || "Bank Card"}
                            cardNumber={`**** **** **** ${card.lastDigits || '0000'}`}
                            isSelected={selectedCard === (card.lastDigits || String(index))}
                            onChange={() => setSelectedCard(card.lastDigits || String(index))}
                          />
                        ))
                      ) : (
                        <Typography color="text.secondary" sx={{ mb: 2 }}>No saved cards found</Typography>
                      )}
                      
                      <Button 
                        startIcon={<AddCircleOutlineIcon />} 
                        sx={{ mt: 2, textTransform: 'none', color: 'text.primary' }}
                        onClick={() => setShowAddCard(!showAddCard)}
                      >
                        {showAddCard ? 'Cancel' : 'Add New Card'}
                      </Button>
                    </>
                  )}
                  
                  {showAddCard && (
                    <Box component="form" onSubmit={handleAddCard} sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2 }}>Add New Card</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            name="displayName"
                            label="Bank Name"
                            fullWidth
                            value={cardDetails.displayName}
                            onChange={handleCardInputChange}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="number"
                            label="Card Number"
                            fullWidth
                            value={cardDetails.number}
                            onChange={handleCardInputChange}
                            inputProps={{ maxLength: 16 }}
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            name="expiry"
                            label="Expiry (MM/YY)"
                            fullWidth
                            value={cardDetails.expiry}
                            onChange={handleCardInputChange}
                            inputProps={{ maxLength: 5 }}
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            name="cvv"
                            label="CVV"
                            fullWidth
                            value={cardDetails.cvv}
                            onChange={handleCardInputChange}
                            type="password"
                            inputProps={{ maxLength: 3 }}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="name"
                            label="Cardholder Name"
                            fullWidth
                            value={cardDetails.name}
                            onChange={handleCardInputChange}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button 
                            type="submit" 
                            variant="contained" 
                            disabled={loading}
                            sx={{ bgcolor: '#4a7dff', '&:hover': { bgcolor: '#3a6df0' } }}
                          >
                            {loading ? <CircularProgress size={24} /> : 'Save Card'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
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

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Order</Typography><Typography>${subtotal.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Tax</Typography><Typography>${tax.toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography fontWeight="bold">Total</Typography><Typography fontWeight="bold">${total.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography>Address</Typography>
                <Typography>{orderData?.attendee?.address || '12, WLS Regancy'}</Typography>
              </Box>

              <Button 
                variant="contained" 
                fullWidth 
                onClick={handlePayNow}
                disabled={loading || paymentInfo.length === 0}
                sx={{ 
                  bgcolor: '#4a7dff', 
                  color: 'white', 
                  py: 1.5, 
                  textTransform: 'none', 
                  '&:hover': { bgcolor: '#3a6df0' } 
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay Now'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <SuccessOverlay open={showSuccess} onClose={handleSuccessClose} />
      
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PaymentPage;