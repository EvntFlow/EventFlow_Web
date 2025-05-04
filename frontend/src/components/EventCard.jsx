// @ts-check

import { Star, StarBorder } from '@mui/icons-material';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import AuthorizedView from './AuthorizedView';
import { deleteEvent, saveEvent } from '../backend';

/** @typedef {import ("../models/Event").default} Event */

/** @typedef {"simple" | "default"} EventCardVariant */

/**
 * @typedef EventCardProps
 * @property {Event} event
 * @property {EventCardVariant=} variant
 */

/**
 * @param {EventCardProps} event
 */
export default function EventCard({ event, variant }) {
  const startDate = dayjs(event.startDate);
  const endDate = dayjs(event.endDate);

  const eventDetailsUrl = new URL("/Event/Details", window.location.href);
  eventDetailsUrl.searchParams.set("event", event.id);

  const imageHeight = 15;

  const [descriptionHeight, setDescriptionHeight] = useState(10);
  useEffect(() => {
    setDescriptionHeight(variant === "simple" ? 5 : 10);
  }, [variant]);

  const [isSaved, setIsSaved] = useState(!!event.savedEvent);
  useEffect(() => {
    setIsSaved(!!event.savedEvent);
  }, [event]);

  const handleSaveEvent = useCallback(async () =>
  {
    if (!isSaved) {
      let savedEvent = await saveEvent(event.id);
      if (savedEvent) {
        event.savedEvent = savedEvent;
        setIsSaved(true);
      }
    } else if (event.savedEvent) {
      let ok = await deleteEvent(event.savedEvent.id);
      if (ok) {
        event.savedEvent = undefined;
        setIsSaved(false);
      }
    }
  }, [isSaved, event]);

  return (
    <Card
      component="div"
      sx={{ borderRadius: 4, height: `${imageHeight + descriptionHeight}rem` }}
    >
      {/* Image with a star icon in the top-right corner */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={event.bannerUri || "/img/TopEvent.png"}
          alt={event.name}
          onError={(e) => /** @type {HTMLImageElement} */(e.target).src = "/img/TopEvent.png"}
          sx={{ height: `${imageHeight}rem` }}
        />

        {variant !== "simple" && (
          <AuthorizedView role="attendee">
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: 'grey.200',
                },
              }}
              size="large"
              onClick={() => handleSaveEvent()}>
              {isSaved ? (
                <Star />
              ) : (
                <StarBorder />
              )}
            </IconButton>
          </AuthorizedView>
        )}
      </Box>
      {/* Card Content: Date, Title, Address, Time, Price, Interested */}
      <CardActionArea href={eventDetailsUrl.toString()} sx={{ height: "100%" }}>
        <CardContent sx={{ display: 'flex', gap: 2 }}>
          {variant === "simple" ? (
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                textOverflow: "ellipsis",
                overflow: "hidden",
                lineClamp: 2,
                wordBreak: "break-word",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                display: "-webkit-box"
              }}
            >
              {event.name}
            </Typography>
          ) : (
            <>
              {/* Date Section */}
              <Box
                sx={{
                  minWidth: 50,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: deepPurple[600], fontWeight: 'bold', textTransform: 'uppercase' }}
                >
                  {startDate.format('MMM')}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
                  {startDate.date()}
                </Typography>
              </Box>

              {/* Event Details */}
              <Stack spacing={1} sx={{ flex: 1 }}>
                {/* Title (allow up to two lines) */}
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 'bold',
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    lineClamp: 2,
                    wordBreak: "break-word",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    display: "-webkit-box"
                  }}
                >
                  {event.name}
                </Typography>

                {/* Address (Venue) */}
                <Typography variant="body2" color="text.secondary">
                  <b>{event.location}</b>
                </Typography>

                {/* Time */}
                <Typography variant="body2" color="text.secondary">
                  {startDate.startOf("day").isSame(endDate.startOf("day")) ?
                    `${startDate.format("HH:mm")} - ${endDate.format("HH:mm")}` :
                    `${
                      startDate.format("DD/MM/YYYY HH:mm")
                    } - ${
                      endDate.format("DD/MM/YYYY HH:mm")
                    }`
                  }
                </Typography>

                {/* Price & Interested */}
                <Stack direction="row">
                  <LocalActivityIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.primary">
                    {event.price === 0 ? "Free" : `$${event.price}`}
                  </Typography>
                  <Typography variant="body2" sx={{ mx: 1 }}>
                    •
                  </Typography>
                  <Star fontSize="small" sx={{ color: deepPurple[600], mr: 0.5 }} />
                  <Typography variant="body2" color="text.primary">
                    {event.interested} interested
                  </Typography>
                </Stack>
              </Stack>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
