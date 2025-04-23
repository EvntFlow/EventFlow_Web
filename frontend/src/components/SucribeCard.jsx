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
            borderRadius: 7,
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
                  marginLeft: "200px",
                  textAlign: 'center',
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
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '50px',
                  boxShadow: 2,
                  p: '5px',
                  maxWidth: 600,
                  //mx: 'auto',
                  marginLeft: "160px"
                  
                }}
              >
                <TextField
                  variant="standard"
                  placeholder="Enter your email"
                  fullWidth
                  //sx={{ marginLeft: "200px"}}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      pl: 2,
                      //flex: 1,
                      fontSize: '16px',
                    },
                  }}
                  sx={{
                    borderTopLeftRadius: '50px',
                    borderBottomLeftRadius: '50px',
                    backgroundColor: 'transparent',
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    backgroundColor: '#008b99',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#007a88',
                    },
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
