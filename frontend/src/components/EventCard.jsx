// @ts-check

import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Stack,
  CardActionArea
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import dayjs from 'dayjs';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { Star } from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';

/** @typedef {import ("../models/Event").default} Event */

/**
 * @typedef EventCardProps
 * @property {Event} event
 */

/**
 * @param {EventCardProps} event
 */
export default function EventCard({ event }) {

  const startDate = dayjs(event.startDate);
  const endDate = dayjs(event.endDate);

  const eventDetailsUrl = new URL("/Event/Details", window.location.href);
  eventDetailsUrl.searchParams.set("event", event.id);

  return (
    <Card
      component="div"
      sx={{ borderRadius: 4, height: "25rem" }}
    >
      {/* Image with a star icon in the top-right corner */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={event.bannerUri || "/img/TopEvent.png"}
          alt={event.name}
          onError={(e) => /** @type {HTMLImageElement} */(e.target).src = "/img/TopEvent.png"}
          sx={{ height: "15rem" }}

        />
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
          size="large">
          <StarBorderIcon />
        </IconButton>
      </Box>
      {/* Card Content: Date, Title, Address, Time, Price, Interested */}
      <CardActionArea href={eventDetailsUrl.toString()} sx={{ height: "100%" }}>
        <CardContent sx={{ display: 'flex', gap: 2 }}>
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
                `${startDate.format("DD/MM/YYYY HH:mm")} - ${endDate.format("DD/MM/YYYY HH:mm")}`
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
                {0} interested
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
