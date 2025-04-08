import React from 'react';
import { Box, Typography, Button, Grid} from '@mui/material';
import EventCard from './EventCard';

const EventSection = ({ headTitle = "", events, button_flag = true, gridItemsPerRow = 3 }) => {
  return (
    <Box sx={{ py: 6 }}>
      <div>
        {/* Section Title */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          {headTitle}
        </Typography>

        {/* Events Grid */}
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {events.map((event, index) => (
            <Grid
              item
              xs={12}  // Full width for each card
              sm={12 / gridItemsPerRow} // Custom number of items per row
              key={event.id || index}
              sx={{
                display: 'flex',
                justifyContent: 'center', // Center cards within the grid
                alignItems: 'stretch', // Ensure cards stretch to the same height
              }}
            >
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
                sx={{ width: '100%', height: '100%' }} // Ensure EventCard fills its container
              />
            </Grid>
          ))}
        </Grid>

        {/* "See all" Button */}
        {button_flag && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="outlined" sx={{ borderRadius: 2 }}>
              See all
            </Button>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default EventSection;
