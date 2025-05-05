// @ts-check
/// <reference types="node" />

import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, Button, Container, Grid, IconButton, Avatar, Chip, Stack, CircularProgress, Alert, Popover, Divider, TextField, InputAdornment } from '@mui/material';
import { CalendarMonth, AccessTime, AddCircleOutline, LocationOn, Add, HourglassTop, LocalActivity, ShareOutlined, FacebookRounded, X, WhatsApp, LinkedIn, ContentCopy } from '@mui/icons-material';
import TicketOverlay from '../../components/TicketOverlay';
import PaymentPage from '../../components/PaymentPage';
import EventSection from '../../components/EventSection';
import { useSearchParams } from 'react-router-dom';
import { getEvent } from '../../backend';
import SaveEvent from '../../components/SaveEvent';
import dayjs from 'dayjs';
import * as ics from "ics";
import AuthorizedView from '../../components/AuthorizedView';

/**
 * @import Event from "../../models/Event";
 * @import TicketOption from "../../models/TicketOption";
 */

const EventDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [event, setEvent] = useState(/** @type {Event | null} */(null));
  const [eventError, setEventError] = useState(/** @type {string | null} */(null));

  const [anchorShare, setAnchorShare] = useState(/** @type {HTMLElement | null} */(null));

  const [isTicketOverlayOpen, setIsTicketOverlayOpen] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    (async function() {
      const eventId = searchParams.get("event");
      if (!eventId) {
        setEvent(null);
      } else {
        const result = await getEvent(eventId);
        if (!result) {
          setEventError("Failed to retrieve event.");
        }
        setEvent(await getEvent(eventId));
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.has("ticketOption") && !isTicketOverlayOpen) {
      setIsTicketOverlayOpen(true);
    }
  }, [isTicketOverlayOpen, searchParams, setSearchParams])

  const handleCheckout = (data) => {
    setOrderData(data);
    setShowPaymentPage(true);
  };

  const handleBackToEvent = () => {
    setShowPaymentPage(false);
    setOrderData(null);
  };

  const getEventUrl = useCallback(() => {
    if (!event) {
      return null;
    }
    return new URL(`/Event?event=${event.id}`, window.location.href).toString();
  }, [event]);

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
    } else {
      numeric = Math.round(hourDiff * 10) / 10;
      unit = "hour";
    }
    if (numeric > 1) {
      unit += "s";
    }
    return `${numeric} ${unit}`;
  }, [event]);

  const formatPrice = useCallback(
    /**
     * @param {TicketOption} to
     */
    function(to) {
      if (!event) {
        return null;
      }
      const price = event.price + to.additionalPrice;
      if (!price) {
        return "Free"
      } else {
        return `$${price}/ticket`;
      }
    }
  , [event])

  const addToCalendar = useCallback(() => {
    if (!event) {
      return;
    }
    const result = ics.createEvent({
      start: Date.parse(event.startDate),
      end: Date.parse(event.endDate),
      title: event.name,
      description: event.description,
      location: event.location,
      url: getEventUrl() ?? undefined,
      categories: event.categories?.map(c => c.name),
      organizer: {
        name: event.organizer.name,
        email: event.organizer.email
      }
    });
    if (result.error || !result.value) {
      return;
    }

    const icsBlob = new Blob([result.value], { type: "text/calendar" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(icsBlob);
    a.download = "event.ics";
    a.click();
  }, [event, getEventUrl]);

  return (
    <Box>
      {!showPaymentPage ? (
        <>
          <Container sx={{ py: 4, flexGrow: 1 }}>

            {!event ? (
              !eventError ? (
                <Stack alignContent="center" alignItems="center">
                  <CircularProgress />
                </Stack>
              ) : (
                <Alert severity="error">{eventError}</Alert>
              )
            ) : (
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
                    objectFit: "scale-down",
                    borderRadius: 4
                  }} />

                <Grid container={true} sx={{ display: "flex", justifyItems: "stretch"  }}>
                  <Grid size={6}>
                    <Typography variant="h4" textTransform="uppercase">
                      <b>{event.name}</b>
                    </Typography>
                  </Grid>
                  <Grid size={6}>
                    <Stack direction="row-reverse">
                      <IconButton onClick={(e) => setAnchorShare(e.currentTarget)}>
                        <ShareOutlined />
                      </IconButton>
                      <SaveEvent event={event} />
                    </Stack>
                  </Grid>
                </Grid>

                <Grid container={true} sx={{ display: "flex", justifyItems: "stretch"  }}>
                  <Grid size={6}>
                    <Stack spacing={3}>
                      <Stack spacing={1}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          Date and Time
                        </Typography>
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
                        <Button
                          startIcon={<AddCircleOutline />}
                          sx={{
                            textTransform: "inherit",
                            display: "inline-flex",
                            justifyContent: "flex-start",
                            mr: "auto"
                          }}
                          fullWidth={false}
                          onClick={addToCalendar}>
                            Add to Calendar
                        </Button>
                      </Stack>
                      <Stack spacing={1}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          Location
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ mr: 1 }} />
                          <Typography>{event.location}</Typography>
                        </Box>
                        {event.location.toLowerCase() !== "online" &&
                          <iframe
                            title="Embedded Map"
                            style={{ border: 0, minHeight: "20rem" }}
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=${
                              process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                              }&q=${encodeURIComponent(event.location)}`
                            }
                            allowFullScreen>
                          </iframe>
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
                            onClick={() => setIsTicketOverlayOpen(true)}
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
                          <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Ticket Information
                          </Typography>
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
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Event Description
                    </Typography>
                    <Typography color="textSecondary">{event.description}</Typography>
                  </Stack>
                </Grid>

                <Grid>
                  <Stack spacing={1}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Categories
                    </Typography>
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

                <Grid container spacing={4}>
                  <EventSection
                    title="Other events you may like"
                    query={{}}
                    rowSize={3}
                    limit={3} />
                </Grid>
              </Stack>
            )}

          </Container>

          <Popover
            open={!!anchorShare}
            anchorEl={anchorShare}
            onClose={() => setAnchorShare(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}>
              <Stack
                spacing={1}
                alignItems="center"
                sx={{
                  minWidth: "20rem",
                  padding: 1
                }}>
                  <Typography variant="h6" textAlign="center" sx={{ m: 2 }}>
                    Share with friends
                  </Typography>
                  <Divider sx={{ width: "100%" }} />
                  <Stack alignItems="center">
                    <Stack direction="row" minHeight="5rem" spacing={4} alignItems="center">
                      <IconButton
                        color="primary"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${
                          encodeURIComponent(getEventUrl() || "")
                        }`}
                        target="_blank">
                          <FacebookRounded />
                      </IconButton>
                      <IconButton
                        color="primary"
                        href={`https://www.x.com/share?url=${
                          encodeURIComponent(getEventUrl() || "")
                        }`}
                        target="_blank">
                          <X />
                      </IconButton>
                      <IconButton
                        color="primary"
                        href={`https://api.whatsapp.com/send?text=${
                          encodeURIComponent(getEventUrl() || "")
                        }`}
                        target="_blank">
                          <WhatsApp />
                      </IconButton>
                      <IconButton
                        color="primary"
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${
                          encodeURIComponent(getEventUrl() || "")
                        }`}
                        target="_blank">
                          <LinkedIn />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Stack minHeight="5rem" alignContent="center" justifyItems="center">
                    <TextField
                      label="Event URL"
                      value={getEventUrl()}
                      slotProps={{
                        htmlInput: {
                          readOnly: true,
                          disabled: true
                        },
                        input: {
                          endAdornment:
                            <InputAdornment position="end">
                              <IconButton onClick={(e) => {
                                const eventUrl = getEventUrl();
                                if (eventUrl) {
                                  navigator.clipboard.writeText(eventUrl);
                                }
                              }}>
                                <ContentCopy />
                              </IconButton>
                            </InputAdornment>
                        }
                      }}>
                    </TextField>
                  </Stack>
              </Stack>
          </Popover>

          {event && (
            <TicketOverlay
              event={event}
              isOpen={isTicketOverlayOpen}
              onClose={() => {
                searchParams.delete("ticketOption");
                setSearchParams(searchParams);
                setIsTicketOverlayOpen(false);
              }}
              onCheckout={handleCheckout}
            />
          )}
        </>
      ) : (
        <PaymentPage orderData={orderData} onBackToOverlay={handleBackToEvent} />
      )}
    </Box>
  );
};

export default EventDetailsPage;
