import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Container, Grid, IconButton, Paper, Avatar, Chip} from '@mui/material';
import { CalendarMonth, AccessTime, AddCircleOutline, LocationOn, ConfirmationNumber, Star, Share, Add } from '@mui/icons-material';
import TicketOverlay from '../../components/TicketOverlay';
import PaymentPage from '../../components/PaymentPage';
import EventSection from '../../components/EventSection';
import { fetchApi } from '../../api';

const urlSearchParams = () => new URLSearchParams(window.location.search);

const eventsData = [
  { id: 1, image: '/img/TopEvent.png', dateMonth: 'NOV', dateDay: '22', title: 'Event title that can go up to two lines', address: 'Venue 1', timeStart: '10:00 AM', timeEnd: '12:00 PM', price: '$10', interested: 10 },
  { id: 2, image: '/img/TopEvent.png', dateMonth: 'NOV', dateDay: '23', title: 'Another event title that might be a bit longer', address: 'Venue 2', timeStart: '1:00 PM', timeEnd: '3:00 PM', price: '$10', interested: 5 },
  { id: 3, image: '/img/TopEvent.png', dateMonth: 'NOV', dateDay: '24', title: 'A third event title goes here', address: 'Venue 3', timeStart: '2:00 PM', timeEnd: '4:00 PM', price: '$10', interested: 8 },
];

const EventDetailsPage = () => {
  const query = urlSearchParams();
  const uuid = query.get("id");
  //console.log(uuid);
  const [eventData, setEventData] = useState(true);
  const [isTicketOverlayOpen, setIsTicketOverlayOpen] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchEventData = async() => {
      
      const res = await fetchApi('Event', { event: uuid });
      const data = await res.json();
      console.log("Fetched event data:", data);
      setEventData(data);
    };

    if(uuid){
      fetchEventData();
    }
  }, [uuid]);

  const handleCheckout = (data) => {
    setOrderData(data);
    setShowPaymentPage(true);
  };

  const handleBackToEvent = () => {
    setShowPaymentPage(false);
    setOrderData(null);
  };

  const start = new Date(eventData.startDate); 
  const end = new Date(eventData.endDate);

  const formatDate = start.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formatTime = `${start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })} - ${end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })}`;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {!showPaymentPage ? (
        <>
          <Container sx={{ py: 4, flexGrow: 1 }}>

            {!eventData ? (
              <Typography>Loading event details...</Typography>
            ) : (
              <>
                <Paper sx={{ height: 400, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.300' }}>
                  <Box component="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" width="80" height="80" fill="white">
                    <path d="M30,40 L50,20 L70,40 M60,25 A5,5 0 1,1 70,25" />
                  </Box>
                </Paper>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                  <Typography variant="h4" fontWeight="bold">{ eventData.name }</Typography>
                  <Box>
                    <IconButton><Star /></IconButton>
                    <IconButton><Share /></IconButton>
                  </Box>
                </Box>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>Date and Time</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarMonth sx={{ mr: 1 }} />
                        <Typography>{ formatDate }</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTime sx={{ mr: 1 }} />
                        <Typography>{ formatTime }</Typography>
                      </Box>
                      <Button startIcon={<AddCircleOutline />} sx={{ ml: 3, textTransform: 'none' }}>Add to Calendar</Button>
                    </Box>

                    <Grid item xs={12} md={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<ConfirmationNumber />}
                        onClick={() => setIsTicketOverlayOpen(true)}
                        sx={{ bgcolor: '#4dabf5' }}
                      >
                        Buy Tickets
                      </Button>
                    </Grid>

                    <Box sx={{ my: 4 }}>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>Location</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOn sx={{ mr: 1 }} />
                        <Typography>{ eventData.location }</Typography>
                      </Box>
                      <Paper sx={{ height: 160, position: 'relative', bgcolor: 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LocationOn sx={{ fontSize: 40, color: 'error.main' }} />
                      </Paper>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h5" fontWeight="bold">Hosted by</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Avatar sx={{ width: 48, height: 48, mr: 2 }}>AB</Avatar>
                        <Box>
                          <Typography>{eventData?.organizer?.name}</Typography>
                          <Button size="small" variant="outlined" sx={{ textTransform: 'none', mr: 1 }}>Contact</Button>
                          <Button size="small" variant="contained" startIcon={<Add />} sx={{ textTransform: 'none' }}>Follow</Button>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h5" fontWeight="bold">Event Description</Typography>
                      <Typography paragraph>
                        { eventData.description }
                      </Typography>
                      
                    </Box>

                    <Box>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>Tags</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {['Music', 'Festival', 'Outdoor', 'All Ages'].map((tag, index) => (
                          <Chip key={index} label={tag} size="small" />
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ mt: 6 }}>
                      <EventSection events={eventsData} button_flag={false} headTitle="Other events you might like" />
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}
            
          </Container>

          <TicketOverlay
            isOpen={isTicketOverlayOpen}
            onClose={() => setIsTicketOverlayOpen(false)}
            onCheckout={handleCheckout}
          />
        </>
      ) : (
        <PaymentPage orderData={orderData} onBackToOverlay={handleBackToEvent} />
      )}
    </Box>
  );
};

export default EventDetailsPage;
