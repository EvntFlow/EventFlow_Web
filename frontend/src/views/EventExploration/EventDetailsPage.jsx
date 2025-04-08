import React, { useState } from 'react';
import {
  Toolbar, Typography, Box, Button, Container, Grid, IconButton, Paper, Avatar, Chip,
} from '@mui/material';
import {
  CalendarMonth, AccessTime, AddCircleOutline, LocationOn, ConfirmationNumber,
  Star, Share, Add, FullscreenOutlined, AddOutlined, RemoveOutlined
} from '@mui/icons-material';
import TicketOverlay from '../../components/TicketOverlay';
import Header from '../../components/Header';
import EventSection from '../../components/EventSection';


const eventsData = [
  {
    id: 1,
    image: 'https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png',
    dateMonth: 'NOV',
    dateDay: '22',
    title: 'Event title that can go up to two lines',
    address: 'Venue 1',
    timeStart: '10:00 AM',
    timeEnd: '12:00 PM',
    price: '$10',
    interested: 10,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/320x180?text=Event+Image',
    dateMonth: 'NOV',
    dateDay: '23',
    title: 'Another event title that might be a bit longer',
    address: 'Venue 2',
    timeStart: '1:00 PM',
    timeEnd: '3:00 PM',
    price: '$10',
    interested: 5,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/320x180?text=Event+Image',
    dateMonth: 'NOV',
    dateDay: '24',
    title: 'A third event title goes here',
    address: 'Venue 3',
    timeStart: '2:00 PM',
    timeEnd: '4:00 PM',
    price: '$10',
    interested: 8,
  },
];

const EventDetailsPage = () => {
  const [isTicketOverlayOpen, setIsTicketOverlayOpen] = useState(false);
  
  const handleOpenTicketOverlay = () => {
    setIsTicketOverlayOpen(true);
  };
  
  const handleCloseTicketOverlay = () => {
    setIsTicketOverlayOpen(false);
  };
  
  const handleCheckout = (orderData) => {
    console.log('Order completed:', orderData);
    // Process checkout
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Toolbar />
      {/* Main Content */}
      <Container sx={{ py: 4, flexGrow: 1 }}>
        {/* Event Banner */}
        <Paper 
          sx={{ 
            height: 400, 
            mb: 4, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'grey.300'
          }}
        >
          <Box component="svg" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 80" 
            width="80" 
            height="80" 
            fill="white"
          >
            <path d="M30,40 L50,20 L70,40 M60,25 A5,5 0 1,1 70,25" />
          </Box>
        </Paper>

        {/* Event Title and Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            EVENT TITLE
          </Typography>
          <Box>
            <IconButton>
              <Star />
            </IconButton>
            <IconButton>
              <Share />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Datetime + Buy ticket */}
            <Box sx ={{ display: 'flex', justifyContent: 'space-between'}}>
              {/* Date and Time */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Date and Time
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarMonth sx={{ mr: 1 }} />
                  <Typography>Day, Date</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTime sx={{ mr: 1 }} />
                  <Typography>Time</Typography>
                </Box>
                <Button 
                  startIcon={<AddCircleOutline />} 
                  sx={{ ml: 3, textTransform: 'none' }}
                  color="primary"
                >
                  Add to Calendar
                </Button>
              </Box>
              {/* Buy Tickets Section */}
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<ConfirmationNumber />}
                  onClick={handleOpenTicketOverlay}
                  sx={{ bgcolor: '#4dabf5' }}
                >
                  Buy Tickets
                </Button>
              </Grid>
            </Box>
            
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

            {/* Ticket Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Ticket Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ConfirmationNumber sx={{ mr: 1 }} />
                <Typography>Ticket Type: Price /ticket</Typography>
              </Box>
            </Box>

            {/* Hosted by */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Hosted by
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: 'grey.300', mr: 2 }} />
                <Box>
                  <Typography fontWeight="medium">Host Name</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{ textTransform: 'none', py: 0 }}
                    >
                      Contact
                    </Button>
                    <Button 
                      variant="contained" 
                      size="small" 
                      startIcon={<Add sx={{ fontSize: 16 }} />}
                      sx={{ textTransform: 'none', py: 0 }}
                    >
                      Follow
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Event Description */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Event Description
              </Typography>
              <Typography >
                Lorem ipsum dolor sit amet consectetur. Eget vulputate sociis sit urna sit aliquet. Vivamus facilisis diam libero dolor volutpat diam eu. Quis a id egestas ante ipsum et enim vivamus. Urna et blandit malesuada libero enim convallis. Nibh commodo quis tellus aliquet nibh placerat laoreet id consequat ultrices vulputate turpis neque viverra tempor nunc. Et amet massa tellus consequat mauris imperdiet tellus. Praesent risus magna sed turpis eleiftas parietur pellentesque blandit.
              </Typography>
              <Typography>
                Blandit convallis eu porttitor ipsum at vestibulum a pharetra facilisis varius proin ultrices tellus. Ac viverra pharetra sit elementum magna nulla ornare in a. Egestas velit id sit a. Elementum et pellentesque purus vulputate urna vel tellus felis. Tellus id et enim nibh massa viverra amet vitae. Blandit commodo id massa donec. Placerat mauris nunc proin bibendum risus quis aliquet et.
              </Typography>
              <Typography>
                Vel etiam nunc qua. Volutpat interdum fermentum at tellus nunc tincidunt du. Et tellus nunc vel diam et. Ac dictum ullamcorper imperdiet ut adipiscing pellentesque ullamcorper. Mauris sit consectetur mi quisque in fermentum non urna. Cras tortor consequat erat eu luctus facilisis odio amet. Ac molestie laoreet at tempus posuere. Adipiscing volupat tempor vel dolor sit erat.
              </Typography>
            </Box>

            {/* Tags */}
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {['Label', 'Label', 'Label', 'Label'].map((label, index) => (
                  <Chip key={index} label={label} size="small" />
                ))}
              </Box>
            </Box>
            {/* Other Events */}
            <Box sx={{ mb: 4 }}>
                <EventSection events={eventsData} button_flag={false} headTitle='Other events you might like' />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Ticket Selection Dialog */}
      <TicketOverlay
        isOpen={isTicketOverlayOpen}
        onClose={handleCloseTicketOverlay}
        onCheckout={handleCheckout}
      />
    </Box>
  );
};

export default EventDetailsPage;