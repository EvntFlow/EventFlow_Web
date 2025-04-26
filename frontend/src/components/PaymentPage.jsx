import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Divider,
  Grid
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

  const handlePayNow = () => {
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onBackToOverlay();
  };

  const subtotal = orderData?.totalPrice || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>PAYMENT METHOD</Typography>

          <Paper elevation={0} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid #e0e0e0' }}>
            <Typography variant="body1">Google</Typography>
            <KeyboardArrowRightIcon />
          </Paper>

          <Paper elevation={0} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid #e0e0e0' }}
            onClick={() => setExpandDebitCard(!expandDebitCard)}
          >
            <Typography variant="body1">Debit Card</Typography>
            {expandDebitCard ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </Paper>

          {expandDebitCard && (
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Debit Card</Typography>
                <PaymentMethodCard
                  logo={<Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" sx={{ width: 40 }} />}
                  bankName="AMEX Bank"
                  cardNumber="**** **** **** 4578"
                  isSelected={selectedCard === '4578'}
                  onChange={() => setSelectedCard('4578')}
                />
                <PaymentMethodCard
                  logo={<Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" sx={{ width: 40 }} />}
                  bankName="HDFC Bank"
                  cardNumber="**** **** **** 4521"
                  isSelected={selectedCard === '4521'}
                  onChange={() => setSelectedCard('4521')}
                />
                <Button startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2, textTransform: 'none', color: 'text.primary' }}>
                  Add New Cards
                </Button>
              </CardContent>
            </Card>
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
              <Typography>{orderData.attendee?.address || '12, WLS Regancy'}</Typography>
            </Box>

            <Button variant="contained" fullWidth onClick={handlePayNow}
              sx={{ bgcolor: '#4a7dff', color: 'white', py: 1.5, textTransform: 'none', '&:hover': { bgcolor: '#3a6df0' } }}
            >
              Pay Now
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <SuccessOverlay open={showSuccess} onClose={handleSuccessClose} />
    </Box>
  );
};

export default PaymentPage;