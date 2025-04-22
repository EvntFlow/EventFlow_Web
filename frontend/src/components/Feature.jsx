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
          backgroundImage: 'url(/img/Homepage_FeatureEventBg.png)',
          backgroundSize: 'cover'
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
          variant="h1"
          fontWeight="bold"
          align='center'
          sx={{ 
            mb: 2,
            borderBottom: '2px solid'
           }}
        >
          FEATURED EVENTS
        </Typography>

        {/* Subtitle / Description */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',            
            width: '100%',
            padding: 4,
            gap: 10
          }}
        >
        <Box
          sx={{
            mt: -25
          }}
        >
        <Typography
          sx={{ 
            maxWidth: 500, 
            mb: 4,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          Lorem ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
        </Typography>
        
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
            },
          }}
        >
          See all
        </Button>
        </Box>  
        {/* Cards Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            justifyContent: { xs: 'center', md: 'flex-end' },
            mb: 4,
            alignSelf: 'right'
          }}
        >
          {/* Card 1 */}
          <Card sx={{ maxWidth: 300 , background:'transparent', boxShadow: 'none', border:'none'}}>
            <CardMedia
              component="img"
              height="200"
              image="/img/Homepage_FeatureEvent1.png"
              alt="Perk 1"
              sx={{
                borderRadius: 4
              }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color='white'>
                Perk 1
              </Typography>
              <Typography variant="body2" color="white">
                A brief description of Perk 1.
              </Typography>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card sx={{ maxWidth: 300, background:'transparent' , boxShadow: 'none', border:'none'}}>
            <CardMedia
              component="img"
              height="200"
              image="/img/Homepage_FeatureEvent2.png"
              alt="Perk 2"
              sx={{
                borderRadius: 4
              }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color='white'>
                Perk 2
              </Typography>
              <Typography variant="body2" color="white">
                A brief description of Perk 2.
              </Typography>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card sx={{ maxWidth: 300,  background:'transparent' , boxShadow: 'none', border:'none'}}>
            <CardMedia
              component="img"
              height="200"
              image="/img/Homepage_FeatureEvent3.png"
              alt="Perk 3"
              sx={{
                borderRadius: 4
              }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color='white'>
                Perk 3
              </Typography>
              <Typography variant="body2" color="white">
                A brief description of Perk 3.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default Feature;
