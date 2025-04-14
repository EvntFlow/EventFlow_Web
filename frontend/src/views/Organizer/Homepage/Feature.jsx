import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';

const Feature = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        // Replace with your background image
        backgroundImage: "url('/img/Feature_Background.png')", // use url() here
        color: '#fff',
        py: { xs: 6, md: 10 },
      }}
    >
      {/* Semi-transparent overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(50, 41, 41, 0.4)',
        }}
      />

      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: { xs: 'center', md: 'center' },
          backgroundImage: '/img/Feature_Background.png'
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          FEATURE ORGANIZERS
        </Typography>

        {/* Cards Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            // justifyContent: { xs: 'center', md: 'flex-start' },
            justifyContent: 'center',
            mb: 4,
          }}
        >
          {/* Card 1 */}
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="180"
              image="/img/Homepage_FeatureEvent1.png"
              alt="Perk 1"
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Organizer 1
              </Typography>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="180"
              image="/img/Homepage_FeatureEvent2.png"
              alt="Perk 2"
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
              Organizer 2
              </Typography>

            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="180"
              image="/img/Homepage_FeatureEvent3.png"
              alt="Perk 3"
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Organizer 3
              </Typography>

            </CardContent>
          </Card>
          {/* Card 4 */}
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="180"
              image="/img/Homepage_FeatureEvent3.png"
              alt="Perk 3"
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Organizer 4
              </Typography>

            </CardContent>
          </Card>
          {/* Card 5 */}
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="180"
              image="/img/Homepage_FeatureEvent3.png"
              alt="Perk 3"
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Organizer 5
              </Typography>

            </CardContent>
          </Card>
        </Box>

        {/* "See all" button */}
        <Button
          variant="contained"
          color="secondary"
          sx={{ 
            backgroundColor: '#fff',
            color: 'primary.main',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            }
          }}
        >
          See all
        </Button>
      </Container>
    </Box>
  );
};

export default Feature;
