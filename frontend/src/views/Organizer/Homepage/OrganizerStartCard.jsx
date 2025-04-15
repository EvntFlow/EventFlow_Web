import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
const EventStartCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 800,
        mx: 'auto', 
        mb: 0,
        mt: 8,
        textAlign: 'center',
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Where Event Organizers grow
        </Typography>

        {/* Subtitle / Description */}
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: 3 }}
        >
          The all-in-one ticketing and discovery platform trusted by millions
          of organizers and attendees worldwide
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button variant="contained" size="large">
            Get started
          </Button>
          <Button variant="outlined" size="large">
            Contact sales
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const OrganizerStartCard = () => {
    return (
        <Box sx={{ mb: 4 }}>
            <Card sx={{ position: 'relative', mb: 4 }}>
                {/* Background Image */}
                <CardMedia
                    component="img"
                    image="/img/Organizer_Homepage.png" // REPLACE with your image URL
                    alt="Hero Background"
                    sx={{
                    height: { xs: 300, md: 500 },
                    objectFit: 'cover',
                    }}
                />
                {/* Overlaid Card */}
                <Box
                    sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    // Center the EventOrganizerCard in the middle
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}
                >
                  <EventStartCard />
                </Box>
            </Card>
      </Box>
    );
};
  
export default OrganizerStartCard;
