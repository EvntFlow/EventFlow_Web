import React from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function AttendanceDetailCard({ onClose }) {
  return (
    <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, boxShadow: 5 }}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="h6">Attendee Details</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Event Name: Standard Ticket: Ticket #1
        </Typography>

        <Grid container alignItems="center" spacing={1} mb={2}>
          <Grid item>
            <CalendarMonthIcon color="action" />
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Saturday, 2 December 2023
            </Typography>
          </Grid>
        </Grid>

        <TextField fullWidth label="Full Name" variant="outlined" defaultValue="ABC" margin="normal" />
        <TextField fullWidth label="Email" variant="outlined" defaultValue="abc@gmail.com" margin="normal" />
        <TextField fullWidth label="Phone number" variant="outlined" defaultValue="0123456789" margin="normal" />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="contained" color="error">
            Reject
          </Button>
          <Button variant="contained" color="success">
            Approve
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AttendanceDetailCard;