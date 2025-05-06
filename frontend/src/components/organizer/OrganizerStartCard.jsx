// @ts-check
import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

function EventStartCard() {
  const height = 15;
  const width = 60;

  return (
    <Card
      sx={{
        textAlign: 'center',
        boxSizing: "border-box",
        height: `${height}rem`,
        width: `min(${width}rem, 100%)`,
        position: "absolute",
        left: `calc((100% - min(${width}rem, 100%)) / 2)`,
        bottom: `${-height / 2}rem`,
        zIndex: 1,
        borderRadius: 8,
        padding: 1
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* Title */}
          <Typography variant="h3" color="primary" fontWeight="bold">
            <b>Where Event Organizers grow</b>
          </Typography>

          {/* Subtitle / Description */}
          <Typography variant="h6" fontWeight="regular" color="textSecondary">
            The all-in-one ticketing and discovery platform trusted by millions
            of organizers and attendees worldwide
          </Typography>

          {/* Buttons */}
          <Stack>
            <Stack direction="row" alignContent="center" alignSelf="center" spacing={4}>
              <Button
                href="/Event/Create"
                variant="contained"
                size="large"
                style={{ borderRadius: 25 }}
                endIcon={<ArrowForward />}
              >
                Get started
              </Button>
              <Button
                href="mailto:admin@ef.trungnt2910.com"
                variant="outlined"
                size="large"
                style={{ borderRadius: 25 }}
                endIcon={<ArrowForward />}
              >
                Contact Sales
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default function OrganizerStartCard() {
  return (
    <Box sx={{ position: "relative", mb: "15vh", height: "30rem" }}>
      {/* Background Image */}
      <img
        src="/img/Organizer_Homepage.png" // REPLACE with your image URL
        alt="Hero Background"
        style={{ width: "100%", height: "100%", objectFit: 'cover' }}
      />
      {/* Overlaid Card */}

      <EventStartCard />
    </Box>
  );
};
