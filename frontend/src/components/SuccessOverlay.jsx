import React from 'react';
import { Box, Typography, Button,IconButton, Dialog, DialogContent} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Success Overlay component
const SuccessOverlay = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" PaperProps={{ sx: { borderRadius: '16px', maxWidth: '450px' } }}>
      <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Your ticket has been purchased!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Ticket details can be found under Find my ticket tab. Online ticket will be emailed to your registered email.
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          sx={{
            bgcolor: 'black',
            color: 'white',
            py: 1.5,
            px: 4,
            borderRadius: '8px',
            '&:hover': { bgcolor: '#333' }
          }}
        >
          Thanks!
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessOverlay;