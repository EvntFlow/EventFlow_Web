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
          variant="h2"
          fontWeight="bold"
          sx={{ mb: 2 }}
          style={{ marginBottom: "50px", textDecorationLine: 'underline', textUnderlineOffset: "35px", textDecorationThickness: "1px" }}
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
            marginLeft: "26px",
            marginTop: "10px",
          }}
          //style={{marginTop: "20px"}}
        >
          {/* Card 1 */}
          <Card sx={{ maxWidth: 300, background:'transparent', boxShadow: 'none', border:'none', marginRight: "20px" }}>
            <CardMedia
              component="img"
              height="180"
              image="/img/Homepage_FeatureEvent1.png"
              alt="Perk 1"
              sx={{
                borderRadius: 4
              }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color='white'>
                Organizer 1
              </Typography>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card sx={{ maxWidth: 300, background:'transparent', boxShadow: 'none', border:'none', marginRight: "20px"  }}>
            <CardMedia
              component="img"
              height="180"
              image="/img/Homepage_FeatureEvent2.png"
              alt="Perk 2"
              sx={{
                borderRadius: 4
              }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color='white'>
              Organizer 2
              </Typography>

            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card sx={{ maxWidth: 300, background:'transparent', boxShadow: 'none', border:'none', marginRight: "20px" }}>
            <CardMedia
              component="img"
              height="180"
              image="/img/Homepage_FeatureEvent3.png"
              alt="Perk 3"
              sx={{
                borderRadius: 4
              }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color='white'>
                Organizer 3
              </Typography>

            </CardContent>
          </Card>
          {/* Card 4 */}
          <Card sx={{ maxWidth: 300, background:'transparent', boxShadow: 'none', border:'none', marginRight: "20px" }}>
            <CardMedia
              component="img"
              height="180"
              image="/img/Homepage_FeatureEvent3.png"
              alt="Perk 3"
              sx={{
                borderRadius: 4
              }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color='white'>
                Organizer 4
              </Typography>

            </CardContent>
          </Card>
          {/* Card 5 */}
          <Card sx={{ maxWidth: 300, background:'transparent', boxShadow: 'none', border:'none', marginRight: "20px" }}>
            <CardMedia
              component="img"
              height="180"
              image="/img/Homepage_FeatureEvent3.png"
              alt="Perk 3"
              sx={{
                borderRadius: 4
              }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color='white'>
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
          style={{ borderRadius: "25px", paddingLeft: "30px", paddingRight: "25px"}}
        >
          See all &#8594;
        </Button>
      </Container>
    </Box>
  );
};

export default Feature;
