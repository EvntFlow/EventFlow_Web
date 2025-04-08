import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Box, Typography, Button, IconButton,
  Paper
} from '@mui/material';
import { Close, Add, Remove, KeyboardArrowRight } from '@mui/icons-material';
import AttendeeDetailsForm from './AttendeeDetailsForm';

const TicketOverlay = ({ isOpen, onClose, onCheckout }) => {
  const [tickets, setTickets] = useState([
    { id: 1, type: 'Standard Ticket', price: 20.00, quantity: 1 },
    { id: 2, type: 'Premium Ticket', price: 50.00, quantity: 0 }
  ]);
  
  const [showAttendeeForm, setShowAttendeeForm] = useState(false);

  const updateQuantity = (id, change) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === id) {
        const newQuantity = Math.max(0, ticket.quantity + change);
        return { ...ticket, quantity: newQuantity };
      }
      return ticket;
    }));
  };

  const totalQuantity = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
  const totalPrice = tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);

  const handleProceed = () => {
    if (totalQuantity > 0) {
      setShowAttendeeForm(true);
    }
  };

  const handleAttendeeSubmit = (attendeeData) => {
    // Combine ticket and attendee data
    const orderData = {
      tickets: tickets.filter(t => t.quantity > 0),
      attendee: attendeeData,
      totalPrice
    };
    
    // Close all dialogs and pass data to parent
    setShowAttendeeForm(false);
    onClose();
    if (onCheckout) onCheckout(orderData);
  };

  return (
    <>
      <Dialog open={isOpen && !showAttendeeForm} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Select Tickets
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" color="text.secondary">Ticket Types</Typography>
            <Typography variant="subtitle2" color="text.secondary">Quantity</Typography>
          </Box>
          
          {tickets.map((ticket) => (
            <Paper 
              key={ticket.id} 
              elevation={0} 
              sx={{ 
                p: 2, 
                mb: 2, 
                bgcolor: ticket.id === 1 ? 'primary.50' : 'warning.50',
                borderLeft: 4,
                borderColor: ticket.id === 1 ? 'primary.main' : 'warning.main'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1">{ticket.type}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${ticket.price.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    onClick={() => updateQuantity(ticket.id, -1)}
                    size="small"
                    sx={{ bgcolor: 'grey.200' }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>{ticket.quantity}</Typography>
                  <IconButton 
                    onClick={() => updateQuantity(ticket.id, 1)}
                    size="small"
                    sx={{ bgcolor: 'grey.200' }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </DialogContent>
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Qty: {totalQuantity}</Typography>
            <Typography>
              Total: <Box component="span" color="primary.main">${totalPrice.toFixed(0)}</Box>
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={handleProceed}
            disabled={totalQuantity === 0}
            endIcon={<KeyboardArrowRight />}
          >
            Proceed
          </Button>
        </Box>
      </Dialog>

      <AttendeeDetailsForm 
        open={showAttendeeForm}
        onClose={() => setShowAttendeeForm(false)}
        onContinue={handleAttendeeSubmit}
        ticketDetails={tickets.filter(t => t.quantity > 0)}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default TicketOverlay;