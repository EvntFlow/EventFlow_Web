import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack
} from '@mui/material';

// Example social icons from MUI Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

// Placeholder payment icons (use your own images or icon set)
const paymentIcons = [
  'https://via.placeholder.com/50x30?text=Visa',
  'https://via.placeholder.com/50x30?text=MasterCard',
  'https://via.placeholder.com/50x30?text=PayPal',
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        pt: 4,
        pb: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section: 4 Columns */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Column 1: Support */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Support
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Help Center
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Safety information
            </Typography>
            <Typography variant="body2">
              Cancellation options
            </Typography>
          </Grid>

          {/* Column 2: Company */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Company
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              About us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Privacy policy
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Community Blog
            </Typography>
            <Typography variant="body2">
              Terms of service
            </Typography>
          </Grid>

          {/* Column 3: Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              FAQ
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Get in touch
            </Typography>
            <Typography variant="body2">
              Partnerships
            </Typography>
          </Grid>

          {/* Column 4: Social */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Social
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="Facebook"
                sx={{ color: '#fff' }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                sx={{ color: '#fff' }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="YouTube"
                sx={{ color: '#fff' }}
              >
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Section: Copyright & Payment Icons */}
        <Box
          sx={{
            borderTop: '1px solid #333',
            pt: 2,
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="body2">
            © EventFlow 2025
          </Typography>

          {/* Payment Icons */}
          <Stack direction="row" spacing={2}>
            {paymentIcons.map((icon, index) => (
              <Box
                key={index}
                component="img"
                src={icon}
                alt="Payment Method"
                sx={{ width: 50, height: 'auto' }}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
