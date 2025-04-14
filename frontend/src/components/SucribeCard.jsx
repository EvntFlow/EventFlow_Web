import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const SubscribeSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        backgroundColor: '#fff',
        borderRadius: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {/* Left Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/img/SubcriptionImage.png"
              alt="Beachfront property"
              sx={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </Grid>

          {/* Right Subscription Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 3, md: 5 },
            }}
          >
            <Box width="100%">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                Get notified of upcoming events, 
                <br /> 
                and more from EventFlow
              </Typography>

              {/* Subscription Input and Button */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  maxWidth: 500,
                  mt: 3,
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Enter your email"
                  fullWidth
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SubscribeSection;
