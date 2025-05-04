// @ts-check

import { Alert, Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import EventCard from './EventCard';

/** @typedef {import ("../models/Event").default} Event */

/**
 * @typedef EventSectionProps
 * @property {Event[]=} events
 * @property {string=} title
 * @property {number} rowSize
 */

/**
 * @param {EventSectionProps} props
 * @returns
 */
export default function EventSection(props) {
  return (
    <Box>
        {/* Section Title */}
        {props.title && (
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              {props.title}
          </Typography>
        )}

        {/* Events Grid */}
        {props.events ?
          (props.events.length ? (
            <Grid container={true} size={12} spacing={3} sx={{ justifyContent: "start" }}>
              {props.events.map((event, index) => (
                <Grid
                  size={12 / props.rowSize}
                  key={event.id}>
                  <EventCard event={event} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="error">
              No Events Found
            </Alert>
        )) : (
          <Stack alignContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        )

        }

        {/* "See all" Button */}
        {/*button_flag && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="outlined" sx={{ borderRadius: 2 }}>
              See all
            </Button>
          </Box>
        )*/}
    </Box>
  );
};
