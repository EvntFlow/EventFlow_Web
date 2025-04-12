import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const OfferCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 1200,
        mx: 'auto',    // center horizontally
        p: { xs: 2, md: 4 },
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        {/* Section Title */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold' }}
          align="center"
          gutterBottom
        >
          OUR OFFERS
        </Typography>

        {/* Offers Grid */}
        <Grid container spacing={4} justifyContent="center">
          {/* Offer 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center">
              {/* Icon */}
              <img
                src="/img/EventTicketing.png" 
                alt="Event Ticketing"
                style={{ width: 40, height: 40 }}
              />
              {/* Title */}
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
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
            <Box textAlign="center">
              <img
                src="/img/EventFlowAds.png"
                alt="EventFlow Ads"
                style={{ width: 40, height: 40 }}
              />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
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
            <Box textAlign="center">
              <img
                src="/img/Payments.png"
                alt="Payments"
                style={{ width: 40, height: 40 }}
              />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
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
            <Box textAlign="center">
              <img
                src="/img/Reporting.png"
                alt="Reporting & Analytics"
                style={{ width: 40, height: 40 }}
              />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
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
            endIcon={<ArrowForwardIosIcon />}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Join us now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OfferCard;
