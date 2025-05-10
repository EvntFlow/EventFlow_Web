// @ts-check

import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip, Grid,
  IconButton, Stack, Typography
} from "@mui/material";
import React, { useCallback } from "react";
import {
  AccessTime,
  Add,
  AddCircleOutline,
  CalendarMonth, EditOutlined,
  HourglassTop,
  LocalActivity,
  LocationOn,
  ShareOutlined
} from "@mui/icons-material";
import SaveEvent from "./SaveEvent";
import dayjs from "dayjs";
import AuthorizedView from "./AuthorizedView";
import GoogleMapsFrame from "./GoogleMapsFrame";

/**
 * @import Event from "../models/Event";
 * @import TicketOption from "../models/TicketOption";
 */

/**
 * @typedef EventDetailsViewProps
 * @property { Event } event
 * @property { boolean= } isEdit
 * @property { boolean= } isPreview
 * @property { React.MouseEventHandler<HTMLButtonElement>= } onShareEvent
 * @property { React.MouseEventHandler<HTMLButtonElement>= } onBuyTickets
 * @property { React.MouseEventHandler<HTMLButtonElement>= } onAddCalendar
 * @property { React.MouseEventHandler<HTMLButtonElement>= } onEditDate
 * @property { React.MouseEventHandler<HTMLButtonElement>= } onEditLocation
 * @property { React.MouseEventHandler<HTMLButtonElement>= } onEditDescription
 * @property { React.MouseEventHandler<HTMLButtonElement>= } onEditTickets
 * @property { React.MouseEventHandler<HTMLButtonElement>= } onEditCategories
 */

/**
 * @param { EventDetailsViewProps } props
 */

export default function EventDetailsView(props) {
  const { event } = props

  const formatPrice = useCallback(
    /**
     * @param {TicketOption} to
     */
    function (to) {
      if (!event) {
        return null;
      }
      const price = event.price + to.additionalPrice;
      if (!price) {
        return "Free"
      } else {
        return `$${price.toFixed(2)}/ticket`;
      }
    }
    , [event]);

  const formatDuration = useCallback(() => {
    if (!event) {
      return null;
    }
    const startDate = dayjs(event.startDate);
    const endDate = dayjs(event.endDate);
    let numeric;
    let unit;
    const hourDiff = endDate.diff(startDate, "hour", true);
    if (hourDiff < 1) {
      numeric = endDate.diff(startDate, "minute");
      unit = "minute";
    } else if (hourDiff < 24) {
      numeric = Math.round(hourDiff * 10) / 10;
      unit = "hour";
    } else {
      numeric = endDate.diff(startDate, "day");
      unit = "day";
    }
    if (numeric > 1) {
      unit += "s";
    }
    return `${numeric} ${unit}`;
  }, [event]);

  return (
    <Stack spacing={3}>
      <Box
        component="img"
        src={event.bannerUri}
        onError={(e) =>
          /** @type {HTMLImageElement} */(e.target).src = "/img/TopEvent.png"
        }
        sx={{
          width: "100%",
          height: "15rem",
          objectFit: "cover",
          borderRadius: 4
        }} />

      <Grid container={true} sx={{ display: "flex", justifyItems: "stretch" }}>
        <Grid size={6}>
          <Typography variant="h4" textTransform="uppercase">
            <b>{event.name}</b>
          </Typography>
        </Grid>
        <Grid size={6}>
          <Stack direction="row-reverse" spacing={1}>
            {props.onShareEvent &&
              <IconButton onClick={props.onShareEvent}>
                <ShareOutlined />
              </IconButton>
            }
            <SaveEvent event={event} />
            <AuthorizedView role="organizer">
              <Stack direction="row-reverse">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LocalActivity />}
                  href={`/Ticket/Attendance?event=${event.id}`}
                >
                  View Attendance
                </Button>
              </Stack>
            </AuthorizedView>
          </Stack>
        </Grid>
      </Grid>

      <Grid container={true} sx={{ display: "flex", justifyItems: "stretch" }}>
        <Grid size={6}>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Date and Time
                </Typography>
                {props.onEditDate &&
                  <IconButton color="primary" onClick={props.onEditDate}>
                    <EditOutlined />
                  </IconButton>
                }
              </Stack>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarMonth sx={{ mr: 1 }} />
                <Typography>
                  {dayjs(event.startDate).format("DD/MM/YYYY")}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTime sx={{ mr: 1 }} />
                <Typography>
                  {dayjs(event.startDate).format("HH:mm")}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HourglassTop sx={{ mr: 1 }} />
                <Typography>{formatDuration()}</Typography>
              </Box>
              {props.onAddCalendar &&
                <Button
                  startIcon={<AddCircleOutline />}
                  sx={{
                    textTransform: "inherit",
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    mr: "auto"
                  }}
                  fullWidth={false}
                  onClick={props.onAddCalendar}>
                  Add to Calendar
                </Button>
              }
            </Stack>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Location
                </Typography>
                {props.onEditLocation &&
                  <IconButton color="primary" onClick={props.onEditLocation}>
                    <EditOutlined />
                  </IconButton>
                }
              </Stack>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography>{event.location}</Typography>
              </Box>
              {event.location.toLowerCase() !== "online" &&
                <GoogleMapsFrame
                  query={event.location}
                  sx={{ minHeight: "20rem" }}
                />
              }
            </Stack>
          </Stack>
        </Grid>
        <Grid size={2} />
        <Grid size={4}>
          <Stack spacing={3}>
            <AuthorizedView role="attendee">
              <Stack direction="row-reverse">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LocalActivity />}
                  onClick={props.onBuyTickets}
                  disabled={(!event.ticketOptions || !event.ticketOptions.length)}>
                  Buy Tickets
                </Button>
              </Stack>
            </AuthorizedView>
            <Stack>
              <Stack spacing={1}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Hosted By
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyItems="center">
                  <Avatar
                    sx={{ width: "4rem", height: "4rem" }} />
                  <Stack spacing={2}>
                    <Typography>{event.organizer.name}</Typography>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        href={`mailto:${encodeURIComponent(
                          `${event.organizer.name}<${event.organizer.email}>`)
                          }`}
                        sx={{ textTransform: 'none', width: "6rem" }}>
                        Contact
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<Add />}
                        sx={{ textTransform: 'none', width: "6rem" }}>
                        Follow
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Stack>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Ticket Information
                  </Typography>
                  {props.onEditTickets &&
                    <IconButton color="primary" onClick={props.onEditTickets}>
                      <EditOutlined />
                    </IconButton>
                  }
                </Stack>
                {event.ticketOptions && event.ticketOptions.length ? (
                  event.ticketOptions?.map(to =>
                    <Box key={to.id} sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalActivity sx={{ mr: 1 }} />
                      <Typography>
                        {to.name}: {formatPrice(to)}
                      </Typography>
                    </Box>
                  )
                ) : (
                  <Alert severity="error">No tickets available!</Alert>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Grid>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Event Description
            </Typography>
            {props.onEditDescription &&
              <IconButton color="primary" onClick={props.onEditDescription}>
                <EditOutlined />
              </IconButton>
            }
          </Stack>
          <Typography color="textSecondary">{event.description}</Typography>
        </Stack>
      </Grid>

      <Grid>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Categories
            </Typography>
            {props.onEditCategories &&
              <IconButton color="primary" onClick={props.onEditCategories}>
                <EditOutlined />
              </IconButton>
            }
          </Stack>
          {event.categories && event.categories.length ? (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {event.categories?.map((cat) => (
                <Chip key={cat.id} label={cat.name} size="small" />
              ))}
            </Box>
          ) : (
            <Typography>None</Typography>
          )}
        </Stack>
      </Grid>
    </Stack>
  )
}
