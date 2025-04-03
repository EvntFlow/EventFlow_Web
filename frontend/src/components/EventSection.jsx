import React from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import EventCard from './EventCard';

const EventSection = ({ headTitle, events }) => {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        {/* Section Title */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          {headTitle}
        </Typography>

        {/* Events Grid */}
        <Grid container spacing={3}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={event.id || index}>
              <EventCard
                image={event.image}
                dateMonth={event.dateMonth}
                dateDay={event.dateDay}
                title={event.title}
                address={event.address}
                timeStart={event.timeStart}
                timeEnd={event.timeEnd}
                price={event.price}
                interested={event.interested}
              />
            </Grid>
          ))}
        </Grid>

        {/* "See all" Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" sx={{ borderRadius: 2 }}>
            See all
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EventSection;
