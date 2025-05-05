import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
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
          <Grid size={3}>
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
          <Grid size={9}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 3, md: 5 },
              backgroundColor: "#F3F3F3",
            }}
          >
            <Stack width="100%" alignItems="center">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  textAlign: 'center',
                }}
              >
                Get notified of upcoming events,
                <br />
                and more from EventFlow
              </Typography>

              {/* Subscription Input and Button */}
              <Box
                component="form"
                method="get"
                action={window.location.href}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '50px',
                  boxShadow: 2,
                  width: "60%",
                  minWidth: "20rem"
                }}
              >
                <TextField
                  variant="standard"
                  placeholder="Enter your email"
                  type="email"
                  required
                  fullWidth
                  slotProps={{
                    input: {
                      disableUnderline: true,
                      sx: {
                        pl: 2,
                        fontSize: '16px',
                      },
                    }
                  }}
                  sx={{
                    borderTopLeftRadius: '50px',
                    borderBottomLeftRadius: '50px',
                    backgroundColor: 'transparent',
                  }}
                />
                <Button
                  variant="contained"
                  type="submit"
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
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SubscribeSection;
