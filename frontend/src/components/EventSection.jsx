// @ts-check

import { Alert, Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { findEvents } from '../backend';
import { ArrowForward } from '@mui/icons-material';

/** @typedef {import("../models/Event").default} Event */
/** @typedef {import("../backend").FindEventParams} FindEventParams */
/** @typedef {import('./EventCard').EventCardVariant} EventCardVariant */

/**
 * @typedef EventSectionProps
 * @property {Event[]=} events
 * @property {FindEventParams=} query
 * @property {string=} title
 * @property {number=} limit
 * @property {number} rowSize
 * @property {boolean=} disableSeeAllButton
 * @property {EventCardVariant=} variant
 */

/**
 * @param {EventSectionProps} props
 * @returns
 */
export default function EventSection(props) {
  const [events, setEvents] = useState(/** @type {Event[] | null} */(null));

  useEffect(() => {
    (async function() {
      let retrievedEvents = props.events;
      if (!retrievedEvents && props.query) {
        retrievedEvents = await findEvents(props.query);
      }
      if (retrievedEvents && props.limit) {
        retrievedEvents = retrievedEvents.slice(0, Math.min(retrievedEvents.length, props.limit));
      }
      setEvents(retrievedEvents ?? null);
    })();
  }, [props.events, props.query, props.limit]);

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      {/* Section Title */}
      {props.title && (
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            {props.title}
        </Typography>
      )}

      <Box>
        {/* Events Grid */}
        {events ?
          (events.length ? (
            <Grid container={true} size={12} spacing={3} sx={{ justifyContent: "start" }}>
              {events.map((event) => (
                <Grid
                  size={12 / (props.rowSize || 3)}
                  key={event.id}>
                  <EventCard event={event} variant={props.variant} />
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
      </Box>

      {/* "See all" Button */}
      {props.query && !props.disableSeeAllButton && (
        <Box sx={{ textAlign: 'center' }}>
          {/* Hidden form */}
          <form
            method="get"
            action="/Event/Search">
              {props.query.location?.map(l => (
                <input name="location" value={l} hidden readOnly />
              ))}
              <input
                name="minDate"
                value={props.query.minDate || undefined}
                hidden={true}
                readOnly={true} />
              <input
                name="maxDate"
                value={props.query.maxDate || undefined}
                hidden={true}
                readOnly={true} />
              <input
                name="minPrice"
                value={props.query.minPrice || undefined}
                hidden={true}
                readOnly={true} />
              <input
                name="maxPrice"
                value={props.query.maxPrice || undefined}
                hidden={true}
                readOnly={true} />
              {props.query.category?.map(l => (
                <input name="category" value={l} hidden readOnly />
              ))}
              <input
                name="keywords"
                value={props.query.keywords}
                hidden={true}
                readOnly={true} />

              <Button
                variant="outlined"
                size="large" sx={{ borderRadius: 8 }}
                type="submit"
                color="primary"
                endIcon={
                  <ArrowForward />
                }>
                  See all
              </Button>
          </form>
        </Box>
      )}
    </Stack>
  );
};
