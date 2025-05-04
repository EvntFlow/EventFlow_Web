import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button, useTheme
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import EventSection from './EventSection';

/** @typedef {import('../backend').FindEventParams} FindEventParams */

/** @type {FindEventParams} */
const queryAll = { };

const Featured = () => {
  const theme = useTheme();

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
          backgroundImage: 'url(/img/Homepage_FeatureEventBg.png)',
          backgroundSize: 'cover'
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
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
          variant="h5"
        >
          Check out hundreds of trending events on EventFlow!
        </Typography>

        {/* "See all" button */}
          <Button
            variant="outlined"
            size="large"
            href="/Event/Search"
            color="primary"
            sx={{
              borderRadius: 8,
              backgroundColor: theme.palette.background.paper
            }}
            endIcon={
              <ArrowForward />
            }>
              See all
          </Button>
        </Box>

        <EventSection
          query={queryAll}
          limit={3}
          rowSize={3}
          variant="simple"
          disableSeeAllButton />
      </Box>
    </Container>
    </Box>
  );
};

export default Featured;
