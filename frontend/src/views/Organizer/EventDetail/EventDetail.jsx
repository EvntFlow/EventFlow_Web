import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {AccessTime, CalendarMonth, ConfirmationNumber, LocationOn, FullscreenOutlined, AddOutlined, RemoveOutlined} from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PhotoIcon from '@mui/icons-material/Photo';

function EventDetail() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Event Image */}
      <Paper sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, bgcolor: '#f0f0f0' }}>
        <PhotoIcon sx={{ fontSize: 80, color: 'grey.400' }} />
        {/* In a real application, you'd replace this with the actual image */}
      </Paper>

      {/* Event Title */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">EVENT TITLE</Typography>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {/* Date and Time */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1">Date and Time</Typography>
            <IconButton aria-label="edit" size="small" sx={{ ml: 1 }}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarMonth sx={{ mr: 1 }} />
            <Typography>Day, Date</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTime sx={{ mr: 1 }} />
            <Typography>Time</Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2 }} />

      {/* Location */}
      <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Location
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOn sx={{ mr: 1 }} />
                      <Typography>Address</Typography>
                    </Box>
                    <Paper 
                      sx={{ 
                        height: 160, 
                        position: 'relative', 
                        bgcolor: 'grey.300',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box sx={{ color: 'error.main' }}>
                        <LocationOn sx={{ fontSize: 40 }} />
                      </Box>
                      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <Paper elevation={1} sx={{ mb: 1, p: 0.5 }}>
                          <FullscreenOutlined fontSize="small" />
                        </Paper>
                        <Paper elevation={1} sx={{ mb: 1, p: 0.5 }}>
                          <AddOutlined fontSize="small" />
                        </Paper>
                        <Paper elevation={1} sx={{ p: 0.5 }}>
                          <RemoveOutlined fontSize="small" />
                        </Paper>
                      </Box>
                    </Paper>
                  </Box>
      <Divider sx={{ mb: 2 }} />

      {/* Ticket Information */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AttachMoneyIcon color="action" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontWeight={'bold'}>Ticket Information</Typography>
          <IconButton aria-label="edit" size="small" sx={{ ml: 1 }}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ConfirmationNumber sx={{ mr: 1 }} />
          <Typography>Ticket Type: Price /ticket</Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {/* Event Description */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Event Description
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum.
          Aenean sed adipiscing enim. Vivamus nisi urna, malesuada libero enim ornare in viverra. Nibh commodo duis
          felis libero dolor volutpat diam quis. Duis a id purus egestas ultricies viverra pellentesque blandit.
          Rutrum consequat eu penatibus ipsum.
          <br /><br />
          ... (rest of the long description) ...
          <br /><br />
          dolor donec odio odio tincidunt convallis. placerat, eget sodales in, tincidunt fringilla nibh urna cum.
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {/* Tags */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Tags
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          <Chip label="Label" size="small" />
          <Chip label="Label" size="small" />
          <Chip label="Label" size="small" />
          <Chip label="Label" size="small" />
          {/* Add more tags as needed */}
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
    </Box>
  );
}

export default EventDetail;