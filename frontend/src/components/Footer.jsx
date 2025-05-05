import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';

// Example social icons from MUI Icons
import { FacebookRounded, X, YouTube } from '@mui/icons-material';

// Placeholder payment icons (use your own images or icon set)
const paymentIcons = [
  '/img/visa.png',
  '/img/mastercard.png',
  '/img/paypal.png',
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
        <Grid size={12} container spacing={4} sx={{ mb: 4 }}>
          {/* Column 1: Support */}
          <Grid size={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Support
            </Typography>
            <Stack spacing={1}>
              <Link typography={"body2"} sx={{ color: "inherit" }} href="#">
                Help Center
              </Link>
              <Link typography={"body2"} sx={{ color: "inherit" }} href="#">
                Safety Information
              </Link>
              <Link typography={"body2"} sx={{ color: "inherit" }} href="#">
                Cancellation Options
              </Link>
            </Stack>
          </Grid>

          {/* Column 2: Company */}
          <Grid size={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Company
            </Typography>
            <Stack spacing={1}>
              <Link typography={"body2"} sx={{ color: "inherit" }} href="#">
                About Us
              </Link>
              <Link typography={"body2"} sx={{ color: "inherit" }} href="#">
                Privacy Policy
              </Link>
              <Link
                typography={"body2"}
                sx={{ color: "inherit" }}
                href="https://reality.trungnt2910.com">
                  Company Blog
              </Link>
              <Link typography={"body2"} sx={{ color: "inherit" }} href="#">
                Terms of Service
              </Link>
            </Stack>
          </Grid>

          {/* Column 3: Contact */}
          <Grid size={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Stack spacing={1}>
              <Link typography={"body2"} sx={{ color: "inherit" }} href="#">
                FAQ
              </Link>
              <Link
                typography={"body2"}
                sx={{ color: "inherit" }}
                href="mailto:admin@ef.trungnt2910.com">
                  Get In Touch
              </Link>
              <Link typography={"body2"} sx={{ color: "inherit" }} href="#">
                Partnerships
              </Link>
            </Stack>
          </Grid>

          {/* Column 4: Social */}
          <Grid size={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Social
            </Typography>
            <Stack direction="row" spacing={2}>
              <FacebookRounded fontSize="medium" />
              <X fontSize="medium" />
              <Link
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                sx={{ color: "inherit" }}>
                <YouTube fontSize="medium" />
              </Link>
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
