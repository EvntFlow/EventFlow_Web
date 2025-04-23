import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';

const TicketCard = ({ title, email, price }) => (
  <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden', mb: 3 }}>
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ color: '#3f51b5' }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">{email}</Typography>
    </Box>
    <Box sx={{ bgcolor: '#3f51b5', color: 'white', p: 1, textAlign: 'center', width: '80px', ml: 'auto' }}>
      ${price}
    </Box>
  </Paper>
);

export default TicketCard;