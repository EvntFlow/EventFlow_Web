// @ts-check

import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, Button, Container, Grid, IconButton, Avatar, Chip, Stack, CircularProgress, Alert } from '@mui/material';
import { CalendarMonth, AccessTime, AddCircleOutline, LocationOn, Share, Add, HourglassTop, LocalActivity } from '@mui/icons-material';
import TicketOverlay from '../../components/TicketOverlay';
import PaymentPage from '../../components/PaymentPage';
import EventSection from '../../components/EventSection';
import { useSearchParams } from 'react-router-dom';
import { getEvent } from '../../backend';
import SaveEvent from '../../components/SaveEvent';
import dayjs from 'dayjs';
import * as ics from "ics";

/** @import Event from "../../models/Event" */

const EventDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const [event, setEvent] = useState(/** @type {Event | null} */(null));
  const [eventError, setEventError] = useState(/** @type {string | null} */(null));

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

  const handleCheckout = (data) => {
    setOrderData(data);
    setShowPaymentPage(true);
  };

  const handleBackToEvent = () => {
    setShowPaymentPage(false);
    setOrderData(null);
  };

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
      url: new URL(`/Event?event=${event.id}`, window.location.href).toString(),
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

  }, [event]);

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
                      <IconButton>
                        <Share />
                      </IconButton>
                      <SaveEvent event={event} />
                    </Stack>
                  </Grid>
                </Grid>

                <Grid container={true} sx={{ display: "flex", justifyItems: "stretch"  }}>
                  <Grid size={6}>
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
                        <Typography>
                          {dayjs(event.endDate).diff(dayjs(event.startDate), "hour", true)} hour(s)
                        </Typography>
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
                  </Grid>
                  <Grid size={6}>
                    <Stack direction="row-reverse">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<LocalActivity />}
                        onClick={() => setIsTicketOverlayOpen(true)}>
                          Buy Tickets
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>

                <Grid container={true} sx={{ display: "flex", justifyItems: "stretch"  }}>
                  <Grid size={4}>
                    <Stack spacing={1}>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Location
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn sx={{ mr: 1 }} />
                        <Typography>{event.location}</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid size={4} />
                  <Grid size={4}>
                    <Stack spacing={1}>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Hosted By
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center" justifyItems="center">
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
                  </Grid>
                </Grid>

                <Grid>
                  <Stack spacing={1}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Ticket Information
                    </Typography>
                    {event.ticketOptions && event.ticketOptions.length ? (
                      event.ticketOptions?.map(to =>
                        <Box key={to.id} sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocalActivity sx={{ mr: 1 }} />
                          <Typography>
                            {to.name}: ${event.price + to.additionalPrice}/ticket
                          </Typography>
                        </Box>
                      )
                    ) : (
                      <Alert severity="error">No tickets available!</Alert>
                    )}
                  </Stack>
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

          <TicketOverlay
            isOpen={isTicketOverlayOpen}
            onClose={() => setIsTicketOverlayOpen(false)}
            onCheckout={handleCheckout}
          />
        </>
      ) : (
        <PaymentPage orderData={orderData} onBackToOverlay={handleBackToEvent} />
      )}
    </Box>
  );
};

export default EventDetailsPage;
