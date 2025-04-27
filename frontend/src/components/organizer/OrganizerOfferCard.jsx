import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
} from '@mui/material';
//import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const OrganizerOfferCard = () => {
  return (
    <Card
      sx={{
        // maxWidth: 1200,
        mx: 'auto',    // center horizontally
        p: { xs: 2, md: 4 },
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        {/* Section Title */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 1000}}
          align="center"
          gutterBottom
          style={{marginBottom: "30px"}}
        >
          OUR OFFERS
        </Typography>

        {/* Offers Grid */}
        <Grid container spacing={4} justifyContent="center">
          {/* Offer 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              sx={{ maxWidth: 220, mx: 'auto' }} 
              textAlign="center"
            >
              {/* Icon */}
              <img
                src="/img/OrganizerHomepage/ticket-2.png" 
                alt="Event Ticketing"
                style={{ width: 40, height: 40}}
              />
              {/* Title */}
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }} style={{textDecorationLine: 'underline'}}>
                Event Ticketing
              </Typography>
              {/* Description */}
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mt: 1 }}
              >
                Lorem Ipsum is simply dummy text of the printing
                and typeset industry. Lorem Ipsum has been lorem...
              </Typography>
            </Box>
          </Grid>

          {/* Offer 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              sx={{ maxWidth: 220, mx: 'auto' }} 
              textAlign="center"
            >
              <img
                src="/img/OrganizerHomepage/video-play.png"
                alt="EventFlow Ads"
                style={{ width: 40, height: 40 }}
              />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }} style={{textDecorationLine: 'underline'}}>
                EventFlow Ads
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mt: 1 }}
              >
                Lorem Ipsum is simply dummy text of the printing
                and typeset industry. Lorem Ipsum has been lorem...
              </Typography>
            </Box>
          </Grid>

          {/* Offer 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              sx={{ maxWidth: 220, mx: 'auto' }} 
              textAlign="center"
            >
              <img
                src="/img/OrganizerHomepage/dollar-circle.png"
                alt="Payments"
                style={{ width: 40, height: 40 }}
              />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }} style={{textDecorationLine: 'underline'}}>
                Payments
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mt: 1 }}
              >
                Lorem Ipsum is simply dummy text of the printing
                and typeset industry. Lorem Ipsum has been lorem...
              </Typography>
            </Box>
          </Grid>

          {/* Offer 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              sx={{ maxWidth: 220, mx: 'auto' }} 
              textAlign="center"
            >
              <img
                src="/img/OrganizerHomepage/chart-square.png"
                alt="Reporting & Analytics"
                style={{ width: 40, height: 40 }}
              />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }} style={{textDecorationLine: 'underline'}}>
                Reporting &amp; Analytics
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mt: 1 }}
              >
                Lorem Ipsum is simply dummy text of the printing
                and typeset industry. Lorem Ipsum has been lorem...
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Join Button */}
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
            style={{ borderRadius: "25px"}}
          >
            Join us now &#8594;
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrganizerOfferCard;
