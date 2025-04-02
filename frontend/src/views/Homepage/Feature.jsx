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
        backgroundImage: 'url("https://via.placeholder.com/1920x1080?text=Feature+Background")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        py: { xs: 6, md: 10 },
      }}
    >
      {/* Semi-transparent overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      />

      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          FEATURE EVENTS
        </Typography>

        {/* Subtitle / Description */}
        <Typography
          variant="body1"
          sx={{ maxWidth: 500, mb: 4 }}
        >
          Lorem ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
        </Typography>

        {/* Cards Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            justifyContent: { xs: 'center', md: 'flex-start' },
            mb: 4,
          }}
        >
          {/* Card 1 */}
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="180"
              image="https://via.placeholder.com/300x180?text=Perk+1"
              alt="Perk 1"
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Perk 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A brief description of Perk 1.
              </Typography>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="180"
              image="https://via.placeholder.com/300x180?text=Perk+2"
              alt="Perk 2"
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Perk 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A brief description of Perk 2.
              </Typography>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="180"
              image="https://via.placeholder.com/300x180?text=Perk+3"
              alt="Perk 3"
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Perk 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A brief description of Perk 3.
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
