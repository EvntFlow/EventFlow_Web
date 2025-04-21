import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Divider,
  Chip,
  Link,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
            <AccessTimeIcon color="action" sx={{ mr: 1 }} />
            <Typography variant="subtitle1">Date and Time</Typography>
            <IconButton aria-label="edit" size="small" sx={{ ml: 1 }}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Day, Date
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Time
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2 }} />

      {/* Location */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon color="action" sx={{ mr: 1 }} />
            <Typography variant="subtitle1">Location</Typography>
            <IconButton aria-label="edit" size="small" sx={{ ml: 1 }}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Address
          </Typography>
        </Grid>
        {/* Map Placeholder */}
        <Grid item xs={12} sx={{ height: 200, bgcolor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* In a real application, you'd embed a map here */}
          <LocationOnIcon sx={{ fontSize: 80, color: 'grey.400' }} />
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2 }} />

      {/* Ticket Information */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AttachMoneyIcon color="action" sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Ticket Information</Typography>
          <IconButton aria-label="edit" size="small" sx={{ ml: 1 }}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Ticket Type: Price ticket
        </Typography>
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

      {/* Links */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Links
        </Typography>
        <Link href="#" color="primary" display="block" variant="body2">
          Link 1
        </Link>
        <Link href="#" color="primary" display="block" variant="body2">
          Link 2
        </Link>
        {/* Add more links as needed */}
      </Box>
    </Box>
  );
}

export default EventDetail;