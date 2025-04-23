import React from 'react';
import {
  Box, Typography, Radio
} from '@mui/material';

const PaymentMethodCard = ({ logo, bankName, cardNumber, isSelected, onChange }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
    <Box sx={{ mr: 2 }}>{logo}</Box>
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="body1">{bankName}</Typography>
      <Typography variant="body2" color="text.secondary">{cardNumber}</Typography>
    </Box>
    <Radio checked={isSelected} onChange={onChange} value={cardNumber} />
  </Box>
);

export default PaymentMethodCard;